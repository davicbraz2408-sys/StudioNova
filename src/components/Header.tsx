import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from '@/data/navigation';
import type { Page } from '@/hooks/useRouter';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const isHome = currentPage === 'home';
  const isTransparent = isHome && !scrolled;

  const activeNav = currentPage === 'project' ? 'portfolio' : currentPage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-b border-ink-100'
          : isHome
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md border-b border-ink-100'
      }`}
    >
      <div className="container-page flex items-center justify-between h-20">
        <button
          onClick={() => handleNav('home')}
          className="group flex items-center gap-2"
          aria-label="Studio Nova — Início"
        >
          <span
            className={`font-display text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
              isTransparent ? 'text-white' : 'text-ink-900'
            }`}
          >
            Studio<span className="text-accent-500">Nova</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNav(item.page)}
              className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                activeNav === item.page
                  ? isTransparent
                    ? 'text-white'
                    : 'text-accent-600'
                  : isTransparent
                    ? 'text-white/70 hover:text-white'
                    : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 ${
                  activeNav === item.page
                    ? isTransparent
                      ? 'w-6 bg-white'
                      : 'w-6 bg-accent-500'
                    : 'w-0'
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNav('contact')}
            className={`inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-300 ${
              isTransparent
                ? 'bg-white text-ink-900 hover:bg-accent-600 hover:text-white'
                : 'bg-ink-900 text-white hover:bg-accent-600'
            }`}
          >
            Fale Conosco
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 transition-colors duration-300 ${
            isTransparent && !mobileOpen ? 'text-white' : 'text-ink-900'
          }`}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-ink-100 animate-slide-down">
          <nav className="container-page py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                  activeNav === item.page
                    ? 'text-accent-600 bg-accent-50'
                    : 'text-ink-700 hover:bg-ink-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('contact')}
              className="mt-2 px-4 py-3 text-sm font-medium text-white bg-ink-900 rounded-lg"
            >
              Fale Conosco
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
