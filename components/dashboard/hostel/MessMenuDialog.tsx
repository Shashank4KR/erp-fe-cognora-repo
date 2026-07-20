"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";

interface MessMenuDialogProps {
  open: boolean;
  onClose: () => void;
}

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEAL_TIMES = ["Breakfast", "Lunch", "Dinner"];

export default function MessMenuDialog({ open, onClose }: MessMenuDialogProps) {
  const [menu, setMenu] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {};
    WEEK_DAYS.forEach((day) => {
      initial[day] = {};
      MEAL_TIMES.forEach((meal) => {
        initial[day][meal] = "";
      });
    });
    return initial;
  });

  const handleSave = () => {
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Mess Menu" maxWidth="max-w-3xl">
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200">Day</th>
                {MEAL_TIMES.map((meal) => (
                  <th key={meal} className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200">
                    {meal}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WEEK_DAYS.map((day) => (
                <tr key={day} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-2 font-medium text-slate-700 border-r border-slate-100">{day}</td>
                  {MEAL_TIMES.map((meal) => (
                    <td key={meal} className="px-2 py-2">
                      <input
                        type="text"
                        value={menu[day][meal]}
                        onChange={(e) =>
                          setMenu((prev) => ({
                            ...prev,
                            [day]: { ...prev[day], [meal]: e.target.value },
                          }))
                        }
                        placeholder="Menu item"
                        className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-[#7c3aed]"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <Button
            onClick={handleSave}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg px-4 py-2 text-sm font-semibold"
          >
            Save Menu
          </Button>
        </div>
      </div>
    </Modal>
  );
}
