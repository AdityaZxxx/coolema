import type React from 'react';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface TerminalPreviewProps {
  colors: Array<{
    name: string;
    hex: string;
    rgb: string;
  }>;
  width?: string;
  height?: string;
}

export function TerminalPreview({
  colors,
  width = '100%',
  height = '400px',
}: TerminalPreviewProps) {
  const background =
    colors.find((c) => c.name === 'black')?.hex || colors[0]?.hex || '#000000';
  const foreground =
    colors.find((c) => c.name === 'white')?.hex || colors[7]?.hex || '#ffffff';
  const brightForeground =
    colors.find((c) => c.name === 'bright_white')?.hex ||
    colors[15]?.hex ||
    '#ffffff';

  const red = colors.find((c) => c.name === 'red')?.hex || colors[1]?.hex;
  const green = colors.find((c) => c.name === 'green')?.hex || colors[2]?.hex;
  const yellow = colors.find((c) => c.name === 'yellow')?.hex || colors[3]?.hex;
  const blue = colors.find((c) => c.name === 'blue')?.hex || colors[4]?.hex;
  const magenta =
    colors.find((c) => c.name === 'magenta')?.hex || colors[5]?.hex;
  const cyan = colors.find((c) => c.name === 'cyan')?.hex || colors[6]?.hex;
  const brightBlue =
    colors.find((c) => c.name === 'bright_blue')?.hex || colors[12]?.hex;
  const brightGreen =
    colors.find((c) => c.name === 'bright_green')?.hex || colors[10]?.hex;
  const brightCyan =
    colors.find((c) => c.name === 'bright_cyan')?.hex || colors[14]?.hex;

  const terminalStyle = {
    '--term-bg': background,
    '--term-fg': foreground,
    '--term-bright-fg': brightForeground,
    '--term-red': red,
    '--term-green': green,
    '--term-yellow': yellow,
    '--term-blue': blue,
    '--term-magenta': magenta,
    '--term-cyan': cyan,
    '--term-bright-blue': brightBlue,
    '--term-bright-green': brightGreen,
    '--term-bright-cyan': brightCyan,
    width,
    height,
  } as React.CSSProperties;

  return (
    <div
      className="terminal-preview relative rounded-lg border border-[#2d3748] overflow-hidden"
      style={terminalStyle}
    >
      <div
        className="flex items-center justify-between px-4 py-2 border-b border-[#2d3748]"
        style={{ backgroundColor: background }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-xs font-mono" style={{ color: foreground }}>
          Terminal Preview
        </span>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <X />
        </Button>
      </div>

      <div
        className="overflow-y-auto p-4 font-mono text-sm"
        style={{ backgroundColor: background, height: 'calc(100% - 40px)' }}
      >
        <pre className="whitespace-pre-wrap" style={{ color: foreground }}>
          <span style={{ color: brightGreen }}>user@host</span>
          <span style={{ color: foreground }}>:</span>
          <span style={{ color: brightBlue }}>~</span>
          <span style={{ color: foreground }}>$ </span>
          <span style={{ color: brightForeground }}>ls -la</span>
          {'\n'}
          <span style={{ color: foreground }}>total 48</span>
          {'\n'}
          <span style={{ color: blue }}>drwxr-xr-x</span>
          <span style={{ color: foreground }}>
            {' '}
            12 user user 4096 Jan 15 10:30{' '}
          </span>
          <span style={{ color: brightBlue }}>.</span>
          {'\n'}
          <span style={{ color: blue }}>drwxr-xr-x</span>
          <span style={{ color: foreground }}>
            {' '}
            24 user user 4096 Jan 10 08:15{' '}
          </span>
          <span style={{ color: brightBlue }}>..</span>
          {'\n'}
          <span style={{ color: foreground }}>-rw-r--r--</span>
          <span style={{ color: foreground }}>
            {' '}
            1 user user 220 Jan 10 08:15{' '}
          </span>
          <span style={{ color: foreground }}>.bashrc</span>
          {'\n'}
          <span style={{ color: blue }}>drwxr-xr-x</span>
          <span style={{ color: foreground }}>
            {' '}
            3 user user 4096 Jan 12 14:22{' '}
          </span>
          <span style={{ color: brightBlue }}>.config</span>
          {'\n'}
          <span style={{ color: foreground }}>-rw-r--r--</span>
          <span style={{ color: foreground }}>
            {' '}
            1 user user 3526 Jan 14 16:45{' '}
          </span>
          <span style={{ color: cyan }}>README.md</span>
          {'\n'}
          <span style={{ color: green }}>-rwxr-xr-x</span>
          <span style={{ color: foreground }}>
            {' '}
            1 user user 8192 Jan 15 09:30{' '}
          </span>
          <span style={{ color: brightGreen }}>build.sh</span>
          {'\n'}
          <span style={{ color: blue }}>drwxr-xr-x</span>
          <span style={{ color: foreground }}>
            {' '}
            5 user user 4096 Jan 13 11:20{' '}
          </span>
          <span style={{ color: brightBlue }}>projects</span>
          {'\n'}
          <span style={{ color: foreground }}>-rw-r--r--</span>
          <span style={{ color: foreground }}>
            {' '}
            1 user user 1024 Jan 11 13:00{' '}
          </span>
          <span style={{ color: foreground }}>notes.txt</span>
          {'\n\n'}

          <span style={{ color: brightGreen }}>user@host</span>
          <span style={{ color: foreground }}>:</span>
          <span style={{ color: brightBlue }}>~</span>
          <span style={{ color: foreground }}>$ </span>
          <span style={{ color: brightForeground }}>cat script.py</span>
          {'\n'}
          <span style={{ color: magenta }}>def</span>
          <span style={{ color: foreground }}> </span>
          <span style={{ color: blue }}>greet</span>
          <span style={{ color: foreground }}>(</span>
          <span style={{ color: yellow }}>name</span>
          <span style={{ color: foreground }}>):</span>
          {'\n'}
          <span style={{ color: foreground }}> </span>
          <span style={{ color: cyan }}>
            &quot;Greet a user with their name&quot;
          </span>
          {'\n'}
          <span style={{ color: foreground }}> message = </span>
          <span style={{ color: cyan }}>f&quot;Hello, </span>
          <span style={{ color: yellow }}>{'{name}'}</span>
          <span style={{ color: cyan }}>!&quot;</span>
          {'\n'}
          <span style={{ color: foreground }}> </span>
          <span style={{ color: magenta }}>return</span>
          <span style={{ color: foreground }}> message</span>
          {'\n\n'}
          <span style={{ color: magenta }}>if</span>
          <span style={{ color: foreground }}> __name__ == </span>
          <span style={{ color: cyan }}>&quot;__main__&quot;</span>
          <span style={{ color: foreground }}>:</span>
          {'\n'}
          <span style={{ color: foreground }}> result = </span>
          <span style={{ color: blue }}>greet</span>
          <span style={{ color: foreground }}>(</span>
          <span style={{ color: cyan }}>&quot;Ricing Enthusiast&quot;</span>
          <span style={{ color: foreground }}>)</span>
          {'\n'}
          <span style={{ color: foreground }}> </span>
          <span style={{ color: blue }}>print</span>
          <span style={{ color: foreground }}>(result)</span>
          {'\n\n'}

          <span style={{ color: brightGreen }}>user@host</span>
          <span style={{ color: foreground }}>:</span>
          <span style={{ color: brightBlue }}>~</span>
          <span style={{ color: foreground }}>$ </span>
          <span style={{ color: brightForeground }}>npm run build</span>
          {'\n\n'}
          <span style={{ color: cyan }}>&gt; coolema@1.0.0 build</span>
          {'\n'}
          <span style={{ color: cyan }}>&gt; next build</span>
          {'\n\n'}
          <span style={{ color: foreground }}> ▲ Next.js 14.0.0</span>
          {'\n\n'}
          <span style={{ color: green }}> ✓</span>
          <span style={{ color: foreground }}>
            {' '}
            Creating an optimized production build
          </span>
          {'\n'}
          <span style={{ color: green }}> ✓</span>
          <span style={{ color: foreground }}> Compiled successfully</span>
          {'\n'}
          <span style={{ color: green }}> ✓</span>
          <span style={{ color: foreground }}>
            {' '}
            Linting and checking validity of types
          </span>
          {'\n'}
          <span style={{ color: green }}> ✓</span>
          <span style={{ color: foreground }}> Collecting page data</span>
          {'\n'}
          <span style={{ color: green }}> ✓</span>
          <span style={{ color: foreground }}>
            {' '}
            Generating static pages (8/8)
          </span>
          {'\n'}
          <span style={{ color: green }}> ✓</span>
          <span style={{ color: foreground }}>
            {' '}
            Finalizing page optimization
          </span>
          {'\n\n'}
          <span style={{ color: foreground }}>
            Route (app) Size First Load JS
          </span>
          {'\n'}
          <span style={{ color: foreground }}>┌ ○ / 1.2 kB 85.3 kB</span>
          {'\n'}
          <span style={{ color: foreground }}>├ ○ /docs 890 B 84.1 kB</span>
          {'\n'}
          <span style={{ color: foreground }}>└ ○ /schemas 1.5 kB 86.6 kB</span>
          {'\n\n'}
          <span style={{ color: green }}>○</span>
          <span style={{ color: foreground }}>
            {' '}
            (Static) prerendered as static content
          </span>
          {'\n\n'}

          <span style={{ color: brightGreen }}>user@host</span>
          <span style={{ color: foreground }}>:</span>
          <span style={{ color: brightBlue }}>~</span>
          <span style={{ color: foreground }}>$ </span>
          <span style={{ color: brightForeground }}>git status</span>
          {'\n'}
          <span style={{ color: cyan }}>On branch</span>
          <span style={{ color: foreground }}> main</span>
          {'\n'}
          <span style={{ color: cyan }}>
            Your branch is up to date with &apos;origin/main&apos;.
          </span>
          {'\n\n'}
          <span style={{ color: green }}>Changes to be committed:</span>
          {'\n'}
          <span style={{ color: foreground }}>
            {' '}
            (use &quot;git restore --staged &lt;file&gt;...&quot; to unstage)
          </span>
          {'\n'}
          <span style={{ color: green }}>
            {' '}
            modified: components/terminal-preview.tsx
          </span>
          {'\n'}
          <span style={{ color: green }}>
            {' '}
            new file: content/schemas/custom-theme.mdx
          </span>
          {'\n\n'}

          <span style={{ color: brightGreen }}>user@host</span>
          <span style={{ color: foreground }}>:</span>
          <span style={{ color: brightBlue }}>~</span>
          <span style={{ color: foreground }}>$ </span>
          <span className="animate-pulse">▊</span>
        </pre>
      </div>
    </div>
  );
}
