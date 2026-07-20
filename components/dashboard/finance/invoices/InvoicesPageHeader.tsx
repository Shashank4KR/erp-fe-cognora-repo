"use client";

import { Plus, Upload, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InvoicesPageHeaderProps {
  onGenerateInvoice: () => void;
  onImportInvoices: () => void;
  onMoreOptions: () => void;
}

export default function InvoicesPageHeader({
  onGenerateInvoice,
  onImportInvoices,
  onMoreOptions,
}: InvoicesPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
        <nav className="flex items-center gap-1 text-sm mt-1">
          <span className="text-[#7c3aed] font-medium">Dashboard</span>
          <span className="text-slate-400">›</span>
          <span className="text-[#7c3aed] font-medium">Finance</span>
          <span className="text-slate-400">›</span>
          <span className="text-slate-500">Invoices</span>
        </nav>
      </div>
      <div className="flex items-center gap-2 mt-4 sm:mt-0">
        <Button
          onClick={onGenerateInvoice}
          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white gap-1.5"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          <span>Generate Invoice</span>
          <span className="ml-1">▼</span>
        </Button>
        <Button
          onClick={onImportInvoices}
          variant="outline"
          size="sm"
          className="gap-1.5"
        >
          <Upload className="h-4 w-4" />
          <span>Import Invoices</span>
        </Button>
        <Button
          onClick={onMoreOptions}
          variant="outline"
          size="icon-sm"
          className="h-8 w-8"
          aria-label="More options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
