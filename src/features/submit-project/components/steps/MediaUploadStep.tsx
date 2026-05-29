"use client";

import { useCallback } from "react";
import { MEDIA_UPLOAD_ACCEPT, MEDIA_UPLOAD_THEME as M } from "../../constants/media-upload";
import { useProjectMediaTypes } from "../../hooks/useProjectMediaTypes";
import {
  createMediaTypeResolver,
  useMediaUpload,
} from "../../hooks/useMediaUpload";
import type { BilingualMessage, MediaStepErrors } from "../../types/validation.types";
import type { SubmitProjectWizardState } from "../../types/wizard.types";
import { validationFieldId, visibleStepError } from "../../utils/validation";
import { FieldValidationMessage } from "../FieldValidationMessage";
import { MediaDropzone } from "../submit/media/MediaDropzone";
import { MediaPreviewGrid } from "../submit/media/MediaPreviewGrid";

type MediaUploadStepProps = {
  form: SubmitProjectWizardState;
  errors?: MediaStepErrors;
  shouldShowFieldFeedback: (fieldId: string, step: 1 | 2 | 3 | 4 | 5) => boolean;
  onChange: <K extends keyof SubmitProjectWizardState>(
    key: K,
    value: SubmitProjectWizardState[K],
  ) => void;
  onMediaValidated?: () => void;
  onFileRejected?: (message: BilingualMessage) => void;
};

export function MediaUploadStep({
  form,
  errors,
  shouldShowFieldFeedback,
  onChange,
  onMediaValidated,
  onFileRejected,
}: MediaUploadStepProps) {
  const { data: mediaTypes = [] } = useProjectMediaTypes();
  const resolveMediaTypeIdForKind = useCallback(
    createMediaTypeResolver(mediaTypes),
    [mediaTypes],
  );

  const {
    inputRef,
    entries,
    hasUploads,
    isDragging,
    isProcessing,
    openFilePicker,
    removeFile,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleInputChange,
  } = useMediaUpload({
    mediaItems: form.mediaItems,
    onMediaChange: (items) => {
      onChange("mediaItems", items);
      onMediaValidated?.();
    },
    resolveMediaTypeIdForKind,
    mediaTypes,
    onFileRejected,
  });

  const mediaFieldId = validationFieldId(2, "media");
  const visibleMediaError = visibleStepError(
    errors?.media,
    mediaFieldId,
    2,
    shouldShowFieldFeedback,
  );
  const hasError = Boolean(visibleMediaError);

  return (
    <div className="flex w-full max-w-[444px] flex-col">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={MEDIA_UPLOAD_ACCEPT}
        className="sr-only"
        onChange={handleInputChange}
      />

      <div
        id={mediaFieldId}
        className="flex w-full flex-col"
        style={{ gap: hasUploads ? M.uploadZoneGap : 0 }}
      >
        <MediaDropzone
          isDragging={isDragging}
          isProcessing={isProcessing}
          hasUploads={hasUploads}
          hasError={hasError}
          onBrowse={openFilePicker}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />

        <MediaPreviewGrid
          entries={entries}
          onRemove={removeFile}
          onAddMore={openFilePicker}
        />
      </div>

      {visibleMediaError ? <FieldValidationMessage message={visibleMediaError} /> : null}
    </div>
  );
}
