import { useState } from 'react';
import { Switch } from '@dr/ui/components/base/switch';
import { cn } from '@dr/ui/lib/utils';

export default function ViewSwitch({
  isResumeView,
  onToggle,
}: {
  isResumeView: boolean;
  onToggle: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-center space-x-3 px-3 py-2 rounded-full border bg-muted w-fit mx-auto">
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          !isResumeView ? "text-primary underline underline-offset-2" : "text-muted-foreground/80"
        )}
      >
        Portfolio View
      </span>

      <Switch
        checked={isResumeView}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-primary"
      />

      <span
        className={cn(
          "text-sm font-medium transition-colors",
          isResumeView ? "text-primary underline underline-offset-2" : "text-muted-foreground/80"
        )}
      >
        Resume View
      </span>
    </div>
  );
}
