import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bird,
  BookOpen,
  Building2,
  CalendarClock,
  Globe,
  Landmark,
  Laptop,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Pill } from "@/components/ui";
import { opportunities } from "@/data";
import heroImg from "@/assets/hero-opportunities.jpg";

const oppIcons = {
  landmark: Landmark,
  globe: Globe,
  users: Users,
  laptop: Laptop,
  book: BookOpen,
  dove: Bird,
};

const categories = ["All Categories", "Fellowship", "Conference", "Internship", "Course"];
const locations = ["All Locations", "Global", "Remote", "Online", "Asia", "Dubai, UAE"];

export default function Opportunities() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("All Locations");

  const filtered = useMemo(
    () =>
      opportunities.filter((o) => {
        const q = query.trim().toLowerCase();
        const matchQ =
          !q || o.title.toLowerCase().includes(q) || o.org.toLowerCase().includes(q);
        const matchC = category === "All Categories" || o.category === category;
        const matchL = location === "All Locations" || o.location === location;
        return matchQ && matchC && matchL;
      }),
    [query, category, location]
  );

  return (
    <>
      <PageHero
        image={heroImg}
        crumb="Opportunities"
        title="Opportunities Hub"
        subtitle="Discover global opportunities tailored for young people."
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search bar */}
          <Reveal className="-mt-24 relative z-10 rounded-2xl border border-navy-100 bg-white p-4 shadow-xl shadow-navy-900/10 sm:p-5">
            <form
              className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]"
              onSubmit={(e) => e.preventDefault()}
              role="search"
              aria-label="Search opportunities"
            >
              <label className="relative block">
                <span className="sr-only">Search opportunity</span>
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search opportunity..."
                  className="w-full rounded-lg border border-navy-100 bg-navy-50/40 py-2.5 pl-10 pr-3.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="sr-only">Category</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-navy-100 bg-navy-50/40 px-3.5 py-2.5 text-sm text-navy-900 focus:border-navy-400 focus:bg-white focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="sr-only">Location</span>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-navy-100 bg-navy-50/40 px-3.5 py-2.5 text-sm text-navy-900 focus:border-navy-400 focus:bg-white focus:outline-none"
                >
                  {locations.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-800 px-6 py-2.5 font-display text-sm font-semibold text-white transition-all hover:bg-navy-900"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </form>
          </Reveal>

          {/* Cards */}
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {filtered.map((o, i) => {
              const Icon = oppIcons[o.icon];
              return (
                <Reveal
                  key={o.title}
                  delay={(i % 2) * 100}
                  className="group rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-xl hover:shadow-navy-900/10"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-800 ring-1 ring-navy-100 transition-colors duration-300 group-hover:bg-navy-800 group-hover:text-white">
                      <Icon className="h-5.5 w-5.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-base font-bold leading-snug text-navy-900">
                        {o.title}
                      </h2>
                      <ul className="mt-2.5 space-y-1.5 text-[13px] text-slate-600">
                        <li className="flex items-center gap-2">
                          <Building2 className="h-3.5 w-3.5 text-slate-400" /> {o.org}
                        </li>
                        <li className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" /> {o.location}
                        </li>
                        <li className="flex items-center gap-2">
                          <CalendarClock className="h-3.5 w-3.5 text-brand-red" />
                          <span>
                            Deadline: <strong className="font-semibold text-navy-900">{o.deadline}</strong>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-navy-50 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {o.tags.map((t) => (
                        <Pill key={t.label} tone={t.tone}>
                          {t.label}
                        </Pill>
                      ))}
                    </div>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="inline-flex shrink-0 items-center gap-1 font-display text-[13px] font-bold text-brand-red underline-offset-4 transition-colors hover:text-brand-red-dark hover:underline"
                    >
                      View Details
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-navy-200 bg-navy-50/40 p-12 text-center">
              <p className="font-display text-lg font-bold text-navy-900">No matches found</p>
              <p className="mt-1.5 text-sm text-slate-500">
                Try a different keyword, category or location.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
