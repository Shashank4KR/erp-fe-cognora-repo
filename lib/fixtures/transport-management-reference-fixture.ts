/**
 * This data exists only for the approved Transport Management UI implementation.
 * Replace it with backend API data during the later integration phase.
 */

export interface VehicleTrip {
  id: string;
  routeId: string;
  routeName: string;
  routeColor: string;
  stops: string;
  vehicleNo: string;
  driverName: string;
  pickupTime: string;
  dropTime: string;
  students: number;
  status: "Running" | "Completed" | "Delayed" | "Cancelled";
}

export interface RouteListItem {
  routeId: string;
  routeName: string;
  routeColor: string;
  stops: number;
  students: number;
  vehicle: string;
  driver: string;
  status: "Active" | "Inactive";
}

export interface TrackingVehicle {
  vehicleNo: string;
  routeId: string;
  routeName: string;
  routeColor: string;
  driverName: string;
  status: "Live" | "Completed";
}

export interface SummaryCard {
  title: string;
  value: string;
  footer: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  tint: string;
}

export interface QuickAction {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const ROUTE_OPTIONS = [
  "All Routes",
  "Route 1 (Green)",
  "Route 2 (Blue)",
  "Route 3 (Yellow)",
  "Route 4 (Red)",
  "Route 5 (Orange)",
];

export const VEHICLE_OPTIONS = [
  "All Vehicles",
  "KA-05-AB-1234",
  "KA-05-CD-5678",
  "KA-05-EF-9012",
  "KA-05-GH-3456",
  "KA-05-IJ-7890",
];

export const DRIVER_OPTIONS = [
  "All Drivers",
  "Ramesh Kumar",
  "Suresh Yadav",
  "Mahesh Singh",
  "Prakash Patel",
  "Anil Verma",
];

export const STATUS_OPTIONS = ["All Status", "Running", "Completed", "Delayed", "Cancelled"];
export const TRIP_STATUS_OPTIONS = ["All Status", "Running", "Completed", "Delayed", "Cancelled"];
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];

export const VEHICLE_TYPE_OPTIONS = ["Bus", "Van", "Mini Bus", "Car"];
export const VEHICLE_STATUS_OPTIONS = ["Active", "Maintenance", "Inactive"];

export const SUMMARY_CARDS: SummaryCard[] = [
  {
    title: "Total Vehicles",
    value: "18",
    footer: "Active Vehicles",
    icon: "Bus",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    tint: "bg-blue-50/60",
  },
  {
    title: "Total Routes",
    value: "12",
    footer: "Active Routes",
    icon: "Route",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tint: "bg-emerald-50/60",
  },
  {
    title: "Total Students",
    value: "426",
    footer: "Using Transport",
    icon: "Users",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    tint: "bg-orange-50/60",
  },
  {
    title: "Total Drivers",
    value: "18",
    footer: "Assigned Drivers",
    icon: "Driver",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    tint: "bg-purple-50/60",
  },
  {
    title: "Today's Trips",
    value: "24",
    footer: "Running Trips",
    icon: "Calendar",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    tint: "bg-pink-50/60",
  },
];

export const VEHICLE_TRIPS: VehicleTrip[] = [
  {
    id: "1",
    routeId: "R001",
    routeName: "Route 1 (Green)",
    routeColor: "#10b981",
    stops: "Central Park → School",
    vehicleNo: "KA-05-AB-1234",
    driverName: "Ramesh Kumar",
    pickupTime: "07:15 AM",
    dropTime: "03:15 PM",
    students: 42,
    status: "Running",
  },
  {
    id: "2",
    routeId: "R002",
    routeName: "Route 2 (Blue)",
    routeColor: "#3b82f6",
    stops: "Sun City → School",
    vehicleNo: "KA-05-CD-5678",
    driverName: "Suresh Yadav",
    pickupTime: "07:30 AM",
    dropTime: "03:30 PM",
    students: 38,
    status: "Running",
  },
  {
    id: "3",
    routeId: "R003",
    routeName: "Route 3 (Yellow)",
    routeColor: "#eab308",
    stops: "Green Field → School",
    vehicleNo: "KA-05-EF-9012",
    driverName: "Mahesh Singh",
    pickupTime: "07:20 AM",
    dropTime: "03:20 PM",
    students: 35,
    status: "Running",
  },
  {
    id: "4",
    routeId: "R004",
    routeName: "Route 4 (Red)",
    routeColor: "#ef4444",
    stops: "City Center → School",
    vehicleNo: "KA-05-GH-3456",
    driverName: "Prakash Patel",
    pickupTime: "07:25 AM",
    dropTime: "03:25 PM",
    students: 40,
    status: "Completed",
  },
  {
    id: "5",
    routeId: "R005",
    routeName: "Route 5 (Orange)",
    routeColor: "#f97316",
    stops: "New Town → School",
    vehicleNo: "KA-05-IJ-7890",
    driverName: "Anil Verma",
    pickupTime: "07:40 AM",
    dropTime: "03:40 PM",
    students: 32,
    status: "Running",
  },
];

export const ROUTE_LIST: RouteListItem[] = [
  {
    routeId: "R001",
    routeName: "Route 1 (Green)",
    routeColor: "#10b981",
    stops: 5,
    students: 42,
    vehicle: "KA-05-AB-1234",
    driver: "Ramesh Kumar",
    status: "Active",
  },
  {
    routeId: "R002",
    routeName: "Route 2 (Blue)",
    routeColor: "#3b82f6",
    stops: 6,
    students: 38,
    vehicle: "KA-05-CD-5678",
    driver: "Suresh Yadav",
    status: "Active",
  },
  {
    routeId: "R003",
    routeName: "Route 3 (Yellow)",
    routeColor: "#eab308",
    stops: 4,
    students: 35,
    vehicle: "KA-05-EF-9012",
    driver: "Mahesh Singh",
    status: "Active",
  },
  {
    routeId: "R004",
    routeName: "Route 4 (Red)",
    routeColor: "#ef4444",
    stops: 6,
    students: 40,
    vehicle: "KA-05-GH-3456",
    driver: "Prakash Patel",
    status: "Active",
  },
  {
    routeId: "R005",
    routeName: "Route 5 (Orange)",
    routeColor: "#f97316",
    stops: 6,
    students: 32,
    vehicle: "KA-05-IJ-7890",
    driver: "Anil Verma",
    status: "Active",
  },
];

export const TRACKING_VEHICLES: TrackingVehicle[] = [
  {
    vehicleNo: "KA-05-AB-1234",
    routeId: "R001",
    routeName: "Route 1",
    routeColor: "#10b981",
    driverName: "Ramesh Kumar",
    status: "Live",
  },
  {
    vehicleNo: "KA-05-CD-5678",
    routeId: "R002",
    routeName: "Route 2",
    routeColor: "#3b82f6",
    driverName: "Suresh Yadav",
    status: "Live",
  },
  {
    vehicleNo: "KA-05-EF-9012",
    routeId: "R003",
    routeName: "Route 3",
    routeColor: "#eab308",
    driverName: "Mahesh Singh",
    status: "Live",
  },
  {
    vehicleNo: "KA-05-GH-3456",
    routeId: "R004",
    routeName: "Route 4",
    routeColor: "#ef4444",
    driverName: "Prakash Patel",
    status: "Completed",
  },
  {
    vehicleNo: "KA-05-IJ-7890",
    routeId: "R005",
    routeName: "Route 5",
    routeColor: "#f97316",
    driverName: "Anil Verma",
    status: "Live",
  },
];

export const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "Add Route",
    icon: "Map",
    color: "text-[#7c3aed]",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    label: "Add Vehicle",
    icon: "Truck",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    label: "Assign Driver",
    icon: "User",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    label: "Route Schedule",
    icon: "CalendarClock",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    label: "Transport Fee",
    icon: "Wallet",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
  {
    label: "Transport Report",
    icon: "FileText",
    color: "text-[#7c3aed]",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

export const TOTAL_TRIPS_COUNT = 24;
