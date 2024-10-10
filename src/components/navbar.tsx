import { Newspaper } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { AuthLoader } from './loader';

export const Navbar = () => {
  return (
    <header className='bg-primary text-primary-foreground h-16 flex justify-between items-center px-4 lg:px-8 shrink-0 grow-0'>
      <Link href='/' className='inline-flex items-end gap-x-2'>
        <Logo />
        <span className='tracking-widest font-bold'>News App</span>
      </Link>
      <Suspense fallback={<AuthLoader />}>
        <Newspaper />
      </Suspense>
    </header>
  );
};

const Logo = () => <Newspaper color='white' size={28} />;
