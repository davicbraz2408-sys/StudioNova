import { Home, Building2, Sofa, Compass } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  short: string;
  description: string;
  features: string[];
  image: string;
}

export const services: Service[] = [
  {
    id: 'residenciais',
    icon: Home,
    title: 'Projetos Residenciais',
    short: 'Casas e apartamentos sob medida',
    description:
      'Projetamos residências que combinam conforto, funcionalidade e estética. Cada projeto é único, pensado para o seu estilo de vida.',
    features: [
      'Anteprojeto e projeto executivo',
      'Compatibilização de engenharia',
      'Acompanhamento de obra',
      'Projeto de iluminação',
    ],
    image: '8089155',
  },
  {
    id: 'comerciais',
    icon: Building2,
    title: 'Projetos Comerciais',
    short: 'Espaços corporativos e de varejo',
    description:
      'Criamos ambientes comerciais que valorizam a marca e otimizam a operação. Do escritório à loja, pensamos em cada detalhe.',
    features: [
      'Estudo de layout e fluxo',
      'Branding ambiental',
      'Projeto técnico completo',
      'Gestão de fornecedores',
    ],
    image: '5444186',
  },
  {
    id: 'interiores',
    icon: Sofa,
    title: 'Design de Interiores',
    short: 'Ambientes que contam histórias',
    description:
      'Curadoria de móveis, cores e texturas. Transformamos espaços em experiências, do conceito ao último detalhe.',
    features: [
      'Conceito e mood board',
      'Especificação de mobiliário',
      'Palheta de cores e materiais',
      'Montagem e finalização',
    ],
    image: '6920451',
  },
  {
    id: 'consultoria',
    icon: Compass,
    title: 'Consultoria',
    short: 'Orientação especializada',
    description:
      'Para quem precisa de direção. Avaliamos espaços, sugerimos soluções e guiamos decisões com olhar técnico.',
    features: [
      'Diagnóstico de espaço',
      'Recomendações de layout',
      'Orientação de materiais',
      'Parecer técnico',
    ],
    image: '923307',
  },
];
