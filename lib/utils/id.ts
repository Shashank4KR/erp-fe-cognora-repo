export function shortId(id?: string | null): string {
  if (!id) return "-";
  if (id.length <= 12) return id;
  return `${id.slice(0, 8)}…${id.slice(-3)}`;
}

export function formatDateTime(value?: string | null): string {
  if (!value) return "Never";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}
