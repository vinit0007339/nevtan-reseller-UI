# NevTan Reseller UI

The public NevTan Reseller Program site: what the program offers, who it's for, how it works,
the FAQ, and the application form. Next.js 15 (pages router) with MUI 5.

Applications are sent to [nevtan-reseller-api](../nevtan-reseller-api).

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000, talks to the API on http://localhost:8090
```

Start the API first (`mvn spring-boot:run -Dspring-boot.run.profiles=h2` in `nevtan-reseller-api`).
The API only accepts browser requests from `http://localhost:3000` in development, so keep the
UI on that port.

Don't run `npm run build:*` while `npm run dev` is running: both write to `.next/` and the dev
server breaks until it is restarted.

## Build profiles

Each profile reads its own `.env.<profile>` file:

| Command | Profile | API | Site URL |
| --- | --- | --- | --- |
| `npm run dev` / `build:localhost` | `localhost` | `http://localhost:8090` | `http://localhost:3000` |
| `npm run dev:stage` / `build:stage` | `stage` | `https://stage-reseller-api.nevtan.com` | `https://stage-reseller.nevtan.com` |
| `npm run build:prod` | `prod` | `https://reseller-api.nevtan.com` | `https://reseller.nevtan.com` |

Only the `prod` profile lets search engines crawl the site (see `src/pages/robots.txt.jsx`).

Set `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_META_PIXEL_ID` in the env file to turn on Google Tag
Manager and the Meta Pixel. Both stay off while empty.

## Deploy

`amplify.yml` builds `prod` for the `main`/`prod`/`production` branches and `stage` for everything
else, the same as the other NevTan UIs.

## Layout

```
src/
  pages/        Next.js routes: index (the reseller page), robots.txt, sitemap.xml
  screens/      Reseller.jsx: the page itself
  component/    SiteHeader, SiteFooter, ProductsMenu
  constant/     Environment (URLs per profile), products (the NevTan suite)
  Utility/      axios instance, Meta Pixel helper
```
# nevtan-reseller-UI
