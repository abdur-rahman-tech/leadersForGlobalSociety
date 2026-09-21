import { CalendarRange, Globe, Users, UsersRound } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Btn } from "@/components/ui";
import { LinkedinIcon } from "@/components/BrandIcons";
import { timeline } from "@/data";
import heroImg from "@/assets/hero-network.jpg";
import sideImg from "@/assets/impact-side.jpg";

const impactStats = [
  { value: "15+", label: "Countries Reached", icon: Globe },
  { value: "5,000+", label: "People Engaged", icon: Users },
  { value: "30+", label: "Programs & Events", icon: CalendarRange },
  { value: "3,000+", label: "LinkedIn Community", icon: LinkedinIcon },
  { value: "50+", label: "Ambassadors Trained", icon: UsersRound },
];

export default function Impact() {
  return (
    <>
      <PageHero
        image={heroImg}
        crumb="Impact"
        title="Our Impact"
        subtitle="Real people. Real change."
        compact
      />

      {/* Stats */}
      <section className="border-b border-navy-100 bg-white">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-y-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:px-8">
          {impactStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-800">
                <s.icon className="h-5 w-5" />
              </span>
              <span className="font-display text-2xl font-extrabold text-navy-900">{s.value}</span>
              <span className="text-xs font-medium text-slate-500">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:px-8">
          <div>
            <Reveal>
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
                Milestones
              </p>
              <h2 className="mt-1.5 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                Our Journey
              </h2>
            </Reveal>
            <ol className="relative mt-9 space-y-9 border-l-2 border-brand-red/70 pl-8">
              {timeline.map((t, i) => (
                <Reveal key={t.year} as="li" delay={i * 110} variant="left" className="relative">
                  <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-red bg-white">
                    <span className="h-2 w-2 rounded-full bg-brand-red" />
                  </span>
                  <h3 className="font-display text-lg font-extrabold text-navy-900">{t.year}</h3>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-slate-600">{t.text}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={150} className="mt-10">
              <Btn to="/join" arrow>
                Be Part of the Next Chapter
              </Btn>
            </Reveal>
          </div>

          <Reveal variant="right" className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src={sideImg}
                alt="A young person climbing toward the sunrise"
                className="h-[420px] w-full object-cover sm:h-[520px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 font-script text-4xl leading-tight text-white sm:text-5xl">
                Small steps.
                <br />
                Big impact.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
