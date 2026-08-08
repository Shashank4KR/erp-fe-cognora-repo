"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getToken, getStoredUser } from "@/lib/auth";
import { getCurrentTeacher, getTeacherClasses } from "@/lib/services/teacherService";
import Card from "@/components/shared/Card";
import { Loader2, AlertCircle, Users2 } from "lucide-react";

interface TeacherClass {
  id: string;
  name: string;
  studentCount: number | null;
  room: string | null;
  schedule?: string;
}

export default function TeacherClassesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [classes, setClasses] = useState<TeacherClass[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = getToken();
        const user = getStoredUser();

        if (!token || !user) {
          router.replace("/login");
          return;
        }

        const teacher = await getCurrentTeacher(token);
        const assignedClasses = await getTeacherClasses(token, teacher.id);

        setClasses(
          assignedClasses.map((cls) => ({
            id: cls.id,
            name: `${cls.class_name}${cls.section ? `-${cls.section}` : ""}`,
            studentCount: null,
            room: null,
            schedule: cls.academic_year,
          })),
        );
        setError(null);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError(err instanceof Error ? err.message : "Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [router]);

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.teacher}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Users2 className="h-8 w-8 text-purple-600" />
            My Classes
          </h1>
          <p className="text-slate-600 mt-1">Manage your assigned classes and students</p>
        </div>

        {loading && (
          <Card className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <p className="text-slate-600">Loading classes...</p>
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

        {!loading && !error && classes.length === 0 && (
          <Card className="border-amber-200 bg-amber-50 p-6">
            <div className="flex items-center gap-3 text-amber-700">
              <Users2 className="h-5 w-5" />
              <p>No classes assigned yet. Contact administration for class assignments.</p>
            </div>
          </Card>
        )}

        {!loading && !error && classes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((cls) => (
              <Card key={cls.id} className="hover:shadow-lg transition cursor-pointer p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{cls.name}</p>
                    <p className="text-sm text-slate-600 mt-1">{cls.room ?? "Room not assigned"}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Students</span>
                      <span className="font-semibold text-slate-900">{cls.studentCount ?? "Not available"}</span>
                    </div>
                    {cls.schedule && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Schedule</span>
                        <span className="font-semibold text-slate-900">{cls.schedule}</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full mt-4 px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition">
                    View Class
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </RoleDashboardLayout>
  );
}
