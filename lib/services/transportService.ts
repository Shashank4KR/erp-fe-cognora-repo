const BASE = "/api/transport";

export async function listTransportRoutes(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/routes`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch transport routes.");
  }

  return (await response.json()) as any[];
}

export async function getTransportRoute(
  token: string,
  id: string,
): Promise<any> {
  const response = await fetch(`${BASE}/routes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch transport route.");
  }

  return (await response.json()) as any;
}

export async function createTransportRoute(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/routes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to create transport route.");
  }

  return (await response.json()) as any;
}

export async function updateTransportRoute(
  token: string,
  id: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/routes/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to update transport route.");
  }

  return (await response.json()) as any;
}

export async function deleteTransportRoute(
  token: string,
  id: string,
): Promise<void> {
  const response = await fetch(`${BASE}/routes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to delete transport route.");
  }
}

export async function listVehicles(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/vehicles`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch vehicles.");
  }

  return (await response.json()) as any[];
}

export async function getVehicle(
  token: string,
  id: string,
): Promise<any> {
  const response = await fetch(`${BASE}/vehicles/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch vehicle.");
  }

  return (await response.json()) as any;
}

export async function createVehicle(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/vehicles`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to create vehicle.");
  }

  return (await response.json()) as any;
}

export async function updateVehicle(
  token: string,
  id: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/vehicles/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to update vehicle.");
  }

  return (await response.json()) as any;
}

export async function deleteVehicle(
  token: string,
  id: string,
): Promise<void> {
  const response = await fetch(`${BASE}/vehicles/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to delete vehicle.");
  }
}

export async function listDrivers(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/drivers`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch drivers.");
  }

  return (await response.json()) as any[];
}

export async function assignDriver(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/drivers/assign`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to assign driver.");
  }

  return (await response.json()) as any;
}