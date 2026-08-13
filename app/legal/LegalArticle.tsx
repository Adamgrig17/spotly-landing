import type { LegalDoc } from './terms-content';

export function LegalArticle({ doc, lang }: { doc: LegalDoc; lang: 'el' | 'en' }) {
  return (
    <article className={lang === 'el' ? 'legal-el' : 'legal-en'} lang={lang}>
      <p className="legal-lang-label">{doc.langLabel}</p>
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest mb-6">
          {doc.badge}
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
          {doc.title1} <span className="text-[#00E676]">{doc.title2}</span>
        </h1>
        <p className="text-gray-500">{doc.updated}</p>
      </div>

      <div className="space-y-12 text-gray-300 leading-relaxed">
        {doc.intro ? (
          <section>
            <p className="text-lg font-medium text-white mb-6">{doc.intro}</p>
          </section>
        ) : null}

        {doc.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
            {section.intro ? <p className="mb-2">{section.intro}</p> : null}
            {section.paragraphs?.map((p) => (
              <p key={p.slice(0, 48)} className="mb-4 last:mb-0">
                {p}
              </p>
            ))}
            {section.bullets ? (
              <ul className="list-disc pl-6 space-y-2 marker:text-[#00E676]">
                {section.bullets.map((b) => (
                  <li key={(b.label ?? '') + b.text.slice(0, 32)}>
                    {b.label ? (
                      <>
                        <strong>{b.label}:</strong> {b.text}
                      </>
                    ) : (
                      b.text
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">{doc.contactTitle}</h2>
          <p>
            {doc.contactText}{' '}
            <a href="mailto:info@parkspotly.gr" className="text-[#00E676] hover:underline">
              info@parkspotly.gr
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
