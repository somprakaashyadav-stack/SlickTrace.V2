import duckdb
from pathlib import Path
from .config import settings

def get_duckdb_connection():
    settings.DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = duckdb.connect(str(settings.DATABASE_PATH))
    return conn

def init_db():
    conn = get_duckdb_connection()

    # 1. Create Marine Cadastre AIS Table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS ais_records (
            MMSI VARCHAR,
            BaseDateTime TIMESTAMP,
            LAT DOUBLE,
            LON DOUBLE,
            SOG DOUBLE,
            COG DOUBLE,
            Heading DOUBLE,
            VesselName VARCHAR,
            IMO VARCHAR,
            CallSign VARCHAR,
            VesselType VARCHAR,
            Status VARCHAR,
            Length DOUBLE,
            Width DOUBLE,
            Draft DOUBLE,
            Cargo VARCHAR
        );
    """)

    # 2. Create Incidents Table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS incidents (
            id VARCHAR PRIMARY KEY,
            title VARCHAR,
            location_name VARCHAR,
            status VARCHAR,
            detection_date VARCHAR,
            satellite_sensor VARCHAR,
            orbit_pass VARCHAR,
            resolution VARCHAR,
            centroid_lat DOUBLE,
            centroid_lon DOUBLE,
            area_km2 DOUBLE,
            perimeter_km DOUBLE,
            estimated_volume_m3 DOUBLE,
            estimated_age_hours DOUBLE,
            confidence DOUBLE,
            thickness_microns DOUBLE,
            origin_lat DOUBLE,
            origin_lon DOUBLE,
            origin_timestamp VARCHAR
        );
    """)

    # 3. Create Forensic Audit Reports Table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS forensic_reports (
            report_id VARCHAR PRIMARY KEY,
            incident_id VARCHAR,
            generated_at VARCHAR,
            investigating_officer VARCHAR,
            primary_culprit_mmsi VARCHAR,
            culprit_name VARCHAR,
            attribution_score DOUBLE,
            min_cpa_meters DOUBLE,
            speed_anomaly_drop_knots DOUBLE,
            ais_gap_minutes DOUBLE,
            sha256_hash VARCHAR
        );
    """)

    # Check if ais_records table is empty; seed realistic Marine Cadastre dataset if so
    count = conn.execute("SELECT COUNT(*) FROM ais_records").fetchone()[0]
    if count == 0:
        seed_sample_cadastre_data(conn)

    # Check if incidents is empty; seed initial incidents
    inc_count = conn.execute("SELECT COUNT(*) FROM incidents").fetchone()[0]
    if inc_count == 0:
        seed_sample_incidents(conn)

    conn.close()

def seed_sample_cadastre_data(conn):
    """Seed real-world representative AIS records for Indian EEZ (Mumbai High) & international corridors"""
    records = [
        # MT Sagar Ratna (Culprit Crude Oil Tanker in Mumbai High EEZ)
        ("419001420", "2024-11-24 08:00:00", 19.65, 71.02, 14.6, 130, 130, "MT Sagar Ratna", "9412038", "V2AB8", "Crude Oil Tanker", "Underway using engine", 274, 48, 14.8, "Crude Oil"),
        ("419001420", "2024-11-24 10:30:00", 19.58, 71.10, 14.2, 132, 132, "MT Sagar Ratna", "9412038", "V2AB8", "Crude Oil Tanker", "Underway using engine", 274, 48, 14.8, "Crude Oil"),
        ("419001420", "2024-11-24 12:15:00", 19.528, 71.175, 4.8, 135, 135, "MT Sagar Ratna", "9412038", "V2AB8", "Crude Oil Tanker", "Restricted Maneuverability", 274, 48, 14.8, "Crude Oil"),
        ("419001420", "2024-11-24 12:30:00", 19.522, 71.182, 2.3, 135, 135, "MT Sagar Ratna", "9412038", "V2AB8", "Crude Oil Tanker", "Restricted Maneuverability", 274, 48, 14.8, "Crude Oil"),
        ("419001420", "2024-11-24 14:15:00", 19.49, 71.22, 3.4, 138, 138, "MT Sagar Ratna", "9412038", "V2AB8", "Crude Oil Tanker", "Underway using engine", 274, 48, 14.8, "Crude Oil"),
        ("419001420", "2024-11-24 17:00:00", 19.40, 71.32, 13.8, 135, 135, "MT Sagar Ratna", "9412038", "V2AB8", "Crude Oil Tanker", "Underway using engine", 274, 48, 14.8, "Crude Oil"),
        ("419001420", "2024-11-24 21:00:00", 19.28, 71.45, 14.4, 136, 136, "MT Sagar Ratna", "9412038", "V2AB8", "Crude Oil Tanker", "Underway using engine", 274, 48, 14.8, "Crude Oil"),
        
        # MT Al-Zubair (Chemical Tanker)
        ("470128000", "2024-11-24 08:00:00", 19.75, 70.90, 13.2, 140, 140, "MT Al-Zubair", "9588231", "A6AB4", "Chemical / Oil Tanker", "Underway", 182, 32, 11.2, "Chemicals"),
        ("470128000", "2024-11-24 12:30:00", 19.60, 71.05, 13.1, 140, 140, "MT Al-Zubair", "9588231", "A6AB4", "Chemical / Oil Tanker", "Underway", 182, 32, 11.2, "Chemicals"),
        ("470128000", "2024-11-24 16:00:00", 19.45, 71.20, 13.0, 142, 142, "MT Al-Zubair", "9588231", "A6AB4", "Chemical / Oil Tanker", "Underway", 182, 32, 11.2, "Chemicals"),

        # MV Bharat Pride (Bulk Carrier)
        ("419000850", "2024-11-24 08:00:00", 19.80, 71.20, 11.5, 150, 150, "MV Bharat Pride", "9344198", "AWXY", "Bulk Carrier", "Underway", 225, 32, 12.5, "Dry Bulk"),
        ("419000850", "2024-11-24 12:30:00", 19.55, 71.40, 11.6, 150, 150, "MV Bharat Pride", "9344198", "AWXY", "Bulk Carrier", "Underway", 225, 32, 12.5, "Dry Bulk"),
        ("419000850", "2024-11-24 18:00:00", 19.20, 71.65, 11.4, 152, 152, "MV Bharat Pride", "9344198", "AWXY", "Bulk Carrier", "Underway", 225, 32, 12.5, "Dry Bulk"),

        # MT Petro Gulf (Gujarat Vadinar Corridor)
        ("419000980", "2024-11-25 12:00:00", 22.65, 69.10, 12.5, 120, 120, "MT Petro Gulf", "9482110", "AUVC", "Product Tanker", "Underway", 180, 30, 10.4, "Petroleum"),
        ("419000980", "2024-11-25 18:00:00", 22.58, 69.22, 3.2, 125, 125, "MT Petro Gulf", "9482110", "AUVC", "Product Tanker", "Restricted Maneuverability", 180, 30, 10.4, "Petroleum")
    ]

    conn.executemany("""
        INSERT INTO ais_records VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, records)

def seed_sample_incidents(conn):
    conn.execute("""
        INSERT INTO incidents VALUES (
            'INC-IN-MUMBAI-2024',
            'SPILL-MUMBAI-HIGH-01 (Western Offshore Basin)',
            'Arabian Sea — Mumbai High EEZ (India)',
            'Critical Alert',
            '2024-11-25 22:30 UTC',
            'ISRO EOS-04 (RISAT-1A SAR) & Sentinel-1B',
            'Ascending Pass #142 (IW C-Band Dual-Pol)',
            '10m Spatial Resolution (VV+VH)',
            19.42, 71.32,
            48.3, 38.6,
            1250, 34,
            94.2, 25.8,
            19.52, 71.18,
            '2024-11-24 12:30 UTC'
        );
    """)
