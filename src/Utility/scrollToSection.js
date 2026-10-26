// onClick for in-page links (href="#section"). Scrolls with JS instead of navigating to the hash:
// a "#section" left in the address bar makes a refresh jump back to that section rather than
// start at the top. The href stays on the link, so it still works without JS, and modified
// clicks (new tab / window) are left to the browser.
export const scrollToSection = (event) => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const id = event.currentTarget.getAttribute("href")?.replace(/^#/, "");
  const target = id && document.getElementById(id);
  if (!target) return;

  event.preventDefault();
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
};
