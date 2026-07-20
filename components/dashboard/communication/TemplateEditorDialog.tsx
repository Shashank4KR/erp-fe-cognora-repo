"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import Dropdown from "@/components/shared/Dropdown";
import { cn } from "@/lib/utils";

interface TemplateEditorDialogProps {
  open: boolean;
  onClose: () => void;
  templateName?: string;
  onSave?: () => void;
}

export default function TemplateEditorDialog({ open, onClose, templateName, onSave }: TemplateEditorDialogProps) {
  const [form, setForm] = useState({
    title: templateName || "",
    channels: "Email / SMS",
    subject: "",
    body: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) {
      setForm({
        title: templateName || "",
        channels: "Email / SMS",
        subject: "",
        body: "",
      });
      setErrors({});
    }
  }, [open, templateName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.body.trim()) newErrors.body = "Body is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave?.();
    onClose();
  };

  const inputClass = cn(
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm",
    "focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent"
  );

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-2xl">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">Edit Template</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Template Name *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
              placeholder="Template name"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Channels</label>
            <Dropdown
              value={form.channels}
              options={["Email / SMS", "Email", "SMS"]}
              onChange={(v) => setForm({ ...form, channels: v })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Subject *</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className={inputClass}
              placeholder="Subject line"
            />
            {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Body *</label>
            <textarea
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              className={inputClass}
              placeholder="Template body..."
              rows={6}
            />
            {errors.body && <p className="text-xs text-red-500 mt-1">{errors.body}</p>}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
          >
            Save Template
          </button>
        </div>
      </form>
    </Modal>
  );
}
