"use client";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-400 font-sans border-t border-stone-800">
      <div className="w-full my-container">
        
        {/* TOP BAR */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-12 gap-10 border-b border-stone-800/50">
          
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="text-3xl font-light text-stone-100 tracking-tight hover:opacity-80 transition-opacity">
              WNF Studio
            </Link>
            <p className="text-md font-light text-stone-500 max-w-xs leading-relaxed">
              Creating timeless spaces that inspire through innovative architecture and interior design.
            </p>
          </div>
          
          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 text-[16px] md:text-[18px] font-mono uppercase tracking-widest text-stone-300">
            <a href="mailto:info@wnfdesignstudio.com" className="hover:text-white transition-colors flex items-center gap-3 group">
              <Mail size={18} className="text-stone-500 group-hover:text-white transition-colors" />
              <span>info@wnfdesignstudio.com</span>
            </a>
            <a href="tel:+918530070800" className="hover:text-white transition-colors flex items-center gap-3 group">
              <Phone size={18} className="text-stone-500 group-hover:text-white transition-colors" />
              <span>+91 8530070800</span>
            </a>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-stone-900 px-8 py-4 text-[16px] md:text-[18px] font-mono uppercase tracking-widest hover:bg-stone-200 transition-all group shadow-lg"
          >
            Start a Project
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 text-[14px] md:text-[16px] font-mono uppercase tracking-wider gap-8">
          
          {/* Copyright */}
          <div className="flex items-center gap-3">
            <span className="text-stone-300">© {currentYear} WNF STUDIO</span>
            <span className="w-1 h-1 rounded-full bg-stone-700 hidden sm:block"></span>
            <span className="text-stone-600">BASED IN INDIA</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-8">
            <a
              href="https://www.instagram.com/studio_wnf/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} className="text-stone-500 group-hover:text-[#E4405F] transition-colors" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <a
              href="https://wa.me/918530070800"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} className="text-stone-500 group-hover:text-[#25D366] transition-colors" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;