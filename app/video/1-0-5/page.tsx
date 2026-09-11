import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spotly 1.0.5 — Η νέα καταχώριση",
  description:
    "Πολλές θέσεις στον ίδιο χώρο, με ένα συμφωνητικό. Δείτε τη νέα διαδικασία καταχώρισης σε ένα λεπτό.",
  openGraph: { images: ["/email/v105-video-poster.png"] },
};

export default function Page() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#050807",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 26,
        padding: "40px 20px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt=""
          width={34}
          height={34}
          style={{ borderRadius: 9 }}
        />
        <span style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.3px" }}>
          Spotly
        </span>
      </div>

      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <div
          style={{
            display: "inline-block",
            border: "1px solid #1c5c38",
            borderRadius: 100,
            padding: "6px 15px",
            color: "#00E676",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            marginBottom: 14,
          }}
        >
          ΕΚΔΟΣΗ 1.0.5
        </div>
        <h1
          style={{
            fontSize: 30,
            lineHeight: 1.2,
            letterSpacing: "-0.7px",
            margin: "0 0 10px",
          }}
        >
          Η νέα καταχώριση, βήμα βήμα
        </h1>
        <p
          style={{
            color: "#b9c0c7",
            fontSize: 15.5,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Πολλές θέσεις στον ίδιο χώρο, με ένα συμφωνητικό.
        </p>
      </div>

      <video
        controls
        playsInline
        preload="metadata"
        poster="/email/v105-video-poster.png"
        style={{
          maxHeight: "72dvh",
          maxWidth: "100%",
          borderRadius: 18,
          background: "#000",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <source src="/email/v105-listing.mp4" type="video/mp4" />
      </video>

      <a
        href="/"
        style={{
          color: "#00E676",
          fontSize: 14.5,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        parkspotly.gr
      </a>
    </main>
  );
}
