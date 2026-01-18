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
    "hero.projectCount": "6 Projects — 2022–2024",
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
    "about.bio1": "I believe architecture is more than aesthetics—it's the careful orchestration of budgets, timelines, materials, and human needs into spaces that endure.",
    "about.bio2": "With over 8 years of experience across residential, commercial, and restoration projects, I've developed a practice centered on delivering exceptional design without surprises—on time and within budget.",
    "about.getInTouch": "Get in touch",
    "about.philosophy": "Philosophy",
    "about.quote": "\"Every project is a promise. My job is to keep it—delivering spaces that exceed expectations while respecting the realities of construction.\"",
    "about.expertise": "Expertise",
    "about.expertiseTitle": "Full-spectrum architectural services",
    "about.journey": "Journey",

    // Stats
    "stats.yearsExp": "Years Experience",
    "stats.projects": "Projects Completed",
    "stats.onTime": "On-Time Delivery",
    "stats.savings": "Avg. Budget Savings",

    // Expertise items
    "expertise.residential": "Residential Architecture",
    "expertise.commercial": "Commercial Design",
    "expertise.interior": "Interior Architecture",
    "expertise.projectMgmt": "Project Management",
    "expertise.heritage": "Heritage Restoration",
    "expertise.sustainable": "Sustainable Design",

    // Timeline
    "timeline.2024.title": "Independent Practice",
    "timeline.2024.desc": "Launched solo practice focusing on high-end residential and boutique commercial projects.",
    "timeline.2020.title": "Lead Architect",
    "timeline.2020.desc": "Led a team of 6 architects on mixed-use developments across Istanbul and coastal Turkey.",
    "timeline.2018.title": "Project Architect",
    "timeline.2018.desc": "Managed end-to-end delivery of residential projects, developing expertise in client relations and contractor coordination.",
    "timeline.2016.title": "M.Arch Graduate",
    "timeline.2016.desc": "Master of Architecture from Istanbul Technical University with focus on sustainable urban design.",

    // Contact Page
    "contact.label": "Get in Touch",
    "contact.title": "Let's discuss",
    "contact.titleLine2": "your project",
    "contact.email": "Email",
    "contact.basedIn": "Based in",
    "contact.location": "Istanbul, Turkey",
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
    "media.link1.title": "ArchDaily Profile",
    "media.link1.desc": "View featured projects and articles",
    "media.link2.title": "Dezeen Coverage",
    "media.link2.desc": "Press mentions and interviews",
    "media.link3.title": "Instagram",
    "media.link3.desc": "Behind the scenes & updates",
    "media.video1.title": "Design Philosophy",
    "media.video1.desc": "A look into my approach to architecture and project management",
    "media.video2.title": "Coastal Residence Walkthrough",
    "media.video2.desc": "Virtual tour of the completed Bodrum project",
    "nav.media": "Media",

    // Projects
    "project.1.title": "Coastal Residence",
    "project.1.location": "Bodrum, Turkey",
    "project.1.challenge": "Preserved sea views while maximizing privacy from neighbors through strategic landscaping and angled facades",
    "project.2.title": "Urban Office Complex",
    "project.2.location": "Istanbul, Turkey",
    "project.2.challenge": "Delivered 15% under budget through prefab innovations and careful contractor coordination",
    "project.3.title": "Mountain Retreat",
    "project.3.location": "Uludag, Turkey",
    "project.3.challenge": "Achieved net-zero energy in extreme climate conditions using passive solar design",
    "project.4.title": "Heritage Restoration",
    "project.4.location": "Izmir, Turkey",
    "project.4.challenge": "Navigated complex heritage permits and completed 2 months ahead of schedule",
    "project.5.title": "Minimalist Villa",
    "project.5.location": "Cesme, Turkey",
    "project.5.challenge": "Integrated smart home systems within traditional aesthetic without visible technology",
    "project.6.title": "Cultural Center",
    "project.6.location": "Ankara, Turkey",
    "project.6.challenge": "Coordinated 12 contractors across pandemic delays while maintaining design integrity",
  },
  tr: {
    // Header
    "nav.projects": "Projeler",
    "nav.about": "Hakkımda",
    "nav.contact": "İletişim",
    "nav.menu": "Menü",
    "nav.close": "Kapat",

    // Hero
    "hero.projectCount": "6 Proje — 2022–2024",
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
    "about.bio1": "Mimarlığın estetikten fazlası olduğuna inanıyorum—bütçelerin, zamanlamaların, malzemelerin ve insan ihtiyaçlarının kalıcı mekânlara dönüştürülmesidir.",
    "about.bio2": "Konut, ticari ve restorasyon projelerinde 8 yılı aşkın deneyimimle, zamanında ve bütçe dahilinde sürprizsiz olağanüstü tasarım sunmaya odaklanan bir pratik geliştirdim.",
    "about.getInTouch": "İletişime geçin",
    "about.philosophy": "Felsefe",
    "about.quote": "\"Her proje bir sözdür. Benim işim bu sözü tutmak—inşaatın gerçeklerini gözeterek beklentileri aşan mekânlar sunmak.\"",
    "about.expertise": "Uzmanlık",
    "about.expertiseTitle": "Kapsamlı mimari hizmetler",
    "about.journey": "Yolculuk",

    // Stats
    "stats.yearsExp": "Yıl Deneyim",
    "stats.projects": "Tamamlanan Proje",
    "stats.onTime": "Zamanında Teslimat",
    "stats.savings": "Ort. Bütçe Tasarrufu",

    // Expertise items
    "expertise.residential": "Konut Mimarisi",
    "expertise.commercial": "Ticari Tasarım",
    "expertise.interior": "İç Mimarlık",
    "expertise.projectMgmt": "Proje Yönetimi",
    "expertise.heritage": "Tarihi Restorasyon",
    "expertise.sustainable": "Sürdürülebilir Tasarım",

    // Timeline
    "timeline.2024.title": "Bağımsız Pratik",
    "timeline.2024.desc": "Üst düzey konut ve butik ticari projelere odaklanan solo pratiği başlattım.",
    "timeline.2020.title": "Baş Mimar",
    "timeline.2020.desc": "İstanbul ve kıyı Türkiye'deki karma kullanımlı projelerde 6 kişilik mimar ekibine liderlik ettim.",
    "timeline.2018.title": "Proje Mimarı",
    "timeline.2018.desc": "Konut projelerinin uçtan uca teslimini yönettim, müşteri ilişkileri ve yüklenici koordinasyonunda uzmanlık geliştirdim.",
    "timeline.2016.title": "Y.Lisans Mezunu",
    "timeline.2016.desc": "İstanbul Teknik Üniversitesi'nden sürdürülebilir kentsel tasarım odaklı Mimarlık Yüksek Lisansı.",

    // Contact Page
    "contact.label": "İletişim",
    "contact.title": "Projenizi",
    "contact.titleLine2": "konuşalım",
    "contact.email": "E-posta",
    "contact.basedIn": "Konum",
    "contact.location": "İstanbul, Türkiye",
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
    "media.link1.title": "ArchDaily Profili",
    "media.link1.desc": "Öne çıkan projeleri ve makaleleri görün",
    "media.link2.title": "Dezeen Haberleri",
    "media.link2.desc": "Basın haberleri ve röportajlar",
    "media.link3.title": "Instagram",
    "media.link3.desc": "Kamera arkası ve güncellemeler",
    "media.video1.title": "Tasarım Felsefesi",
    "media.video1.desc": "Mimarlık ve proje yönetimine yaklaşımıma bir bakış",
    "media.video2.title": "Sahil Rezidansı Turu",
    "media.video2.desc": "Tamamlanmış Bodrum projesinin sanal turu",
    "nav.media": "Medya",

    // Projects
    "project.1.title": "Sahil Rezidansı",
    "project.1.location": "Bodrum, Türkiye",
    "project.1.challenge": "Stratejik peyzaj ve açılı cephelerle komşulardan maksimum mahremiyet sağlarken deniz manzarası korundu",
    "project.2.title": "Kentsel Ofis Kompleksi",
    "project.2.location": "İstanbul, Türkiye",
    "project.2.challenge": "Prefabrik yenilikler ve dikkatli yüklenici koordinasyonuyla bütçenin %15 altında teslim edildi",
    "project.3.title": "Dağ Evi",
    "project.3.location": "Uludağ, Türkiye",
    "project.3.challenge": "Pasif güneş tasarımı kullanılarak ekstrem iklim koşullarında sıfır enerji hedefine ulaşıldı",
    "project.4.title": "Tarihi Restorasyon",
    "project.4.location": "İzmir, Türkiye",
    "project.4.challenge": "Karmaşık miras izinleri aşılarak programın 2 ay öncesinde tamamlandı",
    "project.5.title": "Minimalist Villa",
    "project.5.location": "Çeşme, Türkiye",
    "project.5.challenge": "Akıllı ev sistemleri görünür teknoloji olmadan geleneksel estetiğe entegre edildi",
    "project.6.title": "Kültür Merkezi",
    "project.6.location": "Ankara, Türkiye",
    "project.6.challenge": "Pandemi gecikmeleri boyunca tasarım bütünlüğü korunarak 12 yüklenici koordine edildi",
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
