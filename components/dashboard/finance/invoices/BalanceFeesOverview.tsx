"use client";

import { useState } from "react";
import { TrendingUp, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/shared/Dropdown";
import Modal from "@/components/shared/Modal";
import Card from "@/components/shared/Card";
import { BALANCE_FEE_ROWS, BALANCE_FEES_PERIOD_OPTIONS } from "@/lib/fixtures/invoices-reference-fixture";

const iconMap: Record<string, React.ReactNode> = {
  current: <TrendingUp className="h-5 w-5" />,
  overdue1: <Clock className="h-5 w-5" />,
  overdue2: <AlertCircle className="h-5 w-5" />,
};

export default function BalanceFeesOverview() {
  const [period, setPeriod] = useState("This Academic Year");
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Balance Fees Overview</h3>
        <Dropdown
          value={period}
          options={BALANCE_FEES_PERIOD_OPTIONS}
          onChange={setPeriod}
        />
      </div>
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-slate-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Total Balance Fees</p>
          <p className="text-2xl font-bold text-[#7c3aed]">₹ 35,55,000</p>
          <p className="text-xs text-slate-500 mt-1">From 126 Students</p>
        </div>
        <div className="flex-1 space-y-3">
          {BALANCE_FEE_ROWS.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`${row.iconBg} p-2 rounded-lg`}>
                  <span className={row.iconColor}>{iconMap[row.icon]}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{row.label}</p>
                  <p className="text-sm font-semibold text-slate-900">{row.value}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-slate-600">{row.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full gap-2 border-[#7c3aed] text-[#7c3aed] hover:bg-purple-50"
        onClick={() => setReportOpen(true)}
      >
        View Balance Fees Report
      </Button>
      {reportOpen && (
        <Modal open={reportOpen} onClose={() => setReportOpen(false)} className="w-full max-w-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Balance Fees Report</h3>
              <button
                onClick={() => setReportOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Total Balance Fees</h4>
                <p className="text-2xl font-bold text-[#7c3aed]">₹ 35,55,000</p>
                <p className="text-xs text-slate-500 mt-1">From 126 Students</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {BALANCE_FEE_ROWS.map((row) => (
                  <div key={row.label} className="flex items-center justify-between border border-slate-200 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className={`${row.iconBg} p-2 rounded-lg`}>
                        <span className={row.iconColor}>{iconMap[row.icon]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{row.label}</p>
                        <p className="text-sm font-semibold text-slate-900">{row.value}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-slate-600">{row.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}
