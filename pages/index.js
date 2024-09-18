import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Home() {
  const sectionRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-purple-900">
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8">
        <header className="text-center mb-16 animate-slide-up">
          <h1 className="text-5xl font-bold mb-4 text-purple-800 animate-gradient-text">Core Health AI</h1>
          <p className="text-xl text-purple-600 opacity-80">Revolutionize your fitness journey with AI-powered personalization</p>
        </header>

        <section ref={sectionRefs[0]} className="mb-16 animate-fade-in">
          <h2 className="text-3xl font-semibold mb-8 text-center text-purple-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              'Set Your Unique Goals',
              'Receive AI-Tailored Plans',
              'Track Real-Time Progress'
            ].map((step, index) => (
              <div key={index} className="text-center bg-purple-50 p-6 rounded-lg hover-lift">
                <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-2xl text-white">{index + 1}</span>
                </div>
                <h3 className="font-semibold mb-2 text-purple-800">{step}</h3>
                <p className="text-purple-600 opacity-70">
                  {index === 0 && "Define your fitness aspirations and health objectives."}
                  {index === 1 && "Get customized workout and nutrition plans powered by AI."}
                  {index === 2 && "Monitor your improvements with advanced analytics."}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section ref={sectionRefs[1]} className="mb-16 animate-fade-in">
          <h2 className="text-3xl font-semibold mb-8 text-center text-purple-800">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'AI-Driven Fitness Plans', href: '/fitness-plan', desc: 'Tailored workouts that adapt to your progress and preferences.' },
              { title: 'Personalized Nutrition Guidance', href: '/nutrition-plan', desc: 'Custom meal plans based on your dietary needs and goals.' },
              { title: 'Real-Time Progress Tracking', href: '/progress', desc: 'Advanced analytics to visualize your fitness journey.' },
              { title: 'Supportive Community', href: '/community', desc: 'Connect with like-minded individuals for motivation and tips.' },
            ].map((feature, index) => (
              <div key={index} className="bg-purple-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow hover-lift">
                <h3 className="text-xl font-semibold mb-3 text-purple-700">{feature.title}</h3>
                <p className="text-purple-600 opacity-70 mb-4">{feature.desc}</p>
                <Link href={feature.href} className="text-purple-600 hover:text-purple-800 transition-colors">Explore more →</Link>
              </div>
            ))}
          </div>
        </section>

        <section ref={sectionRefs[2]} className="text-center animate-fade-in">
          <h2 className="text-3xl font-semibold mb-6 text-purple-800">Transform Your Fitness Journey Today</h2>
          <Link href="/signup" className="bg-purple-600 hover:bg-purple-700 text-white mb-6 px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300 inline-block animate-pulse">
            Start Your AI-Powered Fitness Adventure
          </Link>
        </section>
      </main>
    </div>
  )
}
