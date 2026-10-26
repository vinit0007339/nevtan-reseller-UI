import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { CloseRounded as CloseIcon, MenuRounded as MenuIcon } from "@mui/icons-material";
import ProductsMenu from "./ProductsMenu";
import AppIcon from "./AppIcon";
import { APPS } from "../constant/products";
import { tokens } from "../theme";

const NAV_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
  { label: "FAQ", href: "/faq" },
];

const MOBILE_LINKS = [{ label: "Home", href: "/" }, { label: "All products", href: "/products" }, ...NAV_LINKS];

const isActive = (pathname, href) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

const SiteHeader = () => {
  const { pathname, asPath } = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        borderBottom: `1px solid ${tokens.border}`,
        bgcolor: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Box
        sx={{
          maxWidth: 1240,
          mx: "auto",
          px: { xs: 2, md: 4 },
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.25}
          component={Link}
          href="/"
          aria-label="NevTan Reseller Program home"
          sx={{ textDecoration: "none" }}
        >
          <Box
            component="img"
            src="/nevtan-logo.png"
            alt="NevTan"
            width={1137}
            height={419}
            sx={{ width: { xs: 92, sm: 104 }, height: "auto", display: "block" }}
          />
          <Box sx={{ display: { xs: "none", sm: "block" }, height: 22, width: "1px", bgcolor: tokens.border }} />
          <Typography sx={{ display: { xs: "none", sm: "block" }, fontWeight: 700, fontSize: 14, color: tokens.teal }}>
            Reseller Program
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Stack direction="row" alignItems="center" spacing={0.25} sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <ProductsMenu active={isActive(pathname, "/products")} />
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Button
                  key={link.href}
                  component={Link}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  sx={{
                    color: active ? tokens.teal : tokens.body,
                    fontWeight: active ? 800 : 600,
                    px: 1.5,
                    "&:hover": { color: tokens.teal, bgcolor: tokens.mint },
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Stack>
          <Button component={Link} href="/apply" variant="contained" sx={{ px: { xs: 1.75, sm: 2.5 }, whiteSpace: "nowrap" }}>
            Apply now
          </Button>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            sx={{ display: { xs: "inline-flex", md: "none" }, color: tokens.body }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Box>

      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer} PaperProps={{ sx: { width: 320, maxWidth: "88vw" } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, height: 68 }}>
          <Typography sx={{ fontWeight: 800, color: tokens.teal }}>Reseller Program</Typography>
          <IconButton onClick={closeDrawer} aria-label="Close menu">
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <List sx={{ px: 1 }}>
          {MOBILE_LINKS.map((link) => (
            <ListItemButton
              key={link.href}
              component={Link}
              href={link.href}
              onClick={closeDrawer}
              selected={link.href === "/products" ? pathname === "/products" : isActive(pathname, link.href)}
              sx={{ borderRadius: 2 }}
            >
              <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 700 }} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <Typography sx={{ px: 3, pt: 2, pb: 1, fontSize: 11, fontWeight: 800, letterSpacing: 0.8, textTransform: "uppercase", color: tokens.muted }}>
          Products
        </Typography>
        <List sx={{ px: 1 }}>
          {APPS.map((app) => (
            <ListItemButton
              key={app.code}
              component={Link}
              href={`/products/${app.slug}`}
              onClick={closeDrawer}
              selected={asPath === `/products/${app.slug}`}
              sx={{ borderRadius: 2, gap: 1.5 }}
            >
              <AppIcon app={app} size={30} />
              <ListItemText primary={app.title} primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }} />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ p: 2, mt: "auto" }}>
          <Button component={Link} href="/apply" onClick={closeDrawer} variant="contained" fullWidth size="large">
            Apply now
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SiteHeader;
