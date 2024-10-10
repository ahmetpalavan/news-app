import { PropsWithChildren } from 'react';
import { DesktopDashboardSidebar, MobileDashboardSidebar } from '~/components/layout/dashboard-sidebar';
import { Navbar } from '~/components/navbar';
import { ScrollArea } from '~/components/ui/scroll-area';

export const dynamic = 'force-dynamic';

const EventsLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main className='h-[calc(100vh-4rem)]'>
        <div className='flex flex-row h-full'>
          <DesktopDashboardSidebar />
          <div className='flex flex-col overflow-auto w-full items-start grow'>
            <MobileDashboardSidebar />
            <div className='w-full h-full overflow-auto pb-4 p-6'>
              <ScrollArea className='relative h-full bg-white drop-shadow-md border px-2.5 py-4 rounded-b-lg lg:rounded-lg lg:p-6'>
                {children}
              </ScrollArea>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EventsLayout;
