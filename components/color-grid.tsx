'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface ColorGridProps {
  colors: Array<{
    name: string;
    hex: string;
    rgb: string;
  }>;
}

export function ColorGrid({ colors }: ColorGridProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = async (text: string, colorName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedColor(colorName);
      toast.success(`Copied ${text}`);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {colors.map((color) => (
        <div
          key={color.name}
          className="bg-[#1a1f29] border border-[#2d3748] rounded-lg overflow-hidden hover:border-[#64ffda] transition-all group"
        >
          <div className="h-24 relative" style={{ backgroundColor: color.hex }}>
            <button
              onClick={() => copyToClipboard(color.hex, color.name)}
              className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100"
            >
              {copiedColor === color.name ? (
                <Check className="w-6 h-6 text-white" />
              ) : (
                <Copy className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
          <div className="p-3">
            <div className="text-sm font-semibold text-[#e6e1dc] mb-1">
              {color.name}
            </div>
            <div className="text-xs text-[#a0aec0] font-mono">{color.hex}</div>
            <div className="text-xs text-[#a0aec0] font-mono">{color.rgb}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
