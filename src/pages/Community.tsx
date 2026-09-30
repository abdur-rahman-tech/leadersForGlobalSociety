import { useMemo, useState } from "react";
import { ExternalLink, MapPin, Search } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Btn, Pill } from "@/components/ui";
import { LinkedinIcon } from "@/components/BrandIcons";
import { avatarColor, initialsOf } from "@/data";
import { useData } from "@/store/DataContext";
import { linkedinHref } from "@/utils/linkedin";
import { cn } from "@/utils/cn";
import heroImg from "@/assets/hero-join.jpg";
import teamImg from "@/assets/team-photo.jpg";

const tabs = ["All", "Ambassadors", "Fellows", "Alumni", "Volunteers"] as const;

export default function Community() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [query, setQuery] = useState("");
  const { data } = useData();

  const filtered = useMemo(
    () =>
      data.members.filter((m) => {
        const q = query.trim().toLowerCase();
        const matchQ =
          !q ||
          m.name.toLowerCase().includes(q) ||
          m.country.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q);
        return (tab === "All" || m.group === tab) && matchQ;
      }),
    [data.members, tab, query]
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
                aria-label="Search members by name, country, or role"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search members..."
                className="w-full rounded-full border border-navy-100 bg-navy-50/40 py-2.5 pl-10 pr-4 text-sm focus:border-navy-400 focus:bg-white focus:outline-none"
              />
            </label>
          </Reveal>

          <p className="mt-4 text-xs text-slate-500" aria-live="polite">
            Showing {filtered.length} {filtered.length === 1 ? "member" : "members"}
            {tab !== "All" ? ` in ${tab}` : ""}
          </p>

          {/* Members */}
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m, i) => (
              <Reveal
                key={m.id}
                delay={(i % 3) * 90}
                variant="zoom"
                as="article"
                className="group flex h-full flex-col rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lg hover:shadow-navy-900/8 sm:p-6"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-full font-display text-lg font-bold text-white ring-2 ring-navy-100 ring-offset-2", avatarColor(m.name))}>
                    {m.image ? <img src={m.image} alt={`${m.name} profile`} className="h-full w-full object-cover" /> : initialsOf(m.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Pill tone="blue">{m.group.replace(/s$/, "")}</Pill>
                    <h2 className="mt-1.5 truncate font-display text-lg font-bold text-navy-950">{m.name}</h2>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-red" aria-hidden="true" />
                      <span className="truncate">{m.country}</span>
                    </p>
                  </div>
                </div>
                <p className="mt-5 flex-1 border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-600">{m.role}</p>
                {linkedinHref(m.linkedinUrl) && (
                  <a
                    href={linkedinHref(m.linkedinUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${m.name}'s LinkedIn profile (opens in a new tab)`}
                    className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-md bg-[#0a66c2]/8 px-3 text-sm font-semibold text-[#0a66c2] transition-colors hover:bg-[#0a66c2]/15"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                    LinkedIn profile
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
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
