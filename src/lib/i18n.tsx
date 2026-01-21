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
    "viewer.info": "Info",
    "viewer.projectInfo": "Project Information",
    "viewer.location": "Location",
    "viewer.period": "Period",
    "viewer.address": "Address",
    "viewer.description": "Description",
    "viewer.team": "Project Team",
    "viewer.architect": "Architect",
    "viewer.client": "Client",
    "viewer.contractor": "Contractor",

    // About Page
    "about.label": "About",
    "about.name": "Ceylin Karakaya",
    "about.bio1": "I believe that architecture is a quiet orchestration of precision and soul. Following my graduation and Master's degree from Bilkent University, I founded Origo House to explore the intersection of structural pragmatism and poetic space. My practice is rooted in the belief that the \"whole\" is a delicate sum of its smallest parts—a philosophy informed by the technical and philosophical approaches of Japanese and Scandinavian design.",
    "about.bio2": "For me, architecture is an act of reconnection. My design language prioritizes the use of organic materials and a deep commitment to integrating nature into the built environment, whether through tactile material palettes or seamless spatial transitions that dissolve the boundary between interior and landscape. I view renovation as a transformative process of \"curated simplicity\"—stripping away the superfluous to reveal a cohesive, enduring living experience.",
    "about.bio3": "This perspective is continuously refined by a lifelong passion for travel. I treat every journey as a vital dialogue between culture and form, where the observation of global landscapes shapes my architectural understanding. This constant exploration allows me to bring a nuanced, worldly sensibility to every project, ensuring that each space I design is both a functional sanctuary and a reflection of a timeless, nature-inspired narrative.",
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
    "media.news3.date": "2026",
    "media.news3.title": "Baumit Life Challenge 2026 — Thermal Renovation",
    "media.news3.desc": "Nazlıaka Evi featured in the Baumit Life Challenge 2026 competition, recognized for innovative thermal renovation balancing energy efficiency with architectural aesthetics.",
    "media.news3.link": "https://baumit.com.tr/references/nazliaka-evi",
    "media.link1.title": "Instagram",
    "media.link1.desc": "Behind the scenes & updates",
    "media.video1.title": "Design Philosophy",
    "media.video1.desc": "A look into my approach to architecture and project management",
    "media.video2.title": "Coastal Residence Walkthrough",
    "media.video2.desc": "Virtual tour of the completed Bodrum project",
    "nav.media": "Media",

    // Projects
    "project.1.title": "Nazlıaka Evi",
    "project.1.location": "Urla, Izmir",
    "project.1.year": "October 2023 – May 2025",
    "project.1.challenge": "Transformed a disconnected thirty-year-old villa into an observant architectural volume that harmonizes with the Mediterranean landscape",
    "project.1.description": "Situated on the Toptepe promontory, the renovation of this thirty-year-old villa focuses on the strategic re-establishment of the building's relationship with its Mediterranean context. The design language prioritizes a minimalist formal expression to act as a quiet intermediary between the interior program and the surrounding landscape of Urla.",
    "project.1.description2": "By reorganizing the site's topography and introducing a reflecting pool, the project transforms a previously insular structure into an observant architectural volume. The villa now functions as a contextual anchor, harmonizing with the verticality of the endemic cypress trees and the horizontal expanse of the Aegean horizon.",
    "project.1.description3": "The application of a bespoke combed texture serves as a tactile tribute to the verticality of the surrounding cypress trees. During the day, the sun creates a rhythmic dance of light and shadow across these grooves. At night, integrated linear lighting grazes the ridges, bathing the terrace in a sophisticated glow.",
    "project.1.client": "Nazlıaka Family",
    "project.1.contractor": "Domino Gayrimenkul Yatırım A.Ş.",
    "project.1.address": "Topaltı Sokak No:20, 35430 Urla, Izmir",
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
    "viewer.info": "Bilgi",
    "viewer.projectInfo": "Proje Bilgisi",
    "viewer.location": "Konum",
    "viewer.period": "Dönem",
    "viewer.address": "Adres",
    "viewer.description": "Açıklama",
    "viewer.team": "Proje Ekibi",
    "viewer.architect": "Mimar",
    "viewer.client": "İşveren",
    "viewer.contractor": "Yüklenici",

    // About Page
    "about.label": "Hakkımda",
    "about.name": "Ceylin Karakaya",
    "about.bio1": "Mimarlığın hassasiyet ve ruhun sessiz bir orkestrasyonu olduğuna inanıyorum. Bilkent Üniversitesi'nden mezuniyet ve yüksek lisansımın ardından, yapısal pragmatizm ile şiirsel mekan arasındaki kesişimi keşfetmek için Origo House'u kurdum. Pratiğim, \"bütün\"ün en küçük parçalarının hassas bir toplamı olduğu inancına dayanıyor—Japon ve İskandinav tasarımının teknik ve felsefi yaklaşımlarından beslenen bir felsefe.",
    "about.bio2": "Benim için mimarlık bir yeniden bağlanma eylemidir. Tasarım dilim, organik malzemelerin kullanımını ve doğayı yapılı çevreye entegre etmeye derin bir bağlılığı önceliklendirir—ister dokunsal malzeme paletleri, ister iç mekan ile peyzaj arasındaki sınırı eriten kesintisiz mekansal geçişler aracılığıyla olsun. Renovasyonu, \"küratörlüğünde sadelik\"in dönüştürücü bir süreci olarak görüyorum—gereksizi sıyırarak uyumlu, kalıcı bir yaşam deneyimini ortaya çıkarmak.",
    "about.bio3": "Bu bakış açısı, yaşam boyu süren seyahat tutkusuyla sürekli olarak rafine ediliyor. Her yolculuğu kültür ve form arasında hayati bir diyalog olarak ele alıyorum; küresel peyzajların gözlemi mimari anlayışımı şekillendiriyor. Bu sürekli keşif, her projeye nüanslı, evrensel bir duyarlılık getirmeme olanak tanıyor ve tasarladığım her mekanın hem işlevsel bir sığınak hem de zamansız, doğadan ilham alan bir anlatının yansıması olmasını sağlıyor.",
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
    "media.news3.date": "2026",
    "media.news3.title": "Baumit Life Challenge 2026 — Isı Yalıtımı Renovasyonu",
    "media.news3.desc": "Nazlıaka Evi, Baumit Life Challenge 2026 yarışmasında enerji verimliliğini mimari estetikle dengeleyen yenilikçi ısı yalıtımı renovasyonuyla öne çıktı.",
    "media.news3.link": "https://baumit.com.tr/references/nazliaka-evi",
    "media.link1.title": "Instagram",
    "media.link1.desc": "Kamera arkası ve güncellemeler",
    "media.video1.title": "Tasarım Felsefesi",
    "media.video1.desc": "Mimarlık ve proje yönetimine yaklaşımıma bir bakış",
    "media.video2.title": "Sahil Rezidansı Turu",
    "media.video2.desc": "Tamamlanmış Bodrum projesinin sanal turu",
    "nav.media": "Medya",

    // Projects
    "project.1.title": "Nazlıaka Evi",
    "project.1.location": "Urla, İzmir",
    "project.1.year": "Ekim 2023 – Mayıs 2025",
    "project.1.challenge": "Otuz yıllık kopuk bir villayı, Akdeniz peyzajıyla uyum içinde gözlemci bir mimari hacme dönüştürdük",
    "project.1.description": "Toptepe burnunda konumlanan bu otuz yıllık villanın renovasyonu, yapının Akdeniz bağlamıyla ilişkisinin stratejik olarak yeniden kurulmasına odaklanıyor. Tasarım dili, iç mekan programı ile Urla'nın çevredeki peyzajı arasında sessiz bir aracı olarak minimalist bir biçimsel ifadeyi önceliklendiriyor.",
    "project.1.description2": "Arazinin topografyasını yeniden düzenleyerek ve yansıtıcı bir havuz ekleyerek, proje daha önce içe dönük bir yapıyı gözlemci bir mimari hacme dönüştürüyor. Villa artık bağlamsal bir çapa işlevi görüyor; endemik servi ağaçlarının dikeyliği ve Ege ufkunun yatay genişliğiyle uyum sağlıyor.",
    "project.1.description3": "Özel taraklı doku uygulaması, çevredeki servi ağaçlarının dikeyliğine dokunsal bir saygı niteliğinde. Gün boyunca güneş, bu oluklar boyunca ritmik bir ışık ve gölge dansı yaratıyor. Gece ise entegre doğrusal aydınlatma sırtları yalayarak terası sofistike bir ışıltıyla yıkıyor.",
    "project.1.client": "Nazlıaka Family",
    "project.1.contractor": "Domino Gayrimenkul Yatırım A.Ş.",
    "project.1.address": "Topaltı Sokak No:20, 35430 Urla, İzmir",
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
