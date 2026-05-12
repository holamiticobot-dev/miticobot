import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import CookieBanner from "./components/CookieBanner";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MiTicoBot — Asistente de trámites de Hacienda Costa Rica",
    template: "%s | MiTicoBot",
  },
  description:
    "MiTicoBot es tu asistente virtual gratuito para trámites del Ministerio de Hacienda de Costa Rica. Resolvé dudas sobre D-101, IVA, factura electrónica, TRIBU-CR y más.",
  keywords: [
    "Hacienda Costa Rica",
    "trámites Hacienda",
    "D-101",
    "declaración renta Costa Rica",
    "IVA Costa Rica",
    "factura electrónica",
    "TRIBU-CR",
    "ATV Hacienda",
    "tributación digital",
    "impuestos Costa Rica",
  ],
  authors: [{ name: "MiTicoBot" }],
  creator: "MiTicoBot",
  metadataBase: new URL("https://www.miticobot.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: "https://www.miticobot.com",
    siteName: "MiTicoBot",
    title: "MiTicoBot — Asistente de trámites de Hacienda Costa Rica",
    description:
      "Resolvé tus dudas sobre trámites de Hacienda CR gratis. D-101, IVA, factura electrónica, TRIBU-CR y más.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MiTicoBot — Asistente de Hacienda Costa Rica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MiTicoBot — Asistente de trámites de Hacienda Costa Rica",
    description:
      "Resolvé tus dudas sobre trámites de Hacienda CR gratis. D-101, IVA, factura electrónica, TRIBU-CR y más.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TQN77VWJ');
          `}
        </Script>

        {/* ─── AdSense: descomentá cuando hasAds = true ───
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5500410681993417"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        */}
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TQN77VWJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
