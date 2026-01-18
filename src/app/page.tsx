import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectGallery from "./components/ProjectGallery";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ProjectGallery />
      <Footer />
    </div>
  );
}
