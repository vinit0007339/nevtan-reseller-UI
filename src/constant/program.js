import { APPS, FREE_APPS, PAID_APPS, listNames } from "./products";

// The reseller program's terms. Every page reads them from here, so a change to the discount,
// the minimum order or the review time is made once.
export const DISCOUNT_RATE = 0.1;
export const RESELLER_DISCOUNT = "10%";
export const MINIMUM_ORDER = "$500";
export const REVIEW_TIME = "one business day";

export const PAID_APP_NAMES = listNames(PAID_APPS);
export const FREE_APP_NAMES = listNames(FREE_APPS);

export const TERMS = [
  { value: `${RESELLER_DISCOUNT} off`, label: "list price on every NevTan Workspace plan" },
  { value: MINIMUM_ORDER, label: "minimum order for reseller pricing" },
  { value: `${APPS.length} apps`, label: "one reseller account for the whole suite" },
  { value: "1 day", label: `to review your application` },
];

export const AUDIENCES = [
  {
    key: "msp",
    title: "IT service providers & MSPs",
    copy: "Bundle business email, file storage and e-signatures into the managed services you already run for clients.",
  },
  {
    key: "agency",
    title: "Web & digital agencies",
    copy: "Launch every client website with matching domain mailboxes, and add Engage to run their marketing.",
  },
  {
    key: "hosting",
    title: "Domain & hosting resellers",
    copy: "Offer professional email and cloud storage alongside the domains and hosting you already sell.",
  },
  {
    key: "consultant",
    title: "Consultants & system integrators",
    copy: "Move clients onto one affordable suite and keep earning on the tools you set up for them.",
  },
];

export const STEPS = [
  {
    title: "Apply",
    copy: "Tell us about your business and the clients you serve. It takes about two minutes.",
    detail:
      "Share your company, your website, the country you work in, how many clients you serve and the NevTan apps you want to sell.",
  },
  {
    title: "Get approved",
    copy: `Our team reviews every application and replies within ${REVIEW_TIME}.`,
    detail: "We reply to the email address you applied with, so keep an eye on that inbox.",
  },
  {
    title: "Place your first order",
    copy: `Buy any mix of NevTan Workspace plans at ${RESELLER_DISCOUNT} off list price, from a ${MINIMUM_ORDER} minimum order.`,
    detail: `Pick the plan that fits each client — Starter, Standard or Plus — and the number of users. Reseller pricing applies to orders of ${MINIMUM_ORDER} or more.`,
  },
  {
    title: "Set up your clients",
    copy: "Our team helps you set up each client on NevTan.",
    detail:
      "A reseller dashboard for managing client accounts yourself is on the way. Until it's ready, our team sets each client up with you.",
  },
  {
    title: "Bill your clients and grow",
    copy: "Bill your clients at your own price and keep the relationship.",
    detail: "As a client grows, move them up a plan or add users. Plans and users can change at any time.",
  },
];

export const BENEFITS = [
  {
    key: "margin",
    title: "Your price, your margin",
    copy: `Buy every NevTan Workspace plan at ${RESELLER_DISCOUNT} off list price, then set the price your clients pay.`,
  },
  {
    key: "relationship",
    title: "Your clients stay yours",
    copy: "You bill your clients directly, so the relationship — and the renewal — stays with you.",
  },
  {
    key: "suite",
    title: "One account, the whole suite",
    copy: `${PAID_APP_NAMES} come in one plan, so you sell one product instead of five.`,
  },
  {
    key: "free",
    title: "AI and Office free for every client",
    copy: `NevTan ${FREE_APP_NAMES} are free on every plan — extra value your clients get at no cost to you.`,
  },
  {
    key: "plans",
    title: "A plan for every client",
    copy: "From Starter for small teams to Standard and Plus as they grow, and Enterprise for custom needs.",
  },
  {
    key: "security",
    title: "Security clients can trust",
    copy: "TLS encryption, audit trails, admin roles and one sign-in across every NevTan app.",
  },
];

export const NEVTAN_DOES = [
  "Builds and runs the NevTan apps your clients use",
  `Reviews your application within ${REVIEW_TIME}`,
  "Helps you set up each client on NevTan",
  "Keeps every app on one NevTan sign-in",
];

export const RESELLER_DOES = [
  "Finds and serves the clients",
  "Sets the price each client pays, and bills them",
  "Owns the client relationship",
  `Places orders of ${MINIMUM_ORDER} or more`,
];

// What the application form asks for, so applicants know before they start.
export const APPLICATION_FIELDS = [
  "Your name and work email",
  "Company name and website",
  "Country and phone number",
  "How many clients you serve",
  "The NevTan apps you want to resell",
];

export const FAQ_GROUPS = [
  {
    id: "program",
    title: "The program",
    items: [
      {
        q: "What is the NevTan Reseller Program?",
        a: `It lets businesses that serve other businesses buy NevTan Workspace at ${RESELLER_DISCOUNT} off list price and sell it to their own clients at their own price.`,
      },
      {
        q: "Who can apply?",
        a: "Businesses that serve clients — IT service providers and MSPs, web and digital agencies, domain and hosting resellers, consultants and system integrators. Tell us about yours in the application.",
      },
      {
        q: "How long does approval take?",
        a: `Our team reviews every application and replies within ${REVIEW_TIME}.`,
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing and orders",
    items: [
      {
        q: "How much do resellers save?",
        a: `Approved resellers get ${RESELLER_DISCOUNT} off NevTan's list price on every NevTan Workspace plan.`,
      },
      {
        q: "Is there a minimum order?",
        a: `Yes. Reseller pricing applies to orders of ${MINIMUM_ORDER} or more.`,
      },
      {
        q: "Where do the list prices come from?",
        a: "They are NevTan Workspace's published prices, shown in the currency for your region. This site reads them live, so they always match Workspace.",
      },
      {
        q: "Who bills my clients?",
        a: "You do. You buy from NevTan at the reseller price and set your own price for your clients, so the client relationship stays yours.",
      },
    ],
  },
  {
    id: "clients",
    title: "Your clients",
    items: [
      {
        q: "Can I manage my clients' accounts myself?",
        a: "A reseller dashboard for managing client accounts is on the way. Until it's ready, our team helps you set up each client.",
      },
      {
        q: "Can my clients change plan or add users later?",
        a: "Yes. Plans and the number of users can change at any time.",
      },
      {
        q: "Do my clients need their own domain?",
        a: "Not to get started. They can connect a domain later to give everyone a NevTan Mail mailbox.",
      },
    ],
  },
  {
    id: "products",
    title: "The products",
    items: [
      {
        q: "Which products can I resell?",
        a: `Every NevTan Workspace plan includes ${PAID_APP_NAMES}. NevTan ${FREE_APP_NAMES} are free for everyone, on every plan.`,
      },
      {
        q: `Are NevTan ${FREE_APP_NAMES} really free?`,
        a: "Yes. They are free for everyone with a NevTan account, on every plan.",
      },
      {
        q: "How is my clients' data protected?",
        a: "Every app runs over TLS, with admin roles, audit trails and one sign-in across the suite. Each product page lists its own safeguards.",
      },
    ],
  },
];

export const ALL_FAQS = FAQ_GROUPS.flatMap((group) => group.items);
export const HOME_FAQS = [
  FAQ_GROUPS[1].items[0],
  FAQ_GROUPS[1].items[1],
  FAQ_GROUPS[3].items[0],
  FAQ_GROUPS[1].items[3],
  FAQ_GROUPS[2].items[0],
];
