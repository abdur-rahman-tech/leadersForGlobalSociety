import type { ReactNode } from "react";
import { Breadcrumb } from "./ui";
import Reveal from "./Reveal";
import { cn } from "@/utils/cn";

export default function PageHero({
  image,
  title,
  subtitle,
  crumb,
  children,
  compact = false,
  align = "left",
}: {
  image: string;
  title: string;
  subtitle?: string;
  crumb: string;
  children?: ReactNode;
  compact?: boolean;
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/75 to-navy-900/35" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-red via-brand-red/60 to-transparent" />
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8",
          compact ? "min-h-[300px] py-16" : "min-h-[380px] py-20",
          align === "center" && "items-center text-center"
        )}
      >
        <Reveal>
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: crumb }]} />
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={200}>
            <p className={cn("mt-4 max-w-xl text-base text-navy-100/90 sm:text-lg", align === "center" && "mx-auto")}>
              {subtitle}
            </p>
          </Reveal>
        )}
        {children && <Reveal delay={300} className="mt-7">{children}</Reveal>}
      </div>
    </section>
  );
}
