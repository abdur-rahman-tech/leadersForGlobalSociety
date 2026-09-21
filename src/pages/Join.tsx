import {
  ArrowRight,
  Globe2,
  GraduationCap,
  Handshake,
  Heart,
  Megaphone,
  Rocket,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Btn } from "@/components/ui";
import heroImg from "@/assets/hero-join.jpg";
import teamImg from "@/assets/team-photo.jpg";

const ways = [
  {
    title: "Become an Ambassador",
    icon: Globe2,
    text: "Represent LGS in your country and lead local engagement.",
    accent: "text-brand-red bg-red-50 ring-red-100",
  },
  {
    title: "Join a Fellowship",
    icon: Rocket,
    text: "Learn, create and lead through a structured cohort program.",
    accent: "text-navy-800 bg-navy-50 ring-navy-100",
  },
  {
    title: "Volunteer",
    icon: Heart,
    text: "Support events, campaigns and community projects.",
    accent: "text-rose-600 bg-rose-50 ring-rose-100",
  },
  {
    title: "Become a Mentor",
    icon: GraduationCap,
    text: "Share your experience and guide the next generation.",
    accent: "text-emerald-700 bg-emerald-50 ring-emerald-100",
  },
  {
    title: "Collaborate With Us",
    icon: Megaphone,
    text: "Co-create campaigns, panels and youth initiatives.",
    accent: "text-violet-700 bg-violet-50 ring-violet-100",
  },
  {
    title: "Become a Partner",
    icon: Handshake,
    text: "Partner as an organization to scale youth impact.",
    accent: "text-sky-700 bg-sky-50 ring-sky-100",
  },
];

export default function Join() {
  return (
    <>
      <PageHero
        image={heroImg}
        crumb="Join LGS"
        title="Join LGS"
        subtitle="Be a part of a global community of young changemakers."
      >
        <Btn href="#ways" arrow>
          See Ways to Get Involved
        </Btn>
      </PageHero>

      {/* Ways */}
      <section id="ways" className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
              Get Involved
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Ways to Get Involved
            </h2>
          </Reveal>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ways.map((w, i) => (
              <Reveal
                key={w.title}
                delay={(i % 3) * 100}
                className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy-900/10"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${w.accent} transition-transform duration-300 group-hover:scale-110`}
                >
                  <w.icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-navy-900">
                  {w.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{w.text}</p>
                <a
                  href="#apply"
                  className="mt-5 inline-flex items-center gap-1.5 font-display text-[13px] font-bold text-brand-red transition-colors hover:text-brand-red-dark"
                >
                  Apply Now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="zoom">
            <div className="relative overflow-hidden rounded-2xl bg-navy-950 shadow-xl">
              <img
                src={teamImg}
                alt="The LGS community celebrating together"
                className="absolute inset-0 h-full w-full object-cover opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-900/40" />
              <div className="relative px-6 py-14 text-center sm:px-12 sm:py-16">
                <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                  Together, We Create a Difference
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-navy-100/85 sm:text-base">
                  Join LGS today and meet a global family of young leaders building a
                  more inclusive, connected and sustainable world.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Apply form */}
      <section id="apply" className="bg-navy-50/60 py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <Reveal variant="left">
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
              Applications Open
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Start Your LGS Journey
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              Tell us a little about yourself and how you&rsquo;d like to get involved.
              Our team reviews applications on a rolling basis — you&rsquo;ll hear from
              us within a week.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {["Open to young people worldwide", "No fees — ever", "Flexible, remote-first involvement"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M2.5 6.5 5 9l4.5-6" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="right" className="rounded-2xl border border-navy-100 bg-white p-6 shadow-lg shadow-navy-900/5 sm:p-8">
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-xs font-semibold text-navy-900">Full Name</span>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-navy-100 bg-navy-50/40 px-3.5 py-2.5 text-sm focus:border-navy-400 focus:bg-white focus:outline-none"
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-xs font-semibold text-navy-900">Email</span>
                <input
                  required
                  type="email"
                  placeholder="you@email.com"
                  className="w-full rounded-lg border border-navy-100 bg-navy-50/40 px-3.5 py-2.5 text-sm focus:border-navy-400 focus:bg-white focus:outline-none"
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-xs font-semibold text-navy-900">Country</span>
                <input
                  type="text"
                  placeholder="Your country"
                  className="w-full rounded-lg border border-navy-100 bg-navy-50/40 px-3.5 py-2.5 text-sm focus:border-navy-400 focus:bg-white focus:outline-none"
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-xs font-semibold text-navy-900">I want to</span>
                <select className="w-full appearance-none rounded-lg border border-navy-100 bg-navy-50/40 px-3.5 py-2.5 text-sm focus:border-navy-400 focus:bg-white focus:outline-none">
                  {ways.map((w) => (
                    <option key={w.title}>{w.title}</option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-navy-900">
                  Why do you want to join LGS?
                </span>
                <textarea
                  rows={4}
                  placeholder="Tell us your story..."
                  className="w-full resize-none rounded-lg border border-navy-100 bg-navy-50/40 px-3.5 py-2.5 text-sm focus:border-navy-400 focus:bg-white focus:outline-none"
                />
              </label>
              <div className="sm:col-span-2">
                <Btn href="#apply" arrow className="w-full sm:w-auto">
                  Submit Application
                </Btn>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
