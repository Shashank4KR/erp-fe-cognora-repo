"use client";

import { useState } from "react";
import { TrendingUp, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/shared/Dropdown";
import Modal from "@/components/shared/Modal";
import Card from "@/components/shared/Card";

const BALANCE_FEE_ROWS = [
  {
    label: "Current (0-30 Days)",
    value: "₹ 15,20,000",
    percentage: 42.7,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    icon: "current",
  },
  {
    label: "Overdue (31-60 Days)",
    value: "₹ 10,10,000",
    percentage: 28.4,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    icon: "overdue1",
  },
  {
    label: "Overdue (60+ Days)",
    value: "₹ 10,25,000",
    percentage: 28.9,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    icon: "overdue2",
  },
];

const BALANCE_FEES_PERIOD_OPTIONS = ["This Month", "This Quarter", "This Academic Year"];

const iconMap: Record<string, React.ReactNode> = {
  current: <TrendingUp />,
  overdue1: <Clock />,
  overdue2: <AlertCircle />,
};

export default function BalanceFeesOverview() {
  const [period, setPeriod] = useState("This Academic Year");
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <Card>
      <div>
        <h3>Balance Fees Overview</h3>
        <Dropdown
          value={period}
          options={BALANCE_FEES_PERIOD_OPTIONS}
          onChange={setPeriod}
        />
      </div>
      <div>
        <div>
          <p>Total Balance Fees</p>
          <p>₹ 35,55,000</p>
          <p>From 126 Students</p>
        </div>
        <div>
          {BALANCE_FEE_ROWS.map((row) => (
            <div key={row.label}>
              <div>
                <div className={`${row.iconBg} p-2 rounded-lg`}>
                  <span className={row.iconColor}>{iconMap[row.icon]}</span>
                </div>
                <div>
                  <p>{row.label}</p>
                  <p>{row.value}</p>
                </div>
              </div>
              <span>{row.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
       
        onClick={() => setReportOpen(true)}
      >
        View Balance Fees Report
      </Button>
      {reportOpen && (
        <Modal open={reportOpen} onClose={() => setReportOpen(false)}>
          <div>
            <div>
              <h3>Balance Fees Report</h3>
              <button
                onClick={() => setReportOpen(false)}
               
              >
                ×
              </button>
            </div>
            <div>
              <div>
                <h4>Total Balance Fees</h4>
                <p>₹ 35,55,000</p>
                <p>From 126 Students</p>
              </div>
              <div>
                {BALANCE_FEE_ROWS.map((row) => (
                  <div key={row.label}>
                    <div>
                      <div className={`${row.iconBg} p-2 rounded-lg`}>
                        <span className={row.iconColor}>{iconMap[row.icon]}</span>
                      </div>
                      <div>
                        <p>{row.label}</p>
                        <p>{row.value}</p>
                      </div>
                    </div>
                    <span>{row.percentage}%</span>
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

