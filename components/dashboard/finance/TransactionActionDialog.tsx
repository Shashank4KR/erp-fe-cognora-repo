"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";

interface TransactionActionDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
}

export default function TransactionActionDialog({ open, onClose, title, message, onConfirm }: TransactionActionDialogProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <div>
          <h2>{title}</h2>
          <button onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>
        <p>{message}</p>
        <div>
          <button
            onClick={onClose}
           
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
           
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
}

