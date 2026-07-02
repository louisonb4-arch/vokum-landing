/* ============================================================
   VOKUM — analytics
   Vercel Analytics (léger, sans cookie) + helper trackEvent
   + tracking CTA / cartes / scroll depth.
   RÈGLE : jamais de données personnelles dans les events
   (pas de nom, email, entreprise ni message).
   ============================================================ */

(() => {
  /* ---------- Vercel Analytics (file d'attente avant chargement) ---------- */
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  const s = document.createElement('script');
  s.defer = true;
  s.src = '/_vercel/insights/script.js';
  document.head.appendChild(s);

  /* ---------- helper unique ---------- */
  function trackEvent(name, properties) {
    try {
      window.va('event', { name, data: properties || {} });
    } catch (_) { /* jamais bloquant */ }
  }
  window.vokumTrack = trackEvent; // API globale pour les autres scripts

  const page = () => location.pathname;

  /* ---------- clics CTA & cartes (délégation) ---------- */
  document.addEventListener('click', (e) => {
    // cartes réalisations (landing) / articles / guides — trackées même sans lien
    const work = e.target.closest('.work');
    if (work) {
      trackEvent('project_card_click', { page: page(), project: work.querySelector('.work__name')?.textContent || '', dest: work.getAttribute('href') || '' });
      return;
    }
    const post = e.target.closest('.post');
    if (post) {
      const name = post.querySelector('.post__title')?.textContent || '';
      trackEvent(page().startsWith('/guides') ? 'guide_card_click' : 'blog_card_click', { page: page(), item: name });
      return;
    }

    const a = e.target.closest('a, button');
    if (!a) return;

    const label = (a.textContent || '').trim().slice(0, 60);
    const dest = a.getAttribute('href') || '';
    const base = { page: page(), label, dest };
    if (e.target.closest('.case__visit')) {
      const caseEl = e.target.closest('.case');
      trackEvent('case_study_cta_click', { ...base, project: caseEl?.id || '' });
      return;
    }

    // CTA principaux — classés par zone
    const isCta = a.matches('.btn, .link-underline');
    if (!isCta) return;
    let name = 'project_cta_click';
    if (e.target.closest('.header, .mobile-menu')) name = 'navbar_cta_click';
    else if (e.target.closest('.hero, .page-hero')) name = 'hero_cta_click';
    else if (e.target.closest('.cta, .cta-band')) name = 'final_cta_click';
    else if (dest === '/contact' || page() === '/contact') name = 'contact_cta_click';
    trackEvent(name, base);
  }, { capture: true, passive: true });

  /* ---------- scroll depth : 25/50/75/100, une fois par page ---------- */
  const sent = new Set();
  const thresholds = [25, 50, 75, 100];
  function checkDepth() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    const pct = Math.min(100, Math.round((window.scrollY / max) * 100));
    for (const t of thresholds) {
      if (pct >= t && !sent.has(t)) {
        sent.add(t);
        trackEvent(`scroll_depth_${t}`, { page: page() });
      }
    }
    if (sent.size === thresholds.length) window.removeEventListener('scroll', checkDepth);
  }
  window.addEventListener('scroll', checkDepth, { passive: true });

  /* ---------- vue d'étude de cas (page réalisations) ---------- */
  if (page().startsWith('/realisations') && 'IntersectionObserver' in window) {
    const seen = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && !seen.has(en.target.id)) {
          seen.add(en.target.id);
          trackEvent('case_study_view', { page: page(), project: en.target.id });
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.case[id]').forEach((c) => io.observe(c));
  }
})();
