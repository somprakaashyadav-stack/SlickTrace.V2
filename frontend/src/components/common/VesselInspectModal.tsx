import React from 'react';
import { X, Ship, ShieldAlert, ArrowRight, FileText } from 'lucide-react';
import { useIncident } from '../../context/IncidentContext';
import { SpeedAnomalyChart } from '../charts/SpeedAnomalyChart';

export const VesselInspectModal: React.FC = () => {
  const { isVesselModalOpen, setIsVesselModalOpen, selectedVessel, setActivePage } = useIncident();

  if (!isVesselModalOpen || !selectedVessel) return null;

  const handleNavigateToReports = () => {
    setIsVesselModalOpen(false);
    setActivePage('reports');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 select-none animate-fadeIn">
      <div className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar p-6 shadow-2xl flex flex-col gap-4 text-xs text-slate-800 dark:text-slate-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                selectedVessel.isCulprit
                  ? 'bg-red-600 text-white shadow-lg shadow-red-500/20'
                  : 'bg-blue-600 text-white'
              }`}
            >
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {selectedVessel.name}
                </h3>
                {selectedVessel.isCulprit && (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-red-600 text-white">
                    Primary Culprit
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {selectedVessel.type} • Flag: {selectedVessel.flag} • Call Sign: {selectedVessel.callSign}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsVesselModalOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Attribution Scoring Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Composite Score</span>
            <span
              className={`text-xl font-black font-mono ${
                selectedVessel.riskScore > 80
                  ? 'text-red-600 dark:text-red-400'
                  : selectedVessel.riskScore > 50
                  ? 'text-amber-500'
                  : 'text-slate-600'
              }`}
            >
              {selectedVessel.riskScore}%
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Min Distance (CPA)</span>
            <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
              {selectedVessel.minDistanceM}m
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Time Delta at t₀</span>
            <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
              Δ {selectedVessel.timeDeltaMin}m
            </span>
          </div>
        </div>

        {/* Speed Profile Graph */}
        <div className="bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <SpeedAnomalyChart
            data={selectedVessel.speedProfile}
            vesselName={selectedVessel.name}
            hasAnomaly={selectedVessel.hasSpeedAnomaly}
          />
        </div>

        {/* Forensic Anomaly Finding */}
        <div
          className={`p-3 rounded-xl border text-xs leading-relaxed ${
            selectedVessel.isCulprit
              ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-900 dark:text-red-300'
              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span>Investigative Audit Finding</span>
          </div>
          <p>{selectedVessel.speedAnomalySummary}</p>
        </div>

        {/* Registry Specs */}
        <div className="grid grid-cols-4 gap-2 text-[11px] text-slate-500">
          <div>
            <span>MMSI</span>
            <strong className="block text-slate-900 dark:text-white font-mono">{selectedVessel.mmsi}</strong>
          </div>
          <div>
            <span>IMO</span>
            <strong className="block text-slate-900 dark:text-white font-mono">{selectedVessel.imo}</strong>
          </div>
          <div>
            <span>Length/Draft</span>
            <strong className="block text-slate-900 dark:text-white font-mono">{selectedVessel.lengthM}m / {selectedVessel.draughtM}m</strong>
          </div>
          <div>
            <span>Destination</span>
            <strong className="block text-slate-900 dark:text-white truncate">{selectedVessel.destination}</strong>
          </div>
        </div>

        {/* Modal Footer Action */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setIsVesselModalOpen(false)}
            className="px-3.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={handleNavigateToReports}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open in Forensic Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
