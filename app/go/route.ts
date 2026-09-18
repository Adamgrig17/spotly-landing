// Έξυπνο link: https://www.parkspotly.gr/go
//   iPhone / iPad  → App Store
//   Android        → Google Play
//   Οτιδήποτε άλλο → parkspotly.gr
//
// Προαιρετικά: /go?c=update  (το c περνάει ως utm_campaign για να ξέρεις από πού ήρθαν)

export const dynamic = "force-dynamic";
export const revalidate = 0;

const APP_STORE =
  "https://apps.apple.com/gr/app/spotly/id6792035342";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.spotly.mobile";
const WEBSITE = "https://www.parkspotly.gr";

export function GET(request: Request) {
  const ua = (request.headers.get("user-agent") || "").toLowerCase();
  const campaign = new URL(request.url).searchParams.get("c") || "";

  const isIOS = /iphone|ipod|ipad/.test(ua);
  // iPadOS 13+ δηλώνεται ως Macintosh· ξεχωρίζει από το ότι έχει αφή.
  const isIPadOS = /macintosh/.test(ua) && /mobile/.test(ua);
  const isAndroid = /android/.test(ua) && !/windows phone/.test(ua);

  let target = WEBSITE;
  if (isIOS || isIPadOS) target = APP_STORE;
  else if (isAndroid) target = PLAY_STORE;

  if (campaign) {
    const u = new URL(target);
    if (target === PLAY_STORE) {
      // Το Play δέχεται ένα μόνο πεδίο "referrer"
      u.searchParams.set(
        "referrer",
        `utm_source=email&utm_medium=broadcast&utm_campaign=${campaign}`
      );
    } else {
      u.searchParams.set("utm_source", "email");
      u.searchParams.set("utm_medium", "broadcast");
      u.searchParams.set("utm_campaign", campaign);
    }
    target = u.toString();
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
