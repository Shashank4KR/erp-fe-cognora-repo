"use client";

import { FEE_TYPE_ROWS } from "@/lib/fixtures/fees-management-reference-fixture";

export default function FeeTypesTab() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fee Type</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount (₹)</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Collected (₹)</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Pending (₹)</th>
            <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {FEE_TYPE_ROWS.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition">
              <td className="py-3 pr-4 text-sm font-medium text-slate-900">{row.name}</td>
              <td className="py-3 pr-4 text-sm text-slate-900 text-right font-medium">₹ {row.amount.toLocaleString()}</td>
              <td className="py-3 pr-4 text-sm text-emerald-700 text-right font-medium">₹ {row.collected.toLocaleString()}</td>
              <td className="py-3 pr-4 text-sm text-orange-700 text-right font-medium">₹ {(row.amount - row.collected).toLocaleString()}</td>
              <td className="py-3 text-center">
                <button className="px-3 py-1.5 rounded-md border border-slate-200 text-xs font-medium text-slate-600 hover:bg-purple-50 hover:text-[#7c3aed] hover:border-[#7c3aed] transition">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
