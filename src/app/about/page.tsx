"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useI18n } from "@/lib/i18n";

export default function About() {
  const { t } = useI18n();

  const stats = [
    { value: "5+", labelKey: "stats.yearsExp" },
    { value: "20+", labelKey: "stats.projects" },
    { value: "98%", labelKey: "stats.onTime" },
    { value: "15%", labelKey: "stats.savings" },
  ];

  const expertise = [
    "expertise.residential",
    "expertise.commercial",
    "expertise.interior",
    "expertise.projectMgmt",
    "expertise.heritage",
    "expertise.sustainable",
  ];

  const timeline = [
    { year: "2024", titleKey: "timeline.2024.title", descKey: "timeline.2024.desc" },
    { year: "2022", titleKey: "timeline.2022.title", descKey: "timeline.2022.desc" },
    { year: "2020", titleKey: "timeline.2020.title", descKey: "timeline.2020.desc" },
    { year: "2020+", titleKey: "timeline.masters.title", descKey: "timeline.masters.desc" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="px-6 pb-24 pt-32 md:px-12 lg:px-16">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] overflow-hidden bg-gray-100"
            >
              <Image
                src="/about-portrait.jpg"
                alt="Ceylin Karakaya"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>

            {/* Bio */}
            <div className="flex flex-col justify-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40"
              >
                {t("about.label")}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-light leading-[1.1] tracking-tight text-[#1a1a1a] md:text-5xl"
              >
                {t("about.name")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-lg font-light leading-relaxed text-[#1a1a1a]/70"
              >
                {t("about.bio1")}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 text-lg font-light leading-relaxed text-[#1a1a1a]/70"
              >
                {t("about.bio2")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] underline underline-offset-4 transition-opacity hover:opacity-60"
                >
                  {t("about.getInTouch")}
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-32 max-w-6xl border-y border-gray-100 py-16"
        >
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="text-4xl font-light text-[#1a1a1a] md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/40">
                  {t(stat.labelKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Philosophy */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-32 max-w-3xl text-center"
        >
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40">
            {t("about.philosophy")}
          </p>
          <blockquote className="text-2xl font-light leading-relaxed text-[#1a1a1a] md:text-3xl">
            {t("about.quote")}
          </blockquote>
        </motion.section>

        {/* Expertise */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-32 max-w-6xl"
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                {t("about.expertise")}
              </p>
              <h2 className="text-3xl font-light tracking-tight text-[#1a1a1a] md:text-4xl">
                {t("about.expertiseTitle")}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {expertise.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="border-l border-gray-200 py-2 pl-4"
                >
                  <p className="text-sm font-light text-[#1a1a1a]">{t(item)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-32 max-w-3xl"
        >
          <p className="mb-12 text-xs font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40">
            {t("about.journey")}
          </p>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-4 md:grid-cols-[100px_1fr]"
              >
                <p className="text-sm font-medium text-[#1a1a1a]/40">
                  {item.year}
                </p>
                <div>
                  <h3 className="text-lg font-medium text-[#1a1a1a]">
                    {t(item.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm font-light leading-relaxed text-[#1a1a1a]/60">
                    {t(item.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
