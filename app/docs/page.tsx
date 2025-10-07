import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import rehypeSlug from 'rehype-slug';

const h2 = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => <h2 {...props} className="text-3xl font-bold text-[#e6e1dc] mt-12 mb-6" />;

const h3 = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => <h3 {...props} className="text-2xl font-bold text-[#e6e1dc] mt-8 mb-4" />;

const h4 = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => <h4 {...props} className="text-lg font-semibold text-[#e6e1dc] mb-2" />;

const p = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
) => <p {...props} className="text-[#e6e1dc] leading-relaxed mb-4" />;

const ol = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLOListElement>, HTMLOListElement>
) => <ol {...props} className="list-decimal list-inside space-y-2 mb-4" />;

const ul = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
) => <ul {...props} className="list-disc list-inside space-y-2 mb-4" />;

const code = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) => (
  <code
    {...props}
    className="text-[#64ffda] px-1.5 py-1 rounded-md font-mono text-sm"
  />
);

const pre = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
) => (
  <pre
    {...props}
    className="bg-[#0f1419] border border-[#2d3748] rounded-lg p-4 overflow-x-auto text-sm font-mono mb-4"
  />
);

const TerminalSetupBox = ({ children }: { children: ReactNode }) => (
  <div className="bg-[#1a1f29] border border-[#2d3748] rounded-lg p-4 mb-4">
    {children}
  </div>
);

const components = {
  h2,
  h3,
  h4,
  p,
  ol,
  ul,
  code,
  pre,
  TerminalSetupBox,
};

export default async function DocsPage() {
  const docsPath = path.join(process.cwd(), 'content', 'docs.mdx');
  const source = fs.readFileSync(docsPath, 'utf8');

  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="sticky top-20 bg-[#1a1f29] border border-[#2d3748] rounded-lg p-6">
              <h2 className="text-lg font-bold text-[#e6e1dc] mb-4">
                Contents
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#getting-started"
                    className="text-sm text-[#a0aec0] hover:text-[#64ffda] transition-colors"
                  >
                    Getting Started
                  </a>
                </li>
                <li>
                  <a
                    href="#contribution-guide"
                    className="text-sm text-[#a0aec0] hover:text-[#64ffda] transition-colors"
                  >
                    Contribution Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#supported-formats"
                    className="text-sm text-[#a0aec0] hover:text-[#64ffda] transition-colors"
                  >
                    Supported Formats
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 max-w-none">
            <h1 className="text-4xl font-bold text-[#e6e1dc] mb-8">
              Documentation
            </h1>
            {content}
          </main>
        </div>
      </div>
    </div>
  );
}
