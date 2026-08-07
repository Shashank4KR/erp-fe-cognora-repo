import { getToken } from "@/lib/auth";

export interface DashboardStats {
  total_students: number;
  total_teachers: number;
  total_classes: number;
  total_subjects: number;
  total_fees_invoiced: number;
  total_fees_collected: number;
  upcoming_events: number;
}

export async function getDashboardStats(token: string): Promise<DashboardStats> {
  const response = await fetch("/api/dashboard/stats", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch dashboard stats.");
  }

  return (await response.json()) as DashboardStats;
}

export async function getRecentActivities(token: string): Promise<any[]> {
  const response = await fetch("/api/audit/recent-activities", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch recent activities.");
  }

  return (await response.json()) as any[];
}

export async function getUpcomingEvents(token: string): Promise<any[]> {
  const response = await fetch("/api/events/upcoming", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch upcoming events.");
  }

  return (await response.json()) as any[];
}

export async function getAllStudents(token: string): Promise<any[]> {
  const response = await fetch("/api/students", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch students.");
  }

  return (await response.json()) as any[];
}

export async function getAllClasses(token: string): Promise<any[]> {
  const response = await fetch("/api/classes", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = (await response.json()) as { detail?: string };
    throw new Error(data.detail ?? "Failed to fetch classes.");
  }

  return (await response.json()) as any[];
}
