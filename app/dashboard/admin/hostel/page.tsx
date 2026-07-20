import MainLayout from "@/components/shared/layout/MainLayout";
import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import { COMPANY_INFO } from "@/lib/constants";

export default function HostelOverviewPage() {
  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
                Hostel Overview
              </h1>
              <nav className="flex items-center gap-1.5 text-sm mb-8" aria-label="Breadcrumb">
                <span className="text-[#7c3aed] font-medium">Dashboard</span>
                <span className="text-slate-400">/</span>
                <span className="text-[#7c3aed] font-medium">Hostel</span>
                <span className="text-slate-400">/</span>
                <span className="text-slate-500 font-medium">Overview</span>
              </nav>

              <div className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 mb-4">
                Coming Soon
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 max-w-md mx-auto">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                  Hostel Overview is being redesigned.
                </h2>
                <p className="text-sm text-slate-500">
                  The new overview dashboard will be added in the next phase.
                </p>
              </div>
            </div>
          </div>

          <footer className="flex items-center justify-between py-4 px-6 text-xs text-slate-500 border-t border-slate-200">
            <span>{COMPANY_INFO.copyright}</span>
            <span>Version {COMPANY_INFO.version}</span>
          </footer>
        </div>
      </div>
    </MainLayout>
  );
}
