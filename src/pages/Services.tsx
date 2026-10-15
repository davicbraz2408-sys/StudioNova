import { Check, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { services } from '@/data/services';
import { pexelsUrl } from '@/lib/images';
import type { Page } from '@/hooks/useRouter';

interface ServicesProps {
  onNavigate: (page: Page) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-ink-50">
        <div className="container-page">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-600">
                Serviços
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-ink-900 leading-[1.1] text-balance">
              Soluções completas em arquitetura
            </h1>
            <p className="mt-6 text-lg text-ink-500 leading-[1.7]">
              Do conceito à execução, oferecemos um portfólio de serviços que
              atende todas as etapas do seu projeto — residencial, comercial ou
              de interiores.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 md:py-28">
        <div className="container-page">
          <div className="space-y-20 md:space-y-32">
            {services.map((service, idx) => {
              const Icon = service.icon;
              const reversed = idx % 2 === 1;
              return (
                <div
                  key={service.id}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                >
                  <div className={reversed ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-accent-600 flex items-center justify-center">
                        <Icon size={26} className="text-white" />
                      </div>
                      <span className="text-5xl font-extrabold text-ink-200 font-display tracking-tight">
                        0{idx + 1}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-ink-900 mb-4 leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-ink-600 leading-[1.7] mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full bg-accent-50 flex items-center justify-center shrink-0">
                            <Check size={13} className="text-accent-600" />
                          </span>
                          <span className="text-sm text-ink-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={reversed ? 'lg:order-1' : ''}>
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100">
                      <img
                        src={pexelsUrl(service.image, 800)}
                        alt={`Projeto de ${service.title.toLowerCase()} do Studio Nova`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-ink-50">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Como trabalhamos"
            title="Um processo claro, do início ao fim"
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Briefing', desc: 'Entendemos suas necessidades, desejos e expectativas.' },
              { num: '02', title: 'Conceito', desc: 'Desenvolvemos a direção criativa e técnica do projeto.' },
              { num: '03', title: 'Projeto', desc: 'Detalhamos cada elemento, do layout aos acabamentos.' },
              { num: '04', title: 'Execução', desc: 'Acompanhamos a obra até a entrega final do espaço.' },
            ].map((step, i) => (
              <div key={i} className="relative p-8 bg-white rounded-2xl border border-ink-100">
                <p className="text-4xl font-extrabold text-accent-100 font-display tracking-tight mb-4">
                  {step.num}
                </p>
                <h3 className="text-lg font-bold text-ink-900 mb-2">{step.title}</h3>
                <p className="text-sm text-ink-500 leading-[1.6]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-ink-950">
        <div className="container-page text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance mb-6 leading-tight">
            Pronto para começar?
          </h2>
          <p className="text-ink-400 mb-10 leading-relaxed">
            Solicite um orçamento ou agende uma conversa inicial sem compromisso.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ink-900 rounded-full font-medium text-sm hover:bg-accent-600 hover:text-white transition-all duration-300 group"
          >
            Solicitar orçamento
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
