const BASE = "/api/students";

export async function listStudentAssignments(
  token: string,
  studentId: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/${studentId}/assignments`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch student assignments.");
  }

  return (await response.json()) as any[];
}

export async function listStudentSubmissions(
  token: string,
  studentId: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/${studentId}/submissions`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch student submissions.");
  }

  return (await response.json()) as any[];
}

