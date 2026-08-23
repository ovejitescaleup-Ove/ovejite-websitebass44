import { useEffect } from "react";
import { base44 } from "@/api/base44Client";

/**
 * AnalyticsScripts — injects GTM, GA4, and Meta Pixel scripts based on
 * backend SiteSetting values. Renders nothing. Included once in PublicLayout.
 * Ensures tracking code is not duplicated (guards with window flags).
 */
export default function AnalyticsScripts() {
  useEffect(() => {
    (async () => {
      try {
        const list = await base44.entities.SiteSetting.list();
        const s = list?.[0] || {};

        // GTM
        if (s.gtm_id && !window.__gtmLoaded) {
          window.__gtmLoaded = true;
          const script = document.createElement("script");
          script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${s.gtm_id}');`;
          document.head.appendChild(script);
        }

        // GA4
        if (s.ga4_id && !window.__ga4Loaded) {
          window.__ga4Loaded = true;
          const script = document.createElement("script");
          script.async = true;
          script.src = `https://www.googletagmanager.com/gtag/js?id=${s.ga4_id}`;
          document.head.appendChild(script);
          const init = document.createElement("script");
          init.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${s.ga4_id}');`;
          document.head.appendChild(init);
        }

        // Meta Pixel
        if (s.meta_pixel_id && !window.__fbqLoaded) {
          window.__fbqLoaded = true;
          const script = document.createElement("script");
          script.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${s.meta_pixel_id}');fbq('track','PageView');`;
          document.head.appendChild(script);
        }
      } catch (e) {}
    })();
  }, []);

  return null;
}
