import type { TimetableCreate, TimetableResponse, TimetableUpdate } from "@/types/entities/timetable";

export type ServiceError = Error & { status?: number };

async function parseError(response: Response): Promise<ServiceError> {
  const status = response.status;
  const text = await response.text();
  let message = `Request failed with status ${status}`;

  if (text) {
    try {
      const data = JSON.parse(text) as {
        detail?: unknown;
        message?: unknown;
      };
      const detail = data.detail ?? data.message;
      if (typeof detail === "string" && detail.length > 0) {
        message = detail;
      } else if (Array.isArray(detail)) {
        message = detail
          .map((d) => (typeof d === "object" && d && "msg" in d ? String((d as { msg: unknown }).msg) : JSON.stringify(d)))
          .join("; ");
      } else {
        message = text;
      }
    } catch {
      message = text;
    }
  }

  const error = new Error(message) as ServiceError;
  error.status = status;
  return error;
}

const BASE = "/api/timetables";

export async function listTimetables(token: string): Promise<TimetableResponse[]> {
  const response = await fetch(`${BASE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as TimetableResponse[]) : [];
}

export async function getTimetable(
  token: string,
  id: string,
): Promise<TimetableResponse> {
  const response = await fetch(`${BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  const text = await response.text();
  if (!text) {
    throw new Error("Timetable response was empty.");
  }
  return JSON.parse(text) as TimetableResponse;
}

export async function createTimetable(
  token: string,
  payload: TimetableCreate,
): Promise<TimetableResponse> {
  const response = await fetch(`${BASE}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  const text = await response.text();
  if (!text) {
    throw new Error("Timetable creation response was empty.");
  }
  return JSON.parse(text) as TimetableResponse;
}

export async function updateTimetable(
  token: string,
  id: string,
  payload: TimetableUpdate,
): Promise<TimetableResponse> {
  const response = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  const text = await response.text();
  if (!text) {
    throw new Error("Timetable update response was empty.");
  }
  return JSON.parse(text) as TimetableResponse;
}

export async function deleteTimetable(token: string, id: string): Promise<void> {
  const response = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw await parseError(response);
  }
}
