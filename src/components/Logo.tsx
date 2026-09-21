import { cn } from "@/utils/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-10 w-10", className)} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#ffffff" stroke="#e0242e" strokeWidth="3" />
      <circle cx="24" cy="24" r="17.5" fill="none" stroke="#102c5c" strokeWidth="1.6" />
      {/* globe meridians */}
      <ellipse cx="24" cy="24" rx="8" ry="17.5" fill="none" stroke="#102c5c" strokeWidth="1.1" />
      <line x1="6.5" y1="24" x2="41.5" y2="24" stroke="#102c5c" strokeWidth="1.1" />
      {/* flag */}
      <line x1="21" y1="12" x2="21" y2="34" stroke="#e0242e" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M22.2 12.5h11.5l-3.2 4 3.2 4H22.2z" fill="#e0242e" />
    </svg>
  );
}

export function LogoText({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-[11px] font-extrabold uppercase leading-[1.15] tracking-wide",
        dark ? "text-white" : "text-navy-900",
        className
      )}
    >
      Leaders
      <br />
      <span className="text-brand-red">For Global</span>
      <br />
      Society
    </span>
  );
}

export default function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <LogoText dark={dark} />
    </span>
  );
}
