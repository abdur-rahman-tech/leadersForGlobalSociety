import { cn } from "@/utils/cn";
import newLogo from "../assets/LGS.jpg";

export function LogoMark({ className }: { className?: string }) {
  return <img src={newLogo} alt="Leaders for Global Society" className={cn("object-contain", className)} />;
}

export default function Logo({ className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* Logo Image with increased height matching the text */}
      <img src={newLogo} alt="Logo" className="h-14 w-auto object-contain" />

      {/* Text on the Right Side */}
      <span className="font-display text-[11px] font-extrabold uppercase leading-[1.15] tracking-wide text-navy-900">
        Leaders
        <br />
        <span className="text-red-600">For Global</span>
        <br />
        Society
      </span>
    </span>
  );
}