import ContactPage from "./ContactPage";
import PageIntroWrapper from "@/components/shared/PageIntroWrapper";

export const metadata = {
  title: "Contact Us | WNF Studio - Get in Touch",
  description:
    "Ready to start your project? Contact WNF Studio to discuss your architecture and interior design needs.",
};

export default function Page() {
  return (
    <PageIntroWrapper type="contact">
      <ContactPage />
    </PageIntroWrapper>
  );
}
