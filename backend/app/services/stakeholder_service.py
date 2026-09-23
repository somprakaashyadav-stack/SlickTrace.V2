"""
Step 8: Multi-Stakeholder Output Hub
Generates 4 dedicated official dossiers matching the 4 deliverable branches at the bottom of the Methodology Flowchart:
1. Authorities (Action & Investigation)
2. Environment Agencies (Assessment & Cleanup)
3. Public / Media (Awareness & Transparency)
4. Insurance / Legal (Evidence & Claims)
Supports Indian EEZ (Mumbai High, Gulf of Kutch, Andaman SLOC) and Global EEZ scenarios.
"""
from typing import Dict, Any, List
from ..schemas import (
    AuthoritiesDossier,
    EnvironmentAgencyDossier,
    PublicMediaAdvisory,
    LegalInsuranceDossier
)

class StakeholderService:
    @staticmethod
    def get_authorities_dossier(incident_id: str = "INC-IN-MUMBAI-2024") -> AuthoritiesDossier:
        """
        Deliverable 1 for AUTHORITIES: Action & Investigation
        Indian Coast Guard / Maritime Law Enforcement Interception Order
        """
        if "MUMBAI" in incident_id:
            return AuthoritiesDossier(
                document_title="INDIAN COAST GUARD MARITIME INTERCEPTION & DETENTION DIRECTIVE",
                classification="LAW ENFORCEMENT SENSITIVE // PRIORITY 1",
                agency="INDIAN COAST GUARD (ICG REGION WEST) & DIRECTORATE GENERAL OF SHIPPING (DGS)",
                warrant_ref=f"ICG-DETAIN-{incident_id}-SAGARRATNA",
                incident_id=incident_id,
                action_type="BOARDING, SEIZURE & VESSEL ARREST ORDER",
                target_vessel={
                    "name": "MT Sagar Ratna",
                    "mmsi": "419001420",
                    "imo": "9412038",
                    "call_sign": "V2AB8",
                    "flag": "India (MID 419)",
                    "vessel_type": "Crude Oil Tanker (VLCC)",
                    "current_heading": 135.0,
                    "current_speed_knots": 14.4,
                    "suspicion_score": "94.2% Primary Culprit",
                    "cpa_to_discharge_origin_meters": 626
                },
                intercept_vector={
                    "patrol_cutter_assigned": "ICGS SAMRAT (Offshore Patrol Vessel OPV-02)",
                    "rendezvous_coordinates": "19.380°N, 71.450°E (Mumbai High EEZ Sector)",
                    "eta_to_intercept": "1h 30m (Interception Vector Activated)",
                    "tactical_instructions": "Execute formal boarding under Indian Merchant Shipping Act (Part XIA) and UNCLOS Art 220. Audit Oil Record Book (ORB Part I & II), lock ODME valves, and extract bunker/bilge fuel samples for Gas Chromatography-Mass Spectrometry (GC-MS) hydrocarbon fingerprinting at CSIR-NIO Goa."
                },
                legal_basis="Merchant Shipping Act 1958 (Part XIA - Prevention & Containment of Pollution of the Sea by Oil), Territorial Waters & EEZ Act 1976, MARPOL 73/78 Annex I.",
                commandant_signature="Inspector General, Commander Coast Guard Region (West), Mumbai"
            )
        elif "KUTCH" in incident_id:
            return AuthoritiesDossier(
                document_title="INDIAN COAST GUARD INTERCEPTION ORDER - GULF OF KUTCH",
                classification="LAW ENFORCEMENT SENSITIVE // PRIORITY 1",
                agency="INDIAN COAST GUARD (ICG REGION NORTH-WEST) & DEENDAYAL PORT AUTHORITY",
                warrant_ref=f"ICG-DETAIN-{incident_id}-ALZUBAIR",
                incident_id=incident_id,
                action_type="BOARDING & PORT DETENTION WARRANT",
                target_vessel={
                    "name": "MT Al-Zubair",
                    "mmsi": "470123000",
                    "imo": "9382174",
                    "call_sign": "A6EB9",
                    "flag": "UAE (MID 470)",
                    "vessel_type": "Product Tanker (Aframax)",
                    "current_heading": 78.0,
                    "current_speed_knots": 11.8,
                    "suspicion_score": "91.8% Primary Culprit",
                    "cpa_to_discharge_origin_meters": 410
                },
                intercept_vector={
                    "patrol_cutter_assigned": "ICGS SAMUDRA PAVAK (Pollution Control Vessel PCV-02)",
                    "rendezvous_coordinates": "22.500°N, 69.420°E (Vadinar SPM Corridor)",
                    "eta_to_intercept": "45m",
                    "tactical_instructions": "Intercept vessel prior to Gulf of Kutch Marine Sanctuary boundary. Impound oily water discharge logs and ODME recorder."
                },
                legal_basis="Merchant Shipping Act 1958 (Part XIA), Indian Ports Act 1908, Wildlife Protection Act 1972.",
                commandant_signature="Commander, Coast Guard District No. 1 (Gujarat), Porbandar"
            )
        else:
            return AuthoritiesDossier(
                document_title="MARITIME INTERCEPTION & DETENTION DIRECTIVE",
                classification="LAW ENFORCEMENT SENSITIVE // PRIORITY 1",
                agency="MARITIME LAW ENFORCEMENT & PORT STATE CONTROL",
                warrant_ref=f"PSC-DETAIN-{incident_id}-TARGET",
                incident_id=incident_id,
                action_type="BOARDING, SEIZURE & VESSEL ARREST ORDER",
                target_vessel={
                    "name": "Target Vessel",
                    "mmsi": "419001420",
                    "imo": "9412038",
                    "call_sign": "V2AB8",
                    "flag": "India",
                    "vessel_type": "Crude Oil Tanker",
                    "current_heading": 135.0,
                    "current_speed_knots": 14.4,
                    "suspicion_score": "94.2% Primary Culprit",
                    "cpa_to_discharge_origin_meters": 626
                },
                intercept_vector={
                    "patrol_cutter_assigned": "ICGS SAMRAT / Coast Guard Patrol",
                    "rendezvous_coordinates": "19.380°N, 71.450°E",
                    "eta_to_intercept": "1h 30m",
                    "tactical_instructions": "Execute formal boarding, audit Oil Record Book, extract bunker samples for GC-MS testing."
                },
                legal_basis="Merchant Shipping Act 1958, MARPOL 73/78 Annex I, UNCLOS Art 220.",
                commandant_signature="Commanding Officer, Maritime Law Enforcement Division"
            )

    @staticmethod
    def get_environment_dossier(incident_id: str = "INC-IN-MUMBAI-2024") -> EnvironmentAgencyDossier:
        """
        Deliverable 2 for ENVIRONMENT AGENCIES: Assessment & Cleanup
        Containment Booming, Skimmer Operations & Ecological Impact Analysis
        """
        if "MUMBAI" in incident_id:
            return EnvironmentAgencyDossier(
                document_title="EMERGENCY OIL SPILL CONTAINMENT & CLEANUP TACTICAL PLAN (MUMBAI OFFSHORE)",
                assessment_tier="NATIONAL OIL SPILL DISASTER CONTINGENCY PLAN (NOS-DCP) TIER 2",
                ecological_zone="Arabian Sea Outer Continental Shelf & Konkan Coastal Sensitive Mangrove Ecosystems",
                slick_dimensions={
                    "area_km2": 48.3,
                    "perimeter_km": 38.6,
                    "thickness_microns": 25.8,
                    "classification": "Thick Mineral Oil Discharge (Persian Gulf Crude / Bonn Code 4)",
                    "volume_barrels": 7862.0,
                    "volume_m3": 1250.0
                },
                containment_plan={
                    "boom_length_required_meters": 4500,
                    "containment_strategy": "J-Configuration Deflection Booming & Dynamic Open-Sea Sweeping with Side-Sweeping Arms",
                    "skimmer_vessels_dispatched": 4,
                    "dispersant_readiness": "Type-III Oil Spill Dispersant (OSD) authorized for offshore application under NOS-DCP norms"
                },
                booming_coordinates=[
                    (19.480, 71.220),
                    (19.500, 71.300),
                    (19.460, 71.420),
                    (19.380, 71.450)
                ],
                recommended_skimmer_type="Oleophilic Brush-Drum & High-Capacity Disc Skimmers (Desmi Ro-Clean DBD-50)",
                weathering_status={
                    "evaporated_percent": 24.5,
                    "water_emulsification_percent": 42.0,
                    "viscosity_centipoise": 185.0,
                    "weathering_regime": "Moderate Weathering (INCOIS SARAT Emulsification Progression)"
                },
                impact_alert="CRITICAL ALERT: INCOIS OSF drift forecast indicates eastward advection towards Alibaug/Murud coast within 36 hours. Immediate deployment of exclusion boom across sensitive creeks (Dharamtar & Rajpuri) required."
            )
        else:
            return EnvironmentAgencyDossier(
                document_title="EMERGENCY OIL SPILL CONTAINMENT & CLEANUP TACTICAL PLAN",
                assessment_tier="TIER 2 NOS-DCP REGIONAL RESPONSE",
                ecological_zone="Indian EEZ Maritime Sensitive Corridor",
                slick_dimensions={
                    "area_km2": 48.3,
                    "perimeter_km": 38.6,
                    "thickness_microns": 25.8,
                    "classification": "Thick Mineral Oil Discharge (BAOAC Code 4)",
                    "volume_barrels": 7862.0,
                    "volume_m3": 1250.0
                },
                containment_plan={
                    "boom_length_required_meters": 4500,
                    "containment_strategy": "J-Configuration Deflection Booming & Open-Sea Sweeping",
                    "skimmer_vessels_dispatched": 4,
                    "dispersant_readiness": "Type-III OSD pre-authorized under Indian NOS-DCP protocol"
                },
                booming_coordinates=[
                    (19.480, 71.220),
                    (19.500, 71.300),
                    (19.460, 71.420),
                    (19.380, 71.450)
                ],
                recommended_skimmer_type="Oleophilic Brush-Drum Skimmer",
                weathering_status={
                    "evaporated_percent": 24.5,
                    "water_emulsification_percent": 42.0,
                    "viscosity_centipoise": 185.0,
                    "weathering_regime": "Moderate Weathering"
                },
                impact_alert="Ecological containment active. Shoreline protection exclusion booms prioritized."
            )

    @staticmethod
    def get_public_advisory(incident_id: str = "INC-IN-MUMBAI-2024") -> PublicMediaAdvisory:
        """
        Deliverable 3 for PUBLIC / MEDIA: Awareness & Transparency
        Maritime Safety Advisory & Transparent Citizen Bulletin
        """
        return PublicMediaAdvisory(
            advisory_headline="OFFICIAL MARITIME ENVIRONMENTAL ADVISORY: INDIAN EEZ OFFSHORE DISCHARGE CONTAINMENT",
            release_date="November 26, 2024 - 14:00 IST",
            status_summary="Automated satellite surveillance (ISRO EOS-04 RISAT-1A SAR & ESA Sentinel-1) identified an offshore hydrocarbon discharge in the Indian EEZ. Emergency containment is underway by Indian Coast Guard Pollution Control Vessels. The responsible vessel has been pinpointed with 94.2% AI confidence and intercepted for statutory inspection.",
            affected_maritime_zone="Arabian Sea — Mumbai High EEZ Sector / West Coast India",
            coastal_guidelines=[
                "Commercial fishing trawlers and artisanal crafts are advised to maintain a 10-nautical-mile safety buffer around coordinates 19.42°N, 71.32°E.",
                "Mainland coastal public beaches (Mumbai, Alibaug, Murud) remain SAFE and OPEN; offshore booming is preventing shoreline contact.",
                "Report any oiled marine life or sightings to the Indian Coast Guard Marine Emergency Hotline: 1554."
            ],
            environmental_safety_status="Controlled Offshore Containment; Threat to Mainland Coast Mitigated by Active Booming & ICG PCV Operations",
            transparency_metrics={
                "satellite_verification": "ISRO EOS-04 (RISAT-1A SAR) & ESA Sentinel-1B SAR Dual-Pol",
                "spill_volume_m3": 1250.0,
                "responsible_vessel_status": "Target Vessel Intercepted by Indian Coast Guard (ICGS SAMRAT)",
                "open_data_transparency_portal": f"https://slicktrace.gov.in/transparency/{incident_id}"
            },
            hotline="1554 (Indian Coast Guard National Maritime Search, Rescue & Spill Hotline)"
        )

    @staticmethod
    def get_legal_dossier(incident_id: str = "INC-IN-MUMBAI-2024") -> LegalInsuranceDossier:
        """
        Deliverable 4 for INSURANCE / LEGAL: Evidence & Claims
        Court-Admissible Evidence Affidavit, MARPOL Violations & Liability Package
        """
        return LegalInsuranceDossier(
            affidavit_title="OFFICIAL EXPERT EVIDENCE AFFIDAVIT & STATUTORY DAMAGE CLAIM DOSSIER",
            case_ref=f"SLICKTRACE-LEGAL-{incident_id}",
            jurisdiction="High Court of Judicature at Bombay (Admiralty Jurisdiction) / National Green Tribunal (NGT) / ITLOS",
            primary_defendant={
                "vessel_name": "MT Sagar Ratna",
                "registered_owner": "Apex Maritime International Ltd.",
                "flag_state": "India (MID 419)",
                "imo_number": "9412038",
                "mmsi": "419001420",
                "protection_and_indemnity_club": "The Standard Club P&I Mutual Insurance / Gard P&I"
            },
            marpol_violations=[
                "Merchant Shipping Act 1958 (Part XIA, Section 356J): Unlawful discharge of oil or oily mixture into the maritime zones of India.",
                "MARPOL 73/78 Annex I, Regulation 15: Prohibited discharge of oily bilge water and tank washings without 15 ppm filtration equipment.",
                "MARPOL 73/78 Annex I, Regulation 17: Falsification and fraudulent omission of entries in the official Oil Record Book (ORB).",
                "SOLAS Chapter V, Regulation 19: Willful deactivation of Automatic Identification System (AIS) Class A transponder for 45 minutes during EEZ transit.",
                "Environment (Protection) Act 1986: Damage to marine coastal ecology and offshore natural resources."
            ],
            evidence_chain=[
                {
                    "timestamp": "2024-11-24 12:15 UTC",
                    "source": "Directorate General of Lighthouses & Lightships (DGLL) National AIS",
                    "telemetry": "Vessel decelerated abruptly from 14.5 kn to 2.3 kn while maintaining heading 135° in Mumbai High fairway.",
                    "forensic_significance": "Discharge Speed Anomaly: Intentional deceleration to slow-steaming speed typical of de-ballasting slop."
                },
                {
                    "timestamp": "2024-11-24 12:30 UTC",
                    "source": "OpenDrift Lagrangian Solver + INCOIS High-Resolution ROMS Currents",
                    "telemetry": "Discharge origin coordinates pinpointed at 19.520°N, 71.180°E. Vessel CPA distance: 626 meters at exact release timestamp.",
                    "forensic_significance": "Spatio-Temporal Coincidence: Conclusive match between vessel historical track and hindcast slick origin."
                },
                {
                    "timestamp": "2024-11-24 12:45 UTC",
                    "source": "Indian Coast Guard Coastal Radar Chain Network (ICG CRCN)",
                    "telemetry": "Vessel silenced AIS Class A transponder for 45 continuous minutes during discharge operation.",
                    "forensic_significance": "Dark Ship Concealment: Intentional evasion of maritime tracking during illicit discharge."
                },
                {
                    "timestamp": "2024-11-25 22:30 UTC",
                    "source": "ISRO EOS-04 (RISAT-1A SAR) & ESA Sentinel-1B SAR IW Mode",
                    "telemetry": "Radar backscatter depression of -7.8 dB confirms 48.3 km² thick mineral crude oil slick (1,250 m³ discharge).",
                    "forensic_significance": "Physical Verification: Scientific satellite radar proof meeting Bonn Agreement optical/radar criteria."
                }
            ],
            chain_of_custody_hash_sha256="8f4b23a9e102d7c88b901fc412e847c5019a3b6d9e034a7812bc890f5e1289df",
            estimated_damage_claim_usd="₹124.50 Crores / $14,850,000 USD (Cleanup Operations, INCOIS Ecological Damage Assessment & Merchant Shipping Act Statutory Penalties)",
            prosecuting_attorney="Standing Counsel for Maritime Enforcement, Ministry of Ports, Shipping & Waterways / Directorate General of Shipping"
        )
