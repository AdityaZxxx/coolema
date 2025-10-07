import { SchemaCard } from '@/components/schema-card';
import { getAllSchemas } from '@/lib/schemas';
import { ArrowRight, Code2, Download, Palette } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const allSchemas = getAllSchemas();
  const featuredSchemas = allSchemas.slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#e6e1dc] mb-6 text-balance">
            Curated Color Schemas for Your{' '}
            <span className="text-[#64ffda]">Terminal Ricing Journey</span>
          </h1>

          <p className="text-lg md:text-xl text-[#a0aec0] mb-8 text-pretty">
            Explore, Copy, Export – Static, Open-Source Collection
          </p>

          <Link
            href="/schemas"
            className="inline-flex items-center gap-2 bg-[#64ffda] text-[#0f1419] px-6 py-3 rounded-lg font-semibold hover:bg-[#52e4c8] transition-colors"
          >
            Browse All Schemas
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {featuredSchemas.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-[#e6e1dc] mb-8">
            Featured Schemas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSchemas.map((schema) => (
              <SchemaCard key={schema.slug} schema={schema} />
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-[#e6e1dc] mb-12 text-center">
          Why Coolema?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1a1f29] border border-[#2d3748] rounded-lg p-6">
            <div className="w-12 h-12 bg-[#64ffda]/10 rounded-lg flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-[#64ffda]" />
            </div>
            <h3 className="text-xl font-bold text-[#e6e1dc] mb-3">
              Easy Ricing
            </h3>
            <p className="text-[#a0aec0] leading-relaxed">
              Handpicked color schemes designed specifically for terminal
              emulators. No more hunting through forums or GitHub repos.
            </p>
          </div>

          <div className="bg-[#1a1f29] border border-[#2d3748] rounded-lg p-6">
            <div className="w-12 h-12 bg-[#64ffda]/10 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-[#64ffda]" />
            </div>
            <h3 className="text-xl font-bold text-[#e6e1dc] mb-3">
              Multiple Formats
            </h3>
            <p className="text-[#a0aec0] leading-relaxed">
              Export to Kitty, Alacritty, Foot, WezTerm, and more. One-click
              copy or download ready-to-use config files.
            </p>
          </div>

          <div className="bg-[#1a1f29] border border-[#2d3748] rounded-lg p-6">
            <div className="w-12 h-12 bg-[#64ffda]/10 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-[#64ffda]" />
            </div>
            <h3 className="text-xl font-bold text-[#e6e1dc] mb-3">
              Open Source
            </h3>
            <p className="text-[#a0aec0] leading-relaxed">
              Built by the community, for the community. Contribute your own
              schemas and help others rice their terminals.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#1a1f29] to-[#0f1419] border border-[#2d3748] rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-[#e6e1dc] mb-4">
            Ready to Rice Your Terminal?
          </h2>
          <p className="text-lg text-[#a0aec0] mb-8">
            Start exploring our collection of carefully curated color schemas
          </p>
          <Link
            href="/schemas"
            className="inline-flex items-center gap-2 bg-[#64ffda] text-[#0f1419] px-6 py-3 rounded-lg font-semibold hover:bg-[#52e4c8] transition-colors"
          >
            Browse Schemas
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
