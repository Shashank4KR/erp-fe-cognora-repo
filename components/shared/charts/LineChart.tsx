"use client";

import { useState } from "react";

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
}

export default function LineChart({
  data,
  height = 160,
  color = "#7c3aed",
}: LineChartProps) {
  const width = 400;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height;
  const maxValue = Math.max(...data.map((d) => d.value), 0);
  const step = data.length > 1 ? chartWidth / (data.length - 1) : 0;

  const points = data.map((d, i) => {
    const x = padding + i * step;
    const y =
      padding + chartHeight - (maxValue ? d.value / maxValue : 0) * chartHeight;
    return { x, y, ...d };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  const [hover, setHover] = useState<number | null>(null);

  const yTicks = [0, 25, 50, 75, 100];

  return (
    <svg
      viewBox={`0 0 ${width} ${height + padding}`}
      className="w-full h-full"
      onMouseLeave={() => setHover(null)}
    >
      {/* Grid lines */}
      {yTicks.map((tick) => {
        const y = padding + chartHeight - (tick / 100) * chartHeight;
        return (
          <line
            key={tick}
            x1={padding}
            y1={y}
            x2={width - padding}
            y2={y}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        );
      })}

      {/* Y-axis labels */}
      {yTicks.map((tick) => {
        const y = padding + chartHeight - (tick / 100) * chartHeight;
        return (
          <text
            key={`label-${tick}`}
            x="12"
            y={y + 4}
            fontSize="12"
            fill="#999"
            textAnchor="middle"
          >
            {tick}%
          </text>
        );
      })}

      {/* Line */}
      <polyline
        points={polylinePoints}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data points + hover targets */}
      {points.map((point, i) => (
        <g key={point.label}>
          <rect
            x={Math.max(0, point.x - step / 2)}
            y={padding}
            width={step || chartWidth}
            height={chartHeight}
            fill="transparent"
            onMouseEnter={() => setHover(i)}
          />
          <circle
            cx={point.x}
            cy={point.y}
            r={hover === i ? 5 : 4}
            fill={hover === i ? color : "#e2e8f0"}
            stroke={hover === i ? color : "#cbd5e1"}
            strokeWidth="2"
          />
        </g>
      ))}

      {/* X-axis labels */}
      {points.map((point) => (
        <text
          key={`x-${point.label}`}
          x={point.x}
          y={height + padding - 10}
          fontSize="12"
          textAnchor="middle"
          fill="#666"
        >
          {point.label}
        </text>
      ))}

      {/* Hover Tooltip */}
      {hover !== null && (
        <g>
          <rect
            x={points[hover].x - 28}
            y={points[hover].y - 46}
            width="56"
            height="32"
            fill={color}
            rx="4"
          />
          <text
            x={points[hover].x}
            y={points[hover].y - 32}
            fontSize="11"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            {points[hover].label}
          </text>
          <text
            x={points[hover].x}
            y={points[hover].y - 20}
            fontSize="11"
            fill="white"
            textAnchor="middle"
          >
            {points[hover].value}%
          </text>
        </g>
      )}
    </svg>
  );
}
