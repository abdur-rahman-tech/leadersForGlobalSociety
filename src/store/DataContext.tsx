import { createContext, useContext, useEffect, useState } from "react";
import { defaultData, makeId, type AppData, type CollectionKey } from "@/data";

type DataContextType = {
    data: AppData;
    add: (collection: CollectionKey, item: Record<string, unknown>) => void;
    update: (collection: CollectionKey, id: string, item: Record<string, unknown>) => void;
    remove: (collection: CollectionKey, id: string) => void;
    reset: () => void;
};

const DataContext = createContext<DataContextType | null>(null);

const STORAGE_KEY = "lgs-admin-data";

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<AppData>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (saved) {
                return JSON.parse(saved) as AppData;
            }
        } catch {
            // Use default data if saved data is invalid.
        }

        return defaultData;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    const add = (collection: CollectionKey, item: Record<string, unknown>) => {
        setData((prev) => {
            const records = prev[collection] as unknown as Record<string, unknown>[];
            return {
                ...prev,
                [collection]: [...records, { ...item, id: makeId() }],
            } as AppData;
        });
    };

    const update = (
        collection: CollectionKey,
        id: string,
        item: Record<string, unknown>
    ) => {
        setData((prev) => {
            const records = prev[collection] as unknown as Record<string, unknown>[];
            return {
                ...prev,
                [collection]: records.map((record) =>
                    record.id === id ? { ...record, ...item } : record
                ),
            } as AppData;
        });
    };

    const remove = (collection: CollectionKey, id: string) => {
        setData((prev) => {
            const records = prev[collection] as unknown as Record<string, unknown>[];
            return {
                ...prev,
                [collection]: records.filter((record) => record.id !== id),
            } as AppData;
        });
    };

    const reset = () => {
        setData(defaultData);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <DataContext.Provider
            value={{
                data,
                add,
                update,
                remove,
                reset,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);

    if (!context) {
        throw new Error("useData must be used inside DataProvider");
    }

    return context;
}