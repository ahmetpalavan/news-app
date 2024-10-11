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

interface FetchNewsParams {
  apiKey?: string;
  language: string;
  sortBy: string;
  pageSize: number;
  page: number;
  q?: string;
  domains?: string;
  from?: string;
}

export const fetchNews = async (
  source: string = 'bitcoin',
  sortBy: string = 'publishedAt',
  fromDate?: string,
  page: number = 1
): Promise<NewsArticleProps[]> => {
  const apiKey = process.env.NEWS_API_KEY;
  const pageSize = 20;

  try {
    const params: FetchNewsParams = {
      apiKey,
      language: 'en',
      sortBy,
      pageSize,
      page,
      ...(fromDate && { from: fromDate }),
    };

    if (source === 'tech') {
      params.domains = 'techcrunch.com,thenextweb.com';
    } else {
      params.q = source;
    }

    const response = await axiosInstance.get<NewsApiResponse>('/everything', { params });

    const articles = response.data.articles
      .map((article) => ({
        ...article,
        id: article.url,
      }))
      .filter(
        (article) =>
          article.title &&
          article.title !== '[Removed]' &&
          article.content &&
          article.content !== '[Removed]' &&
          article.urlToImage &&
          !article.urlToImage.includes('biztoc')
      );

    return articles;
  } catch (error: any) {
    if (error.response?.status === 429) {
      console.warn(error.response.data);
      return [];
    }

    throw error;
  }
};
