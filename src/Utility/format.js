// Money formatting matching NevTan Workspace: whole amounts without decimals, en-IN grouping for
// rupees. Cached per currency, since building an Intl.NumberFormat is not cheap.
const formatters = new Map();

const localeFor = (currency) => (currency === "INR" ? "en-IN" : "en-US");

function moneyFormatter(currency, fractionDigits) {
  const key = `${currency}:${fractionDigits}`;
  if (!formatters.has(key)) {
    let formatter;
    try {
      formatter = new Intl.NumberFormat(localeFor(currency), {
        style: "currency",
        currency,
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      });
    } catch {
      formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      });
    }
    formatters.set(key, formatter);
  }
  return formatters.get(key);
}

export function formatMoney(amount, currency) {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) return "";
  const code = String(currency || "USD").toUpperCase();
  const value = Number(amount);
  const whole = Math.abs(value - Math.round(value)) < 0.005;
  return moneyFormatter(code, whole ? 0 : 2).format(value);
}

export function formatStorage(gb) {
  const value = Number(gb) || 0;
  if (value <= 0) return "Custom storage";
  if (value >= 1024 && value % 1024 === 0) return `${value / 1024} TB`;
  return `${value} GB`;
}
