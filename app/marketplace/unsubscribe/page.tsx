import type { Metadata } from "next";
import Unsubscribe from "../../../components/waitlist/Unsubscribe";
export const metadata: Metadata = {
  title: "Marketplace email preferences",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default function Page() {
  return (
    <main className="container-page max-w-3xl py-20">
      <Unsubscribe />
    </main>
  );
}
