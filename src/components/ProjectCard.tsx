import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { pexelsUrl } from '@/lib/images';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-ink-100 text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={pexelsUrl(project.image, 800)}
          alt={`${project.title} — ${project.location}, projeto de ${project.category.toLowerCase()}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-accent-200 bg-accent-600/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {project.category}
          </span>
          <span className="text-xs text-ink-300">{project.year}</span>
        </div>
        <h3 className="text-base md:text-lg font-bold text-white mb-0.5 leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-ink-300">{project.location}</p>
      </div>
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
        <ArrowUpRight size={18} className="text-ink-900" />
      </div>
    </button>
  );
}
