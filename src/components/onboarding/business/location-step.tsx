"use client";

import { useState } from "react";
import { ArrowRight, Building2, MapPin, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BranchStep = () => {
  const [branchName, setBranchName] = useState("Main Branch");

  const [address, setAddress] = useState("");

  const [city, setCity] = useState("");

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div>
        <h1 className="heading-md">Set up your first branch</h1>

        <p className="body-md mt-3">
          Customers will scan QR codes and collect rewards at this branch.
        </p>
      </div>

      {/* Preview */}
      <div className="mt-8">
        <div className="card-sip overflow-hidden">
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                <Building2 className="h-6 w-6 text-primary" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">{branchName || "Main Branch"}</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {address
                    ? `${address}${city ? `, ${city}` : ""}`
                    : "Branch address will appear here"}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <QrCode className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="border-t border-border bg-muted/40 px-5 py-3">
            <p className="text-xs text-muted-foreground">
              A QR code will be generated automatically for customers to collect
              loyalty points.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="branchName">Branch Name</Label>

          <Input
            id="branchName"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            placeholder="e.g. Main Branch"
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Civil Lines, Near City Mall"
              className="h-12 pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>

          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Raipur"
            className="h-12"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">
          You can add more branches later from your dashboard.
        </p>
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

export default BranchStep;
