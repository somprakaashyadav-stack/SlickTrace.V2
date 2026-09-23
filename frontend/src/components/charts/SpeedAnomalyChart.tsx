import React from 'react';
import type { SpeedDataPoint } from '../../types';

interface SpeedAnomalyChartProps {
  data: SpeedDataPoint[];
  vesselName: string;
  hasAnomaly: boolean;
}

export const SpeedAnomalyChart: React.FC<SpeedAnomalyChartProps> = ({
  data,
  vesselName,
  hasAnomaly,
}) => {
  if (!data || data.length === 0) {
    return <div className="text-xs text-slate-400 py-3 text-center">No speed profile available</div>;
  }

  const maxSpeed = Math.max(...data.map((d) => Math.max(d.sog, d.baseline)), 16);
  const minSpeed = 0;
  const height = 80;
  const width = 280;
  const paddingX = 25;
  const paddingY = 12;

  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - ((d.sog - minSpeed) / (maxSpeed - minSpeed)) * (height - 2 * paddingY);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  // Baseline line
  const baselineY = height - paddingY - ((data[0].baseline - minSpeed) / (maxSpeed - minSpeed)) * (height - 2 * paddingY);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between text-[11px] mb-1">
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          Speed Profile (SOG Knots)
        </span>
        {hasAnomaly ? (
          <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/60 px-1.5 py-0.5 rounded border border-red-300 dark:border-red-800">
            ⚠️ Deceleration Anomaly
          </span>
        ) : (
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
            ✓ Normal TSS Transit
          </span>
        )}
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20 overflow-visible">
        {/* Baseline normal speed dashed line */}
        <line
          x1={paddingX}
          y1={baselineY}
          x2={width - paddingX}
          y2={baselineY}
          stroke="#94a3b8"
          strokeDasharray="3 3"
          strokeWidth="1"
          opacity="0.6"
        />
        <text
          x={width - paddingX + 2}
          y={baselineY + 3}
          fill="#94a3b8"
          fontSize="8"
          className="font-mono"
        >
          {data[0].baseline} kn
        </text>

        {/* Gradient Fill under curve */}
        <defs>
          <linearGradient id={`grad-${vesselName}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={hasAnomaly ? '#ef4444' : '#0284c7'} stopOpacity="0.4" />
            <stop offset="100%" stopColor={hasAnomaly ? '#ef4444' : '#0284c7'} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <path d={areaD} fill={`url(#grad-${vesselName})`} />

        {/* Speed Line */}
        <path
          d={pathD}
          fill="none"
          stroke={hasAnomaly ? '#dc2626' : '#0284c7'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Highlight points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={p.sog < 5 ? 3.5 : 2}
              fill={p.sog < 5 ? '#dc2626' : '#0284c7'}
              stroke="#ffffff"
              strokeWidth="1"
            />
            {p.sog < 5 && (
              <text
                x={p.x}
                y={p.y - 6}
                textAnchor="middle"
                fill="#dc2626"
                fontSize="9"
                fontWeight="bold"
                className="font-mono"
              >
                {p.sog} kn
              </text>
            )}
          </g>
        ))}

        {/* X-axis labels */}
        <text x={points[0].x} y={height - 2} fill="#64748b" fontSize="8" textAnchor="start">
          {points[0].time}
        </text>
        <text
          x={points[Math.floor(points.length / 2)].x}
          y={height - 2}
          fill="#64748b"
          fontSize="8"
          textAnchor="middle"
        >
          {points[Math.floor(points.length / 2)].time}
        </text>
        <text
          x={points[points.length - 1].x}
          y={height - 2}
          fill="#64748b"
          fontSize="8"
          textAnchor="end"
        >
          {points[points.length - 1].time}
        </text>
      </svg>
    </div>
  );
};
