import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { IncidentProvider, useIncident } from './context/IncidentContext';
import { Navbar } from './components/common/Navbar';
import { TimelineScrubber } from './components/common/TimelineScrubber';
import { DashboardPage } from './pages/DashboardPage';
import { DetectionPage } from './pages/DetectionPage';
import { DriftModelPage } from './pages/DriftModelPage';
import { AttributionPage } from './pages/AttributionPage';
import { ReportsPage } from './pages/ReportsPage';
import { ProfileSettingsModal } from './components/common/ProfileSettingsModal';
import { VesselInspectModal } from './components/common/VesselInspectModal';

const AppContent: React.FC = () => {
  const { activePage } = useIncident();

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'detection':
        return <DetectionPage />;
      case 'drift':
        return <DriftModelPage />;
      case 'attribution':
        return <AttributionPage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <DashboardPage />;
    }
  };

  const showTimeline = activePage !== 'reports';

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-100 dark:bg-[#0B111E] text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-blue-500 selection:text-white overflow-hidden">
      {/* Top Institutional Navigation Bar */}
      <div className="shrink-0 z-50">
        <Navbar />
      </div>

      {/* Main Dedicated Scrollable Container (Smooth single scroll) */}
      <main className="flex-1 w-full overflow-y-auto overflow-x-hidden min-h-0 custom-scrollbar p-3 sm:p-4 lg:p-5">
        <div className="max-w-[1920px] mx-auto w-full">
          {renderActivePage()}
        </div>
      </main>

      {/* Bottom 4D Playback Timeline Scrubber (Docked cleanly at bottom, hidden on reports) */}
      {showTimeline && (
        <div className="shrink-0 w-full z-40 print:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1626]">
          <TimelineScrubber />
        </div>
      )}

      {/* Global Maritime Agency Settings & Vessel Forensics Modals */}
      <ProfileSettingsModal />
      <VesselInspectModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <IncidentProvider>
        <AppContent />
      </IncidentProvider>
    </ThemeProvider>
  );
}
