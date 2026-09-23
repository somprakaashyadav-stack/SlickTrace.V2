import React from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIncident } from '../../context/IncidentContext';

export const TimelineScrubber: React.FC = () => {
  const {
    timelineProgress,
    setTimelineProgress,
    isPlaying,
    togglePlay,
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

  const timeTicks = [
    '18:00', '13:00', '16:00', '15:00', '13:00',
    '14:00', '15:00', '14:00', '15:00', '16:00', '17:00'
  ];

  return (
    <footer className="w-full bg-white dark:bg-[#0E1626] px-4 py-2 select-none transition-colors duration-200">
      <div className="max-w-[1920px] mx-auto flex flex-col gap-1.5">
        {/* Top Header / Legend (matching blueprint) */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              4D Timeline Scrubber
            </span>
            <span className="text-[10px] text-slate-400 hidden md:inline">
              — Move through time, historical slick detections, simulated drift, and vessel movements.
            </span>
          </div>

          {/* Legend Items */}
          <div className="flex items-center gap-4 text-[10px]">
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

        {/* Scrubber Controls Bar with << and >> buttons */}
        <div className="flex items-center gap-2">
          {/* Step Back button (<<) */}
          <button
            onClick={handleStepBack}
            className="w-6 h-6 rounded flex items-center justify-center border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-bold cursor-pointer"
            title="Step Back"
          >
            <ChevronLeft className="w-3.5 h-3.5 -mr-1" />
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="w-6 h-6 rounded flex items-center justify-center bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 hover:opacity-90 transition cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
          </button>

          {/* Track Bar with Keyframe Markers */}
          <div className="flex-1 relative flex flex-col justify-center py-1">
            {/* Dots along track (from Blueprint) */}
            <div className="relative w-full h-3">
              {/* Dot 1: Amber */}
              <div
                className="absolute top-0 transform -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-500 cursor-pointer"
                style={{ left: '12%' }}
                onClick={() => setTimelineProgress(12)}
                title="Satellite Detection 1"
              />

              {/* Dot 2: Red */}
              <div
                className="absolute top-0 transform -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-red-600 cursor-pointer"
                style={{ left: '26%' }}
                onClick={() => setTimelineProgress(26)}
                title="Speed Anomaly Detected"
              />

              {/* Dot 3: Green */}
              <div
                className="absolute top-0 transform -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500 cursor-pointer"
                style={{ left: '32%' }}
                onClick={() => setTimelineProgress(32)}
                title="Historical Slick"
              />

              {/* Dot 4: Black (Origin Target) */}
              <div
                className="absolute top-0 transform -translate-x-1/2 w-3 h-3 rounded-full bg-slate-900 dark:bg-white border-2 border-red-500 cursor-pointer animate-pulse"
                style={{ left: '45%' }}
                onClick={() => setTimelineProgress(45)}
                title="Spill Origin Window (t₀)"
              />

              {/* Dot 5: Amber */}
              <div
                className="absolute top-0 transform -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-500 cursor-pointer"
                style={{ left: '60%' }}
                onClick={() => setTimelineProgress(60)}
                title="Drift Vector Keyframe"
              />

              {/* Dot 6: Blue */}
              <div
                className="absolute top-0 transform -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-600 cursor-pointer"
                style={{ left: '92%' }}
                onClick={() => setTimelineProgress(92)}
                title="Vessel Route Intersect"
              />
            </div>

            {/* Range Slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={timelineProgress}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-cyan-400 -mt-1"
            />

            {/* Time Ticks Row (matching blueprint) */}
            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 mt-1">
              {timeTicks.map((tick, i) => (
                <span key={i}>{tick}</span>
              ))}
            </div>
          </div>

          {/* Step Forward button (>>) */}
          <button
            onClick={handleStepForward}
            className="w-6 h-6 rounded flex items-center justify-center border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-bold cursor-pointer"
            title="Step Forward"
          >
            <ChevronRight className="w-3.5 h-3.5 -mr-1" />
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
