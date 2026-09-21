import { Building2, HelpCircle, Mail, MapPin, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Btn } from "@/components/ui";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/BrandIcons";
import heroImg from "@/assets/hero-network.jpg";

const helpCards = [
  {
    title: "For Young People",
    icon: Users,
    text: "Join our community, programs and global opportunities.",
    cta: { label: "Join LGS", to: "/join" },
  },
  {
    title: "For Organizations",
    icon: Building2,
    text: "Collaborate, partner, or co-host events with our team.",
    cta: { label: "Collaborate", to: "/join" },
  },
  {
    title: "General Queries",
    icon: HelpCircle,
    text: "We're here to help with anything else on your mind.",
    cta: { label: "Contact Us", href: "#contact-form" },
  },
];

const socials = [
  { label: "LinkedIn", icon: LinkedinIcon },
  { label: "Instagram", icon: InstagramIcon },
  { label: "Facebook", icon: FacebookIcon },
  { label: "YouTube", icon: YoutubeIcon },
  { label: "X (Twitter)", icon: XIcon },
];

export default function Contact() {
  return (
    <>
      <PageHero
        image={heroImg}
        crumb="Contact"
        title="Get in Touch"
        subtitle="Let's build something meaningful together."
        compact
      />

      {/* Help cards */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              How Can We Help You?
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {helpCards.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 100}
                className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy-900/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-white transition-colors duration-300 group-hover:bg-brand-red">
                  <c.icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-navy-900">{c.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">{c.text}</p>
                <div className="mt-5">
                  <Btn to={c.cta.to} href={c.cta.href} size="sm" variant="outline" arrow>
                    {c.cta.label}
                  </Btn>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact info + form */}
      <section id="contact-form" className="bg-navy-50/60 py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
          <Reveal variant="left">
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
              Reach Us
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-navy-900">
              Contact Information
            </h2>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-navy-800 shadow-sm ring-1 ring-navy-100">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </span>
                  <a
                    href="mailto:leadersforglobalsociety@gmail.com"
                    className="mt-0.5 block text-sm font-semibold text-navy-900 transition-colors hover:text-brand-red"
                  >
                    leadersforglobalsociety@gmail.com
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-navy-800 shadow-sm ring-1 ring-navy-100">
                  <MapPin className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Location
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-navy-900">
                    Pakistan (Global Network)
                  </span>
                </span>
              </li>
            </ul>

            <h3 className="mt-9 font-display text-sm font-bold uppercase tracking-wider text-navy-900">
              Follow Us
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-800 shadow-sm ring-1 ring-navy-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-red hover:text-white hover:ring-brand-red"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="right" className="rounded-2xl border border-navy-100 bg-white p-6 shadow-lg shadow-navy-900/5 sm:p-8">
            <h2 className="font-display text-xl font-bold text-navy-900">Send Us a Message</h2>
            <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-navy-900">Name</span>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-navy-100 bg-navy-50/40 px-3.5 py-2.5 text-sm focus:border-navy-400 focus:bg-white focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-navy-900">Email</span>
                <input
                  required
                  type="email"
                  placeholder="you@email.com"
                  className="w-full rounded-lg border border-navy-100 bg-navy-50/40 px-3.5 py-2.5 text-sm focus:border-navy-400 focus:bg-white focus:outline-none"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-navy-900">Subject</span>
                <input
                  type="text"
                  placeholder="What's this about?"
                  className="w-full rounded-lg border border-navy-100 bg-navy-50/40 px-3.5 py-2.5 text-sm focus:border-navy-400 focus:bg-white focus:outline-none"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-navy-900">Message</span>
                <textarea
                  rows={5}
                  required
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-lg border border-navy-100 bg-navy-50/40 px-3.5 py-2.5 text-sm focus:border-navy-400 focus:bg-white focus:outline-none"
                />
              </label>
              <div className="sm:col-span-2">
                <Btn href="#contact-form" arrow className="w-full sm:w-auto">
                  Send Message
                </Btn>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Banner */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="zoom">
            <div className="relative overflow-hidden rounded-2xl bg-navy-950 shadow-xl">
              <img
                src={heroImg}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-navy-950/60" />
              <div className="relative px-6 py-14 text-center sm:px-12">
                <h2 className="mx-auto max-w-2xl font-display text-2xl font-extrabold leading-snug text-white sm:text-3xl">
                  Together, we can build a more inclusive, connected and sustainable world.
                </h2>
                <div className="mt-7">
                  <Btn to="/join" arrow>
                    Join LGS
                  </Btn>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
