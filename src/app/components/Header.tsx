"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();
  const router = useRouter();

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (window.location.pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        scrollToProjects();
      }, 100);
    } else {
      scrollToProjects();
    }
    setMenuOpen(false);
  };

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      const headerOffset = 20;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { label: t("nav.projects"), href: "/#projects", onClick: handleProjectsClick },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.media"), href: "/media" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header className="relative z-50 bg-white">
      <div className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <Link
          href="/"
          className="text-sm font-medium tracking-[0.2em] text-[#1a1a1a]"
        >
          CEYLIN KARAKAYA
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={item.onClick}
              className="text-sm font-light tracking-wide text-[#1a1a1a] transition-opacity hover:opacity-60"
            >
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-sm font-light tracking-wide text-[#1a1a1a] transition-opacity hover:opacity-60"
          >
            {menuOpen ? t("nav.close") : t("nav.menu")}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <nav className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 md:hidden">
          <ul className="flex flex-col px-6 py-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-2xl font-light text-[#1a1a1a] transition-opacity hover:opacity-60"
                  onClick={(e) => {
                    if (item.onClick) {
                      item.onClick(e);
                    } else {
                      setMenuOpen(false);
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
