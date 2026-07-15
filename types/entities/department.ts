export type DepartmentCreate = {
  department_name: string;
  description?: string | null;
};

export type DepartmentResponse = {
  id: string;
  department_name: string;
  description?: string | null;
};
