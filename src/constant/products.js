import { endPoints } from "./Environment";

/** The NevTan product suite a reseller can sell. Links and icons match the other NevTan sites. */
export const NEVTAN_PRODUCTS = [
  {
    name: "NevTan Mail",
    icon: "/product-icons/nevtan-mail-upload.png",
    link: "https://mail.nevtan.com/",
    desc: "Secure business email, calendar & meetings on your own domain.",
  },
  {
    name: "NevTan Drive",
    icon: "/product-icons/nevtan-drive.svg",
    link: endPoints.driveUrl,
    desc: "Keep, organize & share your files — with storage shared with Mail.",
  },
  {
    name: "NevTan Sign",
    icon: "/product-icons/nevtan-sign-upload.png",
    link: "https://sign.nevtan.com/",
    desc: "Send, sign & manage documents with legally binding e-signatures.",
  },
  {
    name: "NevTan Cloud",
    icon: "/product-icons/nevtan-cloud-upload.png",
    link: "https://cloud.nevtan.com/",
    desc: "Store, sync & share your team's files securely in the cloud.",
  },
  {
    name: "NevTan Engage",
    icon: "/product-icons/nevtan-engage-upload.png",
    link: "https://engage.nevtan.com/",
    desc: "Reach & engage your customers across channels from one place.",
  },
  {
    name: "NevTan AI",
    icon: "/product-icons/nevtan-ai-upload.png",
    link: "https://ai.nevtan.com/",
    desc: "Your AI assistant for writing, summarizing & getting things done.",
  },
];
