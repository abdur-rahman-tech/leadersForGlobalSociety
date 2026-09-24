import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CalendarDays,
  ChevronRight,
  GraduationCap,
  Globe,
  Handshake,
  Heart,
  Landmark,
  Leaf,
  Megaphone,
  Network,
  Newspaper,
  Rocket,
  Sparkles,
  Users,
  UsersRound,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { Btn, Pill, SectionHeading } from "@/components/ui";
import { LinkedinIcon } from "@/components/BrandIcons";
import { programs } from "@/data";
import heroImg from "@/assets/hero-home.jpg";
import fellowshipImg from "@/assets/fellowship.jpg";
import networkImg from "@/assets/hero-network.jpg";
import eventsImg from "@/assets/hero-events.jpg";
import teamImg from "@/assets/team-photo.jpg";

const programIcons = {
  rocket: Rocket,
  users: UsersRound,
  globe: Globe,
  leaf: Leaf,
  landmark: Landmark,
  network: Network,
};

// Numeric values for animation
const heroStats = [
  { value: 15, suffix: "+", label: "Countries", icon: Globe },
  { value: 3000, suffix: "+", label: "LinkedIn Family", icon: LinkedinIcon },
  { value: 5000, suffix: "+", label: "People Reached", icon: Users },
  { value: 30, suffix: "+", label: "Team Members", icon: UsersRound },
];

// Counter Animation Component (Repeats every time you scroll to it)
function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount(0);
          let startTime: number | null = null;
          const duration = 2000;

          const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.floor(easeProgress * end);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animateCount);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const pillars = [
  {
    label: "LEAD",
    icon: Rocket,
    color: "bg-brand-red",
    text: "Develop leadership, communication and professional skills.",
  },
  {
    label: "CONNECT",
    icon: Network,
    color: "bg-blue-600",
    text: "Build meaningful networks with mentors, peers and opportunities.",
  },
  {
    label: "IMPACT",
    icon: Sparkles,
    color: "bg-navy-800",
    text: "Create real change for a more inclusive and sustainable world.",
  },
];

const oppTiles = [
  { label: "Scholarships", icon: GraduationCap },
  { label: "Fellowships", icon: Rocket },
  { label: "Internships", icon: Briefcase },
  { label: "Conferences", icon: Megaphone },
  { label: "Courses", icon: BookOpen },
  { label: "Youth Programs", icon: Users },
];

const placeCards = [
  { label: "Become an Ambassador", icon: Globe, note: "Represent LGS in your country" },
  { label: "Join a Fellowship", icon: Rocket, note: "Learn, create and lead with a cohort" },
  { label: "Volunteer", icon: Heart, note: "Give your time, grow your impact" },
  { label: "Partner With Us", icon: Handshake, note: "Collaborate as an organization" },
];

const news = [
  { tag: "Milestone", title: "LGS Completes First Year of Impact", date: "Aug 2026" },
  { tag: "Programs", title: "Future Skills Fellowship Cohort 01 Graduates", date: "Jun 2026" },
  { tag: "Community", title: "New International Ambassadors Onboarded", date: "May 2026" },
];

const stories = [
  {
    quote:
      "The Future Skills Fellowship gave me the confidence to lead a community project in my city — and a network that spans 15 countries.",
    name: "Ayesha Khan",
    role: "FSF Cohort 01 · Pakistan",
    initials: "AK",
    color: "bg-rose-500",
  },
  {
    quote:
      "Through LGS I found mentors, real opportunities, and most importantly — a global family of young people who want to build a better future.",
    name: "Daniel Kim",
    role: "Country Ambassador · South Korea",
    initials: "DK",
    color: "bg-navy-600",
  },
];

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Young leaders raising a flag at sunset"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-white/-10" />

        <div className="relative mx-auto flex min-h-[560px] w-full max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:min-h-[620px] lg:px-8">
          <Reveal>
            <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-navy-900/15 bg-navy-900/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-navy-900 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-brand-red" />
              Youth-led · Global · Impact-driven
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="max-w-2xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
              Youth Today.
              <br />
              <span className="text-brand-red">Global Leaders</span>
              <br />
              Tomorrow.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
              Leaders for Global Society is a youth-led global platform empowering young
              people through leadership, professional development, mentorship, skills,
              SDGs and access to international opportunities.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Btn to="/about" arrow>
                Explore LGS
              </Btn>
              <Btn to="/join" variant="outline">
                Join Our Community
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= STATS BAR ================= */}
      <section className="border-b border-navy-100 bg-white" aria-label="Key statistics">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 divide-navy-100 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:divide-x lg:px-8">
          {heroStats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 90}
              className="flex items-center justify-center gap-3.5 px-4 py-3"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-800">
                <s.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-2xl font-extrabold text-navy-900">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </span>
                <span className="block text-xs font-medium text-slate-500">{s.label}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= WHAT IS LGS ================= */}
      <section className="bg-navy-50/60 py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8">
          <Reveal variant="left">
            <SectionHeading
              eyebrow="Who we are"
              title="What is Leaders for Global Society?"
            />
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              LGS is a youth-led organization committed to developing future leaders,
              creating meaningful connections, and driving positive change through
              education, mentorship, innovation and global collaboration.
            </p>
            <div className="mt-7">
              <Btn to="/about" arrow>
                Read Our Story
              </Btn>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal
                key={p.label}
                delay={i * 110}
                className="group rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy-900/10"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${p.color} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
                >
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-sm font-extrabold tracking-widest text-navy-900">
                  {p.label}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Our Programs"
              title="Programs Built to Develop Future Leaders"
            />
            <Link
              to="/programs"
              className="group inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
            >
              View All Programs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {programs.map((p, i) => {
              const Icon = programIcons[p.icon];
              return (
                <Reveal key={p.slug} delay={i * 70} variant="zoom">
                  <Link
                    to="/programs"
                    className={`group flex h-full min-h-[190px] flex-col justify-between rounded-xl bg-gradient-to-br ${p.color} p-5 text-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
                  >
                    <div>
                      <Icon className="h-6 w-6 opacity-90 transition-transform duration-300 group-hover:scale-110" />
                      <h3 className="mt-3 font-display text-[15px] font-bold leading-snug">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-white/75">
                        {p.blurb}
                      </p>
                    </div>
                    <span className="mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-navy-900">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FSF BANNER ================= */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="zoom">
          <div className="relative overflow-hidden rounded-2xl bg-navy-950 shadow-xl">
            <img
              src={fellowshipImg}
              alt="Student looking toward the future"
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/60 to-transparent" />
            <div className="relative flex flex-col justify-between gap-8 px-6 py-12 sm:px-10 md:flex-row md:items-center">
              <div className="max-w-lg">
                <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-navy-100/80">
                  Featured Program
                </p>
                <h2 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
                  Future Skills Fellowship
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-navy-100/85 sm:text-base">
                  A 6-week program helping young people build practical skills, leadership
                  capacity and a global mindset.
                </p>
                <div className="mt-6">
                  <Btn to="/programs" arrow>
                    Explore FSF
                  </Btn>
                </div>
              </div>
              <p className="shrink-0 -rotate-6 pr-2 font-script text-5xl leading-none text-white/95 sm:text-6xl">
                Learn
                <br />
                <span className="pl-6">Create</span>
                <br />
                <span className="pl-12">Lead</span>
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= OPPORTUNITIES + PLACE FOR YOU ================= */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal variant="left" className="rounded-2xl border-2 border-brand-red/15 bg-white p-6 shadow-sm sm:p-8">
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
              Opportunities Hub
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-navy-900">
              Opportunities for Young People
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-3">
              {oppTiles.map((t) => (
                <Link
                  key={t.label}
                  to="/opportunities"
                  className="group flex flex-col items-center gap-2.5 rounded-xl border border-navy-100 bg-navy-50/50 px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:bg-white hover:shadow-lg hover:shadow-navy-900/5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-navy-800 shadow-sm ring-1 ring-navy-100 transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white group-hover:ring-brand-red">
                    <t.icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold text-navy-900">{t.label}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Btn to="/opportunities" variant="outline" size="sm" arrow>
                Browse the Hub
              </Btn>
            </div>
          </Reveal>

          <Reveal variant="right" className="rounded-2xl bg-navy-50/70 p-6 ring-1 ring-navy-100 sm:p-8">
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
              Join the LGS Community
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-navy-900">
              There is a Place for You at LGS
            </h2>
            <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
              {placeCards.map((c) => (
                <Link
                  key={c.label}
                  to="/join"
                  className="group flex items-start gap-3.5 rounded-xl bg-white p-4 shadow-sm ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-900/5 hover:ring-brand-red/30"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-800 text-white transition-colors duration-300 group-hover:bg-brand-red">
                    <c.icon className="h-4.5 w-4.5" />
                  </span>
                  <span>
                    <span className="block font-display text-sm font-bold text-navy-900">
                      {c.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">{c.note}</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Btn to="/join" size="sm" arrow>
                Join LGS
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= LGS IN ACTION + IMPACT ================= */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal variant="left">
            <Link
              to="/events"
              className="group relative block h-full min-h-[220px] overflow-hidden rounded-2xl bg-navy-950 shadow-lg"
            >
              <img
                src={eventsImg}
                alt="LGS workshop in action"
                className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-7">
                <CalendarDays className="mb-auto h-7 w-7 text-white/80" />
                <h2 className="mt-16 font-display text-2xl font-extrabold text-white">
                  LGS in Action
                </h2>
                <p className="mt-1 text-sm text-navy-100/85">
                  Events | Workshops | Global Engagement
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-red">
                  See What&rsquo;s Happening
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
          <Reveal variant="right">
            <Link
              to="/impact"
              className="group relative block h-full min-h-[220px] overflow-hidden rounded-2xl bg-navy-950 shadow-lg"
            >
              <img
                src={networkImg}
                alt="Global network of impact"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-7">
                <Sparkles className="mb-auto h-7 w-7 text-white/80" />
                <h2 className="mt-16 font-display text-2xl font-extrabold text-white">
                  Our Impact
                </h2>
                <p className="mt-1 text-sm text-navy-100/85">Real change. Lasting impact.</p>
                <span className="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-red">
                  Explore Our Journey
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= STORIES + NEWS ================= */}
      <section className="bg-navy-50/60 py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Testimonials"
                title="Stories From Our Community"
                subtitle="Real journeys from young changemakers across the LGS network."
              />
            </Reveal>
            <div className="mt-7 space-y-4">
              {stories.map((s, i) => (
                <Reveal
                  key={s.name}
                  delay={i * 120}
                  className="rounded-xl border-l-4 border-brand-red bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                >
                  <p className="text-[15px] leading-relaxed text-slate-700">
                    &ldquo;{s.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${s.color} font-display text-sm font-bold text-white`}
                    >
                      {s.initials}
                    </span>
                    <span>
                      <span className="block font-display text-sm font-bold text-navy-900">
                        {s.name}
                      </span>
                      <span className="block text-xs text-slate-500">{s.role}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={100} className="mt-7">
              <img
                src={teamImg}
                alt="The LGS community together"
                className="h-52 w-full rounded-xl object-cover shadow-md"
                loading="lazy"
              />
            </Reveal>
          </div>

          <div>
            <Reveal className="flex items-end justify-between gap-4">
              <SectionHeading eyebrow="Latest News" title="What's Happening at LGS" />
              <Link
                to="/events"
                className="group inline-flex shrink-0 items-center gap-1 pb-1 font-display text-sm font-semibold text-brand-red hover:text-brand-red-dark"
              >
                View All
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
            <ul className="mt-7 space-y-3.5">
              {news.map((n, i) => (
                <Reveal
                  key={n.title}
                  as="li"
                  delay={i * 100}
                  variant="right"
                >
                  <Link
                    to="/events"
                    className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-brand-red/30"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-800 transition-colors group-hover:bg-brand-red group-hover:text-white">
                      <Newspaper className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <Pill tone="red">{n.tag}</Pill>
                        <span className="text-[11px] font-medium text-slate-400">{n.date}</span>
                      </span>
                      <span className="mt-1 block truncate font-display text-sm font-semibold text-navy-900">
                        {n.title}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-red" />
                  </Link>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={150} className="mt-7 rounded-xl bg-navy-900 p-6 text-white shadow-lg">
              <h3 className="font-display text-lg font-bold">Never miss an update</h3>
              <p className="mt-1.5 text-sm text-navy-100/75">
                Get opportunities, events and program launches in your inbox.
              </p>
              <form
                className="mt-4 flex gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <label htmlFor="home-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="home-email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="min-w-0 flex-1 rounded-md border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-navy-100/50 focus:border-brand-red focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-md bg-brand-red px-4 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
                >
                  Subscribe
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= CTA BAND ================= */}
      <section className="relative overflow-hidden bg-navy-950">
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-red via-brand-red/50 to-transparent" />
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <Reveal variant="left">
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
              Be a Part of Something Bigger
            </h2>
            <p className="mt-2 max-w-xl text-sm text-navy-100/80 sm:text-base">
              Join LGS and help build a more inclusive, connected and sustainable world.
            </p>
          </Reveal>
          <Reveal variant="right">
            <Btn to="/join" arrow>
              Join LGS
            </Btn>
          </Reveal>
        </div>
      </section>
    </>
  );
}