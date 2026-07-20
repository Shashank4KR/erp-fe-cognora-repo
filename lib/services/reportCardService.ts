import { formatApiError } from "@/lib/services/apiError";
import type {
  ReportCardGenerate,
  ReportCardResponse,
} from "@/types/entities/report-card";

const BASE = "/api/report-cards";

async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();

  if (!response.ok) {
    let parsed: unknown = null;
    if (text) {
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = null;
      }
    }
    if (!parsed) {
      throw new Error(
        response.statusText || `Request failed with status ${response.status}.`,
      );
    }
    throw new Error(formatApiError(parsed, "Request failed.", response.statusText));
  }

  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}

export async function generateReportCard(
  token: string,
  payload: ReportCardGenerate,
): Promise<ReportCardResponse> {
  return request<ReportCardResponse>("/generate", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
}

export async function getReportCardById(
  token: string,
  reportCardId: string,
): Promise<ReportCardResponse> {
  return request<ReportCardResponse>(`/${encodeURIComponent(reportCardId)}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}
