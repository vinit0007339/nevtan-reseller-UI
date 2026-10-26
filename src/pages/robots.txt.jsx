import { endPoints } from "../constant/Environment";

// Only the "prod" profile may be crawled; stage and localhost block everything.
const PRODUCTION_ROBOTS_TXT = `User-agent: *
Allow: /

# Bytespider (ByteDance) frequently ignores robots.txt.
User-agent: Bytespider
Disallow: /

Sitemap: ${endPoints.siteUrl}/sitemap.xml
`;

const NON_PRODUCTION_ROBOTS_TXT = `User-agent: *
Disallow: /
`;

export async function getServerSideProps({ res }) {
  const isProduction = process.env.NEXT_PUBLIC_APP_ENV === "prod";
  res.setHeader("Content-Type", "text/plain");
  res.write(isProduction ? PRODUCTION_ROBOTS_TXT : NON_PRODUCTION_ROBOTS_TXT);
  res.end();

  return { props: {} };
}

export default function Robots() {
  return null;
}
