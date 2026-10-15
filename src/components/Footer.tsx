import { Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { site } from '@/data/site';
import { navItems } from '@/data/navigation';
import type { Page } from '@/hooks/useRouter';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="container-page py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="font-display text-2xl font-extrabold text-white mb-4 tracking-tight">
              Studio<span className="text-accent-500">Nova</span>
            </div>
            <p className="text-sm leading-[1.7] max-w-md text-ink-400">
              {site.description} Arquitetura moderna, elegante e minimalista —
              transformamos espaços em experiências.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-ink-800 hover:bg-accent-600 flex items-center justify-center transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="E-mail"
                className="w-10 h-10 rounded-full bg-ink-800 hover:bg-accent-600 flex items-center justify-center transition-colors duration-300"
              >
                <Mail size={18} />
              </a>
              <a
                href={`tel:${site.phoneHref}`}
                aria-label="Telefone"
                className="w-10 h-10 rounded-full bg-ink-800 hover:bg-accent-600 flex items-center justify-center transition-colors duration-300"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-5">
              Navegação
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="text-sm text-ink-400 hover:text-white transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.15em] mb-5">
              Contato
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent-500" />
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-400 hover:text-white transition-colors leading-relaxed"
                >
                  {site.address}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-accent-500" />
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink-400 hover:text-white transition-colors"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-accent-500" />
                <a
                  href={`tel:${site.phoneHref}`}
                  className="text-ink-400 hover:text-white transition-colors"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="shrink-0 text-accent-500" />
                <span className="text-ink-400">{site.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-ink-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} {site.fullName}. Todos os direitos reservados.
          </p>
          <p className="text-xs text-ink-500">
            Projeto fictício para demonstração.
          </p>
        </div>
      </div>
    </footer>
  );
}
