"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { useDashboardUser } from "@/features/auth/hooks/useDashboardUser";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { DashboardTopNavbar } from "@/features/dashboard/components/DashboardTopNavbar";
import { cairo } from "@/features/dashboard/fonts";
import { cn } from "@/shared/utils/utils";
import { PROJECTS_CONTENT, SUBMIT_PROJECT_FIELDS } from "../../constants/projects-content";
import { useSubmitProject } from "../../hooks/useSubmitProject";

export function SubmitProjectScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mutation = useSubmitProject();
  const navbarUser = useDashboardUser();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [category, setCategory] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerBirthdate, setOwnerBirthdate] = useState("");
  const [ownerCollege, setOwnerCollege] = useState("");
  const [ownerLinkedin, setOwnerLinkedin] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [ownerCertificate, setOwnerCertificate] = useState<File | null>(null);

  useEffect(() => {
    if (navbarUser.name && navbarUser.name !== "Guest" && !ownerName) {
      setOwnerName(navbarUser.name);
    }
  }, [navbarUser.name, ownerName]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutation.mutate({
      title,
      summary: summary || undefined,
      description: description || undefined,
      website_url: websiteUrl || undefined,
      category: category ? Number(category) : undefined,
      media: mediaFiles.length > 0 ? mediaFiles : undefined,
      owner_name: ownerName,
      owner_birthdate: ownerBirthdate || undefined,
      owner_college: ownerCollege || undefined,
      owner_linkedin_url: ownerLinkedin || undefined,
      owner_graduate_certificate: ownerCertificate ?? undefined,
    });
  };

  return (
    <DashboardShell activeNav="my-projects" sidebarOpen={sidebarOpen} onSidebarClose={() => setSidebarOpen(false)}>
      <DashboardTopNavbar
        user={navbarUser}
        unreadNotifications={0}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuClick={() => setSidebarOpen(true)}
        titleAr={PROJECTS_CONTENT.submitTitle}
        titleEn={PROJECTS_CONTENT.submitSubtitle}
      />

      <div className="mx-auto max-w-[900px] px-4 py-5 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.MY_PROJECTS}
          className={cn(
            cairo.className,
            "inline-flex items-center gap-2 text-[13px] font-semibold text-[rgba(1,11,24,0.55)] transition-colors hover:text-[#010B18]",
          )}
          dir="rtl"
        >
          <ArrowRight className="size-4" aria-hidden="true" />
          {PROJECTS_CONTENT.detailsBack}
        </Link>

        <form
          onSubmit={handleSubmit}
          className="mt-5 rounded-3xl bg-white p-5 shadow-[0_2px_14px_rgba(1,11,24,0.05)]"
          dir="rtl"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label={SUBMIT_PROJECT_FIELDS.title} required className="md:col-span-2">
              <input value={title} onChange={(e) => setTitle(e.target.value)} required className={inputClassName} />
            </Field>

            <Field label={SUBMIT_PROJECT_FIELDS.summary} className="md:col-span-2">
              <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} className={inputClassName} />
            </Field>

            <Field label={SUBMIT_PROJECT_FIELDS.description} className="md:col-span-2">
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={inputClassName} />
            </Field>

            <Field label={SUBMIT_PROJECT_FIELDS.websiteUrl}>
              <input type="url" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} className={inputClassName} />
            </Field>

            <Field label={SUBMIT_PROJECT_FIELDS.category}>
              <input
                type="number"
                min={1}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClassName}
              />
            </Field>

            <Field label={SUBMIT_PROJECT_FIELDS.media} className="md:col-span-2">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setMediaFiles(Array.from(e.target.files ?? []))}
                className={fileInputClassName}
              />
            </Field>

            <Field label={SUBMIT_PROJECT_FIELDS.ownerName} required>
              <input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required className={inputClassName} />
            </Field>

            <Field label={SUBMIT_PROJECT_FIELDS.ownerBirthdate}>
              <input type="date" value={ownerBirthdate} onChange={(e) => setOwnerBirthdate(e.target.value)} className={inputClassName} />
            </Field>

            <Field label={SUBMIT_PROJECT_FIELDS.ownerCollege}>
              <input value={ownerCollege} onChange={(e) => setOwnerCollege(e.target.value)} className={inputClassName} />
            </Field>

            <Field label={SUBMIT_PROJECT_FIELDS.ownerLinkedin}>
              <input type="url" value={ownerLinkedin} onChange={(e) => setOwnerLinkedin(e.target.value)} className={inputClassName} />
            </Field>

            <Field label={SUBMIT_PROJECT_FIELDS.ownerCertificate} className="md:col-span-2">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setOwnerCertificate(e.target.files?.[0] ?? null)}
                className={fileInputClassName}
              />
            </Field>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={mutation.isPending}
              className={cn(
                cairo.className,
                "inline-flex h-10 items-center justify-center rounded-full bg-[#A8CF45] px-6 text-[13px] font-semibold text-[#010B18]",
                "transition-opacity disabled:opacity-60",
              )}
            >
              {mutation.isPending ? "جاري التقديم..." : SUBMIT_PROJECT_FIELDS.submit}
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}

function Field({
  label,
  children,
  required,
  className,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("block text-end", className)}>
      <span className={cn(cairo.className, "mb-1.5 block text-[12px] font-semibold text-[rgba(1,11,24,0.55)]")}>
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}

const inputClassName = cn(
  cairo.className,
  "w-full rounded-2xl border border-[rgba(1,11,24,0.08)] bg-[#F8FAF3] px-4 py-2.5 text-[13px] text-[#010B18] outline-none",
  "focus:border-[#A8CF45]",
);

const fileInputClassName = cn(
  cairo.className,
  "w-full rounded-2xl border border-dashed border-[rgba(1,11,24,0.12)] bg-[#F8FAF3] px-4 py-2.5 text-[12px] text-[rgba(1,11,24,0.55)]",
);
