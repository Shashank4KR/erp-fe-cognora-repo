"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, FileText, MoreVertical } from "lucide-react";
import StudentFeeDetailsDialog from "./StudentFeeDetailsDialog";
import FeeInvoiceDialog from "./FeeInvoiceDialog";
import type { StudentFeeRow } from "@/lib/fixtures/fees-management-reference-fixture";

const STUDENT_FEE_ROWS: StudentFeeRow[] = [
  {
    id: "1",
    rollNo: "STU001",
    studentName: "Aarav Sharma",
    classGrade: "VIII - A",
    totalFee: 25000,
    paid: 25000,
    outstanding: 0,
    status: "Paid",
    dueDate: "N/A",
  },
  {
    id: "2",
    rollNo: "STU002",
    studentName: "Diya Patel",
    classGrade: "VI - B",
    totalFee: 18000,
    paid: 12000,
    outstanding: 6000,
    status: "Partial",
    dueDate: "20 May 2025",
  },
  {
    id: "3",
    rollNo: "STU003",
    studentName: "Vihaan Kumar",
    classGrade: "IX - A",
    totalFee: 28000,
    paid: 8000,
    outstanding: 20000,
    status: "Overdue",
    dueDate: "15 May 2025",
  },
  {
    id: "4",
    rollNo: "STU004",
    studentName: "Ishita Gupta",
    classGrade: "VIII - B",
    totalFee: 25000,
    paid: 20000,
    outstanding: 5000,
    status: "Partial",
    dueDate: "25 May 2025",
  },
  {
    id: "5",
    rollNo: "STU005",
    studentName: "Arjun Mehta",
    classGrade: "IX - B",
    totalFee: 28000,
    paid: 28000,
    outstanding: 0,
    status: "Paid",
    dueDate: "N/A",
  },
  {
    id: "6",
    rollNo: "STU006",
    studentName: "Myra Iyer",
    classGrade: "VI - A",
    totalFee: 18000,
    paid: 0,
    outstanding: 18000,
    status: "Overdue",
    dueDate: "10 May 2025",
  },
  {
    id: "7",
    rollNo: "STU007",
    studentName: "Aditya Raj",
    classGrade: "V - B",
    totalFee: 15000,
    paid: 7500,
    outstanding: 7500,
    status: "Partial",
    dueDate: "30 May 2025",
  },
  {
    id: "8",
    rollNo: "STU008",
    studentName: "Rohan Verma",
    classGrade: "VIII - C",
    totalFee: 22000,
    paid: 22000,
    outstanding: 0,
    status: "Paid",
    dueDate: "N/A",
  },
];

const ITEMS_PER_PAGE = 8;

interface StudentFeeDetailsTableProps {
  searchQuery?: string;
  data?: StudentFeeRow[];
  loading?: boolean;
}

export default function StudentFeeDetailsTable({ searchQuery = "", data, loading = false }: StudentFeeDetailsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewStudent, setViewStudent] = useState<StudentFeeRow | null>(null);
  const [invoiceStudent, setInvoiceStudent] = useState<StudentFeeRow | null>(null);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const rows = data || STUDENT_FEE_ROWS;

  const filteredRows = rows.filter((row) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      row.studentName.toLowerCase().includes(q) ||
      row.rollNo.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(rows.length / ITEMS_PER_PAGE));
  const paginatedRows = filteredRows.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Roll No.</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student Name</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Class / Grade</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Total Fee (₹)</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Paid (₹)</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Outstanding (₹)</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="pb-3 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</th>
            <th className="pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition">
              <td className="py-3 pr-4">
                <span className="inline-flex px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                  {row.rollNo}
                </span>
              </td>
              <td className="py-3 pr-4 text-sm font-medium text-slate-900">{row.studentName}</td>
              <td className="py-3 pr-4 text-sm text-slate-600">{row.classGrade}</td>
              <td className="py-3 pr-4 text-sm text-slate-900 text-right font-medium">{row.totalFee.toLocaleString()}</td>
              <td className="py-3 pr-4 text-sm text-slate-900 text-right">{row.paid.toLocaleString()}</td>
              <td className="py-3 pr-4 text-sm text-slate-900 text-right">{row.outstanding.toLocaleString()}</td>
              <td className="py-3 pr-4">{getStatusBadge(row.status)}</td>
              <td className="py-3 pr-4 text-sm text-slate-600">{row.dueDate}</td>
              <td className="py-3">
                <div className="flex items-center justify-center gap-1">
                  <button
                    onClick={() => setViewStudent(row)}
                    className="p-1.5 rounded-md bg-purple-50 hover:bg-purple-100 transition"
                    aria-label="View"
                  >
                    <Eye className="h-3.5 w-3.5 text-[#7c3aed]" />
                  </button>
                  <button
                    onClick={() => setInvoiceStudent(row)}
                    className="p-1.5 rounded-md bg-blue-50 hover:bg-blue-100 transition"
                    aria-label="Invoice"
                  >
                    <FileText className="h-3.5 w-3.5 text-blue-600" />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setActionMenu(actionMenu === row.id ? null : row.id)}
                      className="p-1.5 rounded-md bg-slate-50 hover:bg-slate-100 transition"
                      aria-label="More actions"
                    >
                      <MoreVertical className="h-3.5 w-3.5 text-slate-600" />
                    </button>
                    {actionMenu === row.id && (
                      <div className="absolute right-0 top-full mt-1 z-20 w-40 bg-white border border-slate-200 rounded-lg shadow-lg py-1">
                        <button className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-purple-50 hover:text-[#7c3aed] transition">
                          Collect Fee
                        </button>
                        <button className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-purple-50 hover:text-[#7c3aed] transition">
                          Add Installment
                        </button>
                        <button className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-purple-50 hover:text-[#7c3aed] transition">
                          Send Reminder
                        </button>
                        <button className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-purple-50 hover:text-[#7c3aed] transition">
                          Apply Discount
                        </button>
                        <button className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-purple-50 hover:text-[#7c3aed] transition">
                          View Ledger
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-500">Showing 1 to {Math.min(ITEMS_PER_PAGE, STUDENT_FEE_ROWS.length)} of {STUDENT_FEE_ROWS.length} students</span>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded-md border border-slate-200 hover:bg-slate-50 transition" aria-label="First page">
            <ChevronLeft className="h-4 w-4 text-slate-600" />
          </button>
          <button className="p-1 rounded-md border border-slate-200 hover:bg-slate-50 transition" aria-label="Previous page">
            <ChevronLeft className="h-4 w-4 text-slate-600" />
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-md text-xs font-medium transition ${
                currentPage === page
                  ? "bg-[#7c3aed] text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-2 text-xs text-slate-400">...</span>
          <button className="w-8 h-8 rounded-md border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition">
            58
          </button>
          <button className="p-1 rounded-md border border-slate-200 hover:bg-slate-50 transition" aria-label="Next page">
            <ChevronRight className="h-4 w-4 text-slate-600" />
          </button>
        </div>
      </div>

      {viewStudent && (
        <StudentFeeDetailsDialog student={viewStudent} onClose={() => setViewStudent(null)} />
      )}
      {invoiceStudent && (
        <FeeInvoiceDialog student={invoiceStudent} onClose={() => setInvoiceStudent(null)} />
      )}
    </div>
  );
}
