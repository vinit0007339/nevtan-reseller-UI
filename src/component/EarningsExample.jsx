import React from "react";
import Link from "next/link";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { ArrowForwardRounded as ArrowIcon, TrendingUpRounded as TrendIcon } from "@mui/icons-material";
import AppIcon from "./AppIcon";
import { formatMoney } from "../Utility/format";
import { featuredPlan, listPrice, resellerPrice } from "../Utility/workspacePricing";
import { PAID_APPS } from "../constant/products";
import { MINIMUM_ORDER, RESELLER_DISCOUNT } from "../constant/program";
import { tokens } from "../theme";

const EXAMPLE_USERS = 25;

const Row = ({ label, value, strong }) => (
  <Stack direction="row" justifyContent="space-between" spacing={2}>
    <Typography sx={{ color: tokens.muted, fontSize: 14 }}>{label}</Typography>
    <Typography sx={{ color: tokens.ink, fontSize: 14, fontWeight: strong ? 800 : 600 }}>{value}</Typography>
  </Stack>
);

const PlanExample = ({ plan, currency }) => {
  const annual = plan.annual !== null;
  const list = listPrice(plan, annual);
  const clientPays = list * EXAMPLE_USERS;
  const cost = resellerPrice(list) * EXAMPLE_USERS;
  const keep = clientPays - cost;

  return (
    <>
      <Typography sx={{ fontWeight: 800, fontSize: 20, color: tokens.ink }}>
        {plan.name} plan · {EXAMPLE_USERS} users
      </Typography>
      <Typography sx={{ color: tokens.muted, fontSize: 14, mb: 2.5 }}>
        Billed {annual ? "annually" : "monthly"}, sold at list price
      </Typography>
      <Stack spacing={1.25}>
        <Row label="Your client pays" value={`${formatMoney(clientPays, currency)} /month`} />
        <Row label={`Your cost (${RESELLER_DISCOUNT} off)`} value={`${formatMoney(cost, currency)} /month`} />
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: tokens.teal, color: "#fff", display: "grid", placeItems: "center" }}>
          <TrendIcon />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 850, fontSize: 28, color: tokens.teal, lineHeight: 1.1 }}>
            {formatMoney(keep * 12, currency)}
          </Typography>
          <Typography sx={{ color: tokens.muted, fontSize: 13 }}>you keep a year — and more if you charge above list</Typography>
        </Box>
      </Stack>
      <Box
        component={Link}
        href="/pricing#calculator"
        sx={{ mt: 2.5, display: "inline-flex", alignItems: "center", gap: 0.5, color: tokens.teal, fontWeight: 700, fontSize: 14, textDecoration: "none" }}
      >
        Work out your own numbers
        <ArrowIcon sx={{ fontSize: 18 }} />
      </Box>
    </>
  );
};

// Shown when Workspace prices couldn't be loaded.
const TermsSummary = () => (
  <Stack spacing={1.5}>
    <Typography sx={{ fontWeight: 800, fontSize: 20, color: tokens.ink }}>Reseller terms</Typography>
    <Row label="Discount" value={`${RESELLER_DISCOUNT} off list price`} strong />
    <Row label="Minimum order" value={MINIMUM_ORDER} strong />
    <Row label="Your price to clients" value="You decide" strong />
  </Stack>
);

/** Home hero card: what a reseller keeps on one 25-user client, at today's live list price. */
const EarningsExample = ({ pricing }) => {
  const plan = featuredPlan(pricing);

  return (
    <Box sx={{ position: "relative", maxWidth: 460, mx: "auto", width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: { xs: 3, sm: 3.5 },
          borderRadius: 5,
          bgcolor: "#fff",
          border: `1px solid ${tokens.border}`,
          boxShadow: "0 50px 90px -40px rgba(15,23,42,0.45), 0 0 0 10px rgba(255,255,255,0.55)",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Chip label="Example: one client" size="small" sx={{ bgcolor: tokens.mint, color: tokens.tealDark }} />
          <Stack direction="row" spacing={0.5}>
            {PAID_APPS.map((app) => (
              <AppIcon key={app.code} app={app} size={24} />
            ))}
          </Stack>
        </Stack>

        {plan ? <PlanExample plan={plan} currency={pricing.currency} /> : <TermsSummary />}
      </Box>
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: "-12% -10% auto auto",
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,212,191,0.45), transparent 70%)",
          filter: "blur(10px)",
        }}
      />
    </Box>
  );
};

export default EarningsExample;
