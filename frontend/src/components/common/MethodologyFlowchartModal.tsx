import React from 'react';
import { 
  X, 
  Satellite, 
  Sliders, 
  ShieldAlert, 
  Ruler, 
  Compass, 
  Ship, 
  TrendingUp, 
  LayoutDashboard,
  ShieldCheck,
  Leaf,
  Radio,
  Scale,
  Cpu
} from 'lucide-react';
import { useIncident } from '../../context/IncidentContext';

interface MethodologyFlowchartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyFlowchartModal: React.FC<MethodologyFlowchartModalProps> = ({ isOpen, onClose }) => {
  const { setActivePage } = useIncident();

  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      title: 'DATA COLLECTION',
      desc: 'Acquire satellite, AIS, and environmental data & store in centralized PostGIS/DuckDB database.',
      tech: ['Sentinel-1 SAR', 'Sentinel-2 EO', 'Global Fishing Watch API', 'MarineTraffic', 'ERA5 Winds', 'INCOIS / HYCOM'],
      icon: <Satellite className="w-4 h-4 text-blue-500" />,
      color: 'border-blue-300 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200',
      pageTarget: 'detection' as const
    },
    {
      step: 2,
      title: 'DATA PREPROCESSING',
      desc: 'Radiometric calibration (SAR σ₀), speckle filtering (Refined Lee), cloud masking, georeferencing & resampling (10m WGS84).',
      tech: ['Python / GDAL', 'Refined Lee Filter (3x3 / 5x5)', 'EPSG:4326', 'Optical NDWI Masking'],
      icon: <Sliders className="w-4 h-4 text-indigo-500" />,
      color: 'border-indigo-300 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200',
      pageTarget: 'detection' as const
    },
    {
      step: 3,
      title: 'OIL SPILL DETECTION',
      desc: 'Dark-spot segmentation, CNN look-alike classification, generate oil spill probability map & extract vectorized polygons.',
      tech: ['PyTorch U-Net', 'DeepLabV3+', 'Misash CNN', 'Confidence Thresholding'],
      icon: <ShieldAlert className="w-4 h-4 text-emerald-500" />,
      color: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200',
      pageTarget: 'detection' as const
    },
    {
      step: 4,
      title: 'SPILL CHARACTERIZATION',
      desc: 'Calculate area & perimeter (Shoelace), estimate thickness (microns), classify type (Sheen vs. Thick), and compute Bonn BAOAC code.',
      tech: ['Bonn Code (BAOAC 1-5)', 'Fay Spreading Model', 'Volume Integration (m³/bbls)'],
      icon: <Ruler className="w-4 h-4 text-teal-500" />,
      color: 'border-teal-300 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/30 text-teal-900 dark:text-teal-200',
      pageTarget: 'detection' as const
    },
    {
      step: 5,
      title: 'OCEAN DRIFT MODELLING',
      desc: 'Initialize spill location, run backward Lagrangian drift (OpenDrift), predict probable origin area & forecast future shoreline impact.',
      tech: ['OpenDrift (OpenOil)', 'ERA5 10m Wind Fields', 'INCOIS ROMS / HYCOM Currents', 'Leeway Factor 3.2%'],
      icon: <Compass className="w-4 h-4 text-cyan-500" />,
      color: 'border-cyan-300 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/30 text-cyan-900 dark:text-cyan-200',
      pageTarget: 'drift' as const
    },
    {
      step: 6,
      title: 'AIS CORRELATION & SCORING',
      desc: 'Match vessels in origin area & temporal window. Compute CPA distance, speed drops (slow-steaming), and AIS transponder blackouts.',
      tech: ['XGBoost Classifier', 'MovingPandas Trajectory Analytics', 'Spatio-Temporal CPA Solver'],
      icon: <Ship className="w-4 h-4 text-amber-500" />,
      color: 'border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200',
      pageTarget: 'attribution' as const
    },
    {
      step: 7,
      title: 'RANKING & EXPLANATION',
      desc: 'Rank vessels by multi-factor suspicion score (0-100), generate forensic evidence audit trail, and persist results in DuckDB/PostGIS.',
      tech: ['PostgreSQL + PostGIS', 'DuckDB Columnar Engine', 'XGBoost Feature Importance', 'Explainable AI'],
      icon: <TrendingUp className="w-4 h-4 text-purple-500" />,
      color: 'border-purple-300 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200',
      pageTarget: 'attribution' as const
    },
    {
      step: 8,
      title: 'OUTPUT & VISUALIZATION',
      desc: 'Interactive 4D GIS map with slick, drift path, and vessels. Autonomous generation of 4 multi-stakeholder operational dossiers.',
      tech: ['React.js + Leaflet / Mapbox', 'FastAPI REST Architecture', 'SHA-256 Custody Seal', 'Docker & Cloud GPU'],
      icon: <LayoutDashboard className="w-4 h-4 text-rose-500" />,
      color: 'border-rose-300 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200',
      pageTarget: 'reports' as const
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#131D31]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                METHODOLOGY FLOWCHART & TECHNICAL ARCHITECTURE
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                End-to-end 8-Step Scientific Pipeline: Satellite Ingestion → PyTorch AI → OpenDrift → XGBoost Attribution → 4 Stakeholder Dossiers
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

        {/* Modal Body: 8 Flowchart Steps */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3 custom-scrollbar text-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {steps.map((s) => (
              <div 
                key={s.step}
                onClick={() => {
                  setActivePage(s.pageTarget);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer hover:shadow-md relative group ${s.color}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-[11px] flex items-center justify-center shrink-0">
                      {s.step}
                    </span>
                    <strong className="font-bold text-xs uppercase tracking-wide">
                      {s.title}
                    </strong>
                  </div>
                  <div className="p-1 rounded bg-white/70 dark:bg-slate-900/70 shrink-0">
                    {s.icon}
                  </div>
                </div>

                <p className="mt-1.5 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {s.desc}
                </p>

                {/* Technologies used tags */}
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap gap-1">
                  {s.tech.map((t, tidx) => (
                    <span 
                      key={tidx}
                      className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-2 text-[10px] font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <span>Open Step in Console →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom 4 Deliverable Endpoints */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5 text-center">
              Target Deliverables & Multi-Stakeholder Endpoints (Step 8 Hub)
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <div className="font-bold text-[11px]">AUTHORITIES</div>
                  <div className="text-[9px] text-slate-500">ICG Interception Order</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-[11px]">ENVIRONMENT</div>
                  <div className="text-[9px] text-slate-500">Booming & Skimmers</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 flex items-center gap-2">
                <Radio className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="font-bold text-[11px]">PUBLIC / MEDIA</div>
                  <div className="text-[9px] text-slate-500">Citizen 1554 Bulletin</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-600 shrink-0" />
                <div>
                  <div className="font-bold text-[11px]">INSURANCE / LEGAL</div>
                  <div className="text-[9px] text-slate-500">Merchant Shipping Act</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131D31] flex items-center justify-between text-[11px]">
          <div className="text-slate-500 flex items-center gap-2 font-mono">
            <span>Stack: PyTorch • XGBoost • OpenDrift • FastAPI • PostGIS • React 19 • Docker</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer transition shadow-xs"
          >
            Close Flowchart
          </button>
        </div>

      </div>
    </div>
  );
};
