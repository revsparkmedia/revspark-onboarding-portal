"use client";

import Image from "next/image";
import { useState } from "react";

type Creative = {
  name: string;
  image: string;
  metrics: string;
};

const CREATIVES: Creative[] = [
  {
    name: "ED Variant . Week 3",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
    metrics: "CTR 2.4% . CPL $42 . LEADS 38",
  },
  {
    name: "TRT Lifestyle . Week 3",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=225&fit=crop",
    metrics: "CTR 1.9% . CPL $51 . LEADS 27",
  },
  {
    name: "Peptide Intro . Week 2",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=225&fit=crop",
    metrics: "CTR 2.1% . CPL $47 . LEADS 31",
  },
];

function CreativeCard({ creative }: { creative: Creative }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        transition: "transform 0.3s ease",
        transform: hover
          ? "perspective(1000px) rotateY(2deg) translateY(-4px)"
          : "perspective(1000px) rotateY(0deg) translateY(0)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: "12px",
          overflow: "hidden",
          background: "var(--bg-elevated)",
        }}
      >
        <Image
          src={creative.image}
          alt={creative.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: "16px 4px 0" }}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "14px",
            color: "var(--text-primary)",
          }}
        >
          {creative.name}
        </div>
        <div
          style={{
            marginTop: "6px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-secondary)",
            letterSpacing: "0.05em",
          }}
        >
          {creative.metrics}
        </div>
      </div>
    </div>
  );
}

export function CreativeStrip() {
  return (
    <section>
      <div className="eyebrow" style={{ marginBottom: "20px" }}>
        RUNNING THIS WEEK
      </div>
      <div
        style={{
          display: "grid",
          gap: "24px",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        {CREATIVES.map((c) => (
          <CreativeCard key={c.name} creative={c} />
        ))}
      </div>
    </section>
  );
}
