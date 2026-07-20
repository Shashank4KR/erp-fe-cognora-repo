/**
 * This data exists only for the approved Rooms Management UI implementation.
 * Replace it with backend API data during the later integration phase.
 */

export interface RoomRow {
  id: string;
  roomNumber: string;
  block: string;
  floor: string;
  roomType: string;
  capacity: number;
  occupiedBeds: number;
  vacantBeds: number;
  occupancyPercent: number;
  status: string;
}

export interface SummaryCardData {
  title: string;
  value: string;
  footer: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  tint: string;
}

export interface QuickActionData {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

export const ROOM_STATUS_OPTIONS = [
  "All Status",
  "Occupied",
  "Partially Vacant",
  "Vacant",
  "Maintenance",
];

export const ROOM_TYPE_FILTER_OPTIONS = [
  "All Types",
  "1 Seater",
  "2 Seater",
  "3 Seater",
  "4 Seater",
];

export const BLOCK_FILTER_OPTIONS = [
  "All Blocks",
  "Block A",
  "Block B",
  "Block C",
];

export const FLOOR_FILTER_OPTIONS = [
  "All Floors",
  "1st Floor",
  "2nd Floor",
  "3rd Floor",
];

export const ADD_ROOM_BLOCK_OPTIONS = [
  "Block A",
  "Block B",
  "Block C",
];

export const ADD_ROOM_FLOOR_OPTIONS = [
  "1st Floor",
  "2nd Floor",
  "3rd Floor",
];

export const ADD_ROOM_TYPE_OPTIONS = [
  "1 Seater",
  "2 Seater",
  "3 Seater",
  "4 Seater",
];

export const ADD_ROOM_STATUS_LIST = [
  "Occupied",
  "Partially Vacant",
  "Vacant",
  "Maintenance",
];

export const ADD_ROOM_GENDER_OPTIONS = ["Boys", "Girls"];

export const ROOMS_SUMMARY_CARDS: SummaryCardData[] = [
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
    title: "Occupied Rooms",
    value: "40",
    footer: "83.33%",
    icon: "Building2",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tint: "bg-emerald-50/60",
  },
  {
    title: "Vacant Rooms",
    value: "8",
    footer: "16.67%",
    icon: "Home",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    tint: "bg-orange-50/60",
  },
  {
    title: "Total Occupancy",
    value: "236 / 288",
    footer: "82.22%",
    icon: "Users",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    tint: "bg-rose-50/60",
  },
  {
    title: "Total Beds",
    value: "288",
    footer: "Across All Rooms",
    icon: "ClipboardList",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    tint: "bg-blue-50/60",
  },
];

export const ROOMS_QUICK_ACTIONS: QuickActionData[] = [
  {
    label: "Add Room",
    icon: "Bed",
    color: "text-[#7c3aed]",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    label: "Allocate Student",
    icon: "Users",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    label: "Room Transfer",
    icon: "ArrowRightLeft",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    label: "Check-Out",
    icon: "LogOut",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  },
  {
    label: "Room Maintenance",
    icon: "Wrench",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    label: "Room Report",
    icon: "FileText",
    color: "text-[#7c3aed]",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

export const ROOM_TYPE_DISTRIBUTION_SEGMENTS: DonutSegment[] = [
  { label: "4 Seater", value: 120, color: "#7c3aed" },
  { label: "3 Seater", value: 96, color: "#10b981" },
  { label: "2 Seater", value: 48, color: "#f97316" },
  { label: "1 Seater", value: 24, color: "#ef4444" },
];

export const ROOMS_FIXTURE_ROWS: RoomRow[] = [
  {
    id: "1",
    roomNumber: "A-101",
    block: "Block A (Boys)",
    floor: "1st Floor",
    roomType: "4 Seater",
    capacity: 4,
    occupiedBeds: 4,
    vacantBeds: 0,
    occupancyPercent: 100,
    status: "Occupied",
  },
  {
    id: "2",
    roomNumber: "A-102",
    block: "Block A (Boys)",
    floor: "1st Floor",
    roomType: "4 Seater",
    capacity: 4,
    occupiedBeds: 4,
    vacantBeds: 0,
    occupancyPercent: 100,
    status: "Occupied",
  },
  {
    id: "3",
    roomNumber: "A-103",
    block: "Block A (Boys)",
    floor: "1st Floor",
    roomType: "3 Seater",
    capacity: 3,
    occupiedBeds: 2,
    vacantBeds: 1,
    occupancyPercent: 66.67,
    status: "Partially Vacant",
  },
  {
    id: "4",
    roomNumber: "A-104",
    block: "Block A (Boys)",
    floor: "1st Floor",
    roomType: "2 Seater",
    capacity: 2,
    occupiedBeds: 2,
    vacantBeds: 0,
    occupancyPercent: 100,
    status: "Occupied",
  },
  {
    id: "5",
    roomNumber: "B-201",
    block: "Block B (Boys)",
    floor: "2nd Floor",
    roomType: "4 Seater",
    capacity: 4,
    occupiedBeds: 3,
    vacantBeds: 1,
    occupancyPercent: 75,
    status: "Partially Vacant",
  },
  {
    id: "6",
    roomNumber: "B-202",
    block: "Block B (Boys)",
    floor: "2nd Floor",
    roomType: "3 Seater",
    capacity: 3,
    occupiedBeds: 3,
    vacantBeds: 0,
    occupancyPercent: 100,
    status: "Occupied",
  },
  {
    id: "7",
    roomNumber: "B-203",
    block: "Block B (Boys)",
    floor: "2nd Floor",
    roomType: "2 Seater",
    capacity: 2,
    occupiedBeds: 1,
    vacantBeds: 1,
    occupancyPercent: 50,
    status: "Partially Vacant",
  },
  {
    id: "8",
    roomNumber: "C-301",
    block: "Block C (Girls)",
    floor: "3rd Floor",
    roomType: "4 Seater",
    capacity: 4,
    occupiedBeds: 4,
    vacantBeds: 0,
    occupancyPercent: 100,
    status: "Occupied",
  },
  {
    id: "9",
    roomNumber: "C-302",
    block: "Block C (Girls)",
    floor: "3rd Floor",
    roomType: "3 Seater",
    capacity: 3,
    occupiedBeds: 2,
    vacantBeds: 1,
    occupancyPercent: 66.67,
    status: "Partially Vacant",
  },
  {
    id: "10",
    roomNumber: "C-303",
    block: "Block C (Girls)",
    floor: "3rd Floor",
    roomType: "2 Seater",
    capacity: 2,
    occupiedBeds: 0,
    vacantBeds: 2,
    occupancyPercent: 0,
    status: "Vacant",
  },
];
