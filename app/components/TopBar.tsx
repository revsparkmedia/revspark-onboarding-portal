import Image from "next/image";

export function TopBar() {
  return (
    <header
      className="sticky top-0 z-30 w-full"
      style={{
        backgroundColor: "rgba(10, 14, 13, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border-hairline)",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ padding: "16px 32px" }}
      >
        <div className="flex items-center">
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 800,
              fontSize: "18px",
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
              position: "relative",
              display: "inline-block",
            }}
          >
            <span style={{ position: "relative", display: "inline-block" }}>
              RevSpark
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: "33%",
                  width: "12%",
                  height: "2px",
                  bottom: "-2px",
                  background: "var(--teal)",
                  borderRadius: "1px",
                }}
              />
            </span>
          </span>
        </div>

        <div
          className="flex items-center"
          style={{
            gap: "8px",
            padding: "4px 10px 4px 4px",
            border: "1px solid var(--border-hairline)",
            borderRadius: "9999px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "9999px",
              overflow: "hidden",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face"
              alt="Michelle"
              fill
              sizes="32px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "13px",
              color: "var(--text-primary)",
            }}
          >
            Michelle
          </span>
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
        </div>
      </div>
    </header>
  );
}
