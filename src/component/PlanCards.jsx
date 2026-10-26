import React from "react";
import Link from "next/link";
import { Box, Button, Chip, Grid, Stack, Typography } from "@mui/material";
import { CheckRounded as CheckIcon, CloudOutlined as StorageIcon } from "@mui/icons-material";
import Reveal from "./Reveal";
import { formatMoney, formatStorage } from "../Utility/format";
import { enterprisePlan, listPrice, resellablePlans, resellerPrice } from "../Utility/workspacePricing";
import { endPoints } from "../constant/Environment";
import { tokens } from "../theme";

const HIGHLIGHTS_SHOWN = 5;

/** Live NevTan Workspace plans, each with its list price, the reseller price and what the reseller keeps. */
const PlanCards = ({ pricing, annual }) => {
  const plans = [...resellablePlans(pricing), enterprisePlan(pricing)].filter(Boolean);
  const currency = pricing.currency;
  const columns = Math.min(4, plans.length);

  return (
    <Grid container spacing={2.5} alignItems="stretch">
      {plans.map((plan, i) => {
        const featured = plan.mostPopular;
        const list = plan.contactSales ? null : listPrice(plan, annual);
        const yours = list === null ? null : resellerPrice(list);
        const extra = plan.highlights.length - HIGHLIGHTS_SHOWN;

        return (
          <Grid item xs={12} sm={6} lg={12 / columns} key={plan.code}>
            <Reveal delay={i * 70} sx={{ height: "100%" }}>
              <Stack
                sx={{
                  position: "relative",
                  height: "100%",
                  p: 3,
                  borderRadius: 4,
                  bgcolor: "#fff",
                  border: featured ? `2px solid ${tokens.teal}` : `1px solid ${tokens.border}`,
                  boxShadow: featured
                    ? "0 30px 60px -30px rgba(15,118,110,0.5)"
                    : "0 16px 40px -28px rgba(15,23,42,0.25)",
                }}
              >
                {featured && (
                  <Chip label="Most popular" size="small" sx={{ position: "absolute", top: -12, left: 24, bgcolor: tokens.teal, color: "#fff" }} />
                )}
                <Typography component="h3" sx={{ fontWeight: 800, fontSize: 22, color: tokens.ink }}>
                  {plan.name}
                </Typography>
                <Typography sx={{ color: tokens.muted, fontSize: 14, mt: 0.5, minHeight: { lg: 63 } }}>{plan.description}</Typography>

                {plan.contactSales ? (
                  <Box sx={{ mt: 2.5, mb: 2 }}>
                    <Typography sx={{ color: tokens.muted, fontSize: 13, fontWeight: 600 }}>Reseller price</Typography>
                    <Typography sx={{ fontWeight: 850, fontSize: 34, color: tokens.ink, lineHeight: 1.1 }}>Custom</Typography>
                    <Typography sx={{ color: tokens.muted, fontSize: 13, mt: 0.5 }}>Priced with our team for each client</Typography>
                  </Box>
                ) : (
                  <Box sx={{ mt: 2.5, mb: 2 }}>
                    <Typography sx={{ color: tokens.muted, fontSize: 13, fontWeight: 600 }}>Your reseller price</Typography>
                    <Stack direction="row" alignItems="baseline" spacing={0.75}>
                      <Typography sx={{ fontWeight: 850, fontSize: 34, color: tokens.teal, lineHeight: 1.1 }}>
                        {formatMoney(yours, currency)}
                      </Typography>
                      <Typography sx={{ color: tokens.muted, fontSize: 13 }}>/user/month</Typography>
                    </Stack>
                    <Typography sx={{ color: tokens.muted, fontSize: 13, mt: 0.5 }}>
                      List price {formatMoney(list, currency)} · billed {annual ? "annually" : "monthly"}
                    </Typography>
                    <Box sx={{ mt: 1.5, px: 1.25, py: 0.75, borderRadius: 2, bgcolor: tokens.mint, color: tokens.tealDark, fontSize: 13, fontWeight: 700 }}>
                      You keep {formatMoney(list - yours, currency)} per user a month at list price
                    </Box>
                  </Box>
                )}

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ py: 1.25, borderTop: `1px solid ${tokens.border}`, borderBottom: `1px solid ${tokens.border}` }}
                >
                  <StorageIcon sx={{ fontSize: 18, color: tokens.teal }} />
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: tokens.ink }}>
                    {formatStorage(plan.storageGbPerUser)} storage per user
                  </Typography>
                </Stack>

                {plan.includesFrom && (
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: tokens.ink, mt: 2, mb: 1 }}>
                    Everything in {plan.includesFrom}, plus:
                  </Typography>
                )}
                <Stack spacing={1} sx={{ flex: 1, mt: plan.includesFrom ? 0 : 2 }}>
                  {plan.highlights.slice(0, HIGHLIGHTS_SHOWN).map((h, hi) => (
                    <Stack key={`${hi}-${h}`} direction="row" spacing={1} alignItems="flex-start">
                      <CheckIcon sx={{ fontSize: 18, color: tokens.teal, mt: "1px" }} />
                      <Typography sx={{ fontSize: 13.5, color: tokens.body, lineHeight: 1.45 }}>{h}</Typography>
                    </Stack>
                  ))}
                  {extra > 0 && (
                    <Box
                      component="a"
                      href={`${endPoints.workspaceUrl}/pricing`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ fontSize: 13, color: tokens.teal, fontWeight: 700, textDecoration: "none", pl: 3.25 }}
                    >
                      + {extra} more features
                    </Box>
                  )}
                </Stack>

                {plan.contactSales ? (
                  <Button href={pricing.contactSalesUrl} variant="outlined" fullWidth sx={{ mt: 3, py: 1.1, color: tokens.teal, borderColor: tokens.teal }}>
                    Talk to our team
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    href="/apply"
                    variant={featured ? "contained" : "outlined"}
                    fullWidth
                    sx={{ mt: 3, py: 1.1, ...(featured ? null : { color: tokens.teal, borderColor: tokens.teal }) }}
                  >
                    Apply to resell {plan.name}
                  </Button>
                )}
              </Stack>
            </Reveal>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PlanCards;
