'use client';

import { formatGenerators } from '@/lib/export-formats';
import type { ColorSchema } from '@/lib/schemas';
import { Check, Copy, Download } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ExportSectionProps {
  schema: ColorSchema;
}

type FormatType = 'kitty' | 'alacritty' | 'foot' | 'wezterm';

export function ExportSection({ schema }: ExportSectionProps) {
  const [selectedFormat, setSelectedFormat] = useState<FormatType>('kitty');
  const [copied, setCopied] = useState(false);

  const formats: Array<{ value: FormatType; label: string }> = [
    { value: 'kitty', label: 'Kitty' },
    { value: 'alacritty', label: 'Alacritty' },
    { value: 'foot', label: 'Foot' },
    { value: 'wezterm', label: 'WezTerm' },
  ];

  const generatedConfig = formatGenerators[selectedFormat](schema.colors);

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(generatedConfig);
      setCopied(true);
      toast.success('Configuration copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy configuration');
    }
  };

  const downloadConfig = () => {
    const extensions: Record<FormatType, string> = {
      kitty: 'conf',
      alacritty: 'toml',
      foot: 'ini',
      wezterm: 'lua',
    };

    const blob = new Blob([generatedConfig], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${schema.slug}-${selectedFormat}.${extensions[selectedFormat]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Configuration downloaded!');
  };

  return (
    <div className="bg-[#1a1f29] border border-[#2d3748] rounded-lg p-6">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#e6e1dc] mb-3">
          Select Format
        </label>
        <div className="flex flex-wrap gap-2 text-sm md:text-lg">
          {formats.map((format) => (
            <button
              key={format.value}
              onClick={() => setSelectedFormat(format.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFormat === format.value
                  ? 'bg-[#64ffda] text-[#0f1419]'
                  : 'bg-[#2d3748] text-[#a0aec0] hover:bg-[#3d4758]'
              }`}
            >
              {format.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-[#e6e1dc] mb-3">
          Configuration
        </label>
        <pre className="bg-[#0f1419] border border-[#2d3748] rounded-lg p-4 overflow-x-auto text-sm text-[#e6e1dc] font-mono max-h-96">
          {generatedConfig}
        </pre>
      </div>

      <div className="flex gap-3 text-sm md:text-lg">
        <button
          onClick={downloadConfig}
          className="flex items-center gap-2 bg-[#64ffda] text-[#0f1419] px-4 py-2 rounded-lg font-semibold hover:bg-[#52e4c8] transition-colors"
        >
          <Download className="w-5 h-5" />
          Download
        </button>

        <button
          onClick={copyConfig}
          className="flex items-center gap-2 bg-[#2d3748] text-[#e6e1dc] px-4 py-2 rounded-lg font-semibold hover:bg-[#3d4758] transition-colors"
        >
          {copied ? (
            <Check className="w-5 h-5" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
          {copied ? 'Copied!' : 'Copy Config'}
        </button>
      </div>
    </div>
  );
}
