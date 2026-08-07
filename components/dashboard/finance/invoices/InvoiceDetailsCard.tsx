"use client";

import { useState } from "react";
import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import Modal from "@/components/shared/Modal";
import type { InvoiceRow } from "@/lib/fixtures/invoices-reference-fixture";

interface InvoiceDetailsCardProps {
  invoice: InvoiceRow | null;
}

export default function InvoiceDetailsCard({ invoice }: InvoiceDetailsCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!invoice) {
    return (
      <Card>
        <h3>Invoice Details</h3>
        <p>Select an invoice to view details</p>
      </Card>
    );
  }

  return (
    <Card>
      <div>
        <h3>Invoice Details</h3>
        <Badge variant="success">{invoice.status}</Badge>
      </div>
      <div>
        <h4>{invoice.invoiceNo}</h4>
        <p>{invoice.invoiceType}</p>
      </div>
      <div>
        <div>
          <span>Student Name</span>
          <span>{invoice.studentName}</span>
        </div>
        <div>
          <span>Class / Grade</span>
          <span>{invoice.classGrade}</span>
        </div>
        <div>
          <span>Invoice Date</span>
          <span>{invoice.invoiceDate}</span>
        </div>
        <div>
          <span>Due Date</span>
          <span>{invoice.dueDate}</span>
        </div>
        <div>
          <span>Payment Mode</span>
          <span>Online</span>
        </div>
      </div>
      <div>
        <h4>Amount Details</h4>
        <div>
          <div>
            <span>Total Amount</span>
            <span>₹ {invoice.amount.toLocaleString("en-IN")}</span>
          </div>
          <div>
            <span>Paid Amount</span>
            <span>₹ {invoice.paid.toLocaleString("en-IN")}</span>
          </div>
          <div>
            <span>Balance (Balance Fees)</span>
            <span className={`text-sm font-medium ${invoice.balance > 0 ? "text-red-600" : "text-slate-900"}`}>
              ₹ {invoice.balance.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
      <div>
        <Button
          variant="outline"
         
          onClick={() => setPreviewOpen(true)}
        >
          <Eye />
          View Invoice
        </Button>
        <Button
          variant="outline"
         
          onClick={() => alert("Invoice downloaded")}
        >
          <Download />
          Download Invoice
        </Button>
      </div>
      {previewOpen && (
        <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
          <div>
            <div>
              <h3>Invoice Preview</h3>
              <button
                onClick={() => setPreviewOpen(false)}
               
              >
                ×
              </button>
            </div>
            <div>
              <div>
                <div>
                  <h4>{invoice.invoiceNo}</h4>
                  <p>{invoice.invoiceType}</p>
                </div>
                <Badge variant={invoice.status === "Paid" ? "success" : invoice.status === "Partial" ? "warning" : "error"}>
                  {invoice.status}
                </Badge>
              </div>
              <div>
                <div>
                  <p>Student Name</p>
                  <p>{invoice.studentName}</p>
                </div>
                <div>
                  <p>Class / Grade</p>
                  <p>{invoice.classGrade}</p>
                </div>
                <div>
                  <p>Invoice Date</p>
                  <p>{invoice.invoiceDate}</p>
                </div>
                <div>
                  <p>Due Date</p>
                  <p>{invoice.dueDate}</p>
                </div>
              </div>
              <div>
                <div>
                  <span>Total Amount</span>
                  <span>₹ {invoice.amount.toLocaleString("en-IN")}</span>
                </div>
                <div>
                  <span>Paid Amount</span>
                  <span>₹ {invoice.paid.toLocaleString("en-IN")}</span>
                </div>
                <div>
                  <span>Balance</span>
                  <span>₹ {invoice.balance.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}

