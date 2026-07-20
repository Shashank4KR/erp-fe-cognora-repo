"use client";

import { useState, useEffect } from "react";
import { X, Bell, Calendar, Clock } from "lucide-react";
import Modal from "@/components/shared/Modal";
import Dropdown from "@/components/shared/Dropdown";
import { cn } from "@/lib/utils";

interface SendNotificationDialogProps {
  open: boolean;
  onClose: () => void;
  onSend: () => void;
}

type Priority = "Normal" | "High" | "Urgent";
type DeliveryChannel = "In-App" | "Email" | "SMS";

export default function SendNotificationDialog({ open, onClose, onSend }: SendNotificationDialogProps) {
  const [form, setForm] = useState({
    title: "",
    audience: "All",
    message: "",
    priority: "Normal" as Priority,
    scheduleDate: "",
    scheduleTime: "",
    deliveryChannel: "In-App" as DeliveryChannel,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) {
      setForm({
        title: "",
        audience: "All",
        message: "",
        priority: "Normal",
        scheduleDate: "",
        scheduleTime: "",
        deliveryChannel: "In-App",
      });
      setErrors({});
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
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
        <h2 className="text-lg font-semibold text-slate-900">Send Notification</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
              placeholder="Notification title"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Audience</label>
            <Dropdown
              value={form.audience}
              options={["All", "Students", "Parents", "Teachers", "Staff"]}
              onChange={(v) => setForm({ ...form, audience: v })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Message *</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputClass}
              placeholder="Type your notification message..."
              rows={4}
            />
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Priority</label>
            <Dropdown
              value={form.priority}
              options={["Normal", "High", "Urgent"]}
              onChange={(v) => setForm({ ...form, priority: v as Priority })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Schedule Date</label>
            <div className="relative">
              <input
                type="text"
                value={form.scheduleDate}
                onChange={(e) => setForm({ ...form, scheduleDate: e.target.value })}
                className={inputClass}
                placeholder="Select date"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Schedule Time</label>
            <div className="relative">
              <input
                type="time"
                value={form.scheduleTime}
                onChange={(e) => setForm({ ...form, scheduleTime: e.target.value })}
                className={inputClass}
              />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Delivery Channel</label>
            <Dropdown
              value={form.deliveryChannel}
              options={["In-App", "Email", "SMS"]}
              onChange={(v) => setForm({ ...form, deliveryChannel: v as DeliveryChannel })}
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
            Schedule
          </button>
          <button
            type="submit"
            className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
          >
            Send Now
          </button>
        </div>
      </form>
    </Modal>
  );
}
