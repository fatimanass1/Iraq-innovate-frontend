import { Section } from "@/components/ui";
import { CONTACT_SECTION_CONTENT } from "../constants/contact.constants";
import { ContactForm } from "../components/ContactForm";

export function ContactSection() {
  return (
    <Section id="contact" className="bg-muted/30">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="heading-section mb-4">{CONTACT_SECTION_CONTENT.title}</h2>
          <p className="text-body">{CONTACT_SECTION_CONTENT.description}</p>
        </div>
        <div className="surface-card p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
