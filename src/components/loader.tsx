import { Loader2 } from 'lucide-react';
import { green } from 'tailwindcss/colors';
import { cn, PropsWithClassName } from '~/lib/utils';
import { Skeleton } from './ui/skeleton';

export const Loader = () => {
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <Loader2 className='w-10 h-10 animate-spin' stroke={green[500]} />
    </div>
  );
};

export const AuthLoader = ({ className }: PropsWithClassName) => {
  return <Skeleton className={cn('w-32 h-10 bg-slate-200/50', className)} />;
};
