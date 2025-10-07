'use client';

import { SchemaEditorForm } from '@/components/schema-editor-form';
import { TerminalPreview } from '@/components/terminal-preview';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { formatGenerators } from '@/lib/export-formats';
import { type ColorSchema } from '@/lib/schemas';
import { Copy, Download, Github, RotateCcw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ColorItem {
  name: string;
  hex: string;
  rgb: string;
}

const STARTER_COLORS: ColorItem[] = [
  { name: 'color0', hex: '#000000', rgb: '0, 0, 0' },
  { name: 'color1', hex: '#ff0000', rgb: '255, 0, 0' },
  { name: 'color2', hex: '#00ff00', rgb: '0, 255, 0' },
  { name: 'color3', hex: '#ffff00', rgb: '255, 255, 0' },
  { name: 'color4', hex: '#0000ff', rgb: '0, 0, 255' },
  { name: 'color5', hex: '#ff00ff', rgb: '255, 0, 255' },
  { name: 'color6', hex: '#00ffff', rgb: '0, 255, 255' },
  { name: 'color7', hex: '#ffffff', rgb: '255, 255, 255' },
  { name: 'color8', hex: '#555555', rgb: '85, 85, 85' },
  { name: 'color9', hex: '#ff5555', rgb: '255, 85, 85' },
  { name: 'color10', hex: '#55ff55', rgb: '85, 255, 85' },
  { name: 'color11', hex: '#ffff55', rgb: '255, 255, 85' },
  { name: 'color12', hex: '#5555ff', rgb: '85, 85, 255' },
  { name: 'color13', hex: '#ff55ff', rgb: '255, 85, 255' },
  { name: 'color14', hex: '#55ffff', rgb: '85, 255, 255' },
  { name: 'color15', hex: '#ffffff', rgb: '255, 255, 255' },
];

interface GeneratorViewProps {
  allSchemas: ColorSchema[];
}

export function GeneratorView({ allSchemas }: GeneratorViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [colors, setColors] = useState<ColorItem[]>(STARTER_COLORS);
  const [title, setTitle] = useState('My Custom Schema');
  const [description, setDescription] = useState(
    'A custom terminal color schema'
  );
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('dark, custom');
  const [selectedSchema, setSelectedSchema] = useState<string>('');

  const loadSchema = useCallback(
    (slug: string) => {
      const schema = allSchemas.find((s) => s.slug === slug);
      if (schema) {
        setColors(schema.colors);
        setTitle(schema.title);
        setDescription(schema.description);
        setAuthor(schema.author || '');
        setTags(schema.tags.join(', '));
        setSelectedSchema(slug);
        toast.success(`Loaded ${schema.title}`);
      }
    },
    [allSchemas]
  );

  useEffect(() => {
    const schemaParam = searchParams.get('schema');
    if (schemaParam) {
      loadSchema(schemaParam);
    }
  }, [searchParams, loadSchema]);

  const resetToStarter = () => {
    setColors(STARTER_COLORS);
    setTitle('My Custom Schema');
    setDescription('A custom terminal color schema');
    setAuthor('');
    setTags('dark, custom');
    setSelectedSchema('');
    router.push('/generator');
    toast.success('Reset to starter template');
  };

  const updateURLParams = () => {
    const params = new URLSearchParams();
    if (selectedSchema) {
      params.set('schema', selectedSchema);
    }
    colors.forEach((color, index) => {
      if (index < 16) {
        params.set(`color${index}`, color.hex);
      }
    });
    router.push(`/generator?${params.toString()}`, { scroll: false });
    toast.success('URL copied to clipboard!');
  };

  const generateMDX = () => {
    const colorsArray = colors
      .map(
        (c) => `    {
      name: "${c.name}",
      hex: "${c.hex}",
      rgb: "${c.rgb}",
    }`
      )
      .join(',\n');

    const mdx = `---
title: "${title}"
description: "${description}"
author: "${author}"
tags: [${tags
      .split(',')
      .map((t) => `"${t.trim()}"`)
      .join(', ')}]
colors:
  [
${colorsArray}
  ]
---

# ${title}

${description}

## Installation

Copy the configuration for your terminal emulator from the export options.

## Preview

See the live preview above to see how this schema looks in action.
`;

    navigator.clipboard.writeText(mdx);
    toast.success('MDX copied to clipboard!');
  };

  const exportJSON = () => {
    const json = JSON.stringify(
      {
        title,
        description,
        author,
        tags: tags.split(',').map((t) => t.trim()),
        colors,
      },
      null,
      2
    );
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('JSON downloaded!');
  };

  const exportTerminalConfig = (format: keyof typeof formatGenerators) => {
    const config = formatGenerators[format](colors);
    navigator.clipboard.writeText(config);
    toast.success(`${format} config copied to clipboard!`);
  };

  const openGitHubContribute = () => {
    const repoUrl = 'https://github.com/AdityaZxxx/coolema';
    window.open(
      `${repoUrl}/issues/new?template=schema-contribution.md`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-[#0f1419]">
      <div className="border-b border-[#2d3748] bg-[#1a1f29]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#e6e1dc] mb-2">
                Schema Generator
              </h1>
              <p className="text-[#a0aec0]">
                Create and customize your terminal color schemas
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select value={selectedSchema} onValueChange={loadSchema}>
                <SelectTrigger className="w-[200px] bg-[#0f1419] border-[#2d3748] col-span-2">
                  <SelectValue placeholder="Load Schema" />
                </SelectTrigger>
                <SelectContent>
                  {allSchemas.map((schema) => (
                    <SelectItem key={schema.slug} value={schema.slug}>
                      {schema.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={resetToStarter}
                variant="outline"
                className="border-[#2d3748] bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                New Schema
              </Button>

              <Button
                onClick={updateURLParams}
                variant="outline"
                className="border-[#2d3748] bg-transparent"
              >
                <Copy className="h-4 w-4 mr-2" />
                Share URL
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#1a1f29] rounded-lg border border-[#2d3748] p-6">
              <h2 className="text-xl font-semibold text-[#e6e1dc] mb-4">
                Color Editor
              </h2>
              <SchemaEditorForm colors={colors} onChange={setColors} />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1a1f29] rounded-lg border border-[#2d3748] p-6">
              <h2 className="text-xl font-semibold text-[#e6e1dc] mb-4">
                Live Preview
              </h2>
              <TerminalPreview colors={colors} height="500px" />
            </div>

            <div className="bg-[#1a1f29] rounded-lg border border-[#2d3748] p-6">
              <h2 className="text-xl font-semibold text-[#e6e1dc] mb-4">
                Color Palette
              </h2>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {colors.slice(0, 16).map((color, index) => (
                  <div key={index} className="space-y-2">
                    <div
                      className="aspect-square rounded-lg border border-[#2d3748] hover:scale-105 transition-transform cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                      title={`${color.name}: ${color.hex}`}
                    />
                    <p className="text-xs text-center text-[#a0aec0] font-mono">
                      {color.hex}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1a1f29] rounded-lg border border-[#2d3748] p-6">
              <h2 className="text-xl font-semibold text-[#e6e1dc] mb-4">
                Schema Details
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-[#a0aec0]">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 bg-[#0f1419] border-[#2d3748]"
                    placeholder="My Awesome Theme"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-[#a0aec0]">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 bg-[#0f1419] border-[#2d3748]"
                    placeholder="A beautiful color scheme inspired by..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="author" className="text-[#a0aec0]">
                    Author
                  </Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="mt-1 bg-[#0f1419] border-[#2d3748]"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <Label htmlFor="tags" className="text-[#a0aec0]">
                    Tags (comma-separated)
                  </Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="mt-1 bg-[#0f1419] border-[#2d3748]"
                    placeholder="dark, retro, warm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#1a1f29] rounded-lg border border-[#2d3748] p-6">
              <h2 className="text-xl font-semibold text-[#e6e1dc] mb-4">
                Export & Share
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Button
                    onClick={() => exportTerminalConfig('kitty')}
                    variant="outline"
                    className="border-[#2d3748]"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Kitty
                  </Button>
                  <Button
                    onClick={() => exportTerminalConfig('alacritty')}
                    variant="outline"
                    className="border-[#2d3748]"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Alacritty
                  </Button>
                  <Button
                    onClick={() => exportTerminalConfig('foot')}
                    variant="outline"
                    className="border-[#2d3748]"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Foot
                  </Button>
                  <Button
                    onClick={() => exportTerminalConfig('wezterm')}
                    variant="outline"
                    className="border-[#2d3748]"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    WezTerm
                  </Button>
                </div>

                <div className="grid gap-3">
                  <Button
                    onClick={generateMDX}
                    className="col-span-2 bg-[#64ffda] text-[#0f1419] hover:bg-[#52ccb8]"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Generate MDX
                  </Button>
                  <Button
                    onClick={exportJSON}
                    variant="outline"
                    className="col-span-2 border-[#2d3748] bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download JSON
                  </Button>
                </div>

                <Button
                  onClick={openGitHubContribute}
                  variant="outline"
                  className="w-full border-[#2d3748] hover:border-[#64ffda] bg-transparent"
                >
                  <Github className="h-4 w-4 mr-2" />
                  Contribute to GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
