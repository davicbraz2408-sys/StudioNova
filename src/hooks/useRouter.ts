import { useState, useEffect, useCallback } from 'react';

export type Page = 'home' | 'about' | 'services' | 'portfolio' | 'contact' | 'project';

const routes: Record<string, Page> = {
  '/': 'home',
  '/sobre': 'about',
  '/servicos': 'services',
  '/portfolio': 'portfolio',
  '/contato': 'contact',
};

const reverseRoutes: Record<Page, string> = {
  home: '/',
  about: '/sobre',
  services: '/servicos',
  portfolio: '/portfolio',
  contact: '/contato',
  project: '/portfolio',
};

function parsePath(): { page: Page; projectId: string | null } {
  const path = window.location.pathname;

  if (path.startsWith('/portfolio/')) {
    const projectId = path.replace('/portfolio/', '');
    return { page: 'project', projectId: projectId || null };
  }

  return { page: routes[path] ?? 'home', projectId: null };
}

export function useRouter() {
  const [state, setState] = useState(parsePath);

  useEffect(() => {
    const handler = () => {
      setState(parsePath());
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const navigate = useCallback((to: Page) => {
    const path = reverseRoutes[to];
    window.history.pushState({}, '', path);
    setState(parsePath());
    window.scrollTo(0, 0);
  }, []);

  const navigateToProject = useCallback((projectId: string) => {
    const path = `/portfolio/${projectId}`;
    window.history.pushState({}, '', path);
    setState({ page: 'project', projectId });
    window.scrollTo(0, 0);
  }, []);

  return { page: state.page, projectId: state.projectId, navigate, navigateToProject };
}

export function pageMeta(page: Page): { title: string; description: string } {
  const meta: Record<Page, { title: string; description: string }> = {
    home: {
      title: 'Studio Nova Arquitetura — Arquitetura & Interiores',
      description:
        'Projetos residenciais, comerciais, design de interiores e consultoria. Arquitetura moderna, elegante e minimalista.',
    },
    about: {
      title: 'Sobre — Studio Nova Arquitetura',
      description:
        'Conheça o Studio Nova: nossa história, filosofia e equipe de arquitetos dedicados a criar espaços excepcionais.',
    },
    services: {
      title: 'Serviços — Studio Nova Arquitetura',
      description:
        'Projetos residenciais, comerciais, design de interiores e consultoria. Soluções completas em arquitetura.',
    },
    portfolio: {
      title: 'Portfólio — Studio Nova Arquitetura',
      description:
        'Explore nossos projetos de arquitetura e design de interiores. Residenciais, comerciais e muito mais.',
    },
    contact: {
      title: 'Contato — Studio Nova Arquitetura',
      description:
        'Entre em contato com o Studio Nova Arquitetura. Vamos transformar seu espaço.',
    },
    project: {
      title: 'Projeto — Studio Nova Arquitetura',
      description:
        'Conheça os detalhes deste projeto de arquitetura e design de interiores do Studio Nova.',
    },
  };
  return meta[page];
}
