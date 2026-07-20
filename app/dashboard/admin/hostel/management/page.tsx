"use client";

import { useState, useMemo } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import HostelManagementPageHeader from "@/components/dashboard/hostel/HostelManagementPageHeader";
import HostelSummaryCards from "@/components/dashboard/hostel/HostelSummaryCards";
import HostelFilters from "@/components/dashboard/hostel/HostelFilters";
import HostelOccupancyTable from "@/components/dashboard/hostel/HostelOccupancyTable";
import HostelBlockDetailsDialog from "@/components/dashboard/hostel/HostelBlockDetailsDialog";
import RecentCheckInsTable from "@/components/dashboard/hostel/RecentCheckInsTable";
import CheckInDetailsDialog from "@/components/dashboard/hostel/CheckInDetailsDialog";
import HostelQuickActions from "@/components/dashboard/hostel/HostelQuickActions";
import AddRoomDialog from "@/components/dashboard/hostel/AddRoomDialog";
import AddBlockDialog from "@/components/dashboard/hostel/AddBlockDialog";
import AssignStudentDialog from "@/components/dashboard/hostel/AssignStudentDialog";
import AddVisitorDialog from "@/components/dashboard/hostel/AddVisitorDialog";
import MessMenuDialog from "@/components/dashboard/hostel/MessMenuDialog";
import MaintenanceRequestDialog from "@/components/dashboard/hostel/MaintenanceRequestDialog";
import HostelReportDialog from "@/components/dashboard/hostel/HostelReportDialog";
import {
  SUMMARY_CARDS,
  OCCUPANCY_ROWS,
  CHECK_IN_ROWS,
  QUICK_ACTIONS,
  BLOCK_OPTIONS,
  ROOM_TYPE_OPTIONS,
  STATUS_OPTIONS,
  GENDER_OPTIONS,
} from "@/lib/fixtures/hostel-management-reference-fixture";
import type { OccupancyRow, CheckInRow, QuickAction } from "@/lib/fixtures/hostel-management-reference-fixture";

export default function HostelManagementPage() {
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);

  const [addRoomOpen, setAddRoomOpen] = useState(false);
  const [addBlockOpen, setAddBlockOpen] = useState(false);
  const [assignStudentOpen, setAssignStudentOpen] = useState(false);
  const [addVisitorOpen, setAddVisitorOpen] = useState(false);
  const [messMenuOpen, setMessMenuOpen] = useState(false);
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const [blockFilter, setBlockFilter] = useState(BLOCK_OPTIONS[0]);
  const [roomTypeFilter, setRoomTypeFilter] = useState(ROOM_TYPE_OPTIONS[0]);
  const [statusFilter, setStatusFilter] = useState(STATUS_OPTIONS[0]);
  const [genderFilter, setGenderFilter] = useState(GENDER_OPTIONS[0]);
  const [search, setSearch] = useState("");

  const [selectedBlock, setSelectedBlock] = useState<OccupancyRow | null>(null);
  const [selectedCheckIn, setSelectedCheckIn] = useState<CheckInRow | null>(null);
  const [allCheckInsOpen, setAllCheckInsOpen] = useState(false);

  const showToast = (message: string) => {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-6 right-6 z-[200] rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-2xl";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const handleAddClick = () => {
    setAddMenuOpen((prev) => !prev);
  };

  const handleMoreOptions = () => {
    setMoreOptionsOpen((prev) => !prev);
  };

  const handleQuickAction = (action: QuickAction) => {
    switch (action.label) {
      case "Add Student":
        setAssignStudentOpen(true);
        break;
      case "Add Room":
        setAddRoomOpen(true);
        break;
      case "Add Visitor":
        setAddVisitorOpen(true);
        break;
      case "Mess Menu":
        setMessMenuOpen(true);
        break;
      case "Maintenance Request":
        setMaintenanceOpen(true);
        break;
      case "Hostel Reports":
        setReportOpen(true);
        break;
      default:
        showToast(`${action.label} workflow will be connected to the backend in the integration phase.`);
    }
  };

  const handleSaveRoom = (data: {
    roomNumber: string;
    block: string;
    roomType: string;
    totalBeds: string;
    gender: string;
    floor: string;
    warden: string;
    status: string;
    notes: string;
  }) => {
    showToast(`Room ${data.roomNumber} added successfully`);
  };

  const handleSaveBlock = (data: {
    blockName: string;
    gender: string;
    totalFloors: string;
    totalRooms: string;
    warden: string;
    contactNumber: string;
    status: string;
    notes: string;
  }) => {
    showToast(`Block ${data.blockName} added successfully`);
  };

  const handleAssignStudent = (data: {
    student: string;
    rollNo: string;
    block: string;
    room: string;
    checkInDate: string;
  }) => {
    showToast(`Student ${data.student} assigned successfully`);
  };

  const handleAddVisitor = (data: {
    visitorName: string;
    studentName: string;
    roomNo: string;
    block: string;
    purpose: string;
    date: string;
    time: string;
  }) => {
    showToast(`Visitor ${data.visitorName} added successfully`);
  };

  const handleMaintenanceSave = (data: {
    block: string;
    roomNo: string;
    issueType: string;
    description: string;
    priority: string;
    reportedBy: string;
  }) => {
    showToast(`Maintenance request submitted for Room ${data.roomNo}`);
  };

  const handleFilter = () => {
    showToast("Filters applied");
  };

  const filteredCheckIns = useMemo(() => {
    let result = [...CHECK_IN_ROWS];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.studentName.toLowerCase().includes(q) ||
          r.rollNo.toLowerCase().includes(q) ||
          r.roomNo.toLowerCase().includes(q) ||
          r.block.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search]);

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <HostelManagementPageHeader
            onAddClick={handleAddClick}
            onMoreOptions={handleMoreOptions}
          />

          <HostelSummaryCards cards={SUMMARY_CARDS} />

          <HostelFilters
            block={blockFilter}
            onBlockChange={setBlockFilter}
            roomType={roomTypeFilter}
            onRoomTypeChange={setRoomTypeFilter}
            status={statusFilter}
            onStatusChange={setStatusFilter}
            gender={genderFilter}
            onGenderChange={setGenderFilter}
            search={search}
            onSearchChange={setSearch}
            onFilter={handleFilter}
          />

          <div className="mb-6">
            <HostelOccupancyTable rows={OCCUPANCY_ROWS} onView={setSelectedBlock} />
          </div>

          <div className="mb-6">
            <RecentCheckInsTable
              rows={filteredCheckIns}
              onView={setSelectedCheckIn}
              onViewAll={() => setAllCheckInsOpen(true)}
            />
          </div>

          <HostelQuickActions actions={QUICK_ACTIONS} onAction={handleQuickAction} />

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      <AddRoomDialog open={addRoomOpen} onClose={() => setAddRoomOpen(false)} onSave={handleSaveRoom} />
      <AddBlockDialog open={addBlockOpen} onClose={() => setAddBlockOpen(false)} onSave={handleSaveBlock} />
      <AssignStudentDialog open={assignStudentOpen} onClose={() => setAssignStudentOpen(false)} onSave={handleAssignStudent} />
      <AddVisitorDialog open={addVisitorOpen} onClose={() => setAddVisitorOpen(false)} onSave={handleAddVisitor} />
      <MessMenuDialog open={messMenuOpen} onClose={() => setMessMenuOpen(false)} />
      <MaintenanceRequestDialog open={maintenanceOpen} onClose={() => setMaintenanceOpen(false)} onSave={handleMaintenanceSave} />
      <HostelReportDialog open={reportOpen} onClose={() => setReportOpen(false)} />
      <HostelBlockDetailsDialog row={selectedBlock} open={!!selectedBlock} onClose={() => setSelectedBlock(null)} />
      <CheckInDetailsDialog row={selectedCheckIn} open={!!selectedCheckIn} onClose={() => setSelectedCheckIn(null)} />

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
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Roll No.</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Room No.</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Block</th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Check-In Date</th>
                  </tr>
                </thead>
                <tbody>
                  {CHECK_IN_ROWS.map((row) => (
                    <tr key={row.id} className="border-b border-slate-50 last:border-0">
                      <td className="px-4 py-2 font-medium text-slate-700">{row.studentName}</td>
                      <td className="px-4 py-2 text-slate-600">{row.rollNo}</td>
                      <td className="px-4 py-2 text-slate-600">{row.roomNo}</td>
                      <td className="px-4 py-2 text-slate-600">{row.block}</td>
                      <td className="px-4 py-2 text-slate-600">{row.checkInDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {addMenuOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setAddMenuOpen(false)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">Add Room / Block</h3>
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
                  setAddRoomOpen(true);
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Add Room
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddMenuOpen(false);
                  setAddBlockOpen(true);
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Add Block
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddMenuOpen(false);
                  setAssignStudentOpen(true);
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Assign Student
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddMenuOpen(false);
                  setAddVisitorOpen(true);
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Add Visitor
              </button>
            </div>
          </div>
        </div>
      )}

      {moreOptionsOpen && (
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
                  showToast("Hostel view exported successfully");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Export Hostel View
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOptionsOpen(false);
                  showToast("Print dialog opened");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Print Occupancy Report
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOptionsOpen(false);
                  showToast("Hostel Settings coming soon");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Hostel Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
