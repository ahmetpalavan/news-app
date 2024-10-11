'use client';

import { useState } from 'react';
import { NewsArticleProps, fetchNews } from '~/actions/fetch-news';
import { InfiniteScrollList } from './infinite-scroll';
import NewsArticle from './news-article';

type NewsFeedProps = {
  initialArticles: NewsArticleProps[];
};

export const NewsFeed = ({ initialArticles }: NewsFeedProps) => {
  const [articles, setArticles] = useState<NewsArticleProps[]>(initialArticles);
  const [error, setError] = useState<string | null>(null);

  const fetchMore = async (): Promise<NewsArticleProps[]> => {
    const nextPage = Math.floor(articles.length / 20) + 1;
    try {
      const newArticles = await fetchNews('bitcoin', 'publishedAt', undefined, nextPage);
      return newArticles;
    } catch (err: any) {
      if (err.response?.status === 429) {
        setError(error);
      } else {
        setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
      return [];
    }
  };

  const renderItem = (item: NewsArticleProps) => <NewsArticle key={item.id} {...item} />;

  return (
    <>
      {error && <div className='text-red-500'>{error}</div>}
      <InfiniteScrollList skeletonCount={3} items={articles} setItems={setArticles} fetchMore={fetchMore} renderItem={renderItem} />
    </>
  );
};
