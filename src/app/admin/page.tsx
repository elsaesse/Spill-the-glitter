import { createClient } from "@/lib/supabase/server";
import { logout } from "./actions";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-6 px-page py-16">
      <h1 className="font-display text-5xl uppercase">Ma caisse</h1>
      <p className="text-muted">Connectée en tant que {data?.claims?.email}.</p>
      <form action={logout}>
        <button
          type="submit"
          className="rounded-full border border-line px-6 py-3 text-sm transition-colors hover:border-red-bright"
        >
          Se déconnecter
        </button>
      </form>
    </section>
  );
}
