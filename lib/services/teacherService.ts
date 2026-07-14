import type { TeacherCreate, TeacherResponse } from "@/types/entities/teacher";

const BASE = "/api/teachers";

export async function listTeachers(token: string): Promise<TeacherResponse[]> {
  const response = await fetch(`${BASE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch teachers.");
  }

  return (await response.json()) as TeacherResponse[];
}

export async function getTeacher(
  token: string,
  id: string,
): Promise<TeacherResponse> {
  const response = await fetch(`${BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch teacher.");
  }

  return (await response.json()) as TeacherResponse;
}

export async function createTeacher(
  token: string,
  payload: TeacherCreate,
): Promise<TeacherResponse> {
  const response = await fetch(`${BASE}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to create teacher.");
  }

  return (await response.json()) as TeacherResponse;
}

export async function updateTeacher(
  token: string,
  id: string,
  payload: Partial<TeacherCreate>,
): Promise<TeacherResponse> {
  const response = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to update teacher.");
  }

  return (await response.json()) as TeacherResponse;
}

export async function deleteTeacher(token: string, id: string): Promise<void> {
  const response = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to delete teacher.");
  }
}
