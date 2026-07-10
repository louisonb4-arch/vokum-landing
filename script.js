/* ============================================================
   VOKUM — accueil (index)
   Rend les sections répétées. Chrome + interactions = site.js.
   ============================================================ */

const arrow = '<svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';


const data = {
  steps: [
    { n: '01', day: 'JOUR 1', active: true, title: 'DÉCOUVERTE', desc: 'On échange sur votre projet, vos objectifs et votre audience.' },
    { n: '02', day: 'JOURS 2–3', active: false, title: 'STRATÉGIE', desc: 'On structure le message et les pages de votre site.' },
    { n: '03', day: 'JOURS 3–6', active: false, title: 'DESIGN & DEV', desc: 'On conçoit et développe votre site web.' },
    { n: '04', day: 'JOUR 7', active: false, title: 'LANCEMENT', desc: 'On optimise, on teste et on lance votre site.' }
  ]
};

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

document.getElementById('timeline').innerHTML =
  '<div class="timeline__line"></div><div class="timeline__progress" id="timelineProgress"></div>' +
  data.steps.map((st) => `
  <a class="step reveal" href="/processus#etape-${st.n}">
    <div class="step__dot step__dot--idle">${st.n}</div>
    <div class="step__day">${esc(st.day)}</div>
    <div class="step__title">${esc(st.title)}</div>
    <p class="step__desc">${esc(st.desc)}</p>
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

