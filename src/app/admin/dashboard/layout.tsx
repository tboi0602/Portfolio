import { Sidebar } from "@/components/admin/sidebar";
import { AdminGuard } from "@/components/admin/admin-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <Sidebar />
      <div className="pl-56 min-h-screen">
        <main className="p-8">{children}</main>
      </div>
    </AdminGuard>
  );
}
