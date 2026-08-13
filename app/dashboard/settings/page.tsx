"use client";

import { useSearchParams } from "next/navigation";
import SettingsPage, { type SchoolRole } from "@/components/settings/SettingsPage";

const roles: SchoolRole[] = ["Admin", "Teacher", "Student", "Parent", "Librarian", "Accountant"];

export default function SettingsRoute() {
  const searchParams = useSearchParams();
  const requestedRole = searchParams.get("role");
  const currentRole = roles.find((role) => role.toLowerCase() === requestedRole?.toLowerCase()) ?? "Admin";

  return <SettingsPage currentRole={currentRole} />;
}
