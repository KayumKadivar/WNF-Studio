import Image from "next/image";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import AboutPageClient from "./AboutPageClient";

export const metadata = {
  title: "About Us | WNF Studio - Architecture & Interior Design",
  description:
    "Learn about WNF Studio's journey, our award-winning team, and our commitment to exceptional architecture and interior design.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
