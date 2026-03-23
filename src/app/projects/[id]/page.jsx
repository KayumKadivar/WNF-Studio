import { projects } from "@/data/projects";
import ProjectDetailPage from "./ProjectDetailPage";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === Number(id));
  if (!project) return { title: "Project Not Found | WNF Studio" };
  return {
    title: `${project.title} | WNF Studio`,
    description: project.description?.substring(0, 160) || "WNF Studio architectural project.",
    openGraph: {
      title: `${project.title} | WNF Studio`,
      description: project.description?.substring(0, 160),
      images: [{ url: project.mainImage }],
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === Number(id));
  if (!project) notFound();
  return <ProjectDetailPage project={project} allProjects={projects} />;
}
