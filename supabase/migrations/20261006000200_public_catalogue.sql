-- La carte est publique : la vitrine (/prestations) lit le catalogue avec la
-- clé anonyme. Lecture seule ; l'écriture reste réservée à la cliente.
-- Les prestations désactivées (active = false) restent invisibles du public.

create policy "public read" on service_categories
  for select to anon, authenticated
  using (true);

create policy "public read active" on services
  for select to anon, authenticated
  using (active);
