export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE";

export type AttendanceCreate = {
  student_id: string;
  class_id: string;
  subject_id: string;
  teacher_id: string;
  attendance_date: string;
  period_no: number;
  status: AttendanceStatus;
  marked_by: string;
};

export type AttendanceUpdate = {
  status: AttendanceStatus;
};

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

export type BulkAttendanceRecord = {
  student_id: string;
  status: AttendanceStatus;
};

export type BulkAttendanceCreate = {
  class_id: string;
  subject_id: string;
  teacher_id: string;
  attendance_date: string;
  period_no: number;
  marked_by: string;
  records: BulkAttendanceRecord[];
};

export type ClassAttendanceSummary = {
  class_id: string;
  total_students: number;
  present: number;
  absent: number;
  late: number;
};

export type StudentAttendanceSummary = {
  student_id: string;
  total_classes: number;
  present: number;
  absent: number;
  late: number;
  attendance_percentage: number;
};

export type StudentAttendanceReport = {
  student_id: string;
  records: AttendanceResponse[];
};

export type TeacherAttendanceSummary = {
  total_records: number;
  present: number;
  absent: number;
  late: number;
  teacher_id: string;
};

export type SubjectAttendanceSummary = {
  total_records: number;
  present: number;
  absent: number;
  late: number;
  subject_id: string;
};
