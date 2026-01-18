"use client";

import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowUpRight, Calendar } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// Content data - easy to update
const newsItems = [
  {
    id: 1,
    dateKey: "media.news1.date",
    titleKey: "media.news1.title",
    descKey: "media.news1.desc",
  },
  {
    id: 2,
    dateKey: "media.news2.date",
    titleKey: "media.news2.title",
    descKey: "media.news2.desc",
  },
  {
    id: 3,
    dateKey: "media.news3.date",
    titleKey: "media.news3.title",
    descKey: "media.news3.desc",
  },
];

const links = [
  {
    id: 1,
    titleKey: "media.link1.title",
    descKey: "media.link1.desc",
    url: "https://www.archdaily.com",
  },
  {
    id: 2,
    titleKey: "media.link2.title",
    descKey: "media.link2.desc",
    url: "https://www.dezeen.com",
  },
  {
    id: 3,
    titleKey: "media.link3.title",
    descKey: "media.link3.desc",
    url: "https://www.instagram.com",
  },
];

const videos = [
  {
    id: 1,
    titleKey: "media.video1.title",
    descKey: "media.video1.desc",
    youtubeId: "XoDxGdQqzeU",
  },
];

export default function Media() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="px-6 pb-24 pt-32 md:px-12 lg:px-16">
        <div className="mx-auto max-w-6xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40">
              {t("media.label")}
            </p>
            <h1 className="text-4xl font-light leading-[1.1] tracking-tight text-[#1a1a1a] md:text-5xl lg:text-6xl">
              {t("media.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-[#1a1a1a]/60">
              {t("media.subtitle")}
            </p>
          </motion.div>

          {/* News Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24"
          >
            <h2 className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40">
              {t("media.news")}
            </h2>
            <div className="space-y-0 divide-y divide-gray-100">
              {newsItems.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group cursor-pointer py-8 transition-colors hover:bg-gray-50/50"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2 text-xs text-[#1a1a1a]/40">
                        <Calendar size={12} />
                        <span>{t(item.dateKey)}</span>
                      </div>
                      <h3 className="text-xl font-light text-[#1a1a1a] transition-opacity group-hover:opacity-70 md:text-2xl">
                        {t(item.titleKey)}
                      </h3>
                      <p className="mt-2 text-sm font-light leading-relaxed text-[#1a1a1a]/60">
                        {t(item.descKey)}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>

          {/* Links Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24"
          >
            <h2 className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40">
              {t("media.links")}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {links.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group border border-gray-100 p-6 transition-all hover:border-[#1a1a1a]/20 hover:bg-gray-50/50"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-light text-[#1a1a1a]">
                      {t(link.titleKey)}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="text-[#1a1a1a]/30 transition-all group-hover:text-[#1a1a1a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <p className="mt-2 text-sm font-light text-[#1a1a1a]/50">
                    {t(link.descKey)}
                  </p>
                </motion.a>
              ))}
            </div>
          </motion.section>

          {/* Videos Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40">
              {t("media.videos")}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={t(video.titleKey)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-light text-[#1a1a1a]">
                    {t(video.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm font-light text-[#1a1a1a]/50">
                    {t(video.descKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
