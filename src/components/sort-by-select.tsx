'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { match } from 'ts-pattern';
import { questionPageQueryParams } from '~/config/query-param';
import { SortBy } from '~/utils/sort-utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type Props = {
  sortBy?: SortBy;
};

export const QuestionsSortBySelect = ({ sortBy }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleValueChange = useCallback(
    (value: SortBy) => {
      const newSearchParams = new URLSearchParams(searchParams);

      const orderBy = match(value)
        .with('popularity', () => 'popularity')
        .with('publishedAt', () => 'publishedAt')
        .with('relevancy', () => 'relevancy')
        .otherwise(() => undefined);

      if (orderBy) {
        newSearchParams.set(questionPageQueryParams.sortBy, orderBy);
      } else {
        newSearchParams.delete(questionPageQueryParams.sortBy);
      }

      router.replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return (
    <Select onValueChange={handleValueChange} defaultValue={sortBy} key={`${pathname}${searchParams.toString()}`}>
      <SelectTrigger className='w-full lg:w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={'publishedAt' as SortBy}>Newest</SelectItem>
        <SelectItem value={'popularity' as SortBy}>Popularity</SelectItem>
        <SelectItem value={'relevancy' as SortBy}>Relevance</SelectItem>
      </SelectContent>
    </Select>
  );
};
