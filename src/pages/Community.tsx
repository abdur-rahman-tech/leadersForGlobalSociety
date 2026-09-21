import { useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Btn, Pill } from "@/components/ui";
import { members, type Member } from "@/data";
import { cn } from "@/utils/cn";
import heroImg from "@/assets/hero-join.jpg";
import teamImg from "@/assets/team-photo.jpg";

const tabs = ["All", "Ambassadors", "Fellows", "Alumni", "Volunteers"] as const;

export default function Community() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      members.filter((m: Member) => {
        const q = query.trim().toLowerCase();
        const matchQ =
          !q ||
          m.name.toLowerCase().includes(q) ||
          m.country.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q);
        return (tab === "All" || m.group === tab) && matchQ;
      }),
    [tab, query]
  );

  return (
    <>
      <PageHero
        image={heroImg}
        crumb="Community"
        title="Our Community"
        subtitle="Meet the people behind the movement."
        compact
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <Reveal className="flex flex-wrap items-center gap-2 border-b border-navy-100 pb-4">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-full px-4 py-2 font-display text-[13px] font-semibold transition-all duration-300",
                  tab === t
                    ? "bg-brand-red text-white shadow-md shadow-brand-red/25"
                    : "bg-navy-50 text-navy-800 hover:bg-navy-100"
                )}
                aria-pressed={tab === t}
              >
                {t}
              </button>
            ))}
            <label className="relative ml-auto block w-full sm:w-64">
              <span className="sr-only">Search members</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search members..."
                className="w-full rounded-full border border-navy-100 bg-navy-50/40 py-2.5 pl-10 pr-4 text-sm focus:border-navy-400 focus:bg-white focus:outline-none"
              />
            </label>
          </Reveal>

          {/* Members */}
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m, i) => (
              <Reveal
                key={m.name}
                delay={(i % 3) * 90}
                variant="zoom"
                className="group rounded-2xl border border-navy-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy-900/10"
              >
                <span
                  className={cn(
                    "mx-auto flex h-16 w-16 items-center justify-center rounded-full font-display text-lg font-bold text-white shadow-md ring-4 ring-white transition-transform duration-300 group-hover:scale-110",
                    m.color
                  )}
                >
                  {m.initials}
                </span>
                <h2 className="mt-4 font-display text-base font-bold text-navy-900">{m.name}</h2>
                <p className="mt-0.5 flex items-center justify-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3 w-3" />
                  {m.country}
                </p>
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  <Pill tone="blue">{m.group.replace(/s$/, "")}</Pill>
                  <Pill tone="slate">{m.role}</Pill>
                </div>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-navy-200 bg-navy-50/40 p-12 text-center">
              <p className="font-display text-lg font-bold text-navy-900">No members found</p>
              <p className="mt-1.5 text-sm text-slate-500">Try another group or keyword.</p>
            </div>
          )}
        </div>
      </section>

      {/* Banner CTA */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="zoom">
            <div className="relative overflow-hidden rounded-2xl bg-navy-950 shadow-xl">
              <img
                src={teamImg}
                alt="LGS members together"
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-900/40" />
              <div className="relative flex flex-col items-center justify-between gap-6 px-6 py-12 text-center sm:px-12 md:flex-row md:text-left">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                    Together, We Create a Difference
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-navy-100/85">
                    Join LGS today and become part of a community across 15+ countries.
                  </p>
                </div>
                <Btn to="/join" arrow className="shrink-0">
                  Join the Community
                </Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
