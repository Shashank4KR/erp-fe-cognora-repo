"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getToken, getStoredUser } from "@/lib/auth";
import { getCurrentTeacher, getTeacherAssignments } from "@/lib/services/teacherService";
import Card from "@/components/shared/Card";
import { Loader2, AlertCircle, ClipboardList } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  description?: string;
}

export default function TeacherAssignmentsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = getToken();
        const user = getStoredUser();

        if (!token || !user) {
          router.replace("/login");
          return;
        }

        const teacher = await getCurrentTeacher(token);
        const teacherAssignments = await getTeacherAssignments(token, teacher.id);

        setAssignments(
          teacherAssignments.map((assignment) => ({
            id: assignment.id,
            title: assignment.title,
            subject: assignment.subject_name ?? "Subject not assigned",
            dueDate: assignment.due_date ?? "No due date",
            status: "pending",
            description: assignment.description ?? assignment.class_name ?? undefined,
          })),
        );
        setError(null);
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError(err instanceof Error ? err.message : "Failed to load assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [router]);

  const pendingAssignments = assignments.filter((a) => a.status === "pending");
  const submittedAssignments = assignments.filter((a) => a.status === "submitted");
  const gradedAssignments = assignments.filter((a) => a.status === "graded");

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.teacher}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <ClipboardList className="h-8 w-8 text-purple-600" />
            Assignments
          </h1>
          <p className="text-slate-600 mt-1">Manage and review student assignments</p>
        </div>

        {loading && (
          <Card className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <p className="text-slate-600">Loading assignments...</p>
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

        {!loading && !error && assignments.length === 0 && (
          <Card className="border-amber-200 bg-amber-50 p-6">
            <div className="flex items-center gap-3 text-amber-700">
              <ClipboardList className="h-5 w-5" />
              <p>No assignments yet. Check back later for new assignments.</p>
            </div>
          </Card>
        )}

        {!loading && !error && assignments.length > 0 && (
          <div className="space-y-6">
            {pendingAssignments.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                    {pendingAssignments.length}
                  </span>
                  Pending Review
                </h2>
                <div className="space-y-3">
                  {pendingAssignments.map((assignment) => (
                    <Card key={assignment.id} className="hover:shadow-md transition">
                      <div className="p-6 flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{assignment.title}</p>
                          <p className="text-sm text-slate-600 mt-1">{assignment.subject}</p>
                          {assignment.description && (
                            <p className="text-sm text-slate-500 mt-2">{assignment.description}</p>
                          )}
                          <p className="text-xs text-red-600 font-semibold mt-2">Due: {assignment.dueDate}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                          Pending
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {submittedAssignments.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                    {submittedAssignments.length}
                  </span>
                  Submitted
                </h2>
                <div className="space-y-3">
                  {submittedAssignments.map((assignment) => (
                    <Card key={assignment.id} className="hover:shadow-md transition">
                      <div className="p-6 flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{assignment.title}</p>
                          <p className="text-sm text-slate-600 mt-1">{assignment.subject}</p>
                          <p className="text-xs text-blue-600 mt-2">Submitted: {assignment.dueDate}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                          Submitted
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {gradedAssignments.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-600">
                    {gradedAssignments.length}
                  </span>
                  Graded
                </h2>
                <div className="space-y-3">
                  {gradedAssignments.map((assignment) => (
                    <Card key={assignment.id} className="hover:shadow-md transition">
                      <div className="p-6 flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{assignment.title}</p>
                          <p className="text-sm text-slate-600 mt-1">{assignment.subject}</p>
                          <p className="text-xs text-green-600 mt-2">Graded</p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                          Graded
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </RoleDashboardLayout>
  );
}
