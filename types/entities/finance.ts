export type FinanceOverviewResponse = {
  total_revenue: number;
  total_expenses: number;
  pending_invoices: number;
  collected_amount: number;
};

export type FeeStructureCreate = {
  name: string;
  class_id?: string | null;
  amount: number;
  due_date: string;
};

export type FeeStructureUpdate = {
  name?: string | null;
  class_id?: string | null;
  amount?: number | null;
  due_date?: string | null;
};

export type FeeStructureResponse = {
  id: string;
  name: string;
  class_id?: string | null;
  amount: number;
  due_date: string;
};

export type InvoiceResponse = {
  id: string;
  student_id: string;
  amount: number;
  status: string;
  due_date: string;
};

export type FinanceExpenseCreate = {
  category: string;
  amount: number;
  description?: string | null;
};

export type FinanceExpenseResponse = {
  id: string;
  category: string;
  amount: number;
  description?: string | null;
};

export type TransactionCreate = {
  type: string;
  amount: number;
  reference_id?: string | null;
  notes?: string | null;
};

export type TransactionResponse = {
  id: string;
  type: string;
  amount: number;
  reference_id?: string | null;
  notes?: string | null;
};

export type SalaryRecordResponse = {
  id: string;
  employee_id: string;
  amount: number;
  month: string;
  status: string;
};