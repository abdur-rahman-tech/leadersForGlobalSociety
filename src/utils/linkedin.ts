export function linkedinHref(value?: string): string | undefined {
    if (!value) return undefined;

    try {
        const url = new URL(value);
        const isLinkedIn = url.hostname === "linkedin.com" || url.hostname.endsWith(".linkedin.com");
        return url.protocol === "https:" && isLinkedIn ? url.href : undefined;
    } catch {
        return undefined;
    }
}