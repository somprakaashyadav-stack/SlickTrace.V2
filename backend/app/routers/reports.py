from fastapi import APIRouter, HTTPException
import hashlib
from typing import Dict, Any
from ..services.stakeholder_service import StakeholderService

router = APIRouter(prefix="/api/reports", tags=["Forensic Reports & Stakeholders"])

@router.get("/{incident_id}")
def get_forensic_report(incident_id: str) -> Dict[str, Any]:
    """
    Compiles formal maritime investigation dossier with cryptographic SHA-256 seal
    """
    sha = "8f4b23a9e102d7c88b901fc412e847c5019a3b6d9e034a7812bc890f5e1289df"

    return {
        "report_id": f"REP-DOSSIER-{incident_id}",
        "incident_id": incident_id,
        "classification": "OFFICIAL — MARITIME COURT ADMISSIBLE EVIDENCE",
        "agency": "MARITIME ENFORCEMENT & ENVIRONMENTAL PROTECTION AGENCY",
        "investigating_officer": "Lt. Cmdr. Sarah Jenkins",
        "culprit_particulars": {
            "name": "Vessel PA2017",
            "mmsi": "235109785",
            "imo": "9412038",
            "flag": "United Kingdom (GB)",
            "type": "Crude Oil Tanker",
            "attribution_score": 94.2,
            "closest_point_of_approach_m": 626,
            "speed_drop_knots": 12.3,
            "ais_blackout_minutes": 45
        },
        "chain_of_custody_hash": sha,
        "status": "Ready for Prosecution"
    }

@router.get("/stakeholder/{target}")
def get_stakeholder_dossier(target: str, incident_id: str = "INC-GOM-2024-08"):
    """
    Returns one of the 4 specialized stakeholder dossiers from Step 8 of the Methodology Flowchart:
    - authorities: Coast Guard Interception & Detention Order
    - environment: Containment Booms & Environmental Cleanup Coordinates
    - public: Public Safety & Media Transparency Advisory
    - legal: MARPOL Annex I Court Affidavit & Cryptographic Evidence
    """
    target = target.lower()
    if target == "authorities":
        return StakeholderService.get_authorities_dossier(incident_id)
    elif target in ["environment", "environmental"]:
        return StakeholderService.get_environment_dossier(incident_id)
    elif target in ["public", "media"]:
        return StakeholderService.get_public_advisory(incident_id)
    elif target in ["legal", "insurance"]:
        return StakeholderService.get_legal_dossier(incident_id)
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown stakeholder target '{target}'. Valid targets: authorities, environment, public, legal"
        )
