import React from 'react';
import { useIncident } from '../../context/IncidentContext';
import type { Vessel } from '../../types';
import { ExternalLink, Search } from 'lucide-react';

export const RightLeaderboardPanel: React.FC = () => {
  const { activeIncident, selectedVessel, setSelectedVessel, setIsVesselModalOpen } = useIncident();

  const vessels = activeIncident.vessels;

  const renderMetric = (vessel: Vessel) => {
    if (vessel.rangeBar) {
      // Render range bar like -6 [====] 10
      const { value, min, max } = vessel.rangeBar;
      const percent = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

      return (
        <div className="flex items-center gap-1.5 w-24">
          <span className="font-mono text-[10px] font-bold text-red-600 dark:text-red-400">
            {value}
          </span>
          <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
            <div
              className="h-full bg-red-600 dark:bg-red-500 rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="font-mono text-[9px] text-slate-400">{max}</span>
        </div>
      );
    }

    // Render blue sparkline with 100 on left and 0 on right
    return (
      <div className="flex items-center gap-1.5 w-24">
        <div className="flex flex-col text-[8px] font-mono text-slate-400 leading-tight">
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>
        <svg viewBox="0 0 45 16" className="w-14 h-4 overflow-visible">
          <path
            d="M 0 14 Q 10 4, 20 10 T 35 2 T 45 8"
            fill="none"
            stroke="#2563eb"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  };

  const getBadgeColor = (color?: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-600 text-white';
      case 'blue':
        return 'bg-blue-600 text-white';
      case 'orange':
        return 'bg-amber-500 text-white';
      case 'green':
        return 'bg-emerald-500 text-white';
      default:
        return 'bg-slate-400 text-white';
    }
  };

  return (
    <div className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs flex flex-col justify-between h-full select-none text-xs">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Header matching blueprint */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2 mb-2 shrink-0">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">
            Suspect Vessel Attribution Leaderboard
          </h3>

          {/* Subheader Legend */}
          <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>Speed Anomaly</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
              <span>Past trajectory</span>
            </span>
          </div>
        </div>

        {/* Column Headers */}
        <div className="flex items-center justify-between px-1 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/80 mb-1 shrink-0">
          <span>Vessel Name</span>
          <span>Past Trajectory</span>
        </div>

        {/* Vessel List */}
        <div className="space-y-1.5 overflow-y-auto flex-1 min-h-[280px] max-h-[500px] pr-1 custom-scrollbar">
          {vessels.map((vessel) => {
            const isSelected = selectedVessel?.id === vessel.id;
            return (
              <div
                key={vessel.id}
                onClick={() => setSelectedVessel(vessel)}
                onDoubleClick={() => {
                  setSelectedVessel(vessel);
                  setIsVesselModalOpen(true);
                }}
                className={`group flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 dark:border-cyan-500 shadow-2xs'
                    : 'border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-900/40'
                }`}
                title="Click to select, double-click to open forensic dossier"
              >
                {/* Left Side: Badge + Name + Subtitle */}
                <div className="flex items-start gap-2 flex-1 min-w-0 mr-2">
                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold mt-0.5 shrink-0 ${getBadgeColor(
                      vessel.badgeColor
                    )}`}
                  >
                    !
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-slate-900 dark:text-white text-[11px] truncate flex items-center gap-1">
                      <span>{vessel.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVessel(vessel);
                          setIsVesselModalOpen(true);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-blue-600"
                        title="Inspect Vessel Forensics"
                      >
                        <Search className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {vessel.displayCategory || 'Speed Anomaly'}
                    </div>
                  </div>
                </div>

                {/* Right Side: Range bar or Sparkline */}
                <div className="shrink-0">{renderMetric(vessel)}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Inspect Action Button */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 mt-2 shrink-0">
        <button
          onClick={() => {
            if (selectedVessel) {
              setIsVesselModalOpen(true);
            } else if (vessels.length > 0) {
              setSelectedVessel(vessels[0]);
              setIsVesselModalOpen(true);
            }
          }}
          type="button"
          className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-700"
          title="Open Deep Vessel Forensic Inspector & Speed Profile Chart"
        >
          <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
          <span>Audit {selectedVessel ? selectedVessel.name : 'Suspect'} Forensics</span>
        </button>
      </div>
    </div>
  );
};
