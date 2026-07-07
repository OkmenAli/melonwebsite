"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type PhoneMockupProps = {
  image: string;
  label?: string;
  tilt?: "left" | "right" | "none";
};

export function PhoneMockup({ image, label = "Melon app screen", tilt = "none" }: PhoneMockupProps) {
  const rotate = tilt === "left" ? -4 : tilt === "right" ? 4 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotate: rotate * 0.5 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="relative mx-auto w-[min(82vw,330px)]"
    >
      <div className="rounded-[46px] bg-ink p-3 shadow-phone ring-1 ring-black/10">
        <div className="relative overflow-hidden rounded-[36px] bg-fog">
          <div className="absolute left-1/2 top-0 z-10 h-7 w-28 -translate-x-1/2 rounded-b-2xl bg-ink" />
          <Image src={image} alt={label} width={640} height={960} className="h-auto w-full" priority={image === "/images/maltesers-score.png"} />
        </div>
      </div>
    </motion.div>
  );
}
