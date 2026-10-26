import React, { useState } from "react";
import { Box, Button, Divider, Menu, Stack, Typography } from "@mui/material";
import {
  AppsOutlined as AppsIcon,
  KeyboardArrowDownRounded as ArrowDownIcon,
  OpenInNewRounded as OpenIcon,
} from "@mui/icons-material";
import { NEVTAN_PRODUCTS } from "../constant/products";

const GREEN = "#0f766e";
const MINT = "#f0fdfa";
const INK = "#0f172a";
const MUTED = "#64748b";
const BORDER = "#e2e8f0";

/** "Products" dropdown listing the full NevTan suite; every product opens in a new tab. */
const ProductsMenu = ({ buttonSx }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        onClick={handleOpen}
        startIcon={<AppsIcon />}
        endIcon={<ArrowDownIcon sx={{ transition: "transform 0.2s ease", transform: open ? "rotate(180deg)" : "none" }} />}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          textTransform: "none",
          color: "#334155",
          fontWeight: 700,
          "&:hover": { color: GREEN, bgcolor: MINT },
          ...buttonSx,
        }}
      >
        Products
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 1,
              width: { xs: 300, sm: 380 },
              maxWidth: "calc(100vw - 24px)",
              borderRadius: 3,
              border: "1px solid",
              borderColor: BORDER,
              boxShadow: "0 24px 60px rgba(15, 23, 42, 0.18)",
              overflow: "hidden",
              p: 1,
            },
          },
        }}
        MenuListProps={{ sx: { p: 0 } }}
      >
        <Box sx={{ px: 1.5, pt: 1, pb: 1 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase", color: GREEN }}>
            The NevTan suite
          </Typography>
          <Typography sx={{ fontSize: 12, color: MUTED, mt: 0.25 }}>
            One reseller account across every NevTan product.
          </Typography>
        </Box>

        <Stack spacing={0.25}>
          {NEVTAN_PRODUCTS.map((p) => (
            <Box
              key={p.name}
              component="a"
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
                width: "100%",
                px: 1.5,
                py: 1.25,
                borderRadius: 2,
                textDecoration: "none",
                transition: "background-color 0.15s ease",
                "&:hover": { bgcolor: "#f1f5f9" },
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: "100%" }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                    borderRadius: 2,
                    bgcolor: MINT,
                    border: "1px solid",
                    borderColor: BORDER,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Box component="img" src={p.icon} alt="" sx={{ width: 24, height: 24, objectFit: "contain" }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <Typography sx={{ fontSize: 13.5, fontWeight: 800, color: INK }}>{p.name}</Typography>
                    <OpenIcon sx={{ fontSize: 13, color: "#94a3b8" }} />
                  </Stack>
                  <Typography sx={{ fontSize: 11.5, color: MUTED, lineHeight: 1.45, mt: 0.25 }}>{p.desc}</Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 1 }} />
        <Box
          component="a"
          href="https://nevtan.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1.5,
            py: 1,
            borderRadius: 2,
            textDecoration: "none",
            color: GREEN,
            fontWeight: 700,
            fontSize: 13,
            "&:hover": { bgcolor: MINT },
          }}
        >
          Explore the full NevTan suite
          <OpenIcon sx={{ fontSize: 15 }} />
        </Box>
      </Menu>
    </>
  );
};

export default ProductsMenu;
