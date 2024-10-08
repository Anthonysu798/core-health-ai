import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router';

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const isDashboard = router.pathname === '/dashboard';

  const navItems = isDashboard
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Progress', href: '/progress' },
        { name: 'Fitness Plan', href: '/fitness-plan' },
        { name: 'Community', href: '/community' },
        { name: 'AI Assistant', href: '/ai-integrations' },
      ]
    : [
        { name: 'Home', href: '/' },
        { name: 'Objectives', href: '/#objectives' },
        { name: 'Current Needs', href: '/#current-needs' },
        { name: 'Why Substantial', href: '/#why-substantial' },
      ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-purple-800 font-bold text-2xl">Core Health Fitness</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href} className="text-purple-600 hover:text-purple-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {session ? (
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors duration-300"
                >
                  Sign Out
                </button>
              ) : (
                <Link href="/login" className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors duration-300">
                  Sign In
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-600 hover:text-purple-800 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-purple-600 hover:text-purple-800 hover:bg-purple-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-purple-200">
            <div className="flex items-center px-5">
              {session ? (
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full bg-purple-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition-colors duration-300"
                >
                  Sign Out
                </button>
              ) : (
                <Link href="/login" className="w-full bg-purple-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition-colors duration-300">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;