"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isHomePage = pathname === "/";
  // The header background logic
  const headerBg =
    isScrolled || !isHomePage
      ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm py-1"
      : "bg-transparent py-4";

  // Back to white text on transparent header, dark when scrolled
  const isTransparent = isHomePage && !isScrolled;
  const textColor = isTransparent ? "text-white drop-shadow-sm" : "text-stone-900";

  // Pure CSS filter to colorize the transparent PNG logo
  // When transparent header -> brightness-0 invert -> turns dark logo perfectly white
  // When solid white header -> brightness-0 -> forces dark logo perfectly black
  const logoClass = isTransparent
    ? "brightness-0 invert opacity-100"
    : "brightness-0 opacity-100";

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
      >
        <div className="w-full my-container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className={`font-display text-2xl lg:text-3xl tracking-tight flex items-center`}>
              <Image
                src="/assets/logo/download.png"
                alt="Studio WnF"
                width={140}
                height={56}
                className={`h-16 w-auto object-contain transition-all duration-300 ${logoClass}`}
                priority
              />
            </Link>

            <div className="flex items-center gap-10">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={scrollToTop}
                    className={`text-md uppercase tracking-[0.15em] font-semibold link-underline transition-colors duration-300 ${textColor} ${pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path))
                        ? "opacity-100 link-active"
                        : "opacity-70 hover:opacity-100"
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center gap-4">
                <Button
                  variant={isScrolled || !isHomePage ? "elegant" : "default"}
                  size="default"
                  asChild
                  className={!isScrolled && isHomePage ? "bg-white text-zinc-900 hover:bg-zinc-100 border-none shadow-lg" : "shadow-sm"}
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 ${textColor}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-24"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.path}
                    onClick={scrollToTop}
                    className={`text-3xl font-display ${pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path))
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-col items-center gap-6"
              >
                <Button variant="elegant" size="lg" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
