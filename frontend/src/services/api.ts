const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
let cleanUrl = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;
if (!cleanUrl.endsWith('/api')) {
  cleanUrl = `${cleanUrl}/api`;
}
const API_BASE_URL = cleanUrl;

export interface DetectionPayload {
  sensor: string;
  confidence_threshold: number;
  filter_low_wind: boolean;
  filter_biogenic: boolean;
  filter_algae: boolean;
  sar_opacity: number;
}

export interface DriftPayload {
  incident_id: string;
  detection_lat: number;
  detection_lon: number;
  detection_time: string;
  slick_area_km2: number;
  wind_speed_knots?: number;
  wind_direction_deg?: number;
  current_speed_knots?: number;
  current_direction_deg?: number;
  leeway_factor?: number;
  max_hours_backward?: number;
  forecast_hours_forward?: number;
}

export interface AttributionPayload {
  origin_lat: number;
  origin_lon: number;
  origin_time: string;
  temporal_window_hours?: number;
  spatial_radius_km?: number;
}

export interface AlertPayload {
  incident_id: string;
  result_label: string;
  confidence: number;
  location_name: string;
  estimated_area_km2: number;
  estimated_barrels: number;
  recipient_email?: string;
}

export const api = {
  // Check backend health
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch {
      return { status: 'offline' };
    }
  },

  // Get active incidents from DuckDB
  async getIncidents() {
    const res = await fetch(`${API_BASE_URL}/incidents`);
    if (!res.ok) throw new Error('Failed to fetch incidents');
    return await res.json();
  },

  // Trigger AI SAR detection
  async processDetection(payload: DetectionPayload) {
    const res = await fetch(`${API_BASE_URL}/detection/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to process detection');
    return await res.json();
  },

  // Run hydrodynamic drift simulation
  async runDriftSimulation(payload: DriftPayload) {
    const res = await fetch(`${API_BASE_URL}/drift/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to run drift simulation');
    return await res.json();
  },

  // Query Marine Cadastre AIS correlation
  async correlateAis(payload: AttributionPayload) {
    const res = await fetch(`${API_BASE_URL}/attribution/correlate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to correlate AIS');
    return await res.json();
  },

  // Dispatch emergency alert notification
  async dispatchAlert(payload: AlertPayload) {
    const res = await fetch(`${API_BASE_URL}/detection/dispatch-alert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to dispatch alert');
    return await res.json();
  },

  // Fetch court-admissible forensic report
  async getForensicReport(incidentId: string) {
    const res = await fetch(`${API_BASE_URL}/reports/${incidentId}`);
    if (!res.ok) throw new Error('Failed to fetch report');
    return await res.json();
  },

  // Fetch specialized stakeholder dossier (authorities, environment, public, legal)
  async getStakeholderDossier(target: string, incidentId: string = 'INC-GOM-2024-08') {
    const res = await fetch(`${API_BASE_URL}/reports/stakeholder/${target}?incident_id=${incidentId}`);
    if (!res.ok) throw new Error(`Failed to fetch ${target} stakeholder dossier`);
    return await res.json();
  },
};
