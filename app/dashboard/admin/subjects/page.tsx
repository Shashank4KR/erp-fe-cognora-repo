import { redirect } from "next/navigation";

export default function LegacySubjectsRedirect() {
  redirect("/dashboard/admin/academics/subjects");
}
