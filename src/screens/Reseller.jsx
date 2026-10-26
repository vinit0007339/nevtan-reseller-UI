import {
  ArrowForwardRounded as ArrowIcon,
  CheckCircleOutlined as SuccessIcon,
  DnsOutlined as HostingIcon,
  HandshakeOutlined as ConsultantIcon,
  LanOutlined as MspIcon,
  SendOutlined as SendIcon,
  WebOutlined as AgencyIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Fade,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Head from "next/head";
import SiteHeader from "../component/SiteHeader";
import SiteFooter from "../component/SiteFooter";
import { NEVTAN_PRODUCTS } from "../constant/products";
import { endPoints } from "../constant/Environment";
import { axiosInstance } from "../Utility/axiosInstances";
import { trackMetaEvent } from "../Utility/metaPixel";
import { scrollToSection } from "../Utility/scrollToSection";

const CANONICAL_URL = `${endPoints.siteUrl}/`;
const OG_IMAGE = `${endPoints.siteUrl}/nevtan-logo.png`;
const TEAL = "#0f766e";
const INK = "#0f172a";
const MUTED = "#64748b";
const BORDER = "#e2e8f0";

const RESELLER_DISCOUNT = "10%";
const MINIMUM_ORDER = "$500";

const SUITE_NAMES = new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(
  NEVTAN_PRODUCTS.map((p) => p.name),
);

const PAGE_TITLE = "NevTan Reseller Program — Resell the Whole Suite | NevTan";
const PAGE_DESCRIPTION = `Resell ${SUITE_NAMES} to your clients at ${RESELLER_DISCOUNT} off list price. Reseller orders start at ${MINIMUM_ORDER}. Apply in two minutes.`;

const terms = [
  { value: `${RESELLER_DISCOUNT} off`, label: "list price on every NevTan product" },
  { value: MINIMUM_ORDER, label: "minimum order for reseller pricing" },
  { value: `${NEVTAN_PRODUCTS.length} products`, label: "one reseller account for the whole suite" },
];

const audiences = [
  {
    icon: <MspIcon />,
    title: "IT service providers & MSPs",
    copy: "Bundle business email, file storage and e-signatures into the managed services you already run for clients.",
  },
  {
    icon: <AgencyIcon />,
    title: "Web & digital agencies",
    copy: "Launch every client website with matching domain mailboxes, and add Engage to run their marketing.",
  },
  {
    icon: <HostingIcon />,
    title: "Domain & hosting resellers",
    copy: "Offer professional email and cloud storage alongside the domains and hosting you already sell.",
  },
  {
    icon: <ConsultantIcon />,
    title: "Consultants & system integrators",
    copy: "Move clients onto one affordable suite and keep earning on the tools you set up for them.",
  },
];

const steps = [
  { title: "Apply", copy: "Tell us about your business and the clients you serve. It takes about two minutes." },
  { title: "Get approved", copy: "Our team reviews every application and replies within one business day." },
  {
    title: "Place your first order",
    copy: `Buy any mix of NevTan products at ${RESELLER_DISCOUNT} off list price, from a ${MINIMUM_ORDER} minimum order.`,
  },
  { title: "Serve your clients", copy: "Set your clients up on NevTan and bill them at your own price." },
];

const faqs = [
  {
    q: "How much do resellers save?",
    a: `Approved resellers get ${RESELLER_DISCOUNT} off NevTan's list price on every product in the suite.`,
  },
  {
    q: "Is there a minimum order?",
    a: `Yes. Reseller pricing applies to orders of ${MINIMUM_ORDER} or more.`,
  },
  {
    q: "Which products can I resell?",
    a: `All of them: ${SUITE_NAMES}. One reseller account covers the whole suite.`,
  },
  {
    q: "Who bills my clients?",
    a: "You do. You buy from NevTan at the reseller price and set your own price for your clients, so the client relationship stays yours.",
  },
  {
    q: "How long does approval take?",
    a: "Our team reviews every application and replies within one business day.",
  },
  {
    q: "Can I manage my clients' accounts myself?",
    a: "A reseller dashboard for managing client accounts is on the way. Until it's ready, our team helps you set up each client.",
  },
];

const clientCountOptions = [
  { value: "1-10", label: "1–10 clients" },
  { value: "11-50", label: "11–50 clients" },
  { value: "51-200", label: "51–200 clients" },
  { value: "200+", label: "More than 200 clients" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CANONICAL_URL}#webpage`,
      url: CANONICAL_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      isPartOf: { "@id": `${endPoints.siteUrl}/#website` },
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const initialForm = {
  name: "",
  email: "",
  companyName: "",
  website: "",
  country: "",
  phone: "",
  clientCount: "",
  products: [],
  message: "",
  fax: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_ERROR = "We couldn't submit your application. Please try again in a moment.";

// Sections linked from the header/footer sit below a sticky header.
const SECTION_SCROLL_MARGIN = 72;

const SectionHeading = ({ title, subtitle }) => (
  <Stack spacing={1} sx={{ textAlign: "center", alignItems: "center", mb: 4 }}>
    <Typography component="h2" variant="h4" sx={{ fontWeight: 700, fontSize: { xs: 26, md: 32 } }}>
      {title}
    </Typography>
    {subtitle && <Typography sx={{ color: "text.secondary", maxWidth: 620 }}>{subtitle}</Typography>}
  </Stack>
);

const Reseller = () => {
  const [heroIn, setHeroIn] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR);

  useEffect(() => {
    setHeroIn(true);
    trackMetaEvent("ViewContent", { content_name: "Reseller Program", content_category: "landing" });
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleProduct = (name) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(name)
        ? prev.products.filter((p) => p !== name)
        : [...prev.products, name],
    }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = "Enter a valid email address";
    if (!form.companyName.trim()) next.companyName = "Company name is required";
    if (!form.country.trim()) next.country = "Country is required";
    if (!form.clientCount) next.clientCount = "Choose how many clients you serve";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await axiosInstance.post(endPoints.api.RESELLER_APPLICATIONS, {
        name: form.name.trim(),
        email: form.email.trim(),
        companyName: form.companyName.trim(),
        website: form.website.trim(),
        country: form.country.trim(),
        phone: form.phone.trim(),
        clientCount: form.clientCount,
        products: form.products,
        message: form.message.trim(),
        fax: form.fax,
      });
      if (res?.data?.status !== "SUCCESS") {
        setErrorMessage(res?.data?.message || DEFAULT_ERROR);
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || DEFAULT_ERROR);
      setStatus("error");
    }
  };

  const submitting = status === "submitting";

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1137" />
        <meta property="og:image:height" content="419" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
        <SiteHeader />

        <Box sx={{ background: "radial-gradient(1100px circle at 50% -10%, #ccfbf1, transparent 55%)" }}>
          <Container maxWidth="md" sx={{ pt: { xs: 6, md: 9 }, pb: { xs: 4, md: 5 } }}>
            <Fade in={heroIn} timeout={600}>
              <Stack spacing={2} sx={{ textAlign: "center", alignItems: "center" }}>
                <Chip
                  label="Reseller program"
                  size="small"
                  sx={{
                    bgcolor: "rgba(240,253,250,0.85)",
                    border: "1px solid rgba(15,118,110,0.25)",
                    color: TEAL,
                    fontWeight: 700,
                  }}
                />
                <Typography component="h1" variant="h1" sx={{ fontWeight: 850, fontSize: { xs: 32, md: 46 }, lineHeight: 1.1 }}>
                  Resell the whole{" "}
                  <Box component="span" sx={{ color: TEAL }}>NevTan suite</Box>
                  {" "}to your clients
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 400, maxWidth: 680 }}>
                  Email, storage, e-signatures, cloud, marketing and AI from one partner. Buy at{" "}
                  {RESELLER_DISCOUNT} off list price, set your own prices, and keep the client relationship.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 1 }}>
                  <Button
                    component="a"
                    href="#apply"
                    onClick={scrollToSection}
                    variant="contained"
                    size="large"
                    endIcon={<ArrowIcon />}
                    sx={{
                      py: 1.4,
                      px: 4,
                      fontWeight: 800,
                      fontSize: "1.05rem",
                      textTransform: "none",
                      borderRadius: 2,
                      background: `linear-gradient(135deg, #14b8a6 0%, ${TEAL} 100%)`,
                      "&:hover": { background: `linear-gradient(135deg, ${TEAL} 0%, #0d645d 100%)` },
                    }}
                  >
                    Apply to become a reseller
                  </Button>
                  <Button
                    component="a"
                    href={`${endPoints.workspaceUrl}/pricing`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    size="large"
                    sx={{ py: 1.4, px: 3, fontWeight: 700, textTransform: "none", borderRadius: 2, color: TEAL, borderColor: TEAL }}
                  >
                    See list prices
                  </Button>
                </Stack>
              </Stack>
            </Fade>
          </Container>
        </Box>

        <Container maxWidth="md" sx={{ pb: { xs: 5, md: 7 } }}>
          <Grid container spacing={2.5}>
            {terms.map((t) => (
              <Grid item xs={12} sm={4} key={t.label}>
                <Box sx={{ p: 2.5, border: `1px solid ${BORDER}`, borderRadius: 3, textAlign: "center", height: "100%" }}>
                  <Typography sx={{ fontWeight: 850, fontSize: 28, color: TEAL }}>{t.value}</Typography>
                  <Typography sx={{ color: MUTED, fontSize: 14 }}>{t.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ pb: { xs: 5, md: 7 } }}>
          <SectionHeading
            title="Every product, one reseller account"
            subtitle={`Your ${RESELLER_DISCOUNT} reseller discount applies across the whole suite, so you can bundle exactly what each client needs.`}
          />
          <Grid container spacing={2.5}>
            {NEVTAN_PRODUCTS.map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p.name}>
                <Stack direction="row" spacing={1.5} sx={{ p: 2.5, border: `1px solid ${BORDER}`, borderRadius: 3, height: "100%" }}>
                  <Box component="img" src={p.icon} alt="" sx={{ width: 36, height: 36, objectFit: "contain", flexShrink: 0 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: INK, mb: 0.5 }}>{p.name}</Typography>
                    <Typography sx={{ color: MUTED, fontSize: 14, lineHeight: 1.6 }}>{p.desc}</Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box sx={{ bgcolor: "#f8fafc", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
          <Container maxWidth="md" sx={{ py: { xs: 5, md: 7 } }}>
            <SectionHeading title="Who the program is for" />
            <Grid container spacing={2.5}>
              {audiences.map((a) => (
                <Grid item xs={12} sm={6} key={a.title}>
                  <Stack direction="row" spacing={1.5} sx={{ p: 2.5, bgcolor: "background.paper", border: `1px solid ${BORDER}`, borderRadius: 3, height: "100%" }}>
                    <Box sx={{ color: TEAL, mt: 0.25 }}>{a.icon}</Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: INK, mb: 0.5 }}>{a.title}</Typography>
                      <Typography sx={{ color: MUTED, fontSize: 14, lineHeight: 1.6 }}>{a.copy}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Container id="how-it-works" maxWidth="lg" sx={{ py: { xs: 5, md: 7 }, scrollMarginTop: SECTION_SCROLL_MARGIN }}>
          <SectionHeading title="How it works" />
          <Grid container spacing={2.5}>
            {steps.map((s, i) => (
              <Grid item xs={12} sm={6} md={3} key={s.title}>
                <Box sx={{ p: 2.5, border: `1px solid ${BORDER}`, borderRadius: 3, height: "100%" }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: "#f0fdfa",
                      color: TEAL,
                      fontWeight: 800,
                      display: "grid",
                      placeItems: "center",
                      mb: 1.5,
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Typography sx={{ fontWeight: 700, color: INK, mb: 0.5 }}>{s.title}</Typography>
                  <Typography sx={{ color: MUTED, fontSize: 14, lineHeight: 1.6 }}>{s.copy}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Box id="apply" sx={{ borderTop: `1px solid ${BORDER}`, bgcolor: "background.paper", scrollMarginTop: SECTION_SCROLL_MARGIN }}>
          <Container maxWidth="sm" sx={{ py: { xs: 6, md: 9 } }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 24px 48px -24px rgba(15,23,42,0.12)",
              }}
            >
              {status === "success" ? (
                <Fade in>
                  <Stack spacing={2} alignItems="center" textAlign="center" sx={{ py: 4 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        bgcolor: "#f0fdfa",
                        color: TEAL,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <SuccessIcon fontSize="large" />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Application received
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 400 }}>
                      Thanks for applying. Our team will review your application and get back to you within one
                      business day.
                    </Typography>
                  </Stack>
                </Fade>
              ) : (
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Stack spacing={0.5} sx={{ mb: 3 }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                      Apply to become a reseller
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Tell us about your business. We reply within one business day.
                    </Typography>
                  </Stack>

                  <Stack spacing={2.5}>
                    <TextField
                      label="Your name"
                      value={form.name}
                      onChange={handleChange("name")}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                      inputProps={{ maxLength: 150 }}
                      fullWidth
                      required
                      disabled={submitting}
                    />
                    <TextField
                      label="Work email"
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      inputProps={{ maxLength: 200 }}
                      fullWidth
                      required
                      disabled={submitting}
                    />
                    <TextField
                      label="Company name"
                      value={form.companyName}
                      onChange={handleChange("companyName")}
                      error={Boolean(errors.companyName)}
                      helperText={errors.companyName}
                      inputProps={{ maxLength: 200 }}
                      fullWidth
                      required
                      disabled={submitting}
                    />
                    <TextField
                      label="Company website"
                      value={form.website}
                      onChange={handleChange("website")}
                      inputProps={{ maxLength: 255 }}
                      fullWidth
                      disabled={submitting}
                    />
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
                      <TextField
                        label="Country"
                        value={form.country}
                        onChange={handleChange("country")}
                        error={Boolean(errors.country)}
                        helperText={errors.country}
                        inputProps={{ maxLength: 100 }}
                        fullWidth
                        required
                        disabled={submitting}
                      />
                      <TextField
                        label="Phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        inputProps={{ maxLength: 50 }}
                        fullWidth
                        disabled={submitting}
                      />
                    </Stack>
                    <TextField
                      select
                      label="How many clients do you serve?"
                      value={form.clientCount}
                      onChange={handleChange("clientCount")}
                      error={Boolean(errors.clientCount)}
                      helperText={errors.clientCount}
                      fullWidth
                      required
                      disabled={submitting}
                    >
                      {clientCountOptions.map((o) => (
                        <MenuItem key={o.value} value={o.value}>
                          {o.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Box>
                      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                        Products you want to resell
                      </Typography>
                      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                        {NEVTAN_PRODUCTS.map((p) => {
                          const selected = form.products.includes(p.name);
                          return (
                            <Chip
                              key={p.name}
                              label={p.name}
                              onClick={() => toggleProduct(p.name)}
                              disabled={submitting}
                              variant={selected ? "filled" : "outlined"}
                              aria-pressed={selected}
                              sx={{
                                fontWeight: 600,
                                ...(selected
                                  ? { bgcolor: TEAL, color: "#fff", "&:hover": { bgcolor: "#0d645d" } }
                                  : { borderColor: BORDER, color: INK }),
                              }}
                            />
                          );
                        })}
                      </Stack>
                    </Box>
                    <TextField
                      label="Anything else we should know?"
                      value={form.message}
                      onChange={handleChange("message")}
                      inputProps={{ maxLength: 5000 }}
                      fullWidth
                      multiline
                      minRows={3}
                      disabled={submitting}
                    />

                    {/* Honeypot: off-screen so people never fill it in; the API drops any submission that does. */}
                    <Box
                      aria-hidden="true"
                      sx={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
                    >
                      <TextField
                        label="Fax"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.fax}
                        onChange={handleChange("fax")}
                      />
                    </Box>

                    {status === "error" && (
                      <Alert severity="error" onClose={() => setStatus("idle")}>
                        {errorMessage}
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={submitting}
                      startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
                      sx={{ textTransform: "none", borderRadius: 2, alignSelf: "flex-start", fontWeight: 700 }}
                    >
                      {submitting ? "Submitting…" : "Submit application"}
                    </Button>
                  </Stack>
                </Box>
              )}
            </Paper>
          </Container>
        </Box>

        <Container id="faq" maxWidth="md" sx={{ py: { xs: 5, md: 7 }, scrollMarginTop: SECTION_SCROLL_MARGIN }}>
          <SectionHeading title="Frequently asked questions" />
          <Grid container spacing={3}>
            {faqs.map((item) => (
              <Grid item xs={12} key={item.q}>
                <Typography sx={{ fontWeight: 700, color: INK, mb: 0.5 }}>{item.q}</Typography>
                <Typography sx={{ color: "#475569", lineHeight: 1.75 }}>{item.a}</Typography>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 5, textAlign: "center" }}>
            <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
              Have a question first?{" "}
              <Box
                component="a"
                href={`${endPoints.mailSiteUrl}/contact`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: TEAL, fontWeight: 600, textDecoration: "none" }}
              >
                Contact our team
              </Box>
              .
            </Typography>
          </Box>
        </Container>

        <SiteFooter />
      </Box>
    </>
  );
};

export default Reseller;
