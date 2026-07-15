"use client";

import { useState, useMemo } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import ExaminationsPageHeader from "@/components/dashboard/examinations/ExaminationsPageHeader";
import ExaminationSummaryCards from "@/components/dashboard/examinations/ExaminationSummaryCards";
import ExaminationFilters from "@/components/dashboard/examinations/ExaminationFilters";
import ExaminationsTable from "@/components/dashboard/examinations/ExaminationsTable";
import ExaminationPagination from "@/components/dashboard/examinations/ExaminationPagination";
import UpcomingExamsCard from "@/components/dashboard/examinations/UpcomingExamsCard";
import ExaminationTypesChart from "@/components/dashboard/examinations/ExaminationTypesChart";
import ExaminationOverviewChart from "@/components/dashboard/examinations/ExaminationOverviewChart";
import ResultsStatusChart from "@/components/dashboard/examinations/ResultsStatusChart";
import StudentsAppearedCard from "@/components/dashboard/examinations/StudentsAppearedCard";
import TopSubjectsCard from "@/components/dashboard/examinations/TopSubjectsCard";
import ExaminationQuickActions from "@/components/dashboard/examinations/ExaminationQuickActions";
import CreateExaminationDialog from "@/components/dashboard/examinations/CreateExaminationDialog";
import ExaminationDetailsDialog from "@/components/dashboard/examinations/ExaminationDetailsDialog";
import EditExaminationDialog from "@/components/dashboard/examinations/EditExaminationDialog";
import DeleteExaminationDialog from "@/components/dashboard/examinations/DeleteExaminationDialog";
import ExaminationActionDialog from "@/components/dashboard/examinations/ExaminationActionDialog";
import { EXAMINATION_ROWS } from "@/lib/fixtures/examinations-reference-fixture";
import type { ExaminationRow } from "@/lib/fixtures/examinations-reference-fixture";

const ITEMS_PER_PAGE = 10;

export default function ExaminationsPage() {
  const [rows, setRows] = useState<ExaminationRow[]>(EXAMINATION_ROWS);
  const [currentPage, setCurrentPage] = useState(1);

  const [createOpen, setCreateOpen] = useState(false);
  const [viewRow, setViewRow] = useState<ExaminationRow | null>(null);
  const [editRow, setEditRow] = useState<ExaminationRow | null>(null);
  const [deleteRow, setDeleteRow] = useState<ExaminationRow | null>(null);
  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
  const [upcomingViewAllOpen, setUpcomingViewAllOpen] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [quickActionTitle, setQuickActionTitle] = useState("");

  const [filters, setFilters] = useState({
    academicYear: "2025-26",
    examType: "",
    classGrade: "",
    term: "",
    status: "",
    search: "",
  });

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (filters.examType && row.type !== filters.examType) return false;
      if (filters.classGrade && row.classGrade !== filters.classGrade) return false;
      if (filters.term && row.term !== filters.term) return false;
      if (filters.status && row.status !== filters.status) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        return (
          row.examCode.toLowerCase().includes(q) ||
          row.examName.toLowerCase().includes(q) ||
          row.type.toLowerCase().includes(q) ||
          row.classGrade.toLowerCase().includes(q) ||
          row.term.toLowerCase().includes(q) ||
          row.status.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [rows, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageRows = filteredRows.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const handleCreate = (newRow: ExaminationRow) => {
    setRows((prev) => [newRow, ...prev]);
    setCurrentPage(1);
  };

  const handleEdit = (updated: ExaminationRow) => {
    setRows((prev) => prev.map((r) => (r.examCode === updated.examCode ? updated : r)));
  };

  const handleDelete = () => {
    if (!deleteRow) return;
    setRows((prev) => prev.filter((r) => r.examCode !== deleteRow.examCode));
    setDeleteRow(null);
  };

  const handleQuickAction = (action: string) => {
    setQuickActionTitle(action);
    setQuickActionOpen(true);
  };

  const summaryCards = [
    {
      title: "Total Examinations",
      value: String(rows.length),
      footer: "All time",
      iconBg: "bg-purple-50",
      iconColor: "text-[#7c3aed]",
      sparkline: [20, 25, 22, 28, 24, 26, 28],
      sparkColor: "#7c3aed",
    },
    {
      title: "Active Exams",
      value: String(rows.filter((r) => r.status === "Ongoing").length),
      footer: "Currently running",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      sparkline: [2, 3, 2, 4, 3, 5, 7],
      sparkColor: "#f97316",
    },
    {
      title: "Completed",
      value: String(rows.filter((r) => r.status === "Completed").length),
      footer: "All time",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
      sparkline: [5, 8, 10, 12, 15, 18, 21],
      sparkColor: "#10b981",
    },
    {
      title: "Students Appeared",
      value: "1,245",
      footer: "Total enrollments",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      sparkline: [800, 950, 1100, 1200, 1350, 1400, 1245],
      sparkColor: "#3b82f6",
    },
    {
      title: "Average Score",
      value: "16",
      footer: "Percentage",
      iconBg: "bg-pink-50",
      iconColor: "text-pink-500",
      sparkline: [10, 12, 14, 13, 15, 14, 16],
      sparkColor: "#ec4899",
    },
  ];

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <ExaminationsPageHeader
            onCreateExamination={() => setCreateOpen(true)}
            onMoreOptions={() => setMoreOptionsOpen(true)}
          />

          <ExaminationSummaryCards cards={summaryCards} />

          <ExaminationFilters
            onSearch={() => {}}
            onFilter={() => {}}
            academicYear={filters.academicYear}
            onAcademicYearChange={(value) => setFilters((f) => ({ ...f, academicYear: value, search: "" }))}
            examType={filters.examType}
            onExamTypeChange={(value) => setFilters((f) => ({ ...f, examType: value, search: "" }))}
            classGrade={filters.classGrade}
            onClassGradeChange={(value) => setFilters((f) => ({ ...f, classGrade: value, search: "" }))}
            term={filters.term}
            onTermChange={(value) => setFilters((f) => ({ ...f, term: value, search: "" }))}
            status={filters.status}
            onStatusChange={(value) => setFilters((f) => ({ ...f, status: value, search: "" }))}
            searchQuery={filters.search}
            onSearchQueryChange={(value) => setFilters((f) => ({ ...f, search: value }))}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <ExaminationsTable
                rows={pageRows}
                loading={false}
                onView={(row) => setViewRow(row)}
                onEdit={(row) => setEditRow(row)}
                onDelete={(row) => setDeleteRow(row)}
              />
              <ExaminationPagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredRows.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
            <div className="space-y-6">
              <UpcomingExamsCard onViewAll={() => setUpcomingViewAllOpen(true)} />
              <ExaminationTypesChart />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
            <ExaminationOverviewChart />
            <ResultsStatusChart />
            <StudentsAppearedCard />
            <TopSubjectsCard />
          </div>

          <div className="mt-6">
            <ExaminationQuickActions onAction={handleQuickAction} />
          </div>
        </div>
      </div>

      <CreateExaminationDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />

      <ExaminationDetailsDialog
        open={!!viewRow}
        onClose={() => setViewRow(null)}
        row={viewRow}
      />

      <EditExaminationDialog
        open={!!editRow}
        onClose={() => setEditRow(null)}
        row={editRow}
        onSave={handleEdit}
      />

      <DeleteExaminationDialog
        open={!!deleteRow}
        onClose={() => setDeleteRow(null)}
        row={deleteRow}
        onConfirm={handleDelete}
      />

      <ExaminationActionDialog
        open={moreOptionsOpen}
        onClose={() => setMoreOptionsOpen(false)}
        title="More Options"
        message="Additional examination management options will be available here in a future update."
      />

      <ExaminationActionDialog
        open={upcomingViewAllOpen}
        onClose={() => setUpcomingViewAllOpen(false)}
        title="Upcoming Exams"
        message="A full calendar view of upcoming examinations will be available here in a future update."
      />

      <ExaminationActionDialog
        open={quickActionOpen}
        onClose={() => setQuickActionOpen(false)}
        title={quickActionTitle}
        message={`The "${quickActionTitle}" workflow will be connected to the backend in the integration phase.`}
      />
    </MainLayout>
  );
}
