"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export interface Project {
  id: number;
  title: string;
  location: string;
  year: string;
  challengeSolved: string;
  description: string;
  images: string[];
}

interface ProjectViewerProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectViewer({ project, onClose }: ProjectViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const { t } = useI18n();

  const goToNext = useCallback(() => {
    if (!project) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % project.images.length);
  }, [project]);

  const goToPrev = useCallback(() => {
    if (!project) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showInfo) {
          setShowInfo(false);
        } else {
          onClose();
        }
      }
      if (e.key === "ArrowRight" && !showInfo) goToNext();
      if (e.key === "ArrowLeft" && !showInfo) goToPrev();
      if (e.key === "i") setShowInfo((prev) => !prev);
    };

    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose, goToNext, goToPrev, showInfo]);

  useEffect(() => {
    setCurrentIndex(0);
    setShowInfo(false);
  }, [project?.id]);

  if (!project) return null;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] bg-white"
      >
        <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
          <div>
            <h2 className="text-sm font-medium tracking-wide text-[#1a1a1a]">
              {project.title}
            </h2>
            <p className="mt-1 text-xs text-[#1a1a1a]/50">
              {project.location} — {project.year}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`flex items-center gap-2 text-sm transition-opacity hover:opacity-60 ${
                showInfo ? "text-[#1a1a1a]" : "text-[#1a1a1a]/50"
              }`}
            >
              <Info size={18} />
              <span className="hidden sm:inline">{t("viewer.info")}</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm text-[#1a1a1a] transition-opacity hover:opacity-60"
            >
              <span className="hidden sm:inline">{t("viewer.close")}</span>
              <X size={20} />
            </button>
          </div>
        </header>

        <div className="absolute top-5 left-1/2 z-30 -translate-x-1/2 text-xs tracking-widest text-[#1a1a1a]/50">
          {String(currentIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
        </div>

        {/* Image Gallery */}
        <div className="relative h-full w-full overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 flex items-center justify-center px-4 py-24 md:px-20 lg:px-32"
            >
              <div className="relative h-full w-full">
                <Image
                  src={project.images[currentIndex]}
                  alt={`${project.title} - Image ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={goToPrev}
            className="absolute left-0 top-0 z-10 h-full w-1/3 cursor-w-resize"
            aria-label="Previous image"
          />
          <button
            onClick={goToNext}
            className="absolute right-0 top-0 z-10 h-full w-1/3 cursor-e-resize"
            aria-label="Next image"
          />
        </div>

        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 p-2 text-[#1a1a1a]/40 transition-colors hover:text-[#1a1a1a] md:left-8"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 p-2 text-[#1a1a1a]/40 transition-colors hover:text-[#1a1a1a] md:right-8"
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>

        {/* Footer with dots */}
        <footer className="absolute bottom-0 left-0 right-0 z-10 px-6 py-6 md:px-12 lg:px-16">
          <div className="flex items-end justify-center">
            <div className="flex gap-1">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1 transition-all ${
                    idx === currentIndex
                      ? "w-6 bg-[#1a1a1a]"
                      : "w-1 bg-[#1a1a1a]/20 hover:bg-[#1a1a1a]/40"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </footer>

        {/* Info Panel */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 right-0 z-40 h-full w-full overflow-y-auto bg-white md:w-[480px] md:border-l md:border-gray-100"
            >
              <div className="px-8 py-24 md:py-32">
                <button
                  onClick={() => setShowInfo(false)}
                  className="absolute top-5 right-6 text-[#1a1a1a]/50 transition-opacity hover:opacity-60 md:right-8"
                >
                  <X size={20} />
                </button>

                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                  {t("viewer.projectInfo")}
                </p>

                <h3 className="mt-4 text-2xl font-light tracking-tight text-[#1a1a1a]">
                  {project.title}
                </h3>

                <div className="mt-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/40">
                        {t("viewer.location")}
                      </p>
                      <p className="mt-1 text-sm font-light text-[#1a1a1a]">
                        {project.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/40">
                        {t("viewer.period")}
                      </p>
                      <p className="mt-1 text-sm font-light text-[#1a1a1a]">
                        {t("project.1.year")}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/40">
                      {t("viewer.address")}
                    </p>
                    <p className="mt-1 text-sm font-light text-[#1a1a1a]">
                      {t("project.1.address")}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/40">
                      {t("viewer.description")}
                    </p>
                    <p className="mt-3 text-sm font-light leading-relaxed text-[#1a1a1a]/80">
                      {t("project.1.description")}
                    </p>
                    <p className="mt-4 text-sm font-light leading-relaxed text-[#1a1a1a]/80">
                      {t("project.1.description2")}
                    </p>
                    <p className="mt-4 text-sm font-light leading-relaxed text-[#1a1a1a]/80">
                      {t("project.1.description3")}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/40">
                      {t("viewer.team")}
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-light text-[#1a1a1a]/50">{t("viewer.architect")}</span>
                        <span className="font-light text-[#1a1a1a]">Ceylin Karakaya Turanlı</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-light text-[#1a1a1a]/50">{t("viewer.client")}</span>
                        <span className="font-light text-[#1a1a1a]">{t("project.1.client")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-light text-[#1a1a1a]/50">{t("viewer.contractor")}</span>
                        <span className="font-light text-[#1a1a1a]">{t("project.1.contractor")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
