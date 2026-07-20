"use client";

import { useState, useRef } from "react";
import { X, Upload, FileSpreadsheet, Download } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";

interface ImportInvoicesDialogProps {
  open: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
}

export default function ImportInvoicesDialog({ open, onClose, onImport }: ImportInvoicesDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setPreview(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(true);
    }
  };

  const handleImport = () => {
    if (file) {
      onImport(file);
      setFile(null);
      setPreview(false);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="w-full max-w-2xl">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Import Invoices</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
            dragActive ? "border-[#7c3aed] bg-purple-50" : "border-slate-200 hover:border-purple-300"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-700 mb-1">
            Drag & drop your file here, or <span className="text-[#7c3aed]">browse</span>
          </p>
          <p className="text-xs text-slate-500">Supported formats: CSV, XLSX</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => alert("Template downloaded")}
            className="flex items-center gap-2 text-sm text-[#7c3aed] hover:underline"
          >
            <Download className="h-4 w-4" />
            Download Template
          </button>
          {file && (
            <span className="text-sm text-slate-600">
              Selected: <span className="font-medium">{file.name}</span>
            </span>
          )}
        </div>
        {preview && file && (
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <FileSpreadsheet className="h-8 w-8 text-emerald-500" />
              <div>
                <p className="text-sm font-medium text-slate-900">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">Preview will be available after import</p>
          </div>
        )}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleImport}
            disabled={!file}
            className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Import
          </button>
        </div>
      </div>
    </Modal>
  );
}
