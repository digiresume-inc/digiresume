import { SidebarProvider, SidebarTrigger } from '@lf/ui/components/base/sidebar';
import { AppSidebar } from '@/app/dashboard/components/appsidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
