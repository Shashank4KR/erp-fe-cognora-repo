export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE";

export type AttendanceResponse = {
  id: string;
  student_id: string;
  class_id: string;
  subject_id: string;
  teacher_id: string;
  attendance_date: string;
  period_no: number;
  status: AttendanceStatus;
  marked_by: string;
  created_at: string;
  updated_at: string;
};

export type ClassAttendanceSummary = {
  class_id: string;
  total_students: number;
  present: number;
  absent: number;
  late: number;
};

export type SubjectAttendanceSummary = {
  total_records: number;
  present: number;
  absent: number;
  late: number;
  subject_id: string;
};

export type StudentAttendanceSummary = {
  student_id: string;
  total_classes: number;
  present: number;
  absent: number;
  late: number;
  attendance_percentage: number;
};

export type TeacherAttendanceSummary = {
  total_records: number;
  present: number;
  absent: number;
  late: number;
  teacher_id: string;
};
