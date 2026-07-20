"use client";

interface ExamTypeItem {
  label: string;
  value: number;
  color: string;
}

interface ExaminationTypesChartProps {
  examTypes?: ExamTypeItem[];
  onViewAll?: () => void;
}

export default function ExaminationTypesChart({ examTypes = [], onViewAll }: ExaminationTypesChartProps) {
  const total = examTypes.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Examination Types</h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-semibold text-[#7c3aed] hover:text-purple-700 transition"
          >
            View All
          </button>
        )}
      </div>
      {examTypes.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500">
          No examination data available.
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            <svg width="120" height="120" viewBox="0 0 120 120">
              {examTypes.map((segment, i) => {
                const radius = 48;
                const circumference = 2 * Math.PI * radius;
                const percentage = segment.value / total;
                const dashArrayLength = percentage * circumference;
                const prevDashOffset = examTypes.slice(0, i).reduce((sum, s) => sum + (s.value / total) * circumference, 0);
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
                {total}
              </text>
              <text x={60} y={72} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#64748b">
                Exams
              </text>
            </svg>
          </div>
          <div className="flex-1 space-y-2">
            {examTypes.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-600">{item.label}</span>
                </div>
                <span className="text-xs font-semibold text-slate-900">
                  {item.value}/{total} ({((item.value / total) * 100).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
