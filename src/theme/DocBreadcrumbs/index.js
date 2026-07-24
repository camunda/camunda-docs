// Why is this swizzled?
//   - Renders a metadata strip to the right of the breadcrumbs containing a
//     "Copy page link" affordance. Lets users copy a permalink appropriate
//     to the version they are reading without leaving the page.
//   - On the latest and `next` versions, the affordance is a dropdown with
//     two options: copy a versioned (pinned) URL or a rolling (latest/next)
//     URL. On other versions the URL is already pinned, so a single button
//     copies it directly.
// Wraps the original @theme-original/DocBreadcrumbs.

import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "@theme-original/DocBreadcrumbs";
import { useDoc, useDocsVersion } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "./index.css";

function injectVersionSegment(permalink, versionLabel) {
  return permalink.replace(/^\/docs\//, `/docs/${versionLabel}/`);
}

function buildUrls({ permalink, versionName, isLast, customFields }) {
  const root = customFields.canonicalUrlRoot || "";
  const isNext = versionName === "current";

  if (isLast) {
    // Latest version. Permalink is bare (/docs/foo). Versioned URL injects
    // the current version label so it stays pinned across releases.
    return {
      mode: "dropdown",
      versionedUrl: `${root}${injectVersionSegment(permalink, customFields.currentVersion)}`,
      rollingUrl: `${root}${permalink}`,
      rollingLabel: "latest",
    };
  }

  if (isNext) {
    // Next/unreleased. Permalink is /docs/next/foo (rolling). Versioned URL
    // predicts the eventual release path (e.g. /docs/8.10/foo).
    const versionedPath = permalink.replace(
      /^\/docs\/next\//,
      `/docs/${customFields.nextVersion}/`
    );
    return {
      mode: "dropdown",
      versionedUrl: `${root}${versionedPath}`,
      rollingUrl: `${root}${permalink}`,
      rollingLabel: "next",
    };
  }

  // Maintained but non-latest version (e.g. 8.7, 8.8). Permalink is already
  // pinned (/docs/8.7/foo), so a single button suffices.
  return {
    mode: "single",
    versionedUrl: `${root}${permalink}`,
  };
}

const linkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

const chevron = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };
  return { copied, copy };
}

function CopySingleButton({ url, label }) {
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      className="doc-meta-row__copy"
      onClick={() => copy(url)}
      title={`Copy a link pinned to version ${label}: ${url}`}
      aria-label={`Copy stable link for version ${label}`}
    >
      {linkIcon}
      <span>{copied ? "Copied!" : "Copy page link"}</span>
    </button>
  );
}

const DROPDOWN_COPY = {
  latest: {
    versioned:
      "Pins to this version. Page content won't change when newer versions are released.",
    rolling:
      "Always shows the latest page version. Changes with each minor release.",
  },
  next: {
    versioned:
      "Pins to the next version once released. Stable across future docs.",
    rolling: "Always shows the in-development version of this page.",
  },
};

function stripProtocol(url) {
  return url.replace(/^https?:\/\//, "");
}

function MenuItem({ icon, label, description, url, copied, onClick }) {
  return (
    <button
      type="button"
      className="doc-meta-row__menu-item"
      onClick={onClick}
      title={url}
    >
      <span className="doc-meta-row__menu-item-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="doc-meta-row__menu-item-body">
        <span className="doc-meta-row__menu-item-label">
          {copied ? "Copied!" : label}
        </span>
        <span className="doc-meta-row__menu-item-desc">{description}</span>
        <span className="doc-meta-row__menu-item-url">
          {stripProtocol(url)}
        </span>
      </span>
    </button>
  );
}

function CopyDropdown({ versionedUrl, rollingUrl, rollingLabel }) {
  const [open, setOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleCopy = async (key, url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey(null);
        setOpen(false);
      }, 1200);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="doc-meta-row__dropdown" ref={ref}>
      <button
        type="button"
        className="doc-meta-row__copy"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {linkIcon}
        <span>Copy page link</span>
        {chevron}
      </button>
      {open && (
        <ul className="doc-meta-row__menu">
          <li>
            <MenuItem
              icon={linkIcon}
              label="Copy page link (versioned)"
              description={DROPDOWN_COPY[rollingLabel].versioned}
              url={versionedUrl}
              copied={copiedKey === "versioned"}
              onClick={() => handleCopy("versioned", versionedUrl)}
            />
          </li>
          <li>
            <MenuItem
              icon={linkIcon}
              label={`Copy page link (${rollingLabel})`}
              description={DROPDOWN_COPY[rollingLabel].rolling}
              url={rollingUrl}
              copied={copiedKey === "rolling"}
              onClick={() => handleCopy("rolling", rollingUrl)}
            />
          </li>
        </ul>
      )}
    </div>
  );
}

function MetadataRow() {
  const { metadata } = useDoc();
  const { version: versionName, label, isLast } = useDocsVersion();
  const {
    siteConfig: { customFields = {} },
  } = useDocusaurusContext();

  const urls = buildUrls({
    permalink: metadata.permalink,
    versionName,
    isLast,
    customFields,
  });

  return (
    <div className="doc-meta-row" data-testid="doc-meta-row">
      {urls.mode === "dropdown" ? (
        <CopyDropdown
          versionedUrl={urls.versionedUrl}
          rollingUrl={urls.rollingUrl}
          rollingLabel={urls.rollingLabel}
        />
      ) : (
        <CopySingleButton url={urls.versionedUrl} label={label} />
      )}
    </div>
  );
}

export default function DocBreadcrumbsWrapper(props) {
  return (
    <div className="doc-breadcrumbs-row">
      <Breadcrumbs {...props} />
      <MetadataRow />
    </div>
  );
}
