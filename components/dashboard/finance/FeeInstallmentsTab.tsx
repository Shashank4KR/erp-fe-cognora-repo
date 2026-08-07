"use client";

import { MoreVertical } from "lucide-react";
import type { FeeInstallmentRow } from "@/lib/fixtures/fees-management-reference-fixture";

const FEE_INSTALLMENT_ROWS = [
  {
    id: "1",
    studentName: "Aarav Sharma",
    classGrade: "VIII - A",
    installment: "Installment 1",
    dueDate: "10 May 2025",
    amount: 12500,
    paidAmount: 12500,
    balance: 0,
    status: "Paid",
  },
  {
    id: "2",
    studentName: "Aarav Sharma",
    classGrade: "VIII - A",
    installment: "Installment 2",
    dueDate: "10 Jun 2025",
    amount: 12500,
    paidAmount: 12500,
    balance: 0,
    status: "Paid",
  },
  {
    id: "3",
    studentName: "Diya Patel",
    classGrade: "VI - B",
    installment: "Installment 1",
    dueDate: "10 May 2025",
    amount: 9000,
    paidAmount: 9000,
    balance: 0,
    status: "Paid",
  },
  {
    id: "4",
    studentName: "Diya Patel",
    classGrade: "VI - B",
    installment: "Installment 2",
    dueDate: "10 Jun 2025",
    amount: 9000,
    paidAmount: 3000,
    balance: 6000,
    status: "Partial",
  },
  {
    id: "5",
    studentName: "Vihaan Kumar",
    classGrade: "IX - A",
    installment: "Installment 1",
    dueDate: "10 May 2025",
    amount: 14000,
    paidAmount: 8000,
    balance: 6000,
    status: "Overdue",
  },
];

export default function FeeInstallmentsTab() {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      Paid: "bg-emerald-50 text-emerald-700",
      Partial: "bg-amber-50 text-amber-700",
      Overdue: "bg-red-50 text-red-700",
      Pending: "bg-slate-100 text-slate-700",
    };
    return (
      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.Pending}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Class / Grade</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Installment</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount (₹)</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Paid (₹)</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Balance (₹)</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {FEE_INSTALLMENT_ROWS.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition">
              <td className="py-3 pr-4 text-sm font-medium text-slate-900">{row.studentName}</td>
              <td className="py-3 pr-4 text-sm text-slate-600">{row.classGrade}</td>
              <td className="py-3 pr-4 text-sm text-slate-600">{row.installment}</td>
              <td className="py-3 pr-4 text-sm text-slate-600">{row.dueDate}</td>
              <td className="py-3 pr-4 text-sm text-slate-900 text-right font-medium">{row.amount.toLocaleString()}</td>
              <td className="py-3 pr-4 text-sm text-slate-900 text-right">{row.paidAmount.toLocaleString()}</td>
              <td className="py-3 pr-4 text-sm text-slate-900 text-right">{row.balance.toLocaleString()}</td>
              <td className="py-3 pr-4">{getStatusBadge(row.status)}</td>
              <td className="py-3 text-center">
                <button className="p-1.5 rounded-md bg-slate-50 hover:bg-slate-100 transition" aria-label="More actions">
                  <MoreVertical className="h-3.5 w-3.5 text-slate-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
