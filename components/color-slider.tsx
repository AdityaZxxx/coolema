'use client';

import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface ColorSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function ColorSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: ColorSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs text-[#a0aec0]">{label}</Label>
        <span className="text-xs text-[#64ffda] font-mono">{value}</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  );
}
