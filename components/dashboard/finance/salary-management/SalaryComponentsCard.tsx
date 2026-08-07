"use client";

import { ChevronRight } from "lucide-react";
import Card from "@/components/shared/Card";

const SALARY_COMPONENTS = [
  { component: "Basic Salary", amount: "₹ 18,40,000", percentage: "64.0%" },
  { component: "Allowances", amount: "₹ 7,20,000", percentage: "25.0%" },
  { component: "Deductions", amount: "₹ 2,85,000", percentage: "9.9%" },
  { component: "Net Payout", amount: "₹ 25,90,000", percentage: "90.1%" },
];

export default function SalaryComponentsCard() {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Salary Components (This Month)</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Component</th>
              <th className="text-right px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount (₹)</th>
              <th className="text-right px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">% of Payroll</th>
            </tr>
          </thead>
          <tbody>
            {SALARY_COMPONENTS.map((row) => (
              <tr key={row.component} className="border-b border-slate-50">
                <td className="px-3 py-2.5 text-xs font-medium text-slate-700">{row.component}</td>
                <td className="px-3 py-2.5 text-right text-xs font-semibold text-slate-900">{row.amount}</td>
                <td className="px-3 py-2.5 text-right text-xs text-slate-600">{row.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mt-3 text-xs font-semibold text-[#7c3aed] hover:underline flex items-center gap-1">
        View Full Payroll Report
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </Card>
  );
}
