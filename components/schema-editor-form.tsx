'use client';

import { ColorSlider } from '@/components/color-slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ColorItem {
  name: string;
  hex: string;
  rgb: string;
}

interface SchemaEditorFormProps {
  colors: ColorItem[];
  onChange: (colors: ColorItem[]) => void;
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  return `${Number.parseInt(result[1], 16)}, ${Number.parseInt(result[2], 16)}, ${Number.parseInt(result[3], 16)}`;
}

export function SchemaEditorForm({ colors, onChange }: SchemaEditorFormProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
    null
  );
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);

  useEffect(() => {
    if (selectedColorIndex !== null && colors[selectedColorIndex]) {
      const hex = colors[selectedColorIndex].hex;
      if (typeof window !== 'undefined' && window.chroma) {
        const chromaColor = window.chroma(hex);
        const [h, s, l] = chromaColor.hsl();
        setHue(isNaN(h) ? 0 : Math.round(h));
        setSaturation(Math.round(s * 100));
        setLightness(Math.round(l * 100));
      }
    }
  }, [selectedColorIndex, colors]);

  const updateColor = (index: number, hex: string) => {
    const newColors = [...colors];
    newColors[index] = {
      ...newColors[index],
      hex,
      rgb: hexToRgb(hex),
    };
    onChange(newColors);
  };

  const updateColorFromHSL = (h: number, s: number, l: number) => {
    if (selectedColorIndex === null) return;
    if (typeof window !== 'undefined' && window.chroma) {
      try {
        const newHex = window.chroma.hsl(h, s / 100, l / 100).hex();
        updateColor(selectedColorIndex, newHex);
      } catch (error) {
        console.error('Error converting HSL to hex:', error);
      }
    }
  };

  const addColor = () => {
    const newColors = [
      ...colors,
      {
        name: `custom_${colors.length}`,
        hex: '#808080',
        rgb: '128, 128, 128',
      },
    ];
    onChange(newColors);
    toast.success('Color added');
  };

  const removeColor = (index: number) => {
    if (colors.length <= 16) {
      toast.error('Must have at least 16 colors');
      return;
    }
    const newColors = colors.filter((_, i) => i !== index);
    onChange(newColors);
    if (selectedColorIndex === index) {
      setSelectedColorIndex(null);
    }
    toast.success('Color removed');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border transition-colors ${
              selectedColorIndex === index
                ? 'border-[#64ffda] bg-[#1a1f29]'
                : 'border-[#2d3748] hover:border-[#4a5568]'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedColorIndex(index)}
                className="w-10 h-10 rounded border border-[#2d3748] flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: color.hex }}
                aria-label={`Select ${color.name}`}
              />

              <div className="flex-1 min-w-0">
                <Label className="text-xs text-[#a0aec0] block mb-1">
                  {color.name}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={color.hex}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                        updateColor(index, value);
                      }
                    }}
                    className="h-8 text-xs font-mono bg-[#0f1419] border-[#2d3748]"
                  />
                  <input
                    type="color"
                    value={color.hex}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border border-[#2d3748]"
                  />
                </div>
              </div>

              {colors.length > 16 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeColor(index)}
                  className="flex-shrink-0 h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-950/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={addColor}
        variant="outline"
        className="w-full border-[#2d3748] hover:border-[#64ffda] bg-transparent"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Color
      </Button>

      {selectedColorIndex !== null && (
        <div className="space-y-4 p-4 rounded-lg border border-[#2d3748] bg-[#1a1f29]">
          <h3 className="text-sm font-semibold text-[#e6e1dc]">
            Adjust {colors[selectedColorIndex]?.name || 'Color'}
          </h3>
          <ColorSlider
            label="Hue"
            value={hue}
            onChange={(value) => {
              setHue(value);
              updateColorFromHSL(value, saturation, lightness);
            }}
            min={0}
            max={360}
          />
          <ColorSlider
            label="Saturation"
            value={saturation}
            onChange={(value) => {
              setSaturation(value);
              updateColorFromHSL(hue, value, lightness);
            }}
            min={0}
            max={100}
          />
          <ColorSlider
            label="Lightness"
            value={lightness}
            onChange={(value) => {
              setLightness(value);
              updateColorFromHSL(hue, saturation, value);
            }}
            min={0}
            max={100}
          />
        </div>
      )}
    </div>
  );
}
