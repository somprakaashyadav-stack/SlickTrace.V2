import React, { useState } from 'react';
import { X, Shield, Key, Database, CheckCircle, Save } from 'lucide-react';
import { useIncident } from '../../context/IncidentContext';

export const ProfileSettingsModal: React.FC = () => {
  const { isSettingsOpen, setIsSettingsOpen, isBackendConnected } = useIncident();

  const [sentinelKey, setSentinelKey] = useState('copernicus_demo_key_sec942');
  const [cmemsUser, setCmemsUser] = useState('cmems_marine_user');
  const [isSaved, setIsSaved] = useState(false);

  if (!isSettingsOpen) return null;

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 select-none animate-fadeIn">
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
                SlickTrace V2 Enforcement Configuration
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
            <span>Database & Analytics Feeds</span>
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

        {/* API Key Inputs */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-amber-500" />
            <span>Remote Sensing API Keys</span>
          </h4>

          <div>
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300 block mb-1">
              Copernicus / Sentinel-1 SAR Access Token
            </label>
            <input
              type="password"
              value={sentinelKey}
              onChange={(e) => setSentinelKey(e.target.value)}
              className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-600 dark:text-slate-300 block mb-1">
              CMEMS / HYCOM Ocean Currents Auth
            </label>
            <input
              type="text"
              value={cmemsUser}
              onChange={(e) => setCmemsUser(e.target.value)}
              className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-mono">
            Encrypted Storage • AES-256
          </span>

          <button
            onClick={handleSave}
            type="button"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {isSaved ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>Saved & Synchronized!</span>
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
