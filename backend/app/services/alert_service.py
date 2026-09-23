"""
Automated Alert Notification System
Ported & adapted from prago-dev/oil-spill-detection (send_prediction_email in main.py)
Source: https://github.com/prago-dev/oil-spill-detection

Provides:
- Coastal authority notification dispatch
- Incident confirmation dispatch
- SMTP email notifications (with mock/dry-run safety mode if SMTP credentials are not configured)
- Webhook / Event logging for operational telemetry
"""
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any, Optional
from datetime import datetime

class AlertService:
    @staticmethod
    def dispatch_oil_spill_alert(
        incident_id: str,
        result_label: str,
        confidence: float,
        location_name: str,
        estimated_area_km2: float,
        estimated_barrels: float,
        recipient_email: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Dispatches high-priority email alert to coastal authorities/administrators.
        Inspired by prago-dev/oil-spill-detection email notification system.
        """
        sender_email = os.getenv("SENDER_EMAIL", "alerts@slicktrace.gov")
        sender_password = os.getenv("SENDER_PASSWORD", "")
        admin_email = recipient_email or os.getenv("ADMIN_EMAIL", "uscg.command@d8.uscg.mil")
        
        timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
        subject = f"🚨 URGENT: Confirmed Oil Spill Detection - {incident_id} [{location_name}]"
        
        body = f"""
================================================================================
SLICKTRACE V2 - AUTOMATED MARITIME EMERGENCY DISPATCH
================================================================================

Incident ID: {incident_id}
Status: {result_label}
Detection Timestamp: {timestamp}
Location: {location_name}
Confidence Score: {round(confidence, 2)}%
Estimated Spill Area: {estimated_area_km2} km²
Estimated Volume: {round(estimated_barrels, 1)} barrels

ALERT SUMMARY:
Synthetic Aperture Radar (SAR) and YOLOv8 computer vision classification have
confirmed a high-backscatter-contrast petroleum hydrocarbon anomaly in the
designated EEZ corridor.

RECOMMENDED IMMEDIATE ACTIONS:
1. Dispatch nearest USCG Sector Fast Response Cutter (FRC).
2. Activate Sector Regional Response Team (RRT-6) Tier-II Containment.
3. Pre-position containment boom along projected drift coordinates.
4. Issue MARPOL Annex I notice of intent to primary AIS suspect.

================================================================================
System Citation: prago-dev/oil-spill-detection + SlickTrace V2 AI Vision Engine
================================================================================
"""

        status = "SENT"
        error_msg = None

        # If real SMTP credentials are present in env, send via SMTP
        if sender_password and sender_email != "alerts@slicktrace.gov":
            try:
                msg = MIMEMultipart()
                msg["From"] = sender_email
                msg["To"] = admin_email
                msg["Subject"] = subject
                msg.attach(MIMEText(body, "plain"))

                server = smtplib.SMTP("smtp.gmail.com", 587)
                server.starttls()
                server.login(sender_email, sender_password)
                server.sendmail(sender_email, admin_email, msg.as_string())
                server.quit()
            except Exception as e:
                status = "FAILED"
                error_msg = str(e)
        else:
            # Operational simulation mode (safe fallback when SMTP credentials are unset)
            status = "SIMULATED_DISPATCH"

        return {
            "status": status,
            "incident_id": incident_id,
            "recipient": admin_email,
            "timestamp": timestamp,
            "subject": subject,
            "preview_body": body.strip(),
            "error": error_msg
        }
