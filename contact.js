/* ============================================================
   VOKUM — formulaire contact
   Validation client, états (erreur / loading / succès), envoi
   vers /api/contact, events analytics (jamais de données perso).
   ============================================================ */

(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('cfSubmit');
  const submitLabel = submitBtn.querySelector('.cform__submit-label');
  const statusEl = document.getElementById('cfStatus');
  const successEl = document.getElementById('cfSuccess');
  const track = (name, props) => window.vokumTrack && window.vokumTrack(name, props);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validators = {
    name: (v) => v.trim() ? '' : 'Votre nom est requis.',
    email: (v) => !v.trim() ? 'Votre email est requis.' : (EMAIL_RE.test(v.trim()) ? '' : 'Cet email ne semble pas valide.'),
    message: (v) => v.trim() ? '' : 'Dites-nous en un peu plus sur votre projet.'
  };

  const setError = (input, msg) => {
    const field = input.closest('.field');
    if (!field) return;
    field.classList.toggle('has-error', !!msg);
    const err = field.querySelector('.field__error');
    if (err) err.textContent = msg || '';
  };

  const validateField = (input) => {
    const check = validators[input.name];
    if (!check) return true;
    const msg = check(input.value);
    setError(input, msg);
    return !msg;
  };

  // validation à la sortie du champ + effacement à la saisie
  form.querySelectorAll('.field__input').forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.field')?.classList.contains('has-error')) validateField(input);
    });
  });

  // event "start" au premier champ touché (une seule fois)
  let started = false;
  form.addEventListener('input', () => {
    if (started) return;
    started = true;
    track('contact_form_start', { page: location.pathname });
  }, { once: false });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputs = ['name', 'email', 'message'].map((n) => form.elements[n]);
    const allValid = inputs.map(validateField).every(Boolean);
    if (!allValid) {
      const firstBad = form.querySelector('.field.has-error .field__input');
      if (firstBad) firstBad.focus();
      return;
    }

    const payload = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      company: form.elements.company.value.trim(),
      projectType: form.elements.projectType.value,
      budget: form.elements.budget.value,
      timeline: form.elements.timeline.value,
      message: form.elements.message.value.trim(),
      website: form.elements.website.value // honeypot
    };

    // état loading
    submitBtn.disabled = true;
    form.classList.add('is-sending');
    submitLabel.textContent = 'ENVOI EN COURS…';
    statusEl.textContent = '';
    statusEl.classList.remove('is-error');
    track('contact_form_submit', { page: location.pathname, budget: payload.budget || 'non renseigné', timeline: payload.timeline || 'non renseigné' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        track('contact_form_success', { page: location.pathname });
        form.hidden = true;
        document.querySelector('.contact__aside')?.classList.add('is-done');
        successEl.hidden = false;
        successEl.classList.add('is-in');
        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // erreurs de validation renvoyées par le serveur
      if (data.errors) {
        Object.entries(data.errors).forEach(([fieldName, msg]) => {
          const input = form.elements[fieldName];
          if (input) setError(input, msg);
        });
      }
      throw new Error(data.error || 'Envoi impossible pour le moment.');
    } catch (err) {
      track('contact_form_error', { page: location.pathname });
      statusEl.textContent = err.message === 'Failed to fetch'
        ? 'Connexion impossible. Vérifiez votre réseau et réessayez.'
        : (err.message || 'Une erreur est survenue. Réessayez ou écrivez-nous à contact@vokumagency.com.');
      statusEl.classList.add('is-error');
    } finally {
      submitBtn.disabled = false;
      form.classList.remove('is-sending');
      submitLabel.textContent = 'ENVOYER MA DEMANDE';
    }
  });
})();
