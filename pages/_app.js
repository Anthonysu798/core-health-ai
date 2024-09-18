import "@/styles/globals.css";
import Link from 'next/link';
import { useEffect } from 'react';
import Footer from '../components/Footer';
import AIChatbot from '../components/AIChatbot';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
      <nav className="bg-secondary p-4 sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-foreground text-2xl font-bold">Core Health AI</Link>
          <div className="space-x-4">
            <Link href="/fitness-plan" className="text-foreground hover:text-primary transition-colors">Fitness Plan</Link>
            <Link href="/nutrition-plan" className="text-foreground hover:text-primary transition-colors">Nutrition Plan</Link>
            <Link href="/progress" className="text-foreground hover:text-primary transition-colors">Progress</Link>
            <Link href="/community" className="text-foreground hover:text-primary transition-colors">Community</Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto mt-8 px-4 flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
}

export default MyApp;
