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

### Docker

```bash
docker build --build-arg APP_ENV=prod -t nevtan-reseller-ui .     # or APP_ENV=stage
docker run -p 3000:3000 nevtan-reseller-ui
```

`APP_ENV` picks which `.env.<profile>` file is compiled in. `NEXT_PUBLIC_*` values are baked in
at build time, so setting them on the running container does nothing. To change one without
editing the file, pass it as a build arg, which wins over the file:

```bash
docker build --build-arg APP_ENV=stage \
  --build-arg NEXT_PUBLIC_API_BASE_URL=https://stage-reseller-api.nevtan.com \
  -t nevtan-reseller-ui .
```

The image runs Next's standalone server (`node server.js`) on port 3000 as a non-root user.
Because of `output: "standalone"`, `npm start` prints a warning locally. It still works.

### Amplify

`amplify.yml` builds `prod` for the `main`/`prod`/`production` branches and `stage` for everything
else, the same as the other NevTan UIs.

## Layout

```
src/
  pages/        Next.js routes: /, /pricing, /products, /products/[slug], /how-it-works,
                /faq, /apply, 404, robots.txt, sitemap.xml
  screens/      One component per page
  component/    Layout, header/footer, plan cards, earnings calculator, application form,
                WhatsApp chat widget (copied from NevTan Mail), ...
  constant/     program.js — the reseller terms (discount, minimum order) and all program copy
                products.js — the NevTan apps; productPages.js — product page copy (from Workspace)
                Environment.js — URLs per profile; support.js — WhatsApp number
  Utility/      workspacePricing.js — live NevTan Workspace prices; axios, formatting, Meta Pixel
```

Every list price comes live from the NevTan Workspace pricing API. Pages load it on the server
(refreshed hourly), then the visitor's browser asks again to show the visitor's own currency. That
second request only works once the Workspace API allows this site: add
`https://reseller.nevtan.com,https://stage-reseller.nevtan.com` to `WORKSPACE_CORS_ORIGINS` on the
Workspace API server. Until then visitors see the server's currency, and the browser console shows
a CORS error for that request.
# nevtan-reseller-UI
