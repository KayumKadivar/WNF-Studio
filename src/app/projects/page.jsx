import ProjectsPage from "./ProjectsPage";
import PageIntroWrapper from "@/components/shared/PageIntroWrapper";

export const metadata = {
  title: "Projects | WNF Studio - Architecture & Interior Design Portfolio",
  description: "Explore our portfolio of award-winning architecture and interior design projects. Residential, commercial, and luxury design work.",
};

export default function Page() {
  return (
    <PageIntroWrapper type="projects">
      <ProjectsPage />
    </PageIntroWrapper>
  );
}
