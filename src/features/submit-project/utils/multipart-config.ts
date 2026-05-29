import type { AxiosRequestConfig } from "axios";

/** Ensures FormData posts as multipart (not JSON) and lets the browser set the boundary. */
export function multipartFormConfig(): AxiosRequestConfig {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    transformRequest: [
      (data, headers) => {
        if (data instanceof FormData && headers) {
          delete headers["Content-Type"];
        }
        return data;
      },
    ],
  };
}
