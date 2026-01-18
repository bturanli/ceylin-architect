"use client";

import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="flex items-center gap-1 text-xs font-light">
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 transition-opacity ${
          language === "en" ? "text-[#1a1a1a]" : "text-[#1a1a1a]/40 hover:text-[#1a1a1a]/60"
        }`}
      >
        EN
      </button>
      <span className="text-[#1a1a1a]/20">/</span>
      <button
        onClick={() => setLanguage("tr")}
        className={`px-2 py-1 transition-opacity ${
          language === "tr" ? "text-[#1a1a1a]" : "text-[#1a1a1a]/40 hover:text-[#1a1a1a]/60"
        }`}
      >
        TR
      </button>
    </div>
  );
}
