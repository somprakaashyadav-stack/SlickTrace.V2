from fastapi import APIRouter
from ..schemas import DriftSimRequest, DriftSimResponse
from ..services.drift_service import DriftService

router = APIRouter(prefix="/api/drift", tags=["Hydrodynamic Drift"])

@router.post("/simulate", response_model=DriftSimResponse)
def run_drift_simulation(request: DriftSimRequest):
    """
    Solves Lagrangian vector drift equation:
    - Traces backward in time (hindcasting) to locate origin (x0, y0, t0)
    - Traces forward in time (forecasting) to project coastal impact
    """
    return DriftService.simulate_drift(request)
