'use client';

import { ChartArea, Component, Menu, Newspaper, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn, PropsWithClassName } from '~/lib/utils';
import { buttonVariants } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { SidebarItem } from './dashboard-item';

const sidebarItems = [
  {
    name: 'News',
    route: '/',
    Icon: Newspaper,
  },
  {
    name: 'Statistics',
    route: '/statistics',
    Icon: ChartArea,
  },
  {
    name: 'Account',
    route: '/account',
    Icon: User,
  },
] as const;

export const DesktopDashboardSidebar = ({ className }: PropsWithClassName) => {
  return (
    <aside className={cn('border-r-green-500/30 h-full shrink-0 grow-0 bg-white border-r hidden lg:block lg:basis-[250px]', className)}>
      <DashboardSidebarContent />
    </aside>
  );
};

export const MobileDashboardSidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='pl-4 pt-4 lg:hidden'>
        <div className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
          <Menu className='w-5 h-5 mr-0.5' />
          <span>Menu</span>
        </div>
      </SheetTrigger>

      <SheetContent className='w-[250px] p-0 pt-2' side={'left'}>
        <DashboardSidebarContent />
      </SheetContent>
    </Sheet>
  );
};

export const DashboardSidebarContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className='flex flex-col h-full py-6 px-3'>
      <nav className='flex flex-col gap-2'>
        {sidebarItems.map((item) => (
          <button key={item.route} onClick={() => router.replace(item.route)}>
            <SidebarItem isActive={pathname === item.route} text={item.name} icon={item.Icon} />
          </button>
        ))}
      </nav>
    </div>
  );
};
