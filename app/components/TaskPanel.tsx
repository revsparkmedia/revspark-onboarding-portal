type TaskTone = "amber" | "teal";

type Task = {
  tone: TaskTone;
  title: string;
  description: string;
  due: string;
  optional: boolean;
};

const TASKS: Task[] = [
  {
    tone: "amber",
    title: "Approve creative variants",
    description:
      "Three Meta ad variants are ready for your sign-off. Approving by tomorrow keeps your launch on Day 10.",
    due: "DUE TOMORROW",
    optional: false,
  },
  {
    tone: "amber",
    title: "Upload final clinic photos",
    description:
      "We have your hero shots. Two interior photos would round out the creative library before launch.",
    due: "DUE BY DAY 9",
    optional: false,
  },
  {
    tone: "teal",
    title: "Schedule your launch-day check-in",
    description:
      "Michelle wants to walk you through the live dashboard the moment ads turn on.",
    due: "OPTIONAL",
    optional: true,
  },
  {
    tone: "teal",
    title: "Review your brand voice doc",
    description:
      "We've drafted your messaging guardrails based on your intake call. Read-through takes 5 minutes.",
    due: "OPTIONAL",
    optional: true,
  },
];

function StatusDot({ tone }: { tone: TaskTone }) {
  const color = tone === "amber" ? "var(--amber)" : "var(--teal)";
  const glow =
    tone === "amber" ? "var(--amber-glow)" : "var(--teal-glow)";
  return (
    <span
      style={{
        width: "8px",
        height: "8px",
        borderRadius: "9999px",
        background: color,
        display: "inline-block",
        flexShrink: 0,
        boxShadow: `0 0 0 4px ${glow}`,
      }}
    />
  );
}

function GhostButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      style={{
        background: "transparent",
        color: "var(--text-secondary)",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        fontSize: "12px",
        padding: "6px 12px",
        borderRadius: "9999px",
        border: "1px solid var(--border-hairline)",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

export function TaskPanel() {
  return (
    <section>
      <div className="eyebrow" style={{ marginBottom: "20px" }}>
        WHAT YOU CAN DO NOW
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {TASKS.map((task, i) => {
          const dueColor = task.optional || task.tone === "teal"
            ? task.optional
              ? "var(--text-muted)"
              : task.tone === "amber"
                ? "var(--amber)"
                : "var(--text-muted)"
            : "var(--amber)";
          return (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: "20px",
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <div style={{ paddingTop: "6px" }}>
                <StatusDot tone={task.tone} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "var(--text-primary)",
                        margin: 0,
                      }}
                    >
                      {task.title}
                    </h3>
                    <p
                      style={{
                        marginTop: "6px",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                        maxWidth: "480px",
                      }}
                    >
                      {task.description}
                    </p>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      color: dueColor,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {task.due}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <GhostButton>Mark complete</GhostButton>
                  <GhostButton>Snooze</GhostButton>
                  <GhostButton>Question?</GhostButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
