"use client";
import { useEffect, useState, type FormEvent } from "react";
import { categories, type Registration } from "../../lib/waitlist/model";
const control =
  "rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-base focus:outline-melon-700";
const button =
  "rounded-md bg-melon-700 px-5 py-2.5 font-semibold text-white disabled:opacity-50";
const base = "/api/admin/marketplace-waitlist";
export function AdminLogin({ configured }: { configured: boolean }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch(`${base}/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
      setBusy(false);
    }
  }
  return (
    <div className="max-w-sm">
      <h1 className="text-3xl font-semibold">Marketplace admin</h1>
      {!configured ? (
        <p className="mt-6" role="status">
          Admin access is not configured. Connect the private storage and admin
          credentials in Vercel first.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-8 grid gap-5">
          <label className="grid gap-2">
            Admin email
            <input
              name="email"
              type="email"
              autoComplete="username"
              required
              maxLength={254}
              className={control}
            />
          </label>
          <label className="grid gap-2">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              maxLength={256}
              className={control}
            />
          </label>
          {error && (
            <p role="alert" className="text-red-700">
              {error}
            </p>
          )}
          <button disabled={busy} className={button}>
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>
      )}
    </div>
  );
}
type Data = {
  records: Registration[];
  total: number;
  page: number;
  totals: { all: number; buyer: number; seller: number };
};
export function AdminDashboard() {
  const [query, setQuery] = useState("role=buyer");
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(true);
  const [exporting, setExporting] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${base}?${query}`, { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        const result = await response.json();
        if (response.status === 401) {
          window.location.reload();
          return;
        }
        if (!response.ok) throw new Error(result.error);
        setData(result);
      })
      .catch((err) => {
        if (err.name !== "AbortError")
          setError(err.message || "Unable to load signups.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setBusy(false);
      });
    return () => controller.abort();
  }, [query]);
  function updateQuery(value: string) {
    if (value === query) return;
    setBusy(true);
    setError("");
    setData(null);
    setQuery(value);
  }
  function filter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateQuery(
      new URLSearchParams(
        Object.fromEntries(new FormData(event.currentTarget)) as Record<
          string,
          string
        >,
      ).toString(),
    );
  }
  function page(value: number) {
    const params = new URLSearchParams(query);
    params.set("page", String(value));
    updateQuery(params.toString());
  }
  async function exportCsv() {
    setExporting(true);
    setError("");
    try {
      const response = await fetch(`${base}/export?${query}`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error((await response.json()).error);
      const url = URL.createObjectURL(await response.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = "melon-marketplace-waitlist.csv";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed.");
    } finally {
      setExporting(false);
    }
  }
  async function logout() {
    try {
      const response = await fetch(`${base}/session`, { method: "DELETE" });
      if (!response.ok) throw new Error("Sign out failed. Please try again.");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign out failed.");
    }
  }
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold">Marketplace waitlist</h1>
        <button onClick={logout} className="text-melon-700 underline">
          Sign out
        </button>
      </div>
      <div className="my-8 flex flex-wrap gap-8 text-lg" aria-live="polite">
        <p>
          Total <strong>{data?.totals.all ?? "-"}</strong>
        </p>
        <p>
          Buyers <strong>{data?.totals.buyer ?? "-"}</strong>
        </p>
        <p>
          Sellers <strong>{data?.totals.seller ?? "-"}</strong>
        </p>
      </div>
      <form
        onSubmit={filter}
        className="flex flex-wrap items-end gap-3 border-y border-zinc-200 py-5"
      >
        <label className="grid gap-1 text-sm">
          Registrations
          <select name="role" defaultValue="buyer" className={control}>
            <option value="buyer">Buyers</option>
            <option value="seller">Sellers</option>
            <option value="all">All</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          Country
          <select name="country" className={control}>
            <option value="all">All countries</option>
            <option value="US">United States</option>
            <option value="Canada">Canada</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          Category
          <select name="category" className={control}>
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          Consent
          <select name="status" className={control}>
            <option value="all">All statuses</option>
            <option value="subscribed">Subscribed</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
        </label>
        <label className="grid min-w-0 gap-1 text-sm">
          Search
          <input
            name="q"
            type="search"
            maxLength={160}
            placeholder="Email or business"
            className={control}
          />
        </label>
        <button disabled={busy} className={button}>
          Apply filters
        </button>
      </form>
      <div className="my-5 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite">
          {busy
            ? "Loading registrations..."
            : `${data?.total ?? 0} matching registrations`}
        </p>
        <button
          onClick={exportCsv}
          disabled={busy || exporting || !data}
          className={button}
        >
          {exporting ? "Exporting..." : "Export filtered CSV"}
        </button>
      </div>
      {error && (
        <p role="alert" className="my-4 text-red-700">
          {error}
        </p>
      )}
      <div
        className="overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Waitlist registrations"
      >
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-300">
            <tr>
              {[
                "Role",
                "Email",
                "Country",
                "Business",
                "Category",
                "Website / Instagram",
                "Signup date",
                "Consent date",
                "Status",
              ].map((label) => (
                <th
                  key={label}
                  scope="col"
                  className="whitespace-nowrap px-3 py-3 font-semibold"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.records.map((row) => (
              <tr key={row.id} className="border-b border-zinc-100 align-top">
                {[
                  row.role,
                  row.email,
                  row.country,
                  row.businessName || "-",
                  row.category || "-",
                  row.businessLink || "-",
                  new Date(row.signupAt).toLocaleString(),
                  new Date(row.consentAt).toLocaleString(),
                  row.unsubscribedAt
                    ? `Unsubscribed ${new Date(row.unsubscribedAt).toLocaleDateString()}`
                    : "Subscribed",
                ].map((value, i) => (
                  <td key={i} className="max-w-xs break-words px-3 py-4">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data && (
        <div className="mt-5 flex items-center gap-5">
          <button
            disabled={data.page <= 1}
            onClick={() => page(data.page - 1)}
            className={button}
          >
            Previous
          </button>
          <p>
            Page {data.page} of {Math.max(1, Math.ceil(data.total / 50))}
          </p>
          <button
            disabled={data.page * 50 >= data.total}
            onClick={() => page(data.page + 1)}
            className={button}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
