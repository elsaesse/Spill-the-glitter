import type { Metadata } from "next";
import { Anton, Manrope, Yellowtail } from "next/font/google";
import { Footer } from "@/components/Footer";
import { SiteChrome } from "@/components/SiteChrome";
import { SITE_NAME } from "@/lib/site";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const yellowtail = Yellowtail({
  variable: "--font-yellowtail",
  weight: "400",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const description =
  "Spill the Glitter, prothésiste ongulaire à Saint-Étienne : semi-permanent, gainage, extensions gel, nail art et press-on. Réservation sur Planity.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: `${SITE_NAME} | Prothésiste ongulaire à Saint-Étienne`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Prothésiste ongulaire à Saint-Étienne`,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${anton.variable} ${yellowtail.variable} ${manrope.variable}`}
    >
      <body>
        <noscript>
          {/* Sans JS, le reveal au scroll ne se déclencherait jamais. */}
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SiteChrome footer={<Footer />}>{children}</SiteChrome>
      </body>
    </html>
  );
}
