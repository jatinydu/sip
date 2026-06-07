"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Camera, ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OrganizationStep = () => {
  const [businessName, setBusinessName] = useState("Brew House Cafe");

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogoPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div>
        <h1 className="heading-md">Build your brand</h1>

        <p className="body-md mt-3">
          Customers will see this when they join your loyalty program.
        </p>
      </div>

      {/* Logo Upload */}
      <div className="mt-10 flex flex-col items-center">
        <label htmlFor="logo" className="group relative cursor-pointer">
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 group-hover:scale-[1.02]">
            {logoPreview ? (
              <Image
                src={logoPreview}
                alt="Business Logo"
                width={112}
                height={112}
                unoptimized
                className="h-full w-full object-cover"
              />
            ) : (
              <ImagePlus className="h-8 w-8 text-muted-foreground" />
            )}
          </div>

          <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-sm">
            <Camera className="h-4 w-4" />
          </div>

          <input
            id="logo"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
        </label>

        <p className="mt-4 font-medium">
          {logoPreview ? "Change Logo" : "Upload Logo"}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">PNG, JPG or SVG</p>

        <button
          type="button"
          className="mt-3 text-sm text-primary hover:opacity-80"
        >
          Skip for now
        </button>
      </div>

      {/* Business Name */}
      <div className="mt-10 space-y-2">
        <Label htmlFor="businessName">Business Name</Label>

        <Input
          id="businessName"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="e.g. Brew House Cafe"
          className="h-12"
        />
      </div>

      {/* Live Preview */}
      <div className="mt-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Live Preview
        </p>

        <div className="card-sip overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-muted">
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Preview Logo"
                    width={56}
                    height={56}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImagePlus className="h-5 w-5 text-muted-foreground" />
                )}
              </div>

              <div>
                <h3 className="font-semibold">
                  {businessName || "Your Business"}
                </h3>

                <p className="text-sm text-muted-foreground">Loyalty Program</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border bg-muted/40 px-5 py-3">
            <p className="text-xs text-muted-foreground">
              This is how customers will recognize your brand throughout SIP.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-10">
        <Button size="lg" className="h-12 w-full">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OrganizationStep;
