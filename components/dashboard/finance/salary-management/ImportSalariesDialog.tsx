"use client";

import { useState, useRef } from "react";
import Modal from "@/components/shared/Modal";
import { X, Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react";

interface ImportSalariesDialogProps {
  open: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
}

export default function ImportSalariesDialog({ open, onClose, onImport }: ImportSalariesDialogProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!selectedFile) return;
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setImported(true);
      onImport(selectedFile);
    }, 1500);
  };

  const handleClose = () => {
    setSelectedFile(null);
    setImported(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} className="w-full max-w-lg">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Import Salaries</h2>
        <button onClick={handleClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6">
        {imported ? (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-3" />
            <p className="text-sm font-semibold text-slate-900 mb-1">Import Complete</p>
            <p className="text-xs text-slate-500">{selectedFile?.name} has been processed successfully.</p>
            <button
              onClick={handleClose}
              className="mt-4 rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
                dragActive ? "border-[#7c3aed] bg-purple-50" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileChange}
                className="hidden"
              />
              <FileSpreadsheet className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-700 mb-1">
                {selectedFile ? selectedFile.name : "Drag & drop your file here"}
              </p>
              <p className="text-xs text-slate-500 mb-3">or click to browse</p>
              <p className="text-[11px] text-slate-400">Accepted formats: CSV, XLSX</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                type="button"
                className="text-xs font-medium text-[#7c3aed] hover:underline"
                onClick={() => alert("Template download simulated")}
              >
                Download Template
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleImport}
                  disabled={!selectedFile || importing}
                  className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {importing ? "Importing..." : "Import"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
