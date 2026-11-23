// Pure helpers for the Copy page menu. Kept free of React so they can be
// unit tested.

/**
 * URL of the Markdown version of a page. `pathname` already includes baseUrl
 * and the version prefix, so the file matches the version being viewed.
 *
 * @param {string} pathname e.g. "/docs/8.9/components/foo/"
 * @param {string} origin e.g. "https://docs.camunda.io"
 */
function markdownUrlFor(pathname, origin) {
  return `${origin}${pathname.replace(/\/+$/, "")}.md`;
}

/**
 * Prompt for an AI assistant. It passes the .md URL, never the page content,
 * because long pages would exceed URL length limits.
 */
function aiPrompt(mdUrl, versionLabel) {
  const version = versionLabel ? `, version ${versionLabel}` : "";
  return `Read ${mdUrl} so I can ask questions about it. It's from the Camunda 8 documentation${version}.`;
}

/**
 * @param {"claude" | "chatgpt"} provider
 */
function aiChatUrl(provider, mdUrl, versionLabel) {
  const q = encodeURIComponent(aiPrompt(mdUrl, versionLabel));
  if (provider === "claude") return `https://claude.ai/new?q=${q}`;
  if (provider === "chatgpt") return `https://chatgpt.com/?q=${q}`;
  throw new Error(`Unknown AI provider: ${provider}`);
}

module.exports = { markdownUrlFor, aiPrompt, aiChatUrl };
