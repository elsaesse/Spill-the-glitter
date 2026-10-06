-- Bloque toute création de compte autre que celui de la cliente.
-- Alternative au réglage "Allow new users to sign up" du dashboard.
-- ⚠️ Remplacer l'email avant d'exécuter (le même que dans is_admin()).
-- Le compte existant n'est pas touché : le trigger ne joue qu'à l'INSERT.

create function public.block_unknown_signups() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if lower(new.email) is distinct from lower('REMPLACER_PAR_EMAIL_DE_LA_CLIENTE') then
    raise exception 'Les inscriptions sont fermées.';
  end if;
  return new;
end;
$$;

create trigger block_unknown_signups
  before insert on auth.users
  for each row execute function public.block_unknown_signups();
