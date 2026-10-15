import { useState, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { projects, projectCategories } from '@/data/projects';
import type { Page } from '@/hooks/useRouter';

interface PortfolioProps {
  onNavigate: (page: Page) => void;
  onNavigateToProject: (projectId: string) => void;
}

export default function Portfolio({ onNavigate, onNavigateToProject }: PortfolioProps) {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>('Todos');

  const filtered = useMemo(() => {
    if (filter === 'Todos') return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-ink-50">
        <div className="container-page">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-600">
                Portfólio
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-ink-900 leading-[1.1] text-balance">
              Projetos que contam histórias
            </h1>
            <p className="mt-6 text-lg text-ink-500 leading-[1.7]">
              Uma seleção de trabalhos que representam nossa identidade —
              arquitetura moderna, atemporal e profundamente humana.
            </p>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="flex flex-wrap gap-2 mb-10">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? 'bg-ink-900 text-white'
                    : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => onNavigateToProject(project.id)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-ink-400">
              Nenhum projeto nesta categoria.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-ink-950">
        <div className="container-page text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance mb-6 leading-tight">
            Gostou do que viu?
          </h2>
          <p className="text-ink-400 mb-10 leading-relaxed">
            O próximo projeto pode ser o seu. Vamos conversar.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ink-900 rounded-full font-medium text-sm hover:bg-accent-600 hover:text-white transition-all duration-300"
          >
            Iniciar conversa
          </button>
        </div>
      </section>
    </div>
  );
}
