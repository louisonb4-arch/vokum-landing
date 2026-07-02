/* ============================================================
   VOKUM — landing (index)
   Rend les sections répétées. Chrome + interactions = site.js.
   ============================================================ */

const arrow = '<svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';

const icons = {
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>',
  pencil: '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  code: '<svg viewBox="0 0 24 24"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>',
  'bar-chart': '<svg viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>'
};

const data = {
  services: [
    { slug: 'strategie', icon: 'target', iconBg: '#e3ead8', title: 'STRATÉGIE', desc: "On analyse votre offre, votre marché et vos concurrents pour poser les bases d'une landing page qui parle à votre audience." },
    { slug: 'design', icon: 'pencil', iconBg: '#f3ecc9', title: 'DESIGN', desc: 'Un design moderne, épuré et pensé pour capter dès les premières secondes.' },
    { slug: 'developpement', icon: 'code', iconBg: '#d9e6ea', title: 'DÉVELOPPEMENT', desc: 'Développement rapide, propre et optimisé pour la vitesse et la performance.' },
    { slug: 'optimisation', icon: 'bar-chart', iconBg: '#e4dcef', title: 'OPTIMISATION', desc: 'On teste, on mesure et on optimise en continu pour maximiser vos conversions.' }
  ],
  steps: [
    { n: '01', active: true, title: 'DÉCOUVERTE', desc: 'On échange sur votre projet, vos objectifs et votre audience.' },
    { n: '02', active: false, title: 'STRATÉGIE', desc: 'On structure le message et la page pour convertir.' },
    { n: '03', active: false, title: 'DESIGN & DEV', desc: 'On conçoit et développe votre landing page.' },
    { n: '04', active: false, title: 'LANCEMENT', desc: 'On optimise, on teste et on lance votre page.' }
  ],
  works: [
    { slug: 'nubik', category: 'SAAS', name: 'Nubik', metric: '+220% de conversions', positive: true, image: 'assets/p3-640.webp', objectPosition: 'center top' },
    { slug: 'finora', category: 'FINTECH', name: 'Finora', metric: '+180% de leads', positive: true, image: 'assets/p4-640.webp', objectPosition: 'center' },
    { slug: 'studio-vertex', category: 'AGENCE', name: 'Studio Vertex', metric: 'Refonte complète', positive: false, image: 'assets/p5-640.webp', objectPosition: 'center top' },
    { slug: 'maison-armand', category: 'E-COMMERCE', name: 'Maison Armand', metric: '+160% de ventes', positive: true, image: 'assets/p6-640.webp', objectPosition: 'center' }
  ],
  testimonials: [
    { text: 'Vokum a transformé notre landing page et nos résultats ont explosé. Une équipe réactive et ultra pro.', name: 'Thomas B.', role: 'CEO @ Finora', avatar: 'assets/p9-96.webp' },
    { text: 'Livré en 5 jours, design incroyable et surtout des conversions au rendez-vous.', name: 'Julie L.', role: 'Marketing @ Nubik', avatar: 'assets/p8-96.webp' },
    { text: 'Une approche stratégique qui fait toute la différence. Je recommande à 100%.', name: 'Marc D.', role: 'Fondateur @ Studio Vertex', avatar: 'assets/p7-96.webp' }
  ]
};

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

document.getElementById('servicesGrid').innerHTML = data.services.map((s) => `
  <a class="service reveal" href="/services#${s.slug}">
    <div class="service__icon" style="background:${s.iconBg}">${icons[s.icon] || ''}</div>
    <div class="service__title">${esc(s.title)}</div>
    <p class="service__desc">${esc(s.desc)}</p>
    <div class="service__arrow">${arrow}</div>
  </a>`).join('');

document.getElementById('timeline').innerHTML =
  '<div class="timeline__line"></div>' +
  data.steps.map((st) => `
  <a class="step reveal" href="/processus#etape-${st.n}">
    <div class="step__dot ${st.active ? 'step__dot--active' : 'step__dot--idle'}">${st.n}</div>
    <div class="step__title">${esc(st.title)}</div>
    <p class="step__desc">${esc(st.desc)}</p>
  </a>`).join('');

document.getElementById('worksGrid').innerHTML = data.works.map((w) => `
  <a class="work reveal" href="/realisations#${w.slug}">
    <div class="work__thumb">
      <img src="${w.image}" alt="Réalisation ${esc(w.name)}" style="object-position:${w.objectPosition}" width="640" height="640" loading="lazy" decoding="async">
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

document.getElementById('quotesGrid').innerHTML = data.testimonials.map((q) => `
  <figure class="quote reveal">
    <div class="quote__mark">&ldquo;</div>
    <blockquote class="quote__text">${esc(q.text)}</blockquote>
    <figcaption class="quote__foot">
      <img class="quote__av" src="${q.avatar}" alt="${esc(q.name)}" width="96" height="96" loading="lazy" decoding="async">
      <div>
        <div class="quote__name">${esc(q.name)}</div>
        <div class="quote__role">${esc(q.role)}</div>
      </div>
    </figcaption>
  </figure>`).join('');
