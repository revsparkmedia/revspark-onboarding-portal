export function Footer() {
  return (
    <footer
      style={{
        marginTop: "80px",
        paddingTop: "32px",
        paddingBottom: "48px",
        borderTop: "1px solid var(--border-hairline)",
        textAlign: "center",
        position: "relative",
        zIndex: 10,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 400,
          fontSize: "14px",
          color: "var(--text-muted)",
          margin: 0,
        }}
      >
        RevSpark Media . Built for franchise.
      </p>
    </footer>
  );
}
