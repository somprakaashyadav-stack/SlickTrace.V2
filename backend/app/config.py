import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / '.env')

class Settings:
    PROJECT_NAME: str = "SlickTrace V2 - Maritime Oil Spill Surveillance API"
    VERSION: str = "2.0.0"
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000))
    CORS_ORIGINS: list[str] = os.getenv(
        "CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
    ).split(",")

    # Databases
    DATABASE_PATH: Path = BASE_DIR / os.getenv("DATABASE_PATH", "data/slicktrace.duckdb")
    SQLITE_DB_PATH: Path = BASE_DIR / os.getenv("SQLITE_DB_PATH", "data/slicktrace_metadata.db")
    CADASTRE_DATA_PATH: Path = BASE_DIR / os.getenv("MARINE_CADASTRE_DATA_PATH", "data/sample_cadastre_ais.csv")

    # API Keys & Endpoints
    SENTINEL_HUB_CLIENT_ID: str = os.getenv("SENTINEL_HUB_CLIENT_ID", "")
    SENTINEL_HUB_CLIENT_SECRET: str = os.getenv("SENTINEL_HUB_CLIENT_SECRET", "")
    COPERNICUS_API_KEY: str = os.getenv("COPERNICUS_API_KEY", "")
    OPEN_METEO_MARINE_API: str = os.getenv("OPEN_METEO_MARINE_API", "https://marine-api.open-meteo.com/v1/marine")
    COPERNICUS_MARINE_USERNAME: str = os.getenv("COPERNICUS_MARINE_USERNAME", "")
    COPERNICUS_MARINE_PASSWORD: str = os.getenv("COPERNICUS_MARINE_PASSWORD", "")

    # Physics Model Defaults
    DEFAULT_LEEWAY: float = float(os.getenv("DEFAULT_LEEWAY_FACTOR", 0.032))
    MAX_HINDCAST_HOURS: int = int(os.getenv("MAX_HINDCAST_HOURS", 48))

settings = Settings()
