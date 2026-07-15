"use client";

interface BarChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  unit?: "currency" | "percent" | "number";
}

export default function BarChart({
  data,
  color = "#7c3aed",
  height = 170,
  unit = "currency",
}: BarChartProps) {
  const width = 400;
  const paddingLeft = 52;
  const paddingRight = 12;
  const paddingTop = 12;
  const paddingBottom = 28;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxValue = Math.max(...data.map((d) => d.value), 0);
  const niceMax = maxValue > 0 ? Math.ceil(maxValue / 5000) * 5000 : 1;

  const yTicks = [0, 0.25, 0.5, 0.75, 1];
  const slot = chartWidth / data.length;
  const barWidth = Math.min(36, slot * 0.55);

  const formatTick = (v: number): string => {
    if (unit === "percent") return `${Math.round(v)}%`;
    if (unit === "number") return v >= 1000 ? `${v / 1000}k` : `${v}`;
    if (v >= 1000) return `₹${v / 1000}k`;
    return `₹${v}`;
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      {/* Y-axis grid + labels */}
      {yTicks.map((t) => {
        const y = paddingTop + chartHeight - t * chartHeight;
        return (
          <g key={t}>
            <line
              x1={paddingLeft}
              y1={y}
              x2={width - paddingRight}
              y2={y}
              stroke="#eef2f7"
              strokeWidth="1"
            />
            <text
              x={paddingLeft - 8}
              y={y + 4}
              fontSize="11"
              fill="#94a3b8"
              textAnchor="end"
            >
              {formatTick(t * niceMax)}
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {data.map((item, i) => {
        const barHeight = niceMax ? (item.value / niceMax) * chartHeight : 0;
        const x = paddingLeft + slot * i + (slot - barWidth) / 2;
        const y = paddingTop + chartHeight - barHeight;
        return (
          <g key={item.label}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={Math.max(barHeight, 2)}
              rx={barWidth / 2}
              fill={color}
            />
            <text
              x={x + barWidth / 2}
              y={height - 8}
              fontSize="11"
              fill="#64748b"
              textAnchor="middle"
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
