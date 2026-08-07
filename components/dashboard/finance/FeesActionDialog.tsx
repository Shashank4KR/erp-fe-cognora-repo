"use client";

import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";

interface FeesActionDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function FeesActionDialog({ open, onClose, title, message }: FeesActionDialogProps) {
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
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

