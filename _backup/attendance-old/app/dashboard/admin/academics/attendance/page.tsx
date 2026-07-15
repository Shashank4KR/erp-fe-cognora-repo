"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import { Loader2, X } from "lucide-react";
import AttendancePageHeader from "@/components/dashboard/admin/academics/attendance/AttendancePageHeader";
import AttendanceSummaryCards, {
  type SummaryCardItem,
} from "@/components/dashboard/admin/academics/attendance/AttendanceSummaryCards";
import AttendanceFilters, {
  type SelectItem,
} from "@/components/dashboard/admin/academics/attendance/AttendanceFilters";
import AttendanceTable, {
  type AttendanceTableRow,
  type AttendanceSubjectColumn,
} from "@/components/dashboard/admin/academics/attendance/AttendanceTable";
import AttendancePagination from "@/components/dashboard/admin/academics/attendance/AttendancePagination";
import AttendanceFooter from "@/components/dashboard/admin/academics/attendance/AttendanceFooter";
import MarkAttendanceModal, {
  type MarkAttendancePayload,
} from "@/components/dashboard/admin/academics/attendance/MarkAttendanceModal";
import AttendanceViewDrawer from "@/components/dashboard/admin/academics/attendance/AttendanceViewDrawer";
import AttendanceEditDialog from "@/components/dashboard/admin/academics/attendance/AttendanceEditDialog";
import AttendanceHistoryDrawer from "@/components/dashboard/admin/academics/attendance/AttendanceHistoryDrawer";
import AttendanceReportDrawer, {
  type ReportMode,
} from "@/components/dashboard/admin/academics/attendance/AttendanceReportDrawer";
import Modal from "@/components/shared/Modal";
import Dropdown from "@/components/shared/Dropdown";
import {
  listClasses,
  getClassSubjects,
  getClassTeachers,
} from "@/lib/services/classService";
import { listStudents } from "@/lib/services/studentService";
import { listSubjects } from "@/lib/services/subjectService";
import {
  getAttendanceByClass,
  createBulkAttendance,
} from "@/lib/services/attendanceService";
import { getStoredUser } from "@/lib/auth";
import {
  toISODate,
  todayISO,
  monthKey,
  formatAttendanceClassLabel,
  dedupeAttendance,
  findExactAttendance,
  findDuplicateSessions,
} from "@/lib/utils/attendance";
import type { ClassResponse } from "@/types/entities/class";
import type { SubjectResponse } from "@/types/entities/subject";
import type { TeacherResponse } from "@/types/entities/teacher";
import type { StudentResponse } from "@/types/entities/student";
import type {
  AttendanceResponse,
  AttendanceStatus,
} from "@/types/entities/attendance";

const PAGE_SIZE = 10;

export default function AttendancePage() {
  const [token, setToken] = useState("");
  const [markedBy, setMarkedBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [classes, setClasses] = useState<ClassResponse[]>([]);
  const [allStudents, setAllStudents] = useState<StudentResponse[]>([]);
  const [allSubjects, setAllSubjects] = useState<SubjectResponse[]>([]);
  const [classSubjects, setClassSubjects] = useState<SubjectResponse[]>([]);
  const [classTeachers, setClassTeachers] = useState<TeacherResponse[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceResponse[]>([]);

  const [academicYear, setAcademicYear] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [dateDisplay, setDateDisplay] = useState(
    new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  );
  const [viewType, setViewType] = useState("Daily");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("1");

  const [currentPage, setCurrentPage] = useState(1);

  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState<StudentResponse | null>(null);
  const [editStudent, setEditStudent] = useState<StudentResponse | null>(null);
  const [historyStudent, setHistoryStudent] = useState<StudentResponse | null>(null);
  const [reportMode, setReportMode] = useState<ReportMode>("report");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isStudentSelectorOpen, setIsStudentSelectorOpen] = useState(false);
  const [selectorStudentId, setSelectorStudentId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTeacher, setFilterTeacher] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("edtech_access_token");
    if (storedToken) setToken(storedToken);
    const user = getStoredUser();
    if (user?.id) setMarkedBy(user.id);
  }, []);

  const loadClassAttendance = useCallback(
    async (classId: string) => {
      if (!token || !classId) return;
      const data = await getAttendanceByClass(token, classId);
      setAttendanceRecords(data);
    },
    [token],
  );

  const loadClassData = useCallback(
    async (classId: string) => {
      if (!token || !classId) return;
      setLoading(true);
      setError(null);
      try {
        const [subjectData, teacherData, attendanceData] = await Promise.all([
          getClassSubjects(token, classId),
          getClassTeachers(token, classId),
          getAttendanceByClass(token, classId),
        ]);
        setClassSubjects(subjectData as unknown as SubjectResponse[]);
        setClassTeachers(teacherData as unknown as TeacherResponse[]);
        setAttendanceRecords(attendanceData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load class data.");
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    if (!token) return;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [classData, studentData, subjectData] = await Promise.allSettled([
          listClasses(token),
          listStudents(token),
          listSubjects(token),
        ]);
        if (classData.status === "fulfilled") setClasses(classData.value);
        else console.error("Failed to load classes", (classData as PromiseRejectedResult).reason);
        if (studentData.status === "fulfilled") setAllStudents(studentData.value);
        else console.error("Failed to load students", (studentData as PromiseRejectedResult).reason);
        if (subjectData.status === "fulfilled") setAllSubjects(subjectData.value);
        else console.error("Failed to load subjects", (subjectData as PromiseRejectedResult).reason);

        const firstClass =
          classData.status === "fulfilled" ? classData.value[0] : undefined;
        if (firstClass) {
          setSelectedClassId(firstClass.id);
          setAcademicYear(firstClass.academic_year || "");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load attendance data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  useEffect(() => {
    if (selectedClassId) {
      setSelectedSubjectId("");
      loadClassData(selectedClassId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClassId, token]);

  const selectedClass = useMemo(
    () => classes.find((c) => c.id === selectedClassId) ?? null,
    [classes, selectedClassId],
  );

  const dateISO = useMemo(() => toISODate(dateDisplay), [dateDisplay]);
  const today = useMemo(() => todayISO(), []);
  const selectedMonth = useMemo(() => monthKey(dateISO), [dateISO]);

  const dedupedRecords = useMemo(() => dedupeAttendance(attendanceRecords), [attendanceRecords]);

  const duplicateSessions = useMemo(
    () => findDuplicateSessions(attendanceRecords),
    [attendanceRecords],
  );

  useEffect(() => {
    if (duplicateSessions.length > 0) {
      console.warn(
        "[Attendance] Duplicate exact-session records detected. " +
          "Display uses the most recently updated record; duplicates are preserved. " +
          "IDs:",
        duplicateSessions.map((d) => ({ key: d.key, ids: d.ids, displayRecordId: d.displayRecordId })),
      );
    }
  }, [duplicateSessions]);

  const studentsInClass = useMemo(
    () => allStudents.filter((s) => String(s.class_id) === String(selectedClassId)),
    [allStudents, selectedClassId],
  );

  const subjectMap = useMemo(() => {
    const map = new Map<string, string>();
    allSubjects.forEach((s) => map.set(s.id, s.subject_name));
    classSubjects.forEach((s) => map.set(s.id, s.subject_name));
    return map;
  }, [allSubjects, classSubjects]);

  const teacherMap = useMemo(() => {
    const map = new Map<string, string>();
    classTeachers.forEach((t) => map.set(t.id, t.employee_id));
    return map;
  }, [classTeachers]);

  const subjectColumns = useMemo<AttendanceSubjectColumn[]>(() => {
    const source = selectedSubjectId
      ? classSubjects.filter((s) => s.id === selectedSubjectId)
      : classSubjects;
    return source.map((s) => ({ id: s.id, name: s.subject_name }));
  }, [classSubjects, selectedSubjectId]);

  const subjectFilterOptions = useMemo<SelectItem[]>(
    () => classSubjects.map((s) => ({ value: s.id, label: s.subject_name })),
    [classSubjects],
  );

  const tableRows = useMemo<AttendanceTableRow[]>(() => {
    return studentsInClass.map((student) => {
      const sessionRecords = dedupedRecords.filter(
        (r) =>
          r.student_id === student.id &&
          r.class_id === selectedClassId &&
          r.attendance_date === dateISO &&
          String(r.period_no) === String(selectedPeriod),
      );

      const filteredRecords = sessionRecords.filter((r) => {
        if (filterStatus && r.status !== filterStatus) return false;
        if (filterTeacher && r.teacher_id !== filterTeacher) return false;
        if (filterSubject && r.subject_id !== filterSubject) return false;
        if (filterStartDate && r.attendance_date < filterStartDate) return false;
        if (filterEndDate && r.attendance_date > filterEndDate) return false;
        return true;
      });

      const subjectStatuses: Record<string, AttendanceStatus | null> = {};
      subjectColumns.forEach((subj) => {
        if (selectedSubjectId && subj.id !== selectedSubjectId) return;
        const rec = findExactAttendance(dedupedRecords, {
          student_id: student.id,
          class_id: selectedClassId,
          subject_id: subj.id,
          attendance_date: dateISO,
          period_no: selectedPeriod,
        });
        subjectStatuses[subj.id] = rec ? rec.status : null;
      });

      const summaryRecords = filteredRecords.filter(
        (r) => !selectedSubjectId || r.subject_id === selectedSubjectId,
      );
      const presentCount = summaryRecords.filter(
        (r) => r.status === "PRESENT" || r.status === "LATE",
      ).length;
      const absentCount = summaryRecords.filter((r) => r.status === "ABSENT").length;
      const lateCount = summaryRecords.filter((r) => r.status === "LATE").length;
      const total = summaryRecords.length;
      const overallPercentage = total > 0 ? Math.round((presentCount / total) * 100) : null;

      return {
        studentId: student.id,
        rollNo: student.roll_no || student.admission_no || student.id.slice(0, 4),
        studentName:
          `${student.first_name || ""} ${student.last_name || ""}`.trim() ||
          student.admission_no ||
          "Unknown",
        subjects: subjectStatuses,
        presentCount,
        absentCount,
        lateCount,
        overallPercentage,
      };
    });
  }, [studentsInClass, dedupedRecords, subjectColumns, selectedClassId, dateISO, selectedSubjectId, selectedPeriod, filterStatus, filterTeacher, filterSubject, filterStartDate, filterEndDate]);

  const filteredTableRows = useMemo(() => {
    if (!appliedSearch) return tableRows;
    const q = appliedSearch.toLowerCase();
    return tableRows.filter((row) => {
      if (row.studentName.toLowerCase().includes(q)) return true;
      if (row.rollNo.toLowerCase().includes(q)) return true;
      for (const [subjectId, status] of Object.entries(row.subjects)) {
        const subjectName = (subjectMap.get(subjectId) || "").toLowerCase();
        if (subjectName.includes(q)) return true;
        if (status && status.toLowerCase().includes(q)) return true;
      }
      if (row.overallPercentage !== null && `${row.overallPercentage}%`.includes(q)) return true;
      if (`${row.presentCount}`.includes(q)) return true;
      if (`${row.absentCount}`.includes(q)) return true;
      if (`${row.lateCount}`.includes(q)) return true;
      return false;
    });
  }, [tableRows, appliedSearch, subjectMap]);

  const academicYears = useMemo(() => {
    const years = new Set(classes.map((c) => c.academic_year).filter(Boolean));
    return Array.from(years);
  }, [classes]);

  const academicYearOptions = useMemo<SelectItem[]>(
    () => academicYears.map((y) => ({ value: y, label: y })),
    [academicYears],
  );

  const classOptions = useMemo<SelectItem[]>(() => {
    const filtered = academicYear
      ? classes.filter((c) => c.academic_year === academicYear)
      : classes;
    return filtered.map((c) => ({
      value: c.id,
      label: formatAttendanceClassLabel(c.class_name, c.section),
    }));
  }, [classes, academicYear]);

  const classLabel = selectedClass
    ? formatAttendanceClassLabel(selectedClass.class_name, selectedClass.section)
    : "";

  const activeFilterCount = useMemo(
    () =>
      [filterStatus, filterTeacher, filterPeriod, filterSubject, filterStartDate, filterEndDate].filter(
        (v) => v !== "" && v != null,
      ).length,
    [filterStatus, filterTeacher, filterPeriod, filterSubject, filterStartDate, filterEndDate],
  );

  const recordsInScope = useMemo(
    () =>
      dedupedRecords.filter(
        (r) =>
          r.class_id === selectedClassId &&
          r.attendance_date === dateISO &&
          String(r.period_no) === (filterPeriod || String(selectedPeriod)) &&
          (!selectedSubjectId || r.subject_id === selectedSubjectId) &&
          (!filterStatus || r.status === filterStatus) &&
          (!filterTeacher || r.teacher_id === filterTeacher) &&
          (!filterSubject || r.subject_id === filterSubject) &&
          (!filterStartDate || r.attendance_date >= filterStartDate) &&
          (!filterEndDate || r.attendance_date <= filterEndDate),
      ),
    [dedupedRecords, selectedClassId, dateISO, selectedSubjectId, filterStatus, filterTeacher, filterPeriod, filterSubject, filterStartDate, filterEndDate, selectedPeriod],
  );

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTableRows.slice(start, start + PAGE_SIZE);
  }, [filteredTableRows, currentPage]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredTableRows.length / PAGE_SIZE)),
    [filteredTableRows.length],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredTableRows.length]);

  const todayRecords = useMemo(
    () => dedupedRecords.filter((r) => r.attendance_date === today && r.class_id === selectedClassId),
    [dedupedRecords, today, selectedClassId],
  );

  const monthRecords = useMemo(
    () =>
      dedupedRecords.filter(
        (r) => monthKey(r.attendance_date) === selectedMonth && r.class_id === selectedClassId,
      ),
    [dedupedRecords, selectedMonth, selectedClassId],
  );

  const summaryCards = useMemo<SummaryCardItem[]>(() => {
    const presentToday = todayRecords.filter(
      (r) => r.status === "PRESENT" || r.status === "LATE",
    ).length;
    const absentToday = todayRecords.filter((r) => r.status === "ABSENT").length;
    const lateToday = todayRecords.filter((r) => r.status === "LATE").length;
    const todayTotal = todayRecords.length;
    const todayPercentage = todayTotal > 0 ? Math.round((presentToday / todayTotal) * 100) : 0;

    const monthPresent = monthRecords.filter(
      (r) => r.status === "PRESENT" || r.status === "LATE",
    ).length;
    const monthTotal = monthRecords.length;
    const monthAvg = monthTotal > 0 ? Math.round((monthPresent / monthTotal) * 100) : 0;

    return [
      {
        title: "Today's Attendance",
        value: `${todayPercentage}%`,
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        ),
        iconBg: "bg-purple-100",
        iconColor: "text-[#6d28d9]",
        trend: todayTotal > 0 ? `${todayTotal} records today` : "No records today",
      },
      {
        title: "This Month Average",
        value: `${monthAvg}%`,
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
        ),
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        trend: monthTotal > 0 ? `${monthTotal} records this month` : "No records this month",
      },
      {
        title: "Total Students",
        value: studentsInClass.length.toLocaleString(),
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        trend: selectedClass ? "in selected class" : "no class selected",
      },
      {
        title: "Present Today",
        value: presentToday.toLocaleString(),
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <polyline points="16 11 18 13 22 9" />
          </svg>
        ),
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        trend: todayTotal > 0 ? `${todayPercentage}% of marked` : "0 marked",
      },
      {
        title: "Absent Today",
        value: absentToday.toLocaleString(),
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="17" x2="22" y1="8" y2="13" />
            <line x1="22" x2="17" y1="13" y2="8" />
          </svg>
        ),
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        trend: todayTotal > 0 ? `${todayTotal > 0 ? Math.round((absentToday / todayTotal) * 100) : 0}% of marked` : "0 marked",
      },
      {
        title: "Late Today",
        value: lateToday.toLocaleString(),
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        ),
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        trend: todayTotal > 0 ? `${todayTotal > 0 ? Math.round((lateToday / todayTotal) * 100) : 0}% of marked` : "0 marked",
      },
    ];
  }, [todayRecords, monthRecords, studentsInClass.length, selectedClass, today]);

  const trendData = useMemo(() => {
    const byDay = new Map<string, { present: number; total: number }>();
    monthRecords.forEach((r) => {
      const d = r.attendance_date.slice(-2);
      const cur = byDay.get(d) ?? { present: 0, total: 0 };
      cur.total += 1;
      if (r.status === "PRESENT" || r.status === "LATE") cur.present += 1;
      byDay.set(d, cur);
    });
    return Array.from(byDay.entries())
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([day, v]) => ({
        label: day,
        value: v.total > 0 ? Math.round((v.present / v.total) * 100) : 0,
      }));
  }, [monthRecords]);

  const classPerformance = useMemo(() => {
    const map = new Map<string, { present: number; total: number }>();
    monthRecords.forEach((r) => {
      const key = r.class_id;
      const cur = map.get(key) ?? { present: 0, total: 0 };
      cur.total += 1;
      if (r.status === "PRESENT" || r.status === "LATE") cur.present += 1;
      map.set(key, cur);
    });
    return Array.from(map.entries()).map(([id, v]) => ({
      label: selectedClass ? `${selectedClass.class_name}${selectedClass.section}` : id.slice(0, 4),
      value: v.total > 0 ? Math.round((v.present / v.total) * 100) : 0,
    }));
  }, [monthRecords, selectedClass]);

  const topClasses = useMemo(() => {
    if (!classPerformance.length) return [];
    return [...classPerformance]
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
      .map((c) => ({ name: c.label, attendance: `${c.value}%` }));
  }, [classPerformance]);

  const handleSearch = useCallback(() => {
    setAppliedSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (!value) setAppliedSearch("");
  }, []);

  const handleMarkAttendance = useCallback(
    async (payload: MarkAttendancePayload) => {
      if (!token || submitting) return;
      setSubmitting(true);
      setError(null);
      try {
        await createBulkAttendance(token, {
          class_id: payload.class_id,
          subject_id: payload.subject_id,
          teacher_id: payload.teacher_id,
          attendance_date: payload.attendance_date,
          period_no: payload.period_no,
          marked_by: payload.marked_by,
          records: payload.records,
        });
        setSuccess("Attendance marked successfully.");
        setIsMarkModalOpen(false);
        setTimeout(() => setSuccess(null), 3000);
        if (payload.class_id === selectedClassId) {
          await loadClassData(selectedClassId);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to mark attendance.");
      } finally {
        setSubmitting(false);
      }
    },
    [token, selectedClassId, loadClassData, submitting],
  );

  const refreshData = useCallback(async () => {
    if (selectedClassId) await loadClassData(selectedClassId);
  }, [selectedClassId, loadClassData]);

  const handleQuickAction = useCallback(
    (action: string) => {
      switch (action) {
        case "Mark Attendance":
        case "Bulk Attendance":
          setIsMarkModalOpen(true);
          break;
        case "Attendance Report":
          setReportMode("report");
          setIsReportOpen(true);
          break;
        case "Daily Summary":
          setReportMode("daily");
          setIsReportOpen(true);
          break;
        case "Monthly Report":
          setReportMode("monthly");
          setIsReportOpen(true);
          break;
        case "Student Attendance":
          setSelectorStudentId("");
          setIsStudentSelectorOpen(true);
          break;
        case "Export Data":
          exportCSV();
          break;
        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedClassId, dateISO, selectedSubjectId],
  );

  const exportCSV = useCallback(() => {
    if (recordsInScope.length === 0) {
      setError("No attendance records to export for the current filters.");
      setTimeout(() => setError(null), 3000);
      return;
    }
    const header = ["Student", "Roll No", "Subject", "Date", "Period", "Status", "Teacher", "Marked By"];
    const lines = recordsInScope.map((r) => [
      allStudents.find((s) => s.id === r.student_id)
        ? `${allStudents.find((s) => s.id === r.student_id)!.first_name || ""} ${allStudents.find((s) => s.id === r.student_id)!.last_name || ""}`.trim()
        : r.student_id,
      allStudents.find((s) => s.id === r.student_id)?.roll_no || "",
      subjectMap.get(r.subject_id) || r.subject_id,
      r.attendance_date,
      String(r.period_no),
      r.status,
      teacherMap.get(r.teacher_id) || r.teacher_id,
      r.marked_by,
    ]);
    const csv = [header, ...lines]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `attendance_${selectedClassId || "export"}_${dateISO}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [recordsInScope, allStudents, subjectMap, teacherMap, selectedClassId, dateISO]);

  const handleAcademicYearChange = (value: string) => {
    setAcademicYear(value);
    setSelectedClassId("");
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#6d28d9]" />
      </div>
    );
  }

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <AttendancePageHeader onMarkAttendance={() => setIsMarkModalOpen(true)} />

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-[#6d28d9]" />
            </div>
          ) : (
            <>
              <AttendanceSummaryCards cards={summaryCards} />

              <AttendanceFilters
                academicYear={academicYear}
                academicYearOptions={academicYearOptions}
                onAcademicYearChange={handleAcademicYearChange}
                className={selectedClassId}
                classOptions={classOptions}
                onClassChange={setSelectedClassId}
                date={dateDisplay}
                onDateChange={setDateDisplay}
                viewType={viewType}
                viewTypeOptions={["Daily", "Weekly", "Monthly"]}
                onViewTypeChange={setViewType}
                subject={selectedSubjectId}
                subjectOptions={subjectFilterOptions}
                onSubjectChange={setSelectedSubjectId}
                onSearch={handleSearch}
                onToggleFilters={() => setShowFilters((v) => !v)}
                filterCount={activeFilterCount}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />

              <div className="flex items-center gap-3 mb-6">
                <label className="text-xs font-semibold text-slate-700">Period</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="h-10 w-36 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#6d28d9] focus:ring-2 focus:ring-purple-100"
                >
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((p) => (
                    <option key={p} value={p}>Period {p}</option>
                  ))}
                </select>
              </div>

              {showFilters && (
                <div className="bg-white rounded-xl border border-slate-100 p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-900">Advanced Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-slate-700">Attendance Status</label>
                      <Dropdown
                        value={filterStatus}
                        items={[
                          { value: "", label: "All" },
                          { value: "PRESENT", label: "Present" },
                          { value: "ABSENT", label: "Absent" },
                          { value: "LATE", label: "Late" },
                        ]}
                        placeholder="All"
                        onChange={setFilterStatus}
                        className="text-sm w-full"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-slate-700">Teacher</label>
                      <Dropdown
                        value={filterTeacher}
                        items={[
                          { value: "", label: "All Teachers" },
                          ...classTeachers.map((t) => ({
                            value: t.id,
                            label: t.employee_id || t.id,
                          })),
                        ]}
                        placeholder="All Teachers"
                        onChange={setFilterTeacher}
                        className="text-sm w-full"
                        disabled={classTeachers.length === 0}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-slate-700">Period</label>
                      <input
                        type="text"
                        value={filterPeriod}
                        onChange={(e) => setFilterPeriod(e.target.value)}
                        placeholder="e.g. 1"
                        className="text-sm rounded-lg border border-slate-200 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-slate-700">Subject</label>
                      <Dropdown
                        value={filterSubject}
                        items={[
                          { value: "", label: "All Subjects" },
                          ...classSubjects.map((s) => ({ value: s.id, label: s.subject_name })),
                        ]}
                        placeholder="All Subjects"
                        onChange={setFilterSubject}
                        className="text-sm w-full"
                        disabled={classSubjects.length === 0}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-slate-700">Start Date</label>
                      <input
                        type="date"
                        value={filterStartDate}
                        onChange={(e) => setFilterStartDate(e.target.value)}
                        className="text-sm rounded-lg border border-slate-200 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold text-slate-700">End Date</label>
                      <input
                        type="date"
                        value={filterEndDate}
                        onChange={(e) => setFilterEndDate(e.target.value)}
                        min={filterStartDate || undefined}
                        className="text-sm rounded-lg border border-slate-200 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 mt-4">
                    <button
                      onClick={() => {
                        setFilterStatus("");
                        setFilterTeacher("");
                        setFilterPeriod("");
                        setFilterSubject("");
                        setFilterStartDate("");
                        setFilterEndDate("");
                      }}
                      className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
                    >
                      Apply Filter
                    </button>
                  </div>
                </div>
              )}

              <AttendanceTable
                rows={paginatedRows}
                subjects={subjectColumns}
                searchActive={!!appliedSearch}
                onView={(row) =>
                  setViewStudent(studentsInClass.find((s) => s.id === row.studentId) ?? null)
                }
                onEdit={(row) =>
                  setEditStudent(studentsInClass.find((s) => s.id === row.studentId) ?? null)
                }
                onHistory={(row) =>
                  setHistoryStudent(studentsInClass.find((s) => s.id === row.studentId) ?? null)
                }
              />

              <AttendancePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />

              <AttendanceFooter
                trendData={trendData}
                classPerformance={classPerformance}
                topClasses={topClasses}
                onQuickAction={handleQuickAction}
                settingsDisabled
              />
            </>
          )}
        </div>
      </div>

      <MarkAttendanceModal
        open={isMarkModalOpen}
        onClose={() => setIsMarkModalOpen(false)}
        onSubmit={handleMarkAttendance}
        onRequestEdit={(studentId) => {
          setIsMarkModalOpen(false);
          setEditStudent(studentsInClass.find((s) => s.id === studentId) ?? null);
        }}
        token={token}
        classes={classes}
        defaultClassId={selectedClassId}
        defaultDateISO={dateISO}
        attendanceRecords={attendanceRecords}
        markedBy={markedBy}
      />

      <AttendanceViewDrawer
        open={!!viewStudent}
        onClose={() => setViewStudent(null)}
        token={token}
        student={viewStudent}
        classId={selectedClassId}
        dateISO={dateISO}
        subjectId={selectedSubjectId || undefined}
        subjectMap={subjectMap}
        teacherMap={teacherMap}
        onChanged={refreshData}
      />

      <AttendanceEditDialog
        open={!!editStudent}
        onClose={() => setEditStudent(null)}
        token={token}
        student={editStudent}
        classId={selectedClassId}
        dateISO={dateISO}
        subjectId={selectedSubjectId || undefined}
        period={selectedPeriod}
        subjectMap={subjectMap}
        onChanged={refreshData}
        onMarkAttendance={() => {
          setEditStudent(null);
          setIsMarkModalOpen(true);
        }}
      />

      <AttendanceHistoryDrawer
        open={!!historyStudent}
        onClose={() => setHistoryStudent(null)}
        token={token}
        student={historyStudent}
        classId={selectedClassId}
        dateISO={dateISO}
        subjectMap={subjectMap}
        teacherMap={teacherMap}
        onChanged={refreshData}
      />

      <AttendanceReportDrawer
        open={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        token={token}
        mode={reportMode}
        classId={selectedClassId}
        dateISO={dateISO}
        subjects={classSubjects.map((s) => ({ id: s.id, name: s.subject_name }))}
        classLabel={classLabel}
      />

      <Modal open={isStudentSelectorOpen} onClose={() => setIsStudentSelectorOpen(false)} title="Select Student">
        <div className="space-y-4">
          <Dropdown
            value={selectorStudentId}
            items={studentsInClass.map((s) => ({
              value: s.id,
              label:
                `${s.first_name || ""} ${s.last_name || ""}`.trim() || s.admission_no || "Unknown",
            }))}
            placeholder={studentsInClass.length ? "Select a student" : "No students enrolled"}
            disabled={studentsInClass.length === 0}
            onChange={setSelectorStudentId}
            className="text-sm w-full"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsStudentSelectorOpen(false)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const stu = studentsInClass.find((s) => s.id === selectorStudentId) ?? null;
                setIsStudentSelectorOpen(false);
                setHistoryStudent(stu);
              }}
              disabled={!selectorStudentId}
              className="rounded-lg bg-[#6d28d9] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-70"
            >
              View History
            </button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
}
