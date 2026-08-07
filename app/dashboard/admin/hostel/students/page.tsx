"use client";

import { useState, useMemo } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import HostelStudentsPageHeader from "@/components/dashboard/hostel/students/HostelStudentsPageHeader";
import HostelStudentsSummaryCards from "@/components/dashboard/hostel/students/HostelStudentsSummaryCards";
import HostelStudentsFilters from "@/components/dashboard/hostel/students/HostelStudentsFilters";
import HostelStudentsTable from "@/components/dashboard/hostel/students/HostelStudentsTable";
import StudentsByBlockChart from "@/components/dashboard/hostel/students/StudentsByBlockChart";
import HostelSummaryCard from "@/components/dashboard/hostel/students/HostelSummaryCard";
import HostelStudentsQuickActions from "@/components/dashboard/hostel/students/HostelStudentsQuickActions";
import HostelStudentsNoteCard from "@/components/dashboard/hostel/students/HostelStudentsNoteCard";
import RecentHostelCheckIns from "@/components/dashboard/hostel/students/RecentHostelCheckIns";
import AddHostelStudentDialog from "@/components/dashboard/hostel/students/AddHostelStudentDialog";
import EditHostelStudentDialog from "@/components/dashboard/hostel/students/EditHostelStudentDialog";
import HostelStudentDetailsDialog from "@/components/dashboard/hostel/students/HostelStudentDetailsDialog";
import RoomAllocationDialog from "@/components/dashboard/hostel/students/RoomAllocationDialog";
import RoomTransferDialog from "@/components/dashboard/hostel/students/RoomTransferDialog";
import BulkImportHostelStudentsDialog from "@/components/dashboard/hostel/students/BulkImportHostelStudentsDialog";
import HostelStudentsReportDialog from "@/components/dashboard/hostel/students/HostelStudentsReportDialog";
import type { HostelStudent } from "@/lib/fixtures/hostel-students-reference-fixture";

interface SummaryCard {
  title: string;
  value: string;
  footer: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  tint: string;
}

interface BlockSegment {
  label: string;
  value: number;
  color: string;
}

interface CheckInRow {
  id: string;
  studentName: string;
  roomNo: string;
  block: string;
  checkInDate: string;
  guardianName: string;
  contactNo: string;
}

interface QuickAction {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const HOSTEL_STUDENTS: HostelStudent[] = [
  {
    id: "1",
    admissionNo: "ADM2025O01",
    rollNo: "25",
    studentName: "Aditya Sharma",
    classSection: "XII - A",
    roomNo: "A-101",
    block: "Block A (Boys)",
    gender: "Male",
    dateOfBirth: "15/04/2007",
    contactNo: "9876543210",
    status: "Active",
    initials: "AS",
    checkInDate: "01/01/2025",
    guardianName: "Ramesh Sharma",
    guardianContact: "9876543201",
  },
  {
    id: "2",
    admissionNo: "ADM2025O02",
    rollNo: "26",
    studentName: "Ananya Gupta",
    classSection: "XI - B",
    roomNo: "A-102",
    block: "Block A (Boys)",
    gender: "Female",
    dateOfBirth: "22/08/2008",
    contactNo: "9876543211",
    status: "Active",
    initials: "AG",
    checkInDate: "02/01/2025",
    guardianName: "Suresh Gupta",
    guardianContact: "9876543202",
  },
  {
    id: "3",
    admissionNo: "ADM2025O03",
    rollNo: "27",
    studentName: "Rohan Verma",
    classSection: "X - A",
    roomNo: "A-103",
    block: "Block A (Boys)",
    gender: "Male",
    dateOfBirth: "10/02/2009",
    contactNo: "9876543212",
    status: "Active",
    initials: "RV",
    checkInDate: "03/01/2025",
    guardianName: "Anil Verma",
    guardianContact: "9876543203",
  },
  {
    id: "4",
    admissionNo: "ADM2025O04",
    rollNo: "28",
    studentName: "Sneha Patel",
    classSection: "X - B",
    roomNo: "A-104",
    block: "Block A (Boys)",
    gender: "Female",
    dateOfBirth: "05/06/2009",
    contactNo: "9876543213",
    status: "Active",
    initials: "SP",
    checkInDate: "04/01/2025",
    guardianName: "Kiran Patel",
    guardianContact: "9876543204",
  },
  {
    id: "5",
    admissionNo: "ADM2025O05",
    rollNo: "29",
    studentName: "Vikram Singh",
    classSection: "IX - A",
    roomNo: "B-201",
    block: "Block B (Boys)",
    gender: "Male",
    dateOfBirth: "18/11/2010",
    contactNo: "9876543214",
    status: "Active",
    initials: "VS",
    checkInDate: "05/01/2025",
    guardianName: "Mahesh Singh",
    guardianContact: "9876543205",
  },
  {
    id: "6",
    admissionNo: "ADM2025O06",
    rollNo: "30",
    studentName: "Meera Nair",
    classSection: "IX - B",
    roomNo: "B-202",
    block: "Block B (Boys)",
    gender: "Female",
    dateOfBirth: "25/01/2011",
    contactNo: "9876543215",
    status: "Inactive",
    initials: "MN",
    checkInDate: "06/01/2025",
    guardianName: "Rajesh Nair",
    guardianContact: "9876543206",
  },
  {
    id: "7",
    admissionNo: "ADM2025O07",
    rollNo: "31",
    studentName: "Karan Malhotra",
    classSection: "VIII - A",
    roomNo: "B-203",
    block: "Block B (Boys)",
    gender: "Male",
    dateOfBirth: "30/07/2011",
    contactNo: "9876543216",
    status: "Active",
    initials: "KM",
    checkInDate: "07/01/2025",
    guardianName: "Neeraj Malhotra",
    guardianContact: "9876543207",
  },
  {
    id: "8",
    admissionNo: "ADM2025O08",
    rollNo: "32",
    studentName: "Pooja Iyer",
    classSection: "VIII - B",
    roomNo: "C-301",
    block: "Block C (Girls)",
    gender: "Female",
    dateOfBirth: "12/03/2012",
    contactNo: "9876543217",
    status: "Active",
    initials: "PI",
    checkInDate: "08/01/2025",
    guardianName: "S. Iyer",
    guardianContact: "9876543208",
  },
  {
    id: "9",
    admissionNo: "ADM2025O09",
    rollNo: "33",
    studentName: "Arjun Das",
    classSection: "VII - A",
    roomNo: "C-302",
    block: "Block C (Girls)",
    gender: "Male",
    dateOfBirth: "09/09/2012",
    contactNo: "9876543218",
    status: "Active",
    initials: "AD",
    checkInDate: "09/01/2025",
    guardianName: "Rajesh Das",
    guardianContact: "9876543209",
  },
  {
    id: "10",
    admissionNo: "ADM2025O10",
    rollNo: "34",
    studentName: "Diya Kapoor",
    classSection: "VII - B",
    roomNo: "C-303",
    block: "Block C (Girls)",
    gender: "Female",
    dateOfBirth: "17/12/2012",
    contactNo: "9876543219",
    status: "Active",
    initials: "DK",
    checkInDate: "10/01/2025",
    guardianName: "Vikram Kapoor",
    guardianContact: "9876543210",
  },
];

const HOSTEL_STUDENTS_SUMMARY_CARDS: SummaryCard[] = [
  {
    title: "Total Hostel Students",
    value: "286",
    footer: "Across All Blocks",
    icon: "Users",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    tint: "bg-purple-50/60",
  },
  {
    title: "Boys",
    value: "178",
    footer: "62.24%",
    icon: "User",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tint: "bg-emerald-50/60",
  },
  {
    title: "Girls",
    value: "108",
    footer: "37.76%",
    icon: "User",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    tint: "bg-pink-50/60",
  },
  {
    title: "Occupancy",
    value: "92.53%",
    footer: "265 / 286",
    icon: "Bed",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    tint: "bg-blue-50/60",
  },
  {
    title: "Vacant Beds",
    value: "21",
    footer: "Across All Rooms",
    icon: "Home",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    tint: "bg-orange-50/60",
  },
];

const BLOCK_SEGMENTS: BlockSegment[] = [
  { label: "Block A (Boys)", value: 90, color: "#7c3aed" },
  { label: "Block B (Boys)", value: 88, color: "#10b981" },
  { label: "Block C (Girls)", value: 72, color: "#f97316" },
  { label: "Block D (Girls)", value: 36, color: "#ec4899" },
];

const RECENT_CHECK_INS: CheckInRow[] = [
  {
    id: "1",
    studentName: "Arjun Das",
    roomNo: "C-302",
    block: "Block C (Girls)",
    checkInDate: "18/05/2025",
    guardianName: "Rajesh Das",
    contactNo: "9876543201",
  },
  {
    id: "2",
    studentName: "Pooja Iyer",
    roomNo: "C-301",
    block: "Block C (Girls)",
    checkInDate: "17/05/2025",
    guardianName: "S. Iyer",
    contactNo: "9876543202",
  },
  {
    id: "3",
    studentName: "Karan Malhotra",
    roomNo: "B-203",
    block: "Block B (Boys)",
    checkInDate: "16/05/2025",
    guardianName: "Neeraj Malhotra",
    contactNo: "9876543203",
  },
];

const HOSTEL_STUDENTS_QUICK_ACTIONS: QuickAction[] = [
  {
    label: "Add Student",
    icon: "UserPlus",
    color: "text-[#7c3aed]",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    label: "Room Allocation",
    icon: "Bed",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    label: "Bulk Import",
    icon: "Upload",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    label: "Transfer Room",
    icon: "ArrowRightLeft",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    label: "Hostel Reports",
    icon: "FileText",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  },
];

const HOSTEL_BLOCK_OPTIONS = ["All Blocks", "Block A", "Block B", "Block C", "Block D"];

const ROOM_OPTIONS = [
  "All Rooms",
  "A-101",
  "A-102",
  "A-103",
  "A-104",
  "B-201",
  "B-202",
  "B-203",
  "C-301",
  "C-302",
  "C-303",
];

const GENDER_OPTIONS = ["All", "Male", "Female"];

const CLASS_SECTION_OPTIONS = [
  "All Classes",
  "XII - A",
  "XI - B",
  "X - A",
  "X - B",
  "IX - A",
  "IX - B",
  "VIII - A",
  "VIII - B",
  "VII - A",
  "VII - B",
];

const STATUS_OPTIONS = ["All Status", "Active", "Inactive", "Checked Out"];

const BLOCK_FILTER_OPTIONS = ["All Blocks", "Boys Blocks", "Girls Blocks"];

export default function HostelStudentsPage() {
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);

  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [editStudentOpen, setEditStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<HostelStudent | null>(null);
  const [detailsStudent, setDetailsStudent] = useState<HostelStudent | null>(null);
  const [allocateOpen, setAllocateOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [bulkImportOpen, setBulkImportOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [allCheckInsOpen, setAllCheckInsOpen] = useState(false);

  const [blockFilter, setBlockFilter] = useState(HOSTEL_BLOCK_OPTIONS[0]);
  const [roomFilter, setRoomFilter] = useState(ROOM_OPTIONS[0]);
  const [genderFilter, setGenderFilter] = useState(GENDER_OPTIONS[0]);
  const [classSectionFilter, setClassSectionFilter] = useState(CLASS_SECTION_OPTIONS[0]);
  const [statusFilter, setStatusFilter] = useState(STATUS_OPTIONS[0]);
  const [search, setSearch] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [blockChartFilter, setBlockChartFilter] = useState(BLOCK_FILTER_OPTIONS[0]);

  const showToast = (message: string) => {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-6 right-6 z-[200] rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-2xl";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const handleAddClick = () => setAddMenuOpen((prev) => !prev);
  const handleMoreOptions = () => setMoreOptionsOpen((prev) => !prev);

  const handleQuickAction = (action: { label: string }) => {
    switch (action.label) {
      case "Add Student":
        setAddStudentOpen(true);
        break;
      case "Room Allocation":
        setAllocateOpen(true);
        break;
      case "Bulk Import":
        setBulkImportOpen(true);
        break;
      case "Transfer Room":
        setTransferOpen(true);
        break;
      case "Hostel Reports":
        setReportOpen(true);
        break;
      default:
        showToast(`${action.label} workflow will be connected to the backend in the integration phase.`);
    }
  };

  const handleAddStudent = (student: HostelStudent) => {
    showToast(`Student ${student.studentName} added successfully`);
  };

  const handleEditStudent = (student: HostelStudent) => {
    showToast(`Student ${student.studentName} updated successfully`);
  };

  const handleAllocate = (data: { student: string; rollNo: string; block: string; room: string; checkInDate: string }) => {
    showToast(`Student ${data.student} allocated successfully`);
  };

  const handleTransfer = (data: { student: string; fromRoom: string; toRoom: string; block: string; reason: string }) => {
    showToast(`Student ${data.student} transferred successfully`);
  };

  const handleBulkImport = (data: { file: File | null }) => {
    showToast(`File ${data.file?.name || ""} imported successfully`);
  };

  const handleMoreRowAction = (action: string, row: HostelStudent) => {
    switch (action) {
      case "Allocate Room":
        setAllocateOpen(true);
        break;
      case "Transfer Room":
        setTransferOpen(true);
        break;
      case "Check-Out Student":
        if (confirm(`Are you sure you want to check out ${row.studentName}?`)) {
          showToast(`Student ${row.studentName} checked out successfully`);
        }
        break;
      case "View Hostel History":
        showToast(`Hostel history for ${row.studentName}`);
        break;
      case "Generate Hostel Card":
        showToast(`Hostel card generated for ${row.studentName}`);
        break;
      case "Deactivate Student":
        showToast(`Student ${row.studentName} deactivated`);
        break;
      case "Delete Student":
        if (confirm(`Are you sure you want to delete ${row.studentName}?`)) {
          showToast(`Student ${row.studentName} deleted successfully`);
        }
        break;
      default:
        showToast(`${action} workflow will be connected to the backend in the integration phase.`);
    }
  };

  const filteredRows = useMemo(() => {
    let result = [...HOSTEL_STUDENTS];
    if (blockFilter !== "All Blocks") {
      result = result.filter((r) => r.block.includes(blockFilter.replace("Block ", "")));
    }
    if (roomFilter !== "All Rooms") {
      result = result.filter((r) => r.roomNo === roomFilter);
    }
    if (genderFilter !== "All") {
      result = result.filter((r) => r.gender === genderFilter);
    }
    if (classSectionFilter !== "All Classes") {
      result = result.filter((r) => r.classSection === classSectionFilter);
    }
    if (statusFilter !== "All Status") {
      result = result.filter((r) => r.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.admissionNo.toLowerCase().includes(q) ||
          r.rollNo.toLowerCase().includes(q) ||
          r.studentName.toLowerCase().includes(q) ||
          r.classSection.toLowerCase().includes(q) ||
          r.roomNo.toLowerCase().includes(q) ||
          r.block.toLowerCase().includes(q) ||
          r.contactNo.includes(q) ||
          r.status.toLowerCase().includes(q)
      );
    }
    return result;
  }, [blockFilter, roomFilter, genderFilter, classSectionFilter, statusFilter, search]);

  const TOTAL_STUDENTS = 286;

  const totalPages = Math.max(1, Math.ceil(TOTAL_STUDENTS / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = filteredRows.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1;
  const endIdx = Math.min(safePage * rowsPerPage, TOTAL_STUDENTS);
  const pageRows = filteredRows.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleFilter = () => {
    setCurrentPage(1);
    showToast("Filters applied");
  };

  const handleReset = () => {
    setBlockFilter(HOSTEL_BLOCK_OPTIONS[0]);
    setRoomFilter(ROOM_OPTIONS[0]);
    setGenderFilter(GENDER_OPTIONS[0]);
    setClassSectionFilter(CLASS_SECTION_OPTIONS[0]);
    setStatusFilter(STATUS_OPTIONS[0]);
    setSearch("");
    setCurrentPage(1);
    setSelectedIds([]);
  };

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <HostelStudentsPageHeader
            onAddClick={handleAddClick}
            onMoreOptions={handleMoreOptions}
          />

          <HostelStudentsSummaryCards cards={HOSTEL_STUDENTS_SUMMARY_CARDS} />

          <HostelStudentsFilters
            block={blockFilter}
            onBlockChange={setBlockFilter}
            room={roomFilter}
            onRoomChange={setRoomFilter}
            gender={genderFilter}
            onGenderChange={setGenderFilter}
            classSection={classSectionFilter}
            onClassSectionChange={setClassSectionFilter}
            status={statusFilter}
            onStatusChange={setStatusFilter}
            search={search}
            onSearchChange={setSearch}
            onFilter={handleFilter}
            onReset={handleReset}
          />

          <HostelStudentsTable
            rows={pageRows}
            onView={(row) => setDetailsStudent(row)}
            onEdit={(row) => {
              setSelectedStudent(row);
              setEditStudentOpen(true);
            }}
            onMore={(row) => {
              setSelectedStudent(row);
              setMoreOptionsOpen(true);
            }}
            totalItems={TOTAL_STUDENTS}
            currentPage={safePage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            startIndex={startIdx}
            endIndex={endIdx}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            selectedIds={selectedIds}
            onSelectedIdsChange={setSelectedIds}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <StudentsByBlockChart
              filter={blockChartFilter}
              onFilterChange={setBlockChartFilter}
            />
            <HostelSummaryCard />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <HostelStudentsQuickActions
              actions={HOSTEL_STUDENTS_QUICK_ACTIONS}
              onAction={handleQuickAction}
            />
            <HostelStudentsNoteCard />
          </div>

          <RecentHostelCheckIns
            rows={RECENT_CHECK_INS}
            onViewAll={() => setAllCheckInsOpen(true)}
          />

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      <AddHostelStudentDialog
        open={addStudentOpen}
        onClose={() => setAddStudentOpen(false)}
        onSave={handleAddStudent}
      />
      <EditHostelStudentDialog
        open={editStudentOpen}
        onClose={() => setEditStudentOpen(false)}
        onSave={handleEditStudent}
        row={selectedStudent}
      />
      <HostelStudentDetailsDialog
        open={!!detailsStudent}
        onClose={() => setDetailsStudent(null)}
        row={detailsStudent}
      />
      <RoomAllocationDialog
        open={allocateOpen}
        onClose={() => setAllocateOpen(false)}
        onSave={handleAllocate}
      />
      <RoomTransferDialog
        open={transferOpen}
        onClose={() => setTransferOpen(false)}
        onSave={handleTransfer}
      />
      <BulkImportHostelStudentsDialog
        open={bulkImportOpen}
        onClose={() => setBulkImportOpen(false)}
        onSave={handleBulkImport}
      />
      <HostelStudentsReportDialog
        open={reportOpen}
        onClose={() => setReportOpen(false)}
      />

      {addMenuOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setAddMenuOpen(false)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">Add Hostel Student</h3>
              <button
                onClick={() => setAddMenuOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-1">
              <button
                type="button"
                onClick={() => {
                  setAddMenuOpen(false);
                  setAddStudentOpen(true);
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Add Hostel Student
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddMenuOpen(false);
                  setAllocateOpen(true);
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Room Allocation
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddMenuOpen(false);
                  setBulkImportOpen(true);
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Bulk Import
              </button>
            </div>
          </div>
        </div>
      )}

      {moreOptionsOpen && !selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMoreOptionsOpen(false)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">More Options</h3>
              <button
                onClick={() => setMoreOptionsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-1">
              <button
                type="button"
                onClick={() => {
                  setMoreOptionsOpen(false);
                  showToast("Hostel Students exported successfully");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Export Hostel Students
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOptionsOpen(false);
                  showToast("Print dialog opened");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Print Student Register
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOptionsOpen(false);
                  showToast("Hostel Student Settings coming soon");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Hostel Student Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {moreOptionsOpen && selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMoreOptionsOpen(false)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">More Options</h3>
              <button
                onClick={() => setMoreOptionsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-1">
              {[
                "Allocate Room",
                "Transfer Room",
                "Check-Out Student",
                "View Hostel History",
                "Generate Hostel Card",
                "Deactivate Student",
              ].map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => {
                    setMoreOptionsOpen(false);
                    handleMoreRowAction(action, selectedStudent);
                  }}
                  className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  {action}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMoreOptionsOpen(false);
                  if (
                    selectedStudent &&
                    confirm(`Are you sure you want to delete ${selectedStudent.studentName}?`)
                  ) {
                    showToast(`Student ${selectedStudent.studentName} deleted successfully`);
                  }
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}

      {allCheckInsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setAllCheckInsOpen(false)} />
          <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">All Check-Ins</h3>
              <button
                onClick={() => setAllCheckInsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Student Name</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Room No.</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Block</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Check-In Date</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Guardian Name</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Contact No.</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_CHECK_INS.map((row) => (
                    <tr key={row.id} className="border-b border-slate-50 last:border-0">
                      <td className="px-4 py-2 font-medium text-slate-700">{row.studentName}</td>
                      <td className="px-4 py-2 text-slate-600">{row.roomNo}</td>
                      <td className="px-4 py-2 text-slate-600">{row.block}</td>
                      <td className="px-4 py-2 text-slate-600">{row.checkInDate}</td>
                      <td className="px-4 py-2 text-slate-600">{row.guardianName}</td>
                      <td className="px-4 py-2 text-slate-600">{row.contactNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
