"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getToken, getStoredUser } from "@/lib/auth";
import { listBooks } from "@/lib/services/libraryService";
import Card from "@/components/shared/Card";
import { Loader2, AlertCircle, Library } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
}

export default function CatalogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = getToken();
        const user = getStoredUser();

        if (!token || !user) {
          router.replace("/login");
          return;
        }

        try {
          const data = await listBooks(token);
          setBooks(data || []);
          setError(null);
        } catch {
          setBooks([]);
          setError("No catalog data available yet.");
        }
      } catch (err) {
        console.error("Error fetching catalog:", err);
        setError(err instanceof Error ? err.message : "Failed to load catalog");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [router]);

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.librarian}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Library className="h-8 w-8 text-purple-600" />
            Book Catalog
          </h1>
          <p className="text-slate-600 mt-1">Browse and manage the library book collection</p>
        </div>

        {loading && (
          <Card className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <p className="text-slate-600">Loading catalog...</p>
            </div>
          </Card>
        )}

        {error && (
          <Card className="border-red-200 bg-red-50 p-6">
            <div className="flex items-center gap-3 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </Card>
        )}

        {!loading && !error && books.length === 0 && (
          <Card className="border-amber-200 bg-amber-50 p-6">
            <div className="flex items-center gap-3 text-amber-700">
              <Library className="h-5 w-5" />
              <p>No books in catalog yet.</p>
            </div>
          </Card>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition p-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{book.title}</p>
                    <p className="text-sm text-slate-600 mt-1">by {book.author}</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">ISBN</span>
                      <span className="font-semibold text-slate-900">{book.isbn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Category</span>
                      <span className="font-semibold text-slate-900">{book.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Available</span>
                      <span className="font-semibold text-slate-900">{book.availableCopies} / {book.totalCopies}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </RoleDashboardLayout>
  );
}
