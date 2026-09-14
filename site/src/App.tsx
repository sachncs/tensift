import { useEffect } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { CredibilityBar } from './components/CredibilityBar';
import { Pipeline } from './components/Pipeline';
import { Features } from './components/Features';
import { Trace } from './components/Trace';
import { Numbers } from './components/Numbers';
import { UseCases } from './components/UseCases';
import { GetStarted } from './components/GetStarted';
import { Footer } from './components/Footer';

export default function App() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;
      const id = hash.slice(1);
      const node = document.getElementById(id);
      if (node) {
        const offset = 80;
        const top = node.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    const t = window.setTimeout(scrollToHash, 120);
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-950 text-ink-100">
      <Nav />
      <main>
        <Hero />
        <CredibilityBar />
        <Pipeline />
        <Features />
        <Trace />
        <Numbers />
        <UseCases />
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
}