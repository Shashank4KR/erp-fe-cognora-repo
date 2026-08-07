"use client";

import { useState, useMemo } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import RoomsPageHeader from "@/components/dashboard/hostel/rooms/RoomsPageHeader";
import RoomSummaryCards from "@/components/dashboard/hostel/rooms/RoomSummaryCards";
import RoomFilters from "@/components/dashboard/hostel/rooms/RoomFilters";
import RoomListTable from "@/components/dashboard/hostel/rooms/RoomListTable";
import RoomPagination from "@/components/dashboard/hostel/rooms/RoomPagination";
import RoomTypeDistributionChart from "@/components/dashboard/hostel/rooms/RoomTypeDistributionChart";
import RoomQuickActions from "@/components/dashboard/hostel/rooms/RoomQuickActions";
import RoomSummaryCard from "@/components/dashboard/hostel/rooms/RoomSummaryCard";
import RoomGuidelinesCard from "@/components/dashboard/hostel/rooms/RoomGuidelinesCard";
import AddRoomDialog from "@/components/dashboard/hostel/rooms/AddRoomDialog";
import EditRoomDialog from "@/components/dashboard/hostel/rooms/EditRoomDialog";
import RoomDetailsDialog from "@/components/dashboard/hostel/rooms/RoomDetailsDialog";
import AllocateStudentDialog from "@/components/dashboard/hostel/rooms/AllocateStudentDialog";
import RoomTransferDialog from "@/components/dashboard/hostel/rooms/RoomTransferDialog";
import RoomCheckOutDialog from "@/components/dashboard/hostel/rooms/RoomCheckOutDialog";
import RoomMaintenanceDialog from "@/components/dashboard/hostel/rooms/RoomMaintenanceDialog";
import RoomReportDialog from "@/components/dashboard/hostel/rooms/RoomReportDialog";
import type { RoomRow } from "@/lib/fixtures/rooms-management-reference-fixture";

interface SummaryCardData {
  title: string;
  value: string;
  footer: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  tint: string;
}

const ROOMS_SUMMARY_CARDS: SummaryCardData[] = [
  {
    title: "Total Rooms",
    value: "48",
    footer: "Across 3 Blocks",
    icon: "Bed",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    tint: "bg-blue-50/60",
  },
  {
    title: "Occupied Rooms",
    value: "40",
    footer: "83.33%",
    icon: "Building2",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tint: "bg-emerald-50/60",
  },
  {
    title: "Vacant Rooms",
    value: "8",
    footer: "16.67%",
    icon: "Home",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    tint: "bg-orange-50/60",
  },
  {
    title: "Total Occupancy",
    value: "236 / 288",
    footer: "82.22%",
    icon: "Users",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    tint: "bg-rose-50/60",
  },
  {
    title: "Total Beds",
    value: "288",
    footer: "Across All Rooms",
    icon: "ClipboardList",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    tint: "bg-blue-50/60",
  },
];

interface QuickActionData {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const ROOMS_QUICK_ACTIONS: QuickActionData[] = [
  {
    label: "Add Room",
    icon: "Bed",
    color: "text-[#7c3aed]",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    label: "Allocate Student",
    icon: "Users",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    label: "Room Transfer",
    icon: "ArrowRightLeft",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    label: "Check-Out",
    icon: "LogOut",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  },
  {
    label: "Room Maintenance",
    icon: "Wrench",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    label: "Room Report",
    icon: "FileText",
    color: "text-[#7c3aed]",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

const ROOM_TYPE_DISTRIBUTION_SEGMENTS: DonutSegment[] = [
  { label: "4 Seater", value: 120, color: "#7c3aed" },
  { label: "3 Seater", value: 96, color: "#10b981" },
  { label: "2 Seater", value: 48, color: "#f97316" },
  { label: "1 Seater", value: 24, color: "#ef4444" },
];

const ROOMS_FIXTURE_ROWS: RoomRow[] = [
  {
    id: "1",
    roomNumber: "A-101",
    block: "Block A (Boys)",
    floor: "1st Floor",
    roomType: "4 Seater",
    capacity: 4,
    occupiedBeds: 4,
    vacantBeds: 0,
    occupancyPercent: 100,
    status: "Occupied",
  },
  {
    id: "2",
    roomNumber: "A-102",
    block: "Block A (Boys)",
    floor: "1st Floor",
    roomType: "4 Seater",
    capacity: 4,
    occupiedBeds: 4,
    vacantBeds: 0,
    occupancyPercent: 100,
    status: "Occupied",
  },
  {
    id: "3",
    roomNumber: "A-103",
    block: "Block A (Boys)",
    floor: "1st Floor",
    roomType: "3 Seater",
    capacity: 3,
    occupiedBeds: 2,
    vacantBeds: 1,
    occupancyPercent: 66.67,
    status: "Partially Vacant",
  },
  {
    id: "4",
    roomNumber: "A-104",
    block: "Block A (Boys)",
    floor: "1st Floor",
    roomType: "2 Seater",
    capacity: 2,
    occupiedBeds: 2,
    vacantBeds: 0,
    occupancyPercent: 100,
    status: "Occupied",
  },
  {
    id: "5",
    roomNumber: "B-201",
    block: "Block B (Boys)",
    floor: "2nd Floor",
    roomType: "4 Seater",
    capacity: 4,
    occupiedBeds: 3,
    vacantBeds: 1,
    occupancyPercent: 75,
    status: "Partially Vacant",
  },
  {
    id: "6",
    roomNumber: "B-202",
    block: "Block B (Boys)",
    floor: "2nd Floor",
    roomType: "3 Seater",
    capacity: 3,
    occupiedBeds: 3,
    vacantBeds: 0,
    occupancyPercent: 100,
    status: "Occupied",
  },
  {
    id: "7",
    roomNumber: "B-203",
    block: "Block B (Boys)",
    floor: "2nd Floor",
    roomType: "2 Seater",
    capacity: 2,
    occupiedBeds: 1,
    vacantBeds: 1,
    occupancyPercent: 50,
    status: "Partially Vacant",
  },
  {
    id: "8",
    roomNumber: "C-301",
    block: "Block C (Girls)",
    floor: "3rd Floor",
    roomType: "4 Seater",
    capacity: 4,
    occupiedBeds: 4,
    vacantBeds: 0,
    occupancyPercent: 100,
    status: "Occupied",
  },
  {
    id: "9",
    roomNumber: "C-302",
    block: "Block C (Girls)",
    floor: "3rd Floor",
    roomType: "3 Seater",
    capacity: 3,
    occupiedBeds: 2,
    vacantBeds: 1,
    occupancyPercent: 66.67,
    status: "Partially Vacant",
  },
  {
    id: "10",
    roomNumber: "C-303",
    block: "Block C (Girls)",
    floor: "3rd Floor",
    roomType: "2 Seater",
    capacity: 2,
    occupiedBeds: 0,
    vacantBeds: 2,
    occupancyPercent: 0,
    status: "Vacant",
  },
];

const BLOCK_FILTER_OPTIONS = ["All Blocks", "Block A", "Block B", "Block C"];

const ROOM_TYPE_FILTER_OPTIONS = ["All Types", "1 Seater", "2 Seater", "3 Seater", "4 Seater"];

const FLOOR_FILTER_OPTIONS = ["All Floors", "1st Floor", "2nd Floor", "3rd Floor"];

const ROOM_STATUS_OPTIONS = ["All Status", "Occupied", "Partially Vacant", "Vacant", "Maintenance"];

export default function RoomsManagementPage() {
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);

  const [addRoomOpen, setAddRoomOpen] = useState(false);
  const [editRoomOpen, setEditRoomOpen] = useState(false);
  const [detailsRoom, setDetailsRoom] = useState<RoomRow | null>(null);
  const [allocateOpen, setAllocateOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomRow | null>(null);

  const [blockFilter, setBlockFilter] = useState(BLOCK_FILTER_OPTIONS[0]);
  const [roomTypeFilter, setRoomTypeFilter] = useState(ROOM_TYPE_FILTER_OPTIONS[0]);
  const [floorFilter, setFloorFilter] = useState(FLOOR_FILTER_OPTIONS[0]);
  const [statusFilter, setStatusFilter] = useState(ROOM_STATUS_OPTIONS[0]);
  const [search, setSearch] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleSaveRoom = (data: {
    roomNumber: string;
    block: string;
    floor: string;
    roomType: string;
    capacity: string;
    gender: string;
    occupiedBeds: string;
    warden: string;
    status: string;
    notes: string;
  }) => {
    const cap = Number(data.capacity);
    const occ = Number(data.occupiedBeds);
    const vacant = cap - occ;
    const percent = cap > 0 ? (occ / cap) * 100 : 0;
    const newRoom: RoomRow = {
      id: Date.now().toString(),
      roomNumber: data.roomNumber,
      block: data.block + (data.gender === "Girls" ? " (Girls)" : " (Boys)"),
      floor: data.floor,
      roomType: data.roomType,
      capacity: cap,
      occupiedBeds: occ,
      vacantBeds: vacant < 0 ? 0 : vacant,
      occupancyPercent: percent,
      status: data.status,
    };
    ROOMS_FIXTURE_ROWS.unshift(newRoom);
    showToast(`Room ${data.roomNumber} added successfully`);
  };

  const handleEditRoom = (data: {
    id: string;
    roomNumber: string;
    block: string;
    floor: string;
    roomType: string;
    capacity: string;
    gender: string;
    occupiedBeds: string;
    warden: string;
    status: string;
    notes: string;
  }) => {
    const idx = ROOMS_FIXTURE_ROWS.findIndex((r) => r.id === data.id);
    if (idx === -1) return;
    const cap = Number(data.capacity);
    const occ = Number(data.occupiedBeds);
    const vacant = cap - occ;
    const percent = cap > 0 ? (occ / cap) * 100 : 0;
    ROOMS_FIXTURE_ROWS[idx] = {
      ...ROOMS_FIXTURE_ROWS[idx],
      roomNumber: data.roomNumber,
      block: data.block + (data.gender === "Girls" ? " (Girls)" : " (Boys)"),
      floor: data.floor,
      roomType: data.roomType,
      capacity: cap,
      occupiedBeds: occ,
      vacantBeds: vacant < 0 ? 0 : vacant,
      occupancyPercent: percent,
      status: data.status,
    };
    showToast(`Room ${data.roomNumber} updated successfully`);
  };

  const handleDeleteRoom = () => {
    if (!selectedRoom) return;
    const idx = ROOMS_FIXTURE_ROWS.findIndex((r) => r.id === selectedRoom.id);
    if (idx !== -1) {
      ROOMS_FIXTURE_ROWS.splice(idx, 1);
      showToast(`Room ${selectedRoom.roomNumber} deleted successfully`);
    }
  };

  const handleAllocateStudent = (data: { student: string; rollNo: string; room: string; block: string; checkInDate: string }) => {
    showToast(`Student ${data.student} allocated successfully`);
  };

  const handleTransfer = (data: { student: string; fromRoom: string; toRoom: string; block: string; reason: string }) => {
    showToast(`Student ${data.student} transferred successfully`);
  };

  const handleCheckOut = (data: { room: string; student: string; checkOutDate: string; reason: string }) => {
    showToast(`Student ${data.student} checked out successfully`);
  };

  const handleMaintenance = (data: { room: string; block: string; issueType: string; description: string; priority: string }) => {
    showToast(`Maintenance request submitted for Room ${data.room}`);
  };

  const handleQuickAction = (action: { label: string }) => {
    switch (action.label) {
      case "Add Room":
        setAddRoomOpen(true);
        break;
      case "Allocate Student":
        setAllocateOpen(true);
        break;
      case "Room Transfer":
        setTransferOpen(true);
        break;
      case "Check-Out":
        setCheckOutOpen(true);
        break;
      case "Room Maintenance":
        setMaintenanceOpen(true);
        break;
      case "Room Report":
        setReportOpen(true);
        break;
      default:
        showToast(`${action.label} workflow will be connected to the backend in the integration phase.`);
    }
  };

  const filteredRows = useMemo(() => {
    let result = [...ROOMS_FIXTURE_ROWS];
    if (blockFilter !== "All Blocks") {
      result = result.filter((r) => r.block.includes(blockFilter.replace("Block ", "")));
    }
    if (roomTypeFilter !== "All Types") {
      result = result.filter((r) => r.roomType === roomTypeFilter);
    }
    if (floorFilter !== "All Floors") {
      result = result.filter((r) => r.floor === floorFilter);
    }
    if (statusFilter !== "All Status") {
      result = result.filter((r) => r.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.roomNumber.toLowerCase().includes(q) ||
          r.block.toLowerCase().includes(q) ||
          r.floor.toLowerCase().includes(q) ||
          r.roomType.toLowerCase().includes(q) ||
          r.status.toLowerCase().includes(q)
      );
    }
    return result;
  }, [blockFilter, roomTypeFilter, floorFilter, statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = filteredRows.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1;
  const endIdx = Math.min(safePage * rowsPerPage, filteredRows.length);
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

  const summaryItems = [
    { label: "Total Rooms", value: "48", icon: "Bed", iconBg: "bg-blue-50" },
    { label: "Occupied Rooms", value: "40", icon: "Building2", iconBg: "bg-emerald-50" },
    { label: "Vacant Rooms", value: "8", icon: "Home", iconBg: "bg-orange-50" },
    { label: "Total Occupancy", value: "82.22%", icon: "Users", iconBg: "bg-rose-50" },
  ];

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <RoomsPageHeader onAddClick={handleAddClick} onMoreOptions={handleMoreOptions} />

          <RoomSummaryCards cards={ROOMS_SUMMARY_CARDS} />

          <RoomFilters
            block={blockFilter}
            onBlockChange={setBlockFilter}
            roomType={roomTypeFilter}
            onRoomTypeChange={setRoomTypeFilter}
            floor={floorFilter}
            onFloorChange={setFloorFilter}
            status={statusFilter}
            onStatusChange={setStatusFilter}
            search={search}
            onSearchChange={setSearch}
            onFilter={handleFilter}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2">
              <RoomListTable
                rows={pageRows}
                onView={(row) => setDetailsRoom(row)}
                onEdit={(row) => setSelectedRoom(row)}
                onMore={(row) => {
                  setSelectedRoom(row);
                  setMoreOptionsOpen(true);
                }}
              />
              <RoomPagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                totalItems={filteredRows.length}
                startIndex={startIdx}
                endIndex={endIdx}
              />
            </div>
            <div className="space-y-6">
              <RoomTypeDistributionChart segments={ROOM_TYPE_DISTRIBUTION_SEGMENTS} />
              <RoomQuickActions actions={ROOMS_QUICK_ACTIONS} onAction={handleQuickAction} />
              <RoomSummaryCard items={summaryItems} />
            </div>
          </div>

          <RoomGuidelinesCard />

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      <AddRoomDialog open={addRoomOpen} onClose={() => setAddRoomOpen(false)} onSave={handleSaveRoom} />
      <EditRoomDialog open={editRoomOpen} onClose={() => setEditRoomOpen(false)} onSave={handleEditRoom} row={selectedRoom} />
      <RoomDetailsDialog open={!!detailsRoom} onClose={() => setDetailsRoom(null)} row={detailsRoom} />
      <AllocateStudentDialog open={allocateOpen} onClose={() => setAllocateOpen(false)} onSave={handleAllocateStudent} />
      <RoomTransferDialog open={transferOpen} onClose={() => setTransferOpen(false)} onSave={handleTransfer} />
      <RoomCheckOutDialog open={checkOutOpen} onClose={() => setCheckOutOpen(false)} onSave={handleCheckOut} />
      <RoomMaintenanceDialog open={maintenanceOpen} onClose={() => setMaintenanceOpen(false)} onSave={handleMaintenance} />
      <RoomReportDialog open={reportOpen} onClose={() => setReportOpen(false)} />

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
                  showToast("Rooms view exported successfully");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Export Rooms View
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOptionsOpen(false);
                  showToast("Print dialog opened");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Print Room Register
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOptionsOpen(false);
                  showToast("Room Settings coming soon");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Room Settings
              </button>
              {selectedRoom && (
                <button
                  type="button"
                  onClick={() => {
                    setMoreOptionsOpen(false);
                    handleDeleteRoom();
                    setSelectedRoom(null);
                  }}
                  className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition"
                >
                  Delete Room
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
