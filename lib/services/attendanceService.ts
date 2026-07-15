import type {
  AttendanceResponse,
  ClassAttendanceSummary,
  SubjectAttendanceSummary,
} from "@/types/entities/attendance";

const BASE = "/api/attendance";

export async function listAttendanceByClass(
  token: string,
  classId: string,
): Promise<AttendanceResponse[]> {
  const response = await fetch(`${BASE}/class/${classId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch attendance records.");
  }

  return (await response.json()) as AttendanceResponse[];
}

export async function getClassAttendanceSummary(
  token: string,
  classId: string,
): Promise<ClassAttendanceSummary> {
  const response = await fetch(`${BASE}/class/${classId}/summary`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch class attendance summary.");
  }

  return (await response.json()) as ClassAttendanceSummary;
}

export async function listAttendanceByDate(
  token: string,
  attendanceDate: string,
): Promise<AttendanceResponse[]> {
  const response = await fetch(`${BASE}/date/${attendanceDate}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch attendance records by date.");
  }

  return (await response.json()) as AttendanceResponse[];
}

export async function getSubjectAttendanceSummary(
  token: string,
  subjectId: string,
): Promise<SubjectAttendanceSummary> {
  const response = await fetch(`${BASE}/subject/${subjectId}/summary`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch subject attendance summary.");
  }

  return (await response.json()) as SubjectAttendanceSummary;
}
