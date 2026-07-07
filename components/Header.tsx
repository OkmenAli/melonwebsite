import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Scoring", href: "#scoring" },
  { label: "Personalization", href: "#personalization" },
  { label: "Local Sources", href: "#local-sources" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Contact", href: "/support" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/92 shadow-[0_1px_12px_rgba(17,27,21,0.05)] backdrop-blur-xl">
      <div className="container-page flex min-h-20 items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center" aria-label="Melon home">
          <Image src="/images/melon-wordmark.png" alt="Melon" width={176} height={56} priority className="h-auto w-32 sm:w-44" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-black text-zinc-700 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-melon-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <nav className="container-page grid grid-cols-3 gap-x-4 gap-y-3 pb-4 text-center text-xs font-black text-zinc-600 lg:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} className="transition hover:text-melon-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
