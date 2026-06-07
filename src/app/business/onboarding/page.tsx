import OnboardingLayout from "@/components/onboarding/business/onboarding-layout";
import { onboardingSteps } from "@/components/onboarding/business/onboarding-steps";

export default function BusinessOnboardingPage() {
  const currentStep = 7;

  const CurrentStep =
    onboardingSteps[currentStep as keyof typeof onboardingSteps];

  return (
    <section className="bg-background">
      <OnboardingLayout currentStep={currentStep} totalSteps={7}>
        {CurrentStep ? <CurrentStep /> : <div>Invalid Step</div>}
      </OnboardingLayout>
    </section>
  );
}
