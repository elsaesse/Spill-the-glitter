import { SaleForm } from "../_components/SaleForm";
import { SaleRow } from "../_components/Rows";
import { cardClass } from "../_components/ui";
import { todayParis } from "@/lib/caisse/dates";
import { getCatalogue, getSales } from "@/lib/caisse/queries";

export default async function CaissePage() {
  const today = todayParis();
  const [catalogue, sales] = await Promise.all([
    getCatalogue(),
    getSales(today, nextDay(today)),
  ]);

  return (
    <>
      <SaleForm catalogue={catalogue} today={today} />

      <section className={cardClass}>
        <h2 className="text-[26px] font-extrabold text-white">{"Aujourd'hui"}</h2>
        {sales.length === 0 ? (
          <p className="mt-4 text-muted">Aucune prestation encaissée pour le moment.</p>
        ) : (
          <ul className="mt-4 space-y-2.5">
            {sales.map((sale) => (
              <SaleRow key={sale.id} sale={sale} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

function nextDay(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}
