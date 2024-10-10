'use client';

import React, { useState } from 'react';
import { NewsArticleProps, fetchNews } from '~/actions/fetch-news';
import NewsArticle from './news-article';
import { InfiniteScrollList } from './infinite-scroll';

type NewsFeedProps = {
  initialArticles: NewsArticleProps[];
};

export const NewsFeed: React.FC<NewsFeedProps> = ({ initialArticles }) => {
  const [articles, setArticles] = useState<NewsArticleProps[]>(initialArticles);

  const fetchMore = async ({ cursor }: { cursor?: any }) => {
    const nextPage = cursor ? articles.findIndex((article) => article.id === cursor) + 1 : 1;
    const newArticles = await fetchNews('bitcoin', nextPage.toString());
    return newArticles;
  };

  const renderItem = (item: NewsArticleProps) => <NewsArticle key={item.id} {...item} />;

  return <InfiniteScrollList items={articles} setItems={setArticles} fetchMore={fetchMore} renderItem={renderItem} />;
};
