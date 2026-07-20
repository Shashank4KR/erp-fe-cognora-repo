"use client";

interface TransportMapIllustrationProps {
  highlightedVehicle?: string;
}

export default function TransportMapIllustration({
  highlightedVehicle,
}: TransportMapIllustrationProps) {
  return (
    <div className="relative w-full h-48 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
      {/* Map background roads */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 180" preserveAspectRatio="xMidYMid slice">
        {/* Horizontal roads */}
        <line x1="0" y1="60" x2="400" y2="60" stroke="#e2e8f0" strokeWidth="6" />
        <line x1="0" y1="130" x2="400" y2="130" stroke="#e2e8f0" strokeWidth="4" />
        {/* Vertical roads */}
        <line x1="100" y1="0" x2="100" y2="180" stroke="#e2e8f0" strokeWidth="4" />
        <line x1="200" y1="0" x2="200" y2="180" stroke="#e2e8f0" strokeWidth="5" />
        <line x1="320" y1="0" x2="320" y2="180" stroke="#e2e8f0" strokeWidth="4" />
        {/* Diagonal connector */}
        <line x1="200" y1="60" x2="320" y2="130" stroke="#e2e8f0" strokeWidth="3" />

        {/* Green Park marker */}
        <circle cx="100" cy="40" r="12" fill="#10b981" opacity="0.9" />
        <text x="100" y="44" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">P</text>

        {/* Sun City marker */}
        <circle cx="200" cy="30" r="12" fill="#3b82f6" opacity="0.9" />
        <text x="200" y="34" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">S</text>

        {/* School marker (central) */}
        <rect x="172" y="92" width="56" height="36" rx="4" fill="#1e293b" />
        <text x="200" y="108" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">SCHOOL</text>
        <text x="200" y="120" textAnchor="middle" fill="#94a3b8" fontSize="6">Building</text>

        {/* New Town marker */}
        <circle cx="320" cy="140" r="12" fill="#f97316" opacity="0.9" />
        <text x="320" y="144" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">N</text>

        {/* Route line paths */}
        <path d="M100,40 L200,30 L172,110" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="4 2" />
        <path d="M200,30 L200,110" stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="4 2" />
        <path d="M200,110 L320,140" stroke="#f97316" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="4 2" />
      </svg>

      {/* Labels */}
      <div className="absolute top-2 left-4 text-xs font-medium text-slate-600">Green Park</div>
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-medium text-slate-600">Sun City</div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs font-medium text-slate-700">School</div>
      <div className="absolute bottom-2 right-4 text-xs font-medium text-slate-600">New Town</div>

      {/* Vehicle markers */}
      <div
        className={`absolute top-[28%] left-[22%] w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-md flex items-center justify-center ${
          highlightedVehicle === "KA-05-AB-1234" ? "ring-2 ring-purple-500 ring-offset-1" : ""
        }`}
      >
        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
        </svg>
      </div>

      <div
        className={`absolute top-[14%] left-[44%] w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-md flex items-center justify-center ${
          highlightedVehicle === "KA-05-CD-5678" ? "ring-2 ring-purple-500 ring-offset-1" : ""
        }`}
      >
        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
        </svg>
      </div>

      <div
        className={`absolute top-[44%] left-[48%] w-6 h-6 rounded-full bg-amber-500 border-2 border-white shadow-md flex items-center justify-center ${
          highlightedVehicle === "KA-05-EF-9012" ? "ring-2 ring-purple-500 ring-offset-1" : ""
        }`}
      >
        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
        </svg>
      </div>

      <div
        className={`absolute top-[60%] left-[46%] w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-md flex items-center justify-center ${
          highlightedVehicle === "KA-05-GH-3456" ? "ring-2 ring-purple-500 ring-offset-1" : ""
        }`}
      >
        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
        </svg>
      </div>

      <div
        className={`absolute top-[76%] left-[52%] w-6 h-6 rounded-full bg-orange-500 border-2 border-white shadow-md flex items-center justify-center ${
          highlightedVehicle === "KA-05-IJ-7890" ? "ring-2 ring-purple-500 ring-offset-1" : ""
        }`}
      >
        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
        </svg>
      </div>
    </div>
  );
}
