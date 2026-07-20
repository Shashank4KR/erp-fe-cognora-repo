/**
 * This data exists only for the approved Expenses Management UI implementation.
 * Replace it with backend API data during the later integration phase.
 */

export interface Expense {
  id: string;
  expenseId: string;
  expenseDate: string;
  expenseName: string;
  category: string;
  department: string;
  amount: number;
  paymentMode: string;
  status: "Approved" | "Pending" | "Rejected";
  refNo?: string;
  vendor?: string;
  description?: string;
}

export interface SummaryCard {
  title: string;
  value: string;
  footer: string;
  iconBg: string;
  iconColor: string;
  sparkline: number[];
  sparkColor: string;
  icon: "money" | "wallet" | "chart" | "clock" | "warning" | "analytics";
}

export interface TopCategory {
  category: string;
  amount: string;
  percentage: string;
  barWidth: number;
  amountNum: number;
}

export interface BudgetVsActualItem {
  label: string;
  value: string;
  amountNum: number;
  color: string;
}

export interface PaymentModeSegment {
  label: string;
  value: string;
  amountNum: number;
  percentage: string;
  color: string;
}

export interface ActivityItem {
  id: string;
  text: string;
  subText: string;
  date: string;
  type: "approved" | "pending" | "rejected";
  iconColor: string;
  bgColor: string;
}

export interface QuickActionItem {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const EXPENSES: Expense[] = [
  {
    id: "1",
    expenseId: "EXP250001",
    expenseDate: "18 May 2025",
    expenseName: "Office Supplies",
    category: "Office Expenses",
    department: "Administration",
    amount: 15000,
    paymentMode: "UPI",
    status: "Approved",
  },
  {
    id: "2",
    expenseId: "EXP250002",
    expenseDate: "18 May 2025",
    expenseName: "Guest Lecture Honorarium",
    category: "Academic Expenses",
    department: "Computer Science",
    amount: 25000,
    paymentMode: "Bank Transfer",
    status: "Approved",
  },
  {
    id: "3",
    expenseId: "EXP250003",
    expenseDate: "17 May 2025",
    expenseName: "Lab Equipment Maintenance",
    category: "Maintenance",
    department: "Electronics",
    amount: 45000,
    paymentMode: "Net Banking",
    status: "Approved",
  },
  {
    id: "4",
    expenseId: "EXP250004",
    expenseDate: "17 May 2025",
    expenseName: "Internet & Telephone Bills",
    category: "Utilities",
    department: "Administration",
    amount: 12500,
    paymentMode: "Net Banking",
    status: "Approved",
  },
  {
    id: "5",
    expenseId: "EXP250005",
    expenseDate: "16 May 2025",
    expenseName: "Workshop Materials",
    category: "Academic Expenses",
    department: "Mechanical",
    amount: 28000,
    paymentMode: "Cash",
    status: "Pending",
  },
  {
    id: "6",
    expenseId: "EXP250006",
    expenseDate: "16 May 2025",
    expenseName: "Printing & Stationery",
    category: "Office Expenses",
    department: "Management",
    amount: 8750,
    paymentMode: "UPI",
    status: "Approved",
  },
  {
    id: "7",
    expenseId: "EXP250007",
    expenseDate: "15 May 2025",
    expenseName: "Electricity Bill",
    category: "Utilities",
    department: "Administration",
    amount: 18600,
    paymentMode: "Net Banking",
    status: "Approved",
  },
  {
    id: "8",
    expenseId: "EXP250008",
    expenseDate: "15 May 2025",
    expenseName: "Plantation Expenses",
    category: "Other Expenses",
    department: "NSS",
    amount: 6300,
    paymentMode: "Cash",
    status: "Approved",
  },
  {
    id: "9",
    expenseId: "EXP250009",
    expenseDate: "14 May 2025",
    expenseName: "Conference Registration",
    category: "Academic Expenses",
    department: "Computer Science",
    amount: 9000,
    paymentMode: "Bank Transfer",
    status: "Rejected",
  },
  {
    id: "10",
    expenseId: "EXP250010",
    expenseDate: "14 May 2025",
    expenseName: "Security Services",
    category: "Other Expenses",
    department: "Administration",
    amount: 22000,
    paymentMode: "Net Banking",
    status: "Approved",
  },
];

export const TOTAL_EXPENSES_COUNT = 532;

export const SUMMARY_CARDS: SummaryCard[] = [
  {
    title: "Total Expenses (This Month)",
    value: "₹ 12,45,000",
    footer: "May 2025",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    sparkline: [18, 22, 19, 25, 23, 28, 26, 30, 27, 32],
    sparkColor: "#7c3aed",
    icon: "money",
  },
  {
    title: "Total Expenses (This Year)",
    value: "₹ 1,24,80,000",
    footer: "2024-25",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    sparkline: [15, 18, 16, 22, 20, 24, 21, 26, 23, 28],
    sparkColor: "#10b981",
    icon: "wallet",
  },
  {
    title: "Budget Utilization (This Month)",
    value: "68.4%",
    footer: "Of monthly budget",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    sparkline: [20, 22, 21, 24, 23, 25, 24, 26, 25, 27],
    sparkColor: "#3b82f6",
    icon: "chart",
  },
  {
    title: "Pending Approvals",
    value: "18",
    footer: "Expenses pending",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    sparkline: [5, 7, 6, 8, 9, 10, 8, 12, 11, 13],
    sparkColor: "#f97316",
    icon: "clock",
  },
  {
    title: "Over Budget Expenses",
    value: "₹ 1,25,000",
    footer: "This month",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    sparkline: [3, 5, 4, 6, 5, 7, 6, 8, 7, 9],
    sparkColor: "#ef4444",
    icon: "warning",
  },
  {
    title: "Average Expense / Day",
    value: "₹ 40,161",
    footer: "This month",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    sparkline: [10, 12, 11, 14, 13, 16, 15, 18, 17, 20],
    sparkColor: "#10b981",
    icon: "analytics",
  },
];

export const TOP_EXPENSE_CATEGORIES: TopCategory[] = [
  { category: "Academic Expenses", amount: "₹ 4,25,000", percentage: "34.1%", barWidth: 85, amountNum: 425000 },
  { category: "Office Expenses", amount: "₹ 2,35,000", percentage: "18.9%", barWidth: 50, amountNum: 235000 },
  { category: "Utilities", amount: "₹ 1,86,000", percentage: "14.9%", barWidth: 40, amountNum: 186000 },
  { category: "Maintenance", amount: "₹ 1,45,000", percentage: "11.7%", barWidth: 30, amountNum: 145000 },
  { category: "Other Expenses", amount: "₹ 2,54,000", percentage: "20.4%", barWidth: 55, amountNum: 254000 },
];

export const BUDGET_VS_ACTUAL: BudgetVsActualItem[] = [
  { label: "Total Budget", value: "₹ 18,20,000", amountNum: 1820000, color: "#7c3aed" },
  { label: "Total Expenses", value: "₹ 12,45,000", amountNum: 1245000, color: "#3b82f6" },
  { label: "Remaining Budget", value: "₹ 5,75,000", amountNum: 575000, color: "#10b981" },
];

export const BUDGET_UTILIZATION = "68.4%";

export const PAYMENT_MODE_SEGMENTS: PaymentModeSegment[] = [
  { label: "Net Banking", value: "₹ 5,10,000 (44.1%)", amountNum: 510000, percentage: "44.1%", color: "#3b82f6" },
  { label: "UPI", value: "₹ 3,25,000 (26.1%)", amountNum: 325000, percentage: "26.1%", color: "#f97316" },
  { label: "Bank Transfer", value: "₹ 2,45,000 (19.7%)", amountNum: 245000, percentage: "19.7%", color: "#6366f1" },
  { label: "Cash", value: "₹ 1,65,000 (13.2%)", amountNum: 165000, percentage: "13.2%", color: "#ec4899" },
];

export const PAYMENT_MODE_TOTAL = "₹ 12,45,000";

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    text: "Expense EXP250002 (Guest Lecture Honorarium) approved",
    subText: "Approved by John Admin",
    date: "18 May 2025, 11:30 AM",
    type: "approved",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    id: "2",
    text: "Expense EXP250005 (Workshop Materials) submitted for approval",
    subText: "Submitted by Priya Sharma",
    date: "16 May 2025, 04:25 PM",
    type: "pending",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    id: "3",
    text: "Expense EXP250009 (Conference Registration) rejected",
    subText: "Rejected by John Admin",
    date: "14 May 2025, 02:15 PM",
    type: "rejected",
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
  },
];

export const EXPENSE_QUICK_ACTIONS: QuickActionItem[] = [
  { label: "Add Expense", icon: "Receipt", color: "text-[#7c3aed]", bgColor: "bg-purple-50" },
  { label: "Expense Approval", icon: "UserCheck", color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { label: "Expense Report", icon: "FileText", color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Budget Planning", icon: "PiggyBank", color: "text-orange-600", bgColor: "bg-orange-50" },
  { label: "Category Management", icon: "Tags", color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Payment Mode", icon: "Wallet", color: "text-[#7c3aed]", bgColor: "bg-purple-50" },
  { label: "Export Report", icon: "Download", color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { label: "Settings", icon: "Settings", color: "text-slate-600", bgColor: "bg-slate-100" },
];

export const FINANCIAL_YEAR_OPTIONS = ["2024-25", "2025-26"];
export const DEPARTMENT_OPTIONS = ["All Departments", "Administration", "Computer Science", "Electronics", "Mechanical", "Management", "NSS"];
export const EXPENSE_CATEGORY_OPTIONS = ["All Categories", "Academic Expenses", "Office Expenses", "Utilities", "Maintenance", "Other Expenses"];
export const PAYMENT_MODE_OPTIONS = ["All Modes", "UPI", "Bank Transfer", "Net Banking", "Cash"];
export const STATUS_OPTIONS = ["All Status", "Approved", "Pending", "Rejected"];
export const PERIOD_OPTIONS = ["This Month", "Last Month", "This Quarter", "This Year"];
export const EXPENSE_CATEGORIES_FOR_FORM = ["Academic Expenses", "Office Expenses", "Utilities", "Maintenance", "Other Expenses"];
export const PAYMENT_MODES_FOR_FORM = ["UPI", "Bank Transfer", "Net Banking", "Cash"];
export const APPROVAL_STATUSES_FOR_FORM = ["Approved", "Pending", "Rejected"];
export const VENDOR_EXAMPLES = ["Vendor Name", "ABC Suppliers", "XYZ Services", "Tech Solutions Pvt. Ltd.", ""];
