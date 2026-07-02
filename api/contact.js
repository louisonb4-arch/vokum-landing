/**
 * VOKUM — réception du formulaire contact.
 * Vercel Serverless Function (Node). Envoi email via Resend (API HTTP, zéro dépendance).
 *
 * Variables d'environnement requises :
 *   RESEND_API_KEY  — clé API Resend (https://resend.com/api-keys)
 *   CONTACT_TO      — email destinataire des leads (défaut : hello@vokum.agency)
 *   CONTACT_FROM    — expéditeur vérifié chez Resend (défaut : onboarding@resend.dev)
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, email: 200, company: 160, projectType: 60, budget: 60, timeline: 60, message: 5000 };

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Méthode non autorisée' });
  }

  const body = req.body || {};

  // Honeypot : un bot qui remplit "website" reçoit un faux succès, rien n'est envoyé.
  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  // Validation serveur (le client peut être contourné)
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();

  const errors = {};
  if (!name) errors.name = 'Votre nom est requis.';
  if (!email) errors.email = 'Votre email est requis.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Cet email ne semble pas valide.';
  if (!message) errors.message = 'Dites-nous en un peu plus sur votre projet.';

  for (const [field, max] of Object.entries(MAX)) {
    if (body[field] && String(body[field]).length > max) errors[field] = 'Champ trop long.';
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, errors });
  }

  const company = String(body.company || '').trim();
  const projectType = String(body.projectType || '').trim();
  const budget = String(body.budget || '').trim();
  const timeline = String(body.timeline || '').trim();

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || 'hello@vokum.agency';
  const from = process.env.CONTACT_FROM || 'Vokum <onboarding@resend.dev>';

  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY manquante — lead non envoyé:', { name, email, company, projectType, budget, timeline });
    return res.status(503).json({ ok: false, error: "L'envoi est momentanément indisponible. Écrivez-nous à hello@vokum.agency." });
  }

  const row = (label, value) => value
    ? `<tr><td style="padding:6px 14px 6px 0;color:#8a8a7e;font-size:12px;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:6px 0;color:#1a1a14;font-size:14px;">${esc(value)}</td></tr>`
    : '';

  const html = `
  <div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
    <div style="font-weight:800;font-size:20px;letter-spacing:-0.5px;margin-bottom:4px;">VOKUM<span style="color:#3d7a57;">.</span></div>
    <div style="font-size:12px;color:#8a8a7e;margin-bottom:24px;">Nouveau lead via le formulaire du site</div>
    <table style="border-collapse:collapse;width:100%;">
      ${row('Nom', name)}
      ${row('Email', email)}
      ${row('Entreprise', company)}
      ${row('Type de projet', projectType)}
      ${row('Budget', budget)}
      ${row('Délai', timeline)}
    </table>
    <div style="margin-top:20px;padding:16px;background:#f6f4ec;border-radius:10px;font-size:14px;line-height:1.6;color:#1a1a14;white-space:pre-wrap;">${esc(message)}</div>
  </div>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Nouveau projet — ${name}${company ? ` (${company})` : ''}`,
        html
      })
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => '');
      console.error('[contact] Resend a refusé l\'envoi:', r.status, detail);
      return res.status(502).json({ ok: false, error: "L'envoi a échoué. Réessayez ou écrivez-nous à hello@vokum.agency." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] Erreur réseau vers Resend:', err);
    return res.status(502).json({ ok: false, error: "L'envoi a échoué. Réessayez ou écrivez-nous à hello@vokum.agency." });
  }
}
