import type { Metadata } from "next";

const deletionSteps = [
  "Open the Melon app.",
  "Go to your Profile.",
  "Open Settings.",
  "Select Delete Account.",
  "Review the notice and confirm the deletion.",
];

const deletedData = [
  "Name and email address",
  "Melon account and user ID",
  "Profile information",
  "Dietary preferences",
  "Allergy preferences",
  "Religious food preferences",
  "Saved products",
  "Scan history",
  "Other personal account activity stored by Melon",
];

const retainedReasons = ["Legal compliance", "Fraud prevention", "Security", "Accounting", "Dispute resolution"];

const deletionEmail =
  "mailto:support@themelon.app?subject=Melon%20Account%20Deletion%20Request";

export const metadata: Metadata = {
  title: "Delete Your Melon Account",
  description:
    "Learn how to permanently delete your Melon account and associated personal data through the app or by submitting a deletion request.",
  alternates: { canonical: "/delete-account" },
  openGraph: {
    type: "website",
    url: "https://themelon.app/delete-account",
    title: "Delete Your Melon Account | Melon",
    description:
      "Learn how to permanently delete your Melon account and associated personal data through the app or by submitting a deletion request.",
    siteName: "Melon",
  },
  robots: { index: true, follow: true },
};

function Section({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] sm:p-8">
      <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{title}</h2>
      <div className="mt-5 text-base leading-8 text-white/72">{children}</div>
    </section>
  );
}

export default function DeleteAccountPage() {
  return (
    <main className="bg-ink text-white">
      <article className="container-page py-16 sm:py-20 lg:py-28">
        <header className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-melon-300">Account deletion</p>
          <h1 className="mt-5 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Delete Your Melon Account
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/72 sm:text-xl">
            Melon users can permanently delete their account and associated personal data directly through the Melon app. This page also explains how to request deletion if you can no longer access the app.
          </p>
        </header>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6">
          <Section title="Delete your account in the app">
            <ol className="grid gap-3 text-white/78">
              {deletionSteps.map((step) => (
                <li key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-black/18 p-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-melon-500 text-sm font-black text-white">
                    {deletionSteps.indexOf(step) + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 font-bold text-white">
              Deleting your account is permanent and cannot be undone.
            </p>
          </Section>

          <Section title="Request deletion without the app">
            <p>
              Users who cannot access the Melon app can request deletion by emailing{" "}
              <a className="font-black text-melon-300 underline decoration-melon-500/60 underline-offset-4" href="mailto:support@themelon.app">
                support@themelon.app
              </a>
              .
            </p>
            <a
              href={deletionEmail}
              className="mt-6 inline-flex min-h-14 items-center justify-center rounded-full bg-melon-500 px-7 text-base font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-melon-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-300"
            >
              Request Account Deletion
            </a>
            <p className="mt-5">
              Send the request from the email address associated with your Melon account. Melon may need to verify account ownership before processing the request.
            </p>
          </Section>

          <Section title="Data that will be deleted">
            <p>
              When present in Melon systems and associated with your account, the following personal account data will be deleted:
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {deletedData.map((item) => (
                <li key={item} className="rounded-2xl border border-melon-300/20 bg-melon-300/8 px-4 py-3 font-bold text-white/82">
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Data that may be retained">
            <p>Limited information may be retained when required for:</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {retainedReasons.map((item) => (
                <li key={item} className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3 font-bold text-white/82">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5">
              Google Play, RevenueCat, or other payment providers may independently retain subscription and transaction records under their own policies and legal obligations.
            </p>
            <p className="mt-5">
              Deletion requests are normally processed within 30 days. Information that must be retained for legal or security reasons will only be kept for as long as necessary.
            </p>
          </Section>

          <section className="rounded-[30px] border border-amber-300/30 bg-amber-300/10 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] sm:p-8" aria-labelledby="subscription-notice">
            <h2 id="subscription-notice" className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Subscription notice
            </h2>
            <p className="mt-5 text-base font-bold leading-8 text-amber-50">
              Deleting your Melon account does not automatically cancel your Google Play subscription. Cancel your subscription through Google Play before deleting your account to prevent future charges.
            </p>
          </section>

          <Section title="Contact and company information">
            <p className="font-bold text-white">Melon is operated by AnyHope Corp.</p>
            <p className="mt-4">
              Contact email:{" "}
              <a className="font-black text-melon-300 underline decoration-melon-500/60 underline-offset-4" href="mailto:support@themelon.app">
                support@themelon.app
              </a>
            </p>
          </Section>
        </div>
      </article>
    </main>
  );
}
