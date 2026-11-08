
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "./BrandIcons";

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
  { label: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/company/leaders-for-global-society-lgs/", },
  {label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/leadersforglobalsociety.lgs/", },
  { label: "Facebook", icon: FacebookIcon, href: "https://www.facebook.com/share/18cpNFKZJs/",},
  { label: "Email", icon: Mail, href: "mailto:leadersforglobalsociety@gmail.com", },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-100">
      {/* Top Accent */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-red via-brand-red/50 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">

          {/* Brand Section */}
          <div>
            <Link to="/" aria-label="Leaders for Global Society — Home">
              <Logo dark />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-100/70">
              Youth Today. Global Leaders Tomorrow.
            </p>

            <p className="mt-2 max-w-xs text-sm leading-relaxed text-navy-100/60">
              A youth-led global platform empowering young people through
              leadership, mentorship, skills and international opportunities.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm">
              {explore.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-navy-100/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get Involved */}
          <nav aria-label="Get involved">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Get Involved
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm">
              {involved.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-navy-100/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect Section */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Connect
            </h3>

            <p className="mt-5 max-w-xs -rotate-2 font-script text-2xl text-navy-100/80">
              Let&rsquo;s build a more connected &amp; inclusive world — together.
            </p>

            {/* Social Media Icons */}
            <div className="mt-7 flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-navy-100/80 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red hover:bg-brand-red hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-navy-100/50">
              Follow us and stay connected.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-white/10 pt-6 text-xs text-navy-100/60 sm:flex-row">
          <p>
            © 2026 Leaders for Global Society. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
