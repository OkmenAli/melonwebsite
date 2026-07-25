"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Scoring", href: "/scoring-method" },
  { label: "Personalization", href: "/#personalization" },
  { label: "Local Sources", href: "/#local-sources" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Contact", href: "/support" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/94 shadow-[0_1px_12px_rgba(17,27,21,0.05)] backdrop-blur-xl">
      <div className="container-page relative flex min-h-16 items-center justify-center py-3 lg:min-h-20 lg:justify-between lg:gap-6 lg:py-4">
        <Link href="/" className="flex items-center" aria-label="Melon home" onClick={() => setIsMenuOpen(false)}>
          <Image src="/images/melon-wordmark.png" alt="Melon" width={176} height={56} priority className="h-auto w-32 sm:w-40 lg:w-44" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-black text-zinc-700 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-melon-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500">
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="absolute right-5 inline-flex size-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-ink shadow-card transition hover:border-melon-200 hover:text-melon-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500 lg:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden="true" className="grid gap-1.5">
            <span className={`block h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`${isMenuOpen ? "grid" : "hidden"} container-page gap-2 pb-4 text-sm font-black text-zinc-700 lg:hidden`}
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition hover:border-melon-200 hover:bg-melon-50 hover:text-melon-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}