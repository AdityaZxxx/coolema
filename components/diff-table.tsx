'use client';

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ColorSchema } from '@/lib/schemas';

interface DiffTableProps {
  schemas: ColorSchema[];
}

export function DiffTable({ schemas }: DiffTableProps) {
  if (schemas.length === 0) return null;

  const colorNames = schemas[0].colors.map((c) => c.name);

  const isDifferent = (colorName: string) => {
    const hexValues = schemas.map((schema) => {
      const color = schema.colors.find((c) => c.name === colorName);
      return color?.hex;
    });
    return new Set(hexValues).size > 1;
  };

  return (
    <Card className="p-6 bg-[#1a1b26] border-[#2d3748]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#e6e1dc]">
            Color Comparison Table
          </h2>
          <p className="text-sm text-[#a0aec0]">
            Differences highlighted with{' '}
            <span className="text-[#ff5555]">red border</span>
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[#2d3748] hover:bg-transparent">
                <TableHead className="text-[#a0aec0] font-semibold">
                  Color
                </TableHead>
                {schemas.map((schema) => (
                  <TableHead
                    key={schema.slug}
                    className="text-[#a0aec0] font-semibold"
                  >
                    {schema.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {colorNames.map((colorName) => {
                const hasDiff = isDifferent(colorName);

                return (
                  <TableRow
                    key={colorName}
                    className="border-[#2d3748] hover:bg-[#0f1419]/50"
                  >
                    <TableCell className="font-mono text-sm text-[#e6e1dc]">
                      {colorName}
                    </TableCell>
                    {schemas.map((schema) => {
                      const color = schema.colors.find(
                        (c) => c.name === colorName
                      );
                      if (!color)
                        return <TableCell key={schema.slug}>-</TableCell>;

                      return (
                        <TableCell key={schema.slug}>
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded border-2 ${
                                hasDiff
                                  ? 'border-[#ff5555]'
                                  : 'border-[#2d3748]'
                              }`}
                              style={{ backgroundColor: color.hex }}
                              title={color.hex}
                            />
                            <div className="space-y-0.5">
                              <p className="text-xs font-mono text-[#e6e1dc]">
                                {color.hex}
                              </p>
                              <p className="text-xs font-mono text-[#a0aec0]">
                                {color.rgb}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}
