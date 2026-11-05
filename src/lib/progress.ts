import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PracticeResult = "form" | "ember" | "flame" | "fire";
export type Status = "new" | "studied" | "practiced" | "reliable";
export type SortMode = "age" | "practice";

export type Session = {
  at: number;
  result: PracticeResult;
  note: string;
};

type LessonState = {
  status: Status;
  checks: number[];
  sessions: Session[];
};

type ProgressState = {
  activeId: string;
  sort: SortMode;
  lessons: Record<string, LessonState>;
  setActive: (id: string) => void;
  setSort: (sort: SortMode) => void;
  toggleCheck: (id: string, index: number) => void;
  clearChecks: (id: string) => void;
  markStudied: (id: string) => void;
  setReliable: (id: string, reliable: boolean) => void;
  logSession: (id: string, result: PracticeResult, note: string) => void;
  resetAll: () => void;
};

const empty = (): LessonState => ({ status: "new", checks: [], sessions: [] });

function read(lessons: Record<string, LessonState>, id: string): LessonState {
  return lessons[id] ?? empty();
}

export const resultLabel: Record<PracticeResult, string> = {
  form: "Form only",
  ember: "Ember or spark caught",
  flame: "Flame",
  fire: "Fire that held",
};

export const statusLabel: Record<Status, string> = {
  new: "Not started",
  studied: "Read",
  practiced: "Practiced",
  reliable: "Reliable",
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      activeId: "craft",
      sort: "age",
      lessons: {},
      setActive: (id) => set({ activeId: id }),
      setSort: (sort) => set({ sort }),
      toggleCheck: (id, index) =>
        set((state) => {
          const current = read(state.lessons, id);
          const checks = current.checks.includes(index)
            ? current.checks.filter((n) => n !== index)
            : [...current.checks, index];
          return { lessons: { ...state.lessons, [id]: { ...current, checks } } };
        }),
      clearChecks: (id) =>
        set((state) => {
          const current = read(state.lessons, id);
          return { lessons: { ...state.lessons, [id]: { ...current, checks: [] } } };
        }),
      markStudied: (id) =>
        set((state) => {
          const current = read(state.lessons, id);
          if (current.status !== "new") return state;
          return {
            lessons: { ...state.lessons, [id]: { ...current, status: "studied" } },
          };
        }),
      setReliable: (id, reliable) =>
        set((state) => {
          const current = read(state.lessons, id);
          const status: Status = reliable
            ? "reliable"
            : current.sessions.length > 0
              ? "practiced"
              : "studied";
          return { lessons: { ...state.lessons, [id]: { ...current, status } } };
        }),
      logSession: (id, result, note) =>
        set((state) => {
          const current = read(state.lessons, id);
          const session: Session = {
            at: Date.now(),
            result,
            note: note.trim().slice(0, 280),
          };
          const status: Status = current.status === "reliable" ? "reliable" : "practiced";
          return {
            lessons: {
              ...state.lessons,
              [id]: {
                ...current,
                status,
                sessions: [session, ...current.sessions].slice(0, 12),
              },
            },
          };
        }),
      resetAll: () => set({ activeId: "craft", sort: "age", lessons: {} }),
    }),
    { name: "tinderbox-progress-v1", skipHydration: true },
  ),
);

export function useRehydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const api = useProgress.persist;
    const unsub = api.onFinishHydration(() => setReady(true));
    if (api.hasHydrated()) setReady(true);
    else void api.rehydrate();
    return unsub;
  }, []);
  return ready;
}
