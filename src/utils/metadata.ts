import { Metadata } from 'next';

export function constructMetadata({
  title = 'News App',
  description = 'News App with Next.js',
  icons = '/favicon.ico',
  image = '/news.png',
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@ahmetpalavan',
    },
    icons,
  };
}
