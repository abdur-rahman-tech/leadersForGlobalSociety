const CONTACT_EMAIL = "leadersforglobalsociety@gmail.com";

export function emailDraftHref(subject: string, body: string): string {
    const query = new URLSearchParams({ subject, body });
    return `mailto:${CONTACT_EMAIL}?${query.toString()}`;
}