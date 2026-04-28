export function InsightCard() {
  return (
    <section
      className="glass-card"
      style={{
        padding: "clamp(24px, 4vw, 32px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div className="eyebrow">THIS WEEK</div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          WEEK OF APR 22 . APR 28
        </div>
      </div>

      <h2
        style={{
          marginTop: "20px",
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "clamp(22px, 3vw, 28px)",
          lineHeight: 1.2,
          color: "var(--text-primary)",
        }}
      >
        Your CAC dropped <em className="fraunces-em">18%</em> this week.
      </h2>

      <p
        style={{
          marginTop: "16px",
          fontFamily: "var(--font-sans)",
          fontWeight: 400,
          fontSize: "16px",
          color: "var(--text-secondary)",
          lineHeight: 1.5,
        }}
      >
        Top driver: a new ED-focused creative variant your AM staged last Tuesday. The variant is
        now scaled to 60 percent of total Meta spend. Two more variants are in the queue for next
        week.
      </p>

      <div
        style={{
          marginTop: "32px",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <button
          type="button"
          style={{
            background: "var(--teal)",
            color: "#0A0E0D",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "14px",
            padding: "10px 20px",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
          }}
        >
          See full breakdown
        </button>
        <button
          type="button"
          style={{
            background: "transparent",
            color: "var(--text-primary)",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "14px",
            padding: "10px 20px",
            borderRadius: "9999px",
            border: "1px solid var(--border-hairline)",
            cursor: "pointer",
          }}
        >
          Send to my partner
        </button>
      </div>
    </section>
  );
}
