import { Github } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[#2d3748] bg-[#0f1419] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#a0aec0]">Made for ricing lovers</div>

          <Link
            href="https://github.com/AdityaZxxx/coolema"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#a0aec0] hover:text-[#64ffda] transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>Edit on GitHub</span>
          </Link>

          <div className="text-sm text-[#a0aec0]">
            © {new Date().getFullYear()} Coolema
          </div>
        </div>
      </div>
    </footer>
  );
}
