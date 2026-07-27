"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoleDashboardLayout from "@/components/dashboard/role-dashboards/RoleDashboardLayout";
import { ROLE_CONFIGS } from "@/lib/dashboard/role-dashboards/config";
import { getToken } from "@/lib/auth";
import { getStudentAttendanceSummary } from "@/lib/services/attendanceService";
import Card from "@/components/shared/Card";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

interface AttendanceSummary {
  present: number;
  absent: number;
  late: number;
  total: number;
  percentage: number;
}

export default function StudentAttendancePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<AttendanceSummary | null>(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = getToken();
        const studentJson = localStorage.getItem("edtech_student");

        if (!token || !studentJson) {
          router.replace("/login");
          return;
        }

        const student = JSON.parse(studentJson);
        if (!student.id) {
          setError("Student ID not found");
          setLoading(false);
          return;
        }

        const data = await getStudentAttendanceSummary(token, student.id);
        const summary: AttendanceSummary = {
          present: data.present || 0,
          absent: data.absent || 0,
          late: data.late || 0,
          total: (data.total_classes || data.present + data.absent + data.late) as number,
          percentage: data.attendance_percentage || 0,
        };
        setAttendance(summary);
        setError(null);
      } catch (err) {
        console.error("Error fetching attendance:", err);
        setError(err instanceof Error ? err.message : "Failed to load attendance data");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [router]);

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getAttendanceBg = (percentage: number) => {
    if (percentage >= 80) return "bg-green-50 border-green-200";
    if (percentage >= 75) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <RoleDashboardLayout config={ROLE_CONFIGS.student}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="h-8 w-8 text-purple-600" />
            Attendance
          </h1>
          <p className="text-slate-600 mt-1">Track your attendance records for the current term</p>
        </div>

        {loading && (
          <Card className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <p className="text-slate-600">Loading attendance data...</p>
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

        {!loading && !error && attendance && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className={`border ${getAttendanceBg(attendance.percentage)} p-6`}>
              <p className="text-sm font-medium text-slate-600">Overall Attendance</p>
              <p className={`text-4xl font-bold ${getAttendanceColor(attendance.percentage)} mt-2`}>
                {attendance.percentage.toFixed(1)}%
              </p>
            </Card>

            <Card className="border-blue-200 bg-blue-50 p-6">
              <p className="text-sm font-medium text-slate-600">Present</p>
              <p className="text-4xl font-bold text-blue-600 mt-2">{attendance.present}</p>
              <p className="text-xs text-blue-600 mt-1">days</p>
            </Card>

            <Card className="border-amber-200 bg-amber-50 p-6">
              <p className="text-sm font-medium text-slate-600">Absent</p>
              <p className="text-4xl font-bold text-amber-600 mt-2">{attendance.absent}</p>
              <p className="text-xs text-amber-600 mt-1">days</p>
            </Card>

            <Card className="border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-600">Late</p>
              <p className="text-4xl font-bold text-slate-600 mt-2">{attendance.late}</p>
              <p className="text-xs text-slate-600 mt-1">days</p>
            </Card>
          </div>
        )}

        {!loading && !error && attendance && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Classes</span>
                <span className="font-semibold text-slate-900">{attendance.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Present</span>
                <span className="font-semibold text-blue-600">{attendance.present} ({((attendance.present / attendance.total) * 100).toFixed(1)}%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Absent</span>
                <span className="font-semibold text-amber-600">{attendance.absent} ({((attendance.absent / attendance.total) * 100).toFixed(1)}%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Late</span>
                <span className="font-semibold text-slate-600">{attendance.late} ({((attendance.late / attendance.total) * 100).toFixed(1)}%)</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </RoleDashboardLayout>
  );
}
