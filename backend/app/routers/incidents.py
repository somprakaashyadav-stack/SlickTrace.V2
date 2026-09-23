from fastapi import APIRouter, HTTPException
from typing import List
from ..database import get_duckdb_connection
from ..schemas import IncidentSummary

router = APIRouter(prefix="/api/incidents", tags=["Incidents"])

@router.get("", response_model=List[IncidentSummary])
def get_incidents():
    """List active maritime oil spill incidents in EEZ"""
    conn = get_duckdb_connection()
    rows = conn.execute("""
        SELECT id, title, location_name, status, detection_date, satellite_sensor, area_km2
        FROM incidents
    """).fetchall()
    conn.close()

    return [
        IncidentSummary(
            id=r[0],
            title=r[1],
            location_name=r[2],
            status=r[3],
            detection_date=r[4],
            satellite_sensor=r[5],
            slick_area_km2=r[6],
            primary_culprit_name="Vessel PA2017",
            primary_culprit_score=94.2
        )
        for r in rows
    ]

@router.get("/{incident_id}")
def get_incident_detail(incident_id: str):
    """Retrieve full incident telemetry and parameters"""
    conn = get_duckdb_connection()
    row = conn.execute("SELECT * FROM incidents WHERE id = ?", [incident_id]).fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Incident not found")

    return {
        "id": row[0],
        "title": row[1],
        "location_name": row[2],
        "status": row[3],
        "detection_date": row[4],
        "satellite_sensor": row[5],
        "orbit_pass": row[6],
        "resolution": row[7],
        "centroid": [row[8], row[9]],
        "area_km2": row[10],
        "perimeter_km": row[11],
        "estimated_volume_m3": row[12],
        "estimated_age_hours": row[13],
        "confidence": row[14],
        "thickness_microns": row[15],
        "origin_point": [row[16], row[17]],
        "origin_timestamp": row[18]
    }
