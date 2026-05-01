'use client';

export default function TestModeBanner() {
  if (process.env.NEXT_PUBLIC_TEST_MODE !== 'true') return null;

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        background: '#F59E0B',
        color: '#000',
        textAlign: 'center',
        padding: '6px 16px',
        fontFamily: 'monospace',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}
    >
      ● TEST MODE · NO REAL PAYMENTS · USE 4242 CARD OR BYPASS
    </div>
  );
}
