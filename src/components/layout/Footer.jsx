import Link from "next/link";
import { Instagram, Linkedin, ArrowUpRight, Mail, Phone, MapPin, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Our Work", href: "/projects" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
    Services: [
      { label: "Architecture", href: "/services" },
      { label: "Interior Design", href: "/services" },
      { label: "Urban Planning", href: "/services" },
      { label: "Consultation", href: "/contact" },
    ],
    Resources: [
      { label: "Blog", href: "#" },
      { label: "Portfolio", href: "/projects" },
      { label: "Case Studies", href: "/projects" },
      { label: "FAQ", href: "#" },
    ],
  };

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/studio_wnf/",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
    },
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
    },
  ];

  return (
    <footer className="bg-foreground text-background overflow-hidden">
      {/* Decorative top element */}
      <div className="h-px bg-gradient-to-r from-transparent via-background/20 to-transparent"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-6 space-y-6 text-center md:text-left">
            <Link href="/" className="inline-block">
              <div className="text-3xl lg:text-4xl font-bold tracking-tight hover:opacity-80 transition-opacity duration-300">
                WNF
              </div>
            </Link>
            
            <p className="text-background/70 leading-relaxed max-w-sm mx-auto md:mx-0">
              Creating timeless spaces that inspire and transform the way you live,
              work, and experience the world around you.
            </p>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center bg-background/10 border border-background/20 rounded-full hover:bg-background/20 hover:border-background/40 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-6 space-y-6 text-center md:text-left">
            <h5 className="font-semibold text-background uppercase tracking-wider text-sm mb-6">
              Get in Touch
            </h5>
            
            <div className="space-y-4">
              <a
                href="mailto:info@wnfdesignstudio.com"
                className="flex items-center justify-center md:justify-start gap-3 group cursor-pointer"
              >
                <Mail size={18} className="text-background/60 group-hover:text-background transition-colors duration-300 flex-shrink-0" />
                <span className="text-background/70 hover:text-background transition-colors duration-300 text-sm">
                  info@wnfdesignstudio.com
                </span>
              </a>

              <a
                href="tel:+918530070800"
                className="flex items-center justify-center md:justify-start gap-3 group cursor-pointer"
              >
                <Phone size={18} className="text-background/60 group-hover:text-background transition-colors duration-300 flex-shrink-0" />
                <span className="text-background/70 hover:text-background transition-colors duration-300 text-sm">
                  +91 8530070800
                </span>
              </a>

              <div className="flex items-center justify-center md:justify-start gap-3 group">
                <MapPin size={18} className="text-background/60 flex-shrink-0" />
                <span className="text-background/70 text-sm">
                  Based in India
                </span>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 mt-8 px-6 py-3 bg-background text-foreground font-semibold rounded-none hover:bg-background/90 transition-all duration-300 group text-sm"
            >
              Start a Project
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-background/20 to-transparent"></div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/50">
            <p>© {currentYear} WNF Studio | Architecture & Interior Design</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-background transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-background transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
