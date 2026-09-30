import { useState } from "react";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Btn } from "@/components/ui";
import { useData } from "@/store/DataContext";
import { cn } from "@/utils/cn";
import { emailDraftHref } from "@/utils/email";
import { LinkedinIcon } from "@/components/BrandIcons";
import { Pill } from "@/components/ui";
import { linkedinHref } from "@/utils/linkedin";
import heroImg from "@/assets/hero-events.jpg";

export default function Events() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const { data } = useData();
  const list = data.events.filter((event) =>
    tab === "upcoming" ? event.status === "Upcoming" : event.status === "Past"
  );

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
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
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
              href={emailDraftHref("Host an event with LGS", `Hello LGS team,\n\nI'd like to discuss hosting an event together.`)}
              className="ml-auto inline-flex items-center gap-1.5 font-display text-sm font-semibold text-navy-700 transition-colors hover:text-brand-red"
            >
              <CalendarDays className="h-4 w-4" />
              Suggest an Event
            </a>
          </Reveal>

          {/* Event list */}
          <div className="mt-8 grid gap-5 lg:grid-cols-2" key={tab}>
            {list.map((e, i) => {
              const isPast = e.status === "Past";
              const eventLink = linkedinHref(e.linkedinUrl);
              return (
                <Reveal
                  key={e.id}
                  delay={i * 100}
                  as="article"
                  className="group overflow-hidden rounded-xl border border-navy-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-xl hover:shadow-navy-900/10"
                >
                  <div className="relative aspect-[16/8] overflow-hidden bg-navy-900">
                    {e.image ? (
                      <img src={e.image} alt={`${e.title} event`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950">
                        <CalendarDays className="h-16 w-16 text-white/15" strokeWidth={1.2} aria-hidden="true" />
                        <span className="absolute bottom-5 right-5 font-display text-xs font-bold uppercase text-white/60">LGS Event</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-navy-950/10" />
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 flex-col items-center justify-center rounded-md bg-white text-navy-950 shadow-lg">
                          <span className="font-display text-[10px] font-extrabold uppercase text-brand-red">{e.month}</span>
                          <span className="font-display text-2xl font-extrabold leading-none">{e.day}</span>
                        </div>
                        <span className="pb-1 text-sm font-semibold text-white">{e.year}</span>
                      </div>
                      <Pill tone={isPast ? "slate" : "green"} className="border-0 bg-white/95">{e.status}</Pill>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h2 className="font-display text-xl font-extrabold leading-snug text-navy-950">{e.title}</h2>
                    <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <MapPin className="h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
                      <span>{e.meta}</span>
                    </p>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{e.blurb}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                      {eventLink && (
                        <a href={eventLink} target="_blank" rel="noopener noreferrer" aria-label={`View ${e.title} on LinkedIn (opens in a new tab)`} className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#0a66c2]/8 px-3 text-sm font-semibold text-[#0a66c2] transition-colors hover:bg-[#0a66c2]/15">
                          <LinkedinIcon className="h-4 w-4" />
                          LinkedIn event
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {isPast ? (
                        <Btn href={emailDraftHref(`Event recap: ${e.title}`, `Hello LGS team,\n\nCould you share the recap for ${e.title}?`)} variant="outline" size="sm">
                          Ask About Recap
                        </Btn>
                      ) : (
                        <Btn href={emailDraftHref(`Registration: ${e.title}`, `Hello LGS team,\n\nI'd like to learn how to register for ${e.title}.`)} size="sm">
                          Register Interest
                        </Btn>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          {list.length === 0 && (
            <div className="mt-8 rounded-xl border border-dashed border-navy-200 bg-navy-50/50 px-6 py-12 text-center">
              <CalendarDays className="mx-auto h-8 w-8 text-navy-400" aria-hidden="true" />
              <h2 className="mt-3 font-display text-lg font-bold text-navy-900">No {tab} events listed yet</h2>
              <p className="mt-1 text-sm text-slate-600">Check the other events tab or get in touch with our team.</p>
              <div className="mt-4"><Btn to="/contact" variant="outline" size="sm">Contact LGS</Btn></div>
            </div>
          )}
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
