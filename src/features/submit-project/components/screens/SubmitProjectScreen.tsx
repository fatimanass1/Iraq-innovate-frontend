"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { useCallback, useState } from "react";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/utils/utils";
import { useDashboardUser } from "@/features/auth/hooks/useDashboardUser";
import {
  SUBMIT_PROJECT_ACTIONS,
  SUBMIT_PROJECT_STEP_CONTENT,
} from "../../constants/submit-project-content";
import { SUBMIT_PROJECT_THEME as T } from "../../constants/submit-project-theme";
import { useProjectMediaTypes } from "../../hooks/useProjectMediaTypes";
import { useSubmitProjectMutation } from "../../hooks/useSubmitProjectMutation";
import { useSubmitProjectWizard } from "../../hooks/useSubmitProjectWizard";
import { useSubmitWizardValidation } from "../../hooks/useSubmitWizardValidation";
import { submitCairo, submitMono, submitOutfit } from "../../utils/fonts";
import { validationFieldId } from "../../utils/validation";
import { SubmitProjectActions } from "../SubmitProjectActions";
import { SubmitProjectSidebar } from "../SubmitProjectSidebar";
import { MediaUploadStep } from "../steps/MediaUploadStep";
import { OwnerInfoStep } from "../steps/OwnerInfoStep";
import { ProjectInfoStep } from "../steps/ProjectInfoStep";
import { ReviewSubmitStep } from "../steps/ReviewSubmitStep";
import { TeamMembersStep } from "../steps/TeamMembersStep";
import { SubmitSuccessStep } from "../submit/success/SubmitSuccessStep";

export function SubmitProjectScreen() {
  const navbarUser = useDashboardUser();
  const defaultOwnerName =
    navbarUser.name && navbarUser.name !== "Guest" ? navbarUser.name : "";

  const {
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
  } = useSubmitProjectWizard(defaultOwnerName);

  const { data: mediaTypes = [] } = useProjectMediaTypes();
  const stepContent = SUBMIT_PROJECT_STEP_CONTENT[step];
  const [submittedProjectId, setSubmittedProjectId] = useState<number | null>(null);
  const isSuccess = submittedProjectId != null;

  const {
    step1Errors,
    step2Errors,
    step3Errors,
    step4Errors,
    touchField,
    shouldShowFieldFeedback,
    validateCurrentStep,
    validateBeforeSubmit,
    revalidateField,
    clearResolvedFieldErrors,
    setStep2Errors,
  } = useSubmitWizardValidation({ form, step, mediaTypes });

  const submitMutation = useSubmitProjectMutation();

  const handleFieldBlur = useCallback(
    (fieldId: string) => {
      touchField(fieldId);
      revalidateField(step);
    },
    [revalidateField, step, touchField],
  );

  const handleFieldChange = useCallback(() => {
    clearResolvedFieldErrors(step);
  }, [clearResolvedFieldErrors, step]);

  const handleContinue = () => {
    if (step === 5) {
      const result = validateBeforeSubmit();
      if (!result.ok) {
        if (result.firstInvalidStep) {
          goToStep(result.firstInvalidStep);
        }
        return;
      }

      submitMutation.mutate(form, {
        onSuccess: (project) => {
          setSubmittedProjectId(project.id);
        },
      });
      return;
    }

    if (!validateCurrentStep()) return;
    goNext();
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col lg:flex-row"
      style={{ backgroundColor: T.pageBg }}
    >
      <SubmitProjectSidebar
        currentStep={step}
        progressPercent={progressPercent}
        isSuccess={isSuccess}
      />

      <main className="relative flex flex-1 flex-col">
        {!isSuccess ? (
          <Link
            href={ROUTES.HOME}
            aria-label={SUBMIT_PROJECT_ACTIONS.homeAria}
            className="absolute end-6 top-6 z-10 flex size-10 items-center justify-center rounded-2xl bg-white/80 transition-opacity hover:opacity-80 lg:end-12 lg:top-10"
            style={{ boxShadow: T.inputRing }}
          >
            <Home className="size-6 text-[rgba(1,11,24,0.7)]" />
          </Link>
        ) : null}

        <div className="mx-auto flex w-full flex-1 flex-col items-center px-6 pb-10 pt-16 sm:px-10 lg:max-w-none lg:px-12 lg:pb-12 lg:pt-10">
          <div
            className="flex w-full flex-col items-center"
            style={{ gap: T.contentGap, maxWidth: T.contentMaxWidth }}
          >
            {isSuccess ? (
              <SubmitSuccessStep projectId={submittedProjectId} />
            ) : (
              <>
                <header className="w-full">
                  <p
                    className={cn(
                      submitMono.className,
                      "text-[10px] font-bold uppercase tracking-[0.22em]",
                    )}
                    style={{ color: T.stepLabel }}
                  >
                    {stepContent.stepLabel}
                  </p>
                  <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <h2
                      className={cn(
                        submitOutfit.className,
                        "text-[26px] font-extrabold leading-[32.5px]",
                      )}
                      style={{ color: T.titleEn }}
                    >
                      {stepContent.titleEn}
                    </h2>
                    <p
                      className={cn(submitCairo.className, "text-[14px] leading-5")}
                      style={{ color: T.titleAr }}
                      dir="rtl"
                    >
                      {stepContent.titleAr}
                    </p>
                  </div>
                </header>

                {step === 1 ? (
                  <ProjectInfoStep
                    form={form}
                    errors={step1Errors}
                    shouldShowFieldFeedback={shouldShowFieldFeedback}
                    onChange={updateField}
                    onCategoryChange={setCategory}
                    onFieldBlur={handleFieldBlur}
                    onFieldChange={handleFieldChange}
                  />
                ) : null}
                {step === 2 ? (
                  <MediaUploadStep
                    form={form}
                    errors={step2Errors}
                    shouldShowFieldFeedback={shouldShowFieldFeedback}
                    onChange={updateField}
                    onMediaValidated={handleFieldChange}
                    onFileRejected={(message) => {
                      touchField(validationFieldId(2, "media"));
                      setStep2Errors({ media: message });
                    }}
                  />
                ) : null}
                {step === 3 ? (
                  <OwnerInfoStep
                    form={form}
                    errors={step3Errors}
                    shouldShowFieldFeedback={shouldShowFieldFeedback}
                    onChange={updateField}
                    onFieldBlur={handleFieldBlur}
                    onFieldChange={handleFieldChange}
                  />
                ) : null}
                {step === 4 ? (
                  <TeamMembersStep
                    form={form}
                    errors={step4Errors}
                    shouldShowFieldFeedback={shouldShowFieldFeedback}
                    onAdd={addTeamMember}
                    onUpdate={updateTeamMember}
                    onRemove={removeTeamMember}
                    onToggleEnabled={(enabled) => {
                      updateField("addTeamMembersEnabled", enabled);
                      handleFieldChange();
                    }}
                    onFieldBlur={handleFieldBlur}
                    onFieldChange={handleFieldChange}
                  />
                ) : null}
                {step === 5 ? (
                  <ReviewSubmitStep form={form} onEditStep={goToStep} />
                ) : null}

                <SubmitProjectActions
                  canGoBack={canGoBack}
                  onBack={goBack}
                  onContinue={handleContinue}
                  continueLabel={
                    step === 5
                      ? SUBMIT_PROJECT_ACTIONS.submit
                      : SUBMIT_PROJECT_ACTIONS.continue
                  }
                  isLoading={submitMutation.isPending}
                  continueDisabled={step === 5 && submitMutation.isPending}
                  variant={step === 5 ? "review" : "default"}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
