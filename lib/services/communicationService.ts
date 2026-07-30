const BASE = "/api/communication";

export async function listAnnouncements(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/announcements`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch announcements.");
  }

  return (await response.json()) as any[];
}

export async function createAnnouncement(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/announcements`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to create announcement.");
  }

  return (await response.json()) as any;
}

export async function updateAnnouncement(
  token: string,
  id: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/announcements/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to update announcement.");
  }

  return (await response.json()) as any;
}

export async function deleteAnnouncement(
  token: string,
  id: string,
): Promise<void> {
  const response = await fetch(`${BASE}/announcements/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to delete announcement.");
  }
}

export async function listMessages(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch messages.");
  }

  return (await response.json()) as any[];
}

export async function sendMessage(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to send message.");
  }

  return (await response.json()) as any;
}

export async function getCommunicationStats(
  token: string,
): Promise<any> {
  const response = await fetch(`${BASE}/statistics`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch communication statistics.");
  }

  return (await response.json()) as any;
}