export type TeacherCreate = {
  user_id: string;
  employee_id: string;
  qualification?: string | null;
  department_id?: string | null;
  join_date?: string | null;
  phone?: string | null;
  address?: string | null;
};

export type TeacherResponse = {
  id: string;
  user_id: string;
  employee_id: string;
  qualification?: string | null;
  department_id?: string | null;
  join_date?: string | null;
  phone?: string | null;
  address?: string | null;
  created_at?: string;
  updated_at?: string;
};
