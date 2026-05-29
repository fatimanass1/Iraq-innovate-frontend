"use client";

import { useCallback, useMemo, useState } from "react";
import type {
  SubmitProjectStep,
  SubmitProjectWizardState,
  TeamMemberDraft,
} from "../types/wizard.types";
import { INITIAL_SUBMIT_PROJECT_STATE } from "../types/wizard.types";

const TOTAL_STEPS = 5;

export function useSubmitProjectWizard(defaultOwnerName = "") {
  const [step, setStep] = useState<SubmitProjectStep>(1);
  const [form, setForm] = useState<SubmitProjectWizardState>(() => ({
    ...INITIAL_SUBMIT_PROJECT_STATE,
    ownerName: defaultOwnerName,
  }));

  const progressPercent = useMemo(
    () => Math.round(((step - 1) / TOTAL_STEPS) * 100),
    [step],
  );

  const updateField = useCallback(
    <K extends keyof SubmitProjectWizardState>(
      key: K,
      value: SubmitProjectWizardState[K],
    ) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setCategory = useCallback((categoryId: number | null, categoryName: string | null) => {
    setForm((prev) => ({ ...prev, categoryId, categoryName }));
  }, []);

  const addTeamMember = useCallback((member: Omit<TeamMemberDraft, "id">) => {
    setForm((prev) => ({
      ...prev,
      teamMembers: [
        ...prev.teamMembers,
        { ...member, id: crypto.randomUUID() },
      ],
    }));
  }, []);

  const removeTeamMember = useCallback((id: string) => {
    setForm((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((member) => member.id !== id),
    }));
  }, []);

  const updateTeamMember = useCallback(
    (id: string, patch: Partial<Omit<TeamMemberDraft, "id">>) => {
      setForm((prev) => ({
        ...prev,
        teamMembers: prev.teamMembers.map((member) =>
          member.id === id ? { ...member, ...patch } : member,
        ),
      }));
    },
    [],
  );

  const goNext = useCallback(() => {
    setStep((current) => (current < TOTAL_STEPS ? ((current + 1) as SubmitProjectStep) : current));
  }, []);

  const goBack = useCallback(() => {
    setStep((current) => (current > 1 ? ((current - 1) as SubmitProjectStep) : current));
  }, []);

  const goToStep = useCallback((target: SubmitProjectStep) => {
    setStep(target);
  }, []);

  const canGoBack = step > 1;

  return {
    step,
    form,
    progressPercent,
    updateField,
    setCategory,
    addTeamMember,
    removeTeamMember,
    updateTeamMember,
    goNext,
    goBack,
    goToStep,
    canGoBack,
    totalSteps: TOTAL_STEPS,
  };
}
