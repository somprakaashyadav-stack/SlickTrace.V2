import React from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Clock, FastForward } from 'lucide-react';
import { useIncident } from '../../context/IncidentContext';

export const TimelineScrubber: React.FC = () => {
  const {
    timelineProgress,
    setTimelineProgress,
    isPlaying,
    togglePlay,
    playbackSpeed,
    setPlaybackSpeed,
    showToast
  } = useIncident();

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimelineProgress(Number(e.target.value));
  };

  const handleStepBack = () => {
    setTimelineProgress(Math.max(0, timelineProgress - 10));
  };

  const handleStepForward = () => {
    setTimelineProgress(Math.min(100, timelineProgress + 10));
  };

  const handleSpeedToggle = () => {
    const nextSpeed = playbackSpeed === 1 ? 2 : playbackSpeed === 2 ? 4 : 1;
    setPlaybackSpeed(nextSpeed);
    showToast(`⏱️ Playback Speed: ${nextSpeed}x`);
  };

  // Chronological 4D Timeline Ticks
  const timelineTicks = [
    { label: 'T-34h', time: '11-24 12:00', pct: 0 },
    { label: 'T-28h', time: '11-24 18:00', pct: 18 },
    { label: 'T-20h', time: '11-25 02:00', pct: 40 },
    { label: 't₀ Origin', time: '11-25 10:45', pct: 65, isKey: true },
    { label: 'T-6h', time: '11-25 16:30', pct: 82 },
    { label: 'T0 SAR', time: '11-25 22:30', pct: 100, isKey: true },
  ];

  // Compute active simulation time string dynamically based on slider progress
  const getActiveTimestamp = () => {
    if (timelineProgress >= 98) return '2024-11-25 22:30 UTC • T0 SAR Detection';
    if (timelineProgress >= 60 && timelineProgress <= 70) return '2024-11-25 10:45 UTC • t₀ Discharge Origin Point';
    if (timelineProgress >= 80) return '2024-11-25 16:30 UTC • Lagrangian Hindcast Drift';
    if (timelineProgress >= 40) return '2024-11-25 02:00 UTC • AIS Vessel Approach';
    if (timelineProgress >= 20) return '2024-11-24 18:00 UTC • Pre-Incident AIS Traffic';
    return '2024-11-24 12:00 UTC • Baseline Surveillance';
  };

  return (
    <footer className="w-full bg-white dark:bg-[#0E1626] px-4 py-2.5 select-none transition-colors duration-200 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-[1920px] mx-auto flex flex-col gap-1.5">
        {/* Top Header / Legend & Live Timestamp HUD */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-600 dark:text-slate-300 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>4D Timeline Engine:</span>
            </span>
            {/* Live Synchronized Active Timestamp Badge */}
            <span className="font-mono font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900 text-xs">
              {getActiveTimestamp()}
            </span>
          </div>

          {/* Legend Items */}
          <div className="flex items-center gap-3.5 text-[10px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span>Satellite Detections</span>
            </span>

            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span>Historical Slick Detection</span>
            </span>

            <span className="flex items-center gap-1.5">
              <span className="font-bold text-slate-500">→</span>
              <span>Simulated Drift</span>
            </span>

            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              <span>Vessel Movements</span>
            </span>
          </div>
        </div>

        {/* Scrubber Controls Bar with <<, Play, >> and Speed Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Step Back button (<<) */}
          <button
            onClick={handleStepBack}
            className="w-7 h-7 rounded-lg flex items-center justify-center border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-bold cursor-pointer transition shadow-2xs"
            title="Step Back 10%"
          >
            <ChevronLeft className="w-3.5 h-3.5 -mr-1" />
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 transition cursor-pointer shadow-2xs"
            title={isPlaying ? 'Pause Simulation' : 'Play 4D Simulation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />}
          </button>

          {/* Step Forward button (>>) */}
          <button
            onClick={handleStepForward}
            className="w-7 h-7 rounded-lg flex items-center justify-center border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-bold cursor-pointer transition shadow-2xs"
            title="Step Forward 10%"
          >
            <ChevronRight className="w-3.5 h-3.5" />
            <ChevronRight className="w-3.5 h-3.5 -ml-1" />
          </button>

          {/* Speed Pill */}
          <button
            onClick={handleSpeedToggle}
            type="button"
            className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 cursor-pointer flex items-center gap-1"
            title="Toggle Playback Speed (1x, 2x, 4x)"
          >
            <FastForward className="w-3 h-3" />
            <span>{playbackSpeed}x</span>
          </button>

          {/* Track Bar with Interactive Keyframe Markers & Ticks */}
          <div className="flex-1 relative flex flex-col justify-center py-1">
            {/* Dots along track */}
            <div className="relative w-full h-3">
              {timelineTicks.map((tick) => (
                <div
                  key={tick.label}
                  className={`absolute top-0 transform -translate-x-1/2 w-2.5 h-2.5 rounded-full cursor-pointer transition-transform hover:scale-125 ${
                    tick.isKey ? 'bg-amber-500 ring-2 ring-amber-300 dark:ring-amber-800' : 'bg-blue-500'
                  }`}
                  style={{ left: `${tick.pct}%` }}
                  onClick={() => setTimelineProgress(tick.pct)}
                  title={`Jump to ${tick.label} (${tick.time})`}
                />
              ))}
            </div>

            {/* Slider Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={timelineProgress}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-cyan-400 z-10"
            />

            {/* Chronological Time Ticks Labels below slider */}
            <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1 px-1">
              {timelineTicks.map((tick) => (
                <button
                  key={tick.label}
                  type="button"
                  onClick={() => setTimelineProgress(tick.pct)}
                  className={`hover:text-blue-600 dark:hover:text-cyan-400 cursor-pointer transition-colors ${
                    tick.isKey ? 'font-bold text-slate-700 dark:text-slate-300' : ''
                  }`}
                >
                  {tick.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
