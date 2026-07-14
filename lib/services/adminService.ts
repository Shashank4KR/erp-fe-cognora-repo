import type { AdminCreate, AdminResponse } from "@/types/entities/admin";

const BASE = "/api/admins";

export async function listAdmins(token: string): Promise<AdminResponse[]> {
  const response = await fetch(`${BASE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch admins.");
  }

  return (await response.json()) as AdminResponse[];
}

export async function getAdmin(
  token: string,
  id: string,
): Promise<AdminResponse> {
  const response = await fetch(`${BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch admin.");
  }

  return (await response.json()) as AdminResponse;
}

export async function createAdmin(
  token: string,
  payload: AdminCreate,
): Promise<AdminResponse> {
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
    throw new Error(data.detail ?? "Failed to create admin.");
  }

  return (await response.json()) as AdminResponse;
}

export async function updateAdmin(
  token: string,
  id: string,
  payload: Partial<AdminCreate>,
): Promise<AdminResponse> {
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
    throw new Error(data.detail ?? "Failed to update admin.");
  }

  return (await response.json()) as AdminResponse;
}

export async function deleteAdmin(token: string, id: string): Promise<void> {
  const response = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to delete admin.");
  }
}
