import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import Logo from "./Logo";
import { Btn } from "./ui";
import { cn } from "@/utils/cn";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/impact", label: "Impact" },
  { to: "/community", label: "Community" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow duration-300",
        scrolled ? "shadow-md shadow-navy-900/5" : "shadow-sm shadow-navy-900/5"
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Leaders for Global Society — Home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "relative rounded-md px-3 py-2 font-display text-[13px] font-semibold text-navy-800 transition-colors hover:text-brand-red",
                  "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-red after:transition-transform after:duration-300",
                  isActive && "text-brand-red after:scale-x-100"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Search"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-navy-800 transition-colors hover:bg-navy-50 hover:text-brand-red sm:flex"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Btn to="/join" size="sm" className="hidden sm:inline-flex">
            Join LGS
          </Btn>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md text-navy-900 transition-colors hover:bg-navy-50 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "grid overflow-hidden border-t border-navy-100 transition-[grid-template-rows] duration-300 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-0"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2.5 font-display text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-50",
                    isActive && "bg-navy-50 text-brand-red"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Btn to="/join" size="sm" className="mt-2 w-full sm:hidden">
              Join LGS
            </Btn>
          </nav>
        </div>
      </div>
    </header>
  );
}
