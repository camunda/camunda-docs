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
 * Opening question for the built-in Ask AI (Kapa) widget.
 */
function askAiQuery(pageUrl, versionLabel) {
  const version = versionLabel ? ` (version ${versionLabel})` : "";
  return `Summarize this documentation page${version} and help me with questions about it: ${pageUrl}`;
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

/**
 * Stable and rolling links to a page, for the "Copy page link" items.
 * `pathname` includes baseUrl. Returns [] when the page isn't versioned
 * in a way that needs links (never throws).
 *
 * @param {object} args
 * @param {string} args.pathname e.g. "/docs/components/foo/"
 * @param {string} args.baseUrl e.g. "/"
 * @param {string} args.versionName "current" for next, otherwise the version
 * @param {boolean} args.isLast whether this is the latest released version
 * @param {string} args.versionLabel label of the version being viewed
 * @param {{canonicalUrlRoot?: string, currentVersion?: string, nextVersion?: string}} args.customFields
 * @returns {{key: string, label: string, description: string, url: string}[]}
 */
function pageLinkOptions({
  pathname,
  baseUrl,
  versionName,
  isLast,
  versionLabel,
  customFields,
}) {
  const root = customFields.canonicalUrlRoot || "";
  const base = baseUrl.replace(/\/+$/, "");
  const docsPrefix = `${base}/docs/`;
  const swap = (from, to) =>
    pathname.startsWith(`${docsPrefix}${from}`)
      ? `${docsPrefix}${to}${pathname.slice(docsPrefix.length + from.length)}`
      : pathname;
  const pinned =
    "Pins to this version. Page content won't change when newer versions are released.";

  if (isLast) {
    return [
      {
        key: "versioned",
        label: `Copy page link (${customFields.currentVersion})`,
        description: pinned,
        url: `${root}${swap("", `${customFields.currentVersion}/`)}`,
      },
      {
        key: "rolling",
        label: "Copy page link (latest)",
        description:
          "Always shows the latest release page version. Page content changes with each minor release.",
        url: `${root}${pathname}`,
      },
    ];
  }

  if (versionName === "current") {
    return [
      {
        key: "versioned",
        label: `Copy page link (${customFields.nextVersion})`,
        description: pinned,
        url: `${root}${swap("next/", `${customFields.nextVersion}/`)}`,
      },
      {
        key: "rolling",
        label: "Copy page link (next)",
        description:
          "Always shows the next (unreleased) page version. Page content changes with each minor release.",
        url: `${root}${pathname}`,
      },
    ];
  }

  return [
    {
      key: "versioned",
      label: `Copy page link (${versionLabel})`,
      description: pinned,
      url: `${root}${pathname}`,
    },
  ];
}

// Same server as `data-mcp-server-url` for the Kapa widget in docusaurus.config.js.
const MCP_SERVER_URL = "https://camunda-docs.mcp.kapa.ai";
const MCP_SERVER_NAME = "camunda-docs";

/**
 * "Connect with MCP" menu entries. `copy` entries put `value` on the
 * clipboard, `open` entries navigate to `value` (a deep link).
 *
 * @param {string} [serverUrl]
 * @returns {{key: string, label: string, description?: string, action: "copy" | "open", value: string}[]}
 */
function mcpOptions(serverUrl = MCP_SERVER_URL) {
  const vscodeConfig = encodeURIComponent(
    JSON.stringify({ name: MCP_SERVER_NAME, type: "http", url: serverUrl })
  );
  return [
    {
      key: "mcp",
      label: "Connect with MCP",
      description: "Copy the Camunda docs MCP server URL",
      action: "copy",
      value: serverUrl,
    },
    {
      key: "mcp-vscode",
      label: "Connect MCP to VSCode",
      action: "open",
      value: `vscode:mcp/install?${vscodeConfig}`,
    },
    {
      key: "mcp-claude-code",
      label: "Connect MCP to Claude Code",
      action: "copy",
      value: `claude mcp add --transport http ${MCP_SERVER_NAME} ${serverUrl}`,
    },
    {
      key: "mcp-codex",
      label: "Connect MCP to Codex",
      action: "copy",
      value: `codex mcp add ${MCP_SERVER_NAME} --url ${serverUrl}`,
    },
  ];
}

module.exports = {
  markdownUrlFor,
  aiPrompt,
  askAiQuery,
  aiChatUrl,
  mcpOptions,
  MCP_SERVER_URL,
  pageLinkOptions,
};
