// Why is this swizzled?
//   - To add a PushFeedback widget to every doc, to solicit feedback from readers.
//   - To add a "Copy stable link" button that surfaces the version-pinned URL,
//     so users copying links into external tools (e.g. Confluence) get a URL
//     that won't drift to a future version of the docs.
// Swizzled from version 2.4.1.

import React, { useEffect, useState } from "react";
import Footer from "@theme-original/DocItem/Footer";

import { FeedbackButton } from "pushfeedback-react";
import { defineCustomElements } from "pushfeedback/loader";
import "pushfeedback/dist/pushfeedback/pushfeedback.css";
import { useDoc, useDocsVersion } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "./index.css";

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

function buildStableUrl(permalink, versionName, isLast, canonicalUrlRoot) {
  // Permalink already includes a version segment for non-latest versions
  // (e.g. /docs/8.8/foo, /docs/next/foo). For the latest version, Docusaurus
  // omits it (e.g. /docs/foo) — inject it so the copied URL stays pinned.
  let path = permalink;
  if (isLast) {
    path = permalink.replace(/^\/docs\//, `/docs/${versionName}/`);
  }
  return `${canonicalUrlRoot}${path}`;
}

function CopyStableLinkWidget() {
  const { metadata } = useDoc();
  // useDocsVersion() returns PropVersionMetadata where the version-name field
  // is `version` (not `name`). `label` is what we show in the UI.
  const { version: versionName, label, isLast } = useDocsVersion();
  const {
    siteConfig: { customFields = {} },
  } = useDocusaurusContext();
  const [copied, setCopied] = useState(false);

  const stableUrl = buildStableUrl(
    metadata.permalink,
    versionName,
    isLast,
    customFields.canonicalUrlRoot || ""
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(stableUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy stable link:", err);
    }
  };

  const linkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  );

  return (
    <div className="copy-stable-link margin-top--md margin-bottom--md">
      <button
        type="button"
        className="button button--outline button--primary button--sm copy-stable-link__button"
        onClick={handleCopy}
        title={`Copy a link pinned to version ${label}: ${stableUrl}`}
        aria-label={`Copy stable link for version ${label}`}
      >
        <span className="copy-stable-link__icon">{linkIcon}</span>
        {copied ? "Copied!" : `Copy link to ${label}`}
      </button>
    </div>
  );
}

export default function FooterWrapper(props) {
  return (
    <>
      <FeedbackWidget />
      <CopyStableLinkWidget />
      <Footer {...props} />
    </>
  );
}
