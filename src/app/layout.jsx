import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingSocialIcons from "@/components/shared/FloatingSocialIcons";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import PageTransition from "@/components/shared/PageTransition";

export const metadata = {
  title: "WNF Studio | Architecture & Interior Design",
  description:
    "Award-winning architecture and interior design studio creating timeless spaces that inspire. Residential, commercial, and luxury design services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
        >
          <Header />
          <FloatingSocialIcons />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

