"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OtpStep = () => {
  const [otp, setOtp] = useState("");

  const canSubmit = otp.length === 6;

  return (
    <div className="flex h-full flex-col">
      {/* Success State */}
      {/* <div className="mb-6 flex items-center gap-3 rounded-xl border border-border bg-card p-4">
        <CheckCircle2 className="h-5 w-5 text-primary" />

        <div>
          <p className="text-sm font-medium">Account created successfully</p>

          <p className="text-xs text-muted-foreground">
            One last step before setting up your business.
          </p>
        </div>
      </div> */}

      {/* Header */}
      <div>
        <h1 className="heading-md">Check your inbox</h1>

        <p className="body-md mt-3">
          We&apos;ve sent a 6-digit verification code to
        </p>

        <p className="mt-2 font-medium text-foreground">
          hello@brewhousecafe.com
        </p>
      </div>

      {/* OTP */}
      <div className="mt-10">
        <InputOTP maxLength={6} value={otp} onChange={setOtp} autoFocus>
          <InputOTPGroup className="w-full justify-between">
            <InputOTPSlot index={0} className="h-14 w-14 rounded-xl" />
            <InputOTPSlot index={1} className="h-14 w-14 rounded-xl" />
            <InputOTPSlot index={2} className="h-14 w-14 rounded-xl" />
            <InputOTPSlot index={3} className="h-14 w-14 rounded-xl" />
            <InputOTPSlot index={4} className="h-14 w-14 rounded-xl" />
            <InputOTPSlot index={5} className="h-14 w-14 rounded-xl" />
          </InputOTPGroup>
        </InputOTP>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          This code expires in 10 minutes
        </p>
      </div>

      {/* Resend */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">Resend code in 00:27</p>

        {/* Later switch to this when timer ends */}

        {/*
        <p className="text-sm text-muted-foreground">
          Didn't receive it?
          <button
            type="button"
            className="ml-1 font-medium text-primary hover:opacity-80"
          >
            Resend code
          </button>
        </p>
        */}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-10">
        <Button size="lg" className="h-12 w-full" disabled={!canSubmit}>
          Verify Email
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OtpStep;
