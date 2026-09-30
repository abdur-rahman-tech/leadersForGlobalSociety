import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, Search, ShieldCheck, X } from "lucide-react";
import Logo from "./Logo";
import { Btn } from "./ui";
import { useData } from "@/store/DataContext";
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

const searchPages = [
  { title: "About LGS", detail: "Our story, mission and values", to: "/about", keywords: "about mission vision values" },
  { title: "Programs", detail: "Leadership, mentorship and skills", to: "/programs", keywords: "program fellowship learning" },
  { title: "Opportunities", detail: "Scholarships, fellowships and more", to: "/opportunities", keywords: "opportunity scholarship internship" },
  { title: "Community", detail: "Meet ambassadors, fellows and alumni", to: "/community", keywords: "people members ambassadors fellows alumni volunteers" },
  { title: "Events", detail: "Upcoming events and past gatherings", to: "/events", keywords: "event workshop conference" },
  { title: "Impact", detail: "Our milestones and progress", to: "/impact", keywords: "impact milestones stats" },
  { title: "Join LGS", detail: "Explore ways to get involved", to: "/join", keywords: "join volunteer apply ambassador" },
  { title: "Contact", detail: "Get in touch with our team", to: "/contact", keywords: "contact email partner" },
];

type SearchResult = { title: string; detail: string; to: string; keywords?: string };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const { data } = useData();
  const searchInput = useRef<HTMLInputElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);
  const searchDialog = useRef<HTMLElement>(null);

  const results = useMemo<SearchResult[]>(() => {
    const records: SearchResult[] = [
      ...data.programs.map((program) => ({ title: program.title, detail: "Program", to: "/programs", keywords: program.blurb })),
      ...data.opportunities.map((item) => ({ title: item.title, detail: `${item.category} · ${item.org}`, to: "/opportunities", keywords: `${item.location} ${item.tags.join(" ")}` })),
      ...data.events.map((event) => ({ title: event.title, detail: `${event.status} event · ${event.month} ${event.day}, ${event.year}`, to: "/events", keywords: `${event.meta} ${event.blurb}` })),
      ...data.members.map((member) => ({ title: member.name, detail: `${member.group} · ${member.country}`, to: "/community", keywords: member.role })),
    ];
    const items = [...searchPages, ...records];
    const term = query.trim().toLowerCase();
    return (term
      ? items.filter((item) => `${item.title} ${item.detail} ${item.keywords ?? ""}`.toLowerCase().includes(term))
      : searchPages.slice(0, 5)
    ).slice(0, 8);
  }, [data, query]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((isOpen) => !isOpen);
      }
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
    else setQuery("");
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    searchButton.current?.focus();
  };

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

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "relative rounded-md px-2.5 py-2 font-display text-[13px] font-semibold text-navy-800 transition-colors hover:text-brand-red",
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
            ref={searchButton}
            className="flex h-10 w-10 items-center justify-center rounded-md text-navy-800 transition-colors hover:bg-navy-50 hover:text-brand-red"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Link
            to="/admin"
            aria-label="Open admin panel"
            title="Admin Panel"
            className="hidden h-10 items-center gap-1.5 rounded-md border border-navy-200 px-3 text-navy-800 transition-colors hover:border-brand-red hover:bg-red-50 hover:text-brand-red sm:flex"
          >
            <ShieldCheck className="h-[18px] w-[18px]" />
            <span className="font-display text-[13px] font-semibold">Admin</span>
          </Link>
          <Btn to="/join" size="sm" className="hidden sm:inline-flex">
            Join LGS
          </Btn>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md text-navy-900 transition-colors hover:bg-navy-50 xl:hidden"
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
          "grid overflow-hidden border-t border-navy-100 transition-[grid-template-rows] duration-300 xl:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-0"
        )}
        aria-hidden={!open}
      >
        <div className="min-h-0 overflow-hidden" inert={!open}>
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-3 font-display text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-50",
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

      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-navy-950/55 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && closeSearch()}>
          <section
            ref={searchDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-search-title"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                closeSearch();
                return;
              }
              if (event.key !== "Tab") return;
              const focusable = searchDialog.current?.querySelectorAll<HTMLElement>("input:not([disabled]), button:not([disabled]), a[href]");
              if (!focusable?.length) return;
              const first = focusable[0];
              const last = focusable[focusable.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
              }
            }}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-navy-100 bg-white shadow-2xl"
          >
            <h2 id="site-search-title" className="sr-only">Search the LGS website</h2>
            <div className="flex items-center gap-3 border-b border-slate-100 px-4">
              <Search className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
              <input
                ref={searchInput}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search programs, events, people..."
                className="h-14 min-w-0 flex-1 bg-transparent text-base text-navy-950 placeholder:text-slate-400 focus:outline-none"
                aria-label="Search programs, events, people, and pages"
              />
              <button type="button" onClick={closeSearch} aria-label="Close search" className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[min(60vh,28rem)] overflow-y-auto p-2" aria-live="polite">
              <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">{query.trim() ? "Search results" : "Explore LGS"}</p>
              {results.length ? results.map((result) => (
                <Link
                  key={`${result.to}-${result.title}`}
                  to={result.to}
                  onClick={closeSearch}
                  className="flex items-center justify-between gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-navy-50 focus-visible:bg-navy-50"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-navy-900">{result.title}</span>
                    <span className="mt-0.5 block truncate text-xs text-slate-500">{result.detail}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                </Link>
              )) : (
                <p className="px-3 py-8 text-center text-sm text-slate-500">No results. Try another name or keyword.</p>
              )}
            </div>
            <div className="border-t border-slate-100 px-4 py-2.5 text-xs text-slate-400">
              Press <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-slate-600">Esc</kbd> to close
            </div>
          </section>
        </div>
      )}
    </header>
  );
}
