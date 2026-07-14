"use client";

import { BookOpen, Users, UserCheck, GraduationCap } from "lucide-react";
import Card from "@/components/shared/Card";
import type { ClassResponse } from "@/types/entities/class";

export default function ClassSummaryCards({
  items,
  studentCount = 0,
}: {
  items: ClassResponse[];
  studentCount?: number;
}) {
  const totalClasses = items.length;
  const activeClasses = items.filter((i) => !!i.class_teacher_id).length;
  const assignedTeachers = new Set(items.map((i) => i.class_teacher_id).filter(Boolean)).size;

  const stats = [
    { label: "Total Classes", value: totalClasses, icon: <BookOpen className="h-5 w-5" /> },
    { label: "Active Classes", value: activeClasses, icon: <Users className="h-5 w-5" /> },
    { label: "Total Students", value: studentCount, icon: <GraduationCap className="h-5 w-5" /> },
    {
      label: "Assigned Class Teachers",
      value: assignedTeachers,
      icon: <UserCheck className="h-5 w-5" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} hover>
          <div className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-[#6d28d9]">
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">{stat.label}</p>
              <p className="text-lg font-semibold text-slate-900">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
