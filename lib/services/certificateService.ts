const BASE = "/api/certificates";

export async function listCertificates(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch certificates.");
  }

  return (await response.json()) as any[];
}

export async function getCertificate(
  token: string,
  id: string,
): Promise<any> {
  const response = await fetch(`${BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch certificate.");
  }

  return (await response.json()) as any;
}

export async function generateCertificate(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to generate certificate.");
  }

  return (await response.json()) as any;
}

export async function downloadCertificate(
  token: string,
  id: string,
): Promise<Blob> {
  const response = await fetch(`${BASE}/${id}/download`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to download certificate.");
  }

  return response.blob();
}