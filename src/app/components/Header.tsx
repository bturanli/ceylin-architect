"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();

  const navItems = [
    { label: t("nav.projects"), href: "/#projects" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.media"), href: "/media" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
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
                  onClick={() => setMenuOpen(false)}
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
