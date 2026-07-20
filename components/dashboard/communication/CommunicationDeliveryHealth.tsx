"use client";

import Link from "next/link";
import Card from "@/components/shared/Card";
import type { DeliveryHealthData } from "@/lib/fixtures/communication-overview-reference-fixture";

interface CommunicationDeliveryHealthProps {
  data: DeliveryHealthData;
}

export default function CommunicationDeliveryHealth({ data }: CommunicationDeliveryHealthProps) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (data.rate / 100) * circumference;

  return (
    <Card className="p-5 flex flex-col">
      <h2 className="text-base font-semibold text-slate-900 mb-4">Delivery Health</h2>

      <div className="flex flex-col items-center justify-center flex-1">
        <div className="relative">
          <svg width="140" height="140" viewBox="0 0 140 140" aria-label={`${data.rate}% delivery rate`}>
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="10"
            />
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#10b981"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 70 70)"
            />
            <text
              x="70"
              y="66"
              textAnchor="middle"
              className="text-xl font-bold fill-slate-900"
            >
              {data.rate}%
            </text>
            <text
              x="70"
              y="82"
              textAnchor="middle"
              className="text-[10px] fill-slate-400"
            >
              Delivery Rate
            </text>
          </svg>
        </div>

        <div className="w-full space-y-2 mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Delivered</span>
            <span className="font-semibold text-emerald-600">{data.delivered.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Failed</span>
            <span className="font-semibold text-pink-500">{data.failed.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Top Channel</span>
            <span className="font-semibold text-blue-500">{data.topChannel}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <Link
          href="/dashboard/admin/communication/statistics"
          className="text-xs font-medium text-[#7c3aed] hover:underline inline-flex items-center gap-1"
        >
          View Statistics
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Card>
  );
}
