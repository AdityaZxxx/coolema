'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { ColorSchema } from '@/lib/schemas';
import { Plus, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';

interface ComparisonSelectorProps {
  allSchemas: ColorSchema[];
  selectedSchemas: ColorSchema[];
  onSelectSchema: (schema: ColorSchema) => void;
  onRemoveSchema: (slug: string) => void;
  onReset: () => void;
  maxSlots?: number;
}

export function ComparisonSelector({
  allSchemas,
  selectedSchemas,
  onSelectSchema,
  onRemoveSchema,
  onReset,
  maxSlots = 4,
}: ComparisonSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const filteredSchemas = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allSchemas.filter((schema) => {
      const matchesSearch =
        schema.title.toLowerCase().includes(query) ||
        schema.description.toLowerCase().includes(query) ||
        schema.author.toLowerCase().includes(query) ||
        schema.tags.some((tag) => tag.toLowerCase().includes(query));

      const notSelected = !selectedSchemas.some((s) => s.slug === schema.slug);

      return matchesSearch && notSelected;
    });
  }, [searchQuery, allSchemas, selectedSchemas]);

  const canAddMore = selectedSchemas.length < maxSlots;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: maxSlots }).map((_, index) => {
          const schema = selectedSchemas[index];

          if (schema) {
            return (
              <Card
                key={schema.slug}
                className="p-4 bg-[#1a1b26] border-[#2d3748]"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#e6e1dc] truncate">
                        {schema.title}
                      </h3>
                      <p className="text-xs text-[#a0aec0] mt-1">
                        by {schema.author}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-[#a0aec0] hover:text-[#ff5555]"
                      onClick={() => onRemoveSchema(schema.slug)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-8 gap-1">
                    {schema.colors.slice(0, 16).map((color, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {schema.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-[#2d3748] text-[#a0aec0]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          }

          return (
            <Card
              key={`empty-${index}`}
              className="p-4 bg-[#1a1b26] border-[#2d3748] border-dashed cursor-pointer hover:border-[#64ffda] transition-colors"
              onClick={() => canAddMore && setShowPicker(true)}
            >
              <div className="h-full flex flex-col items-center justify-center text-center space-y-2">
                <Plus className="h-8 w-8 text-[#a0aec0]" />
                <p className="text-sm text-[#a0aec0]">Add Schema</p>
              </div>
            </Card>
          );
        })}
      </div>

      {showPicker && canAddMore && (
        <Card className="p-4 bg-[#1a1b26] border-[#2d3748]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#e6e1dc]">
                Select a Schema
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPicker(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a0aec0]" />
              <Input
                placeholder="Search by name, author, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0f1419] border-[#2d3748] text-[#e6e1dc]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              {filteredSchemas.map((schema) => (
                <Card
                  key={schema.slug}
                  className="p-3 bg-[#0f1419] border-[#2d3748] cursor-pointer hover:border-[#64ffda] transition-colors"
                  onClick={() => {
                    onSelectSchema(schema);
                    setShowPicker(false);
                    setSearchQuery('');
                  }}
                >
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-[#e6e1dc] truncate">
                      {schema.title}
                    </h4>
                    <div className="grid grid-cols-8 gap-1">
                      {schema.colors.slice(0, 8).map((color, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {schema.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-[#2d3748] text-[#a0aec0]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredSchemas.length === 0 && (
              <p className="text-center text-[#a0aec0] py-8">
                No schemas found matching your search.
              </p>
            )}
          </div>
        </Card>
      )}

      {selectedSchemas.length > 0 && (
        <div className="flex items-center gap-3">
          {canAddMore && (
            <Button
              onClick={() => setShowPicker(true)}
              className="bg-[#64ffda] text-[#0f1419] hover:bg-[#52ccb8]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Schema
            </Button>
          )}
          <Button
            variant="outline"
            onClick={onReset}
            className="bg-[#64ffda] text-[#0f1419] hover:bg-[#52ccb8]"
          >
            Reset All
          </Button>
        </div>
      )}
    </div>
  );
}
