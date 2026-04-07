import ServicesPage from "./ServicesPage";
import PageIntroWrapper from "@/components/shared/PageIntroWrapper";

export const metadata = {
  title: "Services | WNF Studio - Architecture & Interior Design",
  description:
    "Comprehensive design solutions tailored to bring your vision to life. Architecture, interior design, renovation, and project management.",
};

export default function Page() {
  return (
    <PageIntroWrapper type="services">
      <ServicesPage />
    </PageIntroWrapper>
  );
}