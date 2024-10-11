import { Separator } from '~/components/ui/separator';

type CustomTooltipProps = {
  active?: boolean;
  payload?: any;
};

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;

  const hour = payload[0].payload.hour;
  const count = payload[0].value;

  return (
    <div className='rounded-md bg-white shadow-md border overflow-hidden'>
      <div className='text-sm p-2 px-3 bg-muted text-muted-foreground'>Hour: {hour}</div>
      <Separator />
      <div className='p-2 px-3 space-y-1'>
        <div className='flex items-center gap-x-4 justify-between'>
          <div className='flex items-center gap-x-2 justify-between'>
            <div className='size-1.5 bg-blue-500 rounded-full' />
            <span className='text-sm text-muted-foreground'>News Count</span>
            <span className='text-sm font-medium text-right'>{count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
