import { z } from "zod";

/** Schema for the landing page's "Let's Collaborate" quick-capture form --
 * deliberately separate from ContactFormSchema (lib/validators/contact.ts):
 * this form only ever collects a single email field, so it gets its own
 * minimal schema rather than stretching the full inquiry-form schema to fit. */
export const CollaborateFormSchema = z.object({
  email: z.string().trim().toLowerCase().max(254).email("Enter a valid email address."),
});

export type CollaborateFormData = z.infer<typeof CollaborateFormSchema>;
