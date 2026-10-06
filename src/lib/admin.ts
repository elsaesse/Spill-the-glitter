/** Seul ce compte accède à /admin (aligné sur is_admin() côté Supabase). */
export function isAdminEmail(email: unknown): boolean {
  const admin = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return (
    !!admin && typeof email === "string" && email.toLowerCase() === admin
  );
}
