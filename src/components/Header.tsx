import { Search, Plus, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onCreatePost: () => void;
  onSearch: () => void;
  onAuth: () => void;
}

export function Header({ onCreatePost, onSearch, onAuth }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground">
            <span className="text-lg font-bold text-background">L</span>
          </div>
          <span className="hidden font-semibold sm:inline-block">Lost & Found</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="icon" size="icon" onClick={onSearch} aria-label="ค้นหา">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="icon" size="icon" onClick={onCreatePost} aria-label="สร้างโพสต์">
            <Plus className="h-5 w-5" />
          </Button>
          <Button variant="icon" size="icon" onClick={onAuth} aria-label="บัญชีผู้ใช้">
            <User className="h-5 w-5" />
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="icon"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="เมนู"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'absolute left-0 right-0 border-b border-border bg-background md:hidden',
          'transition-all duration-300 ease-out',
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <nav className="container flex flex-col gap-2 py-4">
          <Button
            variant="ghost"
            className="justify-start gap-3"
            onClick={() => {
              onSearch();
              setMobileMenuOpen(false);
            }}
          >
            <Search className="h-5 w-5" />
            ค้นหา
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-3"
            onClick={() => {
              onCreatePost();
              setMobileMenuOpen(false);
            }}
          >
            <Plus className="h-5 w-5" />
            ลงประกาศ
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-3"
            onClick={() => {
              onAuth();
              setMobileMenuOpen(false);
            }}
          >
            <User className="h-5 w-5" />
            เข้าสู่ระบบ
          </Button>
        </nav>
      </div>
    </header>
  );
}
