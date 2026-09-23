"""
YOLO-based Oil Spill Detector
Ported and adapted from: prago-dev/oil-spill-detection (model/detect.py)
Source: https://github.com/prago-dev/oil-spill-detection

Original OilSpillDetector class used YOLOv8 (Ultralytics) for object detection
on satellite imagery. We adapt it for SAR/optical image analysis in SlickTrace V2.

Key integrations from prago-dev:
  1. OilSpillDetector class: YOLO inference with configurable confidence threshold
  2. Bounding box extraction: pixel coords → geographic polygon coords
  3. Prediction metadata: class label, confidence, bounding box area
  4. Annotated image output: save to static/predictions/ for dashboard display
  5. Detection result structure: matches our DetectionResponse schema
"""
import os
import math
from typing import List, Tuple, Dict, Any, Optional


# ─── YOLO Confidence Thresholds (from prago-dev OilSpillDetector) ────────────
YOLO_CONF_THRESHOLD = 0.3   # Default confidence threshold (from prago-dev)
YOLO_IOU_THRESHOLD  = 0.45  # Non-Maximum Suppression IoU threshold
YOLO_IMG_SIZE       = 640   # Input image size (YOLO standard)

# ─── Oil Spill YOLO Class Labels (from prago-dev training dataset) ────────────
YOLO_CLASSES = {
    0: "oil_spill",
    1: "look_alike",
    2: "ship",
    3: "land",
    4: "sea_surface"
}

# ─── prago-dev OilSpillDetector — adapted for SlickTrace V2 ──────────────────
class OilSpillDetector:
    """
    YOLO-based oil spill detector adapted from prago-dev/oil-spill-detection.

    Original code (model/detect.py):
    ```python
    class OilSpillDetector:
        def __init__(self, model_path, conf=0.3):
            self.model = YOLO(model_path)
            self.conf = conf

        def predict(self, image_path, prediction_dir):
            os.makedirs(prediction_dir, exist_ok=True)
            results = self.model(image_path, conf=self.conf)
            detected = False
            ...
    ```

    We simulate the YOLO inference output for use without a GPU/model file,
    producing realistic bounding boxes and confidence scores compatible with
    the SlickTrace V2 pipeline.
    """

    def __init__(self, model_path: str = "model/oil_spilling_model.pt", conf: float = YOLO_CONF_THRESHOLD):
        self.model_path = model_path
        self.conf = conf
        self.model_loaded = os.path.exists(model_path)

    def predict(self, image_path: str, prediction_dir: str = "static/predictions") -> Dict[str, Any]:
        """
        Run YOLO inference on a satellite image.
        Returns detection result with bounding boxes, confidence, and class labels.

        Adapted from prago-dev predict() method:
        - Runs YOLO model on image_path
        - Extracts bboxes, confidence scores, class IDs
        - Saves annotated prediction image to prediction_dir
        - Returns structured result for SlickTrace V2 pipeline
        """
        os.makedirs(prediction_dir, exist_ok=True)

        if self.model_loaded:
            # Real YOLO inference (requires ultralytics + GPU + model file)
            try:
                from ultralytics import YOLO
                import cv2
                model = YOLO(self.model_path)
                results = model(image_path, conf=self.conf)
                return self._parse_yolo_results(results, image_path, prediction_dir)
            except ImportError:
                pass  # Fall through to simulated output

        # Simulated YOLO output (for demo without GPU)
        return self._simulated_yolo_result(image_path, prediction_dir)

    def _parse_yolo_results(self, results, image_path: str, prediction_dir: str) -> Dict[str, Any]:
        """Parse Ultralytics YOLO Results object into SlickTrace V2 format."""
        detections = []
        detected = False

        for result in results:
            boxes = result.boxes
            if boxes is not None and len(boxes) > 0:
                for box in boxes:
                    cls_id = int(box.cls[0].item())
                    conf = float(box.conf[0].item())
                    x1, y1, x2, y2 = box.xyxy[0].tolist()
                    label = YOLO_CLASSES.get(cls_id, "unknown")

                    if label == "oil_spill" and conf >= self.conf:
                        detected = True
                        detections.append({
                            "class_id": cls_id,
                            "label": label,
                            "confidence": round(conf, 4),
                            "bbox_pixels": [int(x1), int(y1), int(x2), int(y2)],
                            "bbox_area_px2": int((x2 - x1) * (y2 - y1))
                        })

            # Save annotated prediction image (from prago-dev pipeline)
            import os
            fname = os.path.basename(image_path)
            save_path = os.path.join(prediction_dir, f"pred_{fname}")
            result.save(filename=save_path)

        return {
            "detected": detected,
            "detections": detections,
            "total_detections": len(detections),
            "model": "YOLOv8 (prago-dev/oil-spill-detection)",
            "confidence_threshold": self.conf,
            "source_image": image_path
        }

    def _simulated_yolo_result(self, image_path: str, prediction_dir: str) -> Dict[str, Any]:
        """
        Simulated YOLO output for demonstration (no GPU/model required).
        Produces realistic detection metadata matching the prago-dev model output format.
        """
        # Representative oil spill detection result for Mississippi Canyon scenario
        detections = [
            {
                "class_id": 0,
                "label": "oil_spill",
                "confidence": 0.874,
                "bbox_pixels": [128, 96, 512, 384],
                "bbox_area_px2": 147456  # 384px × 288px at 10m/px → 38.4km × 28.8km ≈ 48 km²
            }
        ]

        return {
            "detected": True,
            "detections": detections,
            "total_detections": 1,
            "model": "YOLOv8 (prago-dev/oil-spill-detection) — Simulation Mode",
            "confidence_threshold": self.conf,
            "source_image": image_path or "sentinel1_sar_20241125.tif"
        }


class YOLOGeoMapper:
    """
    Maps YOLO pixel bounding boxes to geographic coordinates.
    Required to feed prago-dev YOLO detections into our geographic pipeline.

    Approach:
    - YOLO outputs pixel bounding box [x1, y1, x2, y2] in image space
    - We use the image georeferencing metadata (corner coords + resolution)
    - Convert: geo_lat = origin_lat + (pixel_row * resolution_deg_lat)
                geo_lon = origin_lon + (pixel_col * resolution_deg_lon)
    """

    @staticmethod
    def bbox_to_polygon(
        bbox_pixels: List[int],        # [x1, y1, x2, y2]
        img_origin_lat: float,         # Top-left corner latitude
        img_origin_lon: float,         # Top-left corner longitude
        pixel_resolution_m: float = 10.0,  # 10m/pixel (Sentinel-1 GRD IW)
        img_width_px: int = 640,
        img_height_px: int = 640
    ) -> List[Tuple[float, float]]:
        """
        Convert YOLO bounding box from pixel space to geographic polygon.
        Returns 5-point rectangle polygon (closed ring).
        """
        x1, y1, x2, y2 = bbox_pixels

        # Pixel resolution in degrees
        lat_per_px = pixel_resolution_m / 111000.0
        lon_per_px = pixel_resolution_m / (111000.0 * math.cos(math.radians(img_origin_lat)))

        # Convert pixels to geo coords (Y-axis flipped: pixel 0 = top = max_lat)
        lat_top   = img_origin_lat - y1 * lat_per_px
        lat_bot   = img_origin_lat - y2 * lat_per_px
        lon_left  = img_origin_lon + x1 * lon_per_px
        lon_right = img_origin_lon + x2 * lon_per_px

        # Return closed 5-point polygon (ring)
        return [
            (round(lat_top,  5), round(lon_left,  5)),
            (round(lat_top,  5), round(lon_right, 5)),
            (round(lat_bot,  5), round(lon_right, 5)),
            (round(lat_bot,  5), round(lon_left,  5)),
            (round(lat_top,  5), round(lon_left,  5)),  # close ring
        ]

    @staticmethod
    def bbox_to_area_km2(bbox_pixels: List[int], pixel_resolution_m: float = 10.0) -> float:
        """Compute geographic area from YOLO bounding box pixel dimensions."""
        x1, y1, x2, y2 = bbox_pixels
        width_m = (x2 - x1) * pixel_resolution_m
        height_m = (y2 - y1) * pixel_resolution_m
        return round((width_m * height_m) / 1e6, 2)  # m² → km²


# Singleton detector instance (initialised lazily)
_detector: Optional[OilSpillDetector] = None

def get_detector(conf: float = YOLO_CONF_THRESHOLD) -> OilSpillDetector:
    """Get or create the singleton OilSpillDetector instance."""
    global _detector
    if _detector is None:
        model_path = os.path.join(os.path.dirname(__file__), "..", "..", "model", "oil_spilling_model.pt")
        _detector = OilSpillDetector(model_path=model_path, conf=conf)
    return _detector
