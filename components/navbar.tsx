'use client';

import { Menu, Terminal, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/schemas', label: 'Schemas' },
    { href: '/compare', label: 'Compare' },
    { href: '/generator', label: 'Generator' },
    { href: '/docs', label: 'Docs' },
  ];

  return (
    <nav className="border-b border-[#2d3748] bg-[#0f1419]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Terminal className="w-6 h-6 text-[#64ffda]" />
            <span className="text-xl font-bold text-[#e6e1dc]">Coolema</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#a0aec0] hover:text-[#64ffda] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#a0aec0] hover:text-[#64ffda] focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#a0aec0] hover:text-[#e6e1dc] hover:bg-[#2d3748] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
