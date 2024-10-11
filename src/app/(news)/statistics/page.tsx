import { QueryClient } from '@tanstack/react-query';
import { getHours } from 'date-fns';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { fetchNews } from '~/actions/fetch-news';
import { Chart } from '~/components/charts/chart';
import { Loader } from '~/components/loader';
import { NewsSourceSelect } from '~/components/select/new-source-select';
import { SortBy } from '~/utils/sort-utils';
import { Source } from '~/utils/source-utils';

interface SearchParams {
  sortBy?: SortBy;
  source?: Source;
  from?: string;
}

const validSources = ['bitcoin', 'apple', 'tesla', 'tech'];
const validSortBy = ['popularity', 'publishedAt', 'relevancy'];

const StatisticsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
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

  const formattedData = () => {
    const hoursCount = Array(24).fill(0);

    articles.forEach((article) => {
      const hour = getHours(new Date(article.publishedAt));
      hoursCount[hour]++;
    });

    return hoursCount.map((count, hour) => ({
      hour: `${hour}:00`,
      count,
    }));
  };

  return (
    <>
      <div className='flex justify-end p-0.5'>
        <div className='inline-flex items-center lg:gap-x-5'>
          <NewsSourceSelect selectedSource={selectedSource} />
        </div>
      </div>
      <h2 className='text-xl font-bold mt-4'>{selectedSource.charAt(0).toUpperCase() + selectedSource.slice(1)} News Statistics</h2>
      <div className='mt-6'>
        <Suspense fallback={<Loader />}>
          <Chart data={formattedData()} />
        </Suspense>
      </div>
    </>
  );
};

export default StatisticsPage;
