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
  const [showInfo, setShowInfo] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useI18n();

  const goToNext = useCallback(() => {
    if (!project || isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % project.images.length);
  }, [project, isAnimating]);

  const goToPrev = useCallback(() => {
    if (!project || isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  }, [project, isAnimating]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showInfo) {
          setShowInfo(false);
        } else {
          onClose();
        }
      }
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
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

  // Apple-inspired smooth crossfade with subtle scale
  const imageVariants = {
    enter: {
      opacity: 0,
      scale: 1.02,
      filter: "blur(4px)",
    },
    center: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      filter: "blur(4px)",
    },
  };

  // Apple-style easing - very smooth, almost spring-like
  const appleEasing = [0.25, 0.1, 0.25, 1];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: appleEasing }}
        className="fixed inset-0 z-[100] bg-[#0a0a0a]"
      >
        {/* Vignette/Spotlight overlay - focuses attention on center */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-12 lg:px-16">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-medium tracking-wide text-white/90">
              {project.title}
            </h2>
            <p className="mt-0.5 truncate text-xs text-white/50">
              {project.location} — {project.year}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all duration-300 sm:gap-2 ${
                showInfo
                  ? "bg-white text-[#0a0a0a]"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              <Info size={16} />
              <span className="hidden sm:inline">{t("viewer.info")}</span>
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-sm text-white/80 transition-all duration-300 hover:text-white sm:gap-2"
            >
              <span className="hidden sm:inline">{t("viewer.close")}</span>
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex h-full flex-col lg:flex-row">
          {/* Image Section */}
          <div className="relative flex-1">
            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 z-30 -translate-x-1/2 text-xs font-light tracking-[0.3em] text-white/40 sm:top-5">
              {String(currentIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
            </div>

            {/* Image Gallery with Apple-style transitions */}
            <div className="relative h-full w-full overflow-hidden">
              <AnimatePresence
                initial={false}
                mode="wait"
                onExitComplete={() => setIsAnimating(false)}
              >
                <motion.div
                  key={currentIndex}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    opacity: { duration: 0.35, ease: appleEasing },
                    scale: { duration: 0.4, ease: appleEasing },
                    filter: { duration: 0.3, ease: appleEasing },
                  }}
                  className={`absolute inset-0 flex items-center justify-center px-4 pt-16 pb-20 sm:pt-20 sm:pb-24 ${
                    showInfo ? "md:px-8 lg:px-12" : "md:px-16 lg:px-24"
                  }`}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={project.images[currentIndex]}
                      alt={`${project.title} - Image ${currentIndex + 1}`}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes={showInfo ? "(max-width: 1024px) 100vw, 60vw" : "100vw"}
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Touch/Click Areas for Navigation */}
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

            {/* Navigation Arrows - refined styling */}
            <motion.button
              onClick={goToPrev}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/60 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:text-white sm:left-5 md:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </motion.button>
            <motion.button
              onClick={goToNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white/60 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:text-white sm:right-5 md:right-8"
              aria-label="Next image"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </motion.button>

            {/* Footer with elegant progress dots */}
            <footer className="absolute bottom-0 left-0 right-0 z-10 px-4 py-5 sm:px-6 sm:py-6">
              <div className="flex items-center justify-center">
                <div className="flex gap-2 px-2 py-1">
                  {project.images.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        if (!isAnimating) {
                          setIsAnimating(true);
                          setCurrentIndex(idx);
                        }
                      }}
                      className="relative h-1 overflow-hidden rounded-full"
                      style={{ width: idx === currentIndex ? 24 : 8 }}
                      animate={{
                        width: idx === currentIndex ? 24 : 8,
                      }}
                      transition={{ duration: 0.4, ease: appleEasing }}
                      aria-label={`Go to image ${idx + 1}`}
                    >
                      <div
                        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                          idx === currentIndex
                            ? "bg-white"
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </footer>
          </div>

          {/* Info Panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, ease: appleEasing }}
                className="absolute inset-x-0 bottom-0 z-40 max-h-[60vh] overflow-y-auto bg-[#0a0a0a] shadow-[0_-4px_30px_rgba(0,0,0,0.5)] lg:static lg:max-h-none lg:w-[400px] lg:border-l lg:border-white/10 lg:shadow-none"
              >
                <div className="px-6 py-6 lg:py-24">
                  {/* Mobile Close Button */}
                  <button
                    onClick={() => setShowInfo(false)}
                    className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/50 transition-colors hover:bg-white/20 lg:hidden"
                  >
                    <X size={16} />
                  </button>

                  {/* Drag Handle for Mobile */}
                  <div className="mb-4 flex justify-center lg:hidden">
                    <div className="h-1 w-12 rounded-full bg-white/20" />
                  </div>

                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                    {t("viewer.projectInfo")}
                  </p>

                  <h3 className="mt-3 text-xl font-light tracking-tight text-white lg:mt-4 lg:text-2xl">
                    {project.title}
                  </h3>

                  <div className="mt-6 space-y-4 lg:mt-8 lg:space-y-6">
                    <div className="grid grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                          {t("viewer.location")}
                        </p>
                        <p className="mt-1 text-sm font-light text-white/90">
                          {project.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                          {t("viewer.period")}
                        </p>
                        <p className="mt-1 text-sm font-light text-white/90">
                          {t("project.1.year")}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                        {t("viewer.address")}
                      </p>
                      <p className="mt-1 text-sm font-light text-white/90">
                        {t("project.1.address")}
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-4 lg:pt-6">
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                        {t("viewer.description")}
                      </p>
                      <p className="mt-2 text-sm font-light leading-relaxed text-white/70 lg:mt-3">
                        {t("project.1.description")}
                      </p>
                      <p className="mt-3 text-sm font-light leading-relaxed text-white/70 lg:mt-4">
                        {t("project.1.description2")}
                      </p>
                      <p className="mt-3 text-sm font-light leading-relaxed text-white/70 lg:mt-4">
                        {t("project.1.description3")}
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-4 lg:pt-6">
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/40">
                        {t("viewer.team")}
                      </p>
                      <div className="mt-2 space-y-1.5 lg:mt-3 lg:space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-light text-white/50">{t("viewer.architect")}</span>
                          <span className="font-light text-white/90">Ceylin Karakaya Turanlı</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-light text-white/50">{t("viewer.client")}</span>
                          <span className="font-light text-white/90">{t("project.1.client")}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-light text-white/50">{t("viewer.contractor")}</span>
                          <span className="font-light text-white/90">{t("project.1.contractor")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
