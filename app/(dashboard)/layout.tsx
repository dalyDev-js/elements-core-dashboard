import LayoutSidebar from "@/components/layout/layout-sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutSidebar>{children}</LayoutSidebar>;
}
