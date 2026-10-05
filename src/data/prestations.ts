// Tarifs et durées d'exemple : à faire valider par la cliente.

export type Prestation = {
  name: string;
  description: string;
  price: string;
  duration: string;
};

export type Category = {
  slug: string;
  label: string;
  items: Prestation[];
};

export const categories: Category[] = [
  {
    slug: "mains",
    label: "Mains",
    items: [
      {
        name: "Semi-permanent",
        description: "Préparation, soin des cuticules, couleur unie",
        price: "35 €",
        duration: "1h",
      },
      {
        name: "Gainage rubber base",
        description: "Renfort de l'ongle naturel + couleur",
        price: "45 €",
        duration: "1h15",
      },
      {
        name: "Extensions gel",
        description: "Capsules ou chablons, forme au choix",
        price: "65 €",
        duration: "2h",
      },
      {
        name: "Remplissage gel",
        description: "Jusqu'à 4 semaines",
        price: "50 €",
        duration: "1h30",
      },
      {
        name: "Dépose + soin",
        description: "Dépose propre et soin de l'ongle",
        price: "15 €",
        duration: "30 min",
      },
    ],
  },
  {
    slug: "pieds",
    label: "Pieds",
    items: [
      {
        name: "Semi-permanent pieds",
        description: "Couleur unie",
        price: "35 €",
        duration: "45 min",
      },
      {
        name: "Beauté des pieds + semi",
        description: "Gommage, limage, cuticules, couleur",
        price: "50 €",
        duration: "1h15",
      },
    ],
  },
  {
    slug: "nail-art",
    label: "Nail art",
    items: [
      {
        name: "French revisitée",
        description: "Classique, colorée, micro ou double",
        price: "+5 €",
        duration: "15 min",
      },
      {
        name: "Nail art simple",
        description: "Pois, chrome, paillettes sur 2 ongles",
        price: "+5 €",
        duration: "15 min",
      },
      {
        name: "Nail art complet",
        description: "Léopard, motifs, design sur inspiration",
        price: "dès +15 €",
        duration: "30 min+",
      },
      {
        name: "Charm 3D",
        description: "Petite pièce sculptée en gel, par ongle",
        price: "+3 €",
        duration: "10 min",
      },
    ],
  },
  {
    slug: "press-on",
    label: "Press On",
    items: [
      {
        name: "Set press-on uni",
        description: "Fait main à vos tailles, réutilisable",
        price: "25 €",
        duration: "sous 7 jours",
      },
      {
        name: "Set press-on nail art",
        description: "Design sur mesure",
        price: "dès 40 €",
        duration: "sous 10 jours",
      },
    ],
  },
  {
    slug: "make-up",
    label: "Make up",
    items: [
      {
        name: "Maquillage jour",
        description: "Teint, yeux, lèvres",
        price: "35 €",
        duration: "45 min",
      },
      {
        name: "Maquillage soirée",
        description: "Look intense, faux cils inclus",
        price: "50 €",
        duration: "1h",
      },
    ],
  },
];
