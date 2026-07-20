export type ExamResultCreate = {
  exam_id: string;
  student_id: string;
  subject_id: string;
  marks_obtained: number;
  remarks?: string | null;
};

export type ExamResultUpdate = {
  marks_obtained?: number;
  remarks?: string | null;
};

export type ExamResultResponse = {
  id: string;
  exam_id: string;
  student_id: string;
  subject_id: string;
  marks_obtained: number;
  grade: string | null;
  remarks: string | null;
  created_at: string;
  updated_at: string;
};
