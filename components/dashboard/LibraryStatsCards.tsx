"use client";

import { useEffect, useState } from "react";
import Card from "@/components/shared/Card";
import { getToken } from "@/lib/auth";
import { getLibraryDashboardAnalytics, getLibrarySummary } from "@/lib/services/libraryService";
import type { LibraryDashboardAnalytics, LibrarySummaryResponse } from "@/types/entities/library";
import { BookOpen, BookMarked, AlertTriangle, Wallet, Loader2 } from "lucide-react";

const iconMap: Record<string, any> = {
  BookOpen,
  BookMarked,
  AlertTriangle,
  Wallet,
};

interface StatItem {
  id: string;
  title: string;
  value: string | number;
  change: string;
  icon: string;
  backgroundColor: string;
  iconColor: string;
}

export default function LibraryStatsCards() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = getToken();

        let data: LibraryDashboardAnalytics | LibrarySummaryResponse;
        try {
          if (token) {
            data = await getLibraryDashboardAnalytics(token);
          } else {
            throw new Error("No token");
          }
        } catch {
          if (!token) throw new Error("No token");
          data = await getLibrarySummary(token);
        }

        setStats([
          {
            id: "total-books",
            title: "Total Books",
            value: data.total_books,
            change: `${data.available_books} available`,
            icon: "BookOpen",
            backgroundColor: "bg-purple-50",
            iconColor: "text-purple-500",
          },
          {
            id: "issued-books",
            title: "Issued Books",
            value: data.issued_books,
            change: data.available_books > 0 ? `${data.available_books} available` : "View details",
            icon: "BookMarked",
            backgroundColor: "bg-blue-50",
            iconColor: "text-blue-500",
          },
          {
            id: "overdue-books",
            title: "Overdue Books",
            value: data.overdue_books,
            change: "Needs attention",
            icon: "AlertTriangle",
            backgroundColor: "bg-red-50",
            iconColor: "text-red-500",
          },
          {
            id: "total-fine",
            title: "Total Fines",
            value: data.overdue_books > 0 ? `Pending` : "₹0",
            change: "View fines",
            icon: "Wallet",
            backgroundColor: "bg-amber-50",
            iconColor: "text-amber-500",
          },
        ]);
        setError(null);
      } catch (err) {
        console.error("Error fetching library stats:", err);
        setError(err instanceof Error ? err.message : "Failed to load library stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} hover>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-600">Loading...</span>
                <div className="bg-slate-100 p-2 rounded-lg">
                  <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-300">--</div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8">
        <Card className="border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((card) => {
        const IconComponent = iconMap[card.icon];
        return (
          <Card key={card.id} hover>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-600">
                  {card.title}
                </span>
                {IconComponent && (
                  <div className={`${card.backgroundColor} p-2 rounded-lg`}>
                    <IconComponent className={`${card.iconColor} w-5 h-5`} />
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">
                  {card.value}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">{card.change}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
