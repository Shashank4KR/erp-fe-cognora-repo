export type ReportCardGenerate = {
  student_id: string;
  exam_id: string;
  remarks?: string | null;
};

export type ReportCardResponse = {
  id: string;
  student_id: string;
  exam_id: string;
  total_marks: number;
  obtained_marks: number;
  percentage: number;
  rank: number | null;
  result: string;
  remarks: string | null;
  created_at: string;
  updated_at: string;
};
