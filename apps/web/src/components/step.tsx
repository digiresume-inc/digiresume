import { Input } from "@lf/ui/components/base/input";
import { Label } from "@lf/ui/components/base/label";

interface StepProps {
  step: number;
  inputs: string[];
}

export default function Step({ step, inputs }: StepProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full">
      <h2 className="text-2xl font-semibold mb-6">Step {step}</h2>
      <form className="space-y-4">
        {inputs.map((inputLabel, idx) => (
          <div key={idx}>
            <Label htmlFor={`input-${step}-${idx}`} className="block text-sm font-medium mb-1">
              {inputLabel}
            </Label>
            <Input
              id={`input-${step}-${idx}`}
              placeholder={`Enter your ${inputLabel.toLowerCase()}`}
              className="w-full"
            />
          </div>
        ))}
      </form>
    </div>
  );
}
