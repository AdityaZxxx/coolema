interface ColorPaletteProps {
  colors: Array<{
    name: string;
    hex: string;
    rgb: string;
  }>;
  size?: 'sm' | 'md' | 'lg';
}

export function ColorPalette({ colors, size = 'md' }: ColorPaletteProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-6 h-6',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex gap-1 flex-wrap">
      {colors.map((color) => (
        <div
          key={color.name}
          className={`${sizeClasses[size]} rounded`}
          style={{ backgroundColor: color.hex }}
          title={`${color.name}: ${color.hex}`}
        />
      ))}
    </div>
  );
}
