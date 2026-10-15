interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <div
          className={`flex items-center gap-3 mb-5 ${
            center ? 'justify-center' : ''
          }`}
        >
          <span className="w-8 h-px bg-accent-500" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-600">
            {eyebrow}
          </span>
          {center && <span className="w-8 h-px bg-accent-500" />}
        </div>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] text-balance ${
          light ? 'text-white' : 'text-ink-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base md:text-lg leading-[1.7] ${
            light ? 'text-ink-300' : 'text-ink-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
