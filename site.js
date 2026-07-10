/* ============================================================
   VOKUM — chrome partagé (header + footer + interactions)
   Injecté sur toutes les pages via [data-site-header]/[data-site-footer].
   Page active = <body data-page="...">.
   ============================================================ */

const ARROW = '<svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';
const CONTACT = '/contact';

const NAV = [
  { label: 'RÉALISATIONS', href: '/realisations', key: 'realisations' },
  { label: 'SERVICES', href: '/services', key: 'services' },
  { label: 'PROCESSUS', href: '/processus', key: 'processus' },
  { label: 'À PROPOS', href: '/a-propos', key: 'apropos' },
  { label: 'TARIFS', href: '/tarifs', key: 'tarifs' }
];

const FOOT_NAV = [
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Services', href: '/services' },
  { label: 'Processus', href: '/processus' },
  { label: 'À propos', href: '/a-propos' }
];
const FOOT_RES = [
  { label: 'Pourquoi un site web', href: '/pourquoi-un-site-web' },
  { label: 'Blog', href: '/blog' },
  { label: 'Guides', href: '/guides' },
  { label: 'FAQ', href: '/faq' }
];

const page = document.body.dataset.page || '';

/* ---------- HEADER ---------- */
const headerHTML = `
<header class="header" id="top">
  <div class="container header__inner">
    <a href="/" class="brand">VOKUM<span class="brand__dot">.</span></a>
    <nav class="nav" aria-label="Navigation principale">
      ${NAV.map((n) => `<a href="${n.href}"${n.key === page ? ' class="is-active" aria-current="page"' : ''}>${n.label}</a>`).join('')}
    </nav>
    <a href="${CONTACT}" class="btn btn--dark header__cta">DÉMARRER UN PROJET ${ARROW}</a>
    <button class="burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false"><span></span><span></span></button>
  </div>
</header>
<div class="mobile-menu" id="mobileMenu" aria-hidden="true">
  <nav aria-label="Menu mobile">
    ${NAV.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}
    <a href="${CONTACT}" class="btn btn--dark">DÉMARRER UN PROJET ${ARROW}</a>
  </nav>
</div>`;

/* ---------- FOOTER ---------- */
const footerHTML = `
<footer class="footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      <div class="brand brand--footer">VOKUM<span class="brand__dot">.</span></div>
      <p>Agence spécialisée dans la création de sites web à haute conversion.</p>
    </div>
    <div class="footer__col">
      <div class="footer__title">NAVIGATION</div>
      ${FOOT_NAV.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}
    </div>
    <div class="footer__col">
      <div class="footer__title">RESSOURCES</div>
      ${FOOT_RES.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}
    </div>
    <div class="footer__col">
      <div class="footer__title">CONTACT</div>
      <a href="mailto:hello@vokum.agency">hello@vokum.agency</a>
      <span class="footer__muted">Réponse sous 24 h</span>
    </div>
  </div>
  <div class="container footer__base">
    <span>© ${new Date().getFullYear()} Vokum. Tous droits réservés.</span>
    <nav class="footer__legal" aria-label="Informations légales">
      <a href="/mentions-legales">Mentions légales</a>
      <span aria-hidden="true">·</span>
      <a href="/politique-confidentialite">Politique de confidentialité</a>
    </nav>
    <span class="footer__made">Des sites web qui convertissent ✦</span>
  </div>
</footer>`;

/* ---------- INJECT ---------- */
const headerSlot = document.querySelector('[data-site-header]');
const footerSlot = document.querySelector('[data-site-footer]');
if (headerSlot) headerSlot.outerHTML = headerHTML;
if (footerSlot) footerSlot.outerHTML = footerHTML;

/* ---------- INTERACTIONS ---------- */
const header = document.querySelector('.header');
const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const burger = document.getElementById('burger');
const menu = document.getElementById('mobileMenu');
if (burger && menu) {
  const toggle = (open) => {
    const isOpen = open ?? !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', isOpen);
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggle());
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggle(false)));
}

/* ---------- SCROLL REVEAL ----------
   Basé scroll/load (pas IntersectionObserver) : robuste même si des
   éléments .reveal sont injectés après coup, et garantit qu'aucun
   contenu ne reste invisible. */
function revealInView() {
  const trigger = window.innerHeight * 0.92;
  document.querySelectorAll('.reveal:not(.is-in), .draw:not(.is-in)').forEach((el) => {
    if (el.getBoundingClientRect().top < trigger) el.classList.add('is-in');
  });
}
revealInView();
window.addEventListener('scroll', revealInView, { passive: true });
window.addEventListener('resize', revealInView);
window.addEventListener('load', revealInView);
/* filet de sécurité : si quoi que ce soit échoue, tout devient visible */
setTimeout(() => document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => {
  if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
}), 800);

/* ---------- POLISH VISUEL ---------- */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* longueur réelle des traits manuscrits pour l'animation de dessin */
document.querySelectorAll('.draw path').forEach((p) => {
  try { p.style.setProperty('--len', Math.ceil(p.getTotalLength())); } catch (_) {}
});

/* marquee logos confiance : duplique la rangée pour un défilement continu */
(() => {
  if (reducedMotion) return;
  const logos = document.querySelector('.trust__logos');
  if (!logos || logos.children.length < 4) return;
  const viewport = document.createElement('div');
  viewport.className = 'trust__viewport';
  logos.parentNode.insertBefore(viewport, logos);
  viewport.appendChild(logos);
  logos.innerHTML += logos.innerHTML; // seconde copie pour la boucle
  logos.querySelectorAll(':scope > *').forEach((el, i) => { if (i >= logos.children.length / 2) el.setAttribute('aria-hidden', 'true'); });
})();

/* compteurs animés sur les métriques (+220%, 40+, 100%…) —
   déclenchés au scroll (même mécanique que le reveal) */
const counterTargets = [];
if (!reducedMotion) {
  const NUM_RE = /^\+?\d{1,3}%?\+?$/;
  document.querySelectorAll('.stat__val, .metric-card__val').forEach((el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (NUM_RE.test(node.textContent.trim())) { counterTargets.push({ el, node, done: false }); break; }
    }
  });
}
function animateCounter(node) {
  const full = node.textContent.trim();
  const value = parseInt(full.replace(/\D/g, ''), 10);
  if (!value) return;
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / 900);
    node.textContent = full.replace(String(value), String(Math.round(value * ease(t))));
    if (t < 1) requestAnimationFrame(tick);
    else node.textContent = full;
  };
  requestAnimationFrame(tick);
}
function countersInView() {
  if (!counterTargets.length) return;
  const trigger = window.innerHeight * 0.88;
  counterTargets.forEach((c) => {
    if (!c.done && c.el.getBoundingClientRect().top < trigger) { c.done = true; animateCounter(c.node); }
  });
}
countersInView();
window.addEventListener('scroll', countersInView, { passive: true });
window.addEventListener('load', countersInView);

/* ---------- ACCORDION (FAQ) ---------- */
document.querySelectorAll('.acc__q').forEach((q) => {
  q.addEventListener('click', () => {
    const item = q.closest('.acc__item');
    const open = item.classList.toggle('is-open');
    q.setAttribute('aria-expanded', String(open));
  });
});
