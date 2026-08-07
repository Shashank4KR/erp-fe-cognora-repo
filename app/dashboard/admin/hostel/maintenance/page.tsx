"use client";

import { useState, useMemo } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import MaintenanceManagementPageHeader from "@/components/dashboard/hostel/maintenance/MaintenanceManagementPageHeader";
import MaintenanceSummaryCards from "@/components/dashboard/hostel/maintenance/MaintenanceSummaryCards";
import MaintenanceFilters from "@/components/dashboard/hostel/maintenance/MaintenanceFilters";
import MaintenanceRequestsTable from "@/components/dashboard/hostel/maintenance/MaintenanceRequestsTable";
import MaintenanceRequestDetailsDialog from "@/components/dashboard/hostel/maintenance/MaintenanceRequestDetailsDialog";
import RecentWorkOrdersTable from "@/components/dashboard/hostel/maintenance/RecentWorkOrdersTable";
import WorkOrderDetailsDialog from "@/components/dashboard/hostel/maintenance/WorkOrderDetailsDialog";
import RequestsByStatusChart from "@/components/dashboard/hostel/maintenance/RequestsByStatusChart";
import RequestsByCategoryChart from "@/components/dashboard/hostel/maintenance/RequestsByCategoryChart";
import MaintenanceQuickActions from "@/components/dashboard/hostel/maintenance/MaintenanceQuickActions";
import MaintenanceImportantNote from "@/components/dashboard/hostel/maintenance/MaintenanceImportantNote";
import RaiseMaintenanceRequestDialog from "@/components/dashboard/hostel/maintenance/RaiseMaintenanceRequestDialog";
import WorkOrdersDialog from "@/components/dashboard/hostel/maintenance/WorkOrdersDialog";
import RequestHistoryDialog from "@/components/dashboard/hostel/maintenance/RequestHistoryDialog";
import MaintenanceStaffDialog from "@/components/dashboard/hostel/maintenance/MaintenanceStaffDialog";
import MaintenanceInventoryDialog from "@/components/dashboard/hostel/maintenance/MaintenanceInventoryDialog";
import MaintenanceReportDialog from "@/components/dashboard/hostel/maintenance/MaintenanceReportDialog";
import type { MaintenanceRequest, WorkOrder, QuickActionItem } from "@/lib/fixtures/maintenance-management-reference-fixture";

interface MaintenanceSummaryCard {
  title: string;
  value: number;
  footer: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  tint: string;
}

const MAINTENANCE_SUMMARY_CARDS: MaintenanceSummaryCard[] = [
  {
    title: "Total Requests",
    value: 128,
    footer: "All Time",
    icon: "Wrench",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    tint: "bg-blue-50/60",
  },
  {
    title: "Open Requests",
    value: 32,
    footer: "25.00%",
    icon: "ClipboardCheck",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tint: "bg-emerald-50/60",
  },
  {
    title: "In Progress",
    value: 18,
    footer: "14.06%",
    icon: "Clock",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    tint: "bg-orange-50/60",
  },
  {
    title: "Completed",
    value: 74,
    footer: "57.81%",
    icon: "CheckCircle2",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    tint: "bg-purple-50/60",
  },
  {
    title: "Overdue",
    value: 4,
    footer: "3.13%",
    icon: "XCircle",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    tint: "bg-pink-50/60",
  },
];

const MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
  {
    id: "MR2025O518-001",
    requestedBy: "Aditya Sharma",
    blockRoom: "Block A / A-101",
    issueType: "Fan Not Working",
    priority: "High",
    status: "Open",
    requestedOn: "18/05/2025 09:15 AM",
    category: "Electrical",
    description: "Ceiling fan in room A-101 is not working.",
    requestedDate: "18/05/2025",
    requestedTime: "09:15 AM",
  },
  {
    id: "MR2025O518-002",
    requestedBy: "Ananya Gupta",
    blockRoom: "Block A / A-102",
    issueType: "Water Leakage",
    priority: "High",
    status: "In Progress",
    requestedOn: "18/05/2025 10:30 AM",
    category: "Plumbing",
    description: "Water leakage from bathroom tap.",
    requestedDate: "18/05/2025",
    requestedTime: "10:30 AM",
  },
  {
    id: "MR2025O518-003",
    requestedBy: "Rohan Verma",
    blockRoom: "Block A / A-103",
    issueType: "Light Not Working",
    priority: "Medium",
    status: "Open",
    requestedOn: "18/05/2025 11:20 AM",
    category: "Electrical",
    description: "Tube light in room A-103 not working.",
    requestedDate: "18/05/2025",
    requestedTime: "11:20 AM",
  },
  {
    id: "MR2025O518-004",
    requestedBy: "Sneha Patel",
    blockRoom: "Block B / B-201",
    issueType: "Door Lock Issue",
    priority: "Medium",
    status: "In Progress",
    requestedOn: "17/05/2025 04:45 PM",
    category: "Furniture",
    description: "Room door lock is jammed.",
    requestedDate: "17/05/2025",
    requestedTime: "04:45 PM",
  },
  {
    id: "MR2025O517-005",
    requestedBy: "Vikram Singh",
    blockRoom: "Block B / B-202",
    issueType: "Geyser Not Working",
    priority: "High",
    status: "Completed",
    requestedOn: "17/05/2025 09:10 AM",
    category: "Appliance",
    description: "Geyser not heating water.",
    requestedDate: "17/05/2025",
    requestedTime: "09:10 AM",
  },
  {
    id: "MR2025O517-006",
    requestedBy: "Meera Nair",
    blockRoom: "Block C / C-301",
    issueType: "Plug Point Issue",
    priority: "Low",
    status: "Completed",
    requestedOn: "17/05/2025 10:05 AM",
    category: "Electrical",
    description: "Plug point not working in C-301.",
    requestedDate: "17/05/2025",
    requestedTime: "10:05 AM",
  },
  {
    id: "MR2025O516-007",
    requestedBy: "Pooja Iyer",
    blockRoom: "Block C / C-302",
    issueType: "Bathroom Tap Leakage",
    priority: "Medium",
    status: "Completed",
    requestedOn: "16/05/2025 02:15 PM",
    category: "Plumbing",
    description: "Tap in bathroom is leaking.",
    requestedDate: "16/05/2025",
    requestedTime: "02:15 PM",
  },
  {
    id: "MR2025O516-008",
    requestedBy: "Arjun Das",
    blockRoom: "Block D / D-401",
    issueType: "AC Not Cooling",
    priority: "High",
    status: "Completed",
    requestedOn: "16/05/2025 03:30 PM",
    category: "Appliance",
    description: "Air conditioner not cooling properly.",
    requestedDate: "16/05/2025",
    requestedTime: "03:30 PM",
  },
];

const WORK_ORDERS: WorkOrder[] = [
  {
    id: "WO2025O518-001",
    relatedRequest: "MR2025O518-002",
    issueType: "Water Leakage",
    assignedTo: "Ramesh Kumar",
    status: "In Progress",
    scheduledDate: "18/05/2025",
    notes: "Plumber assigned. Expected completion by evening.",
  },
  {
    id: "WO2025O518-002",
    relatedRequest: "MR2025O518-001",
    issueType: "Fan Not Working",
    assignedTo: "Suresh Yadav",
    status: "Open",
    scheduledDate: "18/05/2025",
    notes: "Electrician to visit today.",
  },
  {
    id: "WO2025O517-003",
    relatedRequest: "MR2025O517-005",
    issueType: "Geyser Not Working",
    assignedTo: "Mahesh Verma",
    status: "Completed",
    scheduledDate: "17/05/2025",
    notes: "Geyser repaired and tested.",
  },
];

const QUICK_ACTIONS: QuickActionItem[] = [
  { label: "Raise Request", icon: "Wrench", color: "text-[#7c3aed]", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
  { label: "View Work Orders", icon: "ClipboardList", color: "text-emerald-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
  { label: "Request History", icon: "History", color: "text-[#7c3aed]", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
  { label: "Maintenance Staff", icon: "HardHat", color: "text-orange-500", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
  { label: "Inventory", icon: "Package", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  { label: "Reports", icon: "FileText", color: "text-pink-500", bgColor: "bg-pink-50", borderColor: "border-pink-200" },
];

const REQUEST_TYPE_OPTIONS = ["All Types", "Repair", "Replacement", "Inspection", "Emergency", "Preventive Maintenance"];
const CATEGORY_OPTIONS = ["All Categories", "Electrical", "Plumbing", "Furniture", "Appliance", "Others"];
const PRIORITY_OPTIONS = ["All Priorities", "Low", "Medium", "High", "Emergency"];
const STATUS_OPTIONS = ["All Status", "Open", "In Progress", "Completed", "Overdue"];
const HOSTEL_BLOCK_OPTIONS = ["All Blocks", "Block A", "Block B", "Block C", "Block D"];
const ROWS_PER_PAGE_OPTIONS = [10, 20, 50];

const TOTAL_REQUESTS_COUNT = 128;

export default function MaintenanceManagementPage() {
  const [raiseRequestOpen, setRaiseRequestOpen] = useState(false);
  const [workOrdersOpen, setWorkOrdersOpen] = useState(false);
  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);

  const [requestHistoryOpen, setRequestHistoryOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);

  const [requestType, setRequestType] = useState(REQUEST_TYPE_OPTIONS[0]);
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [priority, setPriority] = useState(PRIORITY_OPTIONS[0]);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [hostelBlock, setHostelBlock] = useState(HOSTEL_BLOCK_OPTIONS[0]);
  const [dateRange, setDateRange] = useState("01/05/2025 - 18/05/2025");

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

  const handleMoreOptions = () => {
    setMoreOptionsOpen((prev) => !prev);
  };

  const handleQuickAction = (action: QuickActionItem) => {
    switch (action.label) {
      case "Raise Request":
        setRaiseRequestOpen(true);
        break;
      case "View Work Orders":
        setWorkOrdersOpen(true);
        break;
      case "Request History":
        setRequestHistoryOpen(true);
        break;
      case "Maintenance Staff":
        setStaffOpen(true);
        break;
      case "Inventory":
        setInventoryOpen(true);
        break;
      case "Reports":
        setReportOpen(true);
        break;
      default:
        showToast(`${action.label} workflow will be connected to the backend in the integration phase.`);
    }
  };

  const handleFilter = () => {
    setCurrentPage(1);
  };

  const handleReset = () => {
    setRequestType(REQUEST_TYPE_OPTIONS[0]);
    setCategory(CATEGORY_OPTIONS[0]);
    setPriority(PRIORITY_OPTIONS[0]);
    setStatus(STATUS_OPTIONS[0]);
    setHostelBlock(HOSTEL_BLOCK_OPTIONS[0]);
    setDateRange("");
    setCurrentPage(1);
  };

  const filteredRequests = useMemo(() => {
    let result = [...MAINTENANCE_REQUESTS];
    if (requestType !== "All Types") {
      result = result.filter((r) => r.issueType.toLowerCase().includes(requestType.toLowerCase()));
    }
    if (category !== "All Categories") {
      result = result.filter((r) => r.category === category);
    }
    if (priority !== "All Priorities") {
      result = result.filter((r) => r.priority === priority);
    }
    if (status !== "All Status") {
      result = result.filter((r) => r.status === status);
    }
    if (hostelBlock !== "All Blocks") {
      result = result.filter((r) => r.blockRoom.startsWith(hostelBlock));
    }
    if (dateRange) {
      const parts = dateRange.split(" - ");
      if (parts.length === 2) {
        const start = new Date(parts[0].split("/").reverse().join("-"));
        const end = new Date(parts[1].split("/").reverse().join("-"));
        result = result.filter((r) => {
          const reqDate = new Date(r.requestedDate.split("/").reverse().join("-"));
          return reqDate >= start && reqDate <= end;
        });
      }
    }
    return result;
  }, [requestType, category, priority, status, hostelBlock, dateRange]);

  const totalPages = Math.max(1, Math.ceil(TOTAL_REQUESTS_COUNT / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + rowsPerPage);
  const showingEnd = Math.min(startIndex + rowsPerPage, filteredRequests.length);

  const handleSaveRequest = (data: Record<string, string>) => {
    showToast("Maintenance request submitted successfully");
  };

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <MaintenanceManagementPageHeader
            onRaiseRequest={() => setRaiseRequestOpen(true)}
            onWorkOrders={() => setWorkOrdersOpen(true)}
            onMoreOptions={handleMoreOptions}
          />

          <MaintenanceSummaryCards cards={MAINTENANCE_SUMMARY_CARDS} />

          <MaintenanceFilters
            requestType={requestType}
            onRequestTypeChange={setRequestType}
            category={category}
            onCategoryChange={setCategory}
            priority={priority}
            onPriorityChange={setPriority}
            status={status}
            onStatusChange={setStatus}
            hostelBlock={hostelBlock}
            onHostelBlockChange={setHostelBlock}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onFilter={handleFilter}
            onReset={handleReset}
          />

          <MaintenanceRequestsTable
            requests={paginatedRequests}
            onView={setSelectedRequest}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={setRowsPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={TOTAL_REQUESTS_COUNT}
            showingStart={startIndex + 1}
            showingEnd={showingEnd}
          />

          <RecentWorkOrdersTable
            workOrders={WORK_ORDERS}
            onView={setSelectedWorkOrder}
            onViewAll={() => setWorkOrdersOpen(true)}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <RequestsByStatusChart />
            <RequestsByCategoryChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <MaintenanceQuickActions actions={QUICK_ACTIONS} onAction={handleQuickAction} />
            </div>
            <div>
              <MaintenanceImportantNote />
            </div>
          </div>

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      <RaiseMaintenanceRequestDialog open={raiseRequestOpen} onClose={() => setRaiseRequestOpen(false)} onSave={handleSaveRequest} />
      <WorkOrdersDialog open={workOrdersOpen} onClose={() => setWorkOrdersOpen(false)} onView={setSelectedWorkOrder} />
      <RequestHistoryDialog open={requestHistoryOpen} onClose={() => setRequestHistoryOpen(false)} onView={setSelectedRequest} />
      <MaintenanceStaffDialog open={staffOpen} onClose={() => setStaffOpen(false)} />
      <MaintenanceInventoryDialog open={inventoryOpen} onClose={() => setInventoryOpen(false)} />
      <MaintenanceReportDialog open={reportOpen} onClose={() => setReportOpen(false)} />
      <MaintenanceRequestDetailsDialog request={selectedRequest} open={!!selectedRequest} onClose={() => setSelectedRequest(null)} />
      <WorkOrderDetailsDialog workOrder={selectedWorkOrder} open={!!selectedWorkOrder} onClose={() => setSelectedWorkOrder(null)} />

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
                  showToast("Maintenance view exported successfully");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Export Maintenance View
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOptionsOpen(false);
                  showToast("Print dialog opened");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Print Request Register
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOptionsOpen(false);
                  showToast("Maintenance Settings coming soon");
                }}
                className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Maintenance Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
