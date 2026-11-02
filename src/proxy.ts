// Next.js 16 renamed middleware.ts to proxy.ts. Handles locale detection + /en, /ar redirects.
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
