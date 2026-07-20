/**
 * This data exists only for the approved Hostel Students UI implementation.
 * Replace it with backend API data during the later integration phase.
 */

export interface HostelStudent {
  id: string;
  admissionNo: string;
  rollNo: string;
  studentName: string;
  classSection: string;
  roomNo: string;
  block: string;
  gender: string;
  dateOfBirth: string;
  contactNo: string;
  status: "Active" | "Inactive" | "Checked Out";
  photo?: string;
  initials: string;
  checkInDate: string;
  guardianName: string;
  guardianContact: string;
  notes?: string;
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

export interface BlockSegment {
  label: string;
  value: number;
  color: string;
}

export interface CheckInRow {
  id: string;
  studentName: string;
  roomNo: string;
  block: string;
  checkInDate: string;
  guardianName: string;
  contactNo: string;
}

export interface QuickAction {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const HOSTEL_STUDENTS_SUMMARY_CARDS: SummaryCard[] = [
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

export const BLOCK_SEGMENTS: BlockSegment[] = [
  { label: "Block A (Boys)", value: 90, color: "#7c3aed" },
  { label: "Block B (Boys)", value: 88, color: "#10b981" },
  { label: "Block C (Girls)", value: 72, color: "#f97316" },
  { label: "Block D (Girls)", value: 36, color: "#ec4899" },
];

export const HOSTEL_STUDENTS: HostelStudent[] = [
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

export const RECENT_CHECK_INS: CheckInRow[] = [
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

export const HOSTEL_STUDENTS_QUICK_ACTIONS: QuickAction[] = [
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

export const HOSTEL_BLOCK_OPTIONS = [
  "All Blocks",
  "Block A",
  "Block B",
  "Block C",
  "Block D",
];

export const ROOM_OPTIONS = [
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

export const GENDER_OPTIONS = ["All", "Male", "Female"];

export const CLASS_SECTION_OPTIONS = [
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

export const STATUS_OPTIONS = ["All Status", "Active", "Inactive", "Checked Out"];

export const BLOCK_FILTER_OPTIONS = ["All Blocks", "Boys Blocks", "Girls Blocks"];
