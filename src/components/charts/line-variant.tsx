'use client';

import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CustomTooltip } from '../custom-tooltip';

interface StatisticsChartProps {
  data: { hour: string; count: number }[];
}

const StatisticsLineChart: React.FC<StatisticsChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={500}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <defs>
          <linearGradient id='lineColor' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#ff1744' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#ff1744' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey='hour' tick={{ fill: '#4A5568' }} />
        <YAxis tick={{ fill: '#4A5568' }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type='monotone' dataKey='count' stroke='url(#lineColor)' strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StatisticsLineChart;
