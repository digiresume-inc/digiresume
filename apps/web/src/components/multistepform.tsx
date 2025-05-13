'use client';

import Step from "./step";

const steps = [
  { label: "Step 1", inputs: ["Full Name", "Email"] },
  { label: "Step 2", inputs: ["Address", "Phone"] },
  { label: "Step 3", inputs: ["City", "Country"] },
];

export default function MultiStepForm() {
  return (
    <div className="flex">
      {/* Left - Steps Content */}
      <div className="w-3/4 space-y-32 pr-10">
        {steps.map((step, index) => (
          <div id={`step-${index + 1}`} key={index} className="min-h-screen flex items-center">
            <Step step={index + 1} inputs={step.inputs} />
          </div>
        ))}
      </div>

      {/* Right - Step Indicators */}
      <div className="w-1/4 sticky top-20 h-screen hidden md:flex flex-col items-center">
        <div className="relative h-full flex flex-col justify-around">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              {index !== steps.length - 1 && (
                <div className="w-px h-24 bg-blue-300 mx-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
