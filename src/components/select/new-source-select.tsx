'use client';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type Props = {
  selectedSource?: string;
};

const newsSources = [
  { id: 'bitcoin', name: 'Bitcoin' },
  { id: 'apple', name: 'Apple' },
  { id: 'tesla', name: 'Tesla' },
  { id: 'tech', name: 'TechCrunch & The Next Web' },
];

export const NewsSourceSelect = ({ selectedSource }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleValueChange = useCallback(
    (value: string) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (value) {
        newSearchParams.set('source', value);
      } else {
        newSearchParams.delete('source');
      }

      if (value === 'tech') {
        newSearchParams.set('domains', encodeURIComponent('techcrunch.com,thenextweb.com'));
      } else {
        newSearchParams.delete('domains');
      }

      router.replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return (
    <Select onValueChange={handleValueChange} defaultValue={selectedSource} key={`${pathname}${searchParams.toString()}`}>
      <SelectTrigger className='w-full lg:w-[180px]'>
        <SelectValue placeholder='Select Source' />
      </SelectTrigger>
      <SelectContent>
        {newsSources.map((source) => (
          <SelectItem key={source.id} value={source.id}>
            {source.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
