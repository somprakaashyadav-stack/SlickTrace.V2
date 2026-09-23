import type { IncidentScenario } from '../types';

export const mockIncidents: IncidentScenario[] = [
  {
    id: 'INC-GOM-2024-08',
    title: 'SPILL-DELTA-08 (Mississippi Canyon Block 42)',
    locationName: 'Gulf of Mexico — EEZ Sector 4',
    center: [28.38, -89.92],
    zoom: 10,
    status: 'Critical Alert',
    detectionDate: '2024-11-25 22:30 UTC',
    satelliteSensor: 'Sentinel-1B (SAR C-Band GRD)',
    orbitPass: 'Ascending Pass #142 (IW Mode)',
    resolution: '10m Spatial Resolution (VV+VH Polarimetric)',
    slick: {
      id: 'SLICK-42A',
      name: 'SPILL-DELTA-08',
      areaKm2: 48.3,
      perimeterKm: 38.6,
      estimatedVolumeM3: 1250,
      estimatedVolumeBarrels: 7862,
      estimatedAgeHours: 34,
      confidence: 94.2,
      thicknessMicrons: 25.8,
      spillType: 'Thick Mineral Oil Discharge',
      isThick: true,
      bonnCode: 'BAOAC Code 4 (Continuous True Color / Dark Metallic)',
      faySpreadingRegime: 'Viscous-Surface Tension Equilibrium',
      centroid: [28.38, -89.92],
      originPoint: [28.465, -90.155],
      originTimestamp: '2024-11-24 12:30 UTC',
      detectionTimestamp: '2024-11-25 22:30 UTC',
      coordinates: [
        [28.42, -90.06],
        [28.44, -89.96],
        [28.41, -89.84],
        [28.35, -89.81],
        [28.31, -89.88],
        [28.33, -90.02],
        [28.38, -90.08],
        [28.42, -90.06]
      ]
    },
    preprocessing: {
      sensor: 'Sentinel-1B C-Band SAR (IW Mode)',
      radiometricCalibrationFactorDb: -83.2,
      speckleFilterType: 'Refined Lee Filter (3x3 Kernel)',
      speckleSuppressionIndex: 0.942,
      cloudCoveragePercent: 0.0,
      opticalNdwiValidation: 0.88,
      resolutionMeters: 10.0,
      georeferencedCrs: 'EPSG:4326 (WGS 84)'
    },
    weathering: {
      evaporationPercent: 24.5,
      emulsificationWaterPercent: 42.0,
      dynamicViscosityCp: 185.0,
      remainingVolumeM3: 943.8,
      weatheringEngine: 'NOAA PyGNOME & OpenDrift OpenOil'
    },
    metocean: {
      windSpeedKnots: 14.2,
      windDirectionDeg: 315, // NW
      currentSpeedKnots: 0.85,
      currentDirectionDeg: 135, // SE
      leewayFactor: 0.032, // 3.2%
      seaSurfaceTempC: 24.6,
      waveHeightM: 1.2,
      currentModelSource: 'NOAA HYCOM Global 1/12° Analysis',
      windModelSource: 'ECMWF ERA5 Atmospheric Reanalysis'
    },
    hindcastTrail: [
      { hoursOffset: 0, lat: 28.38, lon: -89.92, radiusKm: 1.2, timestamp: '25 Nov 22:30' },
      { hoursOffset: -8, lat: 28.40, lon: -89.98, radiusKm: 1.8, timestamp: '25 Nov 14:30' },
      { hoursOffset: -16, lat: 28.42, lon: -90.04, radiusKm: 2.6, timestamp: '25 Nov 06:30' },
      { hoursOffset: -24, lat: 28.44, lon: -90.10, radiusKm: 3.4, timestamp: '24 Nov 22:30' },
      { hoursOffset: -34, lat: 28.465, lon: -90.155, radiusKm: 4.5, timestamp: '24 Nov 12:30 (ORIGIN)' }
    ],
    forecastTrail: [
      { hoursOffset: 0, lat: 28.38, lon: -89.92, radiusKm: 1.2, timestamp: '25 Nov 22:30' },
      { hoursOffset: 12, lat: 28.34, lon: -89.84, radiusKm: 2.2, timestamp: '26 Nov 10:30' },
      { hoursOffset: 24, lat: 28.29, lon: -89.75, radiusKm: 3.5, timestamp: '26 Nov 22:30' },
      { hoursOffset: 36, lat: 28.23, lon: -89.65, radiusKm: 5.1, timestamp: '27 Nov 10:30 (Shoreline Alert)' }
    ],
    vessels: [
      {
        id: 'v-001',
        name: 'Vessel PA2017',
        mmsi: '235109785',
        imo: '9412038',
        callSign: 'V2AB8',
        flag: 'Panama (PA)',
        type: 'Crude Oil Tanker',
        draughtM: 14.8,
        lengthM: 274,
        destination: 'GULFHAVEN TERMINAL',
        riskScore: 94.2,
        proximityScore: 98.0,
        timeOverlapScore: 95.5,
        behaviorScore: 92.0,
        aisIntegrityScore: 91.5,
        minDistanceM: 280,
        timeDeltaMin: 12,
        hasSpeedAnomaly: true,
        hasAisBlackout: true,
        speedAnomalySummary: 'Severe deceleration: Dropped from 14.5 kn to 2.3 kn for 1h 25m while passing origin zone; 45m AIS signal loss.',
        isCulprit: true,
        displayCategory: 'Speed Anomaly',
        badgeColor: 'red',
        rangeBar: { value: -6, min: -10, max: 10 },
        speedProfile: [
          { time: '08:00', sog: 14.6, baseline: 14.5 },
          { time: '10:00', sog: 14.5, baseline: 14.5 },
          { time: '11:30', sog: 14.2, baseline: 14.5 },
          { time: '12:15', sog: 4.8, baseline: 14.5 },
          { time: '12:30', sog: 2.3, baseline: 14.5 },
          { time: '13:00', sog: 2.5, baseline: 14.5 },
          { time: '13:45', sog: 3.1, baseline: 14.5 },
          { time: '14:30', sog: 11.2, baseline: 14.5 },
          { time: '16:00', sog: 14.1, baseline: 14.5 },
          { time: '20:00', sog: 14.4, baseline: 14.5 }
        ],
        track: [
          { lat: 28.58, lon: -90.35, timestamp: '24 Nov 08:00', sog: 14.6, cog: 128 },
          { lat: 28.52, lon: -90.25, timestamp: '24 Nov 10:30', sog: 14.2, cog: 130 },
          { lat: 28.468, lon: -90.158, timestamp: '24 Nov 12:30', sog: 2.3, cog: 132 },
          { lat: 28.43, lon: -90.09, timestamp: '24 Nov 14:15', sog: 3.4, cog: 135 },
          { lat: 28.36, lon: -89.96, timestamp: '24 Nov 17:00', sog: 13.8, cog: 134 },
          { lat: 28.24, lon: -89.78, timestamp: '24 Nov 21:00', sog: 14.4, cog: 135 },
          { lat: 28.12, lon: -89.60, timestamp: '25 Nov 03:00', sog: 14.5, cog: 136 }
        ]
      },
      {
        id: 'v-002',
        name: 'Vessel DA80061',
        mmsi: '211832000',
        imo: '9238471',
        callSign: 'DLBX',
        flag: 'Liberia (LR)',
        type: 'Chemical Tanker',
        draughtM: 11.2,
        lengthM: 182,
        destination: 'NEW ORLEANS',
        riskScore: 78.4,
        proximityScore: 82.0,
        timeOverlapScore: 74.0,
        behaviorScore: 78.5,
        aisIntegrityScore: 72.0,
        minDistanceM: 1850,
        timeDeltaMin: 48,
        hasSpeedAnomaly: false,
        hasAisBlackout: false,
        speedAnomalySummary: 'Course deviation recorded around sector perimeter.',
        isCulprit: false,
        displayCategory: 'Past anomaly trajectory',
        badgeColor: 'blue',
        speedProfile: [
          { time: '08:00', sog: 13.2, baseline: 13.0 },
          { time: '11:00', sog: 13.1, baseline: 13.0 },
          { time: '13:00', sog: 10.4, baseline: 13.0 },
          { time: '15:00', sog: 12.8, baseline: 13.0 },
          { time: '18:00', sog: 13.0, baseline: 13.0 }
        ],
        track: [
          { lat: 28.62, lon: -90.28, timestamp: '24 Nov 09:00', sog: 13.2, cog: 140 },
          { lat: 28.51, lon: -90.12, timestamp: '24 Nov 13:18', sog: 10.6, cog: 142 },
          { lat: 28.39, lon: -89.95, timestamp: '24 Nov 17:30', sog: 12.8, cog: 141 }
        ]
      },
      {
        id: 'v-003',
        name: 'Vessel DA80688',
        mmsi: '352001920',
        imo: '9518290',
        callSign: '3E219',
        flag: 'Marshall Islands (MH)',
        type: 'Bulk Carrier',
        draughtM: 12.5,
        lengthM: 225,
        destination: 'HOUSTON',
        riskScore: 68.2,
        proximityScore: 65.0,
        timeOverlapScore: 62.0,
        behaviorScore: 58.0,
        aisIntegrityScore: 61.0,
        minDistanceM: 3200,
        timeDeltaMin: 95,
        hasSpeedAnomaly: true,
        hasAisBlackout: false,
        speedAnomalySummary: 'Deceleration recorded in outer TSS lane.',
        isCulprit: false,
        displayCategory: 'Speed Anomaly',
        badgeColor: 'orange',
        speedProfile: [
          { time: '08:00', sog: 14.4, baseline: 14.5 },
          { time: '12:00', sog: 8.5, baseline: 14.5 },
          { time: '16:00', sog: 13.3, baseline: 14.5 }
        ],
        track: [
          { lat: 28.68, lon: -90.20, timestamp: '24 Nov 10:00', sog: 14.4, cog: 155 },
          { lat: 28.48, lon: -90.04, timestamp: '24 Nov 14:05', sog: 8.5, cog: 155 },
          { lat: 28.28, lon: -89.88, timestamp: '24 Nov 18:10', sog: 13.3, cog: 154 }
        ]
      },
      {
        id: 'v-004',
        name: 'Vessel FA2033',
        mmsi: '477123900',
        imo: '9398822',
        callSign: 'VRGT6',
        flag: 'Hong Kong (HK)',
        type: 'Container Ship',
        draughtM: 13.0,
        lengthM: 294,
        destination: 'VERACRUZ',
        riskScore: 55.0,
        proximityScore: 45.0,
        timeOverlapScore: 50.0,
        behaviorScore: 40.0,
        aisIntegrityScore: 50.0,
        minDistanceM: 5200,
        timeDeltaMin: 120,
        hasSpeedAnomaly: true,
        hasAisBlackout: false,
        speedAnomalySummary: 'Speed variation of -2 knots during transit.',
        isCulprit: false,
        displayCategory: 'Speed Anomaly',
        badgeColor: 'orange',
        rangeBar: { value: -2, min: -10, max: 10 },
        speedProfile: [
          { time: '08:00', sog: 16.2, baseline: 16.0 },
          { time: '14:00', sog: 14.0, baseline: 16.0 }
        ],
        track: [
          { lat: 28.75, lon: -89.70, timestamp: '24 Nov 11:00', sog: 16.2, cog: 200 },
          { lat: 28.30, lon: -89.50, timestamp: '24 Nov 15:30', sog: 14.0, cog: 200 }
        ]
      },
      {
        id: 'v-005',
        name: 'Vessel DA89122',
        mmsi: '316024000',
        imo: '9283711',
        callSign: 'CFD21',
        flag: 'Canada (CA)',
        type: 'Cargo Vessel',
        draughtM: 9.5,
        lengthM: 190,
        destination: 'TAMPA',
        riskScore: 38.0,
        proximityScore: 35.0,
        timeOverlapScore: 32.0,
        behaviorScore: 30.0,
        aisIntegrityScore: 80.0,
        minDistanceM: 8500,
        timeDeltaMin: 180,
        hasSpeedAnomaly: false,
        hasAisBlackout: false,
        speedAnomalySummary: 'Historical track verified normal.',
        isCulprit: false,
        displayCategory: 'Past anomaly trajectory',
        badgeColor: 'green',
        speedProfile: [
          { time: '08:00', sog: 15.0, baseline: 15.0 },
          { time: '16:00', sog: 14.8, baseline: 15.0 }
        ],
        track: [
          { lat: 28.60, lon: -89.40, timestamp: '24 Nov 12:00', sog: 15.0, cog: 180 },
          { lat: 28.10, lon: -89.40, timestamp: '24 Nov 18:00', sog: 14.8, cog: 180 }
        ]
      },
      {
        id: 'v-006',
        name: 'Vessel DA89607',
        mmsi: '228381000',
        imo: '9182741',
        callSign: 'FNJK',
        flag: 'France (FR)',
        type: 'Container Ship',
        draughtM: 12.0,
        lengthM: 260,
        destination: 'MIAMI',
        riskScore: 28.5,
        proximityScore: 25.0,
        timeOverlapScore: 28.0,
        behaviorScore: 20.0,
        aisIntegrityScore: 90.0,
        minDistanceM: 12000,
        timeDeltaMin: 210,
        hasSpeedAnomaly: false,
        hasAisBlackout: false,
        speedAnomalySummary: 'Standard route outside primary sector.',
        isCulprit: false,
        displayCategory: 'Past anomaly trajectory',
        badgeColor: 'green',
        speedProfile: [
          { time: '08:00', sog: 17.5, baseline: 17.5 },
          { time: '16:00', sog: 17.2, baseline: 17.5 }
        ],
        track: [
          { lat: 28.80, lon: -89.30, timestamp: '24 Nov 10:00', sog: 17.5, cog: 160 },
          { lat: 28.20, lon: -89.10, timestamp: '24 Nov 16:00', sog: 17.2, cog: 160 }
        ]
      },
      {
        id: 'v-007',
        name: 'Vessel FA2023',
        mmsi: '636015000',
        imo: '9372819',
        callSign: 'A8LK2',
        flag: 'Liberia (LR)',
        type: 'Oil Products Tanker',
        draughtM: 11.5,
        lengthM: 210,
        destination: 'CORPUS CHRISTI',
        riskScore: 82.0,
        proximityScore: 78.0,
        timeOverlapScore: 75.0,
        behaviorScore: 85.0,
        aisIntegrityScore: 70.0,
        minDistanceM: 2400,
        timeDeltaMin: 35,
        hasSpeedAnomaly: true,
        hasAisBlackout: false,
        speedAnomalySummary: 'Deceleration of -5 knots detected near edge of hindcast corridor.',
        isCulprit: false,
        displayCategory: 'Speed Anomaly',
        badgeColor: 'red',
        rangeBar: { value: -5, min: -10, max: 10 },
        speedProfile: [
          { time: '08:00', sog: 14.0, baseline: 14.0 },
          { time: '12:00', sog: 9.0, baseline: 14.0 },
          { time: '16:00', sog: 13.5, baseline: 14.0 }
        ],
        track: [
          { lat: 28.65, lon: -90.25, timestamp: '24 Nov 09:30', sog: 14.0, cog: 145 },
          { lat: 28.45, lon: -90.05, timestamp: '24 Nov 13:30', sog: 9.0, cog: 145 },
          { lat: 28.25, lon: -89.85, timestamp: '24 Nov 17:30', sog: 13.5, cog: 145 }
        ]
      }
    ],
    keyframes: [
      { id: 'k-1', time: '24 Nov 08:00', type: 'detection', label: 'Vessel MT NORTH STAR enters Sector 4', severity: 'info' },
      { id: 'k-2', time: '24 Nov 12:15', type: 'speed_drop', label: 'MT NORTH STAR drops speed (14.5 -> 2.3 kn)', severity: 'warning' },
      { id: 'k-3', time: '24 Nov 12:30', type: 'origin', label: 'Estimated Discharge Window (t₀)', severity: 'critical' },
      { id: 'k-4', time: '24 Nov 12:45', type: 'ais_gap', label: 'AIS Signal Gap: 45 min blackout recorded', severity: 'critical' },
      { id: 'k-5', time: '25 Nov 22:30', type: 'satellite', label: 'Sentinel-1 SAR Detection Pass (Spill Delta-08)', severity: 'info' }
    ]
  },
  {
    id: 'INC-MALACCA-2024-03',
    title: 'SPILL-STRAIT-03 (One Fathom Bank West)',
    locationName: 'Strait of Malacca — TSS Traffic Separation Scheme',
    center: [2.88, 101.02],
    zoom: 10,
    status: 'Under Investigation',
    detectionDate: '2024-10-14 06:15 UTC',
    satelliteSensor: 'Sentinel-1A (SAR C-Band GRD)',
    orbitPass: 'Descending Pass #089',
    resolution: '10m Spatial Resolution',
    slick: {
      id: 'SLICK-MAL-03',
      name: 'SPILL-STRAIT-03',
      areaKm2: 26.4,
      perimeterKm: 24.2,
      estimatedVolumeM3: 680,
      estimatedVolumeBarrels: 4277,
      estimatedAgeHours: 19,
      confidence: 91.0,
      thicknessMicrons: 18.4,
      spillType: 'Thick Mineral Oil Discharge',
      isThick: true,
      bonnCode: 'BAOAC Code 3 (Metallic / True Color)',
      faySpreadingRegime: 'Gravity-Viscous Spreading Phase',
      centroid: [2.88, 101.02],
      originPoint: [2.98, 100.86],
      originTimestamp: '2024-10-13 11:15 UTC',
      detectionTimestamp: '2024-10-14 06:15 UTC',
      coordinates: [
        [2.92, 100.95],
        [2.94, 101.05],
        [2.89, 101.12],
        [2.83, 101.06],
        [2.85, 100.94],
        [2.92, 100.95]
      ]
    },
    preprocessing: {
      sensor: 'Sentinel-1A C-Band SAR (IW Mode)',
      radiometricCalibrationFactorDb: -82.9,
      speckleFilterType: 'Refined Lee Filter (3x3 Kernel)',
      speckleSuppressionIndex: 0.925,
      cloudCoveragePercent: 4.2,
      opticalNdwiValidation: 0.81,
      resolutionMeters: 10.0,
      georeferencedCrs: 'EPSG:4326 (WGS 84)'
    },
    weathering: {
      evaporationPercent: 31.2,
      emulsificationWaterPercent: 36.5,
      dynamicViscosityCp: 142.0,
      remainingVolumeM3: 468.0,
      weatheringEngine: 'NOAA PyGNOME & OpenDrift OpenOil'
    },
    metocean: {
      windSpeedKnots: 8.5,
      windDirectionDeg: 220, // SW Monsoon
      currentSpeedKnots: 1.4,
      currentDirectionDeg: 310, // NW Tidal current
      leewayFactor: 0.030,
      seaSurfaceTempC: 29.2,
      waveHeightM: 0.6,
      currentModelSource: 'INCOIS / CMEMS Regional Indo-Pacific',
      windModelSource: 'ECMWF ERA5'
    },
    hindcastTrail: [
      { hoursOffset: 0, lat: 2.88, lon: 101.02, radiusKm: 0.8, timestamp: '14 Oct 06:15' },
      { hoursOffset: -6, lat: 2.91, lon: 100.97, radiusKm: 1.4, timestamp: '14 Oct 00:15' },
      { hoursOffset: -12, lat: 2.94, lon: 100.92, radiusKm: 2.0, timestamp: '13 Oct 18:15' },
      { hoursOffset: -19, lat: 2.98, lon: 100.86, radiusKm: 3.1, timestamp: '13 Oct 11:15 (ORIGIN)' }
    ],
    forecastTrail: [
      { hoursOffset: 0, lat: 2.88, lon: 101.02, radiusKm: 0.8, timestamp: '14 Oct 06:15' },
      { hoursOffset: 12, lat: 2.84, lon: 101.09, radiusKm: 1.8, timestamp: '14 Oct 18:15' },
      { hoursOffset: 24, lat: 2.79, lon: 101.18, radiusKm: 2.9, timestamp: '15 Oct 06:15 (Klang Mangrove Zone)' }
    ],
    vessels: [
      {
        id: 'vm-001',
        name: 'CHEM ORION',
        mmsi: '538006124',
        imo: '9384521',
        callSign: 'V7XQ2',
        flag: 'Marshall Islands (MH)',
        type: 'Chemical Tanker',
        draughtM: 9.8,
        lengthM: 165,
        destination: 'SINGAPORE',
        riskScore: 89.4,
        proximityScore: 94.0,
        timeOverlapScore: 92.0,
        behaviorScore: 86.0,
        aisIntegrityScore: 85.5,
        minDistanceM: 410,
        timeDeltaMin: 18,
        hasSpeedAnomaly: true,
        hasAisBlackout: true,
        speedAnomalySummary: 'Tank washing signature: Sudden zig-zag course change outside TSS with speed drop from 12.8 kn to 4.2 kn.',
        isCulprit: true,
        speedProfile: [
          { time: '08:00', sog: 12.8, baseline: 13.0 },
          { time: '10:30', sog: 12.6, baseline: 13.0 },
          { time: '11:15', sog: 4.2, baseline: 13.0 },
          { time: '12:00', sog: 4.5, baseline: 13.0 },
          { time: '13:30', sog: 12.5, baseline: 13.0 }
        ],
        track: [
          { lat: 3.08, lon: 100.72, timestamp: '13 Oct 08:00', sog: 12.8, cog: 125 },
          { lat: 2.982, lon: 100.862, timestamp: '13 Oct 11:15', sog: 4.2, cog: 128 },
          { lat: 2.86, lon: 101.04, timestamp: '13 Oct 15:00', sog: 12.5, cog: 126 }
        ]
      }
    ],
    keyframes: [
      { id: 'km-1', time: '13 Oct 11:15', type: 'origin', label: 'Suspected chemical wash discharge window', severity: 'critical' },
      { id: 'km-2', time: '14 Oct 06:15', type: 'satellite', label: 'Sentinel-1A SAR Acquisition', severity: 'info' }
    ]
  }
];
