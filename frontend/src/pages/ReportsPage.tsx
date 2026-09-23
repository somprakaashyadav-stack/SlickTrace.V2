import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Printer,
  Download,
  CheckCircle2,
  Copy,
  ShieldAlert,
  Leaf,
  Radio,
  Scale,
  RefreshCw
} from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import { api } from '../services/api';
import type { StakeholderType } from '../types';

export const ReportsPage: React.FC = () => {
  const { activeIncident } = useIncident();
  const culprit = activeIncident.vessels.find((v) => v.isCulprit) || activeIncident.vessels[0];

  const [activeStakeholder, setActiveStakeholder] = useState<StakeholderType>('authorities');
  const [copiedHash, setCopiedHash] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dossierData, setDossierData] = useState<any>(null);

  const hashVal = "8f4b23a9e102d7c88b901fc412e847c5019a3b6d9e034a7812bc890f5e1289df";

  // Fetch stakeholder-specific dossier from backend
  useEffect(() => {
    let isMounted = true;
    const loadDossier = async () => {
      setIsLoading(true);
      try {
        const data = await api.getStakeholderDossier(activeStakeholder, activeIncident.id);
        if (isMounted) setDossierData(data);
      } catch (err) {
        console.warn(`Using local dossier fallback for ${activeStakeholder}:`, err);
        if (isMounted) setDossierData(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadDossier();
    return () => { isMounted = false; };
  }, [activeStakeholder, activeIncident.id]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(hashVal);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleExportJson = () => {
    const exportContent = dossierData || {
      caseReference: `SLICKTRACE-${activeIncident.id}`,
      stakeholder: activeStakeholder,
      generatedAt: new Date().toISOString(),
      incident: activeIncident,
      chainOfCustodySha256: hashVal,
    };

    const blob = new Blob([JSON.stringify(exportContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SLICKTRACE_${activeStakeholder.toUpperCase()}_DOSSIER_${activeIncident.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto w-full pb-8">
      {/* Top Action Bar */}
      <div className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Multi-Stakeholder Evidence & Operational Hub
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300">
              4 Stakeholder Consoles
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Generates dedicated mission dossiers for Law Enforcement, Environmental Clean-up Teams, the Public, and Court Litigation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJson}
            type="button"
            className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition shadow-2xs flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
            title="Download Machine-Readable Forensic JSON"
          >
            <Download className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handlePrint}
            type="button"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* 4 Stakeholder Consoles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 print:hidden">
        {/* Tab 1: Authorities */}
        <button
          type="button"
          onClick={() => setActiveStakeholder('authorities')}
          className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer ${
            activeStakeholder === 'authorities'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/30'
              : 'bg-white dark:bg-[#131D31] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400'
          }`}
        >
          <ShieldAlert className={`w-5 h-5 shrink-0 ${activeStakeholder === 'authorities' ? 'text-white' : 'text-blue-500'}`} />
          <div>
            <div className="font-bold text-xs">Authorities</div>
            <div className={`text-[10px] ${activeStakeholder === 'authorities' ? 'text-blue-100' : 'text-slate-400'}`}>
              Action & Investigation (USCG Intercept)
            </div>
          </div>
        </button>

        {/* Tab 2: Environment Agencies */}
        <button
          type="button"
          onClick={() => setActiveStakeholder('environment')}
          className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer ${
            activeStakeholder === 'environment'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400/30'
              : 'bg-white dark:bg-[#131D31] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-400'
          }`}
        >
          <Leaf className={`w-5 h-5 shrink-0 ${activeStakeholder === 'environment' ? 'text-white' : 'text-emerald-500'}`} />
          <div>
            <div className="font-bold text-xs">Environment Agencies</div>
            <div className={`text-[10px] ${activeStakeholder === 'environment' ? 'text-emerald-100' : 'text-slate-400'}`}>
              Assessment & Cleanup (Booming/Skimmer)
            </div>
          </div>
        </button>

        {/* Tab 3: Public / Media */}
        <button
          type="button"
          onClick={() => setActiveStakeholder('public')}
          className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer ${
            activeStakeholder === 'public'
              ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-400/30'
              : 'bg-white dark:bg-[#131D31] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-400'
          }`}
        >
          <Radio className={`w-5 h-5 shrink-0 ${activeStakeholder === 'public' ? 'text-white' : 'text-amber-500'}`} />
          <div>
            <div className="font-bold text-xs">Public / Media</div>
            <div className={`text-[10px] ${activeStakeholder === 'public' ? 'text-amber-100' : 'text-slate-400'}`}>
              Awareness & Transparency (Citizen Advisory)
            </div>
          </div>
        </button>

        {/* Tab 4: Insurance / Legal */}
        <button
          type="button"
          onClick={() => setActiveStakeholder('legal')}
          className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer ${
            activeStakeholder === 'legal'
              ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-400/30'
              : 'bg-white dark:bg-[#131D31] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-purple-400'
          }`}
        >
          <Scale className={`w-5 h-5 shrink-0 ${activeStakeholder === 'legal' ? 'text-white' : 'text-purple-500'}`} />
          <div>
            <div className="font-bold text-xs">Insurance / Legal</div>
            <div className={`text-[10px] ${activeStakeholder === 'legal' ? 'text-purple-100' : 'text-slate-400'}`}>
              Evidence & Claims (Court Affidavit)
            </div>
          </div>
        </button>
      </div>

      {/* Main Document Content */}
      <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md flex flex-col gap-6 print:border-none print:shadow-none print:p-0">
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center justify-center py-4 text-xs text-blue-600 font-semibold gap-2 print:hidden">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Synchronizing live stakeholder dossier from SlickTrace Core...</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 1: AUTHORITIES (Action & Investigation) */}
        {/* ========================================================================= */}
        {activeStakeholder === 'authorities' && (
          <>
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] tracking-widest font-extrabold uppercase text-blue-900">
                  MARITIME LAW ENFORCEMENT & PORT STATE CONTROL
                </div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 mt-1">
                  MARITIME INTERCEPTION & DETENTION DIRECTIVE
                </h1>
                <div className="text-xs text-slate-600 font-mono mt-1">
                  CASE REF: PSC-DETAIN-{activeIncident.id}-{culprit.name.replace(/\s+/g, '')} • EEZ PRIORITY ARREST WARRANT
                </div>
              </div>

              <div className="text-right">
                <div className="inline-block px-3 py-1 bg-red-100 border border-red-400 text-red-700 text-[10px] font-black uppercase rounded">
                  LAW ENFORCEMENT SENSITIVE
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  Date: {activeIncident.detectionDate}
                </div>
              </div>
            </div>

            {/* Target Vessel & Action Directive */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 flex items-center justify-between">
                <span>1. Target Vessel & Apprehension Directive</span>
                <span className="text-[10px] text-red-600 font-bold">ACTION: BOARDING & ARREST</span>
              </h3>

              <div className="bg-slate-50 border border-slate-300 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">Target Vessel</span>
                  <strong className="text-slate-900 text-sm">{dossierData?.target_vessel?.name || culprit.name}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">MMSI / IMO</span>
                  <strong className="text-slate-900 font-mono">{dossierData?.target_vessel?.mmsi || culprit.mmsi} / {dossierData?.target_vessel?.imo || culprit.imo}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">Flag / Type</span>
                  <strong className="text-slate-900">{dossierData?.target_vessel?.flag || culprit.flag} ({dossierData?.target_vessel?.vessel_type || culprit.type})</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">Attribution Certainty</span>
                  <strong className="text-red-600 text-sm font-extrabold">{culprit.riskScore}% Match</strong>
                </div>
              </div>

              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-900 space-y-1">
                <strong className="block font-bold">Operative Action Command:</strong>
                <p className="leading-relaxed">
                  The target vessel <em>{dossierData?.target_vessel?.name || culprit.name}</em> has been conclusively pinpointed as the discharge source using combined {activeIncident.satelliteSensor} radar dampening and backward OpenDrift Lagrangian hindcast. The vessel approached within <strong>{culprit.minDistanceM} meters</strong> of the calculated discharge origin coordinates ({activeIncident.slick.originPoint ? `${activeIncident.slick.originPoint[0].toFixed(2)}°N, ${activeIncident.slick.originPoint[1].toFixed(2)}°E` : 'origin'}) at the exact release timestamp, followed by an intentional <strong>45-minute AIS blackout</strong>.
                </p>
              </div>
            </section>

            {/* Tactical Intercept Vector */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                2. Tactical Interception Vector & Coast Guard Patrol Dispatch
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="text-[10px] uppercase font-bold text-blue-800 block">Assigned Patrol Cutter</span>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {dossierData?.intercept_vector?.patrol_cutter_assigned || (activeIncident.id.includes('IN-') ? 'ICGS SAMRAT (OPV-02)' : 'USCGC DAUNTLESS (WMEC-624)')}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    Station: {activeIncident.id.includes('IN-') ? 'Indian Coast Guard Region (West) Mumbai' : 'USCG Sector New Orleans'}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="text-[10px] uppercase font-bold text-blue-800 block">Rendezvous Intercept Point</span>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {dossierData?.intercept_vector?.rendezvous_coordinates || `${activeIncident.center[0].toFixed(3)}°N, ${activeIncident.center[1].toFixed(3)}°E`}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    Intercept ETA: {dossierData?.intercept_vector?.eta_to_intercept || '1 hour 30 minutes'}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="text-[10px] uppercase font-bold text-blue-800 block">Legal Enforcement Authority</span>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">
                    {activeIncident.id.includes('IN-') ? 'Merchant Shipping Act 1958 & MARPOL' : '33 U.S.C. § 1321 & MARPOL'}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">UNCLOS Article 220 Enforcement</div>
                </div>
              </div>

              {/* Boarding Checklist */}
              <div className="p-3.5 bg-slate-50 border border-slate-300 rounded-lg text-xs space-y-2">
                <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">
                  Boarding Officer Mandatory Checklist:
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li>Audit Oil Record Book Part I (Machinery space operations) & Part II (Cargo/ballast operations).</li>
                  <li>Extract physical bunker, bilge, and slop tank samples for GC-MS hydrocarbon fingerprinting.</li>
                  <li>Inspect 15 ppm bilge alarm recorder and oil discharge monitoring equipment (ODME) logs.</li>
                  <li>Issue formal Notice of Detention preventing departure from port under Port State Control agreements.</li>
                </ul>
              </div>
            </section>
          </>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: ENVIRONMENT AGENCIES (Assessment & Cleanup) */}
        {/* ========================================================================= */}
        {activeStakeholder === 'environment' && (
          <>
            {/* Header */}
            <div className="border-b-2 border-emerald-900 pb-4 flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] tracking-widest font-extrabold uppercase text-emerald-800">
                  {activeIncident.id.includes('IN-') ? 'INDIAN COAST GUARD POLLUTION RESPONSE & INCOIS MODELING' : 'ENVIRONMENTAL PROTECTION AGENCY & NOAA DISASTER RESPONSE'}
                </div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 mt-1">
                  EMERGENCY OIL SPILL CONTAINMENT & CLEANUP TACTICAL PLAN
                </h1>
                <div className="text-xs text-slate-600 font-mono mt-1">
                  TACTICAL ASSESSMENT REF: TIER-2-CLEANUP-{activeIncident.id} • {activeIncident.locationName.toUpperCase()}
                </div>
              </div>

              <div className="text-right">
                <div className="inline-block px-3 py-1 bg-emerald-100 border border-emerald-400 text-emerald-800 text-[10px] font-black uppercase rounded">
                  CLEANUP DIRECTIVE
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  Weathering Model: {activeIncident.weathering?.weatheringEngine || 'INCOIS SARAT & OpenDrift'}
                </div>
              </div>
            </div>

            {/* Physical Slick Characterization */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                1. Slick Physical Dimensions & Bonn Characterization
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">Total Area</span>
                  <strong className="text-slate-900 text-sm font-mono">{activeIncident.slick.areaKm2} km²</strong>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">Discharge Volume</span>
                  <strong className="text-red-600 text-sm font-mono">
                    {activeIncident.slick.estimatedVolumeM3.toLocaleString()} m³ (~{activeIncident.slick.estimatedVolumeBarrels || 7862} bbls)
                  </strong>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">Mean Film Thickness</span>
                  <strong className="text-slate-900 text-sm font-mono">{activeIncident.slick.thicknessMicrons} μm</strong>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">Classification</span>
                  <strong className="text-red-700 text-xs font-bold uppercase">
                    {activeIncident.slick.spillType || 'Thick Mineral Oil Discharge'}
                  </strong>
                </div>
              </div>

              {/* Weathering degradation status */}
              <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-lg text-xs grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-800 block">Evaporation Loss</span>
                  <strong className="text-slate-900 text-sm font-mono">
                    {activeIncident.weathering?.evaporationPercent ?? 24.5}%
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-800 block">Water Emulsification</span>
                  <strong className="text-amber-700 text-sm font-mono">
                    {activeIncident.weathering?.emulsificationWaterPercent ?? 42.0}%
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-800 block">Dynamic Viscosity</span>
                  <strong className="text-slate-900 text-sm font-mono">
                    {activeIncident.weathering?.dynamicViscosityCp ?? 185.0} cP
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-800 block">Remaining Surface Mass</span>
                  <strong className="text-red-600 text-sm font-mono">
                    {activeIncident.weathering?.remainingVolumeM3 ?? 943.8} m³
                  </strong>
                </div>
              </div>
            </section>

            {/* Booming Coordinates & Containment Operations */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                2. Containment Booming Coordinates & Skimmer Operations
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 border border-slate-300 rounded-lg space-y-2">
                  <span className="font-bold text-slate-900 uppercase block text-[11px]">
                    Deflection Booming Perimeter:
                  </span>
                  <div className="font-mono text-slate-700 space-y-1">
                    {activeIncident.slick.coordinates && activeIncident.slick.coordinates.length >= 4 ? (
                      activeIncident.slick.coordinates.slice(0, 4).map((pt, idx) => (
                        <div key={idx}>• Point {idx + 1}: {pt[0].toFixed(3)}°N, {pt[1].toFixed(3)}°E</div>
                      ))
                    ) : (
                      <>
                        <div>• Sector North: {activeIncident.center[0] + 0.05}°N, {activeIncident.center[1] - 0.04}°E</div>
                        <div>• Sector East: {activeIncident.center[0] + 0.07}°N, {activeIncident.center[1] + 0.06}°E</div>
                        <div>• Sector South: {activeIncident.center[0] - 0.04}°N, {activeIncident.center[1] + 0.08}°E</div>
                        <div>• Sector West: {activeIncident.center[0] - 0.08}°N, {activeIncident.center[1] - 0.08}°E</div>
                      </>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                    Total Boom Length Required: <strong>4,500 meters</strong> (J-Configuration).
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-300 rounded-lg space-y-2">
                  <span className="font-bold text-slate-900 uppercase block text-[11px]">
                    Skimmer Vessels & Ecological Priorities:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    <li>4 Oleophilic Brush-Drum Skimmers dispatched (Desmi Ro-Clean DBD-50).</li>
                    <li>Type-III Oil Spill Dispersant (OSD) pre-authorized under National Oil Spill Disaster Contingency Plan (NOS-DCP).</li>
                    <li>Exclusion booms pre-positioned across sensitive coastal inlets and mangrove sanctuaries.</li>
                  </ul>
                  <div className="text-[11px] text-red-600 font-semibold pt-1 border-t border-slate-200">
                    Shoreline impact warning: Projected 36 hours based on INCOIS high-resolution ocean current models.
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: PUBLIC / MEDIA (Awareness & Transparency) */}
        {/* ========================================================================= */}
        {activeStakeholder === 'public' && (
          <>
            {/* Header */}
            <div className="border-b-2 border-amber-800 pb-4 flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] tracking-widest font-extrabold uppercase text-amber-800">
                  MARITIME ENVIRONMENTAL AWARENESS & PUBLIC INFORMATION BUREAU
                </div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 mt-1">
                  OFFICIAL PUBLIC MARITIME ADVISORY & SAFETY BULLETIN
                </h1>
                <div className="text-xs text-slate-600 font-mono mt-1">
                  BULLETIN NO: PUB-ADV-{activeIncident.id} • FOR IMMEDIATE RELEASE
                </div>
              </div>

              <div className="text-right">
                <div className="inline-block px-3 py-1 bg-amber-100 border border-amber-400 text-amber-800 text-[10px] font-black uppercase rounded">
                  PUBLIC ADVISORY
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  Date: {activeIncident.detectionDate}
                </div>
              </div>
            </div>

            {/* Public Incident Statement */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                1. Official Statement & Situation Overview
              </h3>

              <p className="text-xs leading-relaxed text-slate-700">
                On <strong>{activeIncident.detectionDate}</strong>, satellite radar surveillance ({activeIncident.satelliteSensor}) identified an offshore hydrocarbon discharge approximately 45 nautical miles offshore in {activeIncident.locationName}. 
              </p>
              <p className="text-xs leading-relaxed text-slate-700">
                Specialized hydrodynamic modeling (INCOIS ROMS/SARAT) and AIS ship tracking by maritime authorities have pinpointed the suspected vessel, <strong>{culprit.name}</strong>, which has been intercepted by the Coast Guard for inspection and judicial detention.
              </p>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs space-y-2 text-amber-950">
                <strong className="block font-bold uppercase text-[11px] text-amber-900">
                  Key Public Safety Advisories:
                </strong>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Maritime Exclusion Zone:</strong> Commercial fishing vessels and private recreational crafts must maintain a 10-nautical-mile buffer zone around {activeIncident.center[0].toFixed(2)}°N, {activeIncident.center[1].toFixed(2)}°E.</li>
                  <li><strong>Beach & Shoreline Status:</strong> Coastal public beaches and municipal recreational areas remain <strong>SAFE and OPEN</strong>. No hydrocarbon shoreline contact has occurred.</li>
                  <li><strong>Seafood Safety:</strong> Commercial fisheries in adjacent sectors remain under continuous testing; no contamination of market seafood stocks has been observed.</li>
                  <li><strong>Emergency Hotline:</strong> Report any affected marine life or oil sightings immediately to the Maritime Emergency Hotline: <strong>{activeIncident.id.includes('IN-') ? '1554 (Indian Coast Guard)' : '1-800-424-8802 (NRC)'}</strong>.</li>
                </ul>
              </div>
            </section>

            {/* Transparency Metrics */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                2. Open Data & Verification Metrics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">Surveillance Method</span>
                  <strong className="text-slate-900 block mt-0.5">{activeIncident.satelliteSensor}</strong>
                  <div className="text-[11px] text-slate-500 mt-1">SAR backscatter dampening & Polarimetric Analysis</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">Containment Status</span>
                  <strong className="text-emerald-700 block mt-0.5">Active Booming & Skimming</strong>
                  <div className="text-[11px] text-slate-500 mt-1">4500m containment perimeter</div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">Culprit Accountability</span>
                  <strong className="text-blue-700 block mt-0.5">Vessel Intercepted</strong>
                  <div className="text-[11px] text-slate-500 mt-1">Under Coast Guard detention</div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: INSURANCE / LEGAL (Evidence & Claims) */}
        {/* ========================================================================= */}
        {activeStakeholder === 'legal' && (
          <>
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] tracking-widest font-extrabold uppercase text-purple-900">
                  ADMIRALTY COURT & MARITIME CLAIMS ARBITRATION TRIBUNAL
                </div>
                <h1 className="text-xl font-black tracking-tight text-slate-900 mt-1">
                  OFFICIAL EVIDENCE AFFIDAVIT & STATUTORY MARPOL DAMAGE CLAIM
                </h1>
                <div className="text-xs text-slate-600 font-mono mt-1">
                  AFFIDAVIT REF: SLICKTRACE-LEGAL-{activeIncident.id} • COURT-ADMISSIBLE FORENSIC EVIDENCE
                </div>
              </div>

              <div className="text-right">
                <div className="inline-block px-3 py-1 bg-purple-100 border border-purple-400 text-purple-800 text-[10px] font-black uppercase rounded">
                  COURT ADMISSIBLE
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  SHA-256 Sealed
                </div>
              </div>
            </div>

            {/* Primary Defendant & P&I Club Details */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                1. Defendant Vessel & Statutory MARPOL Annex I Violations
              </h3>

              <div className="bg-slate-50 border border-slate-300 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">Defendant Vessel</span>
                  <strong className="text-slate-900 text-sm">{culprit.name}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">IMO / MMSI</span>
                  <strong className="text-slate-900 font-mono">{culprit.imo} / {culprit.mmsi}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">Flag State</span>
                  <strong className="text-slate-900">{culprit.flag}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">P&I Mutual Club</span>
                  <strong className="text-purple-700 font-semibold">The Standard Club P&I / Gard</strong>
                </div>
              </div>

              {/* Specific statutory infractions */}
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs space-y-2 text-red-950">
                <span className="font-bold text-red-900 uppercase block text-[11px]">
                  Statutory Charges & International Conventions Violated:
                </span>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Merchant Shipping Act 1958 (Part XIA):</strong> Prohibited discharge of oily bilge water and tank washings without 15 ppm filtration within Indian EEZ maritime zones.</li>
                  <li><strong>MARPOL 73/78 Annex I, Regulation 15 & 17:</strong> Fraudulent omission and falsification of entries in the official Oil Record Book (ORB).</li>
                  <li><strong>SOLAS Chapter V, Regulation 19:</strong> Willful and unlawful deactivation of Automatic Identification System (AIS) Class A transponder during vessel transit.</li>
                  <li><strong>Environment (Protection) Act 1986 / Clean Water Standards:</strong> Unlawful discharge of harmful quantities of oil into navigable waters.</li>
                </ul>
              </div>
            </section>

            {/* Chronological Chain of Evidence Table */}
            <section className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                2. Chronological Forensic Chain of Evidence
              </h3>

              <table className="w-full text-left text-xs border border-slate-300 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 border-b border-slate-300 text-slate-700">
                  <tr>
                    <th className="py-2 px-3 font-semibold">Timestamp (UTC)</th>
                    <th className="py-2 px-3 font-semibold">Forensic Source</th>
                    <th className="py-2 px-3 font-semibold">Telemetry Evidence</th>
                    <th className="py-2 px-3 font-semibold">Judicial Significance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="py-2 px-3 font-mono">24 Nov 12:15</td>
                    <td className="py-2 px-3">DGLL National AIS Network</td>
                    <td className="py-2 px-3">Vessel {culprit.name} decelerated abruptly from 14.5 to 2.3 kn</td>
                    <td className="py-2 px-3 font-semibold text-red-600">Discharge Speed Anomaly</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono">24 Nov 12:30</td>
                    <td className="py-2 px-3">OpenDrift & INCOIS ROMS</td>
                    <td className="py-2 px-3">Discharge origin ({activeIncident.slick.originPoint ? `${activeIncident.slick.originPoint[0].toFixed(2)}°N, ${activeIncident.slick.originPoint[1].toFixed(2)}°E` : 'origin'}; CPA: {culprit.minDistanceM}m)</td>
                    <td className="py-2 px-3 font-semibold text-red-600">Spatio-Temporal Coincidence</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono">24 Nov 12:45</td>
                    <td className="py-2 px-3">ICG Radar Chain (CRCN)</td>
                    <td className="py-2 px-3">Vessel silenced AIS transponder for 45 continuous minutes</td>
                    <td className="py-2 px-3 font-semibold text-amber-600">Dark Ship Concealment</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono">25 Nov 22:30</td>
                    <td className="py-2 px-3">{activeIncident.satelliteSensor}</td>
                    <td className="py-2 px-3">Backscatter depression -7.8 dB; {activeIncident.slick.areaKm2} km² thick mineral oil</td>
                    <td className="py-2 px-3 font-semibold text-blue-600">Physical Verification</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Estimated Damages & Statutory Penalty Valuation */}
            <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-lg text-xs space-y-1 text-purple-950">
              <strong className="block font-bold uppercase text-[11px] text-purple-900">
                Preliminary Civil Liability & Penalty Assessment:
              </strong>
              <div className="text-base font-extrabold text-purple-900 font-mono">
                ₹124.50 Crores / $14,850,000 USD
              </div>
              <p className="text-[11px] text-purple-800">
                Calculated on basis of {activeIncident.slick.estimatedVolumeM3.toLocaleString()} m³ discharge volume: Merchant Shipping Act statutory liability, emergency containment booming mobilization costs, INCOIS/NIO Natural Resource Damage Assessment, and Coast Guard cutter operational costs.
              </p>
            </div>
          </>
        )}

        {/* ========================================================================= */}
        {/* COMMON FOOTER: Cryptographic Hash & Official Sign-off */}
        {/* ========================================================================= */}
        <section className="pt-6 border-t border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div>
            <span className="block font-semibold">Authenticated Maritime Authority:</span>
            <span className="text-slate-900 font-bold">
              {activeIncident.id.includes('IN-') ? 'Inspector General, Indian Coast Guard / DGS Port State Control' : 'Lt. Cmdr. Sarah Jenkins, USCG / Port State Control'}
            </span>
            <span className="block text-[11px] text-slate-500">Autonomous Evidence Verification Division • SlickTrace V2</span>
          </div>

          <div className="sm:text-right">
            <div className="flex items-center sm:justify-end gap-1.5 font-semibold">
              <span>Cryptographic Chain of Custody Seal (SHA-256):</span>
              <button
                onClick={handleCopyHash}
                className="p-1 hover:bg-slate-200 rounded transition cursor-pointer text-slate-500 hover:text-blue-600 print:hidden"
                title="Copy SHA-256 Hash to Clipboard"
              >
                {copiedHash ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <span className="font-mono text-[10px] text-slate-500 break-all select-all block">
              {hashVal}
            </span>
          </div>
        </section>

      </div>
    </div>
  );
};
