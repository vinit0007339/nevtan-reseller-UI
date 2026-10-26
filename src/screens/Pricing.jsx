import React, { useState } from "react";
import { Box, Button, Chip, Container, Grid, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import {
  CurrencyExchangeOutlined as CurrencyIcon,
  LocalOfferOutlined as DiscountIcon,
  OpenInNewRounded as OpenIcon,
  PaymentsOutlined as PriceIcon,
  ShoppingCartOutlined as OrderIcon,
} from "@mui/icons-material";
import Layout from "../component/Layout";
import PageHero from "../component/PageHero";
import PlanCards from "../component/PlanCards";
import EarningsCalculator from "../component/EarningsCalculator";
import SectionHeading from "../component/SectionHeading";
import Reveal from "../component/Reveal";
import FaqList, { faqJsonLd } from "../component/FaqList";
import CtaBand from "../component/CtaBand";
import { FAQ_GROUPS, MINIMUM_ORDER, RESELLER_DISCOUNT } from "../constant/program";
import { endPoints } from "../constant/Environment";
import { maxAnnualDiscount, resellablePlans, trialDays, useVisitorPricing } from "../Utility/workspacePricing";
import { tokens } from "../theme";

const DESCRIPTION = `Reseller prices for every NevTan Workspace plan: ${RESELLER_DISCOUNT} off list price, from a ${MINIMUM_ORDER} minimum order. Compare plans and calculate what you earn per client.`;

const PRICING_FAQS = FAQ_GROUPS.find((g) => g.id === "pricing").items;

const HOW_IT_WORKS = [
  { Icon: DiscountIcon, title: `${RESELLER_DISCOUNT} off list price`, copy: "On every paid NevTan Workspace plan." },
  { Icon: OrderIcon, title: `${MINIMUM_ORDER} minimum order`, copy: `Reseller pricing applies to orders of ${MINIMUM_ORDER} or more.` },
  { Icon: PriceIcon, title: "You set the price", copy: "Charge what suits your business. The difference between your price and your cost is yours." },
  { Icon: CurrencyIcon, title: "Live list prices", copy: "Prices follow NevTan Workspace, in the currency for your region." },
];

const toggleSx = {
  bgcolor: "#fff",
  "& .MuiToggleButton-root": {
    textTransform: "none",
    fontWeight: 700,
    px: 3,
    py: 1,
    color: tokens.body,
    borderColor: tokens.border,
    "&.Mui-selected": { bgcolor: tokens.teal, color: "#fff", "&:hover": { bgcolor: tokens.tealDark } },
  },
};

const Pricing = ({ pricing: serverPricing }) => {
  const pricing = useVisitorPricing(serverPricing);
  const [annual, setAnnual] = useState(true);
  const plans = resellablePlans(pricing);
  const discount = maxAnnualDiscount(pricing);
  const days = trialDays(pricing);

  const chips = [
    `${MINIMUM_ORDER} minimum order`,
    pricing && `Prices in ${pricing.currency}`,
    days > 0 && `${days}-day free trial on paid plans`,
  ].filter(Boolean);

  return (
    <Layout
      title="Reseller pricing"
      path="/pricing"
      description={DESCRIPTION}
      jsonLd={{ "@context": "https://schema.org", ...faqJsonLd(PRICING_FAQS) }}
    >
      <PageHero
        eyebrow="Reseller pricing"
        title={`Every NevTan Workspace plan at ${RESELLER_DISCOUNT} off list price`}
        lead="You buy at the reseller price and set the price your clients pay. The prices below are NevTan Workspace's live list prices."
      >
        <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
          {chips.map((c) => (
            <Chip key={c} label={c} sx={{ bgcolor: "#fff", border: `1px solid ${tokens.border}`, color: tokens.ink }} />
          ))}
        </Stack>
      </PageHero>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        {plans.length > 0 ? (
          <>
            <Stack alignItems="center" sx={{ mb: 6 }}>
              <ToggleButtonGroup exclusive value={annual ? "annual" : "monthly"} onChange={(_, v) => v && setAnnual(v === "annual")} sx={toggleSx}>
                <ToggleButton value="annual">Annual{discount > 0 ? ` · save ${discount}%` : ""}</ToggleButton>
                <ToggleButton value="monthly">Monthly</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
            <PlanCards pricing={pricing} annual={annual} />
            <Typography sx={{ mt: 4, textAlign: "center", color: tokens.muted, fontSize: 14 }}>
              NevTan Workspace list prices in {pricing.currency}, per user a month.{" "}
              <Box
                component="a"
                href={`${endPoints.workspaceUrl}/pricing`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: tokens.teal, fontWeight: 700, textDecoration: "none" }}
              >
                Compare every feature on NevTan Workspace
              </Box>
              .
            </Typography>
          </>
        ) : (
          <Stack spacing={2} alignItems="center" textAlign="center" sx={{ py: 6, px: 3, borderRadius: 4, border: `1px dashed ${tokens.border}` }}>
            <Typography sx={{ fontWeight: 800, fontSize: 20, color: tokens.ink }}>Live prices aren&apos;t available right now</Typography>
            <Typography sx={{ color: tokens.muted, maxWidth: 520 }}>
              Every plan is {RESELLER_DISCOUNT} off its NevTan Workspace list price, from a {MINIMUM_ORDER} minimum order. See
              today&apos;s list prices on NevTan Workspace.
            </Typography>
            <Button href={`${endPoints.workspaceUrl}/pricing`} target="_blank" rel="noopener noreferrer" variant="contained" endIcon={<OpenIcon />}>
              See NevTan Workspace prices
            </Button>
          </Stack>
        )}
      </Container>

      {plans.length > 0 && (
        <Box
          id="calculator"
          sx={{ bgcolor: tokens.tint, borderTop: `1px solid ${tokens.border}`, borderBottom: `1px solid ${tokens.border}`, scrollMarginTop: 80 }}
        >
          <Container maxWidth="lg" sx={{ py: { xs: 8, md: 11 } }}>
            <SectionHeading
              eyebrow="Earnings calculator"
              title="See what you earn on a client"
              subtitle="Pick a plan, the number of users and the price you charge."
            />
            <Reveal>
              <EarningsCalculator key={pricing.currency} pricing={pricing} />
            </Reveal>
          </Container>
        </Box>
      )}

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 11 } }}>
        <SectionHeading eyebrow="The terms" title="How reseller pricing works" />
        <Grid container spacing={2.5}>
          {HOW_IT_WORKS.map(({ Icon, title, copy }, i) => (
            <Grid item xs={12} sm={6} md={3} key={title}>
              <Reveal delay={i * 70} sx={{ height: "100%", p: 3, borderRadius: 4, border: `1px solid ${tokens.border}`, bgcolor: "#fff" }}>
                <Box sx={{ width: 44, height: 44, borderRadius: 3, display: "grid", placeItems: "center", color: tokens.teal, bgcolor: tokens.mint, mb: 2 }}>
                  <Icon />
                </Box>
                <Typography component="h3" sx={{ fontWeight: 800, color: tokens.ink, mb: 0.5 }}>
                  {title}
                </Typography>
                <Typography sx={{ color: tokens.muted, fontSize: 14.5, lineHeight: 1.6 }}>{copy}</Typography>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="md" sx={{ pb: { xs: 4, md: 6 } }}>
        <SectionHeading title="Pricing questions" />
        <Reveal>
          <FaqList items={PRICING_FAQS} />
        </Reveal>
      </Container>

      <CtaBand title="Start reselling NevTan" />
    </Layout>
  );
};

export default Pricing;
