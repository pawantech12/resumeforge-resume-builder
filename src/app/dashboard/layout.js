import { DashboardNav } from "@/components/dashboard-nav";
import { DashboardHeader } from "@/components/dashboard-header";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav className="hidden md:flex" />
        <main className="flex-1 p-5">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
