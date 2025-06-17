import React from 'react';

const Section1 = () => {

  return (
    <div className="min-h-screen w-full max-w-5xl py-12 px-6 mx-auto mt-24">
      <div className="flex items-center gap-8 divide-x-2 border-t-2 border-b-2">
        <div className="pe-12 py-14 relative w-1/2 h-full">
          <h1 className="text-[21px] leading-[28px] tracking-[-.37px] font-[510] text-balance text-foreground">
            Manage Projects end-to-end
          </h1>
          <div className="block w-[1px] h-[1px] min-w-[1px] min-h-[1px] select-none mt-[3px]" />
          <p className="text-[17px] leading-[24.5px] tracking-[0] text-balance text-foreground/70">
            Consolidate specs, milestones, tasks, and other documentation in one centralized
            location.
          </p>
          <div className="block w-[1px] h-[1px] min-w-[1px] min-h-[1px] select-none mt-[31px]" />
          <div className="select-none aspect-[432/320] max-w-full max-h-full overflow-hidden w-full">
            <div className="relative w-full h-full rounded-[18px] p-2"></div>
          </div>
        </div>
        <div className="w-1/2 h-full"></div>
      </div>
    </div>
  );
};

export default Section1;
