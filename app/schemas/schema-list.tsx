'use client';

import { SchemaCard } from '@/components/schema-card';
import { ColorSchema } from '@/lib/schemas';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

interface SchemaListProps {
  allSchemas: ColorSchema[];
}

export function SchemaList({ allSchemas }: SchemaListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allSchemas.forEach((schema) => {
      schema.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allSchemas]);

  const filteredSchemas = useMemo(() => {
    return allSchemas.filter((schema) => {
      const matchesSearch =
        searchQuery === '' ||
        schema.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        schema.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        schema.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => schema.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [allSchemas, searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#e6e1dc] mb-8">
          Color Schemas
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-[#1a1f29] border border-[#2d3748] rounded-lg p-6 sticky top-20">
              <h2 className="text-lg font-bold text-[#e6e1dc] mb-4">
                Filter by Tags
              </h2>

              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-sm px-3 py-1 rounded transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-[#64ffda] text-[#0f1419]'
                        : 'bg-[#2d3748] text-[#a0aec0] hover:bg-[#3d4758]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="mt-4 text-sm text-[#64ffda] hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a0aec0]" />
                <input
                  type="text"
                  placeholder="Search schemas by name, author, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1a1f29] border border-[#2d3748] rounded-lg pl-12 pr-4 py-3 text-[#e6e1dc] placeholder-[#a0aec0] focus:outline-none focus:border-[#64ffda] transition-colors"
                />
              </div>
            </div>

            <div className="mb-6 text-[#a0aec0]">
              {filteredSchemas.length}{' '}
              {filteredSchemas.length === 1 ? 'schema' : 'schemas'} found
            </div>

            {filteredSchemas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchemas.map((schema) => (
                  <SchemaCard key={schema.slug} schema={schema} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-[#a0aec0] text-lg">
                  No schemas found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTags([]);
                  }}
                  className="mt-4 text-[#64ffda] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
