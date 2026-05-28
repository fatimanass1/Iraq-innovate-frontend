import { ProjectDetailsScreen } from "@/features/dashboard/projects/components/screens/ProjectDetailsScreen";

type ProjectDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { id } = await params;
  return <ProjectDetailsScreen projectId={id} />;
}
