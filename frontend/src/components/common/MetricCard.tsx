import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: {
    text: string;
    variant: 'danger' | 'warning' | 'success' | 'info';
  };
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  sparklineSvg?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  badge,
  icon,
  sparklineSvg,
}) => {
  const badgeClasses = {
    danger: 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 border-red-200 dark:border-red-800',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  };

  return (
    <div className="bg-white dark:bg-[#131D31] border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 shadow-xs transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
          {title}
        </span>
        {icon && (
          <div className="text-slate-400 dark:text-slate-500">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-3">
        <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {value}
        </div>
        {badge && (
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeClasses[badge.variant]}`}
          >
            {badge.text}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        {subtitle && <span>{subtitle}</span>}
        {sparklineSvg && <div className="w-16 h-4 opacity-80">{sparklineSvg}</div>}
      </div>
    </div>
  );
};
