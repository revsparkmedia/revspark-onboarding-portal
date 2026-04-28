export function WelcomeHeader() {
  return (
    <section
      style={{
        paddingTop: "80px",
        paddingBottom: "48px",
      }}
    >
      <div className="eyebrow" style={{ marginBottom: "24px" }}>
        YOUR LAUNCH
      </div>
      <h1
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.05,
          color: "var(--text-primary)",
          fontSize: "clamp(36px, 6vw, 56px)",
          margin: 0,
        }}
      >
        Welcome aboard, <em className="fraunces-em">Gameday Men&apos;s Health</em>
      </h1>
      <p
        style={{
          marginTop: "20px",
          fontFamily: "var(--font-sans)",
          fontWeight: 400,
          fontSize: "18px",
          color: "var(--text-secondary)",
          lineHeight: 1.5,
        }}
      >
        Plano, TX. 3 days until your ads go live.
      </p>
    </section>
  );
}
