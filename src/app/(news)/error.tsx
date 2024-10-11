'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isTooManyRequests = error.message.includes('429');

  return (
    <div>
      <h2>{isTooManyRequests ? 'Çok fazla istek attınız. Lütfen daha sonra tekrar deneyin.' : 'Something went wrong!'}</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
