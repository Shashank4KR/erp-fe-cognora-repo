"use client";

import { useState, useEffect, type ReactNode } from "react";
import Card from "@/components/shared/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import Modal from "@/components/shared/Modal";
import Badge from "@/components/shared/Badge";
import { Plus, Search, Pencil, Trash2, Loader2 } from "lucide-react";

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "select" | "date" | "textarea" | "checkbox";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  disabled?: boolean;
  readOnly?: boolean;
};

export type ColumnConfig = {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => ReactNode;
};

export type EntityPageProps<T> = {
  title: string;
  subtitle?: string;
  token: string;
  fields: FieldConfig[];
  columns: ColumnConfig[];
  fetchItems: (token: string) => Promise<T[]>;
  createItem: (token: string, data: Record<string, unknown>) => Promise<T>;
  updateItem: (token: string, id: string, data: Record<string, unknown>) => Promise<T>;
  deleteItem: (token: string, id: string) => Promise<void>;
  getItemId: (item: T) => string;
  initialFormState: () => Record<string, unknown>;
  validateForm?: (data: Record<string, unknown>) => string | null;
};

export default function EntityPage<T extends Record<string, unknown>>({
  title,
  subtitle,
  token,
  fields,
  columns,
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  getItemId,
  initialFormState,
  validateForm,
}: EntityPageProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Record<string, unknown>>(initialFormState());
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchItems(token);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [token]);

  const openAdd = () => {
    setEditingItem(null);
    setFormData(initialFormState());
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEdit = (item: T) => {
    setEditingItem(item);
    setFormData(
      fields.reduce((acc, field) => {
        acc[field.name] = (item as Record<string, unknown>)[field.name] ?? "";
        return acc;
      }, {} as Record<string, unknown>),
    );
    setFormError(null);
    setIsFormOpen(true);
  };

  const openDelete = (id: string) => {
    setDeletingId(id);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setFormError(null);

    if (validateForm) {
      const validationError = validateForm(formData);
      if (validationError) {
        setFormError(validationError);
        return;
      }
    }

    setSubmitting(true);
    try {
      if (editingItem) {
        await updateItem(token, getItemId(editingItem), formData);
      } else {
        await createItem(token, formData);
      }
      setIsFormOpen(false);
      await loadItems();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Operation failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId || submitting) return;

    setSubmitting(true);
    try {
      await deleteItem(token, deletingId);
      setIsDeleteOpen(false);
      setDeletingId(null);
      await loadItems();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredItems = items.filter((item) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return columns.some((col) => {
      const value = item[col.key];
      return String(value ?? "").toLowerCase().includes(term);
    });
  });

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          action={
            <button
              onClick={openAdd}
              className="flex items-center gap-2 rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              <Plus className="h-4 w-4" />
              Add {title.replace(/s$/, "")}
            </button>
          }
        />

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Card>
          <div className="p-4 border-b border-slate-100">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${title.toLowerCase()}...`}
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none focus:border-[#6d28d9] focus:ring-2 focus:ring-purple-100"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-[#6d28d9]" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              {search ? "No results found." : `No ${title.toLowerCase()} found.`}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-xs font-semibold text-slate-500 uppercase">
                    {columns.map((col) => (
                      <th key={col.key} className="px-4 py-3">
                        {col.label}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr
                      key={getItemId(item)}
                      className="border-b border-slate-50 hover:bg-slate-50/50 transition"
                    >
                      {columns.map((col) => (
                        <td key={col.key} className="px-4 py-3">
                          {col.render
                            ? col.render(item[col.key], item as Record<string, unknown>)
                            : String(item[col.key] ?? "")}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(item)}
                            className="p-2 rounded-lg hover:bg-purple-50 text-slate-600 hover:text-[#6d28d9] transition"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openDelete(getItemId(item))}
                            className="p-2 rounded-lg hover:bg-red-50 text-slate-600 hover:text-red-600 transition"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Form Modal */}
        <Modal
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title={editingItem ? `Edit ${title.replace(/s$/, "")}` : `Add ${title.replace(/s$/, "")}`}
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {formError}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {field.type === "select" ? (
                    <select
                      value={String(formData[field.name] ?? "")}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      required={field.required}
                      disabled={field.disabled}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#6d28d9] focus:ring-2 focus:ring-purple-100 disabled:bg-slate-100"
                    >
                      <option value="">Select...</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      value={String(formData[field.name] ?? "")}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      required={field.required}
                      readOnly={field.readOnly}
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#6d28d9] focus:ring-2 focus:ring-purple-100"
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={String(formData[field.name] ?? "")}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      required={field.required}
                      disabled={field.disabled}
                      readOnly={field.readOnly}
                      placeholder={field.placeholder}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#6d28d9] focus:ring-2 focus:ring-purple-100 disabled:bg-slate-100"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition disabled:opacity-70"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </span>
                ) : editingItem ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          open={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Delete Confirmation"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Are you sure you want to delete this {title.toLowerCase().replace(/s$/, "")}? This action cannot be undone.
            </p>
            {formError && isDeleteOpen && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {formError}
              </p>
            )}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={submitting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition disabled:opacity-70"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </span>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
