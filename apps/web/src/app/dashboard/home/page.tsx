import { ChartAreaInteractive } from '@lf/ui/components/chart-area-interactive';
import { DataTable } from '@lf/ui/components/data-table';
import { SectionCards } from '@lf/ui/components/section-cards';
import React from 'react';
import data from "../data.json"

const DashboardHome = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
