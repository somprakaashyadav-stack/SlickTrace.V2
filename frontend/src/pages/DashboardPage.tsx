import React, { useState } from 'react';
import { Info, Users, ShieldAlert, Satellite, Compass, Waves, X, AlertTriangle } from 'lucide-react';
import { LeftControlsPanel } from '../components/dashboard/LeftControlsPanel';
import { RightLeaderboardPanel } from '../components/dashboard/RightLeaderboardPanel';
import { NauticalMap } from '../components/map/NauticalMap';
import { useIncident } from '../context/IncidentContext';

export const DashboardPage: React.FC = () => {
  const { activeIncident, setActivePage } = useIncident();

  // Active KPI Info Modal state
  const [activeModal, setActiveModal] = useState<
    'slicks' | 'passes' | 'accuracy' | 'vessels' | null
  >(null);

  const culprit = activeIncident.vessels.find((v) => v.isCulprit) || activeIncident.vessels[0];

  return (
    <div className="flex flex-col gap-3.5 max-w-[1920px] mx-auto w-full select-none">
      {/* 1. Top KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Active Oil Slicks (36) */}
        <div 
          onClick={() => setActiveModal('slicks')}
          className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-blue-400 dark:hover:border-cyan-500 transition-all group"
          title="Click to view Active Oil Slicks breakdown & BAOAC telemetry"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
              Active Oil Slicks
            </span>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveModal('slicks');
              }}
              className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-blue-500 flex items-center justify-center text-[10px] text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-all bg-slate-50 dark:bg-slate-800"
            >
              <Info className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-end justify-between mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
                36
              </span>
              <span className="text-[11px] text-red-600 dark:text-red-400 font-bold font-mono">
                {activeIncident.slick.areaKm2} km²
              </span>
            </div>
            {/* Wave sparkline */}
            <svg viewBox="0 0 60 20" className="w-20 h-6 overflow-visible">
              <path
                d="M 0 16 Q 15 2, 30 10 T 60 4"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 2: Satellite Passes (102) */}
        <div 
          onClick={() => setActiveModal('passes')}
          className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-blue-400 dark:hover:border-cyan-500 transition-all group"
          title="Click to view Remote Sensing Passes & Orbit Revisit Telemetry"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
              Satellite Passes
            </span>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveModal('passes');
              }}
              className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-blue-500 flex items-center justify-center text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-all bg-slate-50 dark:bg-slate-800"
            >
              <Users className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-end justify-between mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
                102
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                {activeIncident.orbitPass}
              </span>
            </div>
            {/* Descending sparkline */}
            <svg viewBox="0 0 60 20" className="w-20 h-6 overflow-visible">
              <path
                d="M 0 4 Q 20 6, 40 14 T 60 18"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 3: Drift Prediction Accuracy (82.9%) */}
        <div 
          onClick={() => setActiveModal('accuracy')}
          className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-blue-400 dark:hover:border-cyan-500 transition-all group"
          title="Click to view OpenDrift Lagrangian accuracy and skill scores"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
              Drift Prediction Accuracy
            </span>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveModal('accuracy');
              }}
              className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 group-hover:border-blue-500 flex items-center justify-center text-[10px] text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-all bg-slate-50 dark:bg-slate-800"
            >
              <Info className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
              82.9%
            </span>
            {/* Green level bar indicator */}
            <div className="w-20 h-2 bg-emerald-100 dark:bg-emerald-950/60 rounded-full overflow-hidden mb-1.5 border border-emerald-300 dark:border-emerald-800">
              <div className="w-[83%] h-full bg-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Card 4: Suspect Vessels Identified (3,217) */}
        <div 
          onClick={() => setActiveModal('vessels')}
          className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-blue-400 dark:hover:border-cyan-500 transition-all group"
          title="Click to view DuckDB AIS database correlation statistics"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
              Suspect Vessels Identified
            </span>
            <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-[11px] font-bold text-blue-600 dark:text-cyan-400">
              {activeIncident.vessels.length}
            </div>
          </div>

          <div className="flex items-end justify-between mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
                3,217
              </span>
              <span className="text-[10px] text-slate-400 font-mono">AIS Pings</span>
            </div>
            {/* Blue sparkline */}
            <svg viewBox="0 0 60 20" className="w-20 h-6 overflow-visible">
              <path
                d="M 0 16 L 20 18 L 30 10 L 40 16 L 50 4 L 60 8"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Main 3-Column Tactical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch min-h-[580px]">
        {/* Left Column: Satellite & Drift Controls (3 Cols) */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <LeftControlsPanel />
        </div>

        {/* Center Column: High-Performance Nautical Map (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col h-full min-h-[480px]">
          <NauticalMap />
        </div>

        {/* Right Column: Suspect Leaderboard & Forensics (3 Cols) */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <RightLeaderboardPanel />
        </div>
      </div>

      {/* Interactive Info Modals for all 4 Top KPI Cards */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xl max-w-lg w-full text-xs text-slate-800 dark:text-slate-200 space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                {activeModal === 'slicks' && <Waves className="w-5 h-5 text-red-500" />}
                {activeModal === 'passes' && <Satellite className="w-5 h-5 text-cyan-500" />}
                {activeModal === 'accuracy' && <Compass className="w-5 h-5 text-amber-500" />}
                {activeModal === 'vessels' && <ShieldAlert className="w-5 h-5 text-blue-500" />}
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {activeModal === 'slicks' && 'Active Oil Slicks & Characterization Breakdown'}
                  {activeModal === 'passes' && 'Satellite Remote Sensing Constellation Telemetry'}
                  {activeModal === 'accuracy' && 'Hydrodynamic Drift Model Skill Score & Physics'}
                  {activeModal === 'vessels' && 'AIS Spatio-Temporal Corridor Correlation'}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body 1: Slicks */}
            {activeModal === 'slicks' && (
              <div className="space-y-3">
                <p className="text-slate-600 dark:text-slate-300">
                  Total of <strong>36 hydrocarbon anomalies</strong> identified by automated Sentinel-1 SAR dark-patch segmentation across EEZ Sector 4.
                </p>
                <div className="grid grid-cols-2 gap-2 font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400">Total Surface Area</div>
                    <div className="text-base font-bold text-slate-900 dark:text-white">384.2 km²</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400">Total Estimated Volume</div>
                    <div className="text-base font-bold text-slate-900 dark:text-white">62,400 bbls</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400">Thick Mineral Oil (Code 4/5)</div>
                    <div className="text-base font-bold text-red-500">12 Slicks</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400">Surface Sheen (Code 1-3)</div>
                    <div className="text-base font-bold text-amber-500">24 Slicks</div>
                  </div>
                </div>
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-300 text-[11px]">
                  <b>Methodology Citation:</b> Bonn Agreement Oil Appearance Code (BAOAC 2013) + Fay Spreading Law (Phase 2 Gravitational-Viscous).
                </div>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setActivePage('detection');
                  }}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer transition"
                >
                  Open Satellite Detection Studio →
                </button>
              </div>
            )}

            {/* Modal Body 2: Passes */}
            {activeModal === 'passes' && (
              <div className="space-y-3">
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>102 satellite swaths</strong> ingested from Copernicus Data Space and USGS in the last 72 hours covering active maritime economic zones.
                </p>
                <div className="space-y-2">
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold">Sentinel-1A SAR (IW Mode)</div>
                      <div className="text-[10px] text-slate-400">Pass #142 Descending • C-Band Dual-Pol (10m)</div>
                    </div>
                    <span className="text-emerald-500 font-bold font-mono">LIVE FEED</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold">Sentinel-2B Optical (MSI)</div>
                      <div className="text-[10px] text-slate-400">Sun-Glint Band 8A + NDWI verification</div>
                    </div>
                    <span className="text-blue-400 font-mono">14:20 UTC</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold">Landsat-9 OLI / TIRS</div>
                      <div className="text-[10px] text-slate-400">Thermal Infrared Brightness Temperature (30m)</div>
                    </div>
                    <span className="text-orange-400 font-mono">08:15 UTC</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg cursor-pointer transition"
                >
                  Close
                </button>
              </div>
            )}

            {/* Modal Body 3: Accuracy */}
            {activeModal === 'accuracy' && (
              <div className="space-y-3">
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>82.9% skill score</strong> achieved by OpenDrift/OpenOil Lagrangian particle tracking combined with NOAA PyGNOME weathering.
                </p>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1.5 font-mono text-[11px]">
                  <div>Vector Advection: <b>V = V_current + 3.2% V_wind + V_stokes</b></div>
                  <div>Current Model: <b>HYCOM Global Surface Currents (0.85 kn @ 135°)</b></div>
                  <div>Wind Field: <b>NOAA GFS 10m Atmospheric Winds (14.2 kn @ 315°)</b></div>
                  <div>Stokes Factor: <b>0.016 × Wind Speed (Wave surface drift)</b></div>
                  <div>Hindcast Convergence: <b>±1.2 km at calculated origin t₀</b></div>
                </div>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setActivePage('drift');
                  }}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg cursor-pointer transition"
                >
                  Open Hydrodynamic Drift Simulator →
                </button>
              </div>
            )}

            {/* Modal Body 4: Vessels */}
            {activeModal === 'vessels' && (
              <div className="space-y-3">
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>3,217 AIS vessel tracks</strong> audited in DuckDB geospatial database within the calculated spatio-temporal hindcast corridor.
                </p>
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-900 dark:text-red-200 text-[11px] space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span>Primary Suspect Confirmed: {culprit.name}</span>
                  </div>
                  <div>MMSI: {culprit.mmsi} | IMO: {culprit.imo} | Flag: {culprit.flag}</div>
                  <div>Closest Approach (CPA): <b>{(culprit.minDistanceM / 1000).toFixed(1)} km</b> from Origin</div>
                  <div>Composite Risk Score: <b>{culprit.riskScore}% (High-Confidence Culprit)</b></div>
                </div>
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setActivePage('attribution');
                  }}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer transition"
                >
                  Open AIS Attribution Leaderboard →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
