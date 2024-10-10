'use server';

import axiosInstance from '~/lib/axios-instance';

export interface NewsSource {
  id: string | null;
  name: string;
}

export interface NewsArticleProps {
  id: string;
  source: NewsSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticleProps[];
}

export const fetchNews = async (
  source: string = 'bitcoin',
  sortBy: string = 'publishedAt',
  fromDate?: string
): Promise<NewsArticleProps[]> => {
  const apiKey = process.env.NEWS_API_KEY;
  const pageSize = 100;

  const response = await axiosInstance.get<NewsApiResponse>('/everything', {
    params: {
      q: source,
      apiKey: apiKey,
      language: 'en',
      sortBy: sortBy,
      pageSize: pageSize,
      page: 1,
      ...(fromDate && { from: fromDate }),
    },
  });

  const articles = response.data.articles
    .map((article) => ({
      ...article,
      id: article.url,
    }))
    .filter((article) => article.title && article.title !== '[Removed]' && article.content && article.content !== '[Removed]');

  return articles;
};
