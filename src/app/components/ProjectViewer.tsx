"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };

    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose, goToNext, goToPrev]);

  useEffect(() => {
    setCurrentIndex(0);
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
        <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
          <div>
            <h2 className="text-sm font-medium tracking-wide text-[#1a1a1a]">
              {project.title}
            </h2>
            <p className="mt-1 text-xs text-[#1a1a1a]/50">
              {project.location} — {project.year}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm text-[#1a1a1a] transition-opacity hover:opacity-60"
          >
            <span className="hidden sm:inline">{t("viewer.close")}</span>
            <X size={20} />
          </button>
        </header>

        <div className="absolute top-5 left-1/2 z-10 -translate-x-1/2 text-xs tracking-widest text-[#1a1a1a]/50">
          {String(currentIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
        </div>

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

        <footer className="absolute bottom-0 left-0 right-0 z-10 px-6 py-6 md:px-12 lg:px-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/40">
                {t("gallery.challenge")}
              </span>
              <p className="mt-1 text-sm font-light text-[#1a1a1a]">
                {project.challengeSolved}
              </p>
            </div>

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
      </motion.div>
    </AnimatePresence>
  );
}
