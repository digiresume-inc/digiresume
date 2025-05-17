import { AppSidebar } from "@lf/ui/components/app-sidebar"
import { ChartAreaInteractive } from "@lf/ui/components/chart-area-interactive"
import { DataTable } from "@lf/ui/components/data-table"
import { SectionCards } from "@lf/ui/components/section-cards"
import { SiteHeader } from "@lf/ui/components/site-header"
import { SidebarInset, SidebarProvider } from "@lf/ui/components/base/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-secondary/20">
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
