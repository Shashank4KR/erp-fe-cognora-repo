"use client";

import { useState } from "react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";

interface BulkImportHostelStudentsDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { file: File | null }) => void;
}

export default function BulkImportHostelStudentsDialog({
  open,
  onClose,
  onSave,
}: BulkImportHostelStudentsDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (selected) {
      const ext = selected.name.split(".").pop()?.toLowerCase();
      if (ext !== "csv" && ext !== "xlsx" && ext !== "xls") {
        setError("Please select a CSV or XLSX file.");
        setFile(null);
        return;
      }
      setError("");
      setFile(selected);
    }
  };

  const handleSave = () => {
    if (!file) {
      setError("Please select a file to import.");
      return;
    }
    onSave({ file });
    handleClose();
  };

  const handleClose = () => {
    setFile(null);
    setError("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Bulk Import Hostel Students" maxWidth="max-w-lg">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">
            Upload File (CSV / XLSX)
          </label>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          {file && (
            <p className="mt-1 text-xs text-emerald-600">Selected: {file.name}</p>
          )}
        </div>
        <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500">
          <p className="font-semibold text-slate-700 mb-1">Supported format:</p>
          <p>Columns: Admission No, Roll No, Student Name, Gender, Class, Section, Block, Room No, Guardian Name, Guardian Contact, Status</p>
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            onClick={handleClose}
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white"
          >
            Import
          </Button>
        </div>
      </div>
    </Modal>
  );
}
