/**
 * This data exists only for the approved Hostel Management UI implementation.
 * Replace it with backend API data during the later integration phase.
 */

export interface SummaryCard {
  title: string;
  value: string;
  footer: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  tint: string;
}

export interface OccupancyRow {
  blockName: string;
  totalRooms: number;
  totalBeds: number;
  occupiedBeds: number;
  vacantBeds: number;
  occupancyPercent: number;
  color: string;
  isTotal?: boolean;
}

export interface CheckInRow {
  id: string;
  studentName: string;
  rollNo: string;
  roomNo: string;
  block: string;
  checkInDate: string;
  initials: string;
}

export interface QuickAction {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const SUMMARY_CARDS: SummaryCard[] = [
  {
    title: "Total Rooms",
    value: "48",
    footer: "Across 3 Blocks",
    icon: "Bed",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    tint: "bg-blue-50/60",
  },
  {
    title: "Total Students",
    value: "236",
    footer: "Residents",
    icon: "Users",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tint: "bg-emerald-50/60",
  },
  {
    title: "Boys",
    value: "142",
    footer: "60.17%",
    icon: "User",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    tint: "bg-orange-50/60",
  },
  {
    title: "Girls",
    value: "94",
    footer: "39.83%",
    icon: "User",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    tint: "bg-pink-50/60",
  },
  {
    title: "Vacant Beds",
    value: "24",
    footer: "Total Available",
    icon: "ClipboardList",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    tint: "bg-blue-50/60",
  },
];

export const OCCUPANCY_ROWS: OccupancyRow[] = [
  {
    blockName: "Block A (Boys)",
    totalRooms: 20,
    totalBeds: 120,
    occupiedBeds: 98,
    vacantBeds: 22,
    occupancyPercent: 81.67,
    color: "bg-emerald-500",
  },
  {
    blockName: "Block B (Boys)",
    totalRooms: 16,
    totalBeds: 96,
    occupiedBeds: 76,
    vacantBeds: 20,
    occupancyPercent: 79.17,
    color: "bg-amber-500",
  },
  {
    blockName: "Block C (Girls)",
    totalRooms: 12,
    totalBeds: 72,
    occupiedBeds: 62,
    vacantBeds: 10,
    occupancyPercent: 86.11,
    color: "bg-rose-500",
  },
  {
    blockName: "Total",
    totalRooms: 48,
    totalBeds: 288,
    occupiedBeds: 236,
    vacantBeds: 24,
    occupancyPercent: 81.94,
    color: "bg-slate-700",
    isTotal: true,
  },
];

export const CHECK_IN_ROWS: CheckInRow[] = [
  {
    id: "1",
    studentName: "Aditya Sharma",
    rollNo: "23MIS101",
    roomNo: "A-105",
    block: "Block A",
    checkInDate: "18/05/2025",
    initials: "AS",
  },
  {
    id: "2",
    studentName: "Rahul Verma",
    rollNo: "23MIS112",
    roomNo: "A-106",
    block: "Block A",
    checkInDate: "18/05/2025",
    initials: "RV",
  },
  {
    id: "3",
    studentName: "Sneha Patel",
    rollNo: "23MIS221",
    roomNo: "C-203",
    block: "Block C",
    checkInDate: "17/05/2025",
    initials: "SP",
  },
  {
    id: "4",
    studentName: "Ananya Gupta",
    rollNo: "23MIS223",
    roomNo: "C-204",
    block: "Block C",
    checkInDate: "17/05/2025",
    initials: "AG",
  },
  {
    id: "5",
    studentName: "Vikram Singh",
    rollNo: "23MIS115",
    roomNo: "B-102",
    block: "Block B",
    checkInDate: "16/05/2025",
    initials: "VS",
  },
];

export const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "Add Student",
    icon: "UserPlus",
    color: "text-[#7c3aed]",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    label: "Add Room",
    icon: "Bed",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    label: "Add Visitor",
    icon: "UserPlus",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    label: "Mess Menu",
    icon: "Utensils",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  },
  {
    label: "Maintenance Request",
    icon: "Wrench",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    label: "Hostel Reports",
    icon: "FileText",
    color: "text-[#7c3aed]",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

export const BLOCK_OPTIONS = [
  "All Blocks",
  "Block A",
  "Block B",
  "Block C",
];

export const ROOM_TYPE_OPTIONS = [
  "All Types",
  "1 Seater",
  "2 Seater",
  "3 Seater",
  "4 Seater",
];

export const STATUS_OPTIONS = [
  "All Status",
  "Available",
  "Partially Occupied",
  "Full",
  "Maintenance",
];

export const GENDER_OPTIONS = ["All", "Boys", "Girls"];

export const ROOM_TYPE_FILTER_OPTIONS = [
  "All Types",
  "1 Seater",
  "2 Seater",
  "3 Seater",
  "4 Seater",
];

export const ADD_ROOM_STATUS_OPTIONS = [
  "Available",
  "Partially Occupied",
  "Full",
  "Maintenance",
];

export const ADD_BLOCK_STATUS_OPTIONS = ["Active", "Inactive", "Maintenance"];

export const ROOM_GENDER_OPTIONS = ["Boys", "Girls"];
