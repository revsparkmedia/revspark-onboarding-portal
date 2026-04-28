import Image from "next/image";

const BADGES = [
  "RESPONDS IN UNDER 2 HOURS",
  "WEEKLY 1:1 EVERY THURSDAY",
  "DIRECT SLACK ACCESS",
];

export function AMCard() {
  return (
    <section
      className="glass-card"
      style={{
        marginTop: "60px",
        padding: "clamp(24px, 4vw, 40px)",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        gap: "32px",
      }}
    >
      <div
        style={{
          display: "grid",
          gap: "32px",
          gridTemplateColumns: "minmax(0, 1fr)",
        }}
        className="md:grid md:grid-cols-[35%_65%]"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "9999px",
              overflow: "hidden",
              position: "relative",
              boxShadow:
                "0 0 0 2px rgba(45, 212, 191, 0.3), 0 0 24px rgba(45, 212, 191, 0.2)",
              flexShrink: 0,
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face"
              alt="Michelle Carlson"
              fill
              sizes="96px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              className="online-dot"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                background: "var(--teal)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "var(--text-secondary)",
                textTransform: "uppercase",
              }}
            >
              Available now
            </span>
          </div>
        </div>

        <div>
          <div className="eyebrow">YOUR ACCOUNT MANAGER</div>
          <h3
            style={{
              marginTop: "16px",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "24px",
              color: "var(--text-primary)",
              lineHeight: 1.2,
            }}
          >
            Michelle Carlson . Account Manager
          </h3>
          <p
            style={{
              marginTop: "16px",
              fontFamily: "var(--font-italic), Georgia, serif",
              fontStyle: "italic",
              fontSize: "18px",
              color: "var(--text-secondary)",
              lineHeight: 1.4,
              maxWidth: "560px",
            }}
          >
            Account manager for franchise accounts. Built and ramped multi-location systems for the
            past several years.
          </p>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {BADGES.map((b) => (
              <span
                key={b}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                  padding: "6px 12px",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "9999px",
                }}
              >
                {b}
              </span>
            ))}
          </div>

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
              Book a call
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
              Send a message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
