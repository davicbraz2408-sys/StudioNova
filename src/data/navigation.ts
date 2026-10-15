import type { Page } from '@/hooks/useRouter';

export interface NavItem {
  label: string;
  page: Page;
  hash: string;
}

export const navItems: NavItem[] = [
  { label: 'Início', page: 'home', hash: '/' },
  { label: 'Sobre', page: 'about', hash: '/sobre' },
  { label: 'Serviços', page: 'services', hash: '/servicos' },
  { label: 'Portfólio', page: 'portfolio', hash: '/portfolio' },
  { label: 'Contato', page: 'contact', hash: '/contato' },
];
