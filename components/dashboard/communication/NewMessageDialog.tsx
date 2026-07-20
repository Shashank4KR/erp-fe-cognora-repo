"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown, Paperclip, Calendar } from "lucide-react";
import Modal from "@/components/shared/Modal";
import Dropdown from "@/components/shared/Dropdown";
import { cn } from "@/lib/utils";

interface NewMessageDialogProps {
  open: boolean;
  onClose: () => void;
  onSend: () => void;
}

type MessageType = "Message" | "Email" | "SMS" | "Notification";
type RecipientType = "Student" | "Parent" | "Teacher" | "Staff" | "Class" | "Group" | "All";

export default function NewMessageDialog({ open, onClose, onSend }: NewMessageDialogProps) {
  const [form, setForm] = useState({
    messageType: "Message" as MessageType,
    recipientType: "Student" as RecipientType,
    recipient: "",
    subject: "",
    message: "",
    attachment: null as File | null,
    sendDate: "",
    sendTime: "",
    priority: "Normal",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) {
      setForm({
        messageType: "Message",
        recipientType: "Student",
        recipient: "",
        subject: "",
        message: "",
        attachment: null,
        sendDate: "",
        sendTime: "",
        priority: "Normal",
      });
      setErrors({});
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.recipient.trim()) newErrors.recipient = "Recipient is required";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSend();
    onClose();
  };

  const inputClass = cn(
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm",
    "focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent"
  );

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-2xl">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">New Message</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Message Type *</label>
            <Dropdown
              value={form.messageType}
              options={["Message", "Email", "SMS", "Notification"]}
              onChange={(v) => setForm({ ...form, messageType: v as MessageType })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Recipient Type *</label>
            <Dropdown
              value={form.recipientType}
              options={["Student", "Parent", "Teacher", "Staff", "Class", "Group", "All"]}
              onChange={(v) => setForm({ ...form, recipientType: v as RecipientType })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Recipient *</label>
            <input
              type="text"
              value={form.recipient}
              onChange={(e) => setForm({ ...form, recipient: e.target.value })}
              className={inputClass}
              placeholder="Select or type recipient"
            />
            {errors.recipient && <p className="text-xs text-red-500 mt-1">{errors.recipient}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Subject *</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className={inputClass}
              placeholder="Enter subject"
            />
            {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Message *</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputClass}
              placeholder="Type your message..."
              rows={4}
            />
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Attachment</label>
            <label className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition">
              <Paperclip className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-600">{form.attachment ? form.attachment.name : "Choose file"}</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setForm({ ...form, attachment: file });
                }}
              />
            </label>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Send Date</label>
            <div className="relative">
              <input
                type="text"
                value={form.sendDate}
                onChange={(e) => setForm({ ...form, sendDate: e.target.value })}
                className={inputClass}
                placeholder="Select date"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Send Time</label>
            <input
              type="time"
              value={form.sendTime}
              onChange={(e) => setForm({ ...form, sendTime: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Priority</label>
            <Dropdown
              value={form.priority}
              options={["Normal", "High", "Urgent"]}
              onChange={(v) => setForm({ ...form, priority: v })}
            />
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
            type="button"
            onClick={() => { onSend(); onClose(); }}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
          >
            Send
          </button>
        </div>
      </form>
    </Modal>
  );
}
