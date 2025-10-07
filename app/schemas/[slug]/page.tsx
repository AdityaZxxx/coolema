import { ColorGrid } from '@/components/color-grid';
import { ExportSection } from '@/components/export-section';
import { SchemaCard } from '@/components/schema-card';
import { TerminalPreview } from '@/components/terminal-preview';
import {
  getAllSchemas,
  getRelatedSchemas,
  getSchemaBySlug,
} from '@/lib/schemas';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const schemas = getAllSchemas();
  return schemas.map((schema) => ({
    slug: schema.slug,
  }));
}

export default async function SchemaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const schema = getSchemaBySlug(slug);

  if (!schema) {
    notFound();
  }

  const relatedSchemas = getRelatedSchemas(schema.slug, schema.tags);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/schemas"
          className="inline-flex items-center gap-2 text-[#a0aec0] hover:text-[#64ffda] transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Schemas
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#e6e1dc] mb-4">
            {schema.title}
          </h1>
          <p className="text-lg text-[#a0aec0] mb-4">{schema.description}</p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <span className="text-sm text-[#a0aec0]">
              by <span className="text-[#64ffda]">{schema.author}</span>
            </span>
            <div className="flex gap-2">
              {schema.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-[#2d3748] text-[#64ffda] rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#e6e1dc] mb-6">
            Color Palette
          </h2>
          <ColorGrid colors={schema.colors} />
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#e6e1dc] mb-6">
            Terminal Preview
          </h2>
          <p className="text-[#a0aec0] mb-4">
            See how this color scheme looks in a real terminal environment with
            syntax highlighting and command output.
          </p>
          <TerminalPreview colors={schema.colors} />
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#e6e1dc] mb-6">
            Export Configuration
          </h2>
          <ExportSection schema={schema} />
        </div>

        {relatedSchemas.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#e6e1dc] mb-6">
              Related Schemas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedSchemas.map((relatedSchema) => (
                <SchemaCard key={relatedSchema.slug} schema={relatedSchema} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
