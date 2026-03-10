"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import PageHero from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      const serviceID = "YOUR_SERVICE_ID";
      const templateID = "YOUR_TEMPLATE_ID";
      const publicKey = "YOUR_PUBLIC_KEY";
      await emailjs.sendForm(serviceID, templateID, formRef.current, publicKey);
      setStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero label="Get in Touch" title="Let's Create Something Extraordinary" description="We'd love to hear about your project. Reach out to start the conversation." />

      <section className="section-padding bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="heading-sm mb-8">Send Us a Message</h2>
              {status === "success" && <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-md">Message sent! We'll get back to you shortly.</div>}
              {status === "error" && <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md">Failed to send. Please email us directly at info@wnfdesignstudio.com</div>}
              <form ref={formRef} id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input id="name" name="name" placeholder="Your Name" className="h-12 bg-secondary border-0" required disabled={isSubmitting} />
                  <Input id="email" name="email" type="email" placeholder="Email Address" className="h-12 bg-secondary border-0" required disabled={isSubmitting} />
                </div>
                <Input id="phone" name="phone" placeholder="Phone Number" className="h-12 bg-secondary border-0" disabled={isSubmitting} />
                <Textarea id="message" name="message" placeholder="Tell us about your project..." className="min-h-[150px] bg-secondary border-0" required disabled={isSubmitting} />
                <Button type="submit" variant="elegant" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>) : "Send Message"}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h2 className="heading-sm mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Studio Address</h3>
                    <p className="text-muted-foreground">2007, 20th Floor, Wings Business Bay,<br />Nr. ITC Fortune Hotel, 150 Feet Ring Road,<br />Rajkot, Gujarat - 360004</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a href="mailto:info@wnfdesignstudio.com" className="text-muted-foreground hover:text-primary transition-colors">info@wnfdesignstudio.com</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <a href="tel:+918530070800" className="text-muted-foreground hover:text-primary transition-colors">+91 8530070800</a>
                  </div>
                </div>
              </div>
              <div className="mt-12 h-[300px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169073858063!2d70.77542731495468!3d22.29367384843929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cb0b01b9ff01%3A0x0!2s150%20Feet%20Ring%20Road%2C%20Rajkot!5e0!3m2!1sen!2sin!4v1703858400000!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Studio WnF Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
