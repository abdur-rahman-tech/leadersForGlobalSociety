import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "./BrandIcons";
import Logo from "./Logo";

const explore = [
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Opportunities", to: "/opportunities" },
  { label: "Community", to: "/community" },
  { label: "Events", to: "/events" },
];

const involved = [
  { label: "Become an Ambassador", to: "/join" },
  { label: "Join a Fellowship", to: "/programs" },
  { label: "Volunteer", to: "/join" },
  { label: "Partner With Us", to: "/contact" },
];

const socials = [
  { label: "LinkedIn", icon: LinkedinIcon, href: "#" },
  { label: "Instagram", icon: InstagramIcon, href: "#" },
  { label: "Facebook", icon: FacebookIcon, href: "#" },
  { label: "YouTube", icon: YoutubeIcon, href: "#" },
  { label: "Email", icon: Mail, href: "mailto:leadersforglobalsociety@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-100">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-red via-brand-red/50 to-transparent" />
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Link to="/" aria-label="Leaders for Global Society — Home">
              <Logo dark />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-100/70">
              Youth Today. Global Leaders Tomorrow.
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-navy-100/60">
              A youth-led global platform empowering young people through leadership,
              mentorship, skills and international opportunities.
            </p>
          </div>

          <nav aria-label="Explore">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {explore.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-navy-100/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Get involved">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Get Involved
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {involved.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-navy-100/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Connect
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-navy-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-red hover:text-white"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 -rotate-2 font-script text-2xl text-navy-100/80">
              Let&rsquo;s build a more connected &amp; inclusive world — together.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-navy-100/60 sm:flex-row">
          <p>© 2026 Leaders for Global Society. All Rights Reserved.</p>
          <p className="font-medium">
            #LGS &nbsp;•&nbsp; #YouthTodayGlobalLeadersTomorrow
          </p>
        </div>
      </div>
    </footer>
  );
}
