import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cash Back Moto",
  description: "Premium motorcycles & scooters in Egypt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
