import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "@docusaurus/router";
import { currentVersion as latestVersion } from "../versions";

const STORAGE_KEY = "docs-previous-version";

function getVersionFromPath(pathname: string): string | null {
  // Match /docs/next/ or /docs/8.7/ or /docs/8.8/ etc.
  const versionMatch = pathname.match(/\/docs\/(next|[\d.]+)\//);
  if (versionMatch) {
    return versionMatch[1];
  }
  // If the path is /docs/... without a version prefix, it's the current/latest version
  if (pathname.match(/\/docs\//)) {
    return "current";
  }
  return null;
}

function showToast(
  currentVersion: string,
  previousVersion: string,
  setNotification: (msg: string | null) => void,
  setVisible: (v: boolean) => void,
  timeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
) {
  const isLatest = currentVersion === "current";
  const isNext = currentVersion === "next";
  let displayVersion: string;
  let suffix = "";

  if (isLatest) {
    displayVersion = latestVersion;
    suffix = " (latest)";
  } else if (isNext) {
    const [major, minor] = latestVersion.split(".").map(Number);
    displayVersion = `${major}.${minor + 1}`;
    suffix = " (unreleased)";
  } else {
    displayVersion = currentVersion;
  }

  setNotification(
    `You are now viewing version ${displayVersion} documentation${suffix}`
  );
  requestAnimationFrame(() => {
    requestAnimationFrame(() => setVisible(true));
  });

  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
  timeoutRef.current = setTimeout(() => {
    setVisible(false);
    setTimeout(() => setNotification(null), 600);
  }, 6000);
}

function VersionNotification() {
  const location = useLocation();
  const [notification, setNotification] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousVersionRef = useRef<string | null>(null);

  function dismiss() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(false);
    setTimeout(() => setNotification(null), 600);
  }

  useEffect(() => {
    const currentVersion = getVersionFromPath(location.pathname);
    if (!currentVersion) return;

    // Determine the previous version: from in-memory ref (client-side nav)
    // or from sessionStorage (full page load)
    let previousVersion = previousVersionRef.current;
    if (previousVersion === null) {
      try {
        previousVersion = sessionStorage.getItem(STORAGE_KEY);
      } catch {
        // sessionStorage unavailable
      }
    }

    // Show toast if version changed, otherwise dismiss any existing toast
    if (previousVersion && previousVersion !== currentVersion) {
      showToast(
        currentVersion,
        previousVersion,
        setNotification,
        setVisible,
        timeoutRef
      );
    } else {
      // Navigated within the same version — fade out toast
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setVisible(false);
      setTimeout(() => setNotification(null), 400);
    }

    // Track current version in memory and sessionStorage
    previousVersionRef.current = currentVersion;
    try {
      sessionStorage.setItem(STORAGE_KEY, currentVersion);
    } catch {
      // ignore
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [location.pathname]);

  if (!notification) return null;

  return (
    <div
      className={`version-switch-toast ${visible ? "version-switch-toast--visible" : "version-switch-toast--hidden"}`}
      role="status"
      aria-live="polite"
    >
      <svg
        className="version-switch-toast__icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <span className="version-switch-toast__text">{notification}</span>
      <button
        className="version-switch-toast__close"
        onClick={dismiss}
        aria-label="Dismiss notification"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Visually-hidden directive for AI agents and LLMs */}
      <div
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        For the complete documentation index, see{" "}
        <a href="/llms.txt">llms.txt</a>.
      </div>
      <VersionNotification />
      {children}
    </>
  );
}
