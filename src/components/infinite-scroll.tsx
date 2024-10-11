import { Dispatch, SetStateAction, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { SearchIllustrationIcon } from './icons/search-illustrations';
import { NewSkeleton } from './new-skeleton';

type Props<T extends { id: any }> = {
  items: T[];
  setItems: Dispatch<SetStateAction<T[]>>;
  renderItem: (item: T) => JSX.Element;
  fetchMore: (args: { cursor?: any }) => Promise<T[]>;
  skeletonCount?: number;
};

export const InfiniteScrollList = <T extends { id: any }>({ items, setItems, fetchMore, renderItem, skeletonCount = 1 }: Props<T>) => {
  const [cursor, setCursor] = useState(items.at(-1)?.id);
  const [hasMoreData, setHasMoreData] = useState(true);

  const loadMore = async () => {
    if (items.length >= 100) {
      setHasMoreData(false);
      return;
    }

    const newItems = await fetchMore({ cursor });

    if (newItems.length === 0) {
      setHasMoreData(false);
      return;
    }

    setItems((prevItems) => [...prevItems, ...newItems]);
    setCursor(newItems.at(-1)?.id);
  };

  const { ref: scrollTrigger } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasMoreData) {
        loadMore();
      }
    },
  });

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
      {items.map((item) => renderItem(item))}

      {hasMoreData ? (
        Array.from({ length: skeletonCount }).map((_, index) => <NewSkeleton key={index} ref={index === 0 ? scrollTrigger : undefined} />)
      ) : (
        <div className='col-span-full flex flex-col items-center justify-center py-20'>
          <SearchIllustrationIcon className='max-w-48 w-full' />
          <div className='opacity-70 text-center mt-4'>Haber akışının sonuna ulaştınız!</div>
        </div>
      )}
    </div>
  );
};
