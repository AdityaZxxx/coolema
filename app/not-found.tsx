import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <h1 className="text-8xl font-bold text-[#64ffda]">404</h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#e6e1dc] sm:text-4xl">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-[#a0aec0]">
          Sorry, we couldn’t find the page you’re looking for. It might have
          been moved or deleted.
        </p>
        <div className="mt-10">
          <Link href="/">
            <Button className="bg-[#64ffda] text-[#0f1419] hover:bg-[#52ccb8]">
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
