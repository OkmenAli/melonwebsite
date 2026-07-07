"use client";

import { motion } from "framer-motion";

type FeatureCardProps = {
  kicker?: string;
  title: string;
  body: string;
};

export function FeatureCard({ kicker, title, body }: FeatureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-card border border-melon-100 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
    >
      {kicker ? (
        <div className="mb-6 grid size-12 place-items-center rounded-2xl bg-melon-100 text-sm font-black text-melon-700">
          {kicker}
        </div>
      ) : null}
      <h3 className="text-xl font-black tracking-tight text-ink">{title}</h3>
      <p className="mt-3 text-base leading-7 text-zinc-600">{body}</p>
    </motion.article>
  );
}
