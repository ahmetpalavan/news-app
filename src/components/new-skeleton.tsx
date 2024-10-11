import { forwardRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { Skeleton } from './ui/skeleton';

export const NewSkeleton = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <Card ref={ref} className='w-full sm:w-[350px] md:w-[415px] mx-auto my-6 shadow-md overflow-hidden flex flex-col'>
      <div className='w-full h-32 sm:h-48 md:h-64 lg:h-72 bg-gray-200 animate-pulse'></div>
      <CardContent className='flex-1 flex flex-col p-4'>
        <CardHeader className='flex flex-col gap-y-2'>
          <Skeleton className='w-[200px] sm:w-[250px] md:w-[322px] h-4 bg-gray-200 animate-pulse rounded'></Skeleton>
          <Skeleton className='w-[150px] sm:w-[200px] md:w-[322px] h-4 bg-gray-200 animate-pulse rounded'></Skeleton>
        </CardHeader>
        <div className='flex flex-col gap-y-2 mt-4'>
          <Skeleton className='w-[250px] sm:w-[300px] md:w-[370px] h-4 bg-gray-200 animate-pulse rounded'></Skeleton>
          <Skeleton className='w-[220px] sm:w-[280px] md:w-[370px] h-4 bg-gray-200 animate-pulse rounded'></Skeleton>
          <Skeleton className='w-[200px] sm:w-[260px] md:w-[370px] h-4 bg-gray-200 animate-pulse rounded'></Skeleton>
        </div>
        <div className='flex-1'></div>
        <CardFooter className='mt-4'>
          <Skeleton className='w-20 sm:w-24 h-4 bg-gray-200 animate-pulse rounded'></Skeleton>
        </CardFooter>
      </CardContent>
    </Card>
  );
});

NewSkeleton.displayName = 'NewSkeleton';
