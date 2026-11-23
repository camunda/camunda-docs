import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useLocation } from "@docusaurus/router";
import { useDocsVersion } from "@docusaurus/plugin-content-docs/client";
import { markdownUrlFor, aiChatUrl } from "./urls";
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
const markdownIcon = (
  <svg {...svgProps}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="8" y1="13" x2="16" y2="13"></line>
    <line x1="8" y1="17" x2="14" y2="17"></line>
  </svg>
);
const externalIcon = (
  <svg {...svgProps}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);
const chevron = (
  <svg {...svgProps} width="12" height="12">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// DocBreadcrumbs is also rendered on generated category index pages, which
// have a docs version but no doc context, so avoid useDoc() here.
function useVersionLabel() {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useDocsVersion().label;
  } catch {
    return undefined;
  }
}

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
  const versionLabel = useVersionLabel();
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

  const handleCopy = async () => {
    setOpen(false);
    try {
      await copyMarkdown(getMdUrl());
      flash("copied");
    } catch (err) {
      // No .md file (for example in `npm start` or on generated index pages):
      // fall back to the rendered article text.
      try {
        const text = document.querySelector("article")?.innerText;
        if (!text) throw err;
        await navigator.clipboard.writeText(text);
        flash("copiedText");
      } catch (fallbackErr) {
        console.error("Failed to copy page:", fallbackErr);
        flash("error");
      }
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
      : status === "copiedText"
        ? "Copied as plain text"
        : status === "error"
          ? "Copy failed"
          : "Copy page";

  const menuItems = [
    {
      key: "markdown",
      icon: markdownIcon,
      label: "View as Markdown",
      description: "Open this page as plain Markdown",
      onClick: () => openExternal(getMdUrl()),
    },
    {
      key: "claude",
      icon: externalIcon,
      label: "Open in Claude",
      description: "Ask Claude about this page",
      onClick: () =>
        openExternal(aiChatUrl("claude", getMdUrl(), versionLabel)),
    },
    {
      key: "chatgpt",
      icon: externalIcon,
      label: "Open in ChatGPT",
      description: "Ask ChatGPT about this page",
      onClick: () =>
        openExternal(aiChatUrl("chatgpt", getMdUrl(), versionLabel)),
    },
  ];

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.group}>
        <button
          type="button"
          className={clsx("doc-page-action", styles.primary)}
          onClick={handleCopy}
        >
          {copyIcon}
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
            <li key={item.key} role="none">
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
                  <span className="doc-page-action__menu-item-desc">
                    {item.description}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
