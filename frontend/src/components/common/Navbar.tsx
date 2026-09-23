import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Satellite, 
  Compass, 
  Ship, 
  FileText, 
  ChevronDown, 
  User,
  MapPin
} from 'lucide-react';
import { useIncident } from '../../context/IncidentContext';
import { ThemeToggle } from './ThemeToggle';
import { MethodologyFlowchartModal } from './MethodologyFlowchartModal';
import type { PageId } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    isBackendConnected, 
    setIsSettingsOpen,
    activeIncident,
    selectIncident,
    incidents 
  } = useIncident();

  const [showIncidentMenu, setShowIncidentMenu] = useState(false);
  const [showFlowchart, setShowFlowchart] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'detection', label: 'Satellite Detection', icon: <Satellite className="w-3.5 h-3.5" /> },
    { id: 'drift', label: 'Drift Simulator', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'attribution', label: 'AIS Attribution', icon: <Ship className="w-3.5 h-3.5" /> },
    { id: 'reports', label: 'Reports', icon: <FileText className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="w-full bg-white dark:bg-[#0E1626] text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800/80 shadow-2xs select-none sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Blue Hexagonal S Logo & Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 flex items-center justify-center text-blue-600 dark:text-cyan-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <polygon points="12 2 2 7 12 12 22 7 12 2" fill="#2563eb" fillOpacity="0.1" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
            SLICKTRACE <span className="text-blue-600 dark:text-cyan-400">V2</span>
          </h1>

          {/* Quick Incident Zone Switcher Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowIncidentMenu(!showIncidentMenu)}
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 cursor-pointer transition"
            >
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span className="truncate max-w-[160px]">{activeIncident.locationName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showIncidentMenu && (
              <div className="absolute left-0 mt-1 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1.5 z-50 text-xs backdrop-blur-md animate-fadeIn">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
                  Active Maritime Incidents
                </div>
                {incidents.map((inc) => (
                  <button
                    key={inc.id}
                    onClick={() => {
                      selectIncident(inc.id);
                      setShowIncidentMenu(false);
                    }}
                    type="button"
                    className={`w-full text-left px-2.5 py-2 rounded-lg transition cursor-pointer flex flex-col ${
                      activeIncident.id === inc.id
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{inc.locationName}</span>
                    <span className="text-[10px] text-slate-400">{inc.slick.areaKm2} km² • {inc.satelliteSensor}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {isBackendConnected ? (
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 ml-1.5 cursor-pointer hover:bg-emerald-100 transition"
              title="FastAPI + DuckDB Engine Live. Click to open Swagger API Docs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>DuckDB Online</span>
            </a>
          ) : (
            <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 ml-1.5">
              <span>Local Store</span>
            </span>
          )}
        </div>

        {/* Center: Page Navigation Tabs */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                type="button"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'border-b-2 border-blue-600 text-blue-600 dark:text-cyan-400 dark:border-cyan-400 bg-blue-50/50 dark:bg-blue-950/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: Theme Toggle & Profile Button */}
        <div className="flex items-center gap-2.5">
          {/* Methodology Flowchart Modal Trigger */}
          <button
            type="button"
            onClick={() => setShowFlowchart(true)}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/60 cursor-pointer shadow-2xs transition"
            title="View 8-Step Scientific Methodology Flowchart & Architecture"
          >
            <span>📐 Methodology Flowchart</span>
          </button>

          {/* Theme Toggle Pill */}
          <ThemeToggle />

          {/* Profile Menu Button */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer shadow-2xs transition"
            title="Open Agency Credentials & API Registry"
          >
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>Profile</span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Methodology Flowchart Modal */}
      <MethodologyFlowchartModal
        isOpen={showFlowchart}
        onClose={() => setShowFlowchart(false)}
      />
    </header>
  );
};
