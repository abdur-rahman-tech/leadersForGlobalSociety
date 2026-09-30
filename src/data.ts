/* =========================================================
   Central data model — used as default seed for the store.
   All records carry an `id` so the admin panel can CRUD them.
   ========================================================= */

export type ProgramIcon = "rocket" | "users" | "globe" | "leaf" | "landmark" | "network";
export type ProgramColor = "navy" | "red" | "blue" | "green" | "purple" | "sky";

export type Program = {
  id: string;
  title: string;
  blurb: string;
  color: ProgramColor;
  icon: ProgramIcon;
  image?: string;
};

export type OppIcon = "landmark" | "globe" | "users" | "laptop" | "book" | "dove";

export type Opportunity = {
  id: string;
  title: string;
  org: string;
  location: string;
  deadline: string;
  category: string;
  icon: OppIcon;
  tags: string[];
};

export type EventStatus = "Upcoming" | "Past";

export type EventItem = {
  id: string;
  title: string;
  day: string;
  month: string;
  year: string;
  meta: string;
  blurb: string;
  status: EventStatus;
  image?: string;
};

export type MemberGroup = "Ambassadors" | "Fellows" | "Alumni" | "Volunteers";

export type Member = {
  id: string;
  name: string;
  country: string;
  role: string;
  group: MemberGroup;
  image?: string;
};

export type NewsItem = { id: string; tag: string; title: string; date: string };
export type Story = { id: string; quote: string; name: string; role: string };
export type TimelineItem = { id: string; year: string; text: string };

export type StatIcon = "globe" | "linkedin" | "users" | "team" | "calendar";
export type Stat = { id: string; value: string; label: string; icon: StatIcon };

export type AppData = {
  programs: Program[];
  opportunities: Opportunity[];
  events: EventItem[];
  members: Member[];
  news: NewsItem[];
  stories: Story[];
  timeline: TimelineItem[];
  stats: Stat[];
};

export type CollectionKey = keyof AppData;

/* ---------- Display helpers ---------- */

export const programGradients: Record<ProgramColor, string> = {
  navy: "from-navy-800 to-navy-950",
  red: "from-brand-red to-rose-900",
  blue: "from-blue-700 to-navy-900",
  green: "from-emerald-600 to-emerald-900",
  purple: "from-violet-600 to-violet-950",
  sky: "from-sky-600 to-navy-900",
};

export const programAccents: Record<ProgramColor, { chip: string; icon: string }> = {
  navy: { chip: "bg-navy-50 ring-navy-100", icon: "text-navy-800" },
  red: { chip: "bg-red-50 ring-red-100", icon: "text-brand-red" },
  blue: { chip: "bg-blue-50 ring-blue-100", icon: "text-blue-700" },
  green: { chip: "bg-emerald-50 ring-emerald-100", icon: "text-emerald-700" },
  purple: { chip: "bg-violet-50 ring-violet-100", icon: "text-violet-700" },
  sky: { chip: "bg-sky-50 ring-sky-100", icon: "text-sky-700" },
};

export type PillTone = "blue" | "green" | "red" | "amber" | "slate" | "purple";

export function toneForTag(tag: string): PillTone {
  const t = tag.toLowerCase();
  if (t.includes("fully funded") || t === "paid" || t === "free") return "green";
  if (t.includes("partial")) return "amber";
  if (t === "internship") return "purple";
  if (t === "fellowship" || t === "conference") return "blue";
  if (t === "course") return "slate";
  return "blue";
}

const avatarPalette = [
  "bg-rose-500",
  "bg-navy-600",
  "bg-emerald-600",
  "bg-amber-500",
  "bg-violet-600",
  "bg-sky-600",
  "bg-teal-600",
  "bg-indigo-600",
  "bg-pink-600",
];

export function avatarColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return avatarPalette[h % avatarPalette.length];
}

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

export function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/* ---------- Default seed data ---------- */

export const defaultData: AppData = {
  programs: [
    {
      id: "prg-1",
      title: "Future Skills Fellowship",
      blurb: "A 6-week learning journey to develop practical skills, leadership capacity and a global mindset.",
      color: "navy",
      icon: "rocket",
    },
    {
      id: "prg-2",
      title: "Leadership Development",
      blurb: "Workshops, mentorship and leadership training for young changemakers.",
      color: "red",
      icon: "users",
    },
    {
      id: "prg-3",
      title: "Global Opportunities",
      blurb: "Fellowships, conferences, scholarships and international networks.",
      color: "blue",
      icon: "globe",
    },
    {
      id: "prg-4",
      title: "SDGs & Global Citizenship",
      blurb: "Youth engagement for sustainable development and global challenges.",
      color: "green",
      icon: "leaf",
    },
    {
      id: "prg-5",
      title: "Policy Awareness",
      blurb: "Understanding governance, civic participation and policy for real change.",
      color: "purple",
      icon: "landmark",
    },
    {
      id: "prg-6",
      title: "Mentorship & Networking",
      blurb: "Connect with experts, peers and organizations worldwide.",
      color: "sky",
      icon: "network",
    },
  ],

  opportunities: [
    {
      id: "opp-1",
      title: "UN Young Social Entrepreneurs Program",
      org: "United Nations",
      location: "Global",
      deadline: "Sep 30, 2026",
      category: "Fellowship",
      icon: "landmark",
      tags: ["Fully Funded", "Fellowship"],
    },
    {
      id: "opp-2",
      title: "Global Youth Climate Summit",
      org: "IYCCC",
      location: "Dubai, UAE",
      deadline: "Oct 15, 2026",
      category: "Conference",
      icon: "globe",
      tags: ["Fully Funded", "Conference"],
    },
    {
      id: "opp-3",
      title: "Asia Leadership Program",
      org: "Microsoft",
      location: "Asia",
      deadline: "Sep 30, 2026",
      category: "Fellowship",
      icon: "users",
      tags: ["Partially Funded", "Fellowship"],
    },
    {
      id: "opp-4",
      title: "Tech for Good Internship",
      org: "Microsoft",
      location: "Remote",
      deadline: "Oct 10, 2026",
      category: "Internship",
      icon: "laptop",
      tags: ["Paid", "Internship"],
    },
    {
      id: "opp-5",
      title: "Sustainable Development Course",
      org: "UN CC:Learn",
      location: "Online",
      deadline: "Nov 5, 2026",
      category: "Course",
      icon: "book",
      tags: ["Free", "Course"],
    },
    {
      id: "opp-6",
      title: "Youth Peace Fellowship",
      org: "Global Peace Foundation",
      location: "Global",
      deadline: "Sep 25, 2026",
      category: "Fellowship",
      icon: "dove",
      tags: ["Fully Funded", "Fellowship"],
    },
  ],

  events: [
    {
      id: "evt-1",
      day: "18",
      month: "SEP",
      year: "2026",
      title: "Aspire Alumni Panel",
      meta: "Online | 5 Countries",
      blurb: "A panel of successful alumni sharing their journeys and insights.",
      status: "Upcoming",
    },
    {
      id: "evt-2",
      day: "05",
      month: "OCT",
      year: "2026",
      title: "Youth Climate Panel",
      meta: "Hyderabad | 7:00 PM",
      blurb: "A discussion on youth action for climate change and sustainability.",
      status: "Upcoming",
    },
    {
      id: "evt-3",
      day: "12",
      month: "NOV",
      year: "2026",
      title: "3-Day International Book Review Workshop",
      meta: "Karachi | 10:00 AM",
      blurb: "Build your critical thinking and review-writing skills.",
      status: "Upcoming",
    },
    {
      id: "evt-4",
      day: "22",
      month: "JUN",
      year: "2026",
      title: "Future Skills Fellowship Cohort 01 Graduation",
      meta: "Online | 15 Countries",
      blurb: "Celebrating the first graduating cohort of the Future Skills Fellowship.",
      status: "Past",
    },
    {
      id: "evt-5",
      day: "09",
      month: "MAY",
      year: "2026",
      title: "Global Ambassadors Onboarding",
      meta: "Online | 30+ Ambassadors",
      blurb: "Welcoming a new wave of LGS country ambassadors.",
      status: "Past",
    },
    {
      id: "evt-6",
      day: "14",
      month: "MAR",
      year: "2026",
      title: "SDGs Awareness Drive",
      meta: "Lahore | Community Outreach",
      blurb: "On-ground youth engagement around the Sustainable Development Goals.",
      status: "Past",
    },
  ],

  members: [
    { id: "mem-1", name: "Ayesha Khan", country: "Pakistan", role: "FSF Cohort 01", group: "Fellows" },
    { id: "mem-2", name: "Daniel Kim", country: "South Korea", role: "Ambassador", group: "Ambassadors" },
    { id: "mem-3", name: "Fatima Al Zahra", country: "Morocco", role: "Leadership Program", group: "Fellows" },
    { id: "mem-4", name: "Ahmed Raza", country: "Pakistan", role: "SDGs Ambassador", group: "Ambassadors" },
    { id: "mem-5", name: "Sofia Martinez", country: "Mexico", role: "Global Opportunities", group: "Volunteers" },
    { id: "mem-6", name: "James Mwangi", country: "Kenya", role: "Alumni Fellowship", group: "Alumni" },
    { id: "mem-7", name: "Lina Chen", country: "Singapore", role: "Policy Circle", group: "Fellows" },
    { id: "mem-8", name: "Omar Farouk", country: "Egypt", role: "Ambassador", group: "Ambassadors" },
    { id: "mem-9", name: "Emma Novak", country: "Czechia", role: "Volunteer Lead", group: "Volunteers" },
  ],

  news: [
    { id: "nws-1", tag: "Milestone", title: "LGS Completes First Year of Impact", date: "Aug 2026" },
    { id: "nws-2", tag: "Programs", title: "Future Skills Fellowship Cohort 01 Graduates", date: "Jun 2026" },
    { id: "nws-3", tag: "Community", title: "New International Ambassadors Onboarded", date: "May 2026" },
  ],

  stories: [
    {
      id: "sty-1",
      quote:
        "The Future Skills Fellowship gave me the confidence to lead a community project in my city — and a network that spans 15 countries.",
      name: "Ayesha Khan",
      role: "FSF Cohort 01 · Pakistan",
    },
    {
      id: "sty-2",
      quote:
        "Through LGS I found mentors, real opportunities, and most importantly — a global family of young people who want to build a better future.",
      name: "Daniel Kim",
      role: "Country Ambassador · South Korea",
    },
  ],

  timeline: [
    { id: "tml-1", year: "2023", text: "LGS founded by a group of young changemakers." },
    { id: "tml-2", year: "2024", text: "First programs & international engagement across 5 countries." },
    { id: "tml-3", year: "2025", text: "Future Skills Fellowship launched — Cohort 01 graduates." },
    { id: "tml-4", year: "2026", text: "International Ambassador Network & 3K LinkedIn community." },
    { id: "tml-5", year: "2026–27", text: "The next chapter: new fellowships, new partners, more impact." },
  ],

  stats: [
    { id: "sta-1", value: "15+", label: "Countries", icon: "globe" },
    { id: "sta-2", value: "3,000+", label: "LinkedIn Family", icon: "linkedin" },
    { id: "sta-3", value: "5,000+", label: "People Reached", icon: "users" },
    { id: "sta-4", value: "30+", label: "Team Members", icon: "team" },
    { id: "sta-5", value: "30+", label: "Programs & Events", icon: "calendar" },
    { id: "sta-6", value: "50+", label: "Ambassadors Trained", icon: "team" },
  ],
};

export const programs = defaultData.programs;

export const opportunities = defaultData.opportunities;

export const events = defaultData.events;

export const upcomingEvents = defaultData.events.filter(
  (event) => event.status === "Upcoming"
);

export const pastEvents = defaultData.events.filter(
  (event) => event.status === "Past"
);

export const members = defaultData.members;

export const news = defaultData.news;

export const stories = defaultData.stories;

export const timeline = defaultData.timeline;

export const stats = defaultData.stats;