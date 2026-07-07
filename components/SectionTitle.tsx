"use client";

import { motion } from "framer-motion";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, body, align = "center" }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">{title}</h2>
      {body ? <p className="mt-6 text-lg leading-8 text-zinc-600 sm:text-xl">{body}</p> : null}
    </motion.div>
  );
}
