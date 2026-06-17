import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import bwcStyles from "./build-with-camunda.module.css";
import styles from "./downloads.module.css";
import K8sSvgIcon from "../components/CamundaSelfManaged/icons/kubernetes.svg";
import DockerSvgIcon from "../components/CamundaSelfManaged/icons/docker.svg";

/* ─── OS detection ─── */

function detectOS() {
  if (typeof navigator === "undefined") return "mac";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux")) return "linux";
  return "mac";
}

/* ─── Icon components ─── */

function DownloadBtnIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      style={{ marginRight: 6, verticalAlign: "-2px" }}
    >
      <path
        d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparklesIconLg() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect
        x="6"
        y="6"
        width="52"
        height="52"
        rx="12"
        fill="rgba(252,93,13,0.12)"
      />
      <path
        d="M32 18l3.2 9 9 3.2-9 3.2-3.2 9-3.2-9-9-3.2 9-3.2L32 18z"
        fill="#fc5d0d"
      />
      <path
        d="M46 38l1.7 4.8 4.8 1.7-4.8 1.7-1.7 4.8-1.7-4.8-4.8-1.7 4.8-1.7L46 38z"
        fill="#fc5d0d"
      />
      <path
        d="M18 42l1.1 3.1 3.1 1.1-3.1 1.1-1.1 3.1-1.1-3.1-3.1-1.1 3.1-1.1L18 42z"
        fill="#fc5d0d"
      />
    </svg>
  );
}

function PencilIconLg() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect
        x="6"
        y="6"
        width="52"
        height="52"
        rx="12"
        fill="rgba(252,93,13,0.12)"
      />
      <path
        d="M18 46l3-12 20-20 9 9-20 20-12 3z"
        stroke="#fc5d0d"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M37 17l9 9"
        stroke="#fc5d0d"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M18 46l5-2"
        stroke="#fc5d0d"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayIconLg() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect
        x="6"
        y="6"
        width="52"
        height="52"
        rx="12"
        fill="rgba(252,93,13,0.12)"
      />
      <circle
        cx="32"
        cy="32"
        r="18"
        stroke="#fc5d0d"
        strokeWidth="2.5"
        fill="none"
      />
      <path d="M28 24l13 8-13 8z" fill="#fc5d0d" />
    </svg>
  );
}

function RpaIconLg() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect
        x="6"
        y="6"
        width="52"
        height="52"
        rx="12"
        fill="rgba(252,93,13,0.12)"
      />
      <path
        d="M32 14v6"
        stroke="#fc5d0d"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="12" r="2" fill="#fc5d0d" />
      <rect
        x="18"
        y="22"
        width="28"
        height="22"
        rx="4"
        stroke="#fc5d0d"
        strokeWidth="2.5"
        fill="none"
      />
      <circle cx="26" cy="32" r="2.5" fill="#fc5d0d" />
      <circle cx="38" cy="32" r="2.5" fill="#fc5d0d" />
      <path
        d="M26 39h12"
        stroke="#fc5d0d"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M14 30v8M50 30v8"
        stroke="#fc5d0d"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M22 48v4M42 48v4"
        stroke="#fc5d0d"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GearIconLg() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect
        x="6"
        y="6"
        width="52"
        height="52"
        rx="12"
        fill="rgba(252,93,13,0.12)"
      />
      <g
        transform="translate(12,12) scale(1.667)"
        stroke="#fc5d0d"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <circle cx="12" cy="12" r="3" />
      </g>
    </svg>
  );
}

function BuildingIconLg() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect
        x="6"
        y="6"
        width="52"
        height="52"
        rx="12"
        fill="rgba(252,93,13,0.12)"
      />
      {/* Main building */}
      <rect
        x="16"
        y="20"
        width="32"
        height="30"
        rx="1.5"
        stroke="#fc5d0d"
        strokeWidth="2.5"
      />
      {/* Roof line */}
      <path
        d="M13 20h38"
        stroke="#fc5d0d"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Windows row 1 */}
      <rect x="21" y="26" width="5" height="5" rx="1" fill="#fc5d0d" />
      <rect x="30" y="26" width="5" height="5" rx="1" fill="#fc5d0d" />
      <rect x="39" y="26" width="5" height="5" rx="1" fill="#fc5d0d" />
      {/* Windows row 2 */}
      <rect x="21" y="35" width="5" height="5" rx="1" fill="#fc5d0d" />
      <rect x="39" y="35" width="5" height="5" rx="1" fill="#fc5d0d" />
      {/* Door */}
      <rect
        x="29"
        y="38"
        width="7"
        height="12"
        rx="1"
        stroke="#fc5d0d"
        strokeWidth="2"
      />
      {/* Ground */}
      <path
        d="M13 50h38"
        stroke="#fc5d0d"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ConnectorIconLg() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect
        x="6"
        y="6"
        width="52"
        height="52"
        rx="12"
        fill="rgba(252,93,13,0.12)"
      />
      <g transform="translate(12, 10) scale(0.08)">
        <path
          fillRule="evenodd"
          fill="#fc5d0d"
          d="M439.6,229.32c-18.39,0-34.08,11.71-40.05,27.99h-94.5c-6.44-23.89-28.34-41.46-54.22-41.46s-47.78,17.57-54.22,41.46h-94.39c-5.97-16.39-21.66-27.99-40.05-27.99-23.66,0-42.74,19.09-42.74,42.63s19.09,42.63,42.63,42.63c18.39,0,34.08-11.71,40.05-27.99h94.5c6.44,23.89,28.34,41.46,54.22,41.46s47.78-17.57,54.22-41.46h94.5c5.97,16.39,21.66,27.99,40.05,27.99,23.54,0,42.63-19.09,42.63-42.63s-19.09-42.63-42.63-42.63h0ZM250.83,301.22c-16.16,0-29.16-13.12-29.16-29.16s13.12-29.28,29.16-29.28,29.16,13.12,29.16,29.16c.12,16.16-13,29.28-29.16,29.28h0Z"
        />
      </g>
    </svg>
  );
}

function CheckIcon({ color = "#22a06b" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0, marginTop: 3 }}
    >
      <circle cx="8" cy="8" r="8" fill={color} opacity="0.15" />
      <path
        d="M5 8l2 2 4-4"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      style={{ marginLeft: 6, verticalAlign: "-1px" }}
    >
      <path
        d="M6 3H3v10h10v-3M9 3h4v4M14 2L7 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── OS tab component ─── */

function OSTabs({ activeOS, onSelect }) {
  return (
    <div className={styles.osTabs}>
      <button
        type="button"
        className={clsx(styles.osTab, activeOS === "mac" && styles.osTabActive)}
        onClick={() => onSelect("mac")}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
            fill="currentColor"
          />
        </svg>
        macOS
      </button>
      <button
        type="button"
        className={clsx(
          styles.osTab,
          activeOS === "windows" && styles.osTabActive
        )}
        onClick={() => onSelect("windows")}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 12V6.5l8-1.1V12H3zm0 .5h8v6.6l-8-1.1V12.5zM11.5 5.3l9.5-1.3v8.5h-9.5V5.3zm0 7.7h9.5v8.5l-9.5-1.3V13z"
            fill="currentColor"
          />
        </svg>
        Windows
      </button>
      <button
        type="button"
        className={clsx(
          styles.osTab,
          activeOS === "linux" && styles.osTabActive
        )}
        onClick={() => onSelect("linux")}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C9.24 2 7 4.24 7 7v4c0 .83-.67 1.5-1.5 1.5S4 11.83 4 11v-1H2v1c0 1.66 1.34 3 3 3h.17C5.06 14.67 5 15.33 5 16c0 2.76 2.24 5 5 5h4c2.76 0 5-2.24 5-5 0-.67-.06-1.33-.17-2H19c1.66 0 3-1.34 3-3v-1h-2v1c0 .83-.67 1.5-1.5 1.5S17 11.83 17 11V7c0-2.76-2.24-5-5-5zm-2 6a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z"
            fill="currentColor"
          />
        </svg>
        Linux
      </button>
    </div>
  );
}

/* ─── Download data ─── */

const GETTING_STARTED = {
  version: "8.10.0-alpha2",
  date: "Jun 9, 2026",
  links: {
    mac: [
      {
        label: "Apple Silicon",
        url: "https://github.com/camunda/camunda/releases/download/8.10.0-alpha2/camunda8-getting-started-bundle-8.10.0-alpha2-darwin-aarch64.zip",
      },
      {
        label: "Intel",
        url: "https://github.com/camunda/camunda/releases/download/8.10.0-alpha2/camunda8-getting-started-bundle-8.10.0-alpha2-darwin-x86_64.zip",
      },
    ],
    windows: [
      {
        label: "Windows (x64)",
        url: "https://github.com/camunda/camunda/releases/download/8.10.0-alpha2/camunda8-getting-started-bundle-8.10.0-alpha2-windows-x86_64.zip",
      },
    ],
    linux: [
      {
        label: "Linux (x64)",
        url: "https://github.com/camunda/camunda/releases/download/8.10.0-alpha2/camunda8-getting-started-bundle-8.10.0-alpha2-linux-x86_64.tar.gz",
      },
    ],
  },
};

const DESKTOP_MODELER = {
  version: "5.48.0",
  date: "Jun 5, 2026",
  nightlyLabel: "Nightly",
  links: {
    mac: {
      stable: [
        {
          label: "Apple Silicon (.dmg)",
          url: "https://downloads.camunda.cloud/release/camunda-modeler/5.48.0/camunda-modeler-5.48.0-mac-arm64.dmg",
        },
        {
          label: "Intel (.dmg)",
          url: "https://downloads.camunda.cloud/release/camunda-modeler/5.48.0/camunda-modeler-5.48.0-mac-x64.dmg",
        },
      ],
      experimental: [
        {
          label: "Nightly Apple Silicon",
          url: "https://downloads.camunda.cloud/release/camunda-modeler/nightly/camunda-modeler-nightly-mac-arm64.dmg",
        },
        {
          label: "Nightly Intel",
          url: "https://downloads.camunda.cloud/release/camunda-modeler/nightly/camunda-modeler-nightly-mac-x64.dmg",
        },
      ],
    },
    windows: {
      stable: [
        {
          label: "Windows (x64)",
          url: "https://downloads.camunda.cloud/release/camunda-modeler/5.48.0/camunda-modeler-5.48.0-win-x64.zip",
        },
      ],
      experimental: [
        {
          label: "Nightly Windows",
          url: "https://downloads.camunda.cloud/release/camunda-modeler/nightly/camunda-modeler-nightly-win-x64.zip",
        },
      ],
    },
    linux: {
      stable: [
        {
          label: "Linux (x64)",
          url: "https://downloads.camunda.cloud/release/camunda-modeler/5.48.0/camunda-modeler-5.48.0-linux-x64.tar.gz",
        },
      ],
      experimental: [
        {
          label: "Nightly Linux",
          url: "https://downloads.camunda.cloud/release/camunda-modeler/nightly/camunda-modeler-nightly-linux-x64.tar.gz",
        },
      ],
    },
  },
  docsLink: "/docs/components/modeler/desktop-modeler/",
  previousVersions: "https://downloads.camunda.cloud/release/camunda-modeler/",
};

const CAMUNDA_RUN = {
  version: "8.9.6",
  date: "Jun 9, 2026",
  alphaVersion: "8.10.0-alpha2",
  links: {
    mac: {
      stable: [
        {
          label: "Apple Silicon",
          url: "https://downloads.camunda.cloud/release/camunda/c8run/8.9.6/camunda8-run-8.9.6-darwin-aarch64.zip",
        },
        {
          label: "Intel",
          url: "https://downloads.camunda.cloud/release/camunda/c8run/8.9.6/camunda8-run-8.9.6-darwin-x86_64.zip",
        },
      ],
      experimental: [
        {
          label: "Alpha Apple Silicon",
          url: "https://downloads.camunda.cloud/release/camunda/c8run/8.10.0-alpha2/camunda8-run-8.10.0-alpha2-darwin-aarch64.zip",
        },
        {
          label: "Alpha Intel",
          url: "https://downloads.camunda.cloud/release/camunda/c8run/8.10.0-alpha2/camunda8-run-8.10.0-alpha2-darwin-x86_64.zip",
        },
      ],
    },
    windows: {
      stable: [
        {
          label: "Windows (x64)",
          url: "https://downloads.camunda.cloud/release/camunda/c8run/8.9.6/camunda8-run-8.9.6-windows-x86_64.zip",
        },
      ],
      experimental: [
        {
          label: "Alpha Windows",
          url: "https://downloads.camunda.cloud/release/camunda/c8run/8.10.0-alpha2/camunda8-run-8.10.0-alpha2-windows-x86_64.zip",
        },
      ],
    },
    linux: {
      stable: [
        {
          label: "Linux (x64)",
          url: "https://downloads.camunda.cloud/release/camunda/c8run/8.9.6/camunda8-run-8.9.6-linux-x86_64.tar.gz",
        },
      ],
      experimental: [
        {
          label: "Alpha Linux",
          url: "https://downloads.camunda.cloud/release/camunda/c8run/8.10.0-alpha2/camunda8-run-8.10.0-alpha2-linux-x86_64.tar.gz",
        },
      ],
    },
  },
  docsLink:
    "/docs/self-managed/quickstart/developer-quickstart/c8run/install-start/",
  previousVersions: "https://downloads.camunda.cloud/release/camunda/c8run/",
};

const RPA_WORKER = {
  version: "1.3.2",
  date: "Apr 23, 2026",
  alphaVersion: "1.3.0-alpha.3",
  links: {
    mac: {
      stable: [
        {
          label: "Apple Silicon",
          url: "https://downloads.camunda.cloud/release/rpa-worker/1.3.2/rpa-worker_1.3.2_darwin_aarch64.zip",
        },
        {
          label: "Intel",
          url: "https://downloads.camunda.cloud/release/rpa-worker/1.3.2/rpa-worker_1.3.2_darwin_amd64.zip",
        },
      ],
      experimental: [
        {
          label: "Alpha Apple Silicon",
          url: "https://downloads.camunda.cloud/release/rpa-worker/1.3.0-alpha.3/rpa-worker_1.3.0-alpha.3_darwin_aarch64.zip",
        },
        {
          label: "Alpha Intel",
          url: "https://downloads.camunda.cloud/release/rpa-worker/1.3.0-alpha.3/rpa-worker_1.3.0-alpha.3_darwin_x86_64.zip",
        },
      ],
    },
    windows: {
      stable: [
        {
          label: "Windows (x64)",
          url: "https://downloads.camunda.cloud/release/rpa-worker/1.3.2/rpa-worker_1.3.2_win32_amd64.zip",
        },
      ],
      experimental: [
        {
          label: "Alpha Windows",
          url: "https://downloads.camunda.cloud/release/rpa-worker/1.3.0-alpha.3/rpa-worker_1.3.0-alpha.3_windows_x86_64.zip",
        },
      ],
    },
    linux: {
      stable: [
        {
          label: "Linux (x64)",
          url: "https://downloads.camunda.cloud/release/rpa-worker/1.3.2/rpa-worker_1.3.2_linux_amd64.zip",
        },
      ],
      experimental: [
        {
          label: "Alpha Linux",
          url: "https://downloads.camunda.cloud/release/rpa-worker/1.3.0-alpha.3/rpa-worker_1.3.0-alpha.3_linux_x86_64.zip",
        },
      ],
    },
  },
  docsLink: "/docs/components/rpa/getting-started/",
  previousVersions: "https://downloads.camunda.cloud/release/rpa-worker/",
};

const ADDITIONAL_RELEASES = [
  {
    title: "Camunda Orchestration Cluster",
    description:
      "Download self-managed orchestration runtime artifacts and view all release notes.",
    version: "8.9.8",
    date: "Jun 10, 2026",
    primaryLink: {
      label: "View latest release on GitHub",
      url: "https://github.com/camunda/camunda/releases/latest",
    },
    previousVersions: "https://github.com/camunda/camunda/releases",
    icon: <GearIconLg />,
  },
  {
    title: "Connectors",
    description:
      "Get prebuilt connector artifacts and review release history for connector updates.",
    version: "8.10.0-alpha2",
    date: "Jun 2, 2026",
    primaryLink: {
      label: "View latest release on GitHub",
      url: "https://github.com/camunda/connectors/releases/latest",
    },
    previousVersions: "https://github.com/camunda/connectors/releases",
    icon: <ConnectorIconLg />,
  },
  {
    title: "Enterprise download center",
    description:
      "Enterprise-only downloads for Camunda 7 and Camunda 8 Web Modeler artifacts.",
    primaryLink: {
      label: "Browse enterprise downloads",
      url: "https://downloads.camunda.cloud/enterprise-release/",
    },
    icon: <BuildingIconLg />,
    loginRequired: true,
  },
];

/* ─── CLI snippet (matches build-with-camunda terminal style) ─── */

function BundleButtons({ activeOS }) {
  const links = GETTING_STARTED.links[activeOS] || [];
  return (
    <div className={styles.downloadCardButtons}>
      {links.map((link) => (
        <a key={link.url} href={link.url} className={bwcStyles.downloadButton}>
          <DownloadBtnIcon /> {link.label}
        </a>
      ))}
    </div>
  );
}

/* ─── Getting Started card: version, date, and bundle download ─── */

function GettingStartedCard({ activeOS }) {
  return (
    <div className={clsx(styles.downloadCard, styles.downloadCardFeatured)}>
      <span className={bwcStyles.recommendedBadge}>
        Recommended for new users
      </span>
      <div className={styles.downloadCardIcon}>
        <SparklesIconLg />
      </div>
      <h3 className={bwcStyles.downloadBlockTitle}>Getting Started Package</h3>
      <p className={styles.downloadCardDesc}>
        Prebuilt bundle with Desktop Modeler, the Camunda 8 runtime, and example
        processes for local development.
      </p>
      <div className={styles.downloadCardMeta}>
        <span className={styles.downloadCardVersion}>
          v{GETTING_STARTED.version}
        </span>
        <span className={styles.downloadCardDate}>{GETTING_STARTED.date}</span>
      </div>

      <BundleButtons activeOS={activeOS} />

      <p className={styles.downloadCardNote}>
        Unzip the bundle and start Camunda 8 Run from the extracted folder with{" "}
        <code>camunda-start.sh</code> (macOS/Linux) or
        <code>camunda-start.bat</code> (Windows).
      </p>

      <div className={styles.downloadCardFooter}>
        <Link
          to={useBaseUrl(
            "/docs/guides/getting-started-hello-world#step-2-deploy-and-run-your-model"
          )}
          className={styles.downloadCardFooterLink}
        >
          Setup guide
        </Link>
      </div>
    </div>
  );
}

/* ─── Download card component ─── */

function DownloadCard({
  icon,
  title,
  description,
  version,
  date,
  links,
  primaryLink,
  docsLink,
  previousVersions,
  activeOS,
  badge,
  loginRequired,
}) {
  const [showExperimental, setShowExperimental] = useState(false);
  const osLinks = (links && links[activeOS]) || {};
  // Support both flat array (Getting Started) and { stable, experimental } shape
  const isFlat = Array.isArray(osLinks);
  const stableLinks = isFlat ? osLinks : osLinks.stable || [];
  const experimentalLinks = isFlat ? [] : osLinks.experimental || [];

  return (
    <div
      className={clsx(
        styles.downloadCard,
        badge && styles.downloadCardFeatured
      )}
    >
      {badge && <span className={bwcStyles.recommendedBadge}>{badge}</span>}
      <div className={styles.downloadCardIcon}>{icon}</div>
      <h3 className={bwcStyles.downloadBlockTitle}>{title}</h3>
      <p className={styles.downloadCardDesc}>{description}</p>
      {loginRequired && (
        <span className={styles.loginBadge}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Requires login
        </span>
      )}
      {version && (
        <div className={styles.downloadCardMeta}>
          <span className={styles.downloadCardVersion}>v{version}</span>
          {date && <span className={styles.downloadCardDate}>{date}</span>}
        </div>
      )}

      {primaryLink ? (
        <div className={styles.downloadCardLinks}>
          <a
            href={primaryLink.url}
            className={styles.downloadCardFooterLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {primaryLink.label} <ExternalLinkIcon />
          </a>
        </div>
      ) : (
        <div className={styles.downloadCardLinks}>
          <span className={styles.downloadCardLabel}>Stable</span>
          <div className={styles.downloadCardButtons}>
            {stableLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className={bwcStyles.downloadButton}
              >
                <DownloadBtnIcon /> {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {experimentalLinks.length > 0 && (
        <div className={styles.downloadCardLinks}>
          <button
            type="button"
            className={styles.experimentalToggle}
            onClick={() => setShowExperimental(!showExperimental)}
          >
            <span className={styles.experimentalToggleIcon}>
              {showExperimental ? "▾" : "▸"}
            </span>
            Experimental
          </button>
          {showExperimental && (
            <div className={styles.downloadCardButtons}>
              {experimentalLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  className={clsx(
                    bwcStyles.downloadButton,
                    styles.dlButtonExperimental
                  )}
                >
                  <DownloadBtnIcon /> {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {(docsLink || previousVersions) && (
        <div className={styles.downloadCardFooter}>
          {docsLink && (
            <Link
              to={useBaseUrl(docsLink)}
              className={styles.downloadCardFooterLink}
            >
              Setup guide
            </Link>
          )}
          {previousVersions && (
            <a
              href={previousVersions}
              className={styles.downloadCardFooterLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Previous versions <ExternalLinkIcon />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Main page ─── */

function Downloads() {
  const [activeOS, setActiveOS] = useState("mac");
  const [detectedOS, setDetectedOS] = useState(null);

  useEffect(() => {
    const os = detectOS();
    setActiveOS(os);
    setDetectedOS(os);
  }, []);

  return (
    <Layout
      title="Downloads"
      description="Download Camunda 8 components for local development. Get Desktop Modeler, Camunda 8 Run, RPA Worker, and the Getting Started bundle."
    >
      <div className={bwcStyles.page}>
        {/* ─── Hero ─── */}
        <div className={bwcStyles.heroWrapper}>
          <div className={bwcStyles.heroGlow} />
          <svg
            className={styles.heroBgIcon}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <section
            className={clsx(
              "container",
              bwcStyles.terminalHeroSection,
              styles.heroSectionTight
            )}
          >
            <div
              className={clsx(
                bwcStyles.terminalHeroIntro,
                styles.heroIntroTight
              )}
            >
              <h1 className={bwcStyles.terminalHeroTitle}>Camunda Downloads</h1>
              <p className={bwcStyles.terminalHeroSub}>
                Download everything you need for local Camunda 8 development.
              </p>
            </div>
          </section>
        </div>

        {/* ─── Downloads ─── */}
        <section
          className={clsx(
            "container",
            bwcStyles.section,
            styles.downloadsSection
          )}
        >
          <OSTabs
            activeOS={activeOS}
            onSelect={(os) => {
              setActiveOS(os);
              setDetectedOS(null);
            }}
          />
          {detectedOS && (
            <p className={styles.osDetectedLabel}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{ marginRight: 4, verticalAlign: "-1px" }}
              >
                <circle
                  cx="6"
                  cy="6"
                  r="5.5"
                  stroke="currentColor"
                  strokeOpacity="0.5"
                />
                <path
                  d="M4 6l1.5 1.5L8 4.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Detected:{" "}
              {{ mac: "macOS", windows: "Windows", linux: "Linux" }[detectedOS]}
            </p>
          )}

          <div
            className={clsx(bwcStyles.downloadsGrid, styles.downloadsGridTwo)}
          >
            <GettingStartedCard activeOS={activeOS} />
            <DownloadCard
              icon={<PencilIconLg />}
              title="Desktop Modeler"
              description="Design BPMN processes, DMN decision tables, and forms locally. Drag, drop, and design alongside your IDE."
              version={DESKTOP_MODELER.version}
              date={DESKTOP_MODELER.date}
              links={DESKTOP_MODELER.links}
              docsLink={DESKTOP_MODELER.docsLink}
              previousVersions={DESKTOP_MODELER.previousVersions}
              activeOS={activeOS}
            />
            <DownloadCard
              icon={<PlayIconLg />}
              title="Camunda 8 Run"
              description="Lightweight all-in-one Camunda distribution for effortless local development. Use alongside Desktop Modeler."
              version={CAMUNDA_RUN.version}
              date={CAMUNDA_RUN.date}
              links={CAMUNDA_RUN.links}
              docsLink={CAMUNDA_RUN.docsLink}
              previousVersions={CAMUNDA_RUN.previousVersions}
              activeOS={activeOS}
            />
            <DownloadCard
              icon={<RpaIconLg />}
              title="RPA Worker"
              description="Run robotic process automation tasks alongside your BPMN workflows. Automate desktop applications and legacy systems."
              version={RPA_WORKER.version}
              date={RPA_WORKER.date}
              links={RPA_WORKER.links}
              docsLink={RPA_WORKER.docsLink}
              previousVersions={RPA_WORKER.previousVersions}
              activeOS={activeOS}
            />
          </div>

          <div className={styles.additionalReleasesSection}>
            <h2 className={styles.additionalReleasesTitle}>
              Additional downloads
            </h2>
            <p className={styles.additionalReleasesSub}>
              Get the latest Orchestration Cluster and connector releases, and
              browse enterprise downloads.
            </p>
            <div
              className={clsx(
                bwcStyles.downloadsGrid,
                styles.downloadsGridFull
              )}
            >
              {ADDITIONAL_RELEASES.map((resource) => (
                <DownloadCard
                  key={resource.title}
                  icon={resource.icon}
                  title={resource.title}
                  description={resource.description}
                  version={resource.version}
                  date={resource.date}
                  links={resource.links}
                  primaryLink={resource.primaryLink}
                  previousVersions={resource.previousVersions}
                  loginRequired={resource.loginRequired}
                  activeOS={activeOS}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Alternative install methods ─── */}
        <section
          className={clsx(
            bwcStyles.moreSection,
            bwcStyles.darkSection,
            bwcStyles.noTopBorder
          )}
        >
          <div className="container">
            <div className={bwcStyles.sectionHeader}>
              <h2 className={bwcStyles.sectionTitle}>
                More ways to run your own Camunda
              </h2>
              <p className={bwcStyles.sectionSub}>
                Choose the setup that fits your workflow and infrastructure.
              </p>
            </div>
            <div className={clsx(bwcStyles.waysGrid, styles.waysGridWide)}>
              <Link
                to={useBaseUrl("/build-with-camunda#self-managed")}
                className={bwcStyles.wayCard}
              >
                <span className={styles.cliIconWrap}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="2"
                      y="4"
                      width="20"
                      height="16"
                      rx="2"
                      stroke="#fc5d0d"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 8l4 4-4 4"
                      stroke="#fc5d0d"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16h6"
                      stroke="#fc5d0d"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <h3>Camunda CLI</h3>
                <p>
                  Install with <code>npm install -g @camunda8/cli</code> and
                  manage everything from your terminal.
                </p>
              </Link>
              <Link
                to={useBaseUrl(
                  "docs/self-managed/quickstart/developer-quickstart/docker-compose/"
                )}
                className={bwcStyles.wayCard}
              >
                <DockerSvgIcon width="72" height="72" />
                <h3>Docker Compose</h3>
                <p>
                  Run the full Camunda stack locally with a single{" "}
                  <code>docker compose up</code>.
                </p>
              </Link>
              <Link
                to={useBaseUrl(
                  "docs/self-managed/deployment/helm/install/quick-install/"
                )}
                className={bwcStyles.wayCard}
              >
                <K8sSvgIcon width="72" height="72" />
                <h3>Kubernetes</h3>
                <p>
                  Deploy to any Kubernetes cluster with the official Camunda
                  Helm chart.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Start building CTA ─── */}
        <section
          className={clsx(
            bwcStyles.moreSection,
            bwcStyles.darkSection,
            bwcStyles.exploreSectionLast,
            bwcStyles.noTopBorder,
            styles.lastSectionSpaced
          )}
          style={{ paddingTop: "2rem", paddingBottom: "8rem" }}
        >
          <div className="container">
            <div className={bwcStyles.sectionHeader}>
              <h2 className={bwcStyles.sectionTitle}>
                Start building with Camunda
              </h2>
              <p className={bwcStyles.sectionSub}>
                Get started with a running workflow in minutes.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link
                to={useBaseUrl("/build-with-camunda")}
                className={bwcStyles.heroCardCtaAlt}
              >
                Start building <ExternalLinkIcon />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Downloads;
