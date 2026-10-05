export const PLANITY_URL =
  "https://www.planity.com/spill-the-glitter-42000-saint-etienne";
export const INSTAGRAM_URL = "https://www.instagram.com/spill_the_glitter/";

export const SITE_NAME = "Spill the Glitter";

export const NAV_LINKS = [
  { href: "/a-propos", label: "À propos" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/prestations", label: "Prestations" },
  { href: "/reserver", label: "Réserver" },
] as const;

/** Pages à fond rouge : le header y est adapté tant qu'on est en haut. */
export const RED_PAGES: readonly string[] = ["/", "/reserver"];
