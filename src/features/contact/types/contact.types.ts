import type { ContactFormValues } from "../validation/contact.schema";

export type { ContactFormValues };

export interface ContactSubmission extends ContactFormValues {
  id?: string;
  submittedAt?: string;
}
