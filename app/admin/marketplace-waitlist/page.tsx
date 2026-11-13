import type { Metadata } from "next";
import { AdminDashboard, AdminLogin } from "../../../components/waitlist/Admin";
import { adminConfigured, isAdmin } from "../../../lib/waitlist/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Marketplace admin",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default async function AdminPage() {
  let authenticated = false;
  try {
    authenticated = await isAdmin();
  } catch {
    return (
      <main className="container-page py-20">
        <h1 className="text-3xl">Marketplace admin</h1>
        <p className="mt-5">
          Private storage is temporarily unavailable. Please try again later.
        </p>
      </main>
    );
  }
  return (
    <main className="container-page min-h-[60vh] py-16">
      {authenticated ? (
        <AdminDashboard />
      ) : (
        <AdminLogin configured={adminConfigured()} />
      )}
    </main>
  );
}
