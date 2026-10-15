import { Award, Heart, Lightbulb, Ruler } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { pexelsUrl } from '@/lib/images';
import type { Page } from '@/hooks/useRouter';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

const values = [
  {
    icon: Heart,
    title: 'Escuta',
    description: 'Cada projeto nasce do diálogo. Entendemos necessidades antes de propor soluções.',
  },
  {
    icon: Lightbulb,
    title: 'Inovação',
    description: 'Buscamos soluções criativas que desafiam o óbvio sem perder a funcionalidade.',
  },
  {
    icon: Ruler,
    title: 'Precisão',
    description: 'Detalhes técnicos impecáveis, do anteprojeto ao acompanhamento de obra.',
  },
  {
    icon: Award,
    title: 'Excelência',
    description: 'Comprometimento com qualidade em cada etapa, sem atalhos.',
  },
];

const team = [
  { name: 'Ana Beatriz Costa', role: 'Arquiteta Diretora', image: '8135496' },
  { name: 'Rafael Mendes', role: 'Arquiteto Sênior', image: '5483188' },
  { name: 'Carla Nogueira', role: 'Designer de Interiores', image: '6296919' },
  { name: 'Tiago Ribeiro', role: 'Arquiteto Pleno', image: '923306' },
];

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-ink-50">
        <div className="container-page">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-600">
                Sobre o estúdio
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-ink-900 leading-[1.1] text-balance">
              Um estúdio dedicado a criar espaços com significado
            </h1>
            <p className="mt-6 text-lg text-ink-500 leading-[1.7]">
              Fundado em 2015, o Studio Nova nasceu da paixão por arquitetura que
              transforma. Acreditamos que cada espaço carrega uma história — e
              nossa missão é traduzir essa história em ambientes que inspiram.
            </p>
          </div>
        </div>
      </section>

      {/* Image + Story */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-ink-100">
                <img
                  src={pexelsUrl('7750129', 800)}
                  alt="Interior do escritório do Studio Nova com ambiente colaborativo"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-accent-600 rounded-2xl hidden md:flex items-center justify-center text-white text-center p-6 shadow-xl">
                <div>
                  <p className="text-3xl font-extrabold font-display tracking-tight">10+</p>
                  <p className="text-xs mt-1 text-accent-100">anos criando</p>
                </div>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Nossa História"
                title="Da ideia ao espaço habitado"
              />
              <div className="mt-6 space-y-4 text-ink-600 leading-[1.7]">
                <p>
                  Começamos como uma pequena equipe com um grande objetivo:
                  repensar a forma como as pessoas vivem e trabalham em seus
                  espaços. Em uma década, expandimos nossas fronteiras e
                  atendemos projetos em todo o Brasil.
                </p>
                <p>
                  Hoje, somos um estúdio multidisciplinar que une arquitetura,
                  design de interiores e consultoria, sempre com a mesma
                  essência: cada projeto é único, cada cliente é único.
                </p>
                <p>
                  Nossa abordagem combina método rigoroso e sensibilidade
                  estética. Não seguimos modismos — criamos espaços atemporais
                  que envelhecem com elegância.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-ink-50">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Nossos Valores"
            title="Princípios que guiam cada projeto"
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  className="p-8 bg-white rounded-2xl border border-ink-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-accent-600" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-ink-500 leading-[1.6]">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Equipe"
            title="Pessoas por trás dos projetos"
            subtitle="Um time multidisciplinar que une técnica, criatividade e paixão."
          />
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="group">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-ink-100 mb-4">
                  <img
                    src={pexelsUrl(member.image, 500)}
                    alt={`${member.name}, ${member.role} do Studio Nova Arquitetura`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="text-base font-bold text-ink-900">{member.name}</h3>
                <p className="text-sm text-accent-600 mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-ink-950">
        <div className="container-page text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance mb-6 leading-tight">
            Quer trabalhar conosco?
          </h2>
          <p className="text-ink-400 mb-10 leading-relaxed">
            Estamos sempre abertos a novos desafios e parcerias.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ink-900 rounded-full font-medium text-sm hover:bg-accent-600 hover:text-white transition-all duration-300"
          >
            Entrar em contato
          </button>
        </div>
      </section>
    </div>
  );
}
