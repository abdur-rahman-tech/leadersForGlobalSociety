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

import heroImg from "@/assets/hero-home(1).jpg";
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
    label: "Leadership",
    text: "Build confidence, communication and strategic thinking.",
    color: "bg-brand-red",
    icon: Rocket,
  },
  {
    label: "Mentorship",
    text: "Grow with experienced guides and peer support.",
    color: "bg-navy-800",
    icon: Handshake,
  },
  {
    label: "Impact",
    text: "Turn ideas into real action for communities and SDGs.",
    color: "bg-brand-blue",
    icon: Heart,
  },
];

const oppTiles = [
  { label: "Scholarships", icon: GraduationCap },
  { label: "Fellowships", icon: BookOpen },
  { label: "Jobs", icon: Briefcase },
  { label: "Volunteering", icon: Heart },
  { label: "Events", icon: CalendarDays },
  { label: "Networking", icon: Network },
];

const placeCards = [
  {
    label: "Students",
    note: "For learners and future leaders.",
    icon: GraduationCap,
  },
  {
    label: "Professionals",
    note: "For mentors and career builders.",
    icon: Briefcase,
  },
  {
    label: "Creators",
    note: "For people with ideas and energy.",
    icon: Megaphone,
  },
  {
    label: "Volunteers",
    note: "For community-driven changemakers.",
    icon: Handshake,
  },
];

const stories = [
  {
    name: "Abdur Rahim",
    role: "Youth Leader",
    initials: "Fellowship Alumni",
    color: "bg-brand-red",
    quote:
      "LGS gave me the platform, confidence, and network to turn my ideas into action.",
  },
  {
    name: "Abdul Latif",
    role: "Fellowship Alumni",
    initials: "DT",
    color: "bg-navy-800",
    quote:
      "The mentorship and exposure I got through LGS changed the way I see leadership and impact.",
  },
  {
    name: "Sara M.",
    role: "Community Builder",
    initials: "SM",
    color: "bg-brand-blue",
    quote:
      "I found my people here, and together we created something meaningful for our community.",
  },
];

const news = [
  {
    tag: "Event",
    date: "Apr 2026",
    title: "Youth leadership summit opens registration for this season.",
  },
  {
    tag: "Impact",
    date: "Mar 2026",
    title: "LGS members launched a regional outreach project across campuses.",
  },
  {
    tag: "Program",
    date: "Feb 2026",
    title: "New fellowship cohort begins with mentorship and skill labs.",
  },
];

function AnimatedStat({ value, label, icon: Icon, delay = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = Number(String(value).replace(/[^0-9]/g, ""));
    const start = performance.now();
    let frameId;

    const animate = (time) => {
      const progress = Math.min((time - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(target * eased);
      setCount(next);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const timer = window.setTimeout(() => {
      frameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [value, delay]);

  return (
    <div className="flex items-center justify-center gap-3.5 px-4 py-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-800 shadow-sm ring-1 ring-navy-100">
        <Icon className="h-5 w-5" />
      </span>

      <span>
        <span className="block font-display text-2xl font-extrabold text-navy-900 sm:text-[2rem]">
          {count}
          {String(value).includes("+") ? "+" : ""}
        </span>
        <span className="block text-xs font-medium text-slate-500">{label}</span>
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section
        id="top"
        className="relative isolate overflow-hidden bg-[#fdfaf7]"
      >
        {/* Background photography */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 lg:left-[16%]">
            <img
              src={heroImg}
              alt="A group of young people standing together looking toward a city skyline"
              className="h-full w-full object-cover object-[58%_46%]"
              fetchPriority="high"
            />
          </div>

          {/* Mobile readability wash */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdfaf7]/96 via-[#fdfaf7]/88 to-[#fdfaf7]/55 lg:hidden" />

          {/* Exact left fade: solid cream behind the text, smoothly revealing the photo */}
          <div className="absolute inset-0 hidden bg-[linear-gradient(97deg,#fdfaf7_0%,#fdfaf7_26%,rgba(253,250,247,.94)_34%,rgba(253,250,247,.50)_44%,rgba(253,250,247,.08)_54%,rgba(253,250,247,0)_62%)] lg:block" />

          {/* Soft bottom blend */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fdfaf7]/30 to-transparent" />
        </div>

        {/* Handwritten note over the photo */}
        <p className="hand pointer-events-none absolute right-[4%] top-[15%] hidden max-w-[230px] -rotate-[3deg] text-right text-[28px] leading-[1.08] text-white drop-shadow-[0_3px_10px_rgba(4,18,45,.55)] lg:block xl:text-[34px]">
          Different
          <br />
          Backgrounds.
          <br />
          Same Dream.
        </p>

        {/* Corner ribbon */}
        <svg
          viewBox="0 0 300 220"
          className="pointer-events-none absolute -bottom-2 right-0 hidden h-[190px] w-[260px] lg:block"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M300 8C196 40 122 122 92 222"
            stroke="#ffffff"
            strokeWidth="30"
            opacity=".95"
          />
          <path
            d="M300 58C214 86 152 152 128 222"
            stroke="#ea1b2d"
            strokeWidth="10"
          />
          <path
            d="M300 94C232 118 186 170 168 222"
            stroke="#0b2e63"
            strokeWidth="7"
            opacity=".85"
          />
        </svg>

        {/* 1376px shell gives the same left text allocation as the reference image */}
        <div className="mx-auto flex min-h-[500px] w-full max-w-[1540px] items-center px-0 py-10 sm:min-h-[540px] lg:min-h-[587px] lg:py-0">
          <div className="max-w-[560px] lg:max-w-[500px] lg:translate-x-[80px]">
            <Reveal>
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.19em] text-[#1c4d8c] sm:text-[12px]">
                Leaders for Global Society (LGS)
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-4 font-display font-extrabold leading-[1.04] tracking-[-0.025em] text-[#0b2e63]">
                <span className="block text-[38px] sm:text-[43px] lg:text-[46px]">
                  YOUTH TODAY.
                </span>

                <span className="my-[1px] block font-display text-[40px] font-black italic leading-[1.04] tracking-[-0.025em] text-[#ea1b2d] sm:text-[47px] lg:text-[53px]">
                  GLOBAL LEADERS
                </span>

                <span className="block text-[38px] sm:text-[43px] lg:text-[46px]">
                  TOMORROW.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={340}>
              <p className="mt-6 max-w-[500px] text-[14px] leading-[1.75] text-[#42597c] sm:text-[15px]">
                We are a youth-led global platform empowering young people through leadership,
                professional development, mentorship, skills, SDGs and access to international
                opportunities.
              </p>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {/* Reference button: 176px × ~51px, fully rounded */}
                <Link
                  to="/about"
                  className="group inline-flex h-[52px] min-w-[182px] items-center justify-center gap-2.5 rounded-full bg-[#ea1b2d] px-6 font-display text-[13.5px] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(234,27,45,.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d91829]"
                >
                  Explore LGS
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                {/* Reference button: ~220px × ~51px, fully rounded */}
                <Link
                  to="/join"
                  className="inline-flex h-[52px] min-w-[228px] items-center justify-center rounded-full border border-[#c9d8ea] bg-white/95 px-7 font-display text-[13.5px] font-semibold text-[#0b2e63] shadow-[0_10px_26px_-18px_rgba(6,35,80,.8)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ea1b2d] hover:text-[#ea1b2d]"
                >
                  Join Our Community
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        className="border-b border-[#dce7f3] bg-[#eaf3fd]/90 shadow-[0_-1px_0_rgba(15,23,42,0.05)] backdrop-blur-sm"
        aria-label="Key statistics"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {heroStats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 90}
              className="flex items-center justify-center gap-3.5 border-r border-[#cddceb] px-4 py-3 last:border-r-0"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/70 text-navy-800 shadow-sm">
                <s.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-2xl font-extrabold text-navy-900">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </span>
                <span className="block text-xs font-medium text-slate-500">
                  {s.label}
                </span>
              </span>
            </Reveal>
          ))}
        </div>
      </section>

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
                  See What&apos;s Happening
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
                <Reveal key={n.title} as="li" delay={i * 100} variant="right">
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

              <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
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
