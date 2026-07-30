const BASE = "/api/finance";

export async function getFinanceOverview(
  token: string,
): Promise<any> {
  const response = await fetch(`${BASE}/overview`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch finance overview.");
  }

  return (await response.json()) as any;
}

export async function listFeeStructures(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/fee-structures`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch fee structures.");
  }

  return (await response.json()) as any[];
}

export async function createFeeStructure(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/fee-structures`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to create fee structure.");
  }

  return (await response.json()) as any;
}

export async function updateFeeStructure(
  token: string,
  id: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/fee-structures/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to update fee structure.");
  }

  return (await response.json()) as any;
}

export async function deleteFeeStructure(
  token: string,
  id: string,
): Promise<void> {
  const response = await fetch(`${BASE}/fee-structures/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to delete fee structure.");
  }
}

export async function listInvoices(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/invoices`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch invoices.");
  }

  return (await response.json()) as any[];
}

export async function generateInvoice(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/invoices/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to generate invoice.");
  }

  return (await response.json()) as any;
}

export async function listExpenses(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch expenses.");
  }

  return (await response.json()) as any[];
}

export async function addExpense(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/expenses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to add expense.");
  }

  return (await response.json()) as any;
}

export async function listTransactions(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch transactions.");
  }

  return (await response.json()) as any[];
}

export async function recordTransaction(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/transactions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to record transaction.");
  }

  return (await response.json()) as any;
}

export async function listSalaryRecords(
  token: string,
): Promise<any[]> {
  const response = await fetch(`${BASE}/salary`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch salary records.");
  }

  return (await response.json()) as any[];
}

export async function processSalary(
  token: string,
  payload: any,
): Promise<any> {
  const response = await fetch(`${BASE}/salary/process`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to process salary.");
  }

  return (await response.json()) as any;
}