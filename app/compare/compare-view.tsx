'use client';

import { ComparisonSelector } from '@/components/comparison-selector';
import { DiffTable } from '@/components/diff-table';
import { TerminalPreview } from '@/components/terminal-preview';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { type ColorSchema } from '@/lib/schemas';
import { ArrowRight, Check, Edit, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CompareViewProps {
  allSchemas: ColorSchema[];
}

export function CompareView({ allSchemas }: CompareViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSchemas, setSelectedSchemas] = useState<ColorSchema[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const schemasParam = searchParams.get('schemas');
    if (schemasParam) {
      const slugs = schemasParam.split(',').filter(Boolean);
      const schemas = slugs
        .map((slug) => allSchemas.find((s) => s.slug === slug))
        .filter((s): s is ColorSchema => s !== undefined);
      setSelectedSchemas(schemas);
    } else {
      setSelectedSchemas([]);
    }
  }, [searchParams, allSchemas]);

  const handleSelectSchema = (schema: ColorSchema) => {
    if (
      selectedSchemas.length < 4 &&
      !selectedSchemas.some((s) => s.slug === schema.slug)
    ) {
      const newSchemas = [...selectedSchemas, schema];
      const slugs = newSchemas.map((s) => s.slug).join(',');
      router.push(`/compare?schemas=${slugs}`, { scroll: false });
    }
  };

  const handleRemoveSchema = (slug: string) => {
    const newSchemas = selectedSchemas.filter((s) => s.slug !== slug);
    if (newSchemas.length > 0) {
      const slugs = newSchemas.map((s) => s.slug).join(',');
      router.push(`/compare?schemas=${slugs}`, { scroll: false });
    } else {
      router.push('/compare', { scroll: false });
    }
  };

  const handleResetAll = () => {
    setSelectedSchemas([]);
    router.push('/compare', { scroll: false });
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1419]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4 mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#e6e1dc] mb-2">
                Compare Schemas
              </h1>
              <p className="text-lg text-[#a0aec0]">
                Select 2-4 color schemas to compare side-by-side with
                synchronized terminal previews
              </p>
            </div>
            {selectedSchemas.length >= 2 && (
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-[#2d3748] text-[#a0aec0] hover:text-[#64ffda] hover:border-[#64ffda] bg-transparent"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Comparison
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        <div className="mb-8">
          <ComparisonSelector
            allSchemas={allSchemas}
            selectedSchemas={selectedSchemas}
            onSelectSchema={handleSelectSchema}
            onRemoveSchema={handleRemoveSchema}
            onReset={handleResetAll}
            maxSlots={4}
          />
        </div>

        {selectedSchemas.length === 1 && (
          <Card className="p-6 bg-[#1a1b26] border-[#2d3748] mb-8">
            <p className="text-center text-[#a0aec0]">
              Please select at least one more schema to start comparing (minimum
              2 required)
            </p>
          </Card>
        )}

        {selectedSchemas.length >= 2 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {selectedSchemas.map((schema) => (
                <Card
                  key={schema.slug}
                  className="p-6 bg-[#1a1b26] border-[#2d3748]"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-[#e6e1dc]">
                          {schema.title}
                        </h3>
                        <p className="text-sm text-[#a0aec0] mt-1">
                          by {schema.author}
                        </p>
                      </div>
                      <Link href={`/generator?schema=${schema.slug}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-sm md:text-lg border-[#2d3748] text-[#a0aec0] hover:text-[#64ffda] hover:border-[#64ffda] bg-transparent"
                        >
                          <span className="hidden md:flex items-center">
                            Edit in Generator
                            <ArrowRight className="h-3 w-3 ml-2" />
                          </span>
                          <span className="md:hidden">
                            <Edit className="h-3 w-3" />
                          </span>
                        </Button>
                      </Link>
                    </div>

                    <TerminalPreview colors={schema.colors} height="500px" />
                  </div>
                </Card>
              ))}
            </div>

            <DiffTable schemas={selectedSchemas} />
          </div>
        )}

        {selectedSchemas.length === 0 && (
          <Card className="p-12 bg-[#1a1b26] border-[#2d3748]">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-[#e6e1dc]">
                No Schemas Selected
              </h2>
              <p className="text-[#a0aec0] max-w-md mx-auto">
                Start by selecting schemas from the slots above. You can compare
                2-4 schemas side-by-side to see how they differ.
              </p>
              <div className="flex items-center justify-center gap-4 pt-4">
                <Link href="/schemas">
                  <Button className="bg-[#64ffda] text-[#0f1419] hover:bg-[#52ccb8]">
                    Browse All Schemas
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
