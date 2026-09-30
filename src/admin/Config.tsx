import type { ReactNode } from "react";
import {
    Briefcase,
    CalendarDays,
    History,
    Layers,
    MessageSquareQuote,
    Newspaper,
    Sigma,
    Users,
} from "lucide-react";
import type { CollectionKey } from "@/data";
import { toneForTag } from "@/data";
import { Pill } from "@/components/ui";

export type FieldDef = {
    name: string;
    label: string;
    type: "text" | "textarea" | "select" | "tags" | "image" | "url";
    options?: { value: string; label: string }[];
    required?: boolean;
    placeholder?: string;
    hint?: string;
};

export type CollectionConfig = {
    key: CollectionKey;
    label: string;
    singular: string;
    icon: typeof Users;
    description: string;
    fields: FieldDef[];
    columns: { header: string; render: (item: Record<string, unknown>) => ReactNode }[];
};

const opt = (values: string[]) => values.map((v) => ({ value: v, label: v }));

const iconOpt = (pairs: [string, string][]) =>
    pairs.map(([value, label]) => ({ value, label }));

export const collections: CollectionConfig[] = [
    {
        key: "events",
        label: "Events",
        singular: "Event",
        icon: CalendarDays,
        description: "Manage upcoming and past events shown on the Events page.",
        fields: [
            { name: "title", label: "Title", type: "text", required: true, placeholder: "Youth Climate Panel" },
            { name: "day", label: "Day", type: "text", required: true, placeholder: "05" },
            {
                name: "month",
                label: "Month",
                type: "select",
                required: true,
                options: opt(["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]),
            },
            { name: "year", label: "Year", type: "text", required: true, placeholder: "2026" },
            { name: "meta", label: "Location / Time", type: "text", required: true, placeholder: "Hyderabad | 7:00 PM" },
            { name: "blurb", label: "Description", type: "textarea", required: true },
            { name: "status", label: "Status", type: "select", required: true, options: opt(["Upcoming", "Past"]) },
            { name: "image", label: "Event image", type: "image", hint: "Upload an image or paste an image URL. Uploads are optimized for browser storage." },
            { name: "linkedinUrl", label: "LinkedIn event link", type: "url", placeholder: "https://www.linkedin.com/events/...", hint: "Optional. Add the public LinkedIn event announcement." },
        ],
        columns: [
            {
                header: "Image",
                render: (e) => e.image ? <img src={String(e.image)} alt="" className="h-10 w-16 rounded-md object-cover" /> : <span className="text-xs text-slate-400">None</span>,
            },
            {
                header: "Date",
                render: (e) => (
                    <span className="font-mono text-xs text-slate-500">
                        {String(e.day)} {String(e.month)} {String(e.year)}
                    </span>
                ),
            },
            { header: "Title", render: (e) => <span className="font-semibold text-navy-900">{String(e.title)}</span> },
            { header: "Location", render: (e) => String(e.meta) },
            {
                header: "Status",
                render: (e) => (
                    <Pill tone={e.status === "Upcoming" ? "green" : "slate"}>{String(e.status)}</Pill>
                ),
            },
            { header: "LinkedIn", render: (e) => e.linkedinUrl ? <Pill tone="blue">Added</Pill> : <span className="text-xs text-slate-400">None</span> },
        ],
    },
    {
        key: "programs",
        label: "Programs",
        singular: "Program",
        icon: Layers,
        description: "Program cards shown on the Home and Programs pages.",
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "blurb", label: "Description", type: "textarea", required: true },
            { name: "image", label: "Program image", type: "image", hint: "Upload an image or paste an image URL. Uploads are optimized for browser storage." },
            {
                name: "icon",
                label: "Icon",
                type: "select",
                required: true,
                options: iconOpt([
                    ["rocket", "Rocket"],
                    ["users", "People"],
                    ["globe", "Globe"],
                    ["leaf", "Leaf"],
                    ["landmark", "Landmark"],
                    ["network", "Network"],
                ]),
            },
            {
                name: "color",
                label: "Card color",
                type: "select",
                required: true,
                options: iconOpt([
                    ["navy", "Navy"],
                    ["red", "Red"],
                    ["blue", "Blue"],
                    ["green", "Green"],
                    ["purple", "Purple"],
                    ["sky", "Sky"],
                ]),
            },
        ],
        columns: [
            {
                header: "Image",
                render: (p) => p.image ? <img src={String(p.image)} alt="" className="h-10 w-16 rounded-md object-cover" /> : <span className="text-xs text-slate-400">None</span>,
            },
            { header: "Title", render: (p) => <span className="font-semibold text-navy-900">{String(p.title)}</span> },
            { header: "Icon", render: (p) => <Pill tone="slate">{String(p.icon)}</Pill> },
            { header: "Color", render: (p) => <Pill tone="blue">{String(p.color)}</Pill> },
            { header: "Description", render: (p) => <span className="line-clamp-1 max-w-xs">{String(p.blurb)}</span> },
        ],
    },
    {
        key: "opportunities",
        label: "Opportunities",
        singular: "Opportunity",
        icon: Briefcase,
        description: "Listings shown in the Opportunities Hub, with search & filters.",
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "org", label: "Organization", type: "text", required: true },
            { name: "location", label: "Location", type: "text", required: true, placeholder: "Global / Remote / Online / City" },
            { name: "deadline", label: "Deadline", type: "text", required: true, placeholder: "Sep 30, 2026" },
            {
                name: "category",
                label: "Category",
                type: "select",
                required: true,
                options: opt(["Fellowship", "Conference", "Internship", "Course", "Scholarship", "Youth Program"]),
            },
            {
                name: "icon",
                label: "Icon",
                type: "select",
                required: true,
                options: iconOpt([
                    ["landmark", "Landmark"],
                    ["globe", "Globe"],
                    ["users", "People"],
                    ["laptop", "Laptop"],
                    ["book", "Book"],
                    ["dove", "Dove"],
                ]),
            },
            {
                name: "tags",
                label: "Tags",
                type: "tags",
                placeholder: "Fully Funded, Fellowship",
                hint: "Comma-separated. Known tags (Fully Funded, Partially Funded, Paid, Free, Fellowship, Conference, Internship, Course) get automatic colors.",
            },
        ],
        columns: [
            { header: "Title", render: (o) => <span className="font-semibold text-navy-900">{String(o.title)}</span> },
            { header: "Org", render: (o) => String(o.org) },
            { header: "Deadline", render: (o) => <span className="text-brand-red">{String(o.deadline)}</span> },
            {
                header: "Tags",
                render: (o) => (
                    <span className="flex flex-wrap gap-1">
                        {(o.tags as string[]).map((t) => (
                            <Pill key={t} tone={toneForTag(t)}>
                                {t}
                            </Pill>
                        ))}
                    </span>
                ),
            },
        ],
    },
    {
        key: "members",
        label: "Members",
        singular: "Member",
        icon: Users,
        description: "Community members shown on the Community page.",
        fields: [
            { name: "name", label: "Full name", type: "text", required: true },
            { name: "country", label: "Country", type: "text", required: true },
            { name: "role", label: "Role / Program", type: "text", required: true },
            { name: "image", label: "Profile image", type: "image", hint: "Upload an image or paste an image URL. Uploads are optimized for browser storage." },
            { name: "linkedinUrl", label: "LinkedIn profile link", type: "url", placeholder: "https://www.linkedin.com/in/...", hint: "Optional. Add this member's public LinkedIn profile." },
            {
                name: "group",
                label: "Group",
                type: "select",
                required: true,
                options: opt(["Ambassadors", "Fellows", "Alumni", "Volunteers"]),
            },
        ],
        columns: [
            {
                header: "Image",
                render: (m) => m.image ? <img src={String(m.image)} alt="" className="h-10 w-10 rounded-full object-cover" /> : <span className="text-xs text-slate-400">None</span>,
            },
            { header: "Name", render: (m) => <span className="font-semibold text-navy-900">{String(m.name)}</span> },
            { header: "Country", render: (m) => String(m.country) },
            { header: "Role", render: (m) => String(m.role) },
            { header: "Group", render: (m) => <Pill tone="blue">{String(m.group)}</Pill> },
            { header: "LinkedIn", render: (m) => m.linkedinUrl ? <Pill tone="blue">Added</Pill> : <span className="text-xs text-slate-400">None</span> },
        ],
    },
    {
        key: "news",
        label: "News",
        singular: "News item",
        icon: Newspaper,
        description: "Latest news items shown on the Home page.",
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "tag", label: "Tag", type: "text", required: true, placeholder: "Milestone / Programs / Community" },
            { name: "date", label: "Date", type: "text", required: true, placeholder: "Aug 2026" },
        ],
        columns: [
            { header: "Title", render: (n) => <span className="font-semibold text-navy-900">{String(n.title)}</span> },
            { header: "Tag", render: (n) => <Pill tone="red">{String(n.tag)}</Pill> },
            { header: "Date", render: (n) => String(n.date) },
        ],
    },
    {
        key: "stories",
        label: "Stories",
        singular: "Story",
        icon: MessageSquareQuote,
        description: "Community testimonials shown on the Home page.",
        fields: [
            { name: "quote", label: "Quote", type: "textarea", required: true },
            { name: "name", label: "Name", type: "text", required: true },
            { name: "role", label: "Role / Country", type: "text", required: true, placeholder: "FSF Cohort 01 · Pakistan" },
        ],
        columns: [
            { header: "Name", render: (s) => <span className="font-semibold text-navy-900">{String(s.name)}</span> },
            { header: "Role", render: (s) => String(s.role) },
            { header: "Quote", render: (s) => <span className="line-clamp-1 max-w-sm italic">"{String(s.quote)}"</span> },
        ],
    },
    {
        key: "timeline",
        label: "Timeline",
        singular: "Milestone",
        icon: History,
        description: "Journey milestones shown on the Impact page.",
        fields: [
            { name: "year", label: "Year", type: "text", required: true, placeholder: "2026" },
            { name: "text", label: "Milestone", type: "textarea", required: true },
        ],
        columns: [
            { header: "Year", render: (t) => <span className="font-semibold text-navy-900">{String(t.year)}</span> },
            { header: "Milestone", render: (t) => <span className="line-clamp-1 max-w-md">{String(t.text)}</span> },
        ],
    },
    {
        key: "stats",
        label: "Stats",
        singular: "Stat",
        icon: Sigma,
        description: "Key numbers shown on the Home hero bar (first 4) and Impact page (all).",
        fields: [
            { name: "value", label: "Value", type: "text", required: true, placeholder: "5,000+" },
            { name: "label", label: "Label", type: "text", required: true, placeholder: "People Reached" },
            {
                name: "icon",
                label: "Icon",
                type: "select",
                required: true,
                options: iconOpt([
                    ["globe", "Globe"],
                    ["linkedin", "LinkedIn"],
                    ["users", "People"],
                    ["team", "Team"],
                    ["calendar", "Calendar"],
                ]),
            },
        ],
        columns: [
            { header: "Value", render: (s) => <span className="font-display font-bold text-navy-900">{String(s.value)}</span> },
            { header: "Label", render: (s) => String(s.label) },
            { header: "Icon", render: (s) => <Pill tone="slate">{String(s.icon)}</Pill> },
        ],
    },
];

export function getCollection(key: string | undefined): CollectionConfig | undefined {
    return collections.find((c) => c.key === key);
}
