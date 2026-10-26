import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { WarningAmberRounded as WarningIcon } from "@mui/icons-material";
import { formatMoney } from "../Utility/format";
import { featuredPlan, listPrice, resellablePlans, resellerPrice } from "../Utility/workspacePricing";
import { MINIMUM_ORDER } from "../constant/program";
import { tokens } from "../theme";

const MAX_USERS = 100000;
const MARKUPS = [
  { label: "List price", factor: 1 },
  { label: "+10%", factor: 1.1 },
  { label: "+25%", factor: 1.25 },
];

const round2 = (n) => Math.round(n * 100) / 100;

const toggleSx = {
  "& .MuiToggleButton-root": {
    textTransform: "none",
    fontWeight: 700,
    px: 2,
    color: tokens.body,
    borderColor: tokens.border,
    "&.Mui-selected": { bgcolor: tokens.teal, color: "#fff", "&:hover": { bgcolor: tokens.tealDark } },
  },
};

const ResultRow = ({ label, value }) => (
  <Stack direction="row" justifyContent="space-between" spacing={2}>
    <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>{label}</Typography>
    <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{value}</Typography>
  </Stack>
);

/**
 * What a reseller earns on one client: pick a plan, a billing period, the client's users and the
 * price you charge. Uses the live list prices in `pricing`; mount it with key={pricing.currency}
 * so a switch to the visitor's currency starts over from that currency's list price.
 */
const EarningsCalculator = ({ pricing }) => {
  const plans = resellablePlans(pricing);
  const currency = pricing.currency;
  const [planCode, setPlanCode] = useState(featuredPlan(pricing).code);
  const [annual, setAnnual] = useState(true);
  const [users, setUsers] = useState("25");

  const plan = plans.find((p) => p.code === planCode) || featuredPlan(pricing);
  const list = listPrice(plan, annual);
  const cost = resellerPrice(list);
  const [priceInput, setPriceInput] = useState(String(list));

  // A new plan or billing period starts from its own list price.
  const choose = (nextCode, nextAnnual) => {
    const next = plans.find((p) => p.code === nextCode) || plan;
    setPlanCode(next.code);
    setAnnual(nextAnnual);
    setPriceInput(String(listPrice(next, nextAnnual)));
  };

  const seats = Math.min(MAX_USERS, Math.max(1, Math.floor(Number(users)) || 1));
  const sell = Math.max(0, Number(priceInput) || 0);
  const revenue = seats * sell;
  const spend = seats * cost;
  const profit = revenue - spend;
  const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;

  return (
    <Box sx={{ borderRadius: 5, overflow: "hidden", border: `1px solid ${tokens.border}`, bgcolor: "#fff", boxShadow: "0 40px 80px -50px rgba(15,23,42,0.5)" }}>
      <Grid container>
        <Grid item xs={12} md={7}>
          <Stack spacing={3} sx={{ p: { xs: 3, md: 5 } }}>
            <Box>
              <Typography sx={{ fontWeight: 700, color: tokens.ink, mb: 1 }}>Plan</Typography>
              <ToggleButtonGroup exclusive value={plan.code} onChange={(_, v) => v && choose(v, annual)} size="small" sx={toggleSx}>
                {plans.map((p) => (
                  <ToggleButton key={p.code} value={p.code}>
                    {p.name}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, color: tokens.ink, mb: 1 }}>Billing</Typography>
              <ToggleButtonGroup exclusive value={annual ? "annual" : "monthly"} onChange={(_, v) => v && choose(plan.code, v === "annual")} size="small" sx={toggleSx}>
                <ToggleButton value="annual">Annual</ToggleButton>
                <ToggleButton value="monthly">Monthly</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Users at this client"
                type="number"
                value={users}
                onChange={(e) => setUsers(e.target.value)}
                inputProps={{ min: 1, max: MAX_USERS, step: 1 }}
                fullWidth
              />
              <TextField
                label={`Your price per user a month (${currency})`}
                type="number"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                inputProps={{ min: 0, step: "0.01" }}
                helperText={`List price ${formatMoney(list, currency)} · your cost ${formatMoney(cost, currency)}`}
                fullWidth
              />
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {MARKUPS.map((m) => (
                <Button
                  key={m.label}
                  size="small"
                  variant="outlined"
                  onClick={() => setPriceInput(String(round2(list * m.factor)))}
                  sx={{ color: tokens.teal, borderColor: tokens.border, "&:hover": { borderColor: tokens.teal, bgcolor: tokens.mint } }}
                >
                  {m.label}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={5}>
          <Stack
            spacing={2}
            justifyContent="center"
            sx={{
              height: "100%",
              p: { xs: 3, md: 5 },
              color: "#fff",
              background: `radial-gradient(500px circle at 100% 0%, rgba(45,212,191,0.3), transparent 60%), ${tokens.deep}`,
            }}
          >
            <Typography sx={{ color: "#5eead4", fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: "uppercase" }}>
              Your profit on this client
            </Typography>
            <Box>
              <Typography sx={{ fontWeight: 850, fontSize: { xs: 40, md: 48 }, lineHeight: 1.05, color: profit < 0 ? "#fca5a5" : "#fff" }}>
                {formatMoney(profit, currency)}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>per month · {formatMoney(profit * 12, currency)} a year</Typography>
            </Box>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />
            <ResultRow label="Your client pays" value={`${formatMoney(revenue, currency)} /month`} />
            <ResultRow label="Your cost" value={`${formatMoney(spend, currency)} /month`} />
            <ResultRow label="Your margin" value={`${margin}%`} />
            {profit < 0 && (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#fca5a5" }}>
                <WarningIcon sx={{ fontSize: 18 }} />
                <Typography sx={{ fontSize: 13 }}>Your price is below your cost.</Typography>
              </Stack>
            )}
            <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 12, lineHeight: 1.5 }}>
              An estimate at today&apos;s NevTan Workspace list prices in {currency}. Reseller pricing applies to orders of{" "}
              {MINIMUM_ORDER} or more.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EarningsCalculator;
