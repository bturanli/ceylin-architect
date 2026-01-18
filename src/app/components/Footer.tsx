"use client";

import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-gray-100 px-6 py-16 md:px-12 lg:px-16">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <span className="text-sm font-medium tracking-[0.2em] text-[#1a1a1a]">
          CEYLIN KARAKAYA
        </span>
        <span className="text-xs text-[#1a1a1a]/50">
          {new Date().getFullYear()} {t("footer.rights")}
        </span>
      </div>
    </footer>
  );
}
