import { QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { fetchNews } from '~/actions/fetch-news';
import Fallback from '~/components/error-component';
import { Loader } from '~/components/loader';
import { NewsFeed } from '~/components/news-feed';
import { RefreshButton } from '~/components/refresh-button';
import { NewsSourceSelect } from '~/components/select/new-source-select';
import { QuestionsSortBySelect } from '~/components/sort-by-select';
import { SortBy } from '~/utils/sort-utils';
import { Source } from '~/utils/source-utils';

interface SearchParams {
  sortBy?: SortBy;
  source?: Source;
  from?: string;
}

const validSources = ['bitcoin', 'apple', 'tesla'];
const validSortBy = ['popularity', 'publishedAt', 'relevancy'];

const NewsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const queryClient = new QueryClient();
  const orderBy = searchParams?.sortBy ?? 'publishedAt';
  const selectedSource = searchParams?.source ?? 'bitcoin';
  const fromDate = searchParams?.from;

  if (selectedSource && !validSources.includes(selectedSource)) {
    return notFound();
  }

  if (orderBy && !validSortBy.includes(orderBy)) {
    return notFound();
  }

  const articles = await queryClient.fetchQuery({
    queryKey: ['news', { source: selectedSource, sortBy: orderBy, from: fromDate }],
    queryFn: () => fetchNews(selectedSource, orderBy, fromDate),
  });

  return (
    <>
      <div className='flex justify-end'>
        <div className='inline-flex items-center lg:gap-x-5'>
          <RefreshButton />
          <div className='inline-flex items-center p-0.5 lg:gap-x-2'>
            <span className='hidden lg:inline-block text-nowrap text-sm text-muted-foreground'>Sort By:</span>
            <QuestionsSortBySelect sortBy={orderBy} />
          </div>
          <NewsSourceSelect selectedSource={selectedSource} />
        </div>
      </div>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8'>
          <Suspense key={Date.now()} fallback={<Loader />}>
            <NewsFeed initialArticles={articles} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default NewsPage;
