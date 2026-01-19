"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "tr";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "nav.close": "Close",

    // Hero
    "hero.projectCount": "Featured Project — 2024",
    "hero.title": "Selected Work",
    "hero.subtitle": "Each project reveals the challenge solved—budgets met, timelines kept, problems navigated.",

    // Project Gallery
    "gallery.location": "Location",
    "gallery.year": "Year",
    "gallery.challenge": "Challenge Solved",
    "gallery.viewProject": "View Project",

    // Project Viewer
    "viewer.close": "Close",

    // About Page
    "about.label": "About",
    "about.name": "Ceylin Karakaya",
    "about.bio1": "I graduated from Bilkent University Faculty of Architecture in 2020 and completed my Master's degree at Bilkent. During my graduate studies, I founded my Istanbul-based firm Origo House, stepping into independent practice.",
    "about.bio2": "I believe architecture is more than aesthetics—it's the careful orchestration of budgets, timelines, materials, and human needs into spaces that endure. My practice focuses primarily on renovation projects, transforming disconnected spaces into cohesive living experiences.",
    "about.getInTouch": "Get in touch",
    "about.philosophy": "Philosophy",
    "about.quote": "\"Every project is a promise. My job is to keep it—delivering spaces that exceed expectations while respecting the realities of construction.\"",
    "about.expertise": "Expertise",
    "about.expertiseTitle": "Full-spectrum architectural services",
    "about.journey": "Journey",

    // Stats
    "stats.education": "University",
    "stats.degree": "Degree",
    "stats.basedIn": "Based In",
    "stats.focus": "Focus",

    // Expertise items
    "expertise.residential": "Residential Architecture",
    "expertise.commercial": "Commercial Design",
    "expertise.interior": "Interior Architecture",
    "expertise.projectMgmt": "Project Management",
    "expertise.heritage": "Heritage Restoration",
    "expertise.sustainable": "Sustainable Design",

    // Timeline
    "timeline.1.title": "B.Arch — Bilkent University",
    "timeline.1.desc": "Graduated from Bilkent University Faculty of Architecture.",
    "timeline.2.title": "M.Arch — Bilkent University",
    "timeline.2.desc": "Completed Master of Architecture at Bilkent. Founded Origo House during graduate studies.",
    "timeline.3.title": "Origo House — Izmir",
    "timeline.3.desc": "Operating independently from Izmir, specializing in renovation projects.",

    // Contact Page
    "contact.label": "Get in Touch",
    "contact.title": "Let's discuss",
    "contact.titleLine2": "your project",
    "contact.email": "Email",
    "contact.basedIn": "Based in",
    "contact.location": "Izmir, Turkey",
    "contact.services": "Services",
    "contact.service1": "Residential Architecture",
    "contact.service2": "Commercial Projects",
    "contact.service3": "Interior Design",
    "contact.service4": "Project Management",
    "contact.service5": "Renovation & Restoration",
    "contact.form.name": "Name",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.email": "Email",
    "contact.form.emailPlaceholder": "your@email.com",
    "contact.form.projectType": "Project Type",
    "contact.form.selectType": "Select a project type",
    "contact.form.residential": "Residential",
    "contact.form.commercial": "Commercial",
    "contact.form.interior": "Interior Design",
    "contact.form.renovation": "Renovation",
    "contact.form.consultation": "Consultation",
    "contact.form.other": "Other",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Tell me about your project...",
    "contact.form.send": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.success.title": "Message Sent",
    "contact.success.message": "Thank you for reaching out. I'll get back to you soon.",
    "contact.success.another": "Send another message",

    // Footer
    "footer.rights": "All Rights Reserved",

    // Media Page
    "media.label": "Media",
    "media.title": "Press & Features",
    "media.subtitle": "Featured interviews and coverage from architecture and design publications.",
    "media.news": "Press Coverage",
    "media.links": "Featured Links",
    "media.videos": "Videos",
    "media.news1.date": "2026",
    "media.news1.title": "Serapool Renovasyon Dergisi — \"Aesthetics and Engineering in Pool Design: A Renovation Story in Urla\"",
    "media.news1.desc": "In-depth interview covering the Urla villa renovation project, discussing how interior and exterior spaces were integrated through thoughtful design. The feature highlights the use of Serapool's monobloc hidden grate systems, Kaan Mix porcelain pool tiles, and sustainable material choices that balance aesthetics with engineering.",
    "media.news2.date": "September-October 2025",
    "media.news2.title": "Havuz Sauna SPA Dergisi — \"A Renovation Story in Urla Villa\"",
    "media.news2.desc": "Featured architect interview in the MİMAR section exploring the transformation of a disconnected villa into a modern, flowing living experience. The article details the design decisions behind integrating the terrace with the pool area, creating a four-season social space with bar, fire pit, and landscape elements.",
    "media.news3.date": "",
    "media.news3.title": "",
    "media.news3.desc": "",
    "media.link1.title": "Instagram",
    "media.link1.desc": "Behind the scenes & updates",
    "media.video1.title": "Design Philosophy",
    "media.video1.desc": "A look into my approach to architecture and project management",
    "media.video2.title": "Coastal Residence Walkthrough",
    "media.video2.desc": "Virtual tour of the completed Bodrum project",
    "nav.media": "Media",

    // Projects
    "project.1.title": "Villa Nazliaka",
    "project.1.location": "Urla, Izmir",
    "project.1.challenge": "Transformed a disconnected villa by integrating interior and exterior spaces through a new terrace, pool, and landscape design—creating a four-season living experience",
  },
  tr: {
    // Header
    "nav.projects": "Projeler",
    "nav.about": "Hakkımda",
    "nav.contact": "İletişim",
    "nav.menu": "Menü",
    "nav.close": "Kapat",

    // Hero
    "hero.projectCount": "Öne Çıkan Proje — 2024",
    "hero.title": "Seçili Çalışmalar",
    "hero.subtitle": "Her proje çözülen zorluğu ortaya koyar—bütçeler karşılandı, zamanlamalar tutturuldu, sorunlar aşıldı.",

    // Project Gallery
    "gallery.location": "Konum",
    "gallery.year": "Yıl",
    "gallery.challenge": "Çözülen Zorluk",
    "gallery.viewProject": "Projeyi Gör",

    // Project Viewer
    "viewer.close": "Kapat",

    // About Page
    "about.label": "Hakkımda",
    "about.name": "Ceylin Karakaya",
    "about.bio1": "2020 yılında Bilkent Üniversitesi Mimarlık Fakültesi'nden mezun oldum ve yüksek lisans eğitimimi de Bilkent'te tamamladım. Master sürecimde İstanbul merkezli firmam Origo House'u kurarak serbest mimarlığa adım attım.",
    "about.bio2": "Mimarlığın estetikten fazlası olduğuna inanıyorum—bütçelerin, zamanlamaların, malzemelerin ve insan ihtiyaçlarının kalıcı mekânlara dönüştürülmesidir. Pratiğim ağırlıklı olarak renovasyon projeleri üzerine yoğunlaşıyor; kopuk mekanları bütünleşik yaşam deneyimlerine dönüştürüyorum.",
    "about.getInTouch": "İletişime geçin",
    "about.philosophy": "Felsefe",
    "about.quote": "\"Her proje bir sözdür. Benim işim bu sözü tutmak—inşaatın gerçeklerini gözeterek beklentileri aşan mekânlar sunmak.\"",
    "about.expertise": "Uzmanlık",
    "about.expertiseTitle": "Kapsamlı mimari hizmetler",
    "about.journey": "Yolculuk",

    // Stats
    "stats.education": "Üniversite",
    "stats.degree": "Derece",
    "stats.basedIn": "Konum",
    "stats.focus": "Odak",

    // Expertise items
    "expertise.residential": "Konut Mimarisi",
    "expertise.commercial": "Ticari Tasarım",
    "expertise.interior": "İç Mimarlık",
    "expertise.projectMgmt": "Proje Yönetimi",
    "expertise.heritage": "Tarihi Restorasyon",
    "expertise.sustainable": "Sürdürülebilir Tasarım",

    // Timeline
    "timeline.1.title": "Lisans — Bilkent Üniversitesi",
    "timeline.1.desc": "Bilkent Üniversitesi Mimarlık Fakültesi'nden mezun oldum.",
    "timeline.2.title": "Y.Lisans — Bilkent Üniversitesi",
    "timeline.2.desc": "Bilkent'te Mimarlık Yüksek Lisansını tamamladım. Yüksek lisans sürecinde Origo House'u kurdum.",
    "timeline.3.title": "Origo House — İzmir",
    "timeline.3.desc": "İzmir'den bağımsız olarak faaliyet gösteriyorum, renovasyon projelerinde uzmanlaşıyorum.",

    // Contact Page
    "contact.label": "İletişim",
    "contact.title": "Projenizi",
    "contact.titleLine2": "konuşalım",
    "contact.email": "E-posta",
    "contact.basedIn": "Konum",
    "contact.location": "İzmir, Türkiye",
    "contact.services": "Hizmetler",
    "contact.service1": "Konut Mimarisi",
    "contact.service2": "Ticari Projeler",
    "contact.service3": "İç Mimarlık",
    "contact.service4": "Proje Yönetimi",
    "contact.service5": "Renovasyon & Restorasyon",
    "contact.form.name": "İsim",
    "contact.form.namePlaceholder": "Adınız",
    "contact.form.email": "E-posta",
    "contact.form.emailPlaceholder": "eposta@adresiniz.com",
    "contact.form.projectType": "Proje Tipi",
    "contact.form.selectType": "Proje tipi seçin",
    "contact.form.residential": "Konut",
    "contact.form.commercial": "Ticari",
    "contact.form.interior": "İç Mimarlık",
    "contact.form.renovation": "Renovasyon",
    "contact.form.consultation": "Danışmanlık",
    "contact.form.other": "Diğer",
    "contact.form.message": "Mesaj",
    "contact.form.messagePlaceholder": "Projeniz hakkında bilgi verin...",
    "contact.form.send": "Mesaj Gönder",
    "contact.form.sending": "Gönderiliyor...",
    "contact.success.title": "Mesaj Gönderildi",
    "contact.success.message": "Ulaştığınız için teşekkürler. En kısa sürede dönüş yapacağım.",
    "contact.success.another": "Başka bir mesaj gönder",

    // Footer
    "footer.rights": "Tüm Hakları Saklıdır",

    // Media Page
    "media.label": "Medya",
    "media.title": "Basın & Haberler",
    "media.subtitle": "Mimarlık ve tasarım yayınlarındaki röportajlar ve haberler.",
    "media.news": "Basın Haberleri",
    "media.links": "Öne Çıkan Bağlantılar",
    "media.videos": "Videolar",
    "media.news1.date": "2026",
    "media.news1.title": "Serapool Renovasyon Dergisi — \"Havuzda Estetik ve Mühendislik: Urla'da Bir Renovasyon Hikayesi\"",
    "media.news1.desc": "İç mekanla dış mekanın kopukluğunu gidererek yaşam alanlarını akıcı ve bütünleşik bir deneyime dönüştüren Urla villa renovasyonu hakkında detaylı röportaj. Serapool'un monoblok gizli ızgara sistemleri, Kaan Mix porselen havuz karoları ve estetikle mühendisliği dengeleyen sürdürülebilir malzeme seçimleri ele alındı.",
    "media.news2.date": "Eylül-Ekim 2025",
    "media.news2.title": "Havuz Sauna SPA Dergisi — \"Urla Villasında Bir Renovasyon Hikayesi\"",
    "media.news2.desc": "MİMAR bölümünde yayınlanan röportajda, kopuk bir villanın modern ve akıcı bir yaşam deneyimine nasıl dönüştürüldüğü anlatılıyor. Teras ile havuz alanının entegrasyonu, bar, ateş çukuru ve peyzaj unsurlarıyla dört mevsim yaşayan bir sosyal alan yaratma süreci detaylandırılıyor.",
    "media.news3.date": "",
    "media.news3.title": "",
    "media.news3.desc": "",
    "media.link1.title": "Instagram",
    "media.link1.desc": "Kamera arkası ve güncellemeler",
    "media.video1.title": "Tasarım Felsefesi",
    "media.video1.desc": "Mimarlık ve proje yönetimine yaklaşımıma bir bakış",
    "media.video2.title": "Sahil Rezidansı Turu",
    "media.video2.desc": "Tamamlanmış Bodrum projesinin sanal turu",
    "nav.media": "Medya",

    // Projects
    "project.1.title": "Villa Nazliaka",
    "project.1.location": "Urla, İzmir",
    "project.1.challenge": "Kopuk bir villayı, yeni teras, havuz ve peyzaj tasarımıyla iç ve dış mekanları bütünleştirerek dört mevsim yaşayan bir deneyime dönüştürdük",
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    if (saved && (saved === "en" || saved === "tr")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
