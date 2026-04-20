import "./globals.css";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingSocialIcons from "@/components/shared/FloatingSocialIcons";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import PageTransition from "@/components/shared/PageTransition";
import JsonLd from "@/components/shared/JsonLd";
import Link from "next/link";

/* ── next/font: Self-hosted, no render-blocking CSS @import ── */
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const baseUrl = "https://wnfdesignstudio.com";

export const metadata = {
  metadataBase: new URL("https://wnfdesignstudio.com"),

  title: {
    default: "Best Interior Designer in Rajkot | WNF Design Studio",
    template: "%s | WNF Design Studio – Interior Designer Rajkot",
  },

  description:
    "WNF Design Studio – Rajkot's leading architecture and interior design firm. We design luxury homes, offices, bungalows & commercial spaces in Rajkot, Gujarat. Call +91 8530070800.",

  keywords: [
    "wnfdesignstudio",
    "wnf design studio",
    "wnf design studio rajkot",
    "interior designer in Rajkot",
    "best interior designer Rajkot",
    "interior design company Rajkot",
    "architect in Rajkot",
    "home interior design Rajkot",
    "office interior design Rajkot",
    "residential interior design Rajkot",
    "architecture firm Rajkot",
    "luxury interior design Rajkot",
    "bungalow design Rajkot",
    "commercial interior design Rajkot Gujarat",
    "WNF Studio Rajkot",
    "interior decoration Rajkot",
    "3D interior design Rajkot",
    "renovation services Rajkot",
  ],

  authors: [{ name: "WNF Design Studio", url: "https://wnfdesignstudio.com" }],
  creator: "WNF Design Studio",
  publisher: "WNF Design Studio",

  // ✅ Open Graph (WhatsApp, Facebook share preview)
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://wnfdesignstudio.com",
    siteName: "WNF Design Studio",
    title: "Best Interior Designer in Rajkot | WNF Design Studio",
    description:
      "Award-winning architecture & interior design studio based in Rajkot, Gujarat. Residential, commercial & renovation projects across Gujarat.",
    images: [
      {
        url: "/assets/logo/animatedlogo.png",
        width: 1200,
        height: 630,
        alt: "WNF Design Studio – Interior Designer Rajkot",
      },
    ],
  },

  // ✅ Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: "Best Interior Designer in Rajkot | WNF Design Studio",
    description:
      "Luxury architecture & interior design in Rajkot, Gujarat. Contact WNF Design Studio today.",
    images: ["/assets/logo/animatedlogo.png"],
  },

  // ✅ Canonical URL
  alternates: {
    canonical: "https://wnfdesignstudio.com",
  },

  // ✅ Icons
  icons: {
    icon: "/assets/logo/animatedlogo.png",
    apple: "/assets/logo/animatedlogo.png",
  },

  // ✅ Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${playfairDisplay.variable}`}
    >
      <head>
        {/* SEO: Structured data rendered via dedicated component */}
        <JsonLd />
      </head>

      <body suppressHydrationWarning>
        {/* Accessibility: Skip to main content for keyboard users */}
        <Link 
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-stone-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-lg focus:rounded"
        >
          Skip to content
        </Link  >

        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
        >
          <Header />
          <FloatingSocialIcons />
          <main id="main-content">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
