import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useIncident } from '../../context/IncidentContext';
import { useTheme } from '../../context/ThemeContext';
import type { BasemapId } from '../../types';
import { 
  Layers, 
  Maximize2, 
  Minimize2, 
  Plus, 
  Minus, 
  Compass, 
  MousePointer,
  Satellite,
  Shield,
  Eye,
  Sliders,
  Ruler,
  Radio,
  Sun,
  Flame,
  Key
} from 'lucide-react';

export const NauticalMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.LayerGroup | null>(null);

  const {
    activeIncident,
    selectedVessel,
    setSelectedVessel,
    timelineProgress,
    basemap,
    setBasemap,
    selectedSatellite,
    showSlick,
    setShowSlick,
    showHindcast,
    setShowHindcast,
    showForecast,
    setShowForecast,
    showAis,
    setShowAis,
    showSarFootprint,
    setShowSarFootprint,
    showBoomingZones,
    setShowBoomingZones,
    sarOpacity,
    setSarOpacity,
    setIsVesselModalOpen,
    setIsSettingsOpen,
    showToast,
  } = useIncident();

  const { theme } = useTheme();
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [showBasemapMenu, setShowBasemapMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wheelZoom, setWheelZoom] = useState(false);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measureDist, setMeasureDist] = useState<string | null>(null);

  // Clean, High-Resolution, 100% Free Basemaps (Zero Watermarks)
  const basemapTiles: Record<BasemapId, { name: string; base: string; labels?: string; maxZoom: number; desc: string }> = {
    dark: {
      name: 'Dark Tactical Ocean',
      base: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      labels: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 18,
      desc: 'Esri Dark Canvas for tactical nighttime & radar ops (No watermarks)'
    },
    satellite: {
      name: 'Satellite Hybrid',
      base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      labels: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 19,
      desc: 'High-res Copernicus / Sentinel / Esri Earth optical imagery'
    },
    nautical: {
      name: 'Maritime Nautical Chart',
      base: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean/MapServer/tile/{z}/{y}/{x}',
      labels: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
      maxZoom: 18,
      desc: 'Esri World Ocean Bathymetry + OpenSeaMap Seamarks'
    },
    topo: {
      name: 'Bathymetry & Topo',
      base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 18,
      desc: 'High-relief topographic and coastal seabed relief'
    },
    voyager: {
      name: 'Navigation Chart (OSM)',
      base: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      maxZoom: 19,
      desc: 'Standard OpenStreetMap global maritime navigation chart'
    }
  };

  // If satellite is Sentinel-2 Optical, automatically recommend or switch to Satellite Hybrid
  useEffect(() => {
    if (selectedSatellite.includes('Sentinel-2') && basemap === 'dark') {
      setBasemap('satellite');
      showToast('🛰️ Optical sensor selected: Switched to Satellite Hybrid Imagery');
    }
  }, [selectedSatellite]);

  // Resize map when entering/exiting fullscreen
  useEffect(() => {
    const timer = setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  // Synchronize wheel zoom with fullscreen or user preference
  useEffect(() => {
    if (!mapRef.current) return;
    if (isFullscreen || wheelZoom) {
      mapRef.current.scrollWheelZoom.enable();
    } else {
      mapRef.current.scrollWheelZoom.disable();
    }
  }, [isFullscreen, wheelZoom]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
    }

    const map = L.map(mapContainerRef.current, {
      center: activeIncident.center,
      zoom: activeIncident.zoom,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    layersGroupRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [activeIncident.id]);

  // Update Basemap Layer when basemap or theme changes (100% Watermark Free)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove existing tile layer group
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const currentBase = basemapTiles[basemap] || basemapTiles.dark;
    const tileGroup = L.layerGroup();

    // Add Base Layer
    L.tileLayer(currentBase.base, {
      maxZoom: currentBase.maxZoom,
      subdomains: 'abc',
    }).addTo(tileGroup);

    // Add Reference / Labels / Seamarks Layer if present
    if (currentBase.labels) {
      L.tileLayer(currentBase.labels, {
        maxZoom: currentBase.maxZoom,
        subdomains: 'abc',
      }).addTo(tileGroup);
    }

    tileGroup.addTo(map);
    tileLayerRef.current = tileGroup;
  }, [basemap, theme]);

  // Render Vector Layers, Overlays, and Active Satellite Sensor Swaths
  useEffect(() => {
    const map = mapRef.current;
    const group = layersGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    const { slick, hindcastTrail, forecastTrail, vessels } = activeIncident;
    const [cLat, cLon] = slick.centroid;

    // 1. Dynamic Satellite Sensor Swath & Footprint Layer
    if (showSarFootprint) {
      if (selectedSatellite.includes('Sentinel-1')) {
        // Sentinel-1 SAR IW Swath (C-Band Radar)
        const padLat = 0.24;
        const padLon = 0.38;
        const sarBounds: L.LatLngExpression[] = [
          [cLat + padLat, cLon - padLon],
          [cLat + padLat, cLon + padLon],
          [cLat - padLat, cLon + padLon],
          [cLat - padLat, cLon - padLon],
        ];

        L.polygon(sarBounds, {
          color: '#06b6d4', // cyan-500
          weight: 2,
          dashArray: '6, 4',
          fillColor: '#0891b2',
          fillOpacity: 0.08,
        })
          .bindTooltip('🛰️ Sentinel-1 SAR IW Swath (VV+VH Dual-Pol • 10m Res • 250km Swath)', {
            permanent: false,
            direction: 'top',
          })
          .addTo(group);

        // Radar beam grid lines
        L.polyline([[cLat + padLat, cLon - padLon], [cLat - padLat, cLon + padLon]], {
          color: '#06b6d4',
          weight: 1,
          dashArray: '2, 6',
          opacity: 0.4
        }).addTo(group);
      } else if (selectedSatellite.includes('Sentinel-2')) {
        // Sentinel-2 MSI Optical Sun-Glint & NDWI Swath
        const padLat = 0.18;
        const padLon = 0.28;
        const opticalBounds: L.LatLngExpression[] = [
          [cLat + padLat, cLon - padLon],
          [cLat + padLat, cLon + padLon],
          [cLat - padLat, cLon + padLon],
          [cLat - padLat, cLon - padLon],
        ];

        L.polygon(opticalBounds, {
          color: '#10b981', // emerald-500
          weight: 2,
          dashArray: '4, 4',
          fillColor: '#059669',
          fillOpacity: 0.12,
        })
          .bindTooltip('☀️ Sentinel-2 MSI Optical (Sun-Glint Band 8A + NDWI Water Index • 10m)', {
            permanent: false,
            direction: 'top',
          })
          .addTo(group);
      } else if (selectedSatellite.includes('Landsat')) {
        // Landsat-9 OLI Thermal IR Swath
        const padLat = 0.20;
        const padLon = 0.30;
        const thermalBounds: L.LatLngExpression[] = [
          [cLat + padLat, cLon - padLon],
          [cLat + padLat, cLon + padLon],
          [cLat - padLat, cLon + padLon],
          [cLat - padLat, cLon - padLon],
        ];

        L.polygon(thermalBounds, {
          color: '#f97316', // orange-500
          weight: 2,
          dashArray: '5, 5',
          fillColor: '#ea580c',
          fillOpacity: 0.14,
        })
          .bindTooltip('🔥 Landsat-9 OLI TIRS (Thermal Infrared Band 10/11 • 30m Res)', {
            permanent: false,
            direction: 'top',
          })
          .addTo(group);
      } else if (selectedSatellite.includes('RADARSAT')) {
        // RADARSAT Constellation (RCM)
        const padLat = 0.15;
        const padLon = 0.22;
        const rcmBounds: L.LatLngExpression[] = [
          [cLat + padLat, cLon - padLon],
          [cLat + padLat, cLon + padLon],
          [cLat - padLat, cLon + padLon],
          [cLat - padLat, cLon - padLon],
        ];

        L.polygon(rcmBounds, {
          color: '#a855f7', // purple-500
          weight: 2,
          dashArray: '6, 3',
          fillColor: '#9333ea',
          fillOpacity: 0.10,
        })
          .bindTooltip('📡 RADARSAT Constellation (Compact Polarimetry • 5m High-Res)', {
            permanent: false,
            direction: 'top',
          })
          .addTo(group);
      } else {
        // TerraSAR-X Spotlight
        const padLat = 0.12;
        const padLon = 0.18;
        const tsxBounds: L.LatLngExpression[] = [
          [cLat + padLat, cLon - padLon],
          [cLat + padLat, cLon + padLon],
          [cLat - padLat, cLon + padLon],
          [cLat - padLat, cLon - padLon],
        ];

        L.polygon(tsxBounds, {
          color: '#ec4899', // pink-500
          weight: 2,
          dashArray: '3, 3',
          fillColor: '#db2777',
          fillOpacity: 0.12,
        })
          .bindTooltip('⚡ TerraSAR-X Spotlight (X-Band High Precision • 1m Res)', {
            permanent: false,
            direction: 'top',
          })
          .addTo(group);
      }
    }

    // 2. Oil Slick Segmentation Mask
    if (showSlick && slick.coordinates && slick.coordinates.length > 0) {
      // Main hydrocarbon dark-spot polygon
      L.polygon(slick.coordinates as L.LatLngExpression[], {
        color: '#ef4444', // red-500
        weight: 2.5,
        fillColor: '#b91c1c', // red-700
        fillOpacity: (sarOpacity / 100) * 0.75,
      })
        .bindPopup(
          `<div class="p-1 font-sans text-xs">
            <div class="font-bold text-red-600 mb-1">🛢️ ${slick.name}</div>
            <div>Area: <b>${slick.areaKm2} km²</b></div>
            <div>Volume: <b>${slick.estimatedVolumeBarrels ?? 7862} bbls</b></div>
            <div>BAOAC: <b>${slick.bonnCode ?? 'Code 4 (Metallic/True)'}</b></div>
            <div>Confidence: <b>${slick.confidence}%</b></div>
            <div>Sensor: <b>${selectedSatellite}</b></div>
          </div>`
        )
        .addTo(group);

      // Spill centroid marker with pulsating sonar radar ring
      const centroidIcon = L.divIcon({
        className: 'custom-centroid-icon',
        html: `<div class="relative flex items-center justify-center">
                <div class="w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-md animate-ping absolute opacity-75"></div>
                <div class="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-md relative flex items-center justify-center">
                  <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      L.marker(slick.centroid as L.LatLngExpression, { icon: centroidIcon })
        .bindTooltip(`Centroid (${slick.centroid[0].toFixed(3)}°N, ${slick.centroid[1].toFixed(3)}°W)`, {
          permanent: false,
          direction: 'top',
        })
        .addTo(group);
    }

    // 3. Containment Booming Coordinates
    if (showBoomingZones) {
      const boomCoords: L.LatLngExpression[] = [
        [28.12, -90.22],
        [28.15, -90.18],
        [28.18, -90.12],
      ];

      L.polyline(boomCoords, {
        color: '#10b981', // emerald-500
        weight: 4,
        dashArray: '6, 4',
      })
        .bindTooltip('🛡️ USCG Sector Containment Boom Line #1', {
          permanent: false,
          direction: 'top',
        })
        .addTo(group);
    }

    // 4. Backward Lagrangian Hindcast Drift Trail
    if (showHindcast && hindcastTrail && hindcastTrail.length > 0) {
      const latlngs: L.LatLngExpression[] = hindcastTrail.map((pt) => [pt.lat, pt.lon]);

      // Hindcast polyline
      L.polyline(latlngs, {
        color: '#f59e0b', // amber-500
        weight: 3,
        dashArray: '8, 6',
      }).addTo(group);

      // Hindcast uncertainty circles
      hindcastTrail.forEach((pt) => {
        L.circle([pt.lat, pt.lon], {
          radius: pt.radiusKm * 1000,
          color: '#f59e0b',
          weight: 1,
          fillColor: '#fbbf24',
          fillOpacity: 0.12,
        })
          .bindTooltip(`Hindcast ${pt.timestamp} (±${pt.radiusKm} km)`, {
            permanent: false,
            direction: 'bottom',
          })
          .addTo(group);
      });

      // Probable Origin Marker
      const originPt = slick.originPoint;
      const originIcon = L.divIcon({
        className: 'custom-origin-icon',
        html: `<div class="p-1 rounded-md bg-amber-500 text-slate-950 font-black text-[10px] font-mono border border-white shadow-md">
                t₀ ORIGIN
              </div>`,
        iconSize: [60, 20],
        iconAnchor: [30, 10],
      });

      L.marker(originPt as L.LatLngExpression, { icon: originIcon })
        .bindPopup(
          `<div class="p-1 font-sans text-xs">
            <div class="font-bold text-amber-600 mb-1">🎯 Probable Origin (t₀)</div>
            <div>Coords: <b>${originPt[0].toFixed(4)}°N, ${originPt[1].toFixed(4)}°W</b></div>
            <div>Estimated Timestamp: <b>${slick.originTimestamp}</b></div>
            <div>Model: <b>OpenDrift OpenOil Lagrangian Hindcast</b></div>
          </div>`
        )
        .addTo(group);
    }

    // 5. Forward Coastal Impact Forecast Trail
    if (showForecast && forecastTrail && forecastTrail.length > 0) {
      const fLatlngs: L.LatLngExpression[] = [
        slick.centroid as L.LatLngExpression,
        ...forecastTrail.map((pt) => [pt.lat, pt.lon] as L.LatLngExpression),
      ];

      L.polyline(fLatlngs, {
        color: '#3b82f6', // blue-500
        weight: 2.5,
        dashArray: '4, 4',
      }).addTo(group);

      forecastTrail.forEach((pt) => {
        L.circle([pt.lat, pt.lon], {
          radius: pt.radiusKm * 1000,
          color: '#3b82f6',
          weight: 1,
          fillColor: '#60a5fa',
          fillOpacity: 0.15,
        })
          .bindTooltip(`Forecast ${pt.timestamp} (Coastal Impact)`, {
            permanent: false,
            direction: 'top',
          })
          .addTo(group);
      });
    }

    // 6. AIS Vessel Tracks & Culprit Markers
    if (showAis && vessels && vessels.length > 0) {
      vessels.forEach((vessel) => {
        const isSelected = selectedVessel?.id === vessel.id;
        const isCulprit = vessel.isCulprit;

        // Vessel track
        if (vessel.track && vessel.track.length > 0) {
          const trackPts: L.LatLngExpression[] = vessel.track.map((t) => [t.lat, t.lon]);

          L.polyline(trackPts, {
            color: isCulprit ? '#ef4444' : isSelected ? '#06b6d4' : '#64748b',
            weight: isCulprit ? 3.5 : isSelected ? 3 : 1.5,
            opacity: isCulprit ? 0.9 : 0.6,
          }).addTo(group);
        }

        // Current vessel position marker
        const currentPt = vessel.track?.[Math.min(vessel.track.length - 1, Math.floor((timelineProgress / 100) * vessel.track.length))] || vessel.track?.[0];
        if (currentPt) {
          const markerColor = isCulprit ? 'bg-red-600' : isSelected ? 'bg-cyan-500' : 'bg-slate-500';
          const vesselIcon = L.divIcon({
            className: 'custom-vessel-icon',
            html: `<div class="w-3.5 h-3.5 ${markerColor} rounded-full border-2 border-white shadow-sm flex items-center justify-center cursor-pointer">
                    <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          });

          const marker = L.marker([currentPt.lat, currentPt.lon], { icon: vesselIcon }).addTo(group);

          marker.on('click', () => {
            setSelectedVessel(vessel);
            setIsVesselModalOpen(true);
          });

          marker.bindTooltip(
            `<div class="font-sans text-[11px]">
              <div class="font-bold ${isCulprit ? 'text-red-500' : 'text-slate-900'}">${vessel.name} (${vessel.mmsi})</div>
              <div>Type: ${vessel.type}</div>
              <div>SOG: ${currentPt.sog} kn | Risk: <b>${vessel.riskScore}%</b></div>
            </div>`,
            { permanent: false, direction: 'top' }
          );
        }
      });
    }
  }, [
    activeIncident,
    selectedVessel,
    timelineProgress,
    selectedSatellite,
    showSlick,
    showHindcast,
    showForecast,
    showAis,
    showSarFootprint,
    showBoomingZones,
    sarOpacity,
  ]);

  // Toolbar action handlers
  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();
  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.setView(activeIncident.center, activeIncident.zoom);
      showToast(`Re-centered on ${activeIncident.locationName} spill centroid`);
    }
  };
  const handleToggleFullscreen = () => setIsFullscreen((prev) => !prev);
  const handleToggleWheelZoom = () => {
    setWheelZoom((prev) => {
      const next = !prev;
      showToast(next ? 'Mouse scroll wheel zoom enabled' : 'Mouse scroll wheel zoom disabled');
      return next;
    });
  };

  const handleMeasureTool = () => {
    setIsMeasuring((prev) => {
      const next = !prev;
      if (next) {
        const distKm = (activeIncident.slick.perimeterKm * 0.5).toFixed(1);
        setMeasureDist(`Slick Axis: ~${distKm} km length | Corridor: 25 km`);
        showToast('📏 Measure Tool: Active axis distance computed');
      } else {
        setMeasureDist(null);
      }
      return next;
    });
  };

  // Satellite Icon Renderer
  const getSatelliteIcon = () => {
    if (selectedSatellite.includes('Optical')) return <Sun className="w-3.5 h-3.5 text-emerald-400" />;
    if (selectedSatellite.includes('Thermal')) return <Flame className="w-3.5 h-3.5 text-orange-400" />;
    if (selectedSatellite.includes('RADARSAT')) return <Radio className="w-3.5 h-3.5 text-purple-400" />;
    return <Satellite className="w-3.5 h-3.5 text-cyan-400" />;
  };

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-full min-h-[420px]'
      }`}
    >
      {/* Leaflet Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full bg-slate-950 z-0" />

      {/* Top Left: Basemap Switcher & Active Satellite Sensor HUD */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2">
        {/* Basemap Dropdown Trigger */}
        <div className="relative">
          <button
            onClick={() => {
              setShowBasemapMenu((prev) => !prev);
              setShowLayerMenu(false);
            }}
            type="button"
            className="px-2.5 py-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white text-xs font-semibold shadow-md border border-slate-300 dark:border-slate-700 backdrop-blur-md flex items-center gap-1.5 transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-blue-500" />
            <span>Map: {basemapTiles[basemap]?.name || 'Dark Tactical Ocean'}</span>
          </button>

          {/* Basemap Dropdown Menu */}
          {showBasemapMenu && (
            <div className="absolute left-0 mt-1.5 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1.5 z-30 text-xs backdrop-blur-md animate-fadeIn">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>Select Base Chart</span>
                <span className="text-emerald-500 font-normal">Clean • No Watermarks</span>
              </div>
              {(Object.keys(basemapTiles) as BasemapId[]).map((key) => {
                const b = basemapTiles[key];
                const isActive = basemap === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setBasemap(key);
                      setShowBasemapMenu(false);
                      showToast(`Basemap switched: ${b.name}`);
                    }}
                    type="button"
                    className={`w-full text-left px-2.5 py-2 rounded-lg my-0.5 flex flex-col transition cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 font-bold border border-blue-200 dark:border-blue-900'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="font-semibold text-xs">{b.name}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">{b.desc}</span>
                  </button>
                );
              })}

              <div className="pt-1.5 mt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setShowBasemapMenu(false);
                    setIsSettingsOpen(true);
                  }}
                  className="w-full text-left px-2 py-1 rounded text-[11px] text-blue-600 dark:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 font-semibold cursor-pointer"
                >
                  <Key className="w-3 h-3" />
                  <span>Configure Custom Map / Copernicus Keys</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Live Satellite Modality HUD Indicator */}
        <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-200 text-xs font-mono font-bold shadow-md backdrop-blur-md flex items-center gap-1.5">
          {getSatelliteIcon()}
          <span>{selectedSatellite}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>
        </div>

        {/* Measure Tool Telemetry Badge */}
        {measureDist && (
          <div className="px-2.5 py-1.5 rounded-lg bg-cyan-950/90 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold shadow-md backdrop-blur-md animate-fadeIn flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-cyan-400" />
            <span>{measureDist}</span>
          </div>
        )}
      </div>

      {/* Top Right: Interactive Map Toolbar */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 bg-white/90 dark:bg-slate-900/90 p-1 rounded-xl shadow-md border border-slate-300 dark:border-slate-700 backdrop-blur-md">
        {/* Layer Visibility Menu Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLayerMenu((prev) => !prev);
              setShowBasemapMenu(false);
            }}
            title="Layer Visibility & SAR Filters"
            type="button"
            className={`p-2 rounded-lg transition cursor-pointer ${
              showLayerMenu
                ? 'bg-blue-600 text-white shadow-xs'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Layer Options Popover */}
          {showLayerMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-3 z-30 text-xs backdrop-blur-md animate-fadeIn">
              <div className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 mb-2 flex items-center justify-between">
                <span>Map Overlays</span>
                <span className="text-[10px] text-slate-400 font-mono">6 Layers</span>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showSarFootprint}
                    onChange={(e) => setShowSarFootprint(e.target.checked)}
                    className="rounded text-blue-600 cursor-pointer"
                  />
                  <span className="flex items-center gap-1">
                    <Satellite className="w-3 h-3 text-cyan-500" />
                    <span>Active Satellite Swath Footprint</span>
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showSlick}
                    onChange={(e) => setShowSlick(e.target.checked)}
                    className="rounded text-red-600 cursor-pointer"
                  />
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>
                    <span>Oil Slick Polygon Mask</span>
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showHindcast}
                    onChange={(e) => setShowHindcast(e.target.checked)}
                    className="rounded text-amber-500 cursor-pointer"
                  />
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                    <span>Hindcast Origin Trail (t₀)</span>
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showForecast}
                    onChange={(e) => setShowForecast(e.target.checked)}
                    className="rounded text-blue-500 cursor-pointer"
                  />
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                    <span>Forward Coastal Impact Cone</span>
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showAis}
                    onChange={(e) => setShowAis(e.target.checked)}
                    className="rounded text-cyan-500 cursor-pointer"
                  />
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span>
                    <span>AIS Vessel Traffic Tracks</span>
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showBoomingZones}
                    onChange={(e) => setShowBoomingZones(e.target.checked)}
                    className="rounded text-emerald-500 cursor-pointer"
                  />
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-500" />
                    <span>Containment Booming Zones</span>
                  </span>
                </label>

                {/* SAR Opacity Slider */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-[11px] mb-1 text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Sliders className="w-3 h-3" />
                      <span>SAR Mask Opacity</span>
                    </span>
                    <span className="font-mono font-bold">{sarOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={sarOpacity}
                    onChange={(e) => setSarOpacity(Number(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Measure Tool Button */}
        <button
          onClick={handleMeasureTool}
          title="Measure distance on map"
          type="button"
          className={`p-2 rounded-lg transition cursor-pointer ${
            isMeasuring
              ? 'bg-cyan-600 text-white'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Ruler className="w-4 h-4" />
        </button>

        {/* Recenter Button */}
        <button
          onClick={handleRecenter}
          title="Recenter on Oil Spill Centroid"
          type="button"
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition cursor-pointer"
        >
          <Compass className="w-4 h-4" />
        </button>

        {/* Mouse Wheel Zoom Toggle */}
        <button
          onClick={handleToggleWheelZoom}
          title={wheelZoom ? 'Disable mouse wheel zoom' : 'Enable mouse wheel zoom'}
          type="button"
          className={`p-2 rounded-lg transition cursor-pointer ${
            wheelZoom
              ? 'bg-blue-600 text-white'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <MousePointer className="w-4 h-4" />
        </button>

        {/* Zoom In */}
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          type="button"
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          type="button"
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={handleToggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          type="button"
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition cursor-pointer border-t border-slate-200 dark:border-slate-800"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Left: Quick Telemetry Legend */}
      <div className="absolute bottom-3 left-3 z-10 pointer-events-none hidden sm:flex items-center gap-2 bg-slate-900/85 px-3 py-1.5 rounded-lg border border-slate-700/60 text-[11px] text-slate-300 font-mono backdrop-blur-md">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span>Slick: {activeIncident.slick.areaKm2} km²</span>
        </span>
        <span className="text-slate-600">|</span>
        <span className="flex items-center gap-1 text-cyan-400">
          <span>Sensor: {selectedSatellite.split(' ')[0]}</span>
        </span>
        <span className="text-slate-600">|</span>
        <span className="flex items-center gap-1 text-amber-400">
          <span>t₀: {activeIncident.slick.originTimestamp}</span>
        </span>
      </div>
    </div>
  );
};
