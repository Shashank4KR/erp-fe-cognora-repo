/**
 * This data exists only for the approved Salary Management UI implementation.
 * Replace it with backend API data during the later integration phase.
 */

export interface SalaryRow {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  designation: string;
  basicSalary: number;
  netSalary: number;
  status: "Paid" | "Partial" | "Pending";
  employeeType: "Teaching Staff" | "Non-Teaching Staff";
}

export interface SalarySummaryCard {
  title: string;
  value: string;
  footer: string;
  iconBg: string;
  iconColor: string;
  sparkline: number[];
  sparkColor: string;
  icon: "users" | "wallet" | "card" | "clock" | "percent" | "chart";
}

export interface SalaryComponent {
  component: string;
  amount: string;
  percentage: string;
}

export interface QuickAction {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface PayrollTrendDatum {
  month: string;
  payroll: number;
  netPayout: number;
}

export interface TopDepartment {
  label: string;
  amount: string;
  percentage: number;
  color: string;
  iconBg: string;
  iconColor: string;
}

export interface RecentActivityItem {
  icon: "check" | "document" | "structure";
  text: string;
  secondary: string;
  date: string;
  iconBg: string;
  iconColor: string;
}

export interface MonthlySummaryCard {
  title: string;
  value: string;
  footer: string;
  iconBg: string;
  iconColor: string;
  icon: "wallet" | "deduct" | "clock" | "card";
}

export const SALARY_ROWS: SalaryRow[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "Dr. Rajesh Kumar",
    department: "Computer Science",
    designation: "Professor",
    basicSalary: 120000,
    netSalary: 102500,
    status: "Paid",
    employeeType: "Teaching Staff",
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Prof. Anjali Verma",
    department: "Electronics",
    designation: "Associate Professor",
    basicSalary: 95000,
    netSalary: 81250,
    status: "Paid",
    employeeType: "Teaching Staff",
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Mr. Sandeep Rao",
    department: "Mechanical",
    designation: "Assistant Professor",
    basicSalary: 65000,
    netSalary: 56380,
    status: "Paid",
    employeeType: "Teaching Staff",
  },
  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "Ms. Priya Sharma",
    department: "Information Tech.",
    designation: "Assistant Professor",
    basicSalary: 62000,
    netSalary: 53760,
    status: "Paid",
    employeeType: "Teaching Staff",
  },
  {
    id: "5",
    employeeId: "EMP005",
    employeeName: "Mr. Arvind Patel",
    department: "Administration",
    designation: "Office Manager",
    basicSalary: 55000,
    netSalary: 47850,
    status: "Paid",
    employeeType: "Non-Teaching Staff",
  },
  {
    id: "6",
    employeeId: "EMP006",
    employeeName: "Ms. Neha Gupta",
    department: "Accounts",
    designation: "Accountant",
    basicSalary: 45000,
    netSalary: 39150,
    status: "Paid",
    employeeType: "Non-Teaching Staff",
  },
  {
    id: "7",
    employeeId: "EMP007",
    employeeName: "Mr. Ramesh Singh",
    department: "Library",
    designation: "Librarian",
    basicSalary: 40000,
    netSalary: 34800,
    status: "Partial",
    employeeType: "Non-Teaching Staff",
  },
  {
    id: "8",
    employeeId: "EMP008",
    employeeName: "Mr. Mahesh Yadav",
    department: "Maintenance",
    designation: "Technician",
    basicSalary: 28000,
    netSalary: 24360,
    status: "Pending",
    employeeType: "Non-Teaching Staff",
  },
];

export const SALARY_SUMMARY_CARDS: SalarySummaryCard[] = [
  {
    title: "Total Employees",
    value: "128",
    footer: "Active Employees",
    iconBg: "bg-purple-50",
    iconColor: "text-[#7c3aed]",
    sparkline: [12, 18, 15, 22, 19, 25, 21, 28],
    sparkColor: "#7c3aed",
    icon: "users",
  },
  {
    title: "Total Payroll (This Month)",
    value: "₹ 28,75,000",
    footer: "May 2025",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    sparkline: [20, 25, 22, 30, 27, 35, 32, 38],
    sparkColor: "#10b981",
    icon: "wallet",
  },
  {
    title: "Paid Amount (This Month)",
    value: "₹ 24,60,000",
    footer: "85.7% of Payroll",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    sparkline: [15, 18, 16, 22, 20, 24, 21, 26],
    sparkColor: "#3b82f6",
    icon: "card",
  },
  {
    title: "Pending Amount (This Month)",
    value: "₹ 4,15,000",
    footer: "14.3% of Payroll",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    sparkline: [8, 10, 9, 12, 11, 14, 13, 15],
    sparkColor: "#f97316",
    icon: "clock",
  },
  {
    title: "Total Deductions (This Month)",
    value: "₹ 2,85,000",
    footer: "9.9% of Payroll",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    sparkline: [5, 7, 6, 9, 8, 11, 10, 13],
    sparkColor: "#ec4899",
    icon: "percent",
  },
  {
    title: "Average Salary",
    value: "₹ 22,46,875",
    footer: "Per Employee",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    sparkline: [20, 25, 22, 30, 27, 35, 32, 40],
    sparkColor: "#10b981",
    icon: "chart",
  },
];

export const PAYROLL_SUMMARY_DATA = {
  totalPayroll: "₹ 28,75,000",
  paidAmount: "₹ 24,60,000",
  paidPercentage: "85.7%",
  pendingAmount: "₹ 4,15,000",
  pendingPercentage: "14.3%",
  totalDeductions: "₹ 2,85,000",
  deductionsPercentage: "9.9%",
  netPayout: "₹ 25,90,000",
  netPayoutPercentage: "90.1%",
  employeesPaid: "109 / 128",
  pendingPayments: "19 / 128",
};

export const SALARY_COMPONENTS: SalaryComponent[] = [
  { component: "Basic Salary", amount: "₹ 18,40,000", percentage: "64.0%" },
  { component: "Allowances", amount: "₹ 7,20,000", percentage: "25.0%" },
  { component: "Deductions", amount: "₹ 2,85,000", percentage: "9.9%" },
  { component: "Net Payout", amount: "₹ 25,90,000", percentage: "90.1%" },
];

export const QUICK_ACTIONS: QuickAction[] = [
  { label: "Add Salary", icon: "UserPlus", color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { label: "Process Payroll", icon: "Wallet", color: "text-[#7c3aed]", bgColor: "bg-purple-50" },
  { label: "Salary Structure", icon: "Building2", color: "text-orange-600", bgColor: "bg-orange-50" },
  { label: "Generate Payslip", icon: "FileText", color: "text-pink-600", bgColor: "bg-pink-50" },
  { label: "Salary Report", icon: "BarChart3", color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Tax Settings", icon: "Settings", color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Allowances", icon: "CircleDollarSign", color: "text-orange-600", bgColor: "bg-orange-50" },
  { label: "Deductions", icon: "MinusCircle", color: "text-pink-600", bgColor: "bg-pink-50" },
];

export const PAYROLL_TREND_DATA: PayrollTrendDatum[] = [
  { month: "Dec 2024", payroll: 28, netPayout: 25 },
  { month: "Jan 2025", payroll: 30, netPayout: 27 },
  { month: "Feb 2025", payroll: 27, netPayout: 24 },
  { month: "Mar 2025", payroll: 32, netPayout: 29 },
  { month: "Apr 2025", payroll: 29, netPayout: 26 },
  { month: "May 2025", payroll: 35, netPayout: 31 },
];

export const TOP_DEPARTMENTS_DATA: TopDepartment[] = [
  { label: "Computer Science", amount: "₹ 8,75,000", percentage: 30.4, color: "#7c3aed", iconBg: "bg-purple-50", iconColor: "text-[#7c3aed]" },
  { label: "Electronics", amount: "₹ 5,40,000", percentage: 18.8, color: "#10b981", iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
  { label: "Mechanical", amount: "₹ 4,25,000", percentage: 14.8, color: "#f97316", iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  { label: "Information Tech.", amount: "₹ 3,75,000", percentage: 13.0, color: "#6366f1", iconBg: "bg-indigo-50", iconColor: "text-indigo-500" },
  { label: "Administration", amount: "₹ 2,60,000", percentage: 9.0, color: "#ec4899", iconBg: "bg-pink-50", iconColor: "text-pink-500" },
  { label: "Others", amount: "₹ 3,00,000", percentage: 10.4, color: "#6366f1", iconBg: "bg-indigo-50", iconColor: "text-indigo-500" },
];

export const RECENT_ACTIVITIES: RecentActivityItem[] = [
  {
    icon: "check",
    text: "May 2025 payroll processed successfully",
    secondary: "Processed by John Admin",
    date: "18 May 2025, 10:30 AM",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: "document",
    text: "Payslips generated for 109 employees",
    secondary: "Generated by John Admin",
    date: "17 May 2025, 04:15 PM",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: "structure",
    text: "Salary structure updated for Teaching Staff",
    secondary: "Updated by John Admin",
    date: "16 May 2025, 11:20 AM",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

export const MONTHLY_SUMMARY_CARDS: MonthlySummaryCard[] = [
  {
    title: "Total Allowances (May 2025)",
    value: "₹ 7,20,000",
    footer: "↑ 5.2% From Apr 2025",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    icon: "wallet",
  },
  {
    title: "Total Deductions (May 2025)",
    value: "₹ 2,85,000",
    footer: "↑ 3.1% From Apr 2025",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    icon: "deduct",
  },
  {
    title: "Total Overtime (May 2025)",
    value: "₹ 1,25,000",
    footer: "↑ 8.7% From Apr 2025",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    icon: "clock",
  },
  {
    title: "Total Reimbursements (May 2025)",
    value: "₹ 75,000",
    footer: "↑ 2.4% From Apr 2025",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    icon: "card",
  },
];

export const MONTH_OPTIONS = ["May 2025", "April 2025", "March 2025", "February 2025", "January 2025"];
export const DEPARTMENT_OPTIONS = [
  "All Departments",
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Information Tech.",
  "Administration",
  "Accounts",
  "Library",
  "Maintenance",
];
export const EMPLOYEE_TYPE_OPTIONS = ["All Types", "Teaching Staff", "Non-Teaching Staff"];
export const DESIGNATION_OPTIONS = [
  "All Designations",
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Office Manager",
  "Accountant",
  "Librarian",
  "Technician",
];
export const PAYMENT_STATUS_OPTIONS = ["All Status", "Paid", "Partial", "Pending"];
export const PAYROLL_PERIOD_OPTIONS = ["This Month", "Last Month", "This Quarter", "This Year"];
export const TREND_PERIOD_OPTIONS = ["Last 3 Months", "Last 6 Months", "This Year"];
export const TOP_DEPARTMENTS_PERIOD_OPTIONS = ["This Month", "Last Month", "This Quarter", "This Year"];

export const ADD_SALARY_DROPDOWN_OPTIONS = ["Add Salary", "Process Payroll", "Add Allowance", "Add Deduction"];
export const THREE_DOT_OPTIONS = ["Export Payroll View", "Print Salary Register", "Payroll Settings"];
