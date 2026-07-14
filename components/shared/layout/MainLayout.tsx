"use client";

import { ReactNode } from "react";

interface MainLayoutProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

export default function MainLayout({
  sidebar,
  header,
  children,
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {sidebar}

      <div className="flex-1 lg:ml-[280px] flex flex-col">
        {header}

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
