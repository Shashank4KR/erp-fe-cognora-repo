"use client";

import { useState, useMemo } from "react";
import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import TransportManagementPageHeader from "@/components/dashboard/transport/TransportManagementPageHeader";
import TransportSummaryCards from "@/components/dashboard/transport/TransportSummaryCards";
import TransportFilters from "@/components/dashboard/transport/TransportFilters";
import VehicleTripsTable from "@/components/dashboard/transport/VehicleTripsTable";
import VehicleTripsPagination from "@/components/dashboard/transport/VehicleTripsPagination";
import LiveVehicleTracking from "@/components/dashboard/transport/LiveVehicleTracking";
import RouteListCard from "@/components/dashboard/transport/RouteListCard";
import TransportQuickActions from "@/components/dashboard/transport/TransportQuickActions";
import AddVehicleDialog from "@/components/dashboard/transport/AddVehicleDialog";
import AddRouteDialog from "@/components/dashboard/transport/AddRouteDialog";
import AssignDriverDialog from "@/components/dashboard/transport/AssignDriverDialog";
import RouteScheduleDialog from "@/components/dashboard/transport/RouteScheduleDialog";
import TransportFeeDialog from "@/components/dashboard/transport/TransportFeeDialog";
import TransportReportDialog from "@/components/dashboard/transport/TransportReportDialog";
import TripDetailsDialog from "@/components/dashboard/transport/TripDetailsDialog";
import {
  SUMMARY_CARDS,
  VEHICLE_TRIPS,
  ROUTE_LIST,
  TRACKING_VEHICLES,
  QUICK_ACTIONS,
  ROWS_PER_PAGE_OPTIONS,
  TOTAL_TRIPS_COUNT,
  STATUS_OPTIONS,
} from "@/lib/fixtures/transport-management-reference-fixture";
import type { VehicleTrip, TrackingVehicle, QuickAction } from "@/lib/fixtures/transport-management-reference-fixture";

export default function TransportManagementPage() {
  const [trips] = useState<VehicleTrip[]>(VEHICLE_TRIPS);
  const [routes] = useState(ROUTE_LIST);
  const [trackingVehicles] = useState<TrackingVehicle[]>(TRACKING_VEHICLES);

  const [routeFilter, setRouteFilter] = useState("All Routes");
  const [vehicleFilter, setVehicleFilter] = useState("All Vehicles");
  const [driverFilter, setDriverFilter] = useState("All Drivers");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [fromDate, setFromDate] = useState("Select Date");
  const [toDate, setToDate] = useState("Select Date");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [highlightedVehicle, setHighlightedVehicle] = useState<string | undefined>(undefined);

  const [addVehicleOpen, setAddVehicleOpen] = useState(false);
  const [addRouteOpen, setAddRouteOpen] = useState(false);
  const [assignDriverOpen, setAssignDriverOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [feeOpen, setFeeOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<VehicleTrip | null>(null);
  const [tripDetailsOpen, setTripDetailsOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({
    open: false,
    title: "",
    message: "",
  });

  const showToast = (message: string) => {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-6 right-6 z-[200] rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-2xl";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const filteredTrips = useMemo(() => {
    let result = [...trips];
    if (routeFilter !== "All Routes") {
      result = result.filter((t) => t.routeName === routeFilter);
    }
    if (vehicleFilter !== "All Vehicles") {
      result = result.filter((t) => t.vehicleNo === vehicleFilter);
    }
    if (driverFilter !== "All Drivers") {
      result = result.filter((t) => t.driverName === driverFilter);
    }
    if (statusFilter !== "All Status") {
      result = result.filter((t) => t.status === statusFilter);
    }
    return result;
  }, [trips, routeFilter, vehicleFilter, driverFilter, statusFilter]);

  const paginatedTrips = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredTrips.slice(start, start + rowsPerPage);
  }, [filteredTrips, currentPage, rowsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredTrips.length / rowsPerPage));
  const showingStart = filteredTrips.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const showingEnd = Math.min(currentPage * rowsPerPage, filteredTrips.length);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleAddClick = () => {
    setActionDialog({
      open: true,
      title: "Add Vehicle / Route",
      message: "Select an option to continue: Add Vehicle, Add Route, Assign Driver, or Create Schedule.",
    });
  };

  const handleMoreOptions = () => {
    setActionDialog({
      open: true,
      title: "More Options",
      message: "Export Transport View, Print Current Schedule, and Transport Settings will be available here.",
    });
  };

  const handleQuickAction = (action: QuickAction) => {
    switch (action.label) {
      case "Add Route":
        setAddRouteOpen(true);
        break;
      case "Add Vehicle":
        setAddVehicleOpen(true);
        break;
      case "Assign Driver":
        setAssignDriverOpen(true);
        break;
      case "Route Schedule":
        setScheduleOpen(true);
        break;
      case "Transport Fee":
        setFeeOpen(true);
        break;
      case "Transport Report":
        setReportOpen(true);
        break;
      default:
        setActionDialog({
          open: true,
          title: action.label,
          message: `The "${action.label}" workflow will be connected to the backend in the integration phase.`,
        });
    }
  };

  const handleVehicleLocation = (trip: VehicleTrip) => {
    setHighlightedVehicle(trip.vehicleNo);
    showToast(`Highlighting ${trip.vehicleNo} on map`);
  };

  const handleVehicleView = (trip: VehicleTrip) => {
    setSelectedTrip(trip);
    setTripDetailsOpen(true);
  };

  const handleVehicleTrackingSelect = (vehicle: typeof trackingVehicles[0]) => {
    setHighlightedVehicle(vehicle.vehicleNo);
  };

  const handleSaveVehicle = (data: {
    vehicleNo: string;
    vehicleType: string;
    capacity: string;
    route: string;
    driver: string;
    status: string;
    insuranceExpiry: string;
    registrationExpiry: string;
    notes: string;
  }) => {
    showToast(`Vehicle ${data.vehicleNo} added successfully`);
  };

  const handleSaveRoute = (data: {
    routeName: string;
    routeColor: string;
    startingPoint: string;
    destination: string;
    stops: string;
    assignedVehicle: string;
    assignedDriver: string;
    pickupTime: string;
    dropTime: string;
    status: string;
  }) => {
    showToast(`Route "${data.routeName}" added successfully`);
  };

  const handleAssignDriver = (data: { vehicle: string; driver: string; route: string }) => {
    showToast(`Driver assigned to ${data.vehicle} successfully`);
  };

  const handleSaveSchedule = (data: {
    route: string;
    driver: string;
    pickupTime: string;
    dropTime: string;
    date: string;
  }) => {
    showToast(`Schedule saved for ${data.route}`);
  };

  const handleSaveFee = (data: {
    student: string;
    route: string;
    vehicle: string;
    amount: string;
    dueDate: string;
    status: string;
  }) => {
    showToast(`Transport fee saved for ${data.student}`);
  };

  const handleFilter = () => {
    setCurrentPage(1);
    showToast("Filters applied");
  };

  const handleReset = () => {
    setRouteFilter("All Routes");
    setVehicleFilter("All Vehicles");
    setDriverFilter("All Drivers");
    setStatusFilter("All Status");
    setFromDate("Select Date");
    setToDate("Select Date");
    setCurrentPage(1);
  };

  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-[1400px]">
          <TransportManagementPageHeader
            onAddClick={handleAddClick}
            onMoreOptions={handleMoreOptions}
          />

          <TransportSummaryCards cards={SUMMARY_CARDS} />

          <TransportFilters
            route={routeFilter}
            onRouteChange={setRouteFilter}
            vehicle={vehicleFilter}
            onVehicleChange={setVehicleFilter}
            driver={driverFilter}
            onDriverChange={setDriverFilter}
            status={statusFilter}
            onStatusChange={setStatusFilter}
            fromDate={fromDate}
            onFromDateChange={setFromDate}
            toDate={toDate}
            onToDateChange={setToDate}
            onFilter={handleFilter}
            onReset={handleReset}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2 bg-white rounded-lg border border-slate-200 flex flex-col">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Today&apos;s Vehicle Trips</h3>
              </div>
              <VehicleTripsTable trips={paginatedTrips} onLocation={handleVehicleLocation} onView={handleVehicleView} />
              <VehicleTripsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                totalItems={filteredTrips.length}
                showingStart={showingStart}
                showingEnd={showingEnd}
              />
            </div>

            <div className="xl:col-span-1">
              <LiveVehicleTracking
                vehicles={trackingVehicles}
                onViewAll={() =>
                  setActionDialog({
                    open: true,
                    title: "Live Vehicle Tracking",
                    message: "A full vehicle tracking view will be available here in a future update.",
                  })
                }
                onVehicleSelect={handleVehicleTrackingSelect}
                highlightedVehicle={highlightedVehicle}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            <div className="xl:col-span-2">
              <RouteListCard routes={routes} onViewAll={() => setActionDialog({ open: true, title: "Route List", message: "A full route list view will be available here in a future update." })} />
            </div>
            <div className="xl:col-span-1">
              <TransportQuickActions actions={QUICK_ACTIONS} onAction={handleQuickAction} />
            </div>
          </div>

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200 mt-6">
            <span>© 2025 EdTech Smart Campus ERP. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </div>

      {/* Dialogs */}
      <AddVehicleDialog open={addVehicleOpen} onClose={() => setAddVehicleOpen(false)} onSave={handleSaveVehicle} />
      <AddRouteDialog open={addRouteOpen} onClose={() => setAddRouteOpen(false)} onSave={handleSaveRoute} />
      <AssignDriverDialog open={assignDriverOpen} onClose={() => setAssignDriverOpen(false)} onSave={handleAssignDriver} />
      <RouteScheduleDialog open={scheduleOpen} onClose={() => setScheduleOpen(false)} onSave={handleSaveSchedule} />
      <TransportFeeDialog open={feeOpen} onClose={() => setFeeOpen(false)} onSave={handleSaveFee} />
      <TransportReportDialog open={reportOpen} onClose={() => setReportOpen(false)} />
      <TripDetailsDialog trip={selectedTrip} open={tripDetailsOpen} onClose={() => setTripDetailsOpen(false)} />

      {/* Generic action dialog */}
      {actionDialog.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActionDialog({ open: false, title: "", message: "" })} />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">{actionDialog.title}</h3>
              <button
                onClick={() => setActionDialog({ open: false, title: "", message: "" })}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600">{actionDialog.message}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setActionDialog({ open: false, title: "", message: "" })}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
