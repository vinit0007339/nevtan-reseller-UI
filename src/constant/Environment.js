const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const appMode = process.env.NEXT_PUBLIC_APP_ENV || "localhost";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://reseller.nevtan.com").replace(/\/+$/, "");

if (!apiBaseUrl) {
  console.error("NEXT_PUBLIC_API_BASE_URL is not configured for this build profile.");
}

const driveUrl = appMode === "stage" ? "https://stage-drive.nevtan.com/" : "https://drive.nevtan.com/";

// NevTan Workspace hosts the suite's list prices (/pricing) that the reseller discount applies to.
const workspaceUrl = appMode === "stage" ? "https://stage-workspace.nevtan.com" : "https://workspace.nevtan.com";

// The Mail site hosts NevTan's contact form and legal pages.
const mailSiteUrl = "https://mail.nevtan.com";

export const endPoints = {
  apiBaseUrl,
  siteUrl,
  driveUrl,
  workspaceUrl,
  mailSiteUrl,

  api: {
    RESELLER_APPLICATIONS: "api/public/reseller-applications",
  },
  mode: appMode,
};
