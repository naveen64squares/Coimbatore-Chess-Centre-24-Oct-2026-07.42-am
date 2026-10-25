import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import About from '@/components/About';
import Programs from '@/components/Programs';
import Coaches from '@/components/Coaches';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import { useReveal } from '@/hooks/useReveal';
import { SettingsProvider } from '@/lib/settings';

function App() {
  useReveal();

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-ink-950 text-ink-100 font-sans">
        <TopBar />
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <About />
          <Programs />
          <Coaches />
          <Gallery />
          <Contact />
        </main>
        <Footer />
        <AIChatbot />
      </div>
    </SettingsProvider>
  );
}

export default App;
