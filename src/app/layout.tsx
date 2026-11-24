import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/layout/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "FORME Grooming Studio | Defined by Detail", template: "%s | FORME Grooming Studio" },
  description: "Personal grooming, shaped with precision. Visit FORME Grooming Studio on Havelock Road, Colombo 05.",
  openGraph: {
    title: "FORME Grooming Studio — Defined by detail.",
    description: "Modern grooming, considered in every detail. Colombo 05, Sri Lanka.",
    type: "website",
    locale: "en_LK",
    siteName: "FORME Grooming Studio",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader />{children}<SiteFooter /></body></html>;
}
