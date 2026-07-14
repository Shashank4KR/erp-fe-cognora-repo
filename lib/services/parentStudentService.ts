import type {
  ParentStudentCreate,
  ParentStudentResponse,
} from "@/types/entities/parent-student";

const BASE = "/api/parent-students";

export async function listParentStudents(
  token: string,
): Promise<ParentStudentResponse[]> {
  const response = await fetch(`${BASE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch parent-student relationships.");
  }

  return (await response.json()) as ParentStudentResponse[];
}

export async function getParentStudent(
  token: string,
  id: string,
): Promise<ParentStudentResponse> {
  const response = await fetch(`${BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch parent-student relationship.");
  }

  return (await response.json()) as ParentStudentResponse;
}

export async function createParentStudent(
  token: string,
  payload: ParentStudentCreate,
): Promise<ParentStudentResponse> {
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
    throw new Error(data.detail ?? "Failed to create parent-student relationship.");
  }

  return (await response.json()) as ParentStudentResponse;
}

export async function updateParentStudent(
  token: string,
  id: string,
  payload: Partial<ParentStudentCreate>,
): Promise<ParentStudentResponse> {
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
    throw new Error(data.detail ?? "Failed to update parent-student relationship.");
  }

  return (await response.json()) as ParentStudentResponse;
}

export async function deleteParentStudent(
  token: string,
  id: string,
): Promise<void> {
  const response = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to delete parent-student relationship.");
  }
}
