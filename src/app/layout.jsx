import "./globals.css";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingSocialIcons from "@/components/shared/FloatingSocialIcons";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import PageTransition from "@/components/shared/PageTransition";
import JsonLd from "@/components/shared/JsonLd";

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
  metadataBase: new URL(baseUrl),
  title: {
    default: "WNF Studio | Architecture & Interior Design",
    template: "%s | WNF Studio",
  },
  description:
    "Award-winning architecture and interior design studio creating timeless spaces that inspire. Residential, commercial, and luxury design services.",
  keywords: [
    "Architecture",
    "Interior Design",
    "Luxury Homes",
    "Modern Architecture",
    "Interior Decor",
    "WNF Studio",
    "Architecture Studio India",
    "Architecture Studio Gujrat",
    "Architecture Studio Rajkot ",
    "Architecture Studio Ahemdabad",
    "Best Interior Design Studio Rajkot",
    "Best Interior Design Studio Ahemdabad",
    "Best Interior Design Studio Gujrat",
    "Best Interior Design Studio India",
    "Architecture Firm in Rajkot",
    "Architecture Firm in Ahemdabad",
    "Architecture Firm in Gujrat",
    "Architecture Firm in India",
    "Best Architecture Firm in Rajkot",
    "Best Architecture Firm in Ahemdabad",
    "Best Architecture Firm in Gujrat",
    "Best Architecture Firm in India",
  ],
  authors: [{ name: "WNF Studio" }],
  creator: "WNF Studio",
  publisher: "WNF Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "WNF Studio",
    title: "WNF Studio | Architecture & Interior Design",
    description:
      "Award-winning architecture and interior design studio creating timeless spaces that inspire.",
    images: [
      {
        url: "/assets/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "WNF Studio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WNF Studio | Architecture & Interior Design",
    description:
      "Award-winning architecture and interior design studio creating timeless spaces that inspire.",
    images: ["/assets/logo/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-stone-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-lg focus:rounded"
        >
          Skip to content
        </a>

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
