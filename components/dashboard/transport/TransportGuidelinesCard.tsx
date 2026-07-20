"use client";

import Card from "@/components/shared/Card";

interface TransportGuidelinesCardProps {
  guidelines: string[];
}

export default function TransportGuidelinesCard({ guidelines }: TransportGuidelinesCardProps) {
  return (
    <Card className="p-0 overflow-hidden mb-6">
      <div className="flex flex-col lg:flex-row">
        {/* Left side - Guidelines */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="12" rx="2" fill="#7c3aed" />
                <rect x="5" y="8" width="4" height="3" rx="0.5" fill="#a78bfa" />
                <rect x="15" y="8" width="4" height="3" rx="0.5" fill="#a78bfa" />
                <rect x="7" y="13" width="10" height="1.5" rx="0.5" fill="#ddd6fe" />
                <circle cx="7.5" cy="16" r="1.5" fill="#1e293b" />
                <circle cx="16.5" cy="16" r="1.5" fill="#1e293b" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Transport Guidelines</h2>
              <ul className="space-y-3">
                {guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
                    <span className="text-sm text-slate-600 leading-relaxed">{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right side - Bus illustration */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-purple-50/80 to-white">
          <svg width="280" height="160" viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bus body */}
            <rect x="20" y="40" width="200" height="80" rx="8" fill="#f59e0b" />
            <rect x="30" y="50" width="180" height="50" rx="4" fill="#fbbf24" />
            {/* Windows */}
            <rect x="40" y="58" width="28" height="20" rx="2" fill="#1e40af" />
            <rect x="76" y="58" width="28" height="20" rx="2" fill="#1e40af" />
            <rect x="112" y="58" width="28" height="20" rx="2" fill="#1e40af" />
            <rect x="148" y="58" width="28" height="20" rx="2" fill="#1e40af" />
            <rect x="184" y="58" width="20" height="20" rx="2" fill="#1e40af" />
            {/* Door */}
            <rect x="200" y="60" width="14" height="40" rx="2" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
            {/* Headlight */}
            <rect x="210" y="85" width="8" height="6" rx="1" fill="#fef3c7" />
            {/* Bumper */}
            <rect x="20" y="110" width="200" height="6" rx="2" fill="#1e293b" />
            {/* Wheels */}
            <circle cx="55" cy="116" r="12" fill="#1e293b" />
            <circle cx="55" cy="116" r="5" fill="#475569" />
            <circle cx="185" cy="116" r="12" fill="#1e293b" />
            <circle cx="185" cy="116" r="5" fill="#475569" />
            {/* Students */}
            <g transform="translate(0, 0)">
              {/* Student 1 */}
              <circle cx="250" cy="55" r="6" fill="#fca5a5" />
              <rect x="244" y="62" width="12" height="18" rx="2" fill="#3b82f6" />
              <rect x="247" y="80" width="3" height="12" rx="1" fill="#1e293b" />
              <rect x="252" y="80" width="3" height="12" rx="1" fill="#1e293b" />
              {/* Student 2 */}
              <circle cx="230" cy="50" r="6" fill="#fca5a5" />
              <rect x="224" y="57" width="12" height="18" rx="2" fill="#10b981" />
              <rect x="227" y="75" width="3" height="12" rx="1" fill="#1e293b" />
              <rect x="232" y="75" width="3" height="12" rx="1" fill="#1e293b" />
              {/* Student 3 */}
              <circle cx="210" cy="52" r="6" fill="#fca5a5" />
              <rect x="204" y="59" width="12" height="18" rx="2" fill="#f59e0b" />
              <rect x="207" y="77" width="3" height="12" rx="1" fill="#1e293b" />
              <rect x="212" y="77" width="3" height="12" rx="1" fill="#1e293b" />
            </g>
            {/* Road line */}
            <line x1="10" y1="130" x2="270" y2="130" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="6 4" />
          </svg>
        </div>
      </div>
    </Card>
  );
}
