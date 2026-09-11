import { useCallback, useEffect, useState } from "react";
import { useLenis } from "./lib/useLenis";
import { useReveal } from "./lib/useReveal";
import { Loader } from "./components/layout/Loader";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Marquee } from "./components/sections/Marquee";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Skills } from "./components/sections/Skills";
import { Work } from "./components/sections/Work";
import { Contact } from "./components/sections/Contact";

export default function App() {
  const [ready, setReady] = useState(false);
  useLenis();
  useReveal();

  const handleReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 7000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <span className="grain" aria-hidden />
      <Loader ready={ready} />
      <Navbar />

      <main>
        <Hero onSceneReady={handleReady} />
        <Marquee />
        <About />
        <Experience />
        <Skills />
        <Work />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
