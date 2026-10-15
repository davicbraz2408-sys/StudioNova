export interface Project {
  id: string;
  title: string;
  category: 'Residencial' | 'Comercial' | 'Corporativo' | 'Interiores';
  year: string;
  location: string;
  area: string;
  description: string;
  image: string;
  gallery: string[];
  details: {
    client: string;
    scope: string;
    duration: string;
  };
}

export const projects: Project[] = [
  {
    id: 'jardim-vertical',
    title: 'Residência Jardim Vertical',
    category: 'Residencial',
    year: '2025',
    location: 'São Paulo, SP',
    area: '320 m²',
    description:
      'Casa contemporânea que integra natureza e arquitetura, com fachada verde e espaços fluidos que conectam interior e exterior. O projeto aproveita a topografia do terreno para criar três níveis que se desdobam em terraços e jardins.',
    image: '8089172',
    gallery: ['8089172', '8089155', '6903157'],
    details: {
      client: 'Cliente particular',
      scope: 'Projeto arquitetônico e executivo',
      duration: '14 meses',
    },
  },
  {
    id: 'escritorio-zen',
    title: 'Escritório Corporativo Zen',
    category: 'Corporativo',
    year: '2024',
    location: 'São Paulo, SP',
    area: '450 m²',
    description:
      'Espaço corporativo minimalista com zonas colaborativas e privativas, priorizando bem-estar e produtividade. A circulação foi pensada como um percurso que alterna momentos de foco e de encontro.',
    image: '7750129',
    gallery: ['7750129', '5444186', '6794926'],
    details: {
      client: 'Empresa de tecnologia',
      scope: 'Projeto de interiores corporativo',
      duration: '8 meses',
    },
  },
  {
    id: 'penthouse-minimalista',
    title: 'Penthouse Minimalista',
    category: 'Interiores',
    year: '2025',
    location: 'Rio de Janeiro, RJ',
    area: '180 m²',
    description:
      'Cobertura com paleta neutra e texturas naturais. O design valoriza a luz natural e a vista panorâmica, criando um refúgio urbano onde cada elemento foi selecionado para transmitir serenidade.',
    image: '29012619',
    gallery: ['29012619', '6920451', '6480198'],
    details: {
      client: 'Cliente particular',
      scope: 'Design de interiores',
      duration: '6 meses',
    },
  },
  {
    id: 'cozinha-gourmet',
    title: 'Cozinha Gourmet Contemporânea',
    category: 'Interiores',
    year: '2024',
    location: 'Campinas, SP',
    area: '45 m²',
    description:
      'Cozinha gourmet que une funcionalidade e sofisticação, com ilha central e materiais premium. O espaço foi planejado para receber convidados enquanto prepara refeições, integrando socialização e culinária.',
    image: '8142046',
    gallery: ['8142046', '7587864', '7031879'],
    details: {
      client: 'Cliente particular',
      scope: 'Design de interiores — cozinha',
      duration: '4 meses',
    },
  },
  {
    id: 'suite-master-serena',
    title: 'Suíte Master Serena',
    category: 'Residencial',
    year: '2025',
    location: 'Belo Horizonte, MG',
    area: '60 m²',
    description:
      'Suíte íntima com climatização natural, vestuário integrado e paleta suave que convida ao descanso. O projeto explora a luz indireta como elemento de conforto, criando uma atmosfera acolhedora.',
    image: '6903157',
    gallery: ['6903157', '6782479', '6489093'],
    details: {
      client: 'Cliente particular',
      scope: 'Projeto de interiores — suíte',
      duration: '5 meses',
    },
  },
  {
    id: 'loft-industrial',
    title: 'Loft Industrial São Paulo',
    category: 'Comercial',
    year: '2023',
    location: 'São Paulo, SP',
    area: '280 m²',
    description:
      'Conversão de galpão em loft de uso misto, preservando elementos originais e inserindo conforto contemporâneo. O contraste entre o concreto aparente e os acabamentos quentes cria uma identidade marcante.',
    image: '6794926',
    gallery: ['6794926', '7750129', '5444186'],
    details: {
      client: 'Estúdio criativo',
      scope: 'Reforma e interiores',
      duration: '10 meses',
    },
  },
];

export const projectCategories = ['Todos', 'Residencial', 'Comercial', 'Corporativo', 'Interiores'] as const;
