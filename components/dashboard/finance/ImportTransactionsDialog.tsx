"use client";

import { useState, useRef } from "react";
import Modal from "@/components/shared/Modal";
import { X, Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react";

interface ImportTransactionsDialogProps {
  open: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
}

export default function ImportTransactionsDialog({ open, onClose, onImport }: ImportTransactionsDialogProps) {
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
    <Modal open={open} onClose={handleClose}>
      <div>
        <h2>Import Transactions</h2>
        <button onClick={handleClose} aria-label="Close">
          <X />
        </button>
      </div>
      <div>
        {imported ? (
          <div>
            <CheckCircle2 />
            <p>Import Complete</p>
            <p>{selectedFile?.name} has been processed successfully.</p>
            <button
              onClick={handleClose}
             
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
               
              />
              <FileSpreadsheet />
              <p>
                {selectedFile ? selectedFile.name : "Drag & drop your file here"}
              </p>
              <p>or click to browse</p>
              <p>Accepted formats: CSV, XLSX</p>
            </div>
            <div>
              <button
                type="button"
               
                onClick={() => alert("Template download simulated")}
              >
                Download Template
              </button>
              <div>
                <button
                  type="button"
                  onClick={handleClose}
                 
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleImport}
                  disabled={!selectedFile || importing}
                 
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

