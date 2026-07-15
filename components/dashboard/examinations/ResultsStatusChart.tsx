"use client";

import { RESULTS_STATUS_DATA } from "@/lib/fixtures/examinations-reference-fixture";

export default function ResultsStatusChart() {
  const total = RESULTS_STATUS_DATA.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Results Status</h3>
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          <svg width="120" height="120" viewBox="0 0 120 120">
            {RESULTS_STATUS_DATA.map((segment, i) => {
              const radius = 48;
              const circumference = 2 * Math.PI * radius;
              const percentage = segment.value / 100;
              const dashArrayLength = percentage * circumference;
              const prevDashOffset = RESULTS_STATUS_DATA.slice(0, i).reduce((sum, s) => sum + (s.value / 100) * circumference, 0);
              return (
                <circle
                  key={segment.label}
                  cx={60}
                  cy={60}
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="12"
                  strokeDasharray={`${dashArrayLength} ${circumference}`}
                  strokeDashoffset={-prevDashOffset}
                  transform="rotate(-90 60 60)"
                  strokeLinecap="round"
                />
              );
            })}
            <text x={60} y={56} textAnchor="middle" dominantBaseline="middle" fontSize="20" fontWeight="bold" fill="#0f172a">
              {total}%
            </text>
            <text x={60} y={72} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#64748b">
              Pass Rate
            </text>
          </svg>
        </div>
        <div className="flex-1 space-y-2">
          {RESULTS_STATUS_DATA.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-600">{item.label}</span>
              </div>
              <span className="text-xs font-semibold text-slate-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
