/* ============================================================
   VOKUM — accueil (index)
   Rend les sections répétées. Chrome + interactions = site.js.
   ============================================================ */

const arrow = '<svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';

const icons = {
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>',
  pencil: '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  code: '<svg viewBox="0 0 24 24"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>',
  'bar-chart': '<svg viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M11 8a3 3 0 0 0-3 3"/></svg>'
};

const data = {
  services: [
    {
      slug: 'strategie', n: '01', icon: 'target', iconBg: '#e3ead8', title: 'CRÉATION DE SITE WEB',
      line: 'Votre site sur-mesure, de la stratégie au lancement. Pensée pour convertir, livrée en moins d’une semaine.',
      items: ['Stratégie & message de conversion', 'Design premium sur-mesure', 'Développement ultra-rapide', 'Base SEO technique incluse', 'Tests A/B & optimisation continue']
    },
    {
      slug: 'seo-geo', n: '02', icon: 'search', iconBg: '#f3dcd4', title: 'SEO & GEO AVANCÉ',
      line: 'En option, pour les marques qui veulent aller plus loin : une vraie stratégie de visibilité sur Google et dans les réponses des IA comme ChatGPT ou Perplexity.',
      items: ['Recherche de mots-clés & structure de contenu', 'Données structurées Schema.org', 'Contenu citable par les IA', 'Suivi mensuel positions & mentions']
    }
  ],
  steps: [
    { n: '01', active: true, title: 'DÉCOUVERTE', desc: 'On échange sur votre projet, vos objectifs et votre audience.' },
    { n: '02', active: false, title: 'STRATÉGIE', desc: 'On structure le message et la page pour convertir.' },
    { n: '03', active: false, title: 'DESIGN & DEV', desc: 'On conçoit et développe votre site web.' },
    { n: '04', active: false, title: 'LANCEMENT', desc: 'On optimise, on teste et on lance votre site.' }
  ],
  works: [
    { slug: 'roll-in-love', category: 'COFFEE SHOP', name: 'Roll in Love', metric: 'Une DA existante, portée sur le web', positive: false, image: 'assets/work-rollinlove-720.webp', objectPosition: 'center top' },
    { slug: 'malize', category: 'PÊCHE ARTISANALE', name: "M'Alizé", metric: 'De Facebook à un vrai site', positive: false, image: 'assets/work-malize-720.webp', objectPosition: 'center top' },
    { slug: 'petits-lapins-du-poiron', category: 'ÉLEVAGE BIO', name: 'Les Petits Lapins du Poiron', metric: 'DA complète + vente en ligne', positive: false, image: 'assets/work-lapins-720.webp', objectPosition: 'center top' }
  ]
};

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

document.getElementById('servicesGrid').innerHTML = data.services.map((s) => `
  <a class="scard scard--offer reveal" href="/services#${s.slug}">
    <div class="scard__top">
      <div class="scard__icon" style="background:${s.iconBg}">${icons[s.icon] || ''}</div>
      <span class="scard__num">${s.n}</span>
    </div>
    <span class="scard__rule"></span>
    <h3 class="scard__title">${esc(s.title)}</h3>
    <p class="scard__desc">${esc(s.line)}</p>
    <ul class="scard__list">${s.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
    <div class="scard__foot">
      <span class="scard__more">EN SAVOIR PLUS</span>
      ${arrow}
    </div>
  </a>`).join('');

document.getElementById('timeline').innerHTML =
  '<div class="timeline__line"></div><div class="timeline__progress" id="timelineProgress"></div>' +
  data.steps.map((st) => `
  <a class="step reveal" href="/processus#etape-${st.n}">
    <div class="step__dot step__dot--idle">${st.n}</div>
    <div class="step__title">${esc(st.title)}</div>
    <p class="step__desc">${esc(st.desc)}</p>
  </a>`).join('');

document.getElementById('worksGrid').innerHTML = data.works.map((w) => `
  <a class="work reveal" href="/realisations#${w.slug}">
    <div class="work__thumb">
      <img src="${w.image}" alt="Réalisation ${esc(w.name)}" style="object-position:${w.objectPosition}" width="720" height="450" loading="lazy" decoding="async">
    </div>
    <div class="work__row">
      <div>
        <div class="work__cat">${esc(w.category)}</div>
        <div class="work__name">${esc(w.name)}</div>
      </div>
      <span class="work__arrow">${arrow}</span>
    </div>
    <div class="work__metric">${w.positive ? arrow : ''}${esc(w.metric)}</div>
  </a>`).join('');

/* ---------- Timeline processus : progression au scroll ---------- */
(() => {
  const timeline = document.getElementById('timeline');
  const progress = document.getElementById('timelineProgress');
  if (!timeline || !progress) return;
  const dots = [...timeline.querySelectorAll('.step__dot')];
  const gaps = Math.max(1, dots.length - 1);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v) => Math.max(0, Math.min(1, v));

  function update() {
    const r = timeline.getBoundingClientRect();
    const start = window.innerHeight * 0.82; // top ici → p=0
    const end = window.innerHeight * 0.42;   // top ici → p=1
    const p = reduced ? 1 : clamp((start - r.top) / (start - end));
    progress.style.width = (p * 100) + '%';
    dots.forEach((dot, i) => {
      const on = p >= (i / gaps) - 0.02;
      dot.classList.toggle('step__dot--active', on);
      dot.classList.toggle('step__dot--idle', !on);
    });
  }

  let ticking = false;
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false; }); } };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();

