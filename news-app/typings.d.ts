/** @format */

type AhmetArticle  = {
  author: string | null;
  category: string;
  country: string;
  description: string;
  image: string;
  language: string;
  published: string;
  source: string;
  title: string;
  url: string;
};

type Pagination = {
  count: Int;
  total: Int;
  offset: Int;
  limit: Int;
};

type NewsResponse = {
  pagination: { Pagination };
  data: AhmetArticle[]; 
};

type Category = "general" | "business" | "entertainment" | "health" | "science" | "sports" | "technology";
