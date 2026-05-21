import { forwardRef } from "react";
import { Input, type InputProps } from "@/components/ui";

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <Input ref={ref} {...props} />;
  },
);

TextInput.displayName = "TextInput";
