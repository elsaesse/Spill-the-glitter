import "server-only";
import { formatPrice } from "@/lib/caisse/format";
import { createPublicClient } from "@/lib/supabase/public";

export type PublicCategory = {
  slug: string;
  label: string;
  items: { id: string; name: string; price: string }[];
};

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** La carte affichée sur /prestations, lue en base (catégories vides masquées). */
export async function getPublicCatalogue(): Promise<PublicCategory[]> {
  try {
    const { data, error } = await createPublicClient()
      .from("service_categories")
      .select(
        "id,label,position,services(id,name,price_cents,price_is_from,position,active)",
      )
      .order("position")
      .order("position", { referencedTable: "services" });
    if (error) throw error;

    return (data ?? [])
      .map((c) => ({
        slug: slugify(c.label),
        label: c.label,
        items: (c.services ?? [])
          .filter((s) => s.active)
          .map((s) => ({
            id: s.id,
            name: s.name,
            price: formatPrice(s.price_cents, s.price_is_from),
          })),
      }))
      .filter((c) => c.items.length > 0);
  } catch (e) {
    console.error("Catalogue indisponible :", e);
    return [];
  }
}
