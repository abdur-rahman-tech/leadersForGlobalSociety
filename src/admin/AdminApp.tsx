import { useState } from "react";
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ExternalLink,
    LayoutDashboard,
    Lock,
    LogOut,
    Menu,
    RotateCcw,
    ShieldCheck,
    X,
} from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { useData } from "@/store/DataContext";
import { collections } from "./config";
import CollectionPage from "./CollectionPage";
import { cn } from "@/utils/cn";

const ADMIN_PASSWORD = "lgs2026";
const AUTH_KEY = "lgs-admin-auth";

/* ================= Login ================= */

function Login({ onSuccess }: { onSuccess: () => void }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            try {
                sessionStorage.setItem(AUTH_KEY, "1");
            } catch {
                /* noop */
            }
            onSuccess();
        } else {
            setError(true);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
            <div className="w-full max-w-sm">
                <div className="rounded-2xl bg-white p-8 shadow-2xl">
                    <div className="flex items-center gap-3">
                        <LogoMark className="h-11 w-11" />
                        <div>
                            <p className="font-display text-base font-extrabold text-navy-950">LGS Admin</p>
                            <p className="text-xs text-slate-400">Content management panel</p>
                        </div>
                    </div>
                    <form onSubmit={submit} className="mt-7 space-y-4">
                        <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-navy-900">Admin password</span>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="password"
                                    autoFocus
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError(false);
                                    }}
                                    placeholder="Enter password"
                                    className={cn(
                                        "w-full rounded-lg border bg-slate-50 py-2.5 pl-10 pr-3.5 text-sm focus:bg-white focus:outline-none",
                                        error
                                            ? "border-brand-red focus:border-brand-red"
                                            : "border-slate-200 focus:border-navy-400"
                                    )}
                                />
                            </div>
                            {error && (
                                <span className="mt-1.5 block text-xs font-medium text-brand-red">
                                    Incorrect password. Try again.
                                </span>
                            )}
                        </label>
                        <button
                            type="submit"
                            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red py-2.5 font-display text-sm font-semibold text-white shadow-md shadow-brand-red/25 transition-colors hover:bg-brand-red-dark"
                        >
                            Sign In
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </form>
                    <p className="mt-5 rounded-lg bg-navy-50 px-3.5 py-2.5 text-center text-[11px] text-navy-700">
                        Demo password: <code className="font-bold">lgs2026</code>
                    </p>
                </div>
                <p className="mt-5 text-center">
                    <Link to="/" className="text-xs font-medium text-navy-100/60 transition-colors hover:text-white">
                        ← Back to website
                    </Link>
                </p>
            </div>
        </div>
    );
}

/* ================= Dashboard ================= */

function Dashboard() {
    const { data, reset } = useData();
    const [arm, setArm] = useState(false);

    return (
        <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="font-display text-2xl font-extrabold text-navy-950">Dashboard</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage the content shown on this website. Changes are saved in this browser.
                    </p>
                </div>
                {arm ? (
                    <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                        <span className="text-xs font-semibold text-brand-red">Reset all content?</span>
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setArm(false);
                            }}
                            className="rounded-md bg-brand-red px-2.5 py-1.5 font-display text-[11px] font-bold text-white hover:bg-brand-red-dark"
                        >
                            Yes, reset
                        </button>
                        <button
                            type="button"
                            onClick={() => setArm(false)}
                            className="rounded-md px-2 py-1.5 text-[11px] font-semibold text-slate-500 hover:text-navy-900"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setArm(true)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-display text-sm font-semibold text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-brand-red"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset to Defaults
                    </button>
                )}
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {collections.map((c) => (
                    <Link
                        key={c.key}
                        to={`/admin/${c.key}`}
                        className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800 transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white">
                                <c.icon className="h-5 w-5" />
                            </span>
                            <span className="font-display text-3xl font-extrabold text-navy-950">
                                {(data[c.key] as unknown[]).length}
                            </span>
                        </div>
                        <h2 className="mt-4 font-display text-sm font-bold text-navy-950">{c.label}</h2>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
                            {c.description}
                        </p>
                    </Link>
                ))}
            </div>

            <div className="mt-7 rounded-2xl border border-navy-100 bg-navy-50/60 p-5 text-sm text-navy-800">
                <p className="font-display font-bold">Where your changes are saved</p>
                <p className="mt-1.5 leading-relaxed text-navy-700">
                    Content is stored only in this browser and appears on this device. It does not
                    sync to other visitors or publish to a server. Use <strong>Reset to Defaults</strong>{" "}
                    to restore the original content.
                </p>
            </div>
        </div>
    );
}

/* ================= Layout ================= */

function AdminLayout({ onLogout }: { onLogout: () => void }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const navItem = ({ isActive }: { isActive: boolean }) =>
        cn(
            "flex items-center gap-3 rounded-lg px-3.5 py-2.5 font-display text-[13px] font-semibold transition-colors",
            isActive
                ? "bg-brand-red text-white shadow-md shadow-brand-red/20"
                : "text-navy-100/70 hover:bg-white/10 hover:text-white"
        );

    const sidebar = (
        <>
            <div className="flex items-center gap-2.5 px-4 pb-6 pt-5">
                <LogoMark className="h-9 w-9" />
                <div>
                    <p className="font-display text-sm font-extrabold text-white">LGS Admin</p>
                    <p className="flex items-center gap-1 text-[10px] font-medium text-emerald-400">
                        <ShieldCheck className="h-3 w-3" /> Signed in
                    </p>
                </div>
            </div>
            <nav className="flex-1 space-y-1 px-3" aria-label="Admin">
                <NavLink to="/admin" end className={navItem} onClick={() => setMenuOpen(false)}>
                    <LayoutDashboard className="h-4.5 w-4.5" />
                    Dashboard
                </NavLink>
                {collections.map((c) => (
                    <NavLink
                        key={c.key}
                        to={`/admin/${c.key}`}
                        className={navItem}
                        onClick={() => setMenuOpen(false)}
                    >
                        <c.icon className="h-4.5 w-4.5" />
                        {c.label}
                    </NavLink>
                ))}
            </nav>
            <div className="space-y-1 border-t border-white/10 p-3">
                <Link
                    to="/"
                    className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 font-display text-[13px] font-semibold text-navy-100/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                    <ExternalLink className="h-4.5 w-4.5" />
                    View Website
                </Link>
                <button
                    type="button"
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 font-display text-[13px] font-semibold text-navy-100/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                    <LogOut className="h-4.5 w-4.5" />
                    Log Out
                </button>
            </div>
        </>
    );

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Desktop sidebar */}
            <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-navy-950 lg:flex">
                {sidebar}
            </aside>

            {/* Mobile top bar + drawer */}
            <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between bg-navy-950 px-4 lg:hidden">
                <span className="flex items-center gap-2">
                    <LogoMark className="h-8 w-8" />
                    <span className="font-display text-sm font-extrabold text-white">LGS Admin</span>
                </span>
                <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    className="flex h-9 w-9 items-center justify-center rounded-md text-white hover:bg-white/10"
                >
                    {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>
            {menuOpen && (
                <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setMenuOpen(false)}>
                    <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm" />
                    <aside
                        className="absolute left-0 top-14 flex h-[calc(100%-3.5rem)] w-64 flex-col overflow-y-auto bg-navy-950"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {sidebar}
                    </aside>
                </div>
            )}

            {/* Content */}
            <main className="min-w-0 flex-1 px-4 pb-16 pt-20 sm:px-8 lg:pt-8">
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path=":collection" element={<CollectionPage />} />
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
            </main>
        </div>
    );
}

/* ================= Root ================= */

export default function AdminApp() {
    const [authed, setAuthed] = useState(() => {
        try {
            return sessionStorage.getItem(AUTH_KEY) === "1";
        } catch {
            return false;
        }
    });
    const navigate = useNavigate();

    if (!authed) return <Login onSuccess={() => setAuthed(true)} />;

    return (
        <AdminLayout
            onLogout={() => {
                try {
                    sessionStorage.removeItem(AUTH_KEY);
                } catch {
                    /* noop */
                }
                setAuthed(false);
                navigate("/admin");
            }}
        />
    );
}
