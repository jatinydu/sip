import { cn } from "@/lib/utils";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function OnboardingProgress({
  currentStep,
  totalSteps,
}: OnboardingProgressProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </p>

      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              index < currentStep ? "bg-orange-500" : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}
