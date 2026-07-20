"use client";

import { ClipboardList } from "lucide-react";
import Card from "@/components/shared/Card";

export default function HostelStudentsNoteCard() {
  return (
    <Card className="bg-purple-50/40 border-purple-100">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
            <ClipboardList className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Note</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If any student leaves the hostel or changes the room, please update
              immediately to maintain accurate records.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
