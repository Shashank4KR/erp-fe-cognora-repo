"use client";

import { useState } from "react";
import { events } from "@/lib/dashboard/dashboard-data";
import Card from "@/components/shared/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import Modal from "@/components/shared/Modal";
import Calendar, { CalendarEvent } from "@/components/shared/Calendar";

export default function UpcomingEvents() {
  const [open, setOpen] = useState(false);

  const calendarEvents: CalendarEvent[] = events.map((e) => ({
    day: e.day,
    title: e.title,
  }));

  return (
    <Card>
      <div className="p-6">
        <SectionHeader
          title="Upcoming Events"
          action={
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg px-3 py-1.5 text-sm font-semibold text-purple-600 transition hover:bg-purple-50 hover:text-purple-700"
            >
              View Calendar
            </button>
          }
        />

        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
            >
              {/* Date Box */}
              <div className="flex flex-col items-center bg-slate-100 rounded-lg p-2 flex-shrink-0">
                <span className="text-xs font-semibold text-slate-600 uppercase">
                  {event.month}
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {event.day}
                </span>
              </div>

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 text-sm">
                  {event.title}
                </p>
                <p className="text-xs text-slate-500 mt-1">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="School Calendar">
        <Calendar
          initialDate={new Date(2025, 4, 1)}
          events={calendarEvents}
          showEventDots
        />
      </Modal>
    </Card>
  );
}
