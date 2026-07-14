"use client";

interface DonutChartProps {
  value?: number | string;
  total?: number;
  label?: string;
  segments?: { label: string; value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
}

export default function DonutChart({
  value,
  total = 100,
  label,
  segments,
  size = 120,
  strokeWidth = 12,
}: DonutChartProps) {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  if (segments && segments.length > 0) {
    // Multi-segment donut
    let dashOffset = 0;

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((segment, i) => {
          const percentage = segment.value / 100;
          const dashArrayLength = percentage * circumference;
          const prevDashOffset = dashOffset;
          dashOffset += dashArrayLength;

          return (
            <circle
              key={segment.label}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashArrayLength} ${circumference}`}
              strokeDashoffset={-prevDashOffset}
              transform={`rotate(-90 ${center} ${center})`}
              strokeLinecap="round"
            />
          );
        })}

        {/* Center content */}
        {label && (
          <>
            <text
              x={center}
              y={center - 8}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={size > 100 ? "28" : "20"}
              fontWeight="bold"
              fill="#0f172a"
            >
              {typeof value === "number" ? value.toLocaleString() : value}
            </text>
            <text
              x={center}
              y={center + 12}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={size > 100 ? "11" : "9"}
              fill="#64748b"
            >
              {label}
            </text>
          </>
        )}
      </svg>
    );
  }

  // Single value donut
  const numericValue = typeof value === "number" ? value : 0;
  const percentage = numericValue / total;
  const dashLength = percentage * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={strokeWidth}
      />

      {/* Progress circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#7c3aed"
        strokeWidth={strokeWidth}
        strokeDasharray={`${dashLength} ${circumference}`}
        transform={`rotate(-90 ${center} ${center})`}
        strokeLinecap="round"
      />

      {/* Center text */}
      {label && (
        <>
          <text
            x={center}
            y={center - 6}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={size > 100 ? "28" : "20"}
            fontWeight="bold"
            fill="#0f172a"
          >
            {value != null ? `${Math.round(percentage * 100)}%` : ""}
          </text>
          <text
            x={center}
            y={center + 10}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={size > 100 ? "11" : "9"}
            fill="#64748b"
          >
            {label}
          </text>
        </>
      )}
    </svg>
  );
}
