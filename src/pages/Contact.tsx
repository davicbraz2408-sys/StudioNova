import { useState, useCallback, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import { site } from '@/data/site';
import { pexelsUrl } from '@/lib/images';

function buildWhatsAppUrl(name: string, email: string, message: string): string {
  const text = [
    '📩 NOVO CONTATO PELO SITE',
    '',
    `Nome: ${name}`,
    `E-mail: ${email}`,
    '',
    'Mensagem:',
    message,
    '',
    'Origem: Formulário do site',
    `Data: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`,
  ].join('\n');
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

const contactInfo = [
  { icon: MapPin, label: 'Endereço', value: site.address, href: site.mapsUrl, external: true },
  { icon: Mail, label: 'E-mail', value: site.email, href: `mailto:${site.email}`, external: false },
  { icon: Phone, label: 'Telefone', value: site.phone, href: `tel:${site.phoneHref}`, external: false },
  { icon: Clock, label: 'Horário', value: site.hours, href: null, external: false },
];

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'success-with-whatsapp' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = 'O nome é obrigatório.';
  } else if (form.name.trim().length < 2) {
    errors.name = 'O nome deve ter no mínimo 2 caracteres.';
  }

  if (!form.email.trim()) {
    errors.email = 'O e-mail é obrigatório.';
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Informe um endereço de e-mail válido.';
  }

  if (!form.message.trim()) {
    errors.message = 'A mensagem é obrigatória.';
  } else if (form.message.trim().length < 10) {
    errors.message = 'A mensagem deve ter no mínimo 10 caracteres.';
  }

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    email: false,
    message: false,
  });
  const [status, setStatus] = useState<Status>('idle');
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const popupRef = useRef<Window | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as keyof FormState;
    const updated = { ...form, [key]: value };
    setForm(updated);

    if (touched[key]) {
      setErrors(validate(updated));
    }

    if (status === 'success' || status === 'error') {
      setStatus('idle');
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = e.target.name as keyof FormState;
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const validationErrors = validate(form);
      setErrors(validationErrors);
      setTouched({ name: true, email: true, message: true });

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      setStatus('submitting');

      try {
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-notification`;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            nome: form.name.trim(),
            email: form.email.trim(),
            mensagem: form.message.trim(),
          }),
        });

        if (!response.ok) {
          setStatus('error');
          return;
        }

        const result = await response.json();
        if (!result.success) {
          setStatus('error');
          return;
        }

        const waUrl = buildWhatsAppUrl(form.name.trim(), form.email.trim(), form.message.trim());
        setWhatsappUrl(waUrl);

        try {
          popupRef.current = window.open(waUrl, '_blank', 'noopener,noreferrer');
        } catch {
          popupRef.current = null;
        }

        setStatus('success-with-whatsapp');
        setForm({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
      } catch {
        setStatus('error');
      }
    },
    [form]
  );

  const whatsappBlocked = status === 'success-with-whatsapp' && !popupRef.current && whatsappUrl;

  const isDisabled = status === 'submitting';

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-ink-50">
        <div className="container-page">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-600">
                Contato
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-ink-900 leading-[1.1] text-balance">
              Vamos conversar sobre seu projeto
            </h1>
            <p className="mt-6 text-lg text-ink-500 leading-[1.7]">
              Preencha o formulário ou use nossos canais diretos. Respondemos em
              até 24 horas úteis.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-ink-900 mb-2">
                Envie sua mensagem
              </h2>
              <p className="text-sm text-ink-500 mb-8">
                Todos os campos marcados com * são obrigatórios.
              </p>

              {(status === 'success' || status === 'success-with-whatsapp') && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-fade-up">
                  <CheckCircle2 size={20} className="text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Mensagem enviada com sucesso!
                    </p>
                    <p className="text-sm text-green-700 mt-0.5">
                      Agradecemos o contato. Entraremos em resposta em breve.
                    </p>
                    {whatsappBlocked && (
                      <a
                        href={whatsappUrl ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        <MessageCircle size={16} />
                        Abrir WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-fade-up">
                  <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      Não foi possível enviar a mensagem.
                    </p>
                    <p className="text-sm text-red-700 mt-0.5">
                      Ocorreu um erro inesperado. Tente novamente em instantes.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink-700 mb-2">
                    Nome <span className="text-accent-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isDisabled}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-4 py-3 bg-ink-50 border rounded-xl text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.name
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/30'
                        : 'border-ink-200 focus:border-accent-500 focus:bg-white focus:ring-accent-100'
                    }`}
                    placeholder="Seu nome"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-xs text-red-600 flex items-center gap-1.5">
                      <AlertCircle size={13} className="shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-2">
                    E-mail <span className="text-accent-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isDisabled}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full px-4 py-3 bg-ink-50 border rounded-xl text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.email
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/30'
                        : 'border-ink-200 focus:border-accent-500 focus:bg-white focus:ring-accent-100'
                    }`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-xs text-red-600 flex items-center gap-1.5">
                      <AlertCircle size={13} className="shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink-700 mb-2">
                    Mensagem <span className="text-accent-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isDisabled}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full px-4 py-3 bg-ink-50 border rounded-xl text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 transition-all resize-none disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.message
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/30'
                        : 'border-ink-200 focus:border-accent-500 focus:bg-white focus:ring-accent-100'
                    }`}
                    placeholder="Conte-nos sobre seu projeto..."
                  />
                  <div className="mt-2 flex items-center justify-between">
                    {errors.message ? (
                      <p id="message-error" className="text-xs text-red-600 flex items-center gap-1.5">
                        <AlertCircle size={13} className="shrink-0" />
                        {errors.message}
                      </p>
                    ) : (
                      <span className="text-xs text-ink-400">
                        Mínimo de 10 caracteres
                      </span>
                    )}
                    <span className={`text-xs ${form.message.trim().length >= 10 ? 'text-green-600' : 'text-ink-400'}`}>
                      {form.message.trim().length}/10
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isDisabled}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-ink-900 text-white rounded-full font-medium text-sm hover:bg-accent-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-ink-900"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensagem
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info + Image */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {contactInfo.map((info, i) => {
                  const Icon = info.icon;
                  const content = info.href ? (
                    <a
                      href={info.href}
                      target={info.external ? '_blank' : undefined}
                      rel={info.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-ink-700 hover:text-accent-600 transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm text-ink-700 leading-relaxed">{info.value}</p>
                  );
                  return (
                    <div
                      key={i}
                      className="p-6 bg-ink-50 rounded-2xl border border-ink-100"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mb-4 shadow-sm">
                        <Icon size={18} className="text-accent-600" />
                      </div>
                      <p className="text-[11px] uppercase tracking-wide text-ink-400 mb-1.5">
                        {info.label}
                      </p>
                      {content}
                    </div>
                  );
                })}
              </div>

              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100">
                <img
                  src={pexelsUrl('15664454', 800)}
                  alt="Edifício de escritórios moderno onde o Studio Nova atende"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
