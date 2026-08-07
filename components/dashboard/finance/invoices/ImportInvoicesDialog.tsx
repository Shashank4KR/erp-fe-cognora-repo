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
    <Modal open={open} onClose={onClose}>
      <div>
        <h2>Import Invoices</h2>
        <button onClick={onClose} aria-label="Close">
          <X />
        </button>
      </div>
      <div>
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
           
          />
          <Upload />
          <p>
            Drag & drop your file here, or <span>browse</span>
          </p>
          <p>Supported formats: CSV, XLSX</p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => alert("Template downloaded")}
           
          >
            <Download />
            Download Template
          </button>
          {file && (
            <span>
              Selected: <span>{file.name}</span>
            </span>
          )}
        </div>
        {preview && file && (
          <div>
            <div>
              <FileSpreadsheet />
              <div>
                <p>{file.name}</p>
                <p>{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <p>Preview will be available after import</p>
          </div>
        )}
        <div>
          <button
            type="button"
            onClick={onClose}
           
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleImport}
            disabled={!file}
           
          >
            Import
          </button>
        </div>
      </div>
    </Modal>
  );
}

