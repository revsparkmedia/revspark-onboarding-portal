type StatusKind = "in-review" | "ready" | "live";

type BuildItem = {
  title: string;
  description: string;
  status: StatusKind;
  statusLabel: string;
};

const ITEMS: BuildItem[] = [
  {
    title: "Meta Campaigns",
    description:
      "Three creative variants drafted. Compliance review wraps tomorrow.",
    status: "in-review",
    statusLabel: "IN REVIEW",
  },
  {
    title: "Google Search",
    description:
      "Keywords mapped, ad copy written, awaiting your final approval.",
    status: "ready",
    statusLabel: "READY",
  },
  {
    title: "Lead Routing",
    description:
      "GHL configured for Plano office hours with after-hours fallback to your lead response team.",
    status: "live",
    statusLabel: "LIVE",
  },
  {
    title: "Tracking & Pixels",
    description:
      "Meta and Google pixels wired and tested on your booking flow.",
    status: "live",
    statusLabel: "LIVE",
  },
];

function StatusPill({ item }: { item: BuildItem }) {
  if (item.status === "in-review") {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--amber)",
          padding: "4px 8px",
          border: "1px solid var(--amber)",
          borderRadius: "9999px",
          background: "rgba(245, 158, 11, 0.08)",
          whiteSpace: "nowrap",
        }}
      >
        {item.statusLabel}
      </span>
    );
  }
  if (item.status === "ready") {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--teal)",
          padding: "4px 8px",
          border: "1px solid var(--teal)",
          borderRadius: "9999px",
          background: "rgba(45, 212, 191, 0.08)",
          whiteSpace: "nowrap",
        }}
      >
        {item.statusLabel}
      </span>
    );
  }
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        letterSpacing: "0.1em",
        color: "var(--teal)",
        padding: "4px 8px",
        border: "1px solid var(--teal)",
        borderRadius: "9999px",
        background: "rgba(45, 212, 191, 0.08)",
        whiteSpace: "nowrap",
      }}
    >
      <span
        className="dot-pulse"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "9999px",
          background: "var(--teal)",
          display: "inline-block",
        }}
      />
      {item.statusLabel}
    </span>
  );
}

export function BuildStatus() {
  return (
    <section>
      <div className="eyebrow" style={{ marginBottom: "20px" }}>
        BEING BUILT THIS WEEK
      </div>
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className="glass-card"
            style={{
              padding: "24px",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <StatusPill item={item} />
            </div>
            <h3
              style={{
                marginTop: "16px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "16px",
                color: "var(--text-primary)",
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                marginTop: "8px",
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
