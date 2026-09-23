import React, { useState } from 'react';
import { Calendar, RefreshCw, Play, Sparkles, Satellite } from 'lucide-react';
import { useIncident } from '../../context/IncidentContext';

export const LeftControlsPanel: React.FC = () => {
  const { 
    activeIncident, 
    runFullPipeline, 
    isAnalyzing, 
    analysisToast,
    dismissToast,
    selectIncident,
    incidents,
    selectedSatellite,
    setSelectedSatellite,
    confidenceThreshold,
    setConfidenceThreshold,
    filterLookAlikes,
    setFilterLookAlikes,
    showToast
  } = useIncident();

  const [selectedSector, setSelectedSector] = useState(4);
  const [modelType, setModelType] = useState('Lagrangian Model (OpenDrift OpenOil)');

  const handleSectorChange = (val: number) => {
    setSelectedSector(val);
    if (val > 6 && incidents.length > 1) {
      selectIncident(incidents[1].id); // Switch to Malacca Strait
    } else {
      selectIncident(incidents[0].id); // Switch to Gulf of Mexico
    }
  };

  const handleSatelliteChange = (sat: string) => {
    setSelectedSatellite(sat);
    showToast(`🛰️ Active Satellite Sensor updated: ${sat}`);
  };

  return (
    <div className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-xs flex flex-col justify-between h-full select-none text-xs">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Panel Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2 mb-2 flex items-center justify-between shrink-0">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <Satellite className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span>Satellite & Drift Controls</span>
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-400 font-semibold border border-blue-200 dark:border-blue-900">
            {activeIncident.id}
          </span>
        </div>

        {/* Live Notification Toast Banner */}
        {analysisToast && (
          <div className="mb-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-[11px] text-blue-900 dark:text-blue-200 flex items-start justify-between gap-1.5 animate-fadeIn shrink-0">
            <div className="flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <span>{analysisToast}</span>
            </div>
            <button onClick={dismissToast} className="text-slate-400 hover:text-slate-600 cursor-pointer">
              ×
            </button>
          </div>
        )}

        <div className="space-y-3 overflow-y-auto flex-1 pr-1 custom-scrollbar min-h-0">
          {/* 1. Satellite Source */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
              Satellite Source & Modality
            </label>
            <select
              value={selectedSatellite}
              onChange={(e) => handleSatelliteChange(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-1.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="Sentinel-1 SAR (IW)">Sentinel-1 SAR (IW C-Band GRD) — Default</option>
              <option value="Sentinel-2 MSI Optical">Sentinel-2 Optical (MSI Sun-Glint & NDWI)</option>
              <option value="Landsat-9 OLI">Landsat-9 OLI Thermal IR & Optical</option>
              <option value="RADARSAT Constellation">RADARSAT Constellation (RCM High-Res)</option>
              <option value="TerraSAR-X X-Band">TerraSAR-X (High Resolution Spotlight X-Band)</option>
            </select>
          </div>

          {/* 2. Detection Date & Swath Time */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
              Acquisition Timestamp
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={activeIncident.detectionDate}
                className="w-full text-xs font-mono font-medium bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-1.5 pr-8 text-slate-900 dark:text-white"
              />
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
            </div>
          </div>

          {/* 3. Select Sector / Region Slider */}
          <div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
              <span>Select Sector / Maritime Zone</span>
              <span className="font-mono text-blue-600 dark:text-cyan-400">
                Sector {selectedSector} ({selectedSector > 6 ? 'Malacca' : 'Gulf EEZ'})
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={selectedSector}
              onChange={(e) => handleSectorChange(Number(e.target.value))}
              className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-cyan-400"
            />
          </div>

          {/* 4. Model Parameter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
              Hydrodynamic Model Formulation
            </label>
            <select
              value={modelType}
              onChange={(e) => {
                setModelType(e.target.value);
                showToast(`Drift model set to: ${e.target.value}`);
              }}
              className="w-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md p-1.5 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="Lagrangian Model (OpenDrift OpenOil)">Lagrangian Model (OpenDrift OpenOil + Stokes)</option>
              <option value="Eulerian Dispersion Grid (HYCOM)">Eulerian Dispersion Grid (HYCOM Surface)</option>
              <option value="Fay Spreading Law (Viscous-Surface Tension)">Fay Spreading Law (Viscous-Surface Tension)</option>
            </select>
          </div>

          {/* 5. Confidence Threshold & Look-Alike Discriminators */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              <span>AI Detection Confidence</span>
              <span className="font-mono text-blue-600 dark:text-cyan-400">{confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer accent-blue-600"
            />

            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 mt-2">
              <input
                type="checkbox"
                checked={filterLookAlikes}
                onChange={(e) => {
                  setFilterLookAlikes(e.target.checked);
                  showToast(e.target.checked ? 'Enabled CNN Look-Alike Suppression' : 'Disabled Look-Alike Filter');
                }}
                className="rounded text-blue-600 cursor-pointer"
              />
              <span>Misash CNN Look-Alike Suppression</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Execution Action Button */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 mt-2 shrink-0">
        <button
          onClick={runFullPipeline}
          disabled={isAnalyzing}
          type="button"
          className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-lg shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing SAR & Correlating AIS...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Run Comprehensive AI Analysis</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
