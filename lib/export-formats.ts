import type { ColorSchema } from './schemas';

export function generateKittyConfig(colors: ColorSchema['colors']): string {
  return `# Kitty Color Scheme
foreground ${colors[7]?.hex || '#ffffff'}
background ${colors[0]?.hex || '#000000'}

# Black
color0 ${colors[0]?.hex || '#000000'}
color8 ${colors[8]?.hex || '#555555'}

# Red
color1 ${colors[1]?.hex || '#ff0000'}
color9 ${colors[9]?.hex || '#ff5555'}

# Green
color2 ${colors[2]?.hex || '#00ff00'}
color10 ${colors[10]?.hex || '#55ff55'}

# Yellow
color3 ${colors[3]?.hex || '#ffff00'}
color11 ${colors[11]?.hex || '#ffff55'}

# Blue
color4 ${colors[4]?.hex || '#0000ff'}
color12 ${colors[12]?.hex || '#5555ff'}

# Magenta
color5 ${colors[5]?.hex || '#ff00ff'}
color13 ${colors[13]?.hex || '#ff55ff'}

# Cyan
color6 ${colors[6]?.hex || '#00ffff'}
color14 ${colors[14]?.hex || '#55ffff'}

# White
color7 ${colors[7]?.hex || '#ffffff'}
color15 ${colors[15]?.hex || '#ffffff'}
`;
}

export function generateAlacrittyConfig(colors: ColorSchema['colors']): string {
  return `# Alacritty Color Scheme
[colors.primary]
background = '${colors[0]?.hex || '#000000'}'
foreground = '${colors[7]?.hex || '#ffffff'}'

[colors.normal]
black = '${colors[0]?.hex || '#000000'}'
red = '${colors[1]?.hex || '#ff0000'}'
green = '${colors[2]?.hex || '#00ff00'}'
yellow = '${colors[3]?.hex || '#ffff00'}'
blue = '${colors[4]?.hex || '#0000ff'}'
magenta = '${colors[5]?.hex || '#ff00ff'}'
cyan = '${colors[6]?.hex || '#00ffff'}'
white = '${colors[7]?.hex || '#ffffff'}'

[colors.bright]
black = '${colors[8]?.hex || '#555555'}'
red = '${colors[9]?.hex || '#ff5555'}'
green = '${colors[10]?.hex || '#55ff55'}'
yellow = '${colors[11]?.hex || '#ffff55'}'
blue = '${colors[12]?.hex || '#5555ff'}'
magenta = '${colors[13]?.hex || '#ff55ff'}'
cyan = '${colors[14]?.hex || '#55ffff'}'
white = '${colors[15]?.hex || '#ffffff'}'
`;
}

export function generateFootConfig(colors: ColorSchema['colors']): string {
  const get = (index: number, fallback: string) =>
    (colors[index]?.hex || fallback).substring(1);

  return `# Foot Color Scheme
[colors]
foreground=${get(7, '#ffffff')}
background=${get(0, '#000000')}

regular0=${get(0, '#000000')}
regular1=${get(1, '#ff0000')}
regular2=${get(2, '#00ff00')}
regular3=${get(3, '#ffff00')}
regular4=${get(4, '#0000ff')}
regular5=${get(5, '#ff00ff')}
regular6=${get(6, '#00ffff')}
regular7=${get(7, '#ffffff')}

bright0=${get(8, '#555555')}
bright1=${get(9, '#ff5555')}
bright2=${get(10, '#55ff55')}
bright3=${get(11, '#ffff55')}
bright4=${get(12, '#5555ff')}
bright5=${get(13, '#ff55ff')}
bright6=${get(14, '#55ffff')}
bright7=${get(15, '#ffffff')}
`;
}

export function generateWezTermConfig(colors: ColorSchema['colors']): string {
  return `-- WezTerm Color Scheme
return {
  foreground = '${colors[7]?.hex || '#ffffff'}',
  background = '${colors[0]?.hex || '#000000'}',
  
  ansi = {
    '${colors[0]?.hex || '#000000'}',
    '${colors[1]?.hex || '#ff0000'}',
    '${colors[2]?.hex || '#00ff00'}',
    '${colors[3]?.hex || '#ffff00'}',
    '${colors[4]?.hex || '#0000ff'}',
    '${colors[5]?.hex || '#ff00ff'}',
    '${colors[6]?.hex || '#00ffff'}',
    '${colors[7]?.hex || '#ffffff'}',
  },
  
  brights = {
    '${colors[8]?.hex || '#555555'}',
    '${colors[9]?.hex || '#ff5555'}',
    '${colors[10]?.hex || '#55ff55'}',
    '${colors[11]?.hex || '#ffff55'}',
    '${colors[12]?.hex || '#5555ff'}',
    '${colors[13]?.hex || '#ff55ff'}',
    '${colors[14]?.hex || '#55ffff'}',
    '${colors[15]?.hex || '#ffffff'}',
  },
}
`;
}

export const formatGenerators = {
  kitty: generateKittyConfig,
  alacritty: generateAlacrittyConfig,
  foot: generateFootConfig,
  wezterm: generateWezTermConfig,
};
