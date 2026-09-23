import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Satellite, 
  Compass, 
  Ship, 
  Play, 
  ShieldAlert, 
  Layers, 
  Info,
  ChevronRight,
  ShieldCheck,
  Radio,
  Scale
} from 'lucide-react';
import { useIncident } from '../../context/IncidentContext';
import type { PageId } from '../../types';

interface PlatformGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlatformGuideModal: React.FC<PlatformGuideModalProps> = ({ isOpen, onClose }) => {
  const { setActivePage } = useIncident();
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'features' | 'forensics' | 'shortcuts'>('walkthrough');

  if (!isOpen) return null;

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-5xl max-h-[92vh] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#131D31]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                SLICKTRACE V2 — PLATFORM USER GUIDE & OPERATING MANUAL
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Interactive walkthrough, operator SOPs, algorithm explanations, and presentation guide for judges
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1626] gap-2 pt-2">
          <button
            onClick={() => setActiveTab('walkthrough')}
            className={`pb-2.5 px-3 text-xs font-bold transition flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'walkthrough'
                ? 'border-blue-600 text-blue-600 dark:text-cyan-400 dark:border-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Step-by-Step Operator Flow</span>
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`pb-2.5 px-3 text-xs font-bold transition flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'features'
                ? 'border-blue-600 text-blue-600 dark:text-cyan-400 dark:border-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Platform Modules & Tools</span>
          </button>

          <button
            onClick={() => setActiveTab('forensics')}
            className={`pb-2.5 px-3 text-xs font-bold transition flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'forensics'
                ? 'border-blue-600 text-blue-600 dark:text-cyan-400 dark:border-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Legal & Stakeholder Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('shortcuts')}
            className={`pb-2.5 px-3 text-xs font-bold transition flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'shortcuts'
                ? 'border-blue-600 text-blue-600 dark:text-cyan-400 dark:border-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Judge Pitch Script</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 custom-scrollbar text-xs">
          
          {/* ───────────────────────────────────────────────────────────────── */}
          {/* TAB 1: STEP-BY-STEP OPERATOR FLOW                                 */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {activeTab === 'walkthrough' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl text-blue-950 dark:text-blue-200 leading-relaxed">
                <strong>Standard Operating Procedure (SOP):</strong> SlickTrace V2 correlates satellite observations with historical marine AIS telemetry to identify the ship responsible for illegal oil discharges in 5 automated steps.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                
                {/* Step 1 */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131D31] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded font-extrabold text-[10px] bg-blue-600 text-white uppercase">Step 1</span>
                    <button onClick={() => navigateTo('detection')} className="text-blue-600 dark:text-cyan-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer">
                      <span>Open Satellite Console</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Select Incident & Ingest Satellite Radar</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    Use the top scenario selector to pick an active maritime zone (e.g., <strong>Mumbai High Offshore</strong>, <strong>Gulf of Kutch</strong>, or <strong>Andaman Sea</strong>). Select your satellite sensor (<strong>ISRO EOS-04 RISAT-1A SAR</strong> or <strong>Copernicus Sentinel-1B</strong>).
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131D31] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded font-extrabold text-[10px] bg-emerald-600 text-white uppercase">Step 2</span>
                    <button onClick={() => navigateTo('detection')} className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer">
                      <span>Run AI Detection</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Run AI Segmentation & Classify Dark Spots</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    Click <strong>Run Comprehensive AI Analysis</strong>. The U-Net deep learning model suppresses look-alikes (algae, low-wind calm seas) and extracts the polygon contour, classifying the spill volume (1,250 m³) and Bonn Agreement code.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131D31] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded font-extrabold text-[10px] bg-cyan-600 text-white uppercase">Step 3</span>
                    <button onClick={() => navigateTo('drift')} className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer">
                      <span>Open Drift Simulator</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Run 4D Backward Hindcast Simulation</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    Navigate to the <strong>Drift Simulator</strong>. SlickTrace leverages INCOIS ROMS current vectors and NCMRWF wind fields in reverse time to backtrack the slick from its detected location to the exact discharge origin point ($t_0$ at 34 hours prior).
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131D31] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded font-extrabold text-[10px] bg-amber-600 text-white uppercase">Step 4</span>
                    <button onClick={() => navigateTo('attribution')} className="text-amber-600 dark:text-amber-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer">
                      <span>Inspect Culprit AIS</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Correlate AIS Trajectories & Anomaly Scans</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    Open the <strong>AIS Attribution</strong> console. The XGBoost scoring model matches candidate vessels in the spatio-temporal corridor, ranking <strong>MT Sagar Ratna</strong> with 94.2% confidence due to a 14.6 → 2.3 kn deceleration and a 45-minute transponder blackout.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131D31] space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded font-extrabold text-[10px] bg-purple-600 text-white uppercase">Step 5</span>
                    <button onClick={() => navigateTo('reports')} className="text-purple-600 dark:text-purple-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer">
                      <span>View & Export Dossiers</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Generate Multi-Stakeholder Action Dossiers</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                    Open the <strong>Reports</strong> tab to access 4 dedicated mission dossiers: 1) <strong>Indian Coast Guard</strong> interception directive (ICGS SAMRAT), 2) <strong>Environmental containment</strong> booming coordinates, 3) <strong>Public advisory</strong> bulletin (ICG 1554), and 4) <strong>Court Affidavit</strong> under Part XIA of Indian Merchant Shipping Act 1958 sealed with SHA-256 cryptographic hashes.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* TAB 2: PLATFORM MODULES & TOOLS                                   */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {activeTab === 'features' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131D31]">
                  <Satellite className="w-4 h-4 text-blue-500 mb-1.5" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Multi-Satellite Sensor Hub</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    Supports ISRO EOS-04 (RISAT-1A), Oceansat-3 (OCM-3), Sentinel-1 C-Band SAR, Sentinel-2 MSI Optical, and Landsat-9 Thermal Infrared.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131D31]">
                  <Compass className="w-4 h-4 text-cyan-500 mb-1.5" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">4D Lagrangian Hindcast Engine</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    Integrates OpenDrift / OpenOil advection physics with INCOIS ROMS current vectors and NCMRWF atmospheric winds for reverse origin tracking.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131D31]">
                  <Ship className="w-4 h-4 text-amber-500 mb-1.5" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">AIS Anomaly & Blackout Forensics</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    Audits speed deceleration (slow-steaming during pump discharge) and flags dark ship operations (unlawful transponder shutdowns).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131D31] space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">Interactive Map Navigation Controls:</h4>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                  <li><strong>Layer Switcher (Top Right on Map):</strong> Toggle between Satellite Hybrid, Dark Tactical Ocean, and Nautical Charts with OpenSeaMap seamarks.</li>
                  <li><strong>Overlay Toggles:</strong> Show/hide SAR Radar footprints, oil slick contours, historical AIS ship tracks, and booming perimeters.</li>
                  <li><strong>4D Timeline Scrubber (Bottom Bar):</strong> Drag the time slider or press Play to animate the physical drift trajectory backward to origin or forward to shoreline impact.</li>
                </ul>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* TAB 3: LEGAL & STAKEHOLDER HUB                                    */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {activeTab === 'forensics' && (
            <div className="space-y-3.5">
              <div className="p-3.5 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 rounded-xl text-purple-950 dark:text-purple-200 text-xs">
                <strong>Cryptographic Chain of Custody (SHA-256):</strong> Every generated forensic report is sealed with a SHA-256 hash ensuring that satellite telemetry, vessel logs, and calculated origin points are tamper-proof and court-admissible under Admiralty jurisdiction.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20">
                  <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300 text-xs mb-1">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>1. Maritime Authorities (ICG / DGS)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    Provides tactical patrol cutter interception rendezvous coordinates (ICGS SAMRAT) and boarding checklists under Merchant Shipping Act 1958 (Part XIA).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300 text-xs mb-1">
                    <ShieldAlert className="w-4 h-4 text-emerald-600" />
                    <span>2. Environment Response Teams</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    Calculates required boom length (4,500m J-configuration), skimmer deployment schedules, and INCOIS 36-hour shoreline landfall alerts.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300 text-xs mb-1">
                    <Radio className="w-4 h-4 text-amber-600" />
                    <span>3. Public & Media Bureau</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    Issues transparent citizen advisories, exclusion zone alerts, beach safety updates, and the Indian Coast Guard emergency hotline (1554).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/20">
                  <div className="flex items-center gap-1.5 font-bold text-purple-900 dark:text-purple-300 text-xs mb-1">
                    <Scale className="w-4 h-4 text-purple-600" />
                    <span>4. Admiralty Court & Legal Counsel</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    Generates statutory MARPOL Annex I violation packages, chronological forensic timelines, and ₹124.50 Crores damage valuation claims.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────────── */}
          {/* TAB 4: JUDGE PITCH SCRIPT                                         */}
          {/* ───────────────────────────────────────────────────────────────── */}
          {activeTab === 'shortcuts' && (
            <div className="space-y-3.5">
              <div className="p-3.5 bg-slate-50 dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">2-Minute High-Impact Pitch Flow for Judges:</h4>
                
                <div className="space-y-2 text-[11px] text-slate-700 dark:text-slate-300">
                  <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <strong className="text-blue-600 dark:text-cyan-400">0:00 - 0:30 (Problem & Detection):</strong> Show Mumbai High EEZ. Click top KPI cards to highlight ISRO EOS-04 SAR radar backscatter dampening (-7.8 dB) and Bonn Code 4 slick classification.
                  </div>

                  <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <strong className="text-cyan-600 dark:text-cyan-400">0:30 - 1:00 (4D Reverse Hindcast):</strong> Go to Drift Simulator. Drag the bottom timeline back to -34h to show how INCOIS current models trace the oil slick back to its exact discharge GPS origin.
                  </div>

                  <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <strong className="text-amber-600 dark:text-amber-400">1:00 - 1:30 (AIS Anomaly Forensics):</strong> Go to AIS Attribution. Click <em>MT Sagar Ratna</em> (94.2% match) to show the 14.6 kn → 2.3 kn speed drop and 45-minute intentional AIS blackout.
                  </div>

                  <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <strong className="text-purple-600 dark:text-purple-400">1:30 - 2:00 (Action & PDF Export):</strong> Open Reports tab. Show the Indian Coast Guard interception order (ICGS SAMRAT) and the SHA-256 sealed court affidavit with ₹124.50 Cr statutory damage claims.
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131D31] flex items-center justify-between text-[11px]">
          <div className="text-slate-500 flex items-center gap-2 font-mono">
            <span>SlickTrace V2 • Indian Maritime Domain & EEZ Solution</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer transition shadow-xs"
          >
            Start Exploring
          </button>
        </div>

      </div>
    </div>
  );
};
