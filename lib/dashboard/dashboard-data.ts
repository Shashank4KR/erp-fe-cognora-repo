import type {
  StatCard,
  AttendanceData,
  Activity,
  Event,
  StudentClass,
  FeesData,
} from "@/types/dashboard";

export const statsCards: StatCard[] = [
  {
    id: "students",
    title: "Total Students",
    value: "1,248",
    change: "+24 this month",
    icon: "Users",
    backgroundColor: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    id: "teachers",
    title: "Total Teachers",
    value: "86",
    change: "+5 this month",
    icon: "Users",
    backgroundColor: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    id: "classes",
    title: "Total Classes",
    value: "56",
    change: "+2 this month",
    icon: "GraduationCap",
    backgroundColor: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: "subjects",
    title: "Total Subjects",
    value: "124",
    change: "+3 this month",
    icon: "BookOpen",
    backgroundColor: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "fees",
    title: "Fees Collected",
    value: "₹18,50,000",
    change: "+12%",
    icon: "Wallet",
    backgroundColor: "bg-pink-50",
    iconColor: "text-pink-500",
  },
];

export const attendanceData: AttendanceData[] = [
  { day: "Mon", percentage: 85 },
  { day: "Tue", percentage: 88 },
  { day: "Wed", percentage: 92 },
  { day: "Thu", percentage: 80 },
  { day: "Fri", percentage: 78 },
  { day: "Sat", percentage: 65 },
];

export const feesData: FeesData[] = [
  { week: "Week 1", amount: 12000 },
  { week: "Week 2", amount: 18000 },
  { week: "Week 3", amount: 15000 },
  { week: "Week 4", amount: 23000 },
  { week: "Week 5", amount: 31000 },
];

export const activities: Activity[] = [
  {
    id: "1",
    description: "New student Aditya Sharma has been admitted",
    timeAgo: "2 mins ago",
    iconBg: "bg-purple-100",
    icon: "Users",
  },
  {
    id: "2",
    description: "Fee payment of ₹15,000 received from Rahul Verma",
    timeAgo: "1 hour ago",
    iconBg: "bg-green-100",
    icon: "CheckCircle",
  },
  {
    id: "3",
    description: "New timetable for Class 10-A has been published",
    timeAgo: "3 hours ago",
    iconBg: "bg-yellow-100",
    icon: "Calendar",
  },
  {
    id: "4",
    description: "ID cards generated for 25 students",
    timeAgo: "5 hours ago",
    iconBg: "bg-red-100",
    icon: "FileText",
  },
  {
    id: "5",
    description: "Library book issued to Priya Singh",
    timeAgo: "1 day ago",
    iconBg: "bg-blue-100",
    icon: "BookOpen",
  },
];

export const events: Event[] = [
  {
    id: "1",
    title: "Parent Teacher Meeting",
    date: "10:00 AM - 12:00 PM",
    month: "MAY",
    day: 22,
    time: "10:00 AM",
  },
  {
    id: "2",
    title: "Annual Sports Day",
    date: "9:00 AM - 04:00 PM",
    month: "MAY",
    day: 25,
    time: "9:00 AM",
  },
  {
    id: "3",
    title: "Science Exhibition",
    date: "11:00 AM - 02:00 PM",
    month: "MAY",
    day: 28,
    time: "11:00 AM",
  },
  {
    id: "4",
    title: "Monthly Exam Begins",
    date: "09:00 AM - 12:00 PM",
    month: "MAY",
    day: 31,
    time: "09:00 AM",
  },
];

export const studentsByClass: StudentClass[] = [
  { id: "1", name: "Class 1", count: 80, color: "bg-blue-500" },
  { id: "2", name: "Class 2", count: 85, color: "bg-fuchsia-500" },
  { id: "3", name: "Class 3", count: 90, color: "bg-teal-500" },
  { id: "4", name: "Class 4", count: 95, color: "bg-orange-500" },
  { id: "5", name: "Class 5", count: 100, color: "bg-indigo-500" },
  { id: "6", name: "Class 6", count: 105, color: "bg-pink-500" },
  { id: "7", name: "Class 7", count: 110, color: "bg-emerald-500" },
  { id: "8", name: "Class 8", count: 115, color: "bg-cyan-500" },
  { id: "9", name: "Class 9", count: 120, color: "bg-amber-500" },
  { id: "10", name: "Class 10", count: 125, color: "bg-rose-500" },
  { id: "11", name: "Class 11", count: 108, color: "bg-violet-500" },
  { id: "12", name: "Class 12", count: 115, color: "bg-slate-500" },
];

export const allActivities: Activity[] = [
  ...activities,
  {
    id: "6",
    description: "Mark sheet generated for Class 12 Science",
    timeAgo: "2 days ago",
    iconBg: "bg-green-100",
    icon: "FileText",
  },
  {
    id: "7",
    description: "Transport route updated for Sector 12",
    timeAgo: "3 days ago",
    iconBg: "bg-blue-100",
    icon: "BookOpen",
  },
  {
    id: "8",
    description: "Staff meeting scheduled for Friday",
    timeAgo: "4 days ago",
    iconBg: "bg-yellow-100",
    icon: "Calendar",
  },
  {
    id: "9",
    description: "12 new admission enquiries received",
    timeAgo: "5 days ago",
    iconBg: "bg-purple-100",
    icon: "Users",
  },
  {
    id: "10",
    description: "Exam results published for Class 9",
    timeAgo: "1 week ago",
    iconBg: "bg-red-100",
    icon: "CheckCircle",
  },
];
