"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import type { Conversation } from "@/lib/fixtures/communications-announcements-reference-fixture";

interface ConversationPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  conversation: Conversation | null;
}

export default function ConversationPreviewDialog({
  open,
  onClose,
  conversation,
}: ConversationPreviewDialogProps) {
  if (!conversation) return null;

  const [reply, setReply] = useState("");

  const handleSend = () => {
    if (!reply.trim()) return;
    setReply("");
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-lg">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">{conversation.title}</h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition" aria-label="Close">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-semibold text-purple-700 flex-shrink-0">
            {conversation.initials}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">{conversation.title}</p>
            <p className="text-sm text-slate-600 mt-1">{conversation.preview}</p>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Conversation</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-semibold text-purple-700 flex-shrink-0">
                {conversation.initials}
              </div>
              <div className="flex-1 bg-slate-50 rounded-lg p-3">
                <p className="text-sm text-slate-700">{conversation.preview}</p>
                <p className="text-xs text-slate-400 mt-1">{conversation.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
                JA
              </div>
              <div className="flex-1 bg-purple-50 rounded-lg p-3">
                <p className="text-sm text-slate-700">Thank you for the update. I will look into this.</p>
                <p className="text-xs text-slate-400 mt-1">Just now</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Reply</label>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your reply..."
            rows={3}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent"
          />
          <div className="flex items-center justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSend}
              className="rounded-lg bg-[#7c3aed] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
