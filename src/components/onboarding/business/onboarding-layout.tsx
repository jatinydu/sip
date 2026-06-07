import Image from "next/image";

import OnboardingProgress from "../onboarding-progress";

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

export default function OnboardingLayout({
  currentStep,
  totalSteps,
  children,
}: OnboardingLayoutProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-8">
      <div className="mb-5">
        <Image
          src="/sip-logo.png"
          alt="Sip"
          width={56}
          height={65}
          className="h-15 w-auto"
        />
      </div>

      <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />

      <div className="mt-8 flex-1">{children}</div>
    </div>
  );
}
