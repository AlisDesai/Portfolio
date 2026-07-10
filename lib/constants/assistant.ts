/** Fired on `window` by the Contact form while a field is focused, so the
 * globally rendered FloatingAssistant (a sibling in app/layout.tsx, outside
 * the page tree) can react without needing shared global state. */
export const CONTACT_FORM_FOCUS_EVENT = "contact-form-focus";

export interface ContactFormFocusEventDetail {
  active: boolean;
}
