import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spotly — Η νέα καταχώριση θέσης",
  description:
    "Δες ολόκληρη τη νέα ροή καταχώρισης θέσης στη Spotly, από τη διεύθυνση μέχρι την ψηφιακή υπογραφή.",
};

export default function UpdateVideoPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 20px 72px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 520 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            marginBottom: 28,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt=""
            width={34}
            height={34}
            style={{ borderRadius: 9, display: "block" }}
          />
          <span style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.3px" }}>
            Spotly
          </span>
        </div>

        <div
          style={{
            display: "inline-block",
            border: "1px solid #1c5c38",
            borderRadius: 100,
            padding: "6px 15px",
            color: "#00E676",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "2px",
            marginBottom: 18,
          }}
        >
          ΝΕΟ UPDATE
        </div>

        <h1
          style={{
            fontSize: 30,
            lineHeight: 1.18,
            letterSpacing: "-0.8px",
            fontWeight: 800,
            margin: "0 0 12px 0",
          }}
        >
          Η καταχώριση θέσης,
          <br />
          <span style={{ color: "#00E676" }}>από την αρχή ως το τέλος</span>
        </h1>

        <p
          style={{
            color: "#b9c0c7",
            fontSize: 16,
            lineHeight: 1.62,
            margin: "0 0 28px 0",
          }}
        >
          Διεύθυνση, σημείο εισόδου στον χάρτη, τύπος θέσης, πρόσβαση, τιμή,
          φωτογραφίες και ψηφιακή υπογραφή. Χωρίς ραντεβού και χωρίς χαρτιά.
        </p>

        <video
          controls
          playsInline
          preload="metadata"
          poster="/email/update-video-poster.png"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: 16,
            background: "#000",
          }}
        >
          <source src="/email/spotly-listing-v2.mp4" type="video/mp4" />
          Ο browser σας δεν υποστηρίζει αναπαραγωγή βίντεο.
        </video>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 28,
          }}
        >
          <a
            href="https://apps.apple.com/gr/app/spotly/id6792035342"
            style={{
              flex: "1 1 180px",
              textAlign: "center",
              background: "#00E676",
              color: "#050505",
              fontWeight: 800,
              fontSize: 16,
              padding: "15px 24px",
              borderRadius: 100,
              textDecoration: "none",
            }}
          >
            Κατέβασε για iPhone
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.spotly.mobile"
            style={{
              flex: "1 1 180px",
              textAlign: "center",
              border: "1px solid #23272c",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 16,
              padding: "15px 24px",
              borderRadius: 100,
              textDecoration: "none",
            }}
          >
            Κατέβασε για Android
          </a>
        </div>

        <p
          style={{
            color: "#a8afb6",
            fontSize: 14.5,
            lineHeight: 1.62,
            marginTop: 28,
          }}
        >
          Κόλλησες κάπου ή θέλεις να το κάνουμε μαζί; Πάρε με τηλέφωνο στο{" "}
          <a
            href="tel:+306949172459"
            style={{ color: "#00E676", textDecoration: "none", fontWeight: 700 }}
          >
            694 917 2459
          </a>{" "}
          ή γράψε μου στο{" "}
          <a
            href="mailto:info@parkspotly.gr"
            style={{ color: "#00E676", textDecoration: "none", fontWeight: 600 }}
          >
            info@parkspotly.gr
          </a>
          .
        </p>

        <p style={{ color: "#6a7178", fontSize: 12, lineHeight: 1.65, marginTop: 32 }}>
          SPOTLY PARKING MANAGEMENT Ε.Ε. · ΑΦΜ 803339090 · ΓΕΜΗ 194898201000
          <br />
          Ρίμινι 14, 122 43 Αιγάλεω
        </p>
      </div>
    </main>
  );
}
