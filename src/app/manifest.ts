import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vokum — Agence web',
    short_name: 'Vokum',
    description:
      'Création de sites internet professionnels en une semaine, à partir de 500 €. Hébergement et maintenance à 20 €/mois.',
    start_url: '/fr',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#19171c',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
