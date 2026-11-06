import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
  difficultyLabel,
  findEntry,
  ignitionLabel,
  indoorWarning,
  isMethod,
  isPage,
  readingOrder,
  methods,
  type Method,
} from "@/data/guide";
import {
  resultLabel,
  statusLabel,
  useProgress,
  type PracticeResult,
} from "@/lib/progress";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function SectionTitle({
  children,
  action,
}: {
  children: string;
  action?: ReactNode;
}) {
  return (
    <div className="mt-8 mb-3 flex items-end justify-between gap-3 border-b border-ink/10 pb-2">
      <h3 className="font-display text-2xl">{children}</h3>
      {action}
    </div>
  );
}

function Difficulty({ value }: { value: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="inline-flex gap-1" aria-hidden>
        {[1, 2, 3, 4, 5].map((bar) => (
          <span
            key={bar}
            className={cn("h-2 w-3 rounded-sm", bar <= value ? "bg-ember-deep" : "bg-ink/15")}
          />
        ))}
      </span>
      <span>{difficultyLabel[value]}</span>
    </span>
  );
}

function PracticeOrder() {
  const setActive = useProgress((state) => state.setActive);
  const ranked = [...methods].sort((a, b) => a.practiceRank - b.practiceRank);
  return (
    <ol className="mt-3 flex flex-col gap-2">
      {ranked.map((method, index) => (
        <li key={method.id}>
          <button
            type="button"
            onClick={() => setActive(method.id)}
            className="flex min-h-11 w-full items-baseline gap-3 rounded-md bg-cream-2 px-3 py-2 text-left hover:bg-ink/5"
          >
            <span className="w-6 shrink-0 font-display text-ember-deep tabular-nums">
              {index + 1}
            </span>
            <span className="min-w-0">
              <span className="block font-semibold">{method.name}</span>
              <span className="block text-sm text-ink-soft">
                No. {String(method.number).padStart(2, "0")} on the line · {difficultyLabel[method.difficulty]}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}

function Meta({ method }: { method: Method }) {
  const rows = [
    ["Era", method.era],
    ["When", method.circa],
    ["Where it lived", method.origin],
    ["Ignition", ignitionLabel[method.ignition]],
    ["Weather", method.weather],
    ["Time to learn", method.learn],
  ];
  return (
    <dl className="mt-6 grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <dt className="text-sm font-semibold text-ink-soft">Difficulty</dt>
        <dd className="mt-1">
          <Difficulty value={method.difficulty} />
        </dd>
      </div>
      {rows.map(([label, value]) => (
        <div key={label} className={label === "Weather" ? "sm:col-span-2" : undefined}>
          <dt className="text-sm font-semibold text-ink-soft">{label}</dt>
          <dd className="mt-1 leading-relaxed">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function PracticeLog({ id }: { id: string }) {
  const lessonState = useProgress((state) => state.lessons[id]);
  const sessions = lessonState?.sessions ?? [];
  const status = lessonState?.status ?? "new";
  const logSession = useProgress((state) => state.logSession);
  const setReliable = useProgress((state) => state.setReliable);
  const [result, setResult] = useState<PracticeResult>("form");
  const [note, setNote] = useState("");

  useEffect(() => {
    setResult("form");
    setNote("");
  }, [id]);

  return (
    <form
      className="mt-3 flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        logSession(id, result, note);
        setNote("");
        setResult("form");
      }}
    >
      <p className="text-sm leading-relaxed text-ink-soft">
        A cold run counts. Log form-only if you practiced the motions without a flame.
      </p>
      <fieldset className="grid gap-2 sm:grid-cols-2">
        <legend className="sr-only">What happened</legend>
        {(Object.keys(resultLabel) as PracticeResult[]).map((key) => (
          <label
            key={key}
            className={cn(
              "flex min-h-11 cursor-pointer items-center gap-2 rounded-md px-3",
              result === key ? "bg-ember-deep text-cream" : "bg-cream-2 text-ink",
            )}
          >
            <input
              type="radio"
              name="practice-result"
              value={key}
              checked={result === key}
              onChange={() => setResult(key)}
              className="size-4 accent-ember-deep"
            />
            {resultLabel[key]}
          </label>
        ))}
      </fieldset>
      <label className="block">
        <span className="sr-only">Note</span>
        <textarea
          value={note}
          maxLength={280}
          rows={3}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Wind, wood, what failed, what you will change."
          className="w-full rounded-md bg-cream-2 px-3 py-2 text-ink outline-none placeholder:text-ink-soft"
        />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn btn-ember">
          Log this practice
        </button>
        {status === "practiced" ? (
          <button type="button" className="btn btn-quiet" onClick={() => setReliable(id, true)}>
            I can do this reliably
          </button>
        ) : null}
        {status === "reliable" ? (
          <button type="button" className="btn btn-quiet" onClick={() => setReliable(id, false)}>
            Not reliable yet
          </button>
        ) : null}
        <span className="text-sm text-ink-soft tabular-nums sm:ml-auto">{note.length}/280</span>
      </div>
      {sessions.length > 0 ? (
        <ul className="mt-2 flex flex-col gap-3 border-t border-ink/10 pt-3">
          {sessions.map((session) => (
            <li key={session.at} className="text-sm leading-relaxed">
              <span className="font-semibold">
                {new Date(session.at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="text-ink-soft"> · {resultLabel[session.result]}</span>
              {session.note ? <p className="mt-1 text-ink">{session.note}</p> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-ink-soft">No sessions yet on this device.</p>
      )}
    </form>
  );
}

export function Lesson() {
  const activeId = useProgress((state) => state.activeId);
  const sort = useProgress((state) => state.sort);
  const lessonState = useProgress((state) => state.lessons[activeId]);
  const status = lessonState?.status ?? "new";
  const checks = lessonState?.checks ?? [];
  const toggleCheck = useProgress((state) => state.toggleCheck);
  const clearChecks = useProgress((state) => state.clearChecks);
  const markStudied = useProgress((state) => state.markStudied);
  const setReliable = useProgress((state) => state.setReliable);
  const setActive = useProgress((state) => state.setActive);

  const entry = findEntry(activeId);
  const method = isMethod(entry) ? entry : null;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    headingRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [entry.id]);

  const entries = readingOrder(sort);
  const index = entries.findIndex((item) => item.id === entry.id);
  const prev = index > 0 ? entries[index - 1] : undefined;
  const next = index >= 0 && index < entries.length - 1 ? entries[index + 1] : undefined;

  const pager = (
    <nav className="mt-8 flex flex-col gap-2 border-t border-ink/10 pt-4 sm:flex-row sm:justify-between" aria-label="Along the line">
      {prev ? (
        <button type="button" className="btn btn-quiet w-full sm:w-auto" onClick={() => setActive(prev.id)}>
          <ChevronLeft className="size-4" aria-hidden />
          {prev.name}
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <button type="button" className="btn btn-ember w-full sm:ml-auto sm:w-auto" onClick={() => setActive(next.id)}>
          {next.name}
          <ChevronRight className="size-4" aria-hidden />
        </button>
      ) : null}
    </nav>
  );

  if (isPage(entry)) {
    return (
      <article id="lesson-top" key={entry.id} className="lesson-swap scroll-mt-24 rounded-xl bg-cream text-ink shadow-sheet">
        <header className="border-b border-ink/10 px-5 py-6 sm:px-8">
          <p className="text-sm font-semibold tracking-widest text-ember-deep uppercase">This volume</p>
          <h2 ref={headingRef} tabIndex={-1} className="mt-2 font-display text-4xl outline-none sm:text-5xl">
            {entry.name}
          </h2>
          <p className="mt-2 font-display text-xl text-ink-soft italic">{entry.epithet}</p>
          <p className="mt-4 max-w-prose text-lg leading-relaxed">{entry.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-cream-2 px-3 py-2 text-sm font-semibold">{statusLabel[status]}</span>
            {status === "new" ? (
              <button type="button" className="btn btn-quiet" onClick={() => markStudied(entry.id)}>
                Mark as read
              </button>
            ) : null}
          </div>
        </header>
        <div className="px-5 py-6 sm:px-8">
          {entry.sections.map((section) => (
            <section key={section.title} className="mt-8 first:mt-0">
              <h3 className="font-display text-2xl">{section.title}</h3>
              {section.items ? (
                section.ordered ? (
                  <ol className="mt-3 flex max-w-prose list-decimal flex-col gap-2 pl-5 leading-relaxed">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                ) : (
                  <ul className="mt-3 flex max-w-prose list-disc flex-col gap-2 pl-5 leading-relaxed">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )
              ) : null}
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-3 max-w-prose leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          {pager}
        </div>
      </article>
    );
  }

  return (
    <article id="lesson-top" key={entry.id} className="lesson-swap scroll-mt-24 rounded-xl bg-cream text-ink shadow-sheet">
      <header className="border-b border-ink/10 px-5 py-6 sm:px-8">
        <p className="text-sm font-semibold tracking-widest text-ember-deep uppercase">
          {method ? `No. ${String(method.number).padStart(2, "0")} · ${method.era}` : "Before the line"}
        </p>
        <h2 ref={headingRef} tabIndex={-1} className="mt-2 font-display text-4xl outline-none sm:text-5xl">
          {entry.name}
        </h2>
        <p className="mt-2 font-display text-xl text-ink-soft italic">{entry.epithet}</p>
        <p className="mt-4 max-w-prose text-lg leading-relaxed">{entry.summary}</p>
        <blockquote className="mt-4 max-w-prose border-l-2 border-ember-deep pl-4 font-display text-lg text-ink italic">
          {entry.principle}
        </blockquote>
        {method ? <Meta method={method} /> : null}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-cream-2 px-3 py-2 text-sm font-semibold">
            {statusLabel[status]}
          </span>
          {status === "new" ? (
            <button type="button" className="btn btn-quiet" onClick={() => markStudied(entry.id)}>
              Mark as read
            </button>
          ) : null}
          {status === "practiced" ? (
            <button type="button" className="btn btn-quiet" onClick={() => setReliable(entry.id, true)}>
              I can do this reliably
            </button>
          ) : null}
          {status === "reliable" ? (
            <button type="button" className="btn btn-quiet" onClick={() => setReliable(entry.id, false)}>
              Not reliable yet
            </button>
          ) : null}
        </div>
      </header>

      <div className="px-5 py-6 sm:px-8">
        {method ? (
          <p className="max-w-prose leading-relaxed text-ink-soft">{method.place}</p>
        ) : (
          <div>
            <p className="max-w-prose border-l-2 border-ember-deep bg-cream-2 px-4 py-3 text-sm leading-relaxed">
              <span className="font-semibold tracking-wide uppercase">Never burn indoors. </span>
              {indoorWarning}
            </p>
            <h3 className="mt-8 font-display text-2xl">Read by age. Practice by this path.</h3>
            <p className="mt-2 max-w-prose leading-relaxed">
              The line is an approximate order, from older ideas toward newer ones. Methods overlap in time, so the sequence is a way to read, not a proof of what came first. If you practice in that same order, you will spend the first day failing a hand drill and learning nothing about fire. Build the lays, light them with an easy flame, then earn the older tools. The kept-fire lesson is history and a cold drill, not a live coal you carry.
            </p>
            <PracticeOrder />
          </div>
        )}

        {entry.caution ? (
          <p className="mt-6 max-w-prose border-l-2 border-ember-deep bg-cream-2 px-4 py-3 text-sm leading-relaxed">
            {entry.caution}
          </p>
        ) : null}

        <SectionTitle>Kit</SectionTitle>
        <ul className="flex max-w-prose flex-col gap-3">
          {entry.kit.map((item) => (
            <li key={item.item}>
              <p className="font-semibold">{item.item}</p>
              <p className="leading-relaxed text-ink-soft">{item.note}</p>
            </li>
          ))}
        </ul>

        <SectionTitle
          action={
            checks.length > 0 ? (
              <button
                type="button"
                className="min-h-11 px-2 text-sm font-semibold text-ember-deep"
                onClick={() => clearChecks(entry.id)}
              >
                Clear checks
              </button>
            ) : null
          }
        >
          Steps
        </SectionTitle>
        <ol className="max-w-prose">
          {entry.steps.map((step, index) => {
            const on = checks.includes(index);
            return (
              <li key={step.title} className="flex gap-3 border-t border-ink/10 py-4">
                <button
                  type="button"
                  aria-pressed={on}
                  aria-label={on ? `Mark step ${index + 1} not done` : `Mark step ${index + 1} done`}
                  onClick={() => toggleCheck(entry.id, index)}
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-md",
                    on ? "bg-ember-deep text-cream" : "bg-cream-2 text-ink-soft",
                  )}
                >
                  {on ? (
                    <Check className="size-5" aria-hidden />
                  ) : (
                    <span className="font-display tabular-nums">{index + 1}</span>
                  )}
                </button>
                <div className="min-w-0 pt-2">
                  <p className="font-semibold">{step.title}</p>
                  <p className="mt-1 leading-relaxed">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <SectionTitle>When it fails</SectionTitle>
        <ul className="flex max-w-prose flex-col gap-4">
          {entry.faults.map((fault) => (
            <li key={fault.problem}>
              <p className="font-semibold">{fault.problem}</p>
              <p className="mt-1 leading-relaxed">{fault.fix}</p>
            </li>
          ))}
        </ul>

        <SectionTitle>Drill</SectionTitle>
        <div className="max-w-prose rounded-lg bg-cream-2 p-4">
          <p className="font-display text-xl">{entry.drill.title}</p>
          <p className="mt-2 leading-relaxed">{entry.drill.goal}</p>
          <ol className="mt-3 flex list-decimal flex-col gap-2 pl-5 leading-relaxed">
            {entry.drill.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-3 text-sm leading-relaxed">
            <span className="font-semibold">Done when. </span>
            {entry.drill.success}
          </p>
        </div>

        <SectionTitle>Practice log</SectionTitle>
        <PracticeLog id={entry.id} />

        {pager}
      </div>
    </article>
  );
}
