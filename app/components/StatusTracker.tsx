"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type StageState = "complete" | "current" | "future";

const STAGES: { id: number; label: string; state: StageState }[] = [
  { id: 1, label: "WELCOME ABOARD", state: "complete" },
  { id: 2, label: "BUILDING YOUR CAMPAIGNS", state: "complete" },
  { id: 3, label: "READY FOR REVIEW", state: "complete" },
  { id: 4, label: "LIVE ADS", state: "current" },
  { id: 5, label: "OPTIMIZING", state: "future" },
];

function dotForState(state: StageState) {
  if (state === "complete") {
    return (
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "9999px",
          background: "var(--teal)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Check size={8} strokeWidth={4} color="#0A0E0D" />
      </div>
    );
  }
  if (state === "current") {
    return (
      <div
        className="dot-pulse"
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "9999px",
          background: "var(--teal)",
          flexShrink: 0,
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "9999px",
        background: "transparent",
        border: "1px solid var(--border-hairline)",
        flexShrink: 0,
      }}
    />
  );
}

function labelColor(state: StageState) {
  if (state === "current") return "var(--teal)";
  if (state === "complete") return "var(--text-secondary)";
  return "var(--text-muted)";
}

export function StatusTracker() {
  const [open, setOpen] = useState(false);
  const current = STAGES.find((s) => s.state === "current");

  return (
    <section style={{ paddingBottom: "8px" }}>
      <div className="hidden md:block">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            alignItems: "start",
            gap: 0,
            position: "relative",
          }}
        >
          {STAGES.map((stage, i) => {
            const next = STAGES[i + 1];
            const lineColor =
              stage.state === "complete" && next && next.state === "complete"
                ? "var(--teal)"
                : stage.state === "complete" && next && next.state === "current"
                ? "var(--teal)"
                : "var(--border-hairline)";
            return (
              <div
                key={stage.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                    position: "relative",
                    height: "16px",
                  }}
                >
                  {i > 0 && (
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 0,
                        right: "50%",
                        top: "50%",
                        height: "1px",
                        background:
                          STAGES[i - 1].state === "complete"
                            ? "var(--teal)"
                            : "var(--border-hairline)",
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}
                  {i < STAGES.length - 1 && (
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: "50%",
                        right: 0,
                        top: "50%",
                        height: "1px",
                        background: lineColor,
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    {dotForState(stage.state)}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "16px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: labelColor(stage.state),
                    textAlign: "center",
                    lineHeight: 1.3,
                  }}
                >
                  {stage.label}
                </div>
              </div>
            );
          })}
        </div>

        <p
          style={{
            marginTop: "32px",
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: "16px",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}
        >
          Your campaigns went live April 12. We&apos;re now in week 3 of optimization.
        </p>
      </div>

      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="glass-card"
          style={{
            width: "100%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: "16px",
            cursor: "pointer",
            textAlign: "left",
            color: "var(--text-primary)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {current && dotForState(current.state)}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--teal)",
                }}
              >
                {current?.label}
              </span>
            </div>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} color="rgba(245,247,246,0.5)" />
            </motion.div>
          </div>

          <div
            style={{
              width: "100%",
              height: "4px",
              borderRadius: "9999px",
              background: "var(--border-hairline)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "80%",
                height: "100%",
                background: "var(--teal)",
              }}
            />
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {STAGES.map((stage) => (
                  <li
                    key={stage.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    {dotForState(stage.state)}
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: labelColor(stage.state),
                      }}
                    >
                      {stage.label}
                    </span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </button>
        <p
          style={{
            marginTop: "20px",
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: "15px",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}
        >
          Your campaigns went live April 12. We&apos;re now in week 3 of optimization.
        </p>
      </div>
    </section>
  );
}
