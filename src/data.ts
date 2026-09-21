export type Program = {
  slug: string;
  title: string;
  blurb: string;
  color: string; // card gradient classes
  icon: "rocket" | "users" | "globe" | "leaf" | "landmark" | "network";
};

export const programs: Program[] = [
  {
    slug: "future-skills-fellowship",
    title: "Future Skills Fellowship",
    blurb: "A 6-week learning journey to develop practical skills, leadership capacity and a global mindset.",
    color: "from-navy-800 to-navy-950",
    icon: "rocket",
  },
  {
    slug: "leadership-development",
    title: "Leadership Development",
    blurb: "Workshops, mentorship and leadership training for young changemakers.",
    color: "from-brand-red to-rose-900",
    icon: "users",
  },
  {
    slug: "global-opportunities",
    title: "Global Opportunities",
    blurb: "Fellowships, conferences, scholarships and international networks.",
    color: "from-blue-700 to-navy-900",
    icon: "globe",
  },
  {
    slug: "sdgs-global-citizenship",
    title: "SDGs & Global Citizenship",
    blurb: "Youth engagement for sustainable development and global challenges.",
    color: "from-emerald-600 to-emerald-900",
    icon: "leaf",
  },
  {
    slug: "policy-awareness",
    title: "Policy Awareness",
    blurb: "Understanding governance, civic participation and policy for real change.",
    color: "from-violet-600 to-violet-950",
    icon: "landmark",
  },
  {
    slug: "mentorship-networking",
    title: "Mentorship & Networking",
    blurb: "Connect with experts, peers and organizations worldwide.",
    color: "from-sky-600 to-navy-900",
    icon: "network",
  },
];

export type Opportunity = {
  title: string;
  org: string;
  location: string;
  deadline: string;
  tags: { label: string; tone: "green" | "blue" | "amber" | "red" | "purple" | "slate" }[];
  icon: "landmark" | "globe" | "users" | "laptop" | "book" | "dove";
  category: string;
};

export const opportunities: Opportunity[] = [
  {
    title: "UN Young Social Entrepreneurs Program",
    org: "United Nations",
    location: "Global",
    deadline: "Sep 30, 2026",
    tags: [
      { label: "Fully Funded", tone: "green" },
      { label: "Fellowship", tone: "blue" },
    ],
    icon: "landmark",
    category: "Fellowship",
  },
  {
    title: "Global Youth Climate Summit",
    org: "IYCCC",
    location: "Dubai, UAE",
    deadline: "Oct 15, 2026",
    tags: [
      { label: "Fully Funded", tone: "green" },
      { label: "Conference", tone: "blue" },
    ],
    icon: "globe",
    category: "Conference",
  },
  {
    title: "Asia Leadership Program",
    org: "Microsoft",
    location: "Asia",
    deadline: "Sep 30, 2026",
    tags: [
      { label: "Partially Funded", tone: "amber" },
      { label: "Fellowship", tone: "blue" },
    ],
    icon: "users",
    category: "Fellowship",
  },
  {
    title: "Tech for Good Internship",
    org: "Microsoft",
    location: "Remote",
    deadline: "Oct 10, 2026",
    tags: [
      { label: "Paid", tone: "green" },
      { label: "Internship", tone: "purple" },
    ],
    icon: "laptop",
    category: "Internship",
  },
  {
    title: "Sustainable Development Course",
    org: "UN CC:Learn",
    location: "Online",
    deadline: "Nov 5, 2026",
    tags: [
      { label: "Free", tone: "green" },
      { label: "Course", tone: "slate" },
    ],
    icon: "book",
    category: "Course",
  },
  {
    title: "Youth Peace Fellowship",
    org: "Global Peace Foundation",
    location: "Global",
    deadline: "Sep 25, 2026",
    tags: [
      { label: "Fully Funded", tone: "green" },
      { label: "Fellowship", tone: "blue" },
    ],
    icon: "dove",
    category: "Fellowship",
  },
];

export type EventItem = {
  day: string;
  month: string;
  year: string;
  title: string;
  meta: string;
  blurb: string;
  past?: boolean;
};

export const events: EventItem[] = [
  {
    day: "18",
    month: "SEP",
    year: "2026",
    title: "Aspire Alumni Panel",
    meta: "Online | 5 Countries",
    blurb: "A panel of successful alumni sharing their journeys and insights.",
  },
  {
    day: "05",
    month: "OCT",
    year: "2026",
    title: "Youth Climate Panel",
    meta: "Hyderabad | 7:00 PM",
    blurb: "A discussion on youth action for climate change and sustainability.",
  },
  {
    day: "12",
    month: "NOV",
    year: "2026",
    title: "3-Day International Book Review Workshop",
    meta: "Karachi | 10:00 AM",
    blurb: "Build your critical thinking and review-writing skills.",
  },
];

export const pastEvents: EventItem[] = [
  {
    day: "22",
    month: "JUN",
    year: "2026",
    title: "Future Skills Fellowship Cohort 01 Graduation",
    meta: "Online | 15 Countries",
    blurb: "Celebrating the first graduating cohort of the Future Skills Fellowship.",
    past: true,
  },
  {
    day: "09",
    month: "MAY",
    year: "2026",
    title: "Global Ambassadors Onboarding",
    meta: "Online | 30+ Ambassadors",
    blurb: "Welcoming a new wave of LGS country ambassadors.",
    past: true,
  },
  {
    day: "14",
    month: "MAR",
    year: "2026",
    title: "SDGs Awareness Drive",
    meta: "Lahore | Community Outreach",
    blurb: "On-ground youth engagement around the Sustainable Development Goals.",
    past: true,
  },
];

export type Member = {
  name: string;
  country: string;
  role: string;
  group: "Ambassadors" | "Fellows" | "Alumni" | "Volunteers";
  initials: string;
  color: string;
};

export const members: Member[] = [
  { name: "Ayesha Khan", country: "Pakistan", role: "FSF Cohort 01", group: "Fellows", initials: "AK", color: "bg-rose-500" },
  { name: "Daniel Kim", country: "South Korea", role: "Ambassador", group: "Ambassadors", initials: "DK", color: "bg-navy-600" },
  { name: "Fatima Al Zahra", country: "Morocco", role: "Leadership Program", group: "Fellows", initials: "FZ", color: "bg-emerald-600" },
  { name: "Ahmed Raza", country: "Pakistan", role: "SDGs Ambassador", group: "Ambassadors", initials: "AR", color: "bg-amber-500" },
  { name: "Sofia Martinez", country: "Mexico", role: "Global Opportunities", group: "Volunteers", initials: "SM", color: "bg-violet-600" },
  { name: "James Mwangi", country: "Kenya", role: "Alumni Fellowship", group: "Alumni", initials: "JM", color: "bg-sky-600" },
  { name: "Lina Chen", country: "Singapore", role: "Policy Circle", group: "Fellows", initials: "LC", color: "bg-teal-600" },
  { name: "Omar Farouk", country: "Egypt", role: "Ambassador", group: "Ambassadors", initials: "OF", color: "bg-indigo-600" },
  { name: "Emma Novak", country: "Czechia", role: "Volunteer Lead", group: "Volunteers", initials: "EN", color: "bg-pink-600" },
];

export const stats = [
  { value: "15+", label: "Countries", icon: "globe" },
  { value: "3,000+", label: "LinkedIn Family", icon: "linkedin" },
  { value: "5,000+", label: "People Reached", icon: "users" },
  { value: "30+", label: "Team Members", icon: "team" },
] as const;

export const timeline = [
  { year: "2023", text: "LGS founded by a group of young changemakers." },
  { year: "2024", text: "First programs & international engagement across 5 countries." },
  { year: "2025", text: "Future Skills Fellowship launched — Cohort 01 graduates." },
  { year: "2026", text: "International Ambassador Network & 3K LinkedIn community." },
  { year: "2026–27", text: "The next chapter: new fellowships, new partners, more impact." },
];
