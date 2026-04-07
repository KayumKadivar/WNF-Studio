"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/studio_wnf/" },
    { label: "LinkedIn", href: "#" },
    { label: "Facebook", href: "#" },
  ];

  return (
    // Stark dark background to anchor the light theme pages
    <footer className="bg-stone-900 text-stone-400 font-sans">
      <div className="w-full px-3 lg:px-10 py-10">
        
        {/* TOP BAR: Reduced padding to py-10 to save height */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-10 gap-8 border-b border-stone-800">
          
          {/* Brand */}
          <div>
            <Link href="/" className="text-3xl font-light text-stone-100 tracking-tight hover:opacity-80 transition-opacity">
              WNF Studio
            </Link>
            <p className="mt-2 text-md font-light text-stone-500 max-w-xs">
              Creating timeless spaces that inspire.
            </p>
          </div>
          
          {/* Quick Contact (Horizontal alignment saves vertical space) */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-[18px] font-mono uppercase tracking-widest text-stone-300">
            <a href="mailto:info@wnfdesignstudio.com" title="Send us an email" className="hover:text-white transition-colors flex items-center gap-2">
              info@wnfdesignstudio.com
            </a>
            <a href="tel:+918530070800" title="Call us" className="hover:text-white transition-colors flex items-center gap-2">
              +91 8530070800
            </a>
          </div>

          {/* Sharp, Minimalist CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-stone-900 px-6 py-3 text-[18px] font-mono uppercase tracking-widest hover:bg-stone-200 transition-colors group"
          >
            Start a Project
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

        </div>

        {/* BOTTOM BAR: Meta links and Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 text-[18px] font-mono uppercase tracking-widest gap-4">
          
          {/* Copyright & Location */}
          <div className="flex gap-2">
            <span>© {currentYear} WNF.</span>
            <span className="text-stone-600">Based in India.</span>
          </div>

          {/* Social Links (Text based is more compact and premium than large icons) */}
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${social.label}`}
                className="hover:text-white transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;