import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useLocation } from "@docusaurus/router";
import { useDoc, useDocsVersion } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  markdownUrlFor,
  hasMarkdown,
  aiChatUrl,
  askAiQuery,
  pageLinkOptions,
  mcpOptions,
} from "./urls";
import {
  claudeIcon,
  githubIcon,
  mcpIcon,
  openaiIcon,
  vscodeIcon,
} from "./brandIcons";
import styles from "./styles.module.css";

const svgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const copyIcon = (
  <svg {...svgProps}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);
const checkIcon = (
  <svg {...svgProps}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
const markdownIcon = (
  <svg {...svgProps}>
    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
    <polyline points="6 15 6 9 9 12 12 9 12 15"></polyline>
    <line x1="17" y1="9" x2="17" y2="15"></line>
    <polyline points="15 13 17 15 19 13"></polyline>
  </svg>
);
const sparkleIcon = (
  <svg {...svgProps}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"></path>
    <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"></path>
  </svg>
);
const chevron = (
  <svg {...svgProps} width="12" height="12">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// DocBreadcrumbs is also rendered on generated category index pages, which
// have a docs version but no doc context, so avoid useDoc() here.
function useVersion() {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useDocsVersion();
  } catch {
    return undefined;
  }
}

// Category index pages have a docs version but no doc, so useDoc() throws.
function useEditUrl() {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useDoc().metadata.editUrl;
  } catch {
    return undefined;
  }
}

const mcpIcons = {
  "mcp-vscode": vscodeIcon,
  "mcp-claude-code": claudeIcon,
  "mcp-codex": openaiIcon,
};

const linkIcon = (
  <svg {...svgProps}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

async function fetchMarkdown(mdUrl) {
  const res = await fetch(mdUrl, { headers: { Accept: "text/markdown" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

// Safari drops the user-gesture permission if the fetch is awaited before the
// clipboard write, so hand the pending promise to a ClipboardItem.
async function copyMarkdown(mdUrl) {
  const text = fetchMarkdown(mdUrl);
  if (window.ClipboardItem && navigator.clipboard?.write) {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": text.then((t) => new Blob([t], { type: "text/plain" })),
      }),
    ]);
  } else {
    await navigator.clipboard.writeText(await text);
  }
}

export default function CopyPageMenu() {
  const { pathname } = useLocation();
  const version = useVersion();
  const editUrl = useEditUrl();
  const versionLabel = version?.label;
  const {
    siteConfig: { baseUrl, customFields = {} },
  } = useDocusaurusContext();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null); // "copied" | "copiedText" | "error"
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Close the menu when navigating to another page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onMouseDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const flash = (next) => {
    setStatus(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(null), 2000);
  };

  const getMdUrl = () => markdownUrlFor(pathname, window.location.origin);
  // Pages without a generated .md (API specifications) share the HTML page.
  const getAiPageUrl = () =>
    hasMarkdown(pathname) ? getMdUrl() : `${window.location.origin}${pathname}`;

  const handleCopy = async () => {
    setOpen(false);
    try {
      await copyMarkdown(getMdUrl());
      flash("copied");
    } catch (err) {
      // No .md file (for example in `npm start` or on generated index pages):
      // fall back to the rendered article text.
      try {
        // Just the doc body: leaves out the footer (feedback, edit link, tags),
        // prev/next links and breadcrumbs that sit around it in <article>.
        const text = (
          document.querySelector("article .theme-doc-markdown") ??
          document.querySelector("article")
        )?.innerText;
        if (!text) throw err;
        await navigator.clipboard.writeText(text);
        flash("copiedText");
      } catch (fallbackErr) {
        console.error("Failed to copy page:", fallbackErr);
        flash("error");
      }
    }
  };

  const handleCopyText = async (text, status = "copiedLink") => {
    setOpen(false);
    try {
      await navigator.clipboard.writeText(text);
      flash(status);
    } catch (err) {
      console.error("Failed to copy:", err);
      flash("error");
    }
  };

  const handleCopyLink = async (url) => {
    setOpen(false);
    try {
      await navigator.clipboard.writeText(url);
      flash("copiedLink");
    } catch (err) {
      console.error("Failed to copy link:", err);
      flash("error");
    }
  };

  const openExternal = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const onMenuKeyDown = (e) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll('[role="menuitem"]') ?? []
    );
    const index = items.indexOf(document.activeElement);
    let next = null;
    if (e.key === "ArrowDown") next = items[(index + 1) % items.length];
    if (e.key === "ArrowUp")
      next = items[(index - 1 + items.length) % items.length];
    if (e.key === "Home") next = items[0];
    if (e.key === "End") next = items[items.length - 1];
    if (next) {
      e.preventDefault();
      next.focus();
    }
  };

  const toggle = () => setOpen((v) => !v);

  const label =
    status === "copied"
      ? "Copied!"
      : status === "copiedLink"
        ? "Link copied!"
        : status === "copiedText"
          ? "Copied!"
          : status === "error"
            ? "Copy failed"
            : "Copy page";

  const linkItems = version
    ? pageLinkOptions({
        pathname,
        baseUrl,
        versionName: version.version,
        isLast: version.isLast,
        versionLabel,
        customFields,
      }).map((o) => ({
        key: o.key,
        icon: linkIcon,
        label: o.label,
        description: o.description,
        url: o.url,
        onClick: () => handleCopyLink(o.url),
      }))
    : [];

  const mcpItems = mcpOptions().map((o) => ({
    key: o.key,
    icon: mcpIcons[o.key] || mcpIcon,
    label: o.label,
    description: o.description,
    separator: o.key === "mcp",
    onClick: () =>
      o.action === "open" ? openExternal(o.value) : handleCopyText(o.value),
  }));

  const menuItems = [
    ...linkItems,
    ...(hasMarkdown(pathname)
      ? [
          {
            key: "markdown",
            icon: markdownIcon,
            label: "View as Markdown",
            onClick: () => openExternal(getMdUrl()),
          },
        ]
      : []),
    {
      key: "ask-ai",
      separator: true,
      icon: sparkleIcon,
      label: "Ask AI about this page",
      onClick: () => {
        setOpen(false);
        window.Kapa?.open?.({
          query: askAiQuery(window.location.href, versionLabel),
          submit: true,
        });
      },
    },
    {
      key: "claude",
      icon: claudeIcon,
      label: "Open in Claude",
      onClick: () =>
        openExternal(aiChatUrl("claude", getAiPageUrl(), versionLabel)),
    },
    {
      key: "chatgpt",
      icon: openaiIcon,
      label: "Open in ChatGPT",
      onClick: () =>
        openExternal(aiChatUrl("chatgpt", getAiPageUrl(), versionLabel)),
    },
    ...mcpItems,
    ...(editUrl
      ? [
          {
            key: "edit",
            separator: true,
            icon: githubIcon,
            label: "Edit page on GitHub",
            onClick: () => openExternal(editUrl),
          },
        ]
      : []),
  ];

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.group}>
        <button
          type="button"
          className={clsx("doc-page-action", styles.primary)}
          onClick={handleCopy}
        >
          {["copied", "copiedText", "copiedLink"].includes(status)
            ? checkIcon
            : copyIcon}
          <span aria-live="polite">{label}</span>
        </button>
        <button
          type="button"
          ref={buttonRef}
          className={clsx("doc-page-action", styles.toggle)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="More page actions"
          onClick={toggle}
        >
          {chevron}
        </button>
      </div>
      {open && (
        <ul
          className={styles.menu}
          role="menu"
          ref={menuRef}
          onKeyDown={onMenuKeyDown}
        >
          {menuItems.map((item, i) => (
            <li
              key={item.key}
              role="none"
              className={item.separator ? styles.separator : undefined}
            >
              <button
                type="button"
                role="menuitem"
                className="doc-page-action__menu-item"
                onClick={item.onClick}
                ref={i === 0 ? (el) => el?.focus() : undefined}
              >
                <span
                  className="doc-page-action__menu-item-icon"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span className="doc-page-action__menu-item-body">
                  <span className="doc-page-action__menu-item-label">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="doc-page-action__menu-item-desc">
                      {item.description}
                    </span>
                  )}
                  {item.url && (
                    <span className="doc-page-action__menu-item-url">
                      {item.url.replace(/^https?:\/\//, "")}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
