import { redirect } from "next/navigation";

export default function LegacyClassesRedirect() {
  redirect("/dashboard/admin/academics/classes");
}