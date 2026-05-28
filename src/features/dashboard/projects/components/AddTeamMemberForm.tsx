"use client";

import { useState } from "react";
import { cn } from "@/shared/utils/utils";
import { cairo } from "@/features/dashboard/fonts";
import { PROJECTS_CONTENT, TEAM_MEMBER_FIELDS } from "../constants/projects-content";
import { useAddTeamMember } from "../hooks/useAddTeamMember";

type AddTeamMemberFormProps = {
  projectId: string;
};

export function AddTeamMemberForm({ projectId }: AddTeamMemberFormProps) {
  const mutation = useAddTeamMember(projectId);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [college, setCollege] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [certificate, setCertificate] = useState<File | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutation.mutate(
      {
        name,
        role: role || undefined,
        college: college || undefined,
        birthdate: birthdate || undefined,
        linkedin_url: linkedinUrl || undefined,
        graduate_certificate: certificate ?? undefined,
      },
      {
        onSuccess: () => {
          setName("");
          setRole("");
          setCollege("");
          setBirthdate("");
          setLinkedinUrl("");
          setCertificate(null);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <h3 className={cn(cairo.className, "md:col-span-2 text-[14px] font-bold text-[#010B18]")}>
        {PROJECTS_CONTENT.addTeamMember}
      </h3>

      <Field label={TEAM_MEMBER_FIELDS.name} required>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className={inputClassName}
        />
      </Field>

      <Field label={TEAM_MEMBER_FIELDS.role}>
        <input value={role} onChange={(event) => setRole(event.target.value)} className={inputClassName} />
      </Field>

      <Field label={TEAM_MEMBER_FIELDS.college}>
        <input value={college} onChange={(event) => setCollege(event.target.value)} className={inputClassName} />
      </Field>

      <Field label={TEAM_MEMBER_FIELDS.birthdate}>
        <input
          type="date"
          value={birthdate}
          onChange={(event) => setBirthdate(event.target.value)}
          className={inputClassName}
        />
      </Field>

      <Field label={TEAM_MEMBER_FIELDS.linkedin}>
        <input
          type="url"
          value={linkedinUrl}
          onChange={(event) => setLinkedinUrl(event.target.value)}
          className={inputClassName}
        />
      </Field>

      <Field label={TEAM_MEMBER_FIELDS.certificate} className="md:col-span-2">
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(event) => setCertificate(event.target.files?.[0] ?? null)}
          className={fileInputClassName}
        />
      </Field>

      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          disabled={mutation.isPending}
          className={cn(
            cairo.className,
            "inline-flex h-10 items-center justify-center rounded-full bg-[#A8CF45] px-6 text-[13px] font-semibold text-[#010B18]",
            "transition-opacity disabled:opacity-60",
          )}
        >
          {mutation.isPending ? "جاري الإضافة..." : TEAM_MEMBER_FIELDS.submit}
        </button>
      </div>
    </form>
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
    <label className={cn("block text-end", className)} dir="rtl">
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
