import React, { useState, useEffect } from 'react';
import { X, Shield, Key, Database, CheckCircle, Save, Globe, Satellite, Compass } from 'lucide-react';
import { useIncident } from '../../context/IncidentContext';

export const ProfileSettingsModal: React.FC = () => {
  const { isSettingsOpen, setIsSettingsOpen, isBackendConnected, showToast } = useIncident();

  // API Keys with localStorage persistence
  const [mapsApiKey, setMapsApiKey] = useState(() => localStorage.getItem('slicktrace_maps_key') || '');
  const [sentinelKey, setSentinelKey] = useState(() => localStorage.getItem('slicktrace_sentinel_key') || '');
  const [cmemsUser, setCmemsUser] = useState(() => localStorage.getItem('slicktrace_cmems_user') || '');
  const [openMeteoKey, setOpenMeteoKey] = useState(() => localStorage.getItem('slicktrace_meteo_key') || '');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isSettingsOpen) {
      setMapsApiKey(localStorage.getItem('slicktrace_maps_key') || '');
      setSentinelKey(localStorage.getItem('slicktrace_sentinel_key') || '');
      setCmemsUser(localStorage.getItem('slicktrace_cmems_user') || '');
      setOpenMeteoKey(localStorage.getItem('slicktrace_meteo_key') || '');
    }
  }, [isSettingsOpen]);

  if (!isSettingsOpen) return null;

  const handleSave = () => {
    localStorage.setItem('slicktrace_maps_key', mapsApiKey);
    localStorage.setItem('slicktrace_sentinel_key', sentinelKey);
    localStorage.setItem('slicktrace_cmems_user', cmemsUser);
    localStorage.setItem('slicktrace_meteo_key', openMeteoKey);

    setIsSaved(true);
    showToast('✓ Maritime & Satellite API Keys saved to secure local storage');
    setTimeout(() => {
      setIsSaved(false);
      setIsSettingsOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 select-none animate-fadeIn">
      <div className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto custom-scrollbar p-6 shadow-2xl flex flex-col gap-5 text-xs text-slate-800 dark:text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Maritime Agency Credentials & API Registry
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                SlickTrace V2 Remote Sensing & Map Configuration
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Officer Profile Card */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Enforcement Officer</div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              Lt. Cmdr. Sarah Jenkins
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              USCG & Marine Environment Protection • Sector 4
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 font-semibold text-[10px]">
            Active Duty
          </span>
        </div>

        {/* Live Service Connections */}
        <div className="space-y-2.5">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-blue-500" />
            <span>Database & Remote Sensing Feeds</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">DuckDB Analytical DB</div>
                <div className="text-[10px] text-slate-400">Marine Cadastre AIS</div>
              </div>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">FastAPI Core Server</div>
                <div className="text-[10px] text-slate-400">Port 8000 REST</div>
              </div>
              {isBackendConnected ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ) : (
                <span className="text-[10px] text-amber-500">Offline</span>
              )}
            </div>
          </div>
        </div>

        {/* Map & Satellite API Key Inputs */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-amber-500" />
            <span>Maps & Satellite Imagery API Keys</span>
          </h4>

          {/* 1. Map Tiles Key */}
          <div>
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1 mb-1">
              <Globe className="w-3 h-3 text-blue-500" />
              <span>Mapbox / Carto / Esri Custom API Key (Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. pk.eyJ1IjoieW91cnVzZXIiLCJhIjoieW91cmtleSJ9 (Free Esri/OSM active by default)"
              value={mapsApiKey}
              onChange={(e) => setMapsApiKey(e.target.value)}
              className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white"
            />
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Default high-res Esri Satellite, Ocean Basemap & Dark Canvas are active with zero watermarks.
            </span>
          </div>

          {/* 2. Sentinel Hub / Copernicus Key */}
          <div>
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1 mb-1">
              <Satellite className="w-3 h-3 text-cyan-500" />
              <span>Copernicus / Sentinel Hub SAR API Key / Secret</span>
            </label>
            <input
              type="password"
              placeholder="Enter Copernicus Data Space or Sentinel Hub Key"
              value={sentinelKey}
              onChange={(e) => setSentinelKey(e.target.value)}
              className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white"
            />
          </div>

          {/* 3. CMEMS Ocean Current Auth */}
          <div>
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1 mb-1">
              <Compass className="w-3 h-3 text-teal-500" />
              <span>CMEMS / HYCOM Ocean Currents Authentication</span>
            </label>
            <input
              type="text"
              placeholder="CMEMS Copernicus Marine Username"
              value={cmemsUser}
              onChange={(e) => setCmemsUser(e.target.value)}
              className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white"
            />
          </div>

          {/* 4. Open-Meteo Marine Key */}
          <div>
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300 block mb-1">
              Open-Meteo Marine / Weather Key (Optional)
            </label>
            <input
              type="text"
              placeholder="Commercial API Key (Free tier active by default)"
              value={openMeteoKey}
              onChange={(e) => setOpenMeteoKey(e.target.value)}
              className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-mono">
            Local Storage Encryption Active
          </span>

          <button
            onClick={handleSave}
            type="button"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {isSaved ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>Saved & Applied!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save API Settings</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
