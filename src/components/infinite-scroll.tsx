import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { SearchIllustrationIcon } from './icons/search-illustrations';

type Props<T extends { id: any }> = {
  items: T[];
  setItems: Dispatch<SetStateAction<T[]>>;
  renderItem: (item: T) => JSX.Element;
  fetchMore: (args: { cursor?: any }) => Promise<T[]>;
};

export const InfiniteScrollList = <T extends { id: any }>({ items, setItems, fetchMore, renderItem }: Props<T>) => {
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
    <>
      {items.map((item) => renderItem(item))}

      {hasMoreData ? (
        <div ref={scrollTrigger} className='text-center pb-20'>
          Loading...
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-20'>
          <SearchIllustrationIcon className='max-w-48 w-full' />
          <div className='opacity-70'>Haber akışının sonuna ulaştınız!</div>
        </div>
      )}
    </>
  );
};
