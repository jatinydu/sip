"use client";

import Link from "next/link";
import { ArrowRight, Building2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

const SignupStep = () => {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div>
        <h1 className="heading-md">Let&apos;s get started</h1>

        <p className="body-md mt-3">
          Tell us about your business to create your account.
        </p>
      </div>

      {/* Form */}
      <form autoComplete="off" className="mt-8 space-y-5">
        {/* Business Name */}
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>

          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="businessName"
              name="businessName"
              placeholder="e.g. Brew House Cafe"
              className="h-12 pl-10"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Business Email</Label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="email"
              name="businessEmail"
              type="email"
              placeholder="e.g. hello@brewhousecafe.com"
              className="h-12 pl-10"
              autoComplete="off"
            />
          </div>

          <p className="text-xs text-muted-foreground">
            We&apos;ll send a verification code to this email address.
          </p>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>

          <PasswordInput
            id="password"
            name="businessPassword"
            placeholder="Create a strong password"
            className="h-12"
            autoComplete="new-password"
          />

          <p className="text-xs text-muted-foreground">
            Minimum 8 characters with letters and numbers.
          </p>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>

          <PasswordInput
            id="confirmPassword"
            name="confirmBusinessPassword"
            placeholder="Confirm your password"
            className="h-12"
            autoComplete="new-password"
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button type="submit" size="lg" className="h-12 w-full">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-6">
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/business/login"
            className="font-medium text-primary transition-opacity hover:opacity-80"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupStep;
