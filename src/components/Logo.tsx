import { cn } from "@/utils/cn";
import newLogo from "../assets/LGS.jpg";

export function LogoMark({ className }: { className?: string }) {
  return <img src={newLogo} alt="Leaders for Global Society" className={cn("object-contain", className)} />;
}

export default function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src={newLogo}
        alt="Leaders for Global Society"
        className={cn(
          "h-14 object-contain",
          dark ? "w-14 rounded-full object-cover" : "w-auto"
        )}
      />
      <span
        className={cn(
          "font-display text-[11px] font-extrabold uppercase leading-[1.15] tracking-wide",
          dark ? "text-white" : "text-navy-900"
        )}
      >
        Leaders
        <br />
        <span className="text-red-600">For Global</span>
        <br />
        Society
      </span>
    </span>
  );
}