"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import AttendancePageHeader from "@/components/dashboard/academics/attendance/AttendancePageHeader";
import AttendanceSummaryCards from "@/components/dashboard/academics/attendance/AttendanceSummaryCards";
import AttendanceFilters from "@/components/dashboard/academics/attendance/AttendanceFilters";
import AttendanceTable from "@/components/dashboard/academics/attendance/AttendanceTable";
import AttendancePagination from "@/components/dashboard/academics/attendance/AttendancePagination";
import AttendanceOverviewChart from "@/components/dashboard/academics/attendance/AttendanceOverviewChart";
import AttendanceTrendChart from "@/components/dashboard/academics/attendance/AttendanceTrendChart";
import TopPerformingClasses from "@/components/dashboard/academics/attendance/TopPerformingClasses";
import AttendanceQuickActions from "@/components/dashboard/academics/attendance/AttendanceQuickActions";
import { listClasses, getClassSubjects } from "@/lib/services/classService";
import type { ClassResponse } from "@/types/entities/class";
import type { ClassSubjectSummary } from "@/types/entities/class-subject-summary";
import type { StudentResponse } from "@/types/entities/student";

const ITEMS_PER_PAGE = 10;

export default function AttendancePage() {
  const [token, setToken] = useState("");
  const [classes, setClasses] = useState<ClassResponse[]>([]);
  const [classSubjects, setClassSubjects] = useState<ClassSubjectSummary[]>([]);
  const [students, setStudents] = useState<StudentResponse[]>([]);

  const [classesLoading, setClassesLoading] = useState(false);
  const [classesError, setClassesError] = useState<string | null>(null);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const [subjectsError, setSubjectsError] = useState<string | null>(null);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentsError, setStudentsError] = useState<string | null>(null);

  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return `${now.getDate()} ${now.toLocaleString("en-US", { month: "short" })} ${now.getFullYear()}`;
  });
  const [viewType, setViewType] = useState("Daily View");

  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Load token
  useEffect(() => {
    const storedToken = localStorage.getItem("edtech_access_token");
    if (storedToken) setToken(storedToken);
  }, []);

  // Load classes
  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    const loadClasses = async () => {
      setClassesLoading(true);
      setClassesError(null);
      try {
        const data = await listClasses(token);
        if (!cancelled) {
          setClasses(data);
          if (data.length > 0 && !selectedClassId) {
            setSelectedClassId(data[0].id);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setClassesError(err instanceof Error ? err.message : "Unable to load classes.");
        }
      } finally {
        if (!cancelled) setClassesLoading(false);
      }
    };
    loadClasses();
    return () => { cancelled = true; };
  }, [token]);

  // Extract academic years from classes
  const academicYearOptions = useMemo(() => {
    const years = new Set(classes.map((c) => c.academic_year).filter(Boolean));
    return Array.from(years).sort().reverse();
  }, [classes]);

  // Load class subjects and students when class changes
  useEffect(() => {
    if (!token || !selectedClassId) {
      setClassSubjects([]);
      setStudents([]);
      setSelectedSubjectId("");
      return;
    }
    let cancelled = false;
    const loadDependent = async () => {
      setSubjectsLoading(true);
      setStudentsLoading(true);
      setSubjectsError(null);
      setStudentsError(null);
      try {
        const [subjectsData, studentsData] = await Promise.allSettled([
          getClassSubjects(token, selectedClassId),
          fetch(`/api/students?class_id=${encodeURIComponent(selectedClassId)}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then(async (res) => {
            if (!res.ok) return [];
            const text = await res.text();
            if (!text) return [];
            return JSON.parse(text) as StudentResponse[];
          }),
        ]);

        if (!cancelled) {
          if (subjectsData.status === "fulfilled") {
            setClassSubjects(subjectsData.value);
          } else {
            setClassSubjects([]);
            setSubjectsError("Unable to load subjects.");
          }
          if (studentsData.status === "fulfilled") {
            setStudents(studentsData.value);
          } else {
            setStudents([]);
            setStudentsError("Unable to load students.");
          }
        }
      } catch {
        if (!cancelled) {
          setSubjectsError("Unable to load subjects.");
          setStudentsError("Unable to load students.");
        }
      } finally {
        if (!cancelled) {
          setSubjectsLoading(false);
          setStudentsLoading(false);
        }
      }
    };
    loadDependent();
    return () => { cancelled = true; };
  }, [token, selectedClassId]);

  const handleSearch = useCallback(() => {
    setSearchOpen((prev) => !prev);
  }, []);

  const handleFilter = useCallback(() => {
    setFilterOpen((prev) => !prev);
  }, []);

  const handleClassChange = useCallback((classId: string) => {
    setSelectedClassId(classId);
    setCurrentPage(1);
  }, []);

  const classOptions = useMemo(() => {
    return classes.map((c) => ({
      value: c.id,
      label: `${c.class_name} — ${c.section}`,
    }));
  }, [classes]);

  const subjectOptions = useMemo(() => {
    return classSubjects.map((s) => ({
      value: s.id,
      label: s.subject_name,
    }));
  }, [classSubjects]);

  const selectedClass = useMemo(() => classes.find((c) => c.id === selectedClassId) ?? null, [classes, selectedClassId]);

  const totalPages = Math.max(1, Math.ceil(students.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <AttendancePageHeader onMarkAttendance={() => alert("Mark Attendance clicked — UI only, no backend connected.")} />

          <AttendanceSummaryCards
            cards={[
              { title: "Today's Attendance", value: "—", footer: "No data", iconBg: "bg-purple-50", iconColor: "text-[#7c3aed]", sparkline: [], sparkColor: "#7c3aed" },
              { title: "This Month Average", value: "—", footer: "No data", iconBg: "bg-emerald-50", iconColor: "text-emerald-500", sparkline: [], sparkColor: "#10b981" },
              { title: "Total Students", value: students.length > 0 ? String(students.length) : "—", footer: students.length > 0 ? "Loaded from backend" : "No data", iconBg: "bg-blue-50", iconColor: "text-blue-500", sparkline: [], sparkColor: "#3b82f6" },
              { title: "Present Today", value: "—", footer: "No data", iconBg: "bg-orange-50", iconColor: "text-orange-500", sparkline: [], sparkColor: "#f97316" },
              { title: "Absent Today", value: "—", footer: "No data", iconBg: "bg-red-50", iconColor: "text-red-500", sparkline: [], sparkColor: "#ef4444" },
              { title: "Late Today", value: "—", footer: "No data", iconBg: "bg-teal-50", iconColor: "text-teal-500", sparkline: [], sparkColor: "#14b8a6" },
            ]}
          />

          <AttendanceFilters
            onSearch={handleSearch}
            onFilter={handleFilter}
            academicYearOptions={academicYearOptions}
            academicYear={selectedClass?.academic_year ?? ""}
            onAcademicYearChange={() => {}}
            academicYearLoading={false}
            classOptions={classOptions}
            classGrade={selectedClassId}
            onClassGradeChange={handleClassChange}
            classLoading={classesLoading}
            date={selectedDate}
            onDateChange={setSelectedDate}
            viewType={viewType}
            onViewTypeChange={setViewType}
            subjectOptions={subjectOptions}
            subject={selectedSubjectId}
            onSubjectChange={setSelectedSubjectId}
            subjectLoading={subjectsLoading}
          />

          <AttendanceTable
            rows={[]}
            subjects={classSubjects}
            loading={false}
            error={null}
            emptyMessage={!selectedClassId ? "Select a class and date to view attendance." : "No attendance records found for the selected filters."}
          />

          <AttendancePagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={students.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
            <AttendanceOverviewChart average={null} present={null} absent={null} late={null} />
            <AttendanceTrendChart comingSoon />
            <TopPerformingClasses comingSoon />
            <AttendanceQuickActions />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
