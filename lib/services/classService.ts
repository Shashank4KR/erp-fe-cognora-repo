import type { ClassCreate, ClassResponse, ClassUpdate } from "@/types/entities/class";

const BASE = "/api/classes";

export async function listClasses(token: string): Promise<ClassResponse[]> {
  const response = await fetch(`${BASE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch classes.");
  }

  return (await response.json()) as ClassResponse[];
}

export async function getClass(
  token: string,
  id: string,
): Promise<ClassResponse> {
  const response = await fetch(`${BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch class.");
  }

  return (await response.json()) as ClassResponse;
}

export async function createClass(
  token: string,
  payload: ClassCreate,
): Promise<ClassResponse> {
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
    throw new Error(data.detail ?? "Failed to create class.");
  }

  return (await response.json()) as ClassResponse;
}

export async function updateClass(
  token: string,
  id: string,
  payload: ClassUpdate,
): Promise<ClassResponse> {
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
    throw new Error(data.detail ?? "Failed to update class.");
  }

  return (await response.json()) as ClassResponse;
}

export async function deleteClass(token: string, id: string): Promise<void> {
  const response = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to delete class.");
  }
}
