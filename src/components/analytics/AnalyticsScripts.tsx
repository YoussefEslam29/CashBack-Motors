import Script from 'next/script';

/**
 * Loads Google Analytics 4 and the Meta (Facebook/Instagram) Pixel,
 * but only when their IDs are set as environment variables in Vercel:
 *   NEXT_PUBLIC_GA_ID          e.g. G-ABC123XYZ
 *   NEXT_PUBLIC_META_PIXEL_ID  e.g. 1234567890123456
 * IDs are validated so a typo can't inject script.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const validGa = GA_ID && /^G-[A-Z0-9]+$/.test(GA_ID) ? GA_ID : null;
const validPixel = PIXEL_ID && /^\d+$/.test(PIXEL_ID) ? PIXEL_ID : null;

export default function AnalyticsScripts() {
  return (
    <>
      {validGa && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${validGa}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${validGa}');`}
          </Script>
        </>
      )}
      {validPixel && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${validPixel}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
