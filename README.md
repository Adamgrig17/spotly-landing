This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Seasonal logo

The S mark follows `GET {BRAND_API_URL}/brand/season.json`, which returns `{"season":"christmas"|"new-year"|"march-25"|"easter"|"october-28"|"default"}`. The server fetches it with a 10-minute revalidate and uses the default mark if the variable is unset or the request fails. There is no client fetch, so the icon does not swap after paint.

Set `BRAND_API_URL` in Vercel. Do not commit it.

| Environment | Value |
| --- | --- |
| Production | `https://api.parkspotly.gr` |
| Preview | `https://staging-api.parkspotly.gr` |

Artwork is in `public/brand/seasonal/<season>/icon.png`. New Year uses `public/brand/seasonal/new-year-<year>/icon.png` (December uses the upcoming year, otherwise the calendar year). If that file is missing, the site tries `new-year-<calendar year + 1>` (currently `new-year-2027`) and otherwise keeps the default mark.

These stay on the default artwork. There is no seasonal Open Graph file in the repo:

- `public/og-image.jpg`
- `app/promo/[slug]/opengraph-image.tsx` (embeds `public/logo.png`)

These emails stay on `https://parkspotly.gr/logo.png`:

- `app/api/host-submit/route.ts`
- `app/api/early-access/route.ts`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
