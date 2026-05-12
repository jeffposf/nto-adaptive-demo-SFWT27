export const STATES = {

  0: {
    id: 0,
    memberBar: null,
    promoBanner: false,
    appointmentSection: false,
    nav: { active: null, dimmed: false },
    hero: { bgClass: 'bg-state-0', category: 'ÉQUIPEMENT', title: 'NOUVELLE COLLECTION\nPRINTEMPS 2026', cta: 'DÉCOUVRIR', ctaHref: '#' },
    editorial: [
      { category: 'TRAIL',      title: 'LES INCONTOURNABLES', bgExtra: '' },
      { category: 'ÉQUIPEMENT', title: 'HAUTE PERFORMANCE',   bgExtra: '' },
      { category: 'RUNNING',    title: 'LES NOUVEAUTÉS',      bgExtra: '' },
    ],
    products: 'mix',
    productSectionTitle: 'NOS ESSENTIELS',
    chat: { message: null, buttons: [] },
  },

  1: {
    id: 1,
    memberBar: null,
    promoBanner: false,
    appointmentSection: false,
    nav: { active: null, dimmed: false },
    hero: { bgClass: 'bg-state-0', category: 'ÉQUIPEMENT', title: 'NOUVELLE COLLECTION\nPRINTEMPS 2026', cta: 'DÉCOUVRIR', ctaHref: '#' },
    editorial: [
      { category: 'TRAIL',      title: 'LES INCONTOURNABLES', bgExtra: '' },
      { category: 'ÉQUIPEMENT', title: 'HAUTE PERFORMANCE',   bgExtra: '' },
      { category: 'RUNNING',    title: 'LES NOUVEAUTÉS',      bgExtra: '' },
    ],
    products: 'mix',
    productSectionTitle: 'NOS ESSENTIELS',
    chat: { message: null, buttons: [] },
  },

  2: {
    id: 2,
    memberBar: 'Bonjour, Sophie   ·   Membre NTO depuis 2019   ·   Niveau Summit   ·   3 240 points',
    promoBanner: false,
    appointmentSection: false,
    nav: { active: null, dimmed: false },
    hero: { bgClass: 'bg-state-0', category: 'ÉQUIPEMENT', title: 'NOUVELLE COLLECTION\nPRINTEMPS 2026', cta: 'DÉCOUVRIR', ctaHref: '#' },
    editorial: [
      { category: 'TRAIL',      title: 'LES INCONTOURNABLES', bgExtra: '' },
      { category: 'ÉQUIPEMENT', title: 'HAUTE PERFORMANCE',   bgExtra: '' },
      { category: 'RUNNING',    title: 'LES NOUVEAUTÉS',      bgExtra: '' },
    ],
    products: 'mix',
    productSectionTitle: 'NOS ESSENTIELS',
    chat: {
      message: 'Bonjour Sophie,\n\nRavie de vous retrouver chez Northern Trail Outfitters.\n\nVotre dernier achat remonte au 18 novembre 2024 — une Veste Softshell Ascent en vert forêt, si je me souviens bien.\n\nComment puis-je vous aider aujourd\'hui ?',
      buttons: [
        { icon: '🧥', label: 'Je cherche quelque chose pour moi',         nextState: 2 },
        { icon: '🎁', label: 'Je cherche un cadeau pour mon mari',         nextState: 3 },
        { icon: '📅', label: 'Je souhaite prendre rendez-vous',            nextState: 6 },
        { icon: '✨', label: 'Je voudrais voir les nouveautés',             nextState: 2 },
      ],
    },
  },

  3: {
    id: 3,
    memberBar: 'Bonjour, Sophie   ·   Membre NTO depuis 2019   ·   Niveau Summit   ·   3 240 points',
    promoBanner: true,
    promoBannerText: '✦   Livraison gratuite dès 100 €   ·   Retour gratuit en boutique   ·   Emballage cadeau offert',
    appointmentSection: false,
    nav: { active: null, dimmed: false },
    hero: { bgClass: 'bg-state-3', category: 'CADEAUX', title: 'L\'ART D\'OFFRIR\nCHEZ NORTHERN TRAIL', cta: 'EXPLORER', ctaHref: '#' },
    editorial: [
      { category: 'POUR LUI',     title: 'ÉQUIPEMENT',  bgExtra: 'cadeau' },
      { category: 'COFFRETS',     title: 'TRAIL',       bgExtra: 'cadeau' },
      { category: 'EXPÉRIENCES',  title: 'BOUTIQUE',    bgExtra: 'cadeau' },
    ],
    products: 'cadeaux',
    productSectionTitle: 'IDÉES CADEAUX',
    chat: {
      message: 'J\'ai sélectionné nos plus belles idées cadeaux pour vous.\n\nPour affiner cette sélection, une question :\n\nQuel univers souhaitez-vous explorer pour ce cadeau ?',
      buttons: [
        { icon: '🧥', label: 'Vêtements & Vestes',   nextState: 4 },
        { icon: '🎒', label: 'Sacs & Équipement',     nextState: 4 },
        { icon: '👟', label: 'Chaussures',            nextState: 4 },
        { icon: '⌚', label: 'Technologie & GPS',      nextState: 4 },
      ],
    },
  },

  4: {
    id: 4,
    memberBar: 'Bonjour, Sophie   ·   Membre NTO depuis 2019   ·   Niveau Summit   ·   3 240 points',
    promoBanner: true,
    promoBannerText: '✦   Livraison gratuite dès 100 €   ·   Retour gratuit en boutique   ·   Emballage cadeau offert',
    appointmentSection: true,
    nav: { active: 'equipement', dimmed: true },
    categoryName: 'ÉQUIPEMENT TRAIL & OUTDOOR',
    jewelleryScoreKey: 'default',
    insightText: 'Salesforce personnalise votre sélection équipement en temps réel · Basé sur votre profil et votre historique',
    chat: {
      message: 'L\'équipement trail NTO — la performance à chaque sortie.\n\nPour affiner cette sélection, une dernière question : quel profil reflète le mieux votre mari ?',
      buttons: [
        { icon: '🏔️', label: 'Performant et exigeant',     nextState: 41 },
        { icon: '🌿', label: 'Polyvalent et style',         nextState: 42 },
        { icon: '🪶', label: 'Légèreté avant tout',         nextState: 43 },
      ],
    },
  },

  41: {
    id: 41,
    memberBar: 'Bonjour, Sophie   ·   Membre NTO depuis 2019   ·   Niveau Summit   ·   3 240 points',
    promoBanner: true,
    promoBannerText: '✦   Livraison gratuite dès 100 €   ·   Retour gratuit en boutique   ·   Emballage cadeau offert',
    appointmentSection: true,
    nav: { active: 'equipement', dimmed: true },
    categoryName: 'ÉQUIPEMENT TRAIL & OUTDOOR',
    jewelleryScoreKey: 'performance',
    insightText: 'Profil détecté : Performance & Exigence · Salesforce met en avant les pièces haute performance',
    chat: {
      message: 'Performant et exigeant — il mérite le meilleur équipement.\n\nJ\'ai mis en avant nos pièces les plus techniques — celles qui font la différence sur les longues distances et les conditions difficiles.\n\nLa Veste Trail Pro et la Veste Softshell Ascent sont en tête de votre sélection.',
      buttons: [
        { icon: '🧥', label: 'Voir le produit — Veste Trail Pro',          nextState: 'product' },
        { icon: '📅', label: 'Réserver un rendez-vous en boutique',         nextState: 6 },
      ],
    },
  },

  42: {
    id: 42,
    memberBar: 'Bonjour, Sophie   ·   Membre NTO depuis 2019   ·   Niveau Summit   ·   3 240 points',
    promoBanner: true,
    promoBannerText: '✦   Livraison gratuite dès 100 €   ·   Retour gratuit en boutique   ·   Emballage cadeau offert',
    appointmentSection: true,
    nav: { active: 'equipement', dimmed: true },
    categoryName: 'ÉQUIPEMENT TRAIL & OUTDOOR',
    jewelleryScoreKey: 'style',
    insightText: 'Profil détecté : Polyvalent & Style · Salesforce met en avant les nouvelles collections',
    chat: {
      message: 'Polyvalent et style — il veut une tenue qui performe et qui se porte en ville.\n\nJ\'ai mis en avant les Chaussures Trail GTX et le Sac à dos Trail 40L — deux pièces qui s\'adaptent à toutes les sorties avec une esthétique soignée.\n\nDes équipements qui se portent partout, avec caractère.',
      buttons: [
        { icon: '👟', label: 'Voir le produit — Chaussures Trail',          nextState: 'product' },
        { icon: '📅', label: 'Réserver un rendez-vous en boutique',         nextState: 6 },
      ],
    },
  },

  43: {
    id: 43,
    memberBar: 'Bonjour, Sophie   ·   Membre NTO depuis 2019   ·   Niveau Summit   ·   3 240 points',
    promoBanner: true,
    promoBannerText: '✦   Livraison gratuite dès 100 €   ·   Retour gratuit en boutique   ·   Emballage cadeau offert',
    appointmentSection: true,
    nav: { active: 'equipement', dimmed: true },
    categoryName: 'ÉQUIPEMENT TRAIL & OUTDOOR',
    jewelleryScoreKey: 'leger',
    insightText: 'Profil détecté : Légèreté & Efficacité · Salesforce sélectionne les pièces les plus légères',
    chat: {
      message: 'Légèreté avant tout — chaque gramme compte sur les longues distances.\n\nJ\'ai sélectionné les Bâtons Trail Carbone et la Montre GPS Pathfinder — deux pièces ultralégers qui ne sacrifient rien à la performance.\n\nC\'est l\'équipement des vrais ultratraileurs.',
      buttons: [
        { icon: '⌚', label: 'Voir le produit — Montre GPS',                nextState: 'product' },
        { icon: '📅', label: 'Réserver un rendez-vous en boutique',         nextState: 6 },
      ],
    },
  },

  5: {
    id: 5,
    memberBar: 'Bonjour, Sophie   ·   Membre NTO depuis 2019   ·   Niveau Summit   ·   3 240 points',
    promoBanner: false,
    appointmentSection: false,
    nav: { active: 'equipement', dimmed: true },
    categoryName: 'ÉQUIPEMENT TRAIL & OUTDOOR',
    jewelleryScoreKey: 'performance',
    insightText: 'Notre recommandation pour vous · Basé sur votre profil et votre sélection',
    chat: {
      message: 'Voici notre recommandation pour vous, Sophie.\n\nLa Veste Trail Pro Gore-Tex est la pièce la plus emblématique de notre gamme technique. Imperméable, respirante, ultra-légère — sans jamais s\'imposer.\n\nC\'est un cadeau qui parle pour vous.',
      buttons: [
        { icon: '🧥', label: 'Voir la fiche produit',                       nextState: 'product' },
        { icon: '📅', label: 'Réserver un rendez-vous en boutique',         nextState: 6 },
      ],
    },
  },

  6: {
    id: 6,
    modal: 'calendar',
    chat: {
      message: 'Nos conseillers sont disponibles du lundi au samedi, de 10h à 20h.\n\nVotre sélection — Veste Trail Pro — sera transmise à Alex avant votre visite.',
      buttons: [],
    },
  },

  7: {
    id: 7,
    modal: 'confirmation',
    chat: {
      message: 'Sophie, votre rendez-vous est confirmé pour le vendredi 13 juin à 14h30.\n\nAlex aura accès à votre profil complet et à la sélection d\'aujourd\'hui pour préparer une expérience sur mesure.\n\nNous vous attendons sur les Champs-Élysées.',
      buttons: [],
    },
  },
}
