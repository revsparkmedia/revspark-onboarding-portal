type Trend = "positive" | "neutral" | "negative";

type KPI = {
  label: string;
  value: string;
  trendLabel: string;
  trend: Trend;
};

const KPIS: KPI[] = [
  { label: "CAC", value: "$216", trendLabel: "DOWN 18%", trend: "positive" },
  { label: "BOOKED CONSULTS", value: "47", trendLabel: "UP 12%", trend: "positive" },
  { label: "PAYING CUSTOMERS", value: "29", trendLabel: "UP 8%", trend: "positive" },
  { label: "MONTH SPEND", value: "$8,420", trendLabel: "ON PACE", trend: "neutral" },
];

function trendColor(t: Trend) {
  if (t === "positive") return "var(--teal)";
  if (t === "negative") return "var(--amber)";
  return "var(--text-muted)";
}

export function KPIStrip() {
  return (
    <section>
      <div className="eyebrow">ONCE YOU&apos;RE LIVE</div>
      <h2
        style={{
          marginTop: "12px",
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: "22px",
          color: "var(--text-primary)",
          lineHeight: 1.3,
        }}
      >
        This is where you&apos;ll see your weekly performance.
      </h2>
      <p
        style={{
          marginTop: "8px",
          fontFamily: "var(--font-sans)",
          fontWeight: 400,
          fontSize: "14px",
          color: "var(--text-secondary)",
          lineHeight: 1.5,
          maxWidth: "520px",
        }}
      >
        Sample view from a comparable Gameday location. Yours starts populating on Day 11.
      </p>

      <div
        style={{
          marginTop: "24px",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "0",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "var(--text-muted)",
            padding: "4px 8px",
            border: "1px solid var(--border-hairline)",
            borderRadius: "9999px",
            background: "var(--bg-base)",
            zIndex: 2,
          }}
        >
          PREVIEW
        </span>
        <div
          style={{
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            opacity: 0.6,
          }}
        >
          {KPIS.map((kpi) => (
            <div
              key={kpi.label}
              className="glass-card"
              style={{
                padding: "20px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                  }}
                >
                  {kpi.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.05em",
                    color: trendColor(kpi.trend),
                    padding: "4px 8px",
                    border: `1px solid ${
                      kpi.trend === "neutral"
                        ? "var(--border-hairline)"
                        : kpi.trend === "positive"
                          ? "var(--border-emphasis)"
                          : "rgba(245, 158, 11, 0.3)"
                    }`,
                    borderRadius: "9999px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {kpi.trendLabel}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: "38px",
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                  marginTop: "8px",
                }}
              >
                {kpi.value}
              </div>
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "2px",
                  background: "var(--teal)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
