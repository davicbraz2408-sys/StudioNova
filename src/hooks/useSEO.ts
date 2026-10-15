import { useEffect } from 'react';
import type { Page } from '@/hooks/useRouter';
import { projects } from '@/data/projects';
import { site } from '@/data/site';
import { pexelsUrl } from '@/lib/images';

export interface SEOConfig {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  jsonLd?: Record<string, unknown>[];
}

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';

function getSEOConfig(page: Page, projectId: string | null): SEOConfig {
  switch (page) {
    case 'home':
      return {
        title: 'Studio Nova Arquitetura — Arquitetura & Interiores',
        description:
          'Projetos residenciais, comerciais, design de interiores e consultoria. Arquitetura moderna, elegante e minimalista em São Paulo.',
        path: '/',
        type: 'website',
        image: pexelsUrl('8089172', 1200),
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: site.fullName,
            description: site.description,
            email: site.email,
            telephone: site.phone,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Av. Paulista, 1000 — Bela Vista',
              addressLocality: 'São Paulo',
              addressRegion: 'SP',
              addressCountry: 'BR',
            },
            url: BASE_URL || undefined,
            sameAs: [site.instagramUrl],
            areaServed: 'BR',
          },
        ],
      };
    case 'about':
      return {
        title: 'Sobre o Studio Nova — Arquitetos em São Paulo',
        description:
          'Conheça a história, filosofia e equipe do Studio Nova Arquitetura. Um estúdio multidisciplinar dedicado a criar espaços com significado.',
        path: '/sobre',
        type: 'website',
        image: pexelsUrl('7750129', 1200),
      };
    case 'services':
      return {
        title: 'Serviços de Arquitetura e Interiores — Studio Nova',
        description:
          'Projetos residenciais, comerciais, design de interiores e consultoria. Soluções completas em arquitetura, do conceito à execução.',
        path: '/servicos',
        type: 'website',
        image: pexelsUrl('8089155', 1200),
      };
    case 'portfolio':
      return {
        title: 'Portfólio de Projetos — Studio Nova Arquitetura',
        description:
          'Explore nossos projetos de arquitetura e design de interiores: residenciais, comerciais, corporativos e muito mais.',
        path: '/portfolio',
        type: 'website',
        image: pexelsUrl('29012619', 1200),
      };
    case 'contact':
      return {
        title: 'Contato — Studio Nova Arquitetura',
        description:
          'Entre em contato com o Studio Nova Arquitetura. Preencha o formulário ou use nossos canais diretos. Respondemos em até 24 horas úteis.',
        path: '/contato',
        type: 'website',
        image: pexelsUrl('15664454', 1200),
      };
    case 'project': {
      const project = projectId ? projects.find((p) => p.id === projectId) : null;
      if (!project) {
        return {
          title: 'Projeto não encontrado — Studio Nova Arquitetura',
          description: 'O projeto solicitado não foi encontrado.',
          path: '/portfolio',
          type: 'website',
        };
      }
      return {
        title: `${project.title} — Studio Nova Arquitetura`,
        description: project.description,
        path: `/portfolio/${project.id}`,
        type: 'article',
        image: pexelsUrl(project.image, 1200),
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.description,
            dateCreated: project.year,
            creator: {
              '@type': 'Organization',
              name: site.fullName,
            },
            about: project.category,
            image: pexelsUrl(project.image, 1200),
            url: `${BASE_URL}/portfolio/${project.id}`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Início',
                item: BASE_URL || undefined,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Portfólio',
                item: `${BASE_URL}/portfolio`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: project.title,
                item: `${BASE_URL}/portfolio/${project.id}`,
              },
            ],
          },
        ],
      };
    }
    default:
      return {
        title: 'Studio Nova Arquitetura — Arquitetura & Interiores',
        description: site.description,
        path: '/',
        type: 'website',
      };
  }
}

function upsertMeta(selector: string, attribute: string, key: string, content: string): HTMLElement | null {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return el;
}

function upsertLink(rel: string, href: string): HTMLElement | null {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  return el;
}

function upsertJsonLd(id: string, data: Record<string, unknown>): void {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string): void {
  document.getElementById(id)?.remove();
}

export function useSEO(page: Page, projectId: string | null): SEOConfig {
  const config = getSEOConfig(page, projectId);

  useEffect(() => {
    const canonicalUrl = `${BASE_URL}${config.path}`;

    document.title = config.title;

    upsertMeta('meta[name="description"]', 'name', 'description', config.description);

    upsertLink('canonical', canonicalUrl);

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', config.title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', config.description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', config.type ?? 'website');
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', config.image ?? '');
    upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', 'pt_BR');
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', site.fullName);

    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', config.title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', config.description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', config.image ?? '');

    const jsonLdScripts = document.querySelectorAll('script[data-jsonld]');
    jsonLdScripts.forEach((s) => s.remove());

    if (config.jsonLd) {
      config.jsonLd.forEach((data, i) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-jsonld', 'dynamic');
        script.id = `jsonld-dynamic-${i}`;
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }
  }, [config.title, config.description, config.path, config.type, config.image, config.jsonLd]);

  return config;
}

export { removeJsonLd, upsertJsonLd };
