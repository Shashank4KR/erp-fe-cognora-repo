/**
 * This data exists only for the approved Fees Management UI implementation.
 * Replace it with backend API data during the later integration phase.
 */

export interface StudentFeeRow {
  id: string;
  rollNo: string;
  studentName: string;
  classGrade: string;
  totalFee: number;
  paid: number;
  outstanding: number;
  status: "Paid" | "Partial" | "Overdue" | "Pending";
  dueDate: string;
}

export interface FeeInstallmentRow {
  id: string;
  studentName: string;
  classGrade: string;
  installment: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  balance: number;
  status: "Paid" | "Partial" | "Overdue" | "Pending";
}

export interface FeeTypeRow {
  id: string;
  name: string;
  amount: number;
  collected: number;
  percentage: number;
}

export interface DiscountConcessionRow {
  id: string;
  studentName: string;
  classGrade: string;
  discountType: string;
  originalFee: number;
  discountAmount: number;
  finalFee: number;
  approvalStatus: "Approved" | "Pending" | "Rejected";
}

export interface FeeCollectionByType {
  label: string;
  amount: string;
  percentage: number;
  color: string;
}

export interface QuickAction {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface SummaryCard {
  title: string;
  value: string;
  footer: string;
  iconBg: string;
  iconColor: string;
  icon: string;
  sparkColor: string;
  sparkline: number[];
  secondaryIcon?: string;
}

export interface FooterCard {
  title: string;
  value: string;
  footer: string;
  iconBg: string;
  iconColor: string;
  icon: string;
}

export const STUDENT_FEE_ROWS: StudentFeeRow[] = [
  {
    id: "1",
    rollNo: "STU001",
    studentName: "Aarav Sharma",
    classGrade: "VIII - A",
    totalFee: 25000,
    paid: 25000,
    outstanding: 0,
    status: "Paid",
    dueDate: "N/A",
  },
  {
    id: "2",
    rollNo: "STU002",
    studentName: "Diya Patel",
    classGrade: "VI - B",
    totalFee: 18000,
    paid: 12000,
    outstanding: 6000,
    status: "Partial",
    dueDate: "20 May 2025",
  },
  {
    id: "3",
    rollNo: "STU003",
    studentName: "Vihaan Kumar",
    classGrade: "IX - A",
    totalFee: 28000,
    paid: 8000,
    outstanding: 20000,
    status: "Overdue",
    dueDate: "15 May 2025",
  },
  {
    id: "4",
    rollNo: "STU004",
    studentName: "Ishita Gupta",
    classGrade: "VIII - B",
    totalFee: 25000,
    paid: 20000,
    outstanding: 5000,
    status: "Partial",
    dueDate: "25 May 2025",
  },
  {
    id: "5",
    rollNo: "STU005",
    studentName: "Arjun Mehta",
    classGrade: "IX - B",
    totalFee: 28000,
    paid: 28000,
    outstanding: 0,
    status: "Paid",
    dueDate: "N/A",
  },
  {
    id: "6",
    rollNo: "STU006",
    studentName: "Myra Iyer",
    classGrade: "VI - A",
    totalFee: 18000,
    paid: 0,
    outstanding: 18000,
    status: "Overdue",
    dueDate: "10 May 2025",
  },
  {
    id: "7",
    rollNo: "STU007",
    studentName: "Aditya Raj",
    classGrade: "V - B",
    totalFee: 15000,
    paid: 7500,
    outstanding: 7500,
    status: "Partial",
    dueDate: "30 May 2025",
  },
  {
    id: "8",
    rollNo: "STU008",
    studentName: "Rohan Verma",
    classGrade: "VIII - C",
    totalFee: 22000,
    paid: 22000,
    outstanding: 0,
    status: "Paid",
    dueDate: "N/A",
  },
];

export const FEE_INSTALLMENT_ROWS: FeeInstallmentRow[] = [
  {
    id: "1",
    studentName: "Aarav Sharma",
    classGrade: "VIII - A",
    installment: "Installment 1",
    dueDate: "10 May 2025",
    amount: 12500,
    paidAmount: 12500,
    balance: 0,
    status: "Paid",
  },
  {
    id: "2",
    studentName: "Aarav Sharma",
    classGrade: "VIII - A",
    installment: "Installment 2",
    dueDate: "10 Jun 2025",
    amount: 12500,
    paidAmount: 12500,
    balance: 0,
    status: "Paid",
  },
  {
    id: "3",
    studentName: "Diya Patel",
    classGrade: "VI - B",
    installment: "Installment 1",
    dueDate: "10 May 2025",
    amount: 9000,
    paidAmount: 9000,
    balance: 0,
    status: "Paid",
  },
  {
    id: "4",
    studentName: "Diya Patel",
    classGrade: "VI - B",
    installment: "Installment 2",
    dueDate: "10 Jun 2025",
    amount: 9000,
    paidAmount: 3000,
    balance: 6000,
    status: "Partial",
  },
  {
    id: "5",
    studentName: "Vihaan Kumar",
    classGrade: "IX - A",
    installment: "Installment 1",
    dueDate: "10 May 2025",
    amount: 14000,
    paidAmount: 8000,
    balance: 6000,
    status: "Overdue",
  },
];

export const FEE_TYPE_ROWS: FeeTypeRow[] = [
  { id: "1", name: "Tuition Fee", amount: 7020000, collected: 7020000, percentage: 71.1 },
  { id: "2", name: "Transport Fee", amount: 1245000, collected: 1245000, percentage: 12.6 },
  { id: "3", name: "Admission Fee", amount: 830000, collected: 830000, percentage: 8.4 },
  { id: "4", name: "Exam Fee", amount: 540000, collected: 540000, percentage: 5.5 },
  { id: "5", name: "Other Fees", amount: 240000, collected: 240000, percentage: 2.4 },
];

export const DISCOUNT_CONCESSION_ROWS: DiscountConcessionRow[] = [
  {
    id: "1",
    studentName: "Aarav Sharma",
    classGrade: "VIII - A",
    discountType: "Merit Scholarship",
    originalFee: 25000,
    discountAmount: 5000,
    finalFee: 20000,
    approvalStatus: "Approved",
  },
  {
    id: "2",
    studentName: "Diya Patel",
    classGrade: "VI - B",
    discountType: "Sibling Discount",
    originalFee: 18000,
    discountAmount: 1800,
    finalFee: 16200,
    approvalStatus: "Approved",
  },
  {
    id: "3",
    studentName: "Vihaan Kumar",
    classGrade: "IX - A",
    discountType: "Sports Quota",
    originalFee: 28000,
    discountAmount: 2800,
    finalFee: 25200,
    approvalStatus: "Pending",
  },
  {
    id: "4",
    studentName: "Ishita Gupta",
    classGrade: "VIII - B",
    discountType: "Merit Scholarship",
    originalFee: 25000,
    discountAmount: 2500,
    finalFee: 22500,
    approvalStatus: "Approved",
  },
];

export const FEE_COLLECTION_BY_TYPE: FeeCollectionByType[] = [
  { label: "Tuition Fee", amount: "₹ 70,20,000", percentage: 71.1, color: "#6366f1" },
  { label: "Transport Fee", amount: "₹ 12,45,000", percentage: 12.6, color: "#8b5cf6" },
  { label: "Admission Fee", amount: "₹ 8,30,000", percentage: 8.4, color: "#3b82f6" },
  { label: "Exam Fee", amount: "₹ 5,40,000", percentage: 5.5, color: "#f97316" },
  { label: "Other Fees", amount: "₹ 2,40,000", percentage: 2.4, color: "#ef4444" },
];

export const QUICK_ACTIONS: QuickAction[] = [
  { label: "Collect Fee", icon: "Wallet", color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { label: "Add Installment", icon: "CalendarPlus", color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Generate Invoice", icon: "FileText", color: "text-orange-600", bgColor: "bg-orange-50" },
  { label: "Fee Reminder", icon: "Bell", color: "text-[#7c3aed]", bgColor: "bg-purple-50" },
  { label: "Fee Concession", icon: "Percent", color: "text-pink-600", bgColor: "bg-pink-50" },
  { label: "Export Report", icon: "Download", color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { label: "Fee Ledger", icon: "BookOpen", color: "text-[#7c3aed]", bgColor: "bg-purple-50" },
  { label: "Fee Settings", icon: "Settings", color: "text-slate-600", bgColor: "bg-slate-100" },
];

export const SUMMARY_CARDS: SummaryCard[] = [
  {
    title: "Total Students",
    value: "462",
    footer: "Across all classes",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    icon: "wallet",
    sparkColor: "#7c3aed",
    sparkline: [],
    secondaryIcon: "users",
  },
  {
    title: "Total Fee Expected",
    value: "₹ 1,24,80,000",
    footer: "This Academic Year",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    icon: "rupee",
    sparkColor: "#10b981",
    sparkline: [15, 18, 16, 22, 20, 24, 21, 26, 23, 28, 25, 30],
  },
  {
    title: "Total Collected",
    value: "₹ 98,75,000",
    footer: "79.1% Collected",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    icon: "card",
    sparkColor: "#3b82f6",
    sparkline: [20, 22, 25, 23, 28, 26, 30, 28, 32, 30, 35, 33],
  },
  {
    title: "Total Outstanding",
    value: "₹ 26,05,000",
    footer: "20.9% Outstanding",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    icon: "hourglass",
    sparkColor: "#f97316",
    sparkline: [8, 10, 9, 12, 11, 14, 13, 15, 14, 16, 15, 18],
  },
  {
    title: "Overdue Amount",
    value: "₹ 4,75,000",
    footer: "From 58 Students",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    icon: "overdue",
    sparkColor: "#ec4899",
    sparkline: [5, 7, 6, 8, 7, 10, 9, 12, 11, 13, 12, 15],
  },
];

export const FOOTER_CARDS: FooterCard[] = [
  {
    title: "Total Installments",
    value: "1,386",
    footer: "All Students",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    icon: "calendar",
  },
  {
    title: "Paid Installments",
    value: "1,095",
    footer: "79.1%",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    icon: "calendar-check",
  },
  {
    title: "Pending Installments",
    value: "291",
    footer: "20.9%",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    icon: "pending",
  },
  {
    title: "Overdue Installments",
    value: "128",
    footer: "9.2%",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    icon: "overdue-calendar",
  },
  {
    title: "Discount Given",
    value: "₹ 6,75,000",
    footer: "This Year",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    icon: "tag",
  },
  {
    title: "Concessions Given",
    value: "₹ 3,15,000",
    footer: "This Year",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    icon: "gift",
  },
];

export const FEE_COLLECTION_SEGMENTS = [
  { label: "Collected", value: 79.1, color: "#10b981" },
  { label: "Outstanding", value: 20.9, color: "#f97316" },
  { label: "Overdue", value: 3.8, color: "#ef4444" },
];

export const FEE_DUE_SEGMENTS = [
  { label: "Current Due", value: 76.1, color: "#f97316" },
  { label: "Overdue (1-30 days)", value: 16.3, color: "#f59e0b" },
  { label: "Overdue (31-60 days)", value: 4.6, color: "#84cc16" },
  { label: "Overdue (60+ days)", value: 3.0, color: "#ef4444" },
];

export const COLLECTION_TREND_MONTHLY = {
  expected: [20, 25, 30, 45, 55, 60, 75, 80, 85, 100, 105, 110],
  collected: [5, 10, 15, 25, 35, 45, 55, 60, 65, 80, 90, 98],
};

export const ACADEMIC_YEAR_OPTIONS = ["2024-25", "2025-26"];
export const CLASS_GRADE_OPTIONS = [
  "All Classes",
  "VIII - A",
  "VI - B",
  "IX - A",
  "VIII - B",
  "IX - B",
  "VI - A",
  "V - B",
  "VIII - C",
];
export const FEE_TYPE_OPTIONS = ["All Fee Types", "Tuition Fee", "Transport Fee", "Admission Fee", "Exam Fee", "Other Fees"];
export const INSTALLMENT_OPTIONS = ["All Installments", "Installment 1", "Installment 2", "Installment 3", "Full Payment"];
export const STATUS_OPTIONS = ["All Status", "Paid", "Partial", "Overdue", "Pending"];
export const FEE_COLLECTION_PERIOD_OPTIONS = ["This Month", "This Quarter", "This Year"];
export const TREND_PERIOD_OPTIONS = ["Monthly", "Quarterly", "Yearly"];
export const FEE_DUE_PERIOD_OPTIONS = ["This Month", "This Quarter", "This Year"];
export const FEE_TYPE_PERIOD_OPTIONS = ["This Month", "This Quarter", "This Year"];
