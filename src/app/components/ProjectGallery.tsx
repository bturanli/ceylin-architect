"use client";

import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import ProjectViewer, { Project } from "./ProjectViewer";

interface ProjectCard extends Project {
  thumbnail: string;
  aspectRatio: "tall" | "wide" | "square";
}

const projectsData = [
  {
    id: 1,
    titleKey: "project.1.title",
    thumbnail: "/projects/project-1.jpg",
    locationKey: "project.1.location",
    year: "2023–2025",
    challengeKey: "project.1.challenge",
    aspectRatio: "tall" as const,
    images: Array.from({ length: 35 }, (_, i) => `/projects/1/${String(i + 1).padStart(2, "0")}.jpg`),
  },
];

function ProjectCardComponent({
  project,
  onClick,
}: {
  project: typeof projectsData[0];
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useI18n();

  const heightClass = {
    tall: "h-[480px] md:h-[560px]",
    wide: "h-[280px] md:h-[320px]",
    square: "h-[360px] md:h-[400px]",
  }[project.aspectRatio];

  return (
    <article
      className={`group relative mb-4 cursor-pointer overflow-hidden bg-gray-100 ${heightClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Image
        src={project.thumbnail}
        alt={t(project.titleKey)}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <div
        className={`absolute inset-0 flex items-end transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 w-full p-6">
          <h3 className="mb-4 text-lg font-medium tracking-wide text-white">
            {t(project.titleKey)}
          </h3>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-white/60">
                {t("gallery.location")}
              </span>
              <span className="text-xs font-light text-white">
                {t(project.locationKey)}
              </span>
            </div>

            <div>
              <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-white/60">
                {t("gallery.year")}
              </span>
              <span className="text-xs font-light text-white">
                {project.year}
              </span>
            </div>

            <div className="col-span-2 mt-2">
              <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-white/60">
                {t("gallery.challenge")}
              </span>
              <span className="text-xs font-light leading-relaxed text-white">
                {t(project.challengeKey)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/80">
            <span>{t("gallery.viewProject")}</span>
            <span className="text-white">→</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useI18n();

  const columns = [
    projectsData.filter((_, i) => i % 3 === 0),
    projectsData.filter((_, i) => i % 3 === 1),
    projectsData.filter((_, i) => i % 3 === 2),
  ];

  const handleProjectClick = (project: typeof projectsData[0]) => {
    setSelectedProject({
      id: project.id,
      title: t(project.titleKey),
      location: t(project.locationKey),
      year: project.year,
      challengeSolved: t(project.challengeKey),
      description: "",
      images: project.images,
    });
  };

  return (
    <>
      <section id="projects" className="px-6 pb-24 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col">
              {column.map((project) => (
                <ProjectCardComponent
                  key={project.id}
                  project={project}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      {selectedProject && (
        <ProjectViewer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
