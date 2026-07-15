export type ParentStudentCreate = {
  parent_id: string;
  student_id: string;
  relationship?: string | null;
};

export type ParentStudentResponse = {
  id: string;
  parent_id: string;
  student_id: string;
  relationship?: string | null;
};
