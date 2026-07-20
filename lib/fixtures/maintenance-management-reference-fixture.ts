/**
 * This data exists only for the approved Maintenance Management UI implementation.
 * Replace it with backend API data during the later integration phase.
 */

export interface MaintenanceSummaryCard {
  title: string;
  value: number;
  footer: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  tint: string;
}

export interface MaintenanceRequest {
  id: string;
  requestedBy: string;
  blockRoom: string;
  issueType: string;
  priority: "Low" | "Medium" | "High" | "Emergency";
  status: "Open" | "In Progress" | "Completed" | "Overdue";
  requestedOn: string;
  category: string;
  description: string;
  requestedDate: string;
  requestedTime: string;
  attachment?: string;
  assignedStaff?: string;
  relatedWorkOrder?: string;
}

export interface WorkOrder {
  id: string;
  relatedRequest: string;
  issueType: string;
  assignedTo: string;
  status: "Open" | "In Progress" | "Completed" | "Overdue";
  scheduledDate: string;
  notes?: string;
}

export interface QuickActionItem {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const MAINTENANCE_SUMMARY_CARDS: MaintenanceSummaryCard[] = [
  {
    title: "Total Requests",
    value: 128,
    footer: "All Time",
    icon: "Wrench",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    tint: "bg-blue-50/60",
  },
  {
    title: "Open Requests",
    value: 32,
    footer: "25.00%",
    icon: "ClipboardCheck",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tint: "bg-emerald-50/60",
  },
  {
    title: "In Progress",
    value: 18,
    footer: "14.06%",
    icon: "Clock",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    tint: "bg-orange-50/60",
  },
  {
    title: "Completed",
    value: 74,
    footer: "57.81%",
    icon: "CheckCircle2",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    tint: "bg-purple-50/60",
  },
  {
    title: "Overdue",
    value: 4,
    footer: "3.13%",
    icon: "XCircle",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    tint: "bg-pink-50/60",
  },
];

export const MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
  {
    id: "MR2025O518-001",
    requestedBy: "Aditya Sharma",
    blockRoom: "Block A / A-101",
    issueType: "Fan Not Working",
    priority: "High",
    status: "Open",
    requestedOn: "18/05/2025 09:15 AM",
    category: "Electrical",
    description: "Ceiling fan in room A-101 is not working.",
    requestedDate: "18/05/2025",
    requestedTime: "09:15 AM",
  },
  {
    id: "MR2025O518-002",
    requestedBy: "Ananya Gupta",
    blockRoom: "Block A / A-102",
    issueType: "Water Leakage",
    priority: "High",
    status: "In Progress",
    requestedOn: "18/05/2025 10:30 AM",
    category: "Plumbing",
    description: "Water leakage from bathroom tap.",
    requestedDate: "18/05/2025",
    requestedTime: "10:30 AM",
  },
  {
    id: "MR2025O518-003",
    requestedBy: "Rohan Verma",
    blockRoom: "Block A / A-103",
    issueType: "Light Not Working",
    priority: "Medium",
    status: "Open",
    requestedOn: "18/05/2025 11:20 AM",
    category: "Electrical",
    description: "Tube light in room A-103 not working.",
    requestedDate: "18/05/2025",
    requestedTime: "11:20 AM",
  },
  {
    id: "MR2025O518-004",
    requestedBy: "Sneha Patel",
    blockRoom: "Block B / B-201",
    issueType: "Door Lock Issue",
    priority: "Medium",
    status: "In Progress",
    requestedOn: "17/05/2025 04:45 PM",
    category: "Furniture",
    description: "Room door lock is jammed.",
    requestedDate: "17/05/2025",
    requestedTime: "04:45 PM",
  },
  {
    id: "MR2025O517-005",
    requestedBy: "Vikram Singh",
    blockRoom: "Block B / B-202",
    issueType: "Geyser Not Working",
    priority: "High",
    status: "Completed",
    requestedOn: "17/05/2025 09:10 AM",
    category: "Appliance",
    description: "Geyser not heating water.",
    requestedDate: "17/05/2025",
    requestedTime: "09:10 AM",
  },
  {
    id: "MR2025O517-006",
    requestedBy: "Meera Nair",
    blockRoom: "Block C / C-301",
    issueType: "Plug Point Issue",
    priority: "Low",
    status: "Completed",
    requestedOn: "17/05/2025 10:05 AM",
    category: "Electrical",
    description: "Plug point not working in C-301.",
    requestedDate: "17/05/2025",
    requestedTime: "10:05 AM",
  },
  {
    id: "MR2025O516-007",
    requestedBy: "Pooja Iyer",
    blockRoom: "Block C / C-302",
    issueType: "Bathroom Tap Leakage",
    priority: "Medium",
    status: "Completed",
    requestedOn: "16/05/2025 02:15 PM",
    category: "Plumbing",
    description: "Tap in bathroom is leaking.",
    requestedDate: "16/05/2025",
    requestedTime: "02:15 PM",
  },
  {
    id: "MR2025O516-008",
    requestedBy: "Arjun Das",
    blockRoom: "Block D / D-401",
    issueType: "AC Not Cooling",
    priority: "High",
    status: "Completed",
    requestedOn: "16/05/2025 03:30 PM",
    category: "Appliance",
    description: "Air conditioner not cooling properly.",
    requestedDate: "16/05/2025",
    requestedTime: "03:30 PM",
  },
];

export const WORK_ORDERS: WorkOrder[] = [
  {
    id: "WO2025O518-001",
    relatedRequest: "MR2025O518-002",
    issueType: "Water Leakage",
    assignedTo: "Ramesh Kumar",
    status: "In Progress",
    scheduledDate: "18/05/2025",
    notes: "Plumber assigned. Expected completion by evening.",
  },
  {
    id: "WO2025O518-002",
    relatedRequest: "MR2025O518-001",
    issueType: "Fan Not Working",
    assignedTo: "Suresh Yadav",
    status: "Open",
    scheduledDate: "18/05/2025",
    notes: "Electrician to visit today.",
  },
  {
    id: "WO2025O517-003",
    relatedRequest: "MR2025O517-005",
    issueType: "Geyser Not Working",
    assignedTo: "Mahesh Verma",
    status: "Completed",
    scheduledDate: "17/05/2025",
    notes: "Geyser repaired and tested.",
  },
];

export const STATUS_CHART_SEGMENTS = [
  { label: "Open", value: 32, color: "#3b82f6" },
  { label: "In Progress", value: 18, color: "#f97316" },
  { label: "Completed", value: 74, color: "#10b981" },
  { label: "Overdue", value: 4, color: "#ef4444" },
];

export const CATEGORY_CHART_SEGMENTS = [
  { label: "Electrical", value: 46, color: "#3b82f6" },
  { label: "Plumbing", value: 32, color: "#10b981" },
  { label: "Furniture", value: 20, color: "#f97316" },
  { label: "Appliance", value: 16, color: "#6366f1" },
  { label: "Others", value: 14, color: "#ef4444" },
];

export const QUICK_ACTIONS: QuickActionItem[] = [
  { label: "Raise Request", icon: "Wrench", color: "text-[#7c3aed]", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
  { label: "View Work Orders", icon: "ClipboardList", color: "text-emerald-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
  { label: "Request History", icon: "History", color: "text-[#7c3aed]", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
  { label: "Maintenance Staff", icon: "HardHat", color: "text-orange-500", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
  { label: "Inventory", icon: "Package", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  { label: "Reports", icon: "FileText", color: "text-pink-500", bgColor: "bg-pink-50", borderColor: "border-pink-200" },
];

export const REQUEST_TYPE_OPTIONS = ["All Types", "Repair", "Replacement", "Inspection", "Emergency", "Preventive Maintenance"];
export const CATEGORY_OPTIONS = ["All Categories", "Electrical", "Plumbing", "Furniture", "Appliance", "Others"];
export const PRIORITY_OPTIONS = ["All Priorities", "Low", "Medium", "High", "Emergency"];
export const STATUS_OPTIONS = ["All Status", "Open", "In Progress", "Completed", "Overdue"];
export const HOSTEL_BLOCK_OPTIONS = ["All Blocks", "Block A", "Block B", "Block C", "Block D"];
export const ROWS_PER_PAGE_OPTIONS = [10, 20, 50];

export const TOTAL_REQUESTS_COUNT = 128;
