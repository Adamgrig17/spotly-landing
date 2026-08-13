/** Runs before paint when scripts are allowed; skipped entirely if they are not. */
export function LegalLangBootScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{document.documentElement.classList.add('js-legal');var l=localStorage.getItem('spotly-lang');document.documentElement.setAttribute('data-legal-lang',l==='en'?'en':'el');}catch(e){document.documentElement.classList.add('js-legal');document.documentElement.setAttribute('data-legal-lang','el');}})();`,
      }}
    />
  );
}
