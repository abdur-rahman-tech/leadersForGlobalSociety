import {
  Handshake,
  Heart,
  Landmark,
  Quote,
  Scale,
  Sparkles,
  Telescope,
  Users,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Btn, SectionHeading } from "@/components/ui";
import heroImg from "@/assets/hero-about.jpg";
import teamImg from "@/assets/team-photo.jpg";

const values = [
  { label: "Leadership", icon: Users },
  { label: "Inclusivity", icon: Heart },
  { label: "Integrity", icon: Scale },
  { label: "Collaboration", icon: Handshake },
  { label: "Impact", icon: Sparkles },
];

export default function About() {
  return (
    <>
      <PageHero
        image={heroImg}
        crumb="About"
        title="About LGS"
        subtitle="A global movement of young people, for a better tomorrow."
      />

      {/* Who we are */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal variant="left">
            <SectionHeading eyebrow="Our Story" title="Who We Are" />
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              Leaders for Global Society (LGS) is a youth-led organization committed to
              developing future leaders, creating meaningful connections, and driving
              positive change through education, mentorship, innovation and global
              collaboration.
            </p>
            <p className="mt-3.5 text-[15px] leading-relaxed text-slate-600">
              What began as a small circle of ambitious young people is now a growing
              network spanning 15+ countries — building skills, opening doors to
              international opportunities and championing the Sustainable Development
              Goals along the way.
            </p>
            <div className="mt-7">
              <Btn to="/impact" arrow>
                Our Journey
              </Btn>
            </div>
          </Reveal>
          <Reveal variant="right" className="relative">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-to-br from-navy-100 to-navy-50" />
            <img
              src={teamImg}
              alt="The Leaders for Global Society team holding a banner"
              className="w-full rounded-xl object-cover shadow-lg"
            />
            <p className="mt-3 pb-2 text-center font-script text-2xl text-navy-800">
              Youth Today. Global Leaders Tomorrow.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-navy-50/60 py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <Reveal className="group rounded-2xl border-t-4 border-brand-red bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-brand-red transition-transform duration-300 group-hover:scale-110">
              <Landmark className="h-5.5 w-5.5" />
            </span>
            <h2 className="mt-4 font-display text-xl font-bold text-navy-900">Our Mission</h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">
              Empowering youth to lead, connect, and create a more inclusive, sustainable
              and peaceful world.
            </p>
          </Reveal>
          <Reveal delay={120} className="group rounded-2xl border-t-4 border-navy-700 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition-transform duration-300 group-hover:scale-110">
              <Telescope className="h-5.5 w-5.5" />
            </span>
            <h2 className="mt-4 font-display text-xl font-bold text-navy-900">Our Vision</h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-slate-600">
              A global community of changemakers working together for a better future.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="What guides us"
              title="Our Values"
              align="center"
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {values.map((v, i) => (
              <Reveal
                key={v.label}
                delay={i * 80}
                variant="zoom"
                className="group flex flex-col items-center gap-3 rounded-xl border border-navy-100 bg-white px-4 py-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-red/25 hover:shadow-lg hover:shadow-navy-900/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-50 text-navy-800 transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white">
                  <v.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-sm font-bold text-navy-900">{v.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="pb-20">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="zoom">
            <figure className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-50 to-navy-100/70 px-6 py-12 text-center ring-1 ring-navy-100 sm:px-14">
              <Quote className="mx-auto h-8 w-8 text-brand-red/60" />
              <blockquote className="mt-4 font-display text-xl font-semibold italic leading-relaxed text-navy-900 sm:text-2xl">
                &ldquo;The world needs more young people
                <br className="hidden sm:block" /> who are ready to{" "}
                <span className="text-brand-red">lead</span>, not just follow.&rdquo;
              </blockquote>
              <figcaption className="mt-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                — LGS
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>
    </>
  );
}
