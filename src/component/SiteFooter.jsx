import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { OpenInNewRounded as OpenIcon } from "@mui/icons-material";
import { NEVTAN_PRODUCTS } from "../constant/products";
import { endPoints } from "../constant/Environment";
import { scrollToSection } from "../Utility/scrollToSection";

const FOOTER_BG = "#0b322f"; // very dark green

// On-page sections use `href` anchors; external destinations set `external`.
const footerColumns = [
  {
    heading: "Reseller program",
    links: [
      { label: "Apply now", href: "#apply" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "List prices", href: `${endPoints.workspaceUrl}/pricing`, external: true },
    ],
  },
  {
    heading: "NevTan suite",
    links: [
      ...NEVTAN_PRODUCTS.map((p) => ({ label: p.name, href: p.link, external: true })),
      { label: "Explore the suite", href: "https://nevtan.com", external: true },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: `${endPoints.mailSiteUrl}/contact`, external: true },
      { label: "Security", href: `${endPoints.mailSiteUrl}/security`, external: true },
      { label: "Support", href: `${endPoints.mailSiteUrl}/support`, external: true },
    ],
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: `${endPoints.mailSiteUrl}/privacy-policy` },
  { label: "Terms of Service", href: `${endPoints.mailSiteUrl}/terms` },
];

const linkSx = {
  color: "rgba(255,255,255,0.72)",
  textDecoration: "none",
  fontSize: 14,
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  transition: "color 0.15s ease",
  "&:hover": { color: "#fff" },
};

const SiteFooter = () => (
  <Box component="footer" sx={{ bgcolor: FOOTER_BG, color: "#fff" }}>
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 5, md: 7 } }}>
        {/* Brand column */}
        <Box sx={{ flex: { md: "0 0 300px" }, maxWidth: { md: 320 } }}>
          <Box
            component="img"
            src="/nevtan-logo-white.png"
            alt="NevTan"
            width={211}
            height={70}
            sx={{ width: 132, height: "auto", display: "block", mb: 2 }}
          />
          <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>
            Resell the whole NevTan suite — email, storage, e-signatures, cloud, marketing and AI — to your
            clients, at your own prices.
          </Typography>
        </Box>

        {/* Link columns — auto-fit so any number of columns spreads evenly and wraps cleanly. */}
        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
            columnGap: 4,
            rowGap: { xs: 4, md: 5 },
          }}
        >
          {footerColumns.map((col) => (
            <Box key={col.heading}>
              <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase", color: "#2dd4bf", mb: 2 }}>
                {col.heading}
              </Typography>
              <Stack spacing={1.25}>
                {col.links.map((l) =>
                  l.external ? (
                    <Box key={l.label} component="a" href={l.href} target="_blank" rel="noopener noreferrer" sx={linkSx}>
                      {l.label}
                      <OpenIcon sx={{ fontSize: 13, opacity: 0.6 }} />
                    </Box>
                  ) : (
                    <Box key={l.label} component="a" href={l.href} onClick={scrollToSection} sx={linkSx}>
                      {l.label}
                    </Box>
                  )
                )}
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>

    {/* Bottom bar */}
    <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
      <Container maxWidth="lg" sx={{ py: 2.5 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
        >
          <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
            © {new Date().getFullYear()} NevTan, Inc. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={{ xs: 2, sm: 3 }} flexWrap="wrap" rowGap={1}>
            {legalLinks.map((l) => (
              <Box
                key={l.href}
                component="a"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 13, "&:hover": { color: "#fff" } }}
              >
                {l.label}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  </Box>
);

export default SiteFooter;
