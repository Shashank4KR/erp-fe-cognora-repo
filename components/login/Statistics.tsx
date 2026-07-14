import { Building2, Users, GraduationCap, Grid3X3 } from "lucide-react";

const stats = [
  { icon: Building2, value: "5000+", label: "Institutions" },
  { icon: Users, value: "1M+", label: "Students" },
  { icon: GraduationCap, value: "50K+", label: "Faculty & Staff" },
  { icon: Grid3X3, value: "20+", label: "Modules" },
];

export default function Statistics() {
  return (
    <div className="grid grid-cols-2 gap-3 bg-linear-to-r from-[#4f2bd8] via-[#5b2ee6] to-[#7c3aed] px-5 py-4 text-white sm:grid-cols-4 sm:gap-0">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="flex items-center justify-center gap-2 rounded-xl px-2 py-2 sm:justify-start sm:px-3">
            <Icon className="h-4.5 w-4.5 text-white/90" />
            <div>
              <h3 className="text-sm font-semibold leading-none">{item.value}</h3>
              <p className="mt-1 text-[10px] text-white/80">{item.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}