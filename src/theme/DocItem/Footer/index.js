// Why is this swizzled?
//   - Adds a PushFeedback widget to every doc.
//   - Replaces the "Edit this page" text link with a styled button, and adds
//     a "Copy page link" button alongside it in the footer action row.

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc, useDocsVersion } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import TagsListInline from "@theme/TagsListInline";
import LastUpdated from "@theme/LastUpdated";
import { FeedbackButton } from "pushfeedback-react";
import { defineCustomElements } from "pushfeedback/loader";
import "pushfeedback/dist/pushfeedback/pushfeedback.css";
import "./index.css";

// ── Copy link logic ──────────────────────────────────────────────────────────

function injectVersionSegment(permalink, versionLabel) {
  return permalink.replace(/^\/docs\//, `/docs/${versionLabel}/`);
}

function buildUrls({ permalink, versionName, isLast, customFields }) {
  const root = customFields.canonicalUrlRoot || "";
  const isNext = versionName === "current";

  if (isLast) {
    return {
      mode: "dropdown",
      versionedUrl: `${root}${injectVersionSegment(permalink, customFields.currentVersion)}`,
      versionedLabel: customFields.currentVersion,
      rollingUrl: `${root}${permalink}`,
      rollingLabel: "latest",
    };
  }

  if (isNext) {
    const versionedPath = permalink.replace(
      /^\/docs\/next\//,
      `/docs/${customFields.nextVersion}/`
    );
    return {
      mode: "dropdown",
      versionedUrl: `${root}${versionedPath}`,
      versionedLabel: customFields.nextVersion,
      rollingUrl: `${root}${permalink}`,
      rollingLabel: "next",
    };
  }

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

const editIcon = (
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
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
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
      className="doc-page-action"
      onClick={() => copy(url)}
      title={`Pins to this version. Page content won't change when newer versions are released.\n${url}`}
      aria-label={`Copy stable link for version ${label}`}
    >
      {linkIcon}
      <span>{copied ? "Copied!" : `Copy page link (${label})`}</span>
    </button>
  );
}

const DROPDOWN_COPY = {
  latest: {
    versioned:
      "Pins to this version. Page content won't change when newer versions are released.",
    rolling:
      "Always shows the latest release page version. Page content changes with each minor release.",
  },
  next: {
    versioned:
      "Pins to this version. Page content won't change when newer versions are released.",
    rolling:
      "Always shows the next (unreleased) page version. Page content changes with each minor release.",
  },
};

function stripProtocol(url) {
  return url.replace(/^https?:\/\//, "");
}

function MenuItem({ icon, label, description, url, copied, onClick }) {
  return (
    <button
      type="button"
      className="doc-page-action__menu-item"
      onClick={onClick}
      title={url}
    >
      <span className="doc-page-action__menu-item-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="doc-page-action__menu-item-body">
        <span className="doc-page-action__menu-item-label">
          {copied ? "Copied!" : label}
        </span>
        <span className="doc-page-action__menu-item-desc">{description}</span>
        <span className="doc-page-action__menu-item-url">
          {stripProtocol(url)}
        </span>
      </span>
    </button>
  );
}

function CopyDropdown({
  versionedUrl,
  versionedLabel,
  rollingUrl,
  rollingLabel,
}) {
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
    <div className="doc-page-action__dropdown" ref={ref}>
      <button
        type="button"
        className="doc-page-action"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {linkIcon}
        <span>Copy page link</span>
        {chevron}
      </button>
      {open && (
        <ul className="doc-page-action__menu">
          <li>
            <MenuItem
              icon={linkIcon}
              label={`Copy page link (${versionedLabel})`}
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

function EditThisPageButton({ editUrl }) {
  return (
    <a
      href={editUrl}
      className="doc-page-action"
      target="_blank"
      rel="noreferrer noopener"
    >
      {editIcon}
      <span>Edit this page</span>
    </a>
  );
}

function PageActions() {
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
    <div className="doc-page-actions">
      {urls.mode === "dropdown" ? (
        <CopyDropdown
          versionedUrl={urls.versionedUrl}
          versionedLabel={urls.versionedLabel}
          rollingUrl={urls.rollingUrl}
          rollingLabel={urls.rollingLabel}
        />
      ) : (
        <CopySingleButton url={urls.versionedUrl} label={label} />
      )}
      {metadata.editUrl && <EditThisPageButton editUrl={metadata.editUrl} />}
    </div>
  );
}

// ── Feedback widget ──────────────────────────────────────────────────────────

function FeedbackWidget() {
  const buttonThumbsUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
    </svg>
  );
  const buttonThumbsDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
    </svg>
  );
  const projectId = "m6exeps3n1";

  useEffect(() => {
    if (typeof window !== "undefined") {
      defineCustomElements(window);
    }
  }, []);

  return (
    <div className="feedback-widget margin-top--md margin-bottom--md">
      <div className="margin-bottom--sm">
        <b>Was this helpful?</b>
      </div>
      <span className="feedback-widget-positive">
        <FeedbackButton
          project={projectId}
          rating="1"
          custom-font="True"
          button-style="default"
          modal-position="center"
          hide-email="true"
        >
          <button
            className="button button--outline button--primary button--sm button--icon"
            title="Yes"
          >
            {buttonThumbsUp}
          </button>
        </FeedbackButton>
      </span>
      <span className="feedback-widget-negative margin-left--sm">
        <FeedbackButton
          project={projectId}
          rating="0"
          custom-font="True"
          button-style="default"
          modal-position="center"
          hide-email="true"
        >
          <button
            className="button button--outline button--primary button--sm button--icon"
            title="No"
          >
            {buttonThumbsDown}
          </button>
        </FeedbackButton>
      </span>
    </div>
  );
}

// ── Footer wrapper ───────────────────────────────────────────────────────────

export default function FooterWrapper() {
  const { metadata } = useDoc();
  const { tags, lastUpdatedAt, lastUpdatedBy } = metadata;
  const canDisplayTagsRow = tags.length > 0;

  return (
    <>
      <FeedbackWidget />
      <footer
        className={clsx(ThemeClassNames.docs.docFooter, "docusaurus-mt-lg")}
      >
        {canDisplayTagsRow && (
          <div
            className={clsx(
              "row margin-top--sm",
              ThemeClassNames.docs.docFooterTagsRow
            )}
          >
            <div className="col">
              <TagsListInline tags={tags} />
            </div>
          </div>
        )}
        <div
          className={clsx(
            "row margin-top--sm",
            ThemeClassNames.docs.docFooterEditMetaRow
          )}
        >
          <div className="col">
            <PageActions />
          </div>
          <div className="col doc-footer-last-updated">
            {(lastUpdatedAt || lastUpdatedBy) && (
              <LastUpdated
                lastUpdatedAt={lastUpdatedAt}
                lastUpdatedBy={lastUpdatedBy}
              />
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
