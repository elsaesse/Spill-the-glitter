-- Catalogue de la caisse, d'après les captures de son module actuel.
-- À exécuter une fois dans le SQL Editor : ne fait rien si le catalogue existe déjà.
-- Prix en centimes ; price_is_from = « dès ».

do $$
declare
  c_poses uuid; c_entretien uuid; c_pieds uuid; c_supp uuid; c_soins uuid;
begin
  if exists (select 1 from service_categories) then
    raise notice 'Catalogue déjà présent, seed ignoré.';
    return;
  end if;

  insert into service_categories (label, emoji, position) values
    ('Poses complètes · Mains', '💅', 1) returning id into c_poses;
  insert into service_categories (label, emoji, position) values
    ('Entretien des mains', '🔄', 2) returning id into c_entretien;
  insert into service_categories (label, emoji, position) values
    ('Pieds', '🦶', 3) returning id into c_pieds;
  insert into service_categories (label, emoji, position) values
    ('Suppléments', '➕', 4) returning id into c_supp;
  insert into service_categories (label, emoji, position) values
    ('Soins des mains', '🌸', 5) returning id into c_soins;

  insert into services (category_id, name, price_cents, price_is_from, position) values
    (c_poses,     'Glow',                 6500, false, 1),
    (c_poses,     'Spark',                7500, false, 2),
    (c_poses,     'Icon',                 8500, true,  3),

    (c_entretien, 'Gainage',              6000, false, 1),
    (c_entretien, 'Remplissage Glow',     5500, false, 2),
    (c_entretien, 'Remplissage Spark',    6500, false, 3),
    (c_entretien, 'Remplissage Icon',     7500, false, 4),
    (c_entretien, 'Dépose seule',         2000, false, 5),

    (c_pieds,     'Glow',                 5000, false, 1),
    (c_pieds,     'Spark',                6000, false, 2),
    (c_pieds,     'Dépose seule',         2000, false, 3),

    (c_supp,      'Taille L',             1000, false, 1),
    (c_supp,      'Taille XL',            2000, false, 2),

    (c_soins,     'Manucure russe seule', 2500, false, 1),
    (c_soins,     'Soft ritual',          4000, false, 2);
end $$;
