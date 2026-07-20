/**
 * This data exists only for the approved Invoices UI implementation.
 * Replace it with backend API data during the later integration phase.
 */

export interface InvoiceRow {
  id: string;
  invoiceNo: string;
  invoiceDate: string;
  studentName: string;
  studentId: string;
  classGrade: string;
  invoiceType: "Fee Invoice" | "Salary Invoice" | "Expense Invoice" | "Other Invoice";
  dueDate: string;
  amount: number;
  paid: number;
  balance: number;
  status: "Paid" | "Partial" | "Overdue" | "Pending";
}

export interface SummaryCard {
  title: string;
  value: string;
  footer: string;
  iconBg: string;
  iconColor: string;
  sparkline: number[];
  sparkColor: string;
  icon: "invoice" | "amount" | "paid" | "outstanding" | "overdue" | "balance";
}

export interface BalanceFeeRow {
  label: string;
  value: string;
  percentage: number;
  iconBg: string;
  iconColor: string;
  icon: "current" | "overdue1" | "overdue2";
}

export interface InvoiceTypeRow {
  label: string;
  amount: string;
  percentage: number;
  iconBg: string;
  iconColor: string;
  icon: "fee" | "salary" | "expense" | "other";
}

export const INVOICE_ROWS: InvoiceRow[] = [
  {
    id: "1",
    invoiceNo: "INV2025001",
    invoiceDate: "18 May 2025",
    studentName: "Aarav Sharma",
    studentId: "STU001",
    classGrade: "VIII - A",
    invoiceType: "Fee Invoice",
    dueDate: "01 Jun 2025",
    amount: 15000,
    paid: 15000,
    balance: 0,
    status: "Paid",
  },
  {
    id: "2",
    invoiceNo: "INV2025002",
    invoiceDate: "18 May 2025",
    studentName: "Diya Patel",
    studentId: "STU002",
    classGrade: "VI - B",
    invoiceType: "Fee Invoice",
    dueDate: "01 Jun 2025",
    amount: 6000,
    paid: 6000,
    balance: 0,
    status: "Paid",
  },
  {
    id: "3",
    invoiceNo: "INV2025003",
    invoiceDate: "17 May 2025",
    studentName: "Vihaan Kumar",
    studentId: "STU003",
    classGrade: "IX - A",
    invoiceType: "Fee Invoice",
    dueDate: "31 May 2025",
    amount: 15000,
    paid: 10000,
    balance: 5000,
    status: "Partial",
  },
  {
    id: "4",
    invoiceNo: "INV2025004",
    invoiceDate: "17 May 2025",
    studentName: "Ishita Gupta",
    studentId: "STU004",
    classGrade: "VIII - B",
    invoiceType: "Fee Invoice",
    dueDate: "31 May 2025",
    amount: 25000,
    paid: 10000,
    balance: 15000,
    status: "Partial",
  },
  {
    id: "5",
    invoiceNo: "INV2025005",
    invoiceDate: "16 May 2025",
    studentName: "Arjun Mehta",
    studentId: "STU005",
    classGrade: "IX - B",
    invoiceType: "Fee Invoice",
    dueDate: "30 May 2025",
    amount: 28000,
    paid: 0,
    balance: 28000,
    status: "Overdue",
  },
  {
    id: "6",
    invoiceNo: "INV2025006",
    invoiceDate: "16 May 2025",
    studentName: "Myra Iyer",
    studentId: "STU006",
    classGrade: "VI - A",
    invoiceType: "Fee Invoice",
    dueDate: "30 May 2025",
    amount: 18000,
    paid: 8000,
    balance: 10000,
    status: "Partial",
  },
  {
    id: "7",
    invoiceNo: "INV2025007",
    invoiceDate: "15 May 2025",
    studentName: "Aditya Raj",
    studentId: "STU007",
    classGrade: "V - B",
    invoiceType: "Fee Invoice",
    dueDate: "29 May 2025",
    amount: 8000,
    paid: 0,
    balance: 8000,
    status: "Overdue",
  },
  {
    id: "8",
    invoiceNo: "INV2025008",
    invoiceDate: "15 May 2025",
    studentName: "Rohan Verma",
    studentId: "STU008",
    classGrade: "VIII - C",
    invoiceType: "Fee Invoice",
    dueDate: "29 May 2025",
    amount: 12000,
    paid: 6000,
    balance: 6000,
    status: "Partial",
  },
  {
    id: "9",
    invoiceNo: "INV2025009",
    invoiceDate: "14 May 2025",
    studentName: "Staff Salary - Apr 2025",
    studentId: "EMP023",
    classGrade: "-",
    invoiceType: "Salary Invoice",
    dueDate: "28 May 2025",
    amount: 4500000,
    paid: 4500000,
    balance: 0,
    status: "Paid",
  },
  {
    id: "10",
    invoiceNo: "INV2025010",
    invoiceDate: "14 May 2025",
    studentName: "Lab Equipment Purchase",
    studentId: "EXP014",
    classGrade: "-",
    invoiceType: "Expense Invoice",
    dueDate: "28 May 2025",
    amount: 125000,
    paid: 100000,
    balance: 25000,
    status: "Partial",
  },
];

export const INVOICE_SUMMARY_CARDS: SummaryCard[] = [
  {
    title: "Total Invoices",
    value: "1,248",
    footer: "This Academic Year",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    sparkline: [18, 22, 19, 25, 23, 28, 26, 30, 27, 32, 29, 35],
    sparkColor: "#7c3aed",
    icon: "invoice",
  },
  {
    title: "Total Invoiced Amount",
    value: "₹ 1,24,80,000",
    footer: "This Academic Year",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    sparkline: [20, 25, 22, 30, 27, 35, 32, 40, 37, 45, 42, 50],
    sparkColor: "#10b981",
    icon: "amount",
  },
  {
    title: "Paid Invoices",
    value: "892",
    footer: "71.5% of Total",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    sparkline: [15, 18, 16, 22, 20, 24, 21, 26, 23, 28, 25, 30],
    sparkColor: "#3b82f6",
    icon: "paid",
  },
  {
    title: "Outstanding Invoices",
    value: "356",
    footer: "28.5% of Total",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    sparkline: [8, 10, 9, 12, 11, 14, 13, 15, 14, 16, 15, 18],
    sparkColor: "#f97316",
    icon: "outstanding",
  },
  {
    title: "Overdue Invoices",
    value: "98",
    footer: "From 82 Students",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    sparkline: [5, 7, 6, 9, 8, 11, 10, 13, 12, 15, 14, 17],
    sparkColor: "#ec4899",
    icon: "overdue",
  },
  {
    title: "Balance Fees (All)",
    value: "₹ 35,55,000",
    footer: "From 126 Students",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    sparkline: [15, 18, 16, 22, 20, 24, 21, 26, 23, 28, 25, 30],
    sparkColor: "#10b981",
    icon: "balance",
  },
];

export const BALANCE_FEE_ROWS: BalanceFeeRow[] = [
  {
    label: "Current (0-30 Days)",
    value: "₹ 15,20,000",
    percentage: 42.7,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    icon: "current",
  },
  {
    label: "Overdue (31-60 Days)",
    value: "₹ 10,10,000",
    percentage: 28.4,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    icon: "overdue1",
  },
  {
    label: "Overdue (60+ Days)",
    value: "₹ 10,25,000",
    percentage: 28.9,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    icon: "overdue2",
  },
];

export const INVOICE_TYPE_ROWS: InvoiceTypeRow[] = [
  {
    label: "Fee Invoice",
    amount: "₹ 98,75,000",
    percentage: 79.1,
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    icon: "fee",
  },
  {
    label: "Salary Invoice",
    amount: "₹ 15,60,000",
    percentage: 12.5,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    icon: "salary",
  },
  {
    label: "Expense Invoice",
    amount: "₹ 7,25,000",
    percentage: 5.8,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    icon: "expense",
  },
  {
    label: "Other Invoice",
    amount: "₹ 1,20,000",
    percentage: 2.6,
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    icon: "other",
  },
];

export const INVOICE_TREND_DATA = {
  monthly: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    invoiced: [18, 30, 42, 40, 52, 48, 62, 55, 68, 60, 52, 60],
    paid: [8, 14, 16, 10, 22, 18, 28, 24, 30, 22, 20, 30],
  },
  quarterly: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    invoiced: [90, 140, 175, 172],
    paid: [38, 52, 82, 72],
  },
  yearly: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    invoiced: [280, 340, 390, 450, 520],
    paid: [120, 160, 200, 240, 280],
  },
};

export const INVOICE_STATUS_DATA = {
  paid: 892,
  partial: 258,
  overdue: 98,
  total: 1248,
};

export const ACADEMIC_YEAR_OPTIONS = ["2024-25", "2025-26"];
export const INVOICE_TYPE_OPTIONS = ["All Types", "Fee Invoice", "Salary Invoice", "Expense Invoice", "Other Invoice"];
export const CLASS_GRADE_OPTIONS = ["All Classes", "VIII - A", "VI - B", "IX - A", "VIII - B", "IX - B", "VI - A", "V - B", "VIII - C"];
export const STATUS_OPTIONS = ["All Status", "Paid", "Partial", "Overdue", "Pending"];
export const INVOICE_TREND_PERIOD_OPTIONS = ["Monthly", "Quarterly", "Yearly"];
export const TOP_INVOICE_PERIOD_OPTIONS = ["This Month", "This Quarter", "This Academic Year"];
export const BALANCE_FEES_PERIOD_OPTIONS = ["This Month", "This Quarter", "This Academic Year"];
