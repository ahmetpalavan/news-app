// components/NewsArticle.tsx

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { defaultDateFormatter } from '~/utils/date-utils';

export interface NewsArticleProps {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

const NewsArticle = ({ source, author, title, description, url, urlToImage, publishedAt }: NewsArticleProps) => {
  const isRemoved = (field: string | null) => field === '[Removed]';

  if (!title || isRemoved(title)) {
    return null;
  }

  return (
    <Card className='max-w-full sm:max-w-md lg:max-w-lg mx-auto my-6 shadow-md overflow-hidden flex flex-col'>
      {!isRemoved(urlToImage) && urlToImage && <img className='w-full h-48 sm:h-64 md:h-72 object-cover' src={urlToImage} alt={title} />}
      <CardContent className='flex-1 flex flex-col'>
        <CardHeader className='flex flex-col'>
          {!isRemoved(source.name) && (
            <CardTitle className='text-sm text-primary-foreground bg-primary rounded-full px-2 py-1'>{source.name}</CardTitle>
          )}
          <Link href={url} target='_blank' rel='noopener noreferrer'>
            <h2 className='mt-1 text-lg sm:text-xl font-medium text-black hover:underline'>{title}</h2>
          </Link>
        </CardHeader>
        <div className='flex flex-col gap-y-2'>
          {!isRemoved(author) && author && (
            <CardDescription className='text-muted-foreground text-sm mt-2'>{`By ${author}`}</CardDescription>
          )}
          {!isRemoved(description) && description && <p className='text-muted-foreground'>{description}</p>}
          {!isRemoved(publishedAt) && <p className='text-muted-foreground text-sm'>{defaultDateFormatter.format(new Date(publishedAt))}</p>}
        </div>
        <div className='flex-1'></div>
        <CardFooter className='mt-4'>
          <Link href={url} target='_blank' rel='noopener noreferrer' className='text-primary hover:text-primary/50'>
            Read more
          </Link>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default NewsArticle;
