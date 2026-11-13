"use client";
import { useSyncExternalStore, useState } from "react";
const subscribe = (callback: () => void) => {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
};
const snapshot = () => {
  try {
    return decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return "";
  }
};
export default function Unsubscribe() {
  const token = useSyncExternalStore(subscribe, snapshot, () => "");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  async function submit() {
    setBusy(true);
    try {
      const response = await fetch("/api/marketplace-waitlist/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setMessage(data.message);
      setDone(true);
    } catch (err) {
      setMessage(
        err instanceof Error
          ? err.message
          : "Unable to save. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <h1 className="text-3xl font-semibold">Marketplace email preferences</h1>
      <p className="my-6 text-lg">
        Unsubscribe from Melon Marketplace updates. This does not change your
        Melon app account or subscription.
      </p>
      {!done && (
        <button
          onClick={submit}
          disabled={busy || !token}
          className="rounded-full bg-melon-700 px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {busy ? "Saving..." : "Unsubscribe"}
        </button>
      )}
      <p className="mt-5" role="status">
        {message}
      </p>
    </>
  );
}
