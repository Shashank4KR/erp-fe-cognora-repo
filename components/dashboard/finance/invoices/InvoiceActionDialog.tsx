"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";

interface InvoiceActionDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmLabel?: string;
  destructive?: boolean;
}

export default function InvoiceActionDialog({
  open,
  onClose,
  title,
  message,
  onConfirm,
  confirmLabel = "Confirm",
  destructive = false,
}: InvoiceActionDialogProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <h2>{title}</h2>
        <button onClick={onClose} aria-label="Close">
          <X />
        </button>
      </div>
      <div>
        <p>{message}</p>
        <div>
          <button
            onClick={onClose}
           
          >
            Cancel
          </button>
          {onConfirm && (
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
                destructive ? "bg-red-600 hover:bg-red-700" : "bg-[#7c3aed] hover:bg-[#6d28d9]"
              }`}
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

