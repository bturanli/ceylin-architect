"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="flex flex-col justify-end px-6 pb-12 pt-24 md:px-12 md:pb-16 md:pt-28 lg:px-16">
      <div className="max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40"
        >
          {t("hero.projectCount")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-light leading-[1.1] tracking-tight text-[#1a1a1a] md:text-6xl lg:text-7xl"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex items-center gap-8"
        >
          <div className="h-px w-16 bg-[#1a1a1a]/20" />
          <p className="max-w-md text-sm font-light leading-relaxed text-[#1a1a1a]/60">
            {t("hero.subtitle")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
