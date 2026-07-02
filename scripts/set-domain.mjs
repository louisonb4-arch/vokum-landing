#!/usr/bin/env node
/**
 * VOKUM — bascule du domaine SEO en une commande.
 *
 * Usage :
 *   node scripts/set-domain.mjs https://vokum.agency
 *
 * Remplace l'ancienne base URL dans TOUS les fichiers SEO :
 * sitemap.xml, robots.txt, canonical, OG/Twitter, JSON-LD.
 * Puis : git commit + vercel deploy --prod.
 */
import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'node:fs';

const NEW = (process.argv[2] || '').replace(/\/$/, '');
if (!/^https:\/\/[a-z0-9.-]+$/i.test(NEW)) {
  console.error('Usage: node scripts/set-domain.mjs https://votre-domaine.com');
  process.exit(1);
}

// base actuellement en place — lue depuis robots.txt (source de vérité)
const robots = readFileSync('robots.txt', 'utf8');
const m = robots.match(/Sitemap:\s*(https:\/\/[^/\s]+)/);
if (!m) { console.error('Base URL introuvable dans robots.txt'); process.exit(1); }
const OLD = m[1];
if (OLD === NEW) { console.log('Déjà sur', NEW, '— rien à faire.'); process.exit(0); }

const files = ['robots.txt', 'sitemap.xml', ...globSync('*.html')];
let total = 0;
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const count = src.split(OLD).length - 1;
  if (!count) continue;
  writeFileSync(f, src.replaceAll(OLD, NEW));
  console.log(`${f}: ${count} remplacement(s)`);
  total += count;
}
console.log(`\n${OLD} → ${NEW} : ${total} occurrences remplacées.`);
console.log('Ensuite : git add -A && git commit && npx vercel deploy --prod');
