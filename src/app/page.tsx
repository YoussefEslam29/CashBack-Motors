// Root layout is handled by [locale]/layout.tsx
// This file only exists as a redirect entry point

import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
