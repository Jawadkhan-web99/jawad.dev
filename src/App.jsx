import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import ProjectsPanels from './components/ProjectsPanels';
import ShowcaseOverlay from './components/ShowcaseOverlay';
import ProjectModal from './components/ProjectModal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import BackToTop from './components/BackToTop';
import CursorTrail from './components/CursorTrail';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }, []);

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <ProjectsPanels onSelectCategory={(cat) => setActiveCategory(cat)} />
        <Contact />
      </main>
      <Footer />

      {/* Interactive Overlays & Modals */}
      <ShowcaseOverlay
        category={activeCategory}
        onClose={() => setActiveCategory(null)}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Floating Utilities */}
      <WhatsAppFloat />
      <BackToTop />
      <CursorTrail />
    </>
  );
}
