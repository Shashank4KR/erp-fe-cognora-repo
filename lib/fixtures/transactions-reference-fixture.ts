/**
 * This data exists only for the approved Transactions UI implementation.
 * Replace it with backend API data during the later integration phase.
 */

export interface TransactionRow {
  id: string;
  receiptRefNo: string;
  date: string;
  studentName: string;
  classGrade: string;
  type: "Income" | "Expense";
  category: string;
  paymentMode: string;
  amount: number;
  status: "Success" | "Pending" | "Failed";
}

export interface SummaryCard {
  title: string;
  value: string;
  footer: string;
  iconBg: string;
  iconColor: string;
  sparkline: number[];
  sparkColor: string;
  icon: "transactions" | "income" | "expense" | "balance";
}

export interface PaymentModeRow {
  label: string;
  amount: string;
  percentage: number;
}

export interface QuickAction {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface RecentActivityItem {
  type: "Income" | "Expense";
  text: string;
  secondary: string;
  amount: string;
  date: string;
}

export const TRANSACTIONS: TransactionRow[] = [
  {
    id: "1",
    receiptRefNo: "RCP10001",
    date: "18 May 2025",
    studentName: "Aarav Sharma",
    classGrade: "VIII - A",
    type: "Income",
    category: "Tuition Fee",
    paymentMode: "Online",
    amount: 15000,
    status: "Success",
  },
  {
    id: "2",
    receiptRefNo: "RCP10002",
    date: "18 May 2025",
    studentName: "Diya Patel",
    classGrade: "VI - B",
    type: "Income",
    category: "Transport Fee",
    paymentMode: "UPI",
    amount: 6000,
    status: "Success",
  },
  {
    id: "3",
    receiptRefNo: "RCP10003",
    date: "17 May 2025",
    studentName: "Vihaan Kumar",
    classGrade: "IX - A",
    type: "Income",
    category: "Tuition Fee",
    paymentMode: "Net Banking",
    amount: 15000,
    status: "Success",
  },
  {
    id: "4",
    receiptRefNo: "EXP20001",
    date: "17 May 2025",
    studentName: "Staff Salary - April 2025",
    classGrade: "",
    type: "Expense",
    category: "Salary",
    paymentMode: "Bank Transfer",
    amount: 4500000,
    status: "Success",
  },
  {
    id: "5",
    receiptRefNo: "RCP10004",
    date: "16 May 2025",
    studentName: "Ishita Gupta",
    classGrade: "VIII - B",
    type: "Income",
    category: "Exam Fee",
    paymentMode: "Cash",
    amount: 2500,
    status: "Success",
  },
  {
    id: "6",
    receiptRefNo: "EXP20002",
    date: "16 May 2025",
    studentName: "Lab Equipment Purchase",
    classGrade: "",
    type: "Expense",
    category: "Purchase",
    paymentMode: "Net Banking",
    amount: 125000,
    status: "Success",
  },
  {
    id: "7",
    receiptRefNo: "RCP10005",
    date: "15 May 2025",
    studentName: "Arjun Mehta",
    classGrade: "IX - B",
    type: "Income",
    category: "Tuition Fee",
    paymentMode: "UPI",
    amount: 15000,
    status: "Success",
  },
  {
    id: "8",
    receiptRefNo: "RCP10006",
    date: "15 May 2025",
    studentName: "Myra Iyer",
    classGrade: "VI - A",
    type: "Income",
    category: "Admission Fee",
    paymentMode: "Net Banking",
    amount: 8000,
    status: "Success",
  },
  {
    id: "9",
    receiptRefNo: "EXP20003",
    date: "14 May 2025",
    studentName: "Electricity Bill - April 2025",
    classGrade: "",
    type: "Expense",
    category: "Utilities",
    paymentMode: "Bank Transfer",
    amount: 12500,
    status: "Success",
  },
  {
    id: "10",
    receiptRefNo: "RCP10007",
    date: "14 May 2025",
    studentName: "Aditya Raj",
    classGrade: "V - B",
    type: "Income",
    category: "Transport Fee",
    paymentMode: "Cash",
    amount: 6000,
    status: "Success",
  },
];

export const TRANSACTION_SUMMARY_CARDS: SummaryCard[] = [
  {
    title: "Total Transactions",
    value: "2,584",
    footer: "This Academic Year",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    sparkline: [12, 18, 15, 22, 19, 25, 21, 28, 24, 30, 26, 32],
    sparkColor: "#7c3aed",
    icon: "transactions",
  },
  {
    title: "Total Amount In",
    value: "₹ 1,24,80,000",
    footer: "Income ↑ 12.4%",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    sparkline: [20, 25, 22, 30, 27, 35, 32, 40, 37, 45, 42, 50],
    sparkColor: "#10b981",
    icon: "income",
  },
  {
    title: "Total Amount Out",
    value: "₹ 67,45,000",
    footer: "Expenses ↑ 8.6%",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    sparkline: [8, 10, 9, 12, 11, 14, 13, 15, 14, 16, 15, 18],
    sparkColor: "#ec4899",
    icon: "expense",
  },
  {
    title: "Net Balance",
    value: "₹ 57,35,000",
    footer: "This Academic Year",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    sparkline: [15, 18, 16, 22, 20, 25, 23, 28, 26, 30, 28, 33],
    sparkColor: "#3b82f6",
    icon: "balance",
  },
];

export const PAYMENT_MODE_SUMMARY: PaymentModeRow[] = [
  { label: "Online", amount: "₹ 72,45,000", percentage: 37.7 },
  { label: "UPI", amount: "₹ 45,30,000", percentage: 23.6 },
  { label: "Net Banking", amount: "₹ 38,60,000", percentage: 20.1 },
  { label: "Cash", amount: "₹ 18,75,000", percentage: 9.8 },
  { label: "Bank Transfer", amount: "₹ 17,15,000", percentage: 8.8 },
];

export const QUICK_ACTIONS: QuickAction[] = [
  { label: "Add Transaction", icon: "Eye", color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { label: "Fee Collection", icon: "Wallet", color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Generate Invoice", icon: "FileText", color: "text-orange-600", bgColor: "bg-orange-50" },
  { label: "Export Report", icon: "Download", color: "text-[#7c3aed]", bgColor: "bg-purple-50" },
  { label: "Transaction Report", icon: "BarChart3", color: "text-pink-600", bgColor: "bg-pink-50" },
  { label: "Bank Reconciliation", icon: "Landmark", color: "text-emerald-600", bgColor: "bg-emerald-50" },
];

export const TOP_INCOME_CATEGORIES = [
  { label: "Tuition Fee", amount: "₹ 70,20,000", percentage: 56.3 },
  { label: "Transport Fee", amount: "₹ 12,45,000", percentage: 10.0 },
  { label: "Admission Fee", amount: "₹ 8,30,000", percentage: 6.7 },
  { label: "Exam Fee", amount: "₹ 5,40,000", percentage: 4.3 },
  { label: "Other Fees", amount: "₹ 2,40,000", percentage: 1.9 },
];

export const RECENT_ACTIVITY: RecentActivityItem[] = [
  {
    type: "Income",
    text: "Payment received from Aarav Sharma",
    secondary: "Tuition Fee",
    amount: "₹ 15,000",
    date: "18 May 2025 10:08 AM",
  },
  {
    type: "Expense",
    text: "Expense recorded for Staff Salary - April 2025",
    secondary: "Salary",
    amount: "₹ 45,00,000",
    date: "17 May 2025 03:08 PM",
  },
  {
    type: "Income",
    text: "Payment received from Diya Patel",
    secondary: "Transport Fee",
    amount: "₹ 6,000",
    date: "16 May 2025 08:08 AM",
  },
  {
    type: "Expense",
    text: "Expense recorded for Lab Equipment Purchase",
    secondary: "Purchase",
    amount: "₹ 1,25,000",
    date: "16 May 2025 4:18 PM",
  },
];

export const INCOME_EXPENSE_TREND = {
  monthly: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    income: [25, 45, 38, 55, 50, 68, 62, 70, 65, 75, 72, 80],
    expenses: [10, 22, 18, 30, 25, 38, 32, 40, 35, 45, 38, 50],
  },
  quarterly: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    income: [108, 173, 197, 217],
    expenses: [50, 93, 107, 133],
  },
  yearly: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    income: [180, 220, 260, 310, 360],
    expenses: [90, 130, 160, 190, 240],
  },
};

export const TRANSACTION_TYPE_OPTIONS = ["All Types", "Income", "Expense"];
export const PAYMENT_MODE_OPTIONS = ["All Modes", "Online", "UPI", "Net Banking", "Cash", "Bank Transfer"];
export const STATUS_OPTIONS = ["All Status", "Success", "Pending", "Failed"];
export const TREND_PERIOD_OPTIONS = ["Monthly", "Quarterly", "Yearly"];
export const TOP_INCOME_PERIOD_OPTIONS = ["This Month", "This Quarter", "This Year"];
