"use client";

import { useState, useMemo } from "react";
import Card from "@/components/shared/Card";
import ExpenseTabs from "./ExpenseTabs";
import ExpenseRowActions from "./ExpenseRowActions";
import ExpensePagination from "./ExpensePagination";
import Badge from "@/components/shared/Badge";
import type { Expense } from "@/lib/fixtures/expenses-management-reference-fixture";

interface ExpensesListProps {
  expenses: Expense[];
  onView: (expense: Expense) => void;
  onDownload: (expense: Expense) => void;
  onAction: (expense: Expense, action: string) => void;
}

const ITEMS_PER_PAGE = 10;
const TOTAL_ITEMS = 532;

export default function ExpensesList({ expenses, onView, onDownload, onAction }: ExpensesListProps) {
  const [activeTab, setActiveTab] = useState("All Expenses");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredExpenses = useMemo(() => {
    if (activeTab === "All Expenses") return expenses;
    if (activeTab === "Pending Approval") return expenses.filter((e) => e.status === "Pending");
    if (activeTab === "Approved") return expenses.filter((e) => e.status === "Approved");
    if (activeTab === "Rejected") return expenses.filter((e) => e.status === "Rejected");
    return expenses;
  }, [expenses, activeTab]);

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  const counts = useMemo(() => ({
    "All Expenses": expenses.length,
    "Pending Approval": expenses.filter((e) => e.status === "Pending").length,
    "Approved": expenses.filter((e) => e.status === "Approved").length,
    "Rejected": expenses.filter((e) => e.status === "Rejected").length,
  }), [expenses]);

  const getStatusBadge = (status: string) => {
    if (status === "Approved") {
      return <Badge variant="success">Approved</Badge>;
    }
    if (status === "Pending") {
      return <Badge variant="warning">Pending</Badge>;
    }
    if (status === "Rejected") {
      return <Badge variant="error">Rejected</Badge>;
    }
    return <Badge>{status}</Badge>;
  };

  return (
    <Card className="mb-6">
      <div className="px-6 pt-6">
        <h2 className="text-lg font-semibold text-slate-900">Expenses List</h2>
      </div>
      <ExpenseTabs activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setCurrentPage(1); }} counts={counts} />

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Exp. ID</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Expense Date</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Expense Name</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Department</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Amount (₹)</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Payment Mode</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-slate-50/50 transition">
                <td className="px-6 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                    {expense.expenseId}
                  </span>
                </td>
                <td className="px-6 py-3 text-slate-600 whitespace-nowrap">{expense.expenseDate}</td>
                <td className="px-6 py-3 text-slate-900 font-medium">{expense.expenseName}</td>
                <td className="px-6 py-3 text-slate-600">{expense.category}</td>
                <td className="px-6 py-3 text-slate-600">{expense.department}</td>
                <td className="px-6 py-3 text-slate-900 font-medium text-right whitespace-nowrap">
                  {expense.amount.toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-3 text-slate-600">{expense.paymentMode}</td>
                <td className="px-6 py-3">{getStatusBadge(expense.status)}</td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-center">
                    <ExpenseRowActions
                      expense={expense}
                      onView={onView}
                      onDownload={onDownload}
                      onAction={onAction}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ExpensePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={TOTAL_ITEMS}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </Card>
  );
}
