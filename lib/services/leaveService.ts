const BASE = "/api/leave";

export async function listLeaveRequests(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/requests`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch leave requests.");
  }

  return (await response.json()) as any[];
}

export async function getLeaveRequest(
  token: string,
  id: string,
): Promise<any> {
  const response = await fetch(`${BASE}/requests/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch leave request.");
  }

  return (await response.json()) as any;
}

export async function createLeaveRequest(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/requests`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to create leave request.");
  }

  return (await response.json()) as any;
}

export async function approveLeaveRequest(
  token: string,
  id: string,
): Promise<any> {
  const response = await fetch(`${BASE}/requests/${id}/approve`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to approve leave request.");
  }

  return (await response.json()) as any;
}

export async function rejectLeaveRequest(
  token: string,
  id: string,
): Promise<any> {
  const response = await fetch(`${BASE}/requests/${id}/reject`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to reject leave request.");
  }

  return (await response.json()) as any;
}

export async function getLeaveBalance(
  token: string,
  userId: string,
): Promise<any> {
  const response = await fetch(`${BASE}/balance/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch leave balance.");
  }

  return (await response.json()) as any;
}