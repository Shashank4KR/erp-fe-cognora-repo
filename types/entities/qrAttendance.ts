export type QRSessionCreate = {
  class_id: string;
  subject_id: string;
  teacher_id: string;
  start_time: string;
  end_time: string;
};

export type QRSessionResponse = {
  id: string;
  class_id: string;
  subject_id: string;
  teacher_id: string;
  start_time: string;
  end_time: string;
  qr_code_url?: string | null;
};

export type MarkQRAttendancePayload = {
  session_id: string;
  student_id: string;
};

export type QRAttendanceReportResponse = {
  session_id: string;
  total_students: number;
  present_count: number;
  absent_count: number;
};