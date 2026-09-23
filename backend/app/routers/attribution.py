from fastapi import APIRouter
from ..schemas import AttributionQueryRequest, AttributionResponse
from ..services.attribution_service import AttributionService

router = APIRouter(prefix="/api/attribution", tags=["AIS Attribution"])

@router.post("/correlate", response_model=AttributionResponse)
def correlate_ais_traffic(request: AttributionQueryRequest):
    """
    Executes spatio-temporal corridor query on DuckDB Marine Cadastre records
    and calculates multi-factor culprit scores for suspect vessels.
    """
    return AttributionService.calculate_attribution(request)
