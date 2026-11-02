import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

// The real <html>/<body> live in [locale]/layout.tsx (lang + dir per locale).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Cash Back Moto",
  description: "Motorcycles & scooters in Cairo and Alexandria, Egypt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
