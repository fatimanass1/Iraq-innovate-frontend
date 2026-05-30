import { redirect } from "next/navigation";

type LegacyReviewRouteProps = {
  params: Promise<{ id: string }>;
};

/** Legacy `/admin/projects/review/[id]` → canonical `/admin/projects/[id]`. */
export default async function LegacyAdminProjectReviewRedirect({
  params,
}: LegacyReviewRouteProps) {
  const { id } = await params;
  redirect(`/admin/projects/${id}`);
}
