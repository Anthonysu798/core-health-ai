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
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-16 animate-slide-up">
        <h1 className="text-5xl font-bold mb-4 animate-gradient-text">Core Health AI</h1>
        <p className="text-xl text-foreground opacity-80">Your personalized fitness journey powered by AI</p>
      </header>

      <section ref={sectionRefs[0]} className="mb-16 animate-fade-in">
        <h2 className="text-3xl font-semibold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Set Your Goals', 'Get Personalized Plans', 'Track Progress'].map((step, index) => (
            <div key={index} className="text-center bg-secondary bg-opacity-20 p-6 rounded-lg hover-lift">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <span className="text-2xl text-foreground">{index + 1}</span>
              </div>
              <h3 className="font-semibold mb-2">{step}</h3>
              <p className="text-foreground opacity-70">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={sectionRefs[1]} className="mb-16 animate-fade-in">
        <h2 className="text-3xl font-semibold mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Personalized Fitness Plans', href: '/fitness-plan' },
            { title: 'Custom Nutrition Plans', href: '/nutrition-plan' },
            { title: 'Real-Time Progress Tracking', href: '/progress' },
            { title: 'Community Support', href: '/community' },
          ].map((feature, index) => (
            <div key={index} className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow hover-lift">
              <h3 className="text-xl font-semibold mb-3 text-primary">{feature.title}</h3>
              <p className="text-foreground opacity-70 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <Link href={feature.href} className="text-primary hover:text-primary-dark transition-colors">Learn more →</Link>
            </div>
          ))}
        </div>
      </section>

      <section ref={sectionRefs[2]} className="text-center animate-fade-in">
        <h2 className="text-3xl font-semibold mb-6">Ready to Start Your Journey?</h2>
        <Link href="/signup" className="bg-primary hover:bg-primary-dark text-foreground px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300 inline-block animate-pulse">
          Get Started Now
        </Link>
      </section>
    </div>
  )
}
