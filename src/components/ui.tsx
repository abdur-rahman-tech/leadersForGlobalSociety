import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

/* ---------- Buttons ---------- */

type BtnProps = {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "red" | "navy" | "outline" | "white-outline" | "white";
  size?: "sm" | "md";
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
};

export function Btn({
  to,
  href,
  children,
  variant = "red",
  size = "md",
  arrow = false,
  className,
  onClick,
}: BtnProps) {
  const classes = cn(
    "group/btn inline-flex items-center justify-center gap-2 rounded-md font-display font-semibold transition-all duration-300",
    size === "sm" ? "px-4 py-2 text-[13px]" : "px-6 py-3 text-sm",
    variant === "red" &&
      "bg-brand-red text-white shadow-md shadow-brand-red/25 hover:bg-brand-red-dark hover:shadow-lg hover:shadow-brand-red/30 hover:-translate-y-0.5",
    variant === "navy" &&
      "bg-navy-800 text-white shadow-md shadow-navy-900/20 hover:bg-navy-900 hover:-translate-y-0.5",
    variant === "outline" &&
      "border-2 border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white hover:-translate-y-0.5",
    variant === "white-outline" &&
      "border-2 border-white/80 text-white hover:bg-white hover:text-navy-900 hover:-translate-y-0.5",
    variant === "white" &&
      "bg-white text-navy-900 shadow-md hover:bg-navy-50 hover:-translate-y-0.5",
    className
  );
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      )}
    </>
  );
  if (to)
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {inner}
      </Link>
    );
  return (
    <a href={href ?? "#"} className={classes} onClick={onClick}>
      {inner}
    </a>
  );
}

/* ---------- Section heading ---------- */

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="mb-1.5 font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-2xl font-bold sm:text-3xl",
          dark ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-2 max-w-2xl text-sm sm:text-base", dark ? "text-navy-100/80" : "text-slate-600", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ---------- Breadcrumb ---------- */

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-navy-100/70">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3 w-3 text-navy-100/50" />}
          {item.to ? (
            <Link to={item.to} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ---------- Tag / pill badge ---------- */

export function Pill({
  children,
  tone = "blue",
  className,
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "red" | "amber" | "slate" | "purple";
  className?: string;
}) {
  const tones: Record<string, string> = {
    blue: "bg-navy-50 text-navy-700 ring-navy-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    red: "bg-red-50 text-brand-red ring-red-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    slate: "bg-slate-100 text-slate-600 ring-slate-200",
    purple: "bg-violet-50 text-violet-700 ring-violet-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold ring-1",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
