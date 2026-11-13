"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { categories, consentText } from "../../lib/waitlist/model";
const inputClass =
  "mt-2 block w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-ink focus:border-melon-700 focus:outline-none focus:ring-2 focus:ring-melon-700/20";
export const buttonClass =
  "rounded-full bg-melon-700 px-7 py-3 font-semibold text-white transition-colors hover:bg-melon-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-700 disabled:cursor-not-allowed disabled:opacity-50";
export default function MarketplaceWaitlist() {
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [challenge, setChallenge] = useState("");
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string[]>>({});
  const [success, setSuccess] = useState("");
  const [unsubscribe, setUnsubscribe] = useState("");
  const feedback = useRef<HTMLDivElement>(null);
  async function refresh() {
    try {
      const response = await fetch("/api/marketplace-waitlist", {
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setChallenge(data.challenge);
      setAvailable(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration is unavailable. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/marketplace-waitlist", {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
      })
      .then((data) => {
        setChallenge(data.challenge);
        setAvailable(true);
      })
      .catch((err) => {
        if (err.name !== "AbortError")
          setError(
            err.message ||
              "Registration is unavailable. Please try again later.",
          );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !available) return;
    const form = event.currentTarget,
      values = new FormData(form);
    setBusy(true);
    setError("");
    setFields({});
    try {
      const response = await fetch("/api/marketplace-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(values),
          role,
          challenge,
          consent: values.get("consent") === "on",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.fields) {
          setFields(data.fields);
          const first = Object.keys(data.fields)[0];
          (form.elements.namedItem(first) as HTMLElement | null)?.focus();
        }
        throw new Error(data.error);
      }
      setSuccess(data.message);
      setUnsubscribe(
        `/marketplace/unsubscribe#${encodeURIComponent(data.unsubscribeToken)}`,
      );
      setTimeout(() => feedback.current?.focus(), 0);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We could not save your signup. Please try again.",
      );
      setLoading(true);
      setAvailable(false);
      await refresh();
    } finally {
      setBusy(false);
    }
  }
  const fieldError = (name: string) =>
    fields[name] ? (
      <span id={`${name}-error`} className="mt-1 block text-sm text-red-700">
        {fields[name].join(" ")}
      </span>
    ) : null;
  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-title"
      className="border-t border-zinc-100 bg-[#f7faf7] py-14 sm:py-20"
    >
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-sm font-semibold text-melon-700">
            Melon Marketplace
          </p>
          <h2
            id="waitlist-title"
            className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl"
          >
            Be part of what&apos;s next.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-zinc-600">
            Be the first to know when Melon Marketplace launches.
          </p>
        </div>
        {success ? (
          <div
            ref={feedback}
            tabIndex={-1}
            role="status"
            className="space-y-5 self-center"
          >
            <p className="text-xl font-semibold text-melon-700">{success}</p>
            <p className="text-sm text-zinc-600">
              You can save this{" "}
              <a className="underline" href={unsubscribe}>
                unsubscribe link
              </a>{" "}
              to change your contact preference later.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-6" aria-busy={busy}>
            <fieldset>
              <legend className="mb-3 font-semibold">
                I&apos;m joining as a
              </legend>
              <div className="inline-flex rounded-lg border border-zinc-300 bg-white p-1">
                {(["buyer", "seller"] as const).map((value) => (
                  <label
                    key={value}
                    className={`cursor-pointer rounded-md px-7 py-2.5 font-semibold focus-within:outline focus-within:outline-2 focus-within:outline-melon-700 ${role === value ? "bg-melon-700 text-white" : "text-zinc-600"}`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={value}
                      checked={role === value}
                      onChange={() => {
                        setRole(value);
                        setFields({});
                      }}
                      className="sr-only"
                    />
                    {value === "buyer" ? "Buyer" : "Seller"}
                  </label>
                ))}
              </div>
            </fieldset>
            {role === "seller" && (
              <label className="block font-medium">
                Business name
                <input
                  name="businessName"
                  autoComplete="organization"
                  required
                  maxLength={160}
                  className={inputClass}
                  aria-invalid={!!fields.businessName}
                  aria-describedby={
                    fields.businessName ? "businessName-error" : undefined
                  }
                />
                {fieldError("businessName")}
              </label>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block font-medium">
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  className={inputClass}
                  aria-invalid={!!fields.email}
                  aria-describedby={fields.email ? "email-error" : undefined}
                />
                {fieldError("email")}
              </label>
              <label className="block font-medium">
                Country
                <select
                  name="country"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  <option value="US">United States</option>
                  <option value="Canada">Canada</option>
                </select>
                {fieldError("country")}
              </label>
            </div>
            {role === "seller" && (
              <>
                <label className="block font-medium">
                  Business category
                  <select
                    name="category"
                    required
                    defaultValue=""
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category[0].toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  {fieldError("category")}
                </label>
                <label className="block font-medium">
                  Website / Instagram{" "}
                  <span className="font-normal text-zinc-500">(optional)</span>
                  <input
                    name="businessLink"
                    placeholder="https://yourwebsite.com or @yourbusiness"
                    maxLength={500}
                    className={inputClass}
                    aria-invalid={!!fields.businessLink}
                    aria-describedby={
                      fields.businessLink ? "businessLink-error" : undefined
                    }
                  />
                  {fieldError("businessLink")}
                </label>
              </>
            )}
            <div
              aria-hidden="true"
              className="absolute -left-[10000px] h-px w-px overflow-hidden"
            >
              <label>
                Leave this empty
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <label className="flex items-start gap-3 text-sm leading-6 text-zinc-600">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-green-700"
              />
              <span>
                {consentText}{" "}
                <a href="/privacy" className="text-melon-700 underline">
                  Privacy Policy
                </a>
              </span>
            </label>
            {error && (
              <p role="alert" className="text-sm leading-6 text-red-700">
                {error}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={!available || loading || busy}
                className={buttonClass}
              >
                {busy
                  ? "Saving..."
                  : loading
                    ? "Connecting..."
                    : "Join the Waitlist"}
              </button>
              {!available && !loading && (
                <button
                  type="button"
                  className="text-sm font-semibold text-melon-700 underline"
                  onClick={() => {
                    setError("");
                    setLoading(true);
                    setAvailable(false);
                    void refresh();
                  }}
                >
                  Try again
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
