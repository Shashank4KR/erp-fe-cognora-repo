export type ApiErrorShape = {
  detail?:
    | string
    | Array<{ loc?: (string | number)[]; msg?: string; message?: string }>
    | Record<string, unknown>
    | null;
  message?: string;
  msg?: string;
};

function formatValidationItem(item: unknown): string {
  if (item && typeof item === "object") {
    const obj = item as {
      loc?: (string | number)[];
      msg?: string;
      message?: string;
    };
    const msg = obj.msg ?? obj.message ?? "";
    const loc = Array.isArray(obj.loc)
      ? obj.loc.filter((l) => typeof l === "string").join(".")
      : "";
    if (loc && msg) return `${loc}: ${msg}`;
    if (msg) return msg;
    if (loc) return loc;
  }
  if (typeof item === "string") return item;
  return "";
}

/**
 * Convert a FastAPI error body into a readable message.
 * Handles string detail, array-of-errors detail (422 validation),
 * object detail, and falls back to the HTTP status text.
 */
export function formatApiError(
  data: unknown,
  fallback: string,
  statusText?: string,
): string {
  if (data === null || data === undefined) {
    return statusText || fallback;
  }

  if (typeof data === "string") {
    return data;
  }

  if (typeof data !== "object") {
    return String(data);
  }

  const shape = data as ApiErrorShape;
  const detail = shape.detail;

  if (detail === undefined || detail === null) {
    const direct = shape.message ?? (shape.msg as string | undefined);
    if (typeof direct === "string" && direct.length > 0) return direct;
    return statusText || fallback;
  }

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    const messages = detail
      .map((item) => formatValidationItem(item))
      .filter((m) => m.length > 0);
    return messages.length > 0 ? messages.join(", ") : statusText || fallback;
  }

  if (typeof detail === "object") {
    const detailObj = detail as Record<string, unknown>;
    const msg =
      (detailObj.msg as string | undefined) ??
      (detailObj.message as string | undefined) ??
      (detailObj.detail as string | undefined);
    if (typeof msg === "string" && msg.length > 0) return msg;
  }

  return statusText || fallback;
}
