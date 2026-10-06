"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { PageTransition } from "@/components/PageTransition";

/** Header, footer et rideau de transition du site public, absents de /admin. */
export function SiteChrome({
  footer,
  children,
}: {
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      {footer}
      <PageTransition />
    </>
  );
}
