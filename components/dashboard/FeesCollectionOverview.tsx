"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import Card from "@/components/shared/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import Badge from "@/components/shared/Badge";
import {
  getDashboardStats,
  type DashboardStats,
} from "@/lib/services/dashboardService";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function FeesCollectionOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const dashboardStats = await getDashboardStats();
        if (!mounted) {
          return;
        }
        setStats(dashboardStats);
      } catch {
        if (mounted) {
          setError("We could not load live fee data.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Card>
      <div className="p-6">
        <SectionHeader title="Fees Collection Overview" />

        {loading ? (
          <p className="text-sm text-slate-600">Loading fee overview...</p>
        ) : error || !stats ? (
          <p className="text-sm text-slate-600">{error ?? "No fee data available."}</p>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-slate-600 text-sm mb-1">Total Collection</p>
              <p className="text-3xl font-bold text-slate-900">
                {formatCurrency(stats.total_fees_collected)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="success" icon={<TrendingUp className="w-3 h-3" />}>
                  {formatCurrency(stats.outstanding_fees)} outstanding
                </Badge>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              Invoiced {formatCurrency(stats.total_fees_invoiced)} across the live backend dataset.
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
