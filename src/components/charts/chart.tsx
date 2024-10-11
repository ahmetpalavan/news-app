'use client';

import { AreaChart as AreaIcon, BarChart as BarIcon, LineChart as LineIcon } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Card, CardContent, CardHeader } from '../ui/card';
import StatisticsAreaChart from './area-variant';
import StatisticsChart from './bar-variant';
import StatisticsLineChart from './line-variant';

type Props = {
  data: { hour: string; count: number }[];
};

export const Chart: React.FC<Props> = ({ data = [] }) => {
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area');

  const onTypeChange = useCallback((value: 'line' | 'area' | 'bar') => {
    setChartType(value);
  }, []);

  return (
    <Card className='border-none drop-shadow-sm'>
      <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-end'>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className='lg:w-auto h-9 rounded-md px-3'>
            <SelectValue placeholder='Select chart type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='area'>
              <div className='flex items-center'>
                <AreaIcon className='size-4 shrink-0 mr-2' />
                <span className='line-clamp-1'>Area</span>
              </div>
            </SelectItem>
            <SelectItem value='bar'>
              <div className='flex items-center'>
                <BarIcon className='size-4 shrink-0 mr-2' />
                <span className='line-clamp-1'>Bar</span>
              </div>
            </SelectItem>
            <SelectItem value='line'>
              <div className='flex items-center'>
                <LineIcon className='size-4 shrink-0 mr-2' />
                <span className='line-clamp-1'>Line</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <>
          {chartType === 'area' && <StatisticsAreaChart data={data} />}
          {chartType === 'bar' && <StatisticsChart data={data} />}
          {chartType === 'line' && <StatisticsLineChart data={data} />}
        </>
      </CardContent>
    </Card>
  );
};
