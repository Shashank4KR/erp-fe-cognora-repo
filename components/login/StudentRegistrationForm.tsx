"use client";

import { FormEvent, useState } from "react";

type Props = { onSuccess: () => void };

export default function StudentRegistrationForm({ onSuccess }: Props) {
  const [form, setForm] = useState({ username: "", email: "", password: "", phone: "", first_name: "", last_name: "", class_name: "", roll_no: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/register/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { detail?: string; message?: string };
      if (!response.ok) {
        throw new Error(data.detail ?? data.message ?? "Unable to create your account.");
      }
      onSuccess();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to create your account.");
    } finally {
      setSubmitting(false);
    }
  };

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <form className="mt-6 grid gap-3 sm:grid-cols-2" onSubmit={submit}>
      {(["username", "email", "password", "phone", "first_name", "last_name", "class_name", "roll_no"] as const).map((field) => (
        <label key={field} className="text-xs font-semibold capitalize text-slate-700">
          {field.replaceAll("_", " ")}
          <input required={["username", "email", "password"].includes(field)} type={field === "password" ? "password" : field === "email" ? "email" : "text"} value={form[field]} onChange={(event) => update(field, event.target.value)} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100" />
        </label>
      ))}
      {error && <p role="alert" className="sm:col-span-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <button disabled={submitting} className="sm:col-span-2 h-11 rounded-xl bg-[#6d28d9] text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-60">
        {submitting ? "Creating account..." : "Create Student Account"}
      </button>
    </form>
  );
}
