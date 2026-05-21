"use client";

import { Button } from "@/components/ui";
import { FormField, TextInput } from "@/components/forms";
import { useContactForm } from "../hooks/use-contact-form";

export function ContactForm() {
  const { form, onSubmit, isSubmitting } = useContactForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" htmlFor="name" error={errors.name?.message}>
          <TextInput id="name" placeholder="Your name" {...register("name")} />
        </FormField>
        <FormField label="Email" htmlFor="email" error={errors.email?.message}>
          <TextInput
            id="email"
            type="email"
            placeholder="you@company.com"
            {...register("email")}
          />
        </FormField>
      </div>
      <FormField label="Company" htmlFor="company" error={errors.company?.message}>
        <TextInput id="company" placeholder="Company (optional)" {...register("company")} />
      </FormField>
      <FormField label="Message" htmlFor="message" error={errors.message?.message}>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your project..."
          className="flex w-full rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-ring"
          {...register("message")}
        />
      </FormField>
      <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full sm:w-auto">
        Send Message
      </Button>
    </form>
  );
}
