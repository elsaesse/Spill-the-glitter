import { createClient } from "@supabase/supabase-js";

/**
 * Client anonyme sans cookies, pour les pages publiques : la page reste
 * statique (ISR) au lieu de devenir dynamique à cause de cookies().
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
