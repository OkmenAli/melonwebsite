import Image from "next/image";
import Link from "next/link";
import { StoreButtons } from "./StoreButtons";

const groups = [
  { title: "Discover", links: [
    { label: "Local Sources", href: "/local-sources" },
    { label: "Scoring Method", href: "/scoring-method" },
    { label: "Insights", href: "/insights" },
  ] },
  { title: "Help", links: [
    { label: "Contact us", href: "/support" },
    { label: "Delete Account", href: "/delete-account" },
    { label: "Instagram", href: "https://www.instagram.com/themelon.app/" },
  ] },
  { title: "Legal", links: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ] },
];

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-zinc-100 bg-white">
      <div className="container-page relative z-10 grid gap-10 pt-14 sm:pt-16 lg:grid-cols-[1.3fr_1.7fr] lg:gap-x-16">
        <div>
          <Link href="/" aria-label="Melon home" className="inline-block">
            <Image src="/images/melon-wordmark.png" alt="Melon" width={220} height={70} className="h-auto w-44 sm:w-52" />
          </Link>
          <div className="mt-6 [&_.download-badge]:min-w-0 [&_.download-badge]:gap-2 [&_.download-badge]:rounded-lg [&_.download-badge]:px-3 [&_.download-badge]:py-2 [&_.store-name]:text-xl [&_.store-kicker]:text-[10px] [&_.store-kicker]:tracking-normal">
            <StoreButtons />
          </div>
          <p className="mt-5 text-sm text-zinc-500">Know your food. Find your community.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          {groups.map((group) => (
            <nav key={group.title} aria-label={`${group.title} footer links`}>
              <h2 className="text-lg font-bold text-melon-700">{group.title}</h2>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="inline-block py-1 text-sm leading-6 text-zinc-600 transition-colors hover:text-melon-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-700">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="text-xs text-zinc-500 lg:col-span-2">AnyHope Corp. operating as Melon</p>
      </div>
      <div aria-hidden="true" className="relative mt-4 h-40 sm:h-52 lg:h-64">
        <Image src="/images/melon-footer-landscape.png" alt="" fill sizes="100vw" className="object-cover object-bottom" style={{ maskImage: "linear-gradient(to bottom, transparent, black 18%)" }} />
      </div>
    </footer>
  );
}
