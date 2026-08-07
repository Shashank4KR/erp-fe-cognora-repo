export async function listStudentBookIssues(
  token: string,
  studentId: string,
): Promise<any[]> {
  const response = await fetch(`/api/students/${studentId}/book-issues`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch issued books.");
  }

  return (await response.json()) as any[];
}

export async function listBooks(token: string): Promise<any[]> {
  const response = await fetch("/api/books", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch library books.");
  }

  return (await response.json()) as any[];
}

export async function getLibraryDashboardAnalytics(
  token: string,
): Promise<any> {
  const response = await fetch("/api/library/dashboard/analytics", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch library analytics.");
  }
  return (await response.json()) as any;
}

export async function getLibrarySummary(
  token: string,
): Promise<any> {
  const response = await fetch("/api/library/summary", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch library summary.");
  }
  return (await response.json()) as any;
}

