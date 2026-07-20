/**
 * This data exists only for the approved Finance Overview UI implementation.
 * Replace it with backend API data during the later integration phase.
 */

export interface FinanceTransaction {
  id: string;
  receiptRefNo: string;
  date: string;
  studentName: string;
  classGrade: string;
  feeType: string;
  amount: number;
  paymentMode: string;
  status: "Paid" | "Pending" | "Failed" | "Refunded";
}

export interface SummaryCard {
  title: string;
  value: string;
  footer: string;
  iconBg: string;
  iconColor: string;
  sparkline: number[];
  sparkColor: string;
  icon: "wallet" | "rupee" | "invoice" | "chart" | "coins";
}

export interface BalanceCard {
  title: string;
  value: string;
  footer: string;
  iconBg: string;
  iconColor: string;
  icon: "bank" | "cash" | "asset" | "liability" | "net";
}

export interface QuickAction {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const SUMMARY_CARDS: SummaryCard[] = [
  {
    title: "Total Fee Expected",
    value: "₹ 1,24,80,000",
    footer: "This Academic Year",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    sparkline: [18, 22, 19, 25, 23, 28, 26, 30, 27, 32, 29, 35],
    sparkColor: "#7c3aed",
    icon: "wallet",
  },
  {
    title: "Total Fee Collected",
    value: "₹ 98,75,000",
    footer: "This Academic Year",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    sparkline: [15, 18, 16, 22, 20, 24, 21, 26, 23, 28, 25, 30],
    sparkColor: "#10b981",
    icon: "rupee",
  },
  {
    title: "Total Outstanding",
    value: "₹ 26,05,000",
    footer: "This Academic Year",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    sparkline: [8, 10, 9, 12, 11, 14, 13, 15, 14, 16, 15, 18],
    sparkColor: "#f97316",
    icon: "invoice",
  },
  {
    title: "Total Expenses",
    value: "₹ 35,40,000",
    footer: "This Academic Year",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    sparkline: [5, 7, 6, 9, 8, 11, 10, 13, 12, 15, 14, 17],
    sparkColor: "#ec4899",
    icon: "chart",
  },
  {
    title: "Total Income",
    value: "₹ 1,34,15,000",
    footer: "This Academic Year",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    sparkline: [20, 25, 22, 30, 27, 35, 32, 40, 37, 45, 42, 50],
    sparkColor: "#3b82f6",
    icon: "coins",
  },
];

export const BALANCE_CARDS: BalanceCard[] = [
  {
    title: "Total Bank Balance",
    value: "₹ 48,75,000",
    footer: "All Accounts",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    icon: "bank",
  },
  {
    title: "Cash in Hand",
    value: "₹ 2,45,000",
    footer: "All Cash Accounts",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    icon: "cash",
  },
  {
    title: "Total Assets",
    value: "₹ 1,85,60,000",
    footer: "School Assets",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    icon: "asset",
  },
  {
    title: "Total Liabilities",
    value: "₹ 12,30,000",
    footer: "Outstanding Payables",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    icon: "liability",
  },
  {
    title: "Net Balance",
    value: "₹ 1,73,30,000",
    footer: "Assets - Liabilities",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    icon: "net",
  },
];

export const FINANCE_TRANSACTIONS: FinanceTransaction[] = [
  {
    id: "1",
    receiptRefNo: "RCPT0001",
    date: "12 May 2025",
    studentName: "Aarav Sharma",
    classGrade: "VIII - A",
    feeType: "Tuition Fee",
    amount: 15000,
    paymentMode: "Online",
    status: "Paid",
  },
  {
    id: "2",
    receiptRefNo: "RCPT0002",
    date: "12 May 2025",
    studentName: "Diya Patel",
    classGrade: "VI - B",
    feeType: "Transport Fee",
    amount: 6000,
    paymentMode: "UPI",
    status: "Paid",
  },
  {
    id: "3",
    receiptRefNo: "RCPT0003",
    date: "11 May 2025",
    studentName: "Vihaan Kumar",
    classGrade: "IX - A",
    feeType: "Tuition Fee",
    amount: 15000,
    paymentMode: "Net Banking",
    status: "Paid",
  },
  {
    id: "4",
    receiptRefNo: "RCPT0004",
    date: "11 May 2025",
    studentName: "Rohan Verma",
    classGrade: "VII - C",
    feeType: "Exam Fee",
    amount: 2500,
    paymentMode: "Cash",
    status: "Paid",
  },
  {
    id: "5",
    receiptRefNo: "RCPT0005",
    date: "10 May 2025",
    studentName: "Ishita Gupta",
    classGrade: "VIII - B",
    feeType: "Tuition Fee",
    amount: 15000,
    paymentMode: "Online",
    status: "Pending",
  },
  {
    id: "6",
    receiptRefNo: "RCPT0006",
    date: "10 May 2025",
    studentName: "Arjun Mehta",
    classGrade: "IX - B",
    feeType: "Transport Fee",
    amount: 6000,
    paymentMode: "UPI",
    status: "Pending",
  },
  {
    id: "7",
    receiptRefNo: "RCPT0007",
    date: "09 May 2025",
    studentName: "Myra Iyer",
    classGrade: "VI - A",
    feeType: "Admission Fee",
    amount: 8000,
    paymentMode: "Net Banking",
    status: "Paid",
  },
  {
    id: "8",
    receiptRefNo: "RCPT0008",
    date: "09 May 2025",
    studentName: "Aditya Raj",
    classGrade: "V - B",
    feeType: "Tuition Fee",
    amount: 12000,
    paymentMode: "Cash",
    status: "Paid",
  },
];

export const OUTSTANDING_SUMMARY = {
  totalStudents: 462,
  studentsWithOutstanding: 154,
  outstandingPercentage: "33.3%",
  totalOutstandingAmount: "₹ 26,05,000",
};

export const QUICK_ACTIONS: QuickAction[] = [
  { label: "Collect Fee", icon: "Wallet", color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { label: "Add Income", icon: "Coins", color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Add Expense", icon: "Receipt", color: "text-orange-600", bgColor: "bg-orange-50" },
  { label: "Fee Discount", icon: "Percent", color: "text-[#7c3aed]", bgColor: "bg-purple-50" },
  { label: "Generate Invoice", icon: "FileText", color: "text-pink-600", bgColor: "bg-pink-50" },
  { label: "Salary Payment", icon: "Wallet", color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { label: "Financial Report", icon: "BarChart3", color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Account Summary", icon: "PiggyBank", color: "text-[#7c3aed]", bgColor: "bg-purple-50" },
];

export const FEE_COLLECTION_SEGMENTS = [
  { label: "Collected", value: 79.1, color: "#10b981" },
  { label: "Outstanding", value: 20.9, color: "#f97316" },
  { label: "Waived Off", value: 0, color: "#94a3b8" },
];

export const FEE_TYPE_SEGMENTS = [
  { label: "Tuition Fee", value: 71.1, color: "#6366f1" },
  { label: "Transport Fee", value: 12.6, color: "#f97316" },
  { label: "Admission Fee", value: 8.4, color: "#10b981" },
  { label: "Exam Fee", value: 5.5, color: "#f97316" },
  { label: "Other Fees", value: 2.4, color: "#14b8a6" },
];

export const INCOME_EXPENSE_DATA = {
  monthly: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    income: [25, 30, 28, 35, 32, 40, 38, 45, 42, 50, 47, 55],
    expenses: [20, 25, 23, 30, 27, 35, 32, 38, 35, 42, 39, 45],
  },
  quarterly: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    income: [83, 107, 120, 142],
    expenses: [68, 92, 105, 126],
  },
  yearly: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    income: [280, 320, 350, 380, 452],
    expenses: [220, 260, 290, 310, 391],
  },
};

export const ACADEMIC_YEAR_OPTIONS = ["2024-25", "2025-26"];
export const CLASS_GRADE_OPTIONS = [
  "All Classes",
  "VIII - A",
  "VI - B",
  "IX - A",
  "VII - C",
  "VIII - B",
  "IX - B",
  "VI - A",
  "V - B",
];
export const FEE_TYPE_OPTIONS = ["All Fee Types", "Tuition Fee", "Transport Fee", "Admission Fee", "Exam Fee", "Other Fees"];
export const PAYMENT_STATUS_OPTIONS = ["All Status", "Paid", "Pending", "Failed", "Refunded"];
export const FEE_COLLECTION_PERIOD_OPTIONS = ["This Month", "This Quarter", "This Year"];
export const INCOME_EXPENSE_PERIOD_OPTIONS = ["Monthly", "Quarterly", "Yearly"];
export const FEE_TYPE_PERIOD_OPTIONS = ["This Month", "This Quarter", "This Year"];
