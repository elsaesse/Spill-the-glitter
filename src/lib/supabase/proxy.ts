import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminEmail } from "@/lib/admin";

/**
 * Rafraîchit la session Supabase et protège /admin : seul le compte de la
 * cliente (ADMIN_EMAIL) passe, tout le reste est renvoyé vers /admin/login.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // getClaims() vérifie la signature du JWT, contrairement à getSession().
  const { data } = await supabase.auth.getClaims();
  const isAdmin = isAdminEmail(data?.claims?.email);

  const { pathname } = request.nextUrl;
  const onLogin = pathname === "/admin/login";

  if (!isAdmin && !onLogin) {
    return redirectWithCookies(request, response, "/admin/login");
  }
  if (isAdmin && onLogin) {
    return redirectWithCookies(request, response, "/admin");
  }

  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

// Conserve les cookies rafraîchis sur la redirection.
function redirectWithCookies(
  request: NextRequest,
  from: NextResponse,
  to: string,
) {
  const redirect = NextResponse.redirect(new URL(to, request.url));
  from.cookies.getAll().forEach((c) => redirect.cookies.set(c));
  return redirect;
}
