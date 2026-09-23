import React from 'react';
import { Info, Users } from 'lucide-react';
import { LeftControlsPanel } from '../components/dashboard/LeftControlsPanel';
import { RightLeaderboardPanel } from '../components/dashboard/RightLeaderboardPanel';
import { NauticalMap } from '../components/map/NauticalMap';

export const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-3.5 max-w-[1920px] mx-auto w-full select-none">
      {/* 1. Top KPI Cards Row (Exact 4 Cards from Blueprint) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Active Oil Slicks (36) */}
        <div className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Active Oil Slicks
            </span>
            <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px] text-slate-400">
              <Info className="w-2.5 h-2.5" />
            </div>
          </div>

          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
              36
            </span>
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
        <div className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Satellite Passes
            </span>
            <Users className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
              102
            </span>
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
        <div className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Drift Prediction Accuracy
            </span>
            <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px] text-slate-400">
              <Info className="w-2.5 h-2.5" />
            </div>
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
        <div className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Suspect Vessels Identified
            </span>
            <div className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
              6
            </div>
          </div>

          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
              3,217
            </span>
            {/* Spiky line sparkline */}
            <svg viewBox="0 0 60 20" className="w-20 h-6 overflow-visible">
              <path
                d="M 0 16 L 15 14 L 25 8 L 35 14 L 45 4 L 60 16"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Main 3-Column Split (from Blueprint) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch min-h-[580px]">
        {/* Left Column (3 Cols): Satellite & Drift Controls */}
        <div className="lg:col-span-3 h-full">
          <LeftControlsPanel />
        </div>

        {/* Center Column (6 Cols): Interactive geospatial Nautical Map */}
        <div className="lg:col-span-6 h-full min-h-[520px]">
          <NauticalMap />
        </div>

        {/* Right Column (3 Cols): Suspect Vessel Attribution Leaderboard */}
        <div className="lg:col-span-3 h-full">
          <RightLeaderboardPanel />
        </div>
      </div>
    </div>
  );
};
