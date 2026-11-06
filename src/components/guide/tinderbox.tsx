import { useEffect, useState } from "react";
import { craft, eraGroups, indoorWarning, isMethod, isPage, methods, pages, readingOrder, type Craft, type GuidePage, type Method } from "@/data/guide";
import { statusLabel, useProgress, useRehydrated, type Status } from "@/lib/progress";
import { Lesson } from "@/components/guide/lesson";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function tally(lessons: Record<string, { status?: Status }>) {
  let practiced = 0;
  let reliable = 0;
  for (const method of methods) {
    const status = lessons[method.id]?.status ?? "new";
    if (status === "practiced" || status === "reliable") practiced += 1;
    if (status === "reliable") reliable += 1;
  }
  return { practiced, reliable };
}

function Dot({ status, onLight }: { status: Status; onLight: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "mt-1.5 size-2 shrink-0 rounded-full",
        status === "new" && (onLight ? "border border-ink/30" : "border border-cream/40"),
        status === "studied" && (onLight ? "bg-ink-soft" : "bg-cream-dim"),
        status === "practiced" && (onLight ? "bg-ember-deep" : "bg-ember"),
        status === "reliable" &&
          (onLight ? "bg-ember-deep ring-2 ring-ink/15" : "bg-ember ring-2 ring-cream"),
      )}
    />
  );
}

function entryNumber(entry: Craft | Method | GuidePage, sort: "age" | "practice", practiceIndex: number) {
  if (!isMethod(entry)) return "·";
  if (sort === "practice") return String(practiceIndex).padStart(2, "0");
  return String(entry.number).padStart(2, "0");
}

export function Tinderbox() {
  const ready = useRehydrated();
  const activeId = useProgress((state) => state.activeId);
  const sort = useProgress((state) => state.sort);
  const lessons = useProgress((state) => state.lessons);
  const setActive = useProgress((state) => state.setActive);
  const setSort = useProgress((state) => state.setSort);
  const resetAll = useProgress((state) => state.resetAll);
  const [confirmReset, setConfirmReset] = useState(false);

  const entries = readingOrder(sort);
  const { practiced, reliable } = tally(lessons);
  const safeActive = entries.some((entry) => entry.id === activeId) ? activeId : craft.id;

  useEffect(() => {
    if (safeActive !== activeId) setActive(safeActive);
  }, [safeActive, activeId, setActive]);

  useEffect(() => {
    const node = document.getElementById(`chip-${safeActive}`);
    node?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [safeActive, sort]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target?.isContentEditable) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const list = readingOrder(useProgress.getState().sort);
      const index = list.findIndex((entry) => entry.id === useProgress.getState().activeId);
      const nextIndex = event.key === "ArrowRight" ? index + 1 : index - 1;
      const next = list[nextIndex];
      if (!next) return;
      event.preventDefault();
      useProgress.getState().setActive(next.id);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  let practiceCounter = 0;

  return (
    <div className="min-h-screen bg-ink text-cream lg:flex lg:h-dvh lg:flex-col lg:overflow-hidden">
      <a
        href="#lesson-top"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-cream focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to the lesson
      </a>

      <header className="px-4 pt-5 pb-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest text-ember uppercase">Field guide</p>
              <h1 className="font-display text-4xl leading-none sm:text-5xl">Tinderbox</h1>
            </div>
            <div className="text-right">
              <p className="font-display text-3xl leading-none tabular-nums">{ready ? practiced : "–"}</p>
              <p className="text-xs text-cream-dim">of {methods.length} practiced</p>
              {ready && reliable > 0 ? (
                <p className="text-xs text-ember tabular-nums">{reliable} reliable</p>
              ) : null}
            </div>
          </div>
          <p className="mt-3 max-w-xl text-sm leading-snug text-cream">
            The Education Revolution Pocket Guide, Volume 21: Making Fire
          </p>
          <p className="text-sm text-cream-dim">by Blue and the Awesome Dudes</p>
          <p className="mt-3 max-w-xl leading-relaxed text-cream-dim">
            Fourteen ways to make a fire, set from the oldest to the newest. Read it as history. Practice it as a craft.
          </p>
          <div className="mt-4 h-1 w-16 bg-ember" />
        </div>
      </header>

      <aside className="border-y border-ember/40 bg-bark px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-widest text-ember uppercase">Never burn indoors</p>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-cream">{indoorWarning}</p>
        </div>
      </aside>

      <details className="border-b border-cream/15 px-4 py-1 sm:px-6">
        <summary className="mx-auto flex min-h-11 max-w-6xl items-center text-sm leading-snug">
          Practice outdoors, only where a fire is legal. Water before flame.
        </summary>
        <div className="mx-auto max-w-6xl pb-4 text-sm leading-relaxed text-cream-dim">
          <ul className="flex max-w-prose list-disc flex-col gap-2 pl-4">
            <li>An adult is always in charge of the fire. Children may gather wood and build cold lays. An adult holds the match, ferro rod, lighter, or lens.</li>
            <li>Keep pets and small children a safe distance from the fire and from hot pans and coals.</li>
            <li>Never leave a fire unattended.</li>
            <li>Keep fires well away from houses, decks, tents, fences, dry brush, and overhanging branches.</li>
            <li>Check local burn bans and permits every time. A ban means no flame practice that day.</li>
            <li>Clear to mineral soil or use a fire pan. On a windy or crackling-dry day, practice motions with no flame.</li>
            <li>Set water beside you before the first spark. Extinguish by drowning, stirring, and drowning again. Cold to the back of the hand.</li>
            <li>Knives cut away from the body. Coals move on sticks, not fingers. A char-cloth tin can flare if you open it hot.</li>
            <li>Chemical mixes, batteries shorted through steel wool, and homemade accelerants are not in this guide.</li>
          </ul>
        </div>
      </details>

      <div className="sticky top-0 z-20 border-b border-cream/10 bg-ink lg:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-2">
          <SortToggle sort={sort} setSort={setSort} />
          <p className="text-xs text-cream-dim">Swipe the line</p>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3">
          {entries.map((entry) => {
            const selected = entry.id === safeActive;
            const number = !isMethod(entry)
              ? "·"
              : sort === "practice"
                ? String(entry.practiceRank).padStart(2, "0")
                : String(entry.number).padStart(2, "0");
            return (
              <button
                key={entry.id}
                id={`chip-${entry.id}`}
                type="button"
                aria-current={selected ? "page" : undefined}
                onClick={() => setActive(entry.id)}
                className={cn(
                  "flex min-h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-semibold",
                  selected ? "bg-cream text-ink" : "bg-bark text-cream",
                )}
              >
                <span className={cn("tabular-nums", selected ? "text-ember-deep" : "text-ember")}>{number}</span>
                {entry.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl lg:min-h-0 lg:flex-1 lg:grid-cols-[auto_minmax(0,1fr)] lg:overflow-hidden">
        <aside className="hidden w-72 overflow-y-auto px-4 py-4 lg:block">
          <SortToggle sort={sort} setSort={setSort} />
          <p className="mt-3 text-sm leading-relaxed text-cream-dim">
            {sort === "age"
              ? "Oldest to newest. Left and right arrows move along the line."
              : "A saner order to practice in. Historical numbers stay on each lesson."}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-cream-dim">
            <li className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-cream-dim" /> Read
            </li>
            <li className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-ember" /> Practiced
            </li>
            <li className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-ember ring-2 ring-cream" /> Reliable
            </li>
          </ul>
          <nav className="mt-4" aria-label="Methods">
            <ol className="flex flex-col">
              {entries.map((entry) => {
                const selected = entry.id === safeActive;
                const status: Status = lessons[entry.id]?.status ?? "new";
                let groupLabel: string | null = null;
                if (isPage(entry)) {
                  if (entry.id === pages[0]?.id) groupLabel = "This volume";
                } else if (sort === "age") {
                  if (!isMethod(entry)) groupLabel = "Shared craft";
                  else {
                    const previousMethod = entries
                      .slice(0, entries.indexOf(entry))
                      .filter(isMethod)
                      .at(-1);
                    if (!previousMethod || previousMethod.eraGroup !== entry.eraGroup) {
                      groupLabel = eraGroups.find((group) => group.id === entry.eraGroup)?.label ?? null;
                    }
                  }
                }
                const practiceIndex = isMethod(entry) ? ++practiceCounter : 0;
                return (
                  <li key={entry.id}>
                    {groupLabel ? (
                      <p className="mt-4 mb-1 px-2 text-xs font-semibold tracking-widest text-cream-dim uppercase">
                        {groupLabel}
                      </p>
                    ) : null}
                    <button
                      type="button"
                      aria-current={selected ? "page" : undefined}
                      aria-label={`${entry.name}, ${statusLabel[status]}`}
                      onClick={() => setActive(entry.id)}
                      className={cn(
                        "flex min-h-11 w-full items-start gap-3 rounded-md px-2 py-2 text-left",
                        selected ? "bg-cream text-ink" : "hover:bg-bark",
                      )}
                    >
                      <span
                        className={cn(
                          "w-7 shrink-0 pt-0.5 font-display tabular-nums",
                          selected ? "text-ember-deep" : "text-ember",
                        )}
                      >
                        {entryNumber(entry, sort, practiceIndex)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{entry.name}</span>
                        <span className={cn("block text-sm", selected ? "text-ink-soft" : "text-cream-dim")}>
                          {isMethod(entry) ? entry.era : isPage(entry) ? entry.navNote : "Lays, tinder, and putting it out"}
                        </span>
                      </span>
                      <Dot status={status} onLight={selected} />
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
          <div className="mt-6 border-t border-cream/15 pt-4">
            {confirmReset ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-cream-dim">Erase the log kept on this device?</p>
                <button
                  type="button"
                  className="btn btn-night"
                  onClick={() => {
                    resetAll();
                    setConfirmReset(false);
                  }}
                >
                  Erase the log
                </button>
                <button type="button" className="btn btn-night" onClick={() => setConfirmReset(false)}>
                  Keep it
                </button>
              </div>
            ) : (
              <button type="button" className="min-h-11 text-sm text-cream-dim" onClick={() => setConfirmReset(true)}>
                Reset this device’s log
              </button>
            )}
          </div>
        </aside>

        <main className="min-w-0 px-4 py-4 sm:px-6 lg:overflow-y-auto lg:py-6 lg:pr-6 lg:pl-2">
          <Lesson />
          <p className="mx-auto mt-6 mb-4 max-w-prose text-sm leading-relaxed text-cream-dim">
            The newest method is not the best one. It is only the latest. Know one flame, and one spark that still works when the battery is dead.
          </p>
          <p className="mx-auto mb-10 max-w-prose text-sm leading-relaxed text-cream-dim">
            Privacy: This guide does not collect your name, email, or any personal information. Your practice log is saved only on your own device.
          </p>
        </main>
      </div>
    </div>
  );
}

function SortToggle({
  sort,
  setSort,
}: {
  sort: "age" | "practice";
  setSort: (sort: "age" | "practice") => void;
}) {
  return (
    <div className="flex w-full rounded-lg bg-bark p-1">
      {(
        [
          ["age", "By age"],
          ["practice", "To practice"],
        ] as const
      ).map(([value, label]) => (
        <button
          key={value}
          type="button"
          aria-pressed={sort === value}
          onClick={() => setSort(value)}
          className={cn(
            "min-h-11 flex-1 rounded-md px-3 text-sm font-semibold",
            sort === value ? "bg-cream text-ink" : "text-cream-dim",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
