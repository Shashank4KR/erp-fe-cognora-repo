export type ParentStudentCreate = {
  parent_id: string;
  student_id: string;
  relationship: string;
};

export type ParentStudentResponse = {
  id: string;
  parent_id: string;
  student_id: string;
  relationship: string;
  created_at?: string;
  updated_at?: string;
};
