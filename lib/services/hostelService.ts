const BASE = "/api/hostel";

export async function listHostelBlocks(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/blocks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch hostel blocks.");
  }

  return (await response.json()) as any[];
}

export async function getHostelBlock(
  token: string,
  id: string,
): Promise<any> {
  const response = await fetch(`${BASE}/blocks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch hostel block.");
  }

  return (await response.json()) as any;
}

export async function createHostelBlock(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/blocks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to create hostel block.");
  }

  return (await response.json()) as any;
}

export async function updateHostelBlock(
  token: string,
  id: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/blocks/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to update hostel block.");
  }

  return (await response.json()) as any;
}

export async function deleteHostelBlock(
  token: string,
  id: string,
): Promise<void> {
  const response = await fetch(`${BASE}/blocks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to delete hostel block.");
  }
}

export async function listRooms(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/rooms`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch rooms.");
  }

  return (await response.json()) as any[];
}

export async function getRoom(
  token: string,
  id: string,
): Promise<any> {
  const response = await fetch(`${BASE}/rooms/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch room.");
  }

  return (await response.json()) as any;
}

export async function createRoom(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/rooms`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to create room.");
  }

  return (await response.json()) as any;
}

export async function updateRoom(
  token: string,
  id: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/rooms/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to update room.");
  }

  return (await response.json()) as any;
}

export async function deleteRoom(
  token: string,
  id: string,
): Promise<void> {
  const response = await fetch(`${BASE}/rooms/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to delete room.");
  }
}

export async function allocateStudent(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/allocate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to allocate student.");
  }

  return (await response.json()) as any;
}

export async function listHostelStudents(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/students`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch hostel students.");
  }

  return (await response.json()) as any[];
}