import { useSearchParams } from 'next/navigation';

const eventPageQueryParams = {
  asParticipant: 'asParticipant',
};

export const useParticipantView = () => {
  const params = useSearchParams();

  return params.get(eventPageQueryParams.asParticipant) === 'true';
};
