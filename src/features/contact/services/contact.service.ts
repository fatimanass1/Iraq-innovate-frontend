import { ENDPOINTS } from "@/api/core/endpoints";
import { publicClient } from "@/api/client/public";
import type { ApiResponse } from "@/api/core/types";
import type { ContactFormValues } from "../validation/contact.schema";

export const contactService = {
  async submit(payload: ContactFormValues): Promise<{ success: boolean }> {
    const { data } = await publicClient.post<ApiResponse<{ success: boolean }>>(
      ENDPOINTS.CONTACT.SUBMIT,
      payload,
    );
    return data.data;
  },
};
