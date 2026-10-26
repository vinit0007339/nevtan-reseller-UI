import React from "react";
import Link from "next/link";
import { Box, Button, Stack } from "@mui/material";
import ProductsMenu from "./ProductsMenu";
import { scrollToSection } from "../Utility/scrollToSection";

const LINK_COLOR = "#334155";

// Sections of the one-page site, linked by anchor.
const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

const SiteHeader = () => (
  <Box
    component="header"
    sx={{
      position: "sticky",
      top: 0,
      zIndex: 1100,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 1,
      px: { xs: 2, md: 6 },
      py: 1.5,
      borderBottom: "1px solid",
      borderColor: "divider",
      bgcolor: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(10px)",
    }}
  >
    <Box component={Link} href="/" aria-label="NevTan Reseller Program home" sx={{ display: "flex", alignItems: "center" }}>
      <Box
        component="img"
        src="/nevtan-logo.png"
        alt="NevTan"
        width={1137}
        height={419}
        sx={{ width: { xs: 96, sm: 112 }, height: "auto", display: "block" }}
      />
    </Box>
    <Stack direction="row" spacing={{ xs: 0.5, sm: 1 }} alignItems="center">
      <ProductsMenu buttonSx={{ display: { xs: "none", md: "inline-flex" } }} />
      {NAV_LINKS.map((link) => (
        <Button
          key={link.href}
          component="a"
          href={link.href}
          onClick={scrollToSection}
          variant="text"
          sx={{ textTransform: "none", color: LINK_COLOR, display: { xs: "none", sm: "inline-flex" } }}
        >
          {link.label}
        </Button>
      ))}
      <Button
        component="a"
        href="#apply"
        onClick={scrollToSection}
        variant="contained"
        sx={{ textTransform: "none", borderRadius: 2, px: { xs: 1.5, sm: 2.5 }, whiteSpace: "nowrap" }}
      >
        Apply now
      </Button>
    </Stack>
  </Box>
);

export default SiteHeader;
