import AboutPage from "./AboutPage";
import PageIntroWrapper from "@/components/shared/PageIntroWrapper";

export const metadata = {
  title: "About Us | WNF Studio - Architecture & Interior Design",
  description:
    "Learn about WNF Studio's journey, our award-winning team, and our commitment to exceptional architecture and interior design.",
};

export default function Page() {
  return (
    <PageIntroWrapper type="about">
      <AboutPage />
    </PageIntroWrapper>
  );
}
