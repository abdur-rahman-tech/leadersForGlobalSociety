import {
  Globe,
  Landmark,
  Leaf,
  Network,
  Rocket,
  UsersRound,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Btn } from "@/components/ui";
import { programs } from "@/data";
import heroImg from "@/assets/hero-programs.jpg";
import fellowshipImg from "@/assets/fellowship.jpg";

const icons = {
  rocket: Rocket,
  users: UsersRound,
  globe: Globe,
  leaf: Leaf,
  landmark: Landmark,
  network: Network,
};

const accents: Record<string, { chip: string; icon: string }> = {
  "future-skills-fellowship": { chip: "bg-navy-50 ring-navy-100", icon: "text-navy-800" },
  "leadership-development": { chip: "bg-red-50 ring-red-100", icon: "text-brand-red" },
  "global-opportunities": { chip: "bg-blue-50 ring-blue-100", icon: "text-blue-700" },
  "sdgs-global-citizenship": { chip: "bg-emerald-50 ring-emerald-100", icon: "text-emerald-700" },
  "policy-awareness": { chip: "bg-violet-50 ring-violet-100", icon: "text-violet-700" },
  "mentorship-networking": { chip: "bg-sky-50 ring-sky-100", icon: "text-sky-700" },
};

export default function Programs() {
  return (
    <>
      <PageHero
        image={heroImg}
        crumb="Programs"
        title="Our Programs"
        subtitle="Programs built to develop future leaders."
      />

      {/* Program grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {programs.map((p, i) => {
            const Icon = icons[p.icon];
            const accent = accents[p.slug];
            return (
              <Reveal
                key={p.slug}
                delay={(i % 3) * 100}
                className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-200 hover:shadow-xl hover:shadow-navy-900/10"
              >
                <span
                  className={`flex h-13 w-13 items-center justify-center rounded-xl ring-1 ${accent.chip} ${accent.icon} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-lg font-bold text-navy-900">
                  {p.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.blurb}</p>
                <div className="mt-6">
                  <Btn to="/join" variant="navy" size="sm" arrow>
                    Learn More
                  </Btn>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* FSF feature */}
      <section className="pb-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="zoom">
            <div className="grid overflow-hidden rounded-2xl bg-navy-950 shadow-xl lg:grid-cols-[1fr_1.1fr]">
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
                  Flagship Program
                </p>
                <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
                  Future Skills Fellowship
                </h2>
                <p className="mt-3 font-script text-3xl text-navy-100/90">
                  Learn. Create. Lead.
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-100/75 sm:text-base">
                  A 6-week learning journey to develop practical skills, leadership
                  capacity and a global mindset — with mentors, real projects and a
                  cohort of peers from around the world.
                </p>
                <div className="mt-7">
                  <Btn to="/join" arrow>
                    Explore FSF
                  </Btn>
                </div>
              </div>
              <div className="relative min-h-[280px]">
                <img
                  src={fellowshipImg}
                  alt="A young fellow looking toward a bright sky"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/30 to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
