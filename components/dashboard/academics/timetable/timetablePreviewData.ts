// Timetable structural configuration (NOT backend data).
//
// This file only holds fixed presentation scaffolding used by the Timetable
// module: the weekly period rows, the available view types, and the quick
// action descriptors. All real timetable data (entries, classes, subjects,
// teachers, rooms, analytics) is loaded from the backend in the page.

import type { QuickActionItem, TimeSlot, ViewType } from "./timetableDisplayTypes";

export const PREVIEW_VIEW_TYPES: ViewType[] = [
  "Weekly View",
  "Daily View",
  "Teacher View",
  "Room View",
];

// The fixed weekly period/break rows. Breaks are non-editable structure.
export const PREVIEW_TIMESLOTS: TimeSlot[] = [
  { id: "p1", label: "Period 1", startTime: "08:00", endTime: "08:45", isBreak: false },
  { id: "p2", label: "Period 2", startTime: "08:45", endTime: "09:30", isBreak: false },
  { id: "sb", label: "Short Break", startTime: "09:30", endTime: "09:45", isBreak: true },
  { id: "p3", label: "Period 3", startTime: "09:45", endTime: "10:30", isBreak: false },
  { id: "p4", label: "Period 4", startTime: "10:30", endTime: "11:15", isBreak: false },
  { id: "p5", label: "Period 5", startTime: "11:15", endTime: "12:00", isBreak: false },
  { id: "lb", label: "Lunch Break", startTime: "12:00", endTime: "12:30", isBreak: true },
  { id: "p6", label: "Period 6", startTime: "12:30", endTime: "13:15", isBreak: false },
  { id: "p7", label: "Period 7", startTime: "13:15", endTime: "14:00", isBreak: false },
];

// Quick Actions descriptors. Behavior is wired in the page component. All
// actions navigate to an existing route or trigger a real in-page flow; none
// are disabled placeholders.
export const PREVIEW_QUICK_ACTIONS: QuickActionItem[] = [
  { id: "qa1", label: "Create Timetable", icon: "Plus", colorKey: "purple", tooltip: "Add a new timetable period" },
  { id: "qa2", label: "Assign Teachers", icon: "UserPlus", colorKey: "blue", tooltip: "Teacher assignment is managed from Subjects" },
  { id: "qa3", label: "Manage Periods", icon: "Clock", colorKey: "green", tooltip: "View the weekly period structure" },
  { id: "qa4", label: "Room Allocation", icon: "DoorOpen", colorKey: "orange", tooltip: "Open the timetable to review room allocation" },
  { id: "qa5", label: "Copy Timetable", icon: "Copy", colorKey: "pink", tooltip: "Open the timetable to copy a schedule" },
  { id: "qa6", label: "Publish Timetable", icon: "Send", colorKey: "purple", tooltip: "Open the timetable to publish a schedule" },
  { id: "qa7", label: "Print Timetable", icon: "Printer", colorKey: "blue", tooltip: "Print the current timetable view" },
  { id: "qa8", label: "Timetable Report", icon: "FileBarChart", colorKey: "green", tooltip: "Open the timetable report view" },
];
