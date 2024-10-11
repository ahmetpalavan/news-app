'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { CustomTooltip } from '../custom-tooltip';

interface StatisticsChartProps {
  data: { hour: string; count: number }[];
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <defs>
          <linearGradient id='income' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#00e676' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#00e676' stopOpacity={0} />
          </linearGradient>
          <linearGradient id='expenses' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#ff1744' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#ff1744' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey='hour' tick={{ fill: '#4A5568' }} />
        <YAxis tick={{ fill: '#4A5568' }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey='count' fill='#3B82F6' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisticsChart;
