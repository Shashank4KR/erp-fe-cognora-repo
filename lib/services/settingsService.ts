const BASE = "/api/settings";

export async function getSettings(
  token: string,
): Promise<any> {
  const response = await fetch(`${BASE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch settings.");
  }

  return (await response.json()) as any;
}

export async function updateSettings(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to update settings.");
  }

  return (await response.json()) as any;
}