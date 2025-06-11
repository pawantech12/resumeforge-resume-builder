import { DashboardNav } from "@/components/dashboard-nav";
import { DashboardHeader } from "@/components/dashboard-header";
import { Toaster } from "sonner";
import { Suspense } from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav className="hidden md:flex" />
        <main className="flex-1 p-5">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
