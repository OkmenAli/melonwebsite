import { StoreButtons } from "./StoreButtons";

export function CTA() {
  return (
    <section id="download" className="bg-ink py-20 text-white sm:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-melon-300">Download Melon</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Start shopping smarter with Melon.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Scan food labels, compare better choices, and bring your preferences into every grocery trip.
          </p>
        </div>
        <div className="rounded-card border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <StoreButtons />
          <p className="mt-5 text-sm leading-6 text-white/60">
            App Store and Google Play links are placeholders until launch.
          </p>
        </div>
      </div>
    </section>
  );
}
