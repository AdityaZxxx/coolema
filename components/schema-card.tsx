import Link from 'next/link';
import { ColorPalette } from './color-palette';
import type { ColorSchema } from '@/lib/schemas';

interface SchemaCardProps {
  schema: ColorSchema;
}

export function SchemaCard({ schema }: SchemaCardProps) {
  return (
    <Link href={`/schemas/${schema.slug}`}>
      <div className="group bg-[#1a1f29] border border-[#2d3748] rounded-lg p-6 hover:border-[#64ffda] transition-all hover:shadow-lg hover:shadow-[#64ffda]/10">
        <div className="mb-4">
          <ColorPalette colors={schema.colors} size="md" />
        </div>

        <h3 className="text-lg font-bold text-[#e6e1dc] mb-2 group-hover:text-[#64ffda] transition-colors">
          {schema.title}
        </h3>

        <p className="text-sm text-[#a0aec0] mb-4 line-clamp-2">
          {schema.description}
        </p>

        <div className="flex flex-wrap gap-2">
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
    </Link>
  );
}
