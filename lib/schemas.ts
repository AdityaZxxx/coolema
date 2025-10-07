import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface ColorSchema {
  slug: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  colors: Array<{
    name: string;
    hex: string;
    rgb: string;
  }>;
  formats: {
    kitty?: string;
    alacritty?: string;
    foot?: string;
    konsole?: string;
    iterm2?: string;
    wezterm?: string;
  };
  content: string;
}

const schemasDirectory = path.join(process.cwd(), 'content/schemas');

function fetchAllSchemas(): ColorSchema[] {
  const fileNames = fs.readdirSync(schemasDirectory);
  const allSchemasData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(schemasDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...(data as Omit<ColorSchema, 'slug' | 'content'>),
      content,
    };
  });
  return allSchemasData;
}

const SCHEMAS_REGISTRY = fetchAllSchemas();

export function getAllSchemas(): ColorSchema[] {
  return SCHEMAS_REGISTRY;
}

export function getSchemaBySlug(slug: string): ColorSchema | null {
  return SCHEMAS_REGISTRY.find((schema) => schema.slug === slug) || null;
}

export function getRelatedSchemas(
  currentSlug: string,
  tags: string[],
  limit = 3
): ColorSchema[] {
  return SCHEMAS_REGISTRY.filter((schema) => schema.slug !== currentSlug)
    .filter((schema) => schema.tags.some((tag) => tags.includes(tag)))
    .slice(0, limit);
}
