'use client';
import React from 'react';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@dr/ui/components/base/chart';
import { Area, AreaChart } from 'recharts';

const RevenueChart = () => {
  const chartData = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 },
  ];
  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'var(--chart-2)',
    },
  } satisfies ChartConfig;
  return (
    <div className="h-full w-full">
      <ChartContainer className="h-full w-full" config={chartConfig}>
        <AreaChart accessibilityLayer data={chartData}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey="desktop"
            type="natural"
            fill="url(#fillDesktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default RevenueChart;
