import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Contact", href: "/support" },
  { label: "Delete Account", href: "/delete-account" },
];

const social = ["Instagram", "TikTok", "LinkedIn"];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image src="/images/melon-wordmark.png" alt="Melon" width={170} height={54} className="h-auto w-36" />
          <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-600">
            Melon helps shoppers scan labels, understand ingredients, and choose food with more confidence.
          </p>
        </div>
        <nav className="grid gap-3 text-sm font-bold text-zinc-700" aria-label="Footer navigation">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-melon-600">
              {link.label}
            </Link>
          ))}
        </nav>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-400">Follow</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {social.map((item) => (
              <a key={item} href="/support" className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-bold text-zinc-700 transition hover:border-melon-300 hover:text-melon-700">
                {item}
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-zinc-500">AnyHope Corp. operating as Melon</p>
        </div>
      </div>
    </footer>
  );
}
