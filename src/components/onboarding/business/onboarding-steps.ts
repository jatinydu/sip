import SignupStep from "./signup-step";
import OtpStep from "./otp-step";
import CategoryStep from "./category-step";
import OrganizationStep from "./organization-step";
import LocationStep from "./location-step";
import RewardStep from "./reward-step";
import ReviewStep from "./review-step";

export const onboardingSteps = {
  1: SignupStep,
  2: OtpStep,
  3: CategoryStep,
  4: OrganizationStep,
  5: LocationStep,
  6: RewardStep,
  7: ReviewStep,
} as const;
