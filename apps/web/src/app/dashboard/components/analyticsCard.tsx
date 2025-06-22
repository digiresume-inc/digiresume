'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dr/ui/components/base/tabs';
import { ExternalLink } from 'lucide-react';
import React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@dr/ui/components/base/chart';

export const description = 'A simple area chart';

const chartData = [
  { month: 'January', views: 34, clicks: 47 },
  { month: 'February', views: 130, clicks: 54 },
  { month: 'March', views: 130, clicks: 130 },
  { month: 'April', views: 160, clicks: 170 },
  { month: 'May', views: 120, clicks: 90 },
  { month: 'June', views: 100, clicks: 70 },
];

const getYAxisLabels = (key: keyof typeof chartConfig) => {
  const values = chartData.map((d) => d[key]);
  const max = Math.max(...values);
  const mid1 = Math.round(max / 3);
  const mid2 = Math.round((2 * max) / 3);
  return [0, mid1, mid2, max].reverse();
};

const chartConfig = {
  views: {
    label: 'Views',
    color: 'var(--chart-1)',
  },
  clicks: {
    label: 'Clicks',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

const AnalyticsCard = () => {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('views');
  return (
    <div className="hidden lg:flex col-span-2 md:col-span-1 lg:h-[235px] rounded-2xl flex-col items-start justify-start p-6 bg-secondary shadow-md border border-border">
      <span className="flex items-center justify-between gap-1 w-full mb-1.5">
        <h3 className="text-sm lg:text-lg font-semibold text-foreground relative">
          Analytics{' '}
          <span className="absolute top-1/3 -translate-y-1/3 -right-4 w-2 h-2 flex items-center justify-center">
            <span className="absolute w-full h-full bg-green-400 rounded-full" />
            <span className="absolute w-full h-full bg-green-400 rounded-full opacity-75 animate-ping" />
          </span>
        </h3>
        <ExternalLink
          size={16}
          strokeWidth={1}
          className="text-foreground/70 hover:text-foreground transition-colors duration-200 cursor-pointer"
        />
      </span>

      <Tabs defaultValue="views">
        <TabsList className="bg-transparent rounded-none gap-2">
          <TabsTrigger
            onClick={() => setActiveChart('views')}
            className="px-0 pb-3 border-t-0 cursor-pointer border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pt-4 text-sm font-bold tracking-[0.015em] bg-transparent data-[state=active]:bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none data-[state=active]:shadow-none"
            value="views"
          >
            <span className="flex gap-1 items-center justify-start">
              <span className="text-sm font-semibold">0</span>
              <span className="text-xxs font-light">Views</span>
            </span>
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setActiveChart('clicks')}
            className="px-0 pb-3 border-t-0 cursor-pointer border-r-0 border-l-0 border-b-[3px] border-transparent data-[state=active]:border-primary text-muted-foreground data-[state=active]:text-foreground pt-4 text-sm font-bold tracking-[0.015em] bg-transparent data-[state=active]:bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none data-[state=active]:shadow-none"
            value="clicks"
          >
            <span className="flex gap-1 items-center justify-start">
              <span className="text-sm font-semibold">0</span>
              <span className="text-xxs font-light">Clicks</span>
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="views"></TabsContent>
        <TabsContent value="clicks"></TabsContent>
      </Tabs>
      <div className="w-full flex items-center h-24 mb-1 gap-1">
        <span className="flex flex-col items-center justify-between text-tiny h-full py-1">
          {getYAxisLabels(activeChart).map((val, index) => (
            <span key={index}>{val}</span>
          ))}
        </span>
        <ChartAreaDefault activeChart={activeChart} />
      </div>
      <span className="flex ml-auto items-center justify-between text-tiny w-[95%] pl-3">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((mon, index) => (
          <span key={index}>{mon}</span>
        ))}
      </span>
    </div>
  );
};

const ChartAreaDefault = ({ activeChart }: { activeChart: keyof typeof chartConfig }) => {
  return (
    <ChartContainer className="px-0 w-[95%] bg-muted rounded-md" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 4,
          left: 8,
          right: 8,
        }}
      >
        <CartesianGrid vertical={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey={activeChart}
          type="natural"
          stroke={`var(--color-${activeChart})`}
          strokeWidth={2}
          dot={{
            fill: `var(--color-${activeChart})`,
          }}
          activeDot={{
            r: 5,
          }}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default AnalyticsCard;
