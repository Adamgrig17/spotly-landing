// Smart download link: https://parkspotly.gr/app
//   iPhone / iPad / iPod → App Store
//   Android              → Google Play (com.spotly.mobile)
//   Desktop, and iPadOS that identifies as Macintosh → https://parkspotly.gr
//
// Instagram and Facebook in-app browsers keep iPhone or Android in the
// user-agent, so they follow the same rules. Query string is forwarded only
// to the website. 302 + no-store so a CDN cannot pin one device's target.

export const dynamic = "force-dynamic";
export const revalidate = 0;

const APP_STORE = "https://apps.apple.com/gr/app/id6792035342";
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.spotly.mobile";
const WEBSITE = "https://parkspotly.gr";

export function GET(request: Request) {
  const ua = request.headers.get("user-agent") ?? "";
  const isIos = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua) && !/Windows Phone/i.test(ua);

  if (isIos) return redirect(APP_STORE);
  if (isAndroid) return redirect(PLAY_STORE);
  return redirect(websiteWithQuery(request.url));
}

function websiteWithQuery(requestUrl: string): string {
  const incoming = new URL(requestUrl);
  if ([...incoming.searchParams.keys()].length === 0) return WEBSITE;
  const target = new URL(WEBSITE);
  incoming.searchParams.forEach((value, key) => {
    target.searchParams.append(key, value);
  });
  return target.toString();
}

function redirect(location: string) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
      "Cache-Control": "no-store",
    },
  });
}
