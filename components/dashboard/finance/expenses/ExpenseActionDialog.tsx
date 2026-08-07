"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";

interface ExpenseActionDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  showConfirm?: boolean;
  destructive?: boolean;
}

export default function ExpenseActionDialog({
  open,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = "Confirm",
  showConfirm = true,
  destructive = false,
}: ExpenseActionDialogProps) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md">
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
            type="button"
            onClick={onClose}
           
          >
            Cancel
          </button>
          {showConfirm && (
            <button
              type="button"
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
              className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
                destructive
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-[#7c3aed] hover:brightness-110"
              }`}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

