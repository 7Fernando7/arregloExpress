import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/Logo';
import { Scissors } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <Logo />
        </a>
        <a href="#suggest-alterations">
          <Button>
            <Scissors className="mr-2 h-4 w-4" />
            Get Suggestions
          </Button>
        </a>
      </div>
    </header>
  );
}
