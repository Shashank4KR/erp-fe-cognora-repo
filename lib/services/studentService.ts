import type { StudentCreate, StudentResponse } from "@/types/entities/student";

const BASE = "/api/students";

export async function listStudents(token: string): Promise<StudentResponse[]> {
  const response = await fetch(`${BASE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch students.");
  }

  return (await response.json()) as StudentResponse[];
}

export async function getStudent(
  token: string,
  id: string,
): Promise<StudentResponse> {
  const response = await fetch(`${BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch student.");
  }

  return (await response.json()) as StudentResponse;
}

export async function createStudent(
  token: string,
  payload: StudentCreate,
): Promise<StudentResponse> {
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
    throw new Error(data.detail ?? "Failed to create student.");
  }

  return (await response.json()) as StudentResponse;
}

export async function updateStudent(
  token: string,
  id: string,
  payload: Partial<StudentCreate>,
): Promise<StudentResponse> {
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
    throw new Error(data.detail ?? "Failed to update student.");
  }

  return (await response.json()) as StudentResponse;
}

export async function deleteStudent(token: string, id: string): Promise<void> {
  const response = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to delete student.");
  }
}
