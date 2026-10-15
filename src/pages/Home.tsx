import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from '@/components/ProjectCard';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { pexelsUrl } from '@/lib/images';
import type { Page } from '@/hooks/useRouter';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onNavigateToProject: (projectId: string) => void;
}

export default function Home({ onNavigate, onNavigateToProject }: HomeProps) {
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={pexelsUrl('8089172', 1600)}
            alt="Fachada de casa contemporânea com jardim vertical do Studio Nova Arquitetura"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/20" />
        </div>

        <div className="relative container-page pb-20 md:pb-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <span className="w-10 h-px bg-accent-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-300">
                Studio Nova Arquitetura
              </span>
            </div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] text-balance animate-fade-up"
              style={{ animationDelay: '0.2s', opacity: 0 }}
            >
              Espaços que<br />inspiram vidas
            </h1>
            <p
              className="mt-6 text-lg md:text-xl text-ink-200 leading-[1.7] max-w-xl animate-fade-up"
              style={{ animationDelay: '0.3s', opacity: 0 }}
            >
              Arquitetura e design de interiores que unem estética, funcionalidade
              e atitude contemporânea.
            </p>
            <div
              className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up"
              style={{ animationDelay: '0.4s', opacity: 0 }}
            >
              <button
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-ink-900 rounded-full font-medium text-sm hover:bg-accent-600 hover:text-white transition-all duration-300 group"
              >
                Ver Projetos
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/25 text-white rounded-full font-medium text-sm hover:bg-white/10 transition-all duration-300"
              >
                Fale Conosco
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 md:right-12 hidden md:flex items-center gap-3 text-ink-300 text-[11px] uppercase tracking-[0.2em]">
          <span className="w-px h-12 bg-ink-400/50" />
          Scroll
        </div>
      </section>

      {/* Intro / Philosophy */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeading
                eyebrow="Nossa Filosofia"
                title="Arquitetura como experiência"
                subtitle="Acreditamos que cada projeto começa com escuta. Entender quem habita o espaço, como vive e o que sente é o ponto de partida para criar algo verdadeiramente significativo."
              />
              <button
                onClick={() => onNavigate('about')}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-600 hover:text-accent-700 group"
              >
                Conheça o estúdio
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-ink-100">
                  <img
                    src={pexelsUrl('9458996', 600)}
                    alt="Detalhe de fachada com textura de concreto e madeira"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl bg-ink-100">
                  <img
                    src={pexelsUrl('923307', 500)}
                    alt="Mesa de trabalho com plantas e maquetes do estúdio"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square overflow-hidden rounded-2xl bg-ink-100">
                  <img
                    src={pexelsUrl('29012619', 500)}
                    alt="Sala de estar minimalista com paleta neutra e luz natural"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-ink-100">
                  <img
                    src={pexelsUrl('31068011', 600)}
                    alt="Fachada moderna com volumes geométricos e vidro"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink-950 py-20 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { value: '10+', label: 'Anos de experiência' },
              { value: '80+', label: 'Projetos entregues' },
              { value: '15', label: 'Prêmios e menções' },
              { value: '100%', label: 'Clientes satisfeitos' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`text-center ${i !== 3 ? 'md:border-r md:border-ink-800' : ''}`}
              >
                <p className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-display tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-ink-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 md:py-32 bg-ink-50">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="O que fazemos"
            title="Serviços que abrangem todo o ciclo"
            subtitle="Do primeiro conceito à entrega final, oferecemos soluções completas em arquitetura e interiores."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => onNavigate('services')}
                  className="group text-left p-8 bg-white rounded-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 border border-ink-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-5 group-hover:bg-accent-600 transition-colors duration-300">
                    <Icon size={22} className="text-accent-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-ink-500 leading-[1.6]">{service.short}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
            <SectionHeading
              eyebrow="Portfólio"
              title="Projetos em destaque"
              subtitle="Uma seleção de trabalhos que representam nossa identidade e abordagem."
            />
            <button
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-2 text-sm font-medium text-accent-600 hover:text-accent-700 group shrink-0"
            >
              Ver todos
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => onNavigateToProject(project.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-ink-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src={pexelsUrl('2058172', 1600)}
            alt="Textura arquitetônica abstrata como fundo do call-to-action"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container-page text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white text-balance mb-6 leading-tight">
            Vamos transformar<br />seu espaço?
          </h2>
          <p className="text-ink-400 text-lg mb-10 leading-relaxed">
            Conte sua ideia. Nós cuidamos do resto.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ink-900 rounded-full font-medium text-sm hover:bg-accent-600 hover:text-white transition-all duration-300 group"
          >
            Iniciar projeto
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
