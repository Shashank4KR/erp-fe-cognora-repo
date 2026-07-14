import Sidebar from "@/components/shared/layout/Sidebar";
import DashboardHeader from "@/components/shared/layout/Header";
import MainLayout from "@/components/shared/layout/MainLayout";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <MainLayout sidebar={<Sidebar />} header={<DashboardHeader />}>
      <div className="p-6">
        <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
          <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5f3ff] text-[#6d28d9]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2"
              />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </span>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-600">
            This module is coming soon. It is being built and will be available
            shortly.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
