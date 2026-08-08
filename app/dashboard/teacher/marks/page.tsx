"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getToken, getStoredUser } from "@/lib/auth";
import { getCurrentTeacher, getTeacherExamResults } from "@/lib/services/teacherService";
import Card from "@/components/shared/Card";
import { Loader2, AlertCircle, FileBarChart } from "lucide-react";

interface MarkEntry {
  id: string;
  student: string;
  class: string;
  subject: string;
  exam: string;
  marks: number;
  maxMarks: number;
  status: "entered" | "pending" | "review";
}

export default function TeacherMarksPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [marks, setMarks] = useState<MarkEntry[]>([]);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const token = getToken();
        const user = getStoredUser();

        if (!token || !user) {
          router.replace("/login");
          return;
        }

        const teacher = await getCurrentTeacher(token);
        const results = await getTeacherExamResults(token, teacher.id);

        setMarks(
          results.map((result) => ({
            id: result.id,
            student: result.student_name,
            class: result.class_name,
            subject: result.subject_name,
            exam: result.exam_name,
            marks: result.marks_obtained,
            maxMarks: result.max_marks,
            status: "entered",
          })),
        );
        setError(null);
      } catch (err) {
        console.error("Error fetching marks:", err);
        setError(err instanceof Error ? err.message : "Failed to load marks");
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "entered": return "bg-green-100 text-green-700";
      case "pending": return "bg-amber-100 text-amber-700";
      case "review": return "bg-blue-100 text-blue-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.teacher}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <FileBarChart className="h-8 w-8 text-purple-600" />
            Marks
          </h1>
          <p className="text-slate-600 mt-1">Enter and review student marks</p>
        </div>

        {loading && (
          <Card className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <p className="text-slate-600">Loading marks...</p>
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

        {!loading && !error && marks.length === 0 && (
          <Card className="border-amber-200 bg-amber-50 p-6">
            <div className="flex items-center gap-3 text-amber-700">
              <FileBarChart className="h-5 w-5" />
              <p>No marks data available yet.</p>
            </div>
          </Card>
        )}

        {!loading && !error && marks.length > 0 && (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-700">
                <thead className="border-b border-slate-200 bg-slate-100 text-slate-900">
                  <tr>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Class</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Exam</th>
                    <th className="px-4 py-3">Marks</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.map((entry) => (
                    <tr key={entry.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-4 font-medium text-slate-900">{entry.student}</td>
                      <td className="px-4 py-4">{entry.class}</td>
                      <td className="px-4 py-4">{entry.subject}</td>
                      <td className="px-4 py-4">{entry.exam}</td>
                      <td className="px-4 py-4">{entry.marks} / {entry.maxMarks}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(entry.status)}`}>
                          {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </RoleDashboardLayout>
  );
}
