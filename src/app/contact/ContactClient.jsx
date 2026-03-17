"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Loader2, ArrowRight } from "lucide-react";

export default function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      const formData = new FormData(e.target);
      formData.append("access_key", "045cbef3-3627-4966-8584-d273a2bced1f");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        formRef.current.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Back to the original elegant Light Theme (#F9F8F6 background, stone colors)
    <div className="bg-[#F9F8F6] text-stone-900 min-h-screen font-sans selection:bg-stone-200 selection:text-stone-900">

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-16 px-6 lg:px-12 border-b border-stone-200 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[14px] font-mono uppercase tracking-widest text-stone-500 mb-6 block font-medium"
          >
            // Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="display-title-responsive"
          >
            Let's Create Something <br className="hidden md:block" /> Extraordinary.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-stone-600 font-light max-w-2xl mx-auto leading-relaxed"
          >
            We'd love to hear about your project. Reach out to start the conversation and explore what's possible.
          </motion.p>
        </div>
      </section>

      {/* 2. MAIN CONTENT SPLIT */}
      <section className="py-24 px-6 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* LEFT COLUMN: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="bg-white p-8 md:p-12 border border-stone-200 shadow-sm h-full">
                <h2 className="text-3xl font-light text-stone-900 mb-8 border-b border-stone-200 pb-4">
                  Send a Message
                </h2>

                {/* Architectural Status Messages */}
                {status === "success" && (
                  <div className="mb-8 p-4 bg-stone-50 border border-stone-200 text-stone-800 text-sm font-light flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-green-500"></span>
                    Message sent successfully. We will be in touch shortly.
                  </div>
                )}
                {status === "error" && (
                  <div className="mb-8 p-4 bg-stone-50 border border-stone-200 text-stone-800 text-sm font-light flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-red-500"></span>
                    Failed to send. Please email us directly at info@wnfdesignstudio.com.
                  </div>
                )}

                <form ref={formRef} id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[14px] font-mono uppercase tracking-widest text-stone-500">Name</label>
                      <input id="name" name="name" placeholder="John Doe" className="w-full h-12 px-4 bg-[#F9F8F6] border border-stone-200 rounded-none focus:outline-none focus:border-stone-900 transition-colors disabled:opacity-50 text-stone-900 font-light" required disabled={isSubmitting} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[14px] font-mono uppercase tracking-widest text-stone-500">Email</label>
                      <input id="email" name="email" type="email" placeholder="john@example.com" className="w-full h-12 px-4 bg-[#F9F8F6] border border-stone-200 rounded-none focus:outline-none focus:border-stone-900 transition-colors disabled:opacity-50 text-stone-900 font-light" required disabled={isSubmitting} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-[14px] font-mono uppercase tracking-widest text-stone-500">Phone</label>
                    <input id="phone" name="phone" placeholder="+91 00000 00000" className="w-full h-12 px-4 bg-[#F9F8F6] border border-stone-200 rounded-none focus:outline-none focus:border-stone-900 transition-colors disabled:opacity-50 text-stone-900 font-light" disabled={isSubmitting} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[14px] font-mono uppercase tracking-widest text-stone-500">Message</label>
                    <textarea id="message" name="message" placeholder="Tell us about your project..." className="w-full min-h-[160px] p-4 bg-[#F9F8F6] border border-stone-200 rounded-none focus:outline-none focus:border-stone-900 transition-colors disabled:opacity-50 text-stone-900 font-light resize-none" required disabled={isSubmitting} />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto mt-4 inline-flex items-center justify-center gap-3 bg-stone-900 text-white px-10 py-4 text-[14px] font-mono uppercase tracking-widest hover:bg-stone-800 transition-colors disabled:opacity-70 group rounded-none"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      <>Send Message <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Contact Details & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 flex flex-col h-full"
            >
              <div className="bg-white p-8 md:p-12 border border-stone-200 shadow-sm flex flex-col h-full">
                <h2 className="text-3xl font-light text-stone-900 mb-8 border-b border-stone-200 pb-4">
                  Studio Details
                </h2>

                <div className="space-y-8 flex-grow">
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 shrink-0 border border-stone-200 flex items-center justify-center text-stone-400 group-hover:border-stone-900 group-hover:text-stone-900 transition-colors">
                      <MapPin size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-mono uppercase tracking-widest text-stone-500 mb-2">Location</h3>
                      <p className="text-stone-600 font-light leading-relaxed">
                        2007, 20th Floor, Wings Business Bay,<br />
                        Nr. ITC Fortune Hotel, 150 Feet Ring Road,<br />
                        Rajkot, Gujarat - 360004
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 shrink-0 border border-stone-200 flex items-center justify-center text-stone-400 group-hover:border-stone-900 group-hover:text-stone-900 transition-colors">
                      <Mail size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-mono uppercase tracking-widest text-stone-500 mb-2">Email</h3>
                      <a href="mailto:info@wnfdesignstudio.com" className="text-stone-900 hover:text-stone-500 transition-colors font-light">
                        info@wnfdesignstudio.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 shrink-0 border border-stone-200 flex items-center justify-center text-stone-400 group-hover:border-stone-900 group-hover:text-stone-900 transition-colors">
                      <Phone size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-mono uppercase tracking-widest text-stone-500 mb-2">Phone</h3>
                      <a href="tel:+918530070800" className="text-stone-900 hover:text-stone-500 transition-colors font-light">
                        +91 8530070800
                      </a>
                    </div>
                  </div>
                </div>

                {/* Sharp Edge Map Container */}
                <div className="mt-12 h-[200px] border border-stone-200 bg-stone-100 p-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169073858063!2d70.77542731495468!3d22.29367384843929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cb0b01b9ff01%3A0x0!2s150%20Feet%20Ring%20Road%2C%20Rajkot!5e0!3m2!1sen!2sin!4v1703858400000!5m2!1sen!2sin"
                    width="100%" height="100%" style={{ border: 0 }}
                    allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Studio WnF Location"
                    className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700 object-cover"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}