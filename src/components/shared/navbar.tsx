"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "For Businesses", href: "/#industries" },
  { label: "For Customers", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50">
      <div className="section-container">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/sip-logo.png"
              alt="SIP — Digital Loyalty Cards for Small Businesses"
              width={80}
              height={80}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-6 lg:flex">
            <Link
              href="/login"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Log in
            </Link>

            <Button size="md" className="rounded-full px-6">
              Get Started <span className="ml-1">→</span>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex size-10 items-center justify-center lg:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="section-container py-6">
            <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-foreground"
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-2 h-px bg-border" />

              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground"
              >
                Log in
              </Link>

              <Button size="md" className="w-full rounded-full">
                Get Started →
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
