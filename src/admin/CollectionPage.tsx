import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useData } from "@/store/DataContext";
import { getCollection, type CollectionConfig, type FieldDef } from "./config";
import { cn } from "@/utils/cn";

type AnyItem = { id: string;[key: string]: unknown };

/* ---------- form (de)serialization ---------- */

function itemToForm(fields: FieldDef[], item?: AnyItem): Record<string, string> {
    const form: Record<string, string> = {};
    for (const f of fields) {
        const v = item?.[f.name];
        if (f.type === "tags") form[f.name] = Array.isArray(v) ? (v as string[]).join(", ") : "";
        else form[f.name] = v != null ? String(v) : (f.type === "select" ? f.options?.[0]?.value ?? "" : "");
    }
    return form;
}

function formToItem(fields: FieldDef[], form: Record<string, string>): Record<string, unknown> {
    const item: Record<string, unknown> = {};
    for (const f of fields) {
        const raw = (form[f.name] ?? "").trim();
        if (f.type === "tags") {
            item[f.name] = raw
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);
        } else {
            item[f.name] = raw;
        }
    }
    return item;
}

/* ---------- Modal form ---------- */

function ItemModal({
    config,
    item,
    onClose,
}: {
    config: CollectionConfig;
    item: AnyItem | null; // null = create
    onClose: () => void;
}) {
    const { add, update } = useData();
    const [form, setForm] = useState<Record<string, string>>(() =>
        itemToForm(config.fields, item ?? undefined)
    );

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const set = (name: string, value: string) => setForm((f) => ({ ...f, [name]: value }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = formToItem(config.fields, form);
        if (item) update(config.key, item.id, payload);
        else add(config.key, payload);
        onClose();
    };

    const inputCls =
        "w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-navy-950 placeholder:text-slate-400 focus:border-navy-400 focus:bg-white focus:outline-none";

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${item ? "Edit" : "Add"} ${config.singular}`}
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
                <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
                    <h2 className="font-display text-lg font-bold text-navy-950">
                        {item ? `Edit ${config.singular}` : `Add ${config.singular}`}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-navy-900"
                    >
                        <X className="h-4.5 w-4.5" />
                    </button>
                </div>
                <form onSubmit={submit} className="grid gap-4 px-6 py-5">
                    {config.fields.map((f) => (
                        <label key={f.name} className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-navy-900">
                                {f.label}
                                {f.required && <span className="text-brand-red"> *</span>}
                            </span>
                            {f.type === "textarea" ? (
                                <textarea
                                    rows={3}
                                    required={f.required}
                                    value={form[f.name]}
                                    placeholder={f.placeholder}
                                    onChange={(e) => set(f.name, e.target.value)}
                                    className={cn(inputCls, "resize-none")}
                                />
                            ) : f.type === "select" ? (
                                <select
                                    required={f.required}
                                    value={form[f.name]}
                                    onChange={(e) => set(f.name, e.target.value)}
                                    className={inputCls}
                                >
                                    {f.options?.map((o) => (
                                        <option key={o.value} value={o.value}>
                                            {o.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    required={f.required}
                                    value={form[f.name]}
                                    placeholder={f.placeholder}
                                    onChange={(e) => set(f.name, e.target.value)}
                                    className={inputCls}
                                />
                            )}
                            {f.hint && <span className="mt-1.5 block text-[11px] leading-relaxed text-slate-400">{f.hint}</span>}
                        </label>
                    ))}
                    <div className="mt-1 flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg px-4 py-2.5 font-display text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy-900"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-brand-red px-5 py-2.5 font-display text-sm font-semibold text-white shadow-md shadow-brand-red/25 transition-colors hover:bg-brand-red-dark"
                        >
                            {item ? "Save Changes" : `Add ${config.singular}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* ---------- Delete button with inline confirm ---------- */

function DeleteButton({ onDelete }: { onDelete: () => void }) {
    const [arm, setArm] = useState(false);

    useEffect(() => {
        if (!arm) return;
        const t = setTimeout(() => setArm(false), 3000);
        return () => clearTimeout(t);
    }, [arm]);

    return arm ? (
        <button
            type="button"
            onClick={onDelete}
            className="rounded-md bg-brand-red px-2.5 py-1.5 font-display text-[11px] font-bold text-white transition-colors hover:bg-brand-red-dark"
        >
            Confirm?
        </button>
    ) : (
        <button
            type="button"
            onClick={() => setArm(true)}
            aria-label="Delete"
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-50 hover:text-brand-red"
        >
            <Trash2 className="h-4 w-4" />
        </button>
    );
}

/* ---------- Page ---------- */

export default function CollectionPage() {
    const { collection } = useParams();
    const config = getCollection(collection);
    const { data, remove } = useData();
    const [query, setQuery] = useState("");
    const [modal, setModal] = useState<{ open: boolean; item: AnyItem | null }>({
        open: false,
        item: null,
    });

    useEffect(() => setQuery(""), [collection]);

    const items = useMemo(() => {
        if (!config) return [];
        const list = data[config.key] as AnyItem[];
        const q = query.trim().toLowerCase();
        if (!q) return list;
        return list.filter((it) =>
            Object.values(it).some(
                (v) =>
                    (typeof v === "string" && v.toLowerCase().includes(q)) ||
                    (Array.isArray(v) && v.join(" ").toLowerCase().includes(q))
            )
        );
    }, [config, data, query]);

    if (!config) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <p className="font-display text-lg font-bold text-navy-900">Unknown section</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="font-display text-2xl font-extrabold text-navy-950">{config.label}</h1>
                    <p className="mt-1 max-w-xl text-sm text-slate-500">{config.description}</p>
                </div>
                <button
                    type="button"
                    onClick={() => setModal({ open: true, item: null })}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 font-display text-sm font-semibold text-white shadow-md shadow-brand-red/25 transition-all hover:-translate-y-0.5 hover:bg-brand-red-dark"
                >
                    <Plus className="h-4 w-4" />
                    Add {config.singular}
                </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5">
                    <label className="relative block w-full max-w-xs">
                        <span className="sr-only">Search {config.label}</span>
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={`Search ${config.label.toLowerCase()}...`}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:border-navy-400 focus:bg-white focus:outline-none"
                        />
                    </label>
                    <span className="shrink-0 text-xs font-medium text-slate-400">
                        {items.length} {items.length === 1 ? "record" : "records"}
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/60">
                                {config.columns.map((c) => (
                                    <th
                                        key={c.header}
                                        className="px-5 py-3 font-display text-[11px] font-bold uppercase tracking-wider text-slate-400"
                                    >
                                        {c.header}
                                    </th>
                                ))}
                                <th className="px-5 py-3 text-right font-display text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((it) => (
                                <tr
                                    key={it.id}
                                    className="border-b border-slate-50 text-slate-600 transition-colors last:border-0 hover:bg-navy-50/40"
                                >
                                    {config.columns.map((c) => (
                                        <td key={c.header} className="px-5 py-3.5 align-middle">
                                            {c.render(it)}
                                        </td>
                                    ))}
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                type="button"
                                                onClick={() => setModal({ open: true, item: it })}
                                                aria-label="Edit"
                                                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-navy-50 hover:text-navy-800"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <DeleteButton onDelete={() => remove(config.key, it.id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={config.columns.length + 1}
                                        className="px-5 py-14 text-center text-sm text-slate-400"
                                    >
                                        No {config.label.toLowerCase()} found.{" "}
                                        <button
                                            type="button"
                                            onClick={() => setModal({ open: true, item: null })}
                                            className="font-semibold text-brand-red hover:underline"
                                        >
                                            Add the first one
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {modal.open && (
                <ItemModal
                    config={config}
                    item={modal.item}
                    onClose={() => setModal({ open: false, item: null })}
                />
            )}
        </div>
    );
}
