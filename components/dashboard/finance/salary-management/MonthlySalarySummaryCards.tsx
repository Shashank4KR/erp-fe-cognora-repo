"use client";

import { Wallet, MinusCircle, Clock, CreditCard } from "lucide-react";
import Card from "@/components/shared/Card";

const MONTHLY_SUMMARY_CARDS = [
  {
    title: "Total Allowances (May 2025)",
    value: "₹ 7,20,000",
    footer: "↑ 5.2% From Apr 2025",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    icon: "wallet",
  },
  {
    title: "Total Deductions (May 2025)",
    value: "₹ 2,85,000",
    footer: "↑ 3.1% From Apr 2025",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    icon: "deduct",
  },
  {
    title: "Total Overtime (May 2025)",
    value: "₹ 1,25,000",
    footer: "↑ 8.7% From Apr 2025",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    icon: "clock",
  },
  {
    title: "Total Reimbursements (May 2025)",
    value: "₹ 75,000",
    footer: "↑ 2.4% From Apr 2025",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    icon: "card",
  },
];const iconMap: Record<string, React.ReactNode> = {
  wallet: <Wallet className="h-5 w-5" />,
  deduct: <MinusCircle className="h-5 w-5" />,
  clock: <Clock className="h-5 w-5" />,
  card: <CreditCard className="h-5 w-5" />,
};

export default function MonthlySalarySummaryCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {MONTHLY_SUMMARY_CARDS.map((card) => (
        <Card key={card.title} className="p-4">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{card.title}</span>
            <div className={`${card.iconBg} p-2 rounded-lg`}>
              <span className={card.iconColor}>{iconMap[card.icon]}</span>
            </div>
          </div>
          <p className="text-lg font-bold text-slate-900">{card.value}</p>
          <p className="text-xs text-slate-500 mt-0.5">{card.footer}</p>
        </Card>
      ))}
    </div>
  );
}
