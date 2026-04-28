export function CountdownCard() {
  return (
    <section
      className="glass-card"
      style={{
        padding: "clamp(28px, 4vw, 40px)",
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
        <div className="eyebrow">LAUNCH STATUS</div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          DAY 7 OF 10
        </div>
      </div>

      <div
        style={{
          marginTop: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            fontSize: "96px",
            lineHeight: 1,
            color: "var(--teal)",
          }}
        >
          3
        </div>
        <div
          style={{
            marginTop: "16px",
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          DAYS UNTIL YOUR ADS GO LIVE
        </div>
      </div>

      <p
        style={{
          marginTop: "32px",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "560px",
          textAlign: "center",
          fontFamily: "var(--font-sans)",
          fontWeight: 400,
          fontSize: "16px",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
        }}
      >
        Your Meta campaigns are 80 percent built. Google Search is wired and awaiting final keyword
        review. Two creative variants are with our compliance team. We are on track for Day 10.
      </p>

      <div
        style={{
          marginTop: "32px",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
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
          See what&apos;s being built
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
          Talk to Michelle
        </button>
      </div>
    </section>
  );
}
