import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ma caisse",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-black">{children}</div>;
}
