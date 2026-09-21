import { useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Btn } from "@/components/ui";
import { events, pastEvents } from "@/data";
import { cn } from "@/utils/cn";
import heroImg from "@/assets/hero-events.jpg";

export default function Events() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const list = tab === "upcoming" ? events : pastEvents;

  return (
    <>
      <PageHero
        image={heroImg}
        crumb="Events"
        title="Our Events"
        subtitle="Workshops, panels, conferences and more."
        compact
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <Reveal className="flex flex-wrap items-center gap-2 border-b border-navy-100 pb-4">
            <button
              type="button"
              onClick={() => setTab("upcoming")}
              className={cn(
                "rounded-full px-5 py-2 font-display text-[13px] font-semibold transition-all duration-300",
                tab === "upcoming"
                  ? "bg-brand-red text-white shadow-md shadow-brand-red/25"
                  : "bg-navy-50 text-navy-800 hover:bg-navy-100"
              )}
              aria-pressed={tab === "upcoming"}
            >
              Upcoming Events
            </button>
            <button
              type="button"
              onClick={() => setTab("past")}
              className={cn(
                "rounded-full px-5 py-2 font-display text-[13px] font-semibold transition-all duration-300",
                tab === "past"
                  ? "bg-brand-red text-white shadow-md shadow-brand-red/25"
                  : "bg-navy-50 text-navy-800 hover:bg-navy-100"
              )}
              aria-pressed={tab === "past"}
            >
              Past Events
            </button>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="ml-auto inline-flex items-center gap-1.5 font-display text-sm font-semibold text-navy-700 transition-colors hover:text-brand-red"
            >
              <CalendarDays className="h-4 w-4" />
              View Calendar
            </a>
          </Reveal>

          {/* Event list */}
          <div className="mt-8 space-y-5" key={tab}>
            {list.map((e, i) => (
              <Reveal
                key={e.title}
                delay={i * 100}
                className="group flex flex-col gap-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lg hover:shadow-navy-900/8 sm:flex-row sm:items-center"
              >
                <div
                  className={cn(
                    "flex w-24 shrink-0 flex-col items-center rounded-xl px-4 py-3 text-white shadow-md",
                    e.past ? "bg-slate-500" : "bg-navy-900"
                  )}
                >
                  <span className="font-display text-[11px] font-bold uppercase tracking-widest text-white/80">
                    {e.month}
                  </span>
                  <span className="font-display text-3xl font-extrabold leading-none">
                    {e.day}
                  </span>
                  <span className="mt-1 text-[11px] font-medium text-white/70">{e.year}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-lg font-bold text-navy-900">{e.title}</h2>
                  <p className="mt-1 flex items-center gap-1.5 text-[13px] font-semibold text-brand-red">
                    <MapPin className="h-3.5 w-3.5" />
                    {e.meta}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{e.blurb}</p>
                </div>
                <div className="shrink-0">
                  {e.past ? (
                    <Btn href="#" variant="outline" size="sm">
                      View Recap
                    </Btn>
                  ) : (
                    <Btn href="#" size="sm" arrow>
                      Register Now
                    </Btn>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="zoom" className="rounded-2xl bg-navy-50/70 p-8 text-center ring-1 ring-navy-100">
            <h2 className="font-display text-xl font-bold text-navy-900">
              Want to host an event with LGS?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">
              We collaborate with universities, communities and organizations worldwide.
            </p>
            <div className="mt-5">
              <Btn to="/contact" variant="navy" arrow>
                Partner With Us
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
