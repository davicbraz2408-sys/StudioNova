import { ArrowLeft, ArrowRight, MapPin, Maximize, Calendar, User, Layers, Clock } from 'lucide-react';
import { projects } from '@/data/projects';
import { pexelsUrl } from '@/lib/images';
import type { Page } from '@/hooks/useRouter';

interface ProjectDetailProps {
  projectId: string | null;
  onNavigate: (page: Page) => void;
  onNavigateToProject: (projectId: string) => void;
}

export default function ProjectDetail({ projectId, onNavigate, onNavigateToProject }: ProjectDetailProps) {
  const project = projects.find((p) => p.id === projectId);
  const otherProjects = projects.filter((p) => p.id !== projectId).slice(0, 3);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-ink-500 mb-4">Projeto não encontrado.</p>
          <button
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink-900 text-white rounded-full text-sm font-medium hover:bg-accent-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar ao portfólio
          </button>
        </div>
      </div>
    );
  }

  const infoItems = [
    { icon: MapPin, label: 'Localização', value: project.location },
    { icon: Maximize, label: 'Área', value: project.area },
    { icon: Calendar, label: 'Ano', value: project.year },
    { icon: User, label: 'Cliente', value: project.details.client },
    { icon: Layers, label: 'Escopo', value: project.details.scope },
    { icon: Clock, label: 'Duração', value: project.details.duration },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Image */}
      <section className="pt-20">
        <div className="relative h-[50vh] min-h-[400px] md:h-[60vh] overflow-hidden">
          <img
            src={pexelsUrl(project.image, 1600)}
            alt={`${project.title} — ${project.location}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-ink-950/30" />
        </div>
      </section>

      {/* Back button + Title */}
      <section className="py-10 md:py-14">
        <div className="container-page">
          <button
            onClick={() => onNavigate('portfolio')}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-accent-600 transition-colors group mb-8"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Voltar ao portfólio
          </button>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-accent-600 bg-accent-50 px-3 py-1 rounded-full">
                {project.category}
              </span>
              <span className="text-sm text-ink-400">{project.year}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-ink-900 leading-[1.1] text-balance">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Description + Info */}
      <section className="pb-16 md:pb-24">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="text-lg text-ink-600 leading-[1.8]">
                {project.description}
              </p>
            </div>

            <div className="lg:col-span-1">
              <div className="p-6 md:p-8 bg-ink-50 rounded-2xl border border-ink-100">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-400 mb-5">
                  Informações do projeto
                </h3>
                <div className="space-y-5">
                  {infoItems.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                          <Icon size={17} className="text-accent-600" />
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-ink-400 mb-0.5">
                            {item.label}
                          </p>
                          <p className="text-sm font-medium text-ink-900">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-20 md:pb-28">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-ink-900 mb-8">Galeria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {project.gallery.map((imgId, idx) => (
              <div
                key={idx}
                className={`aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100 ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <img
                  src={pexelsUrl(imgId, idx === 0 ? 1000 : 500)}
                  alt={`${project.title} — galeria, imagem ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[800ms] ease-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-20 md:py-28 bg-ink-50">
        <div className="container-page">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-ink-900 leading-tight">
              Outros projetos
            </h2>
            <button
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-2 text-sm font-medium text-accent-600 hover:text-accent-700 group shrink-0"
            >
              Ver todos
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((other) => (
              <button
                key={other.id}
                onClick={() => onNavigateToProject(other.id)}
                className="group relative overflow-hidden rounded-2xl bg-ink-100 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={pexelsUrl(other.image, 800)}
                    alt={`${other.title} — ${other.location}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-accent-200 bg-accent-600/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {other.category}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white mt-2 mb-0.5 leading-snug">
                    {other.title}
                  </h3>
                  <p className="text-sm text-ink-300">{other.location}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
