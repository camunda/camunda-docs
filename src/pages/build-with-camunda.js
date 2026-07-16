import React, { useState } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./build-with-camunda.module.css";
import K8sSvgIcon from "../components/CamundaSelfManaged/icons/kubernetes.svg";
import DockerSvgIcon from "../components/CamundaSelfManaged/icons/docker.svg";
import AwsSvgIcon from "../components/CamundaSelfManaged/icons/aws.svg";
import GcpSvgIcon from "../components/CamundaSelfManaged/icons/gcp.svg";
import IconAgenticImg from "../../docs/components/assets/icon-agentic.png";

/* ─── Icon components ─── */

function CloudIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M19.35 10.04A7.49 7.49 0 0012 4a7.48 7.48 0 00-6.93 4.6A6 6 0 006 20h13a5 5 0 00.35-9.96z"
        fill="#78a9ff"
      />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2"
        stroke="#fc5d0d"
        strokeWidth="2"
      />
      <path
        d="M6 8l4 4-4 4"
        stroke="#fc5d0d"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16h6"
        stroke="#fc5d0d"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon({ color = "#78a9ff" }) {
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

function DownloadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
        stroke="#fc5d0d"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function KubernetesIcon() {
  return <K8sSvgIcon width="72" height="72" />;
}

function DockerIcon() {
  return <DockerSvgIcon width="72" height="72" />;
}

function AWSIcon() {
  return <AwsSvgIcon width="72" height="72" />;
}

function GCPIcon() {
  return <GcpSvgIcon width="72" height="72" />;
}

function HelmIcon() {
  return <K8sSvgIcon width="72" height="72" />;
}

/* ─── Architecture card icons ─── */

function ModelerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 501.65 607.67" fill="none">
      <circle
        cx="69.06"
        cy="266.75"
        r="41.09"
        fill="#78a9ff"
        stroke="#78a9ff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
      <circle
        cx="432.59"
        cy="266.75"
        r="41.09"
        fill="#78a9ff"
        stroke="#78a9ff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
      <rect
        x="141.48"
        y="225.66"
        width="82.19"
        height="82.19"
        fill="#78a9ff"
        stroke="#78a9ff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
      <rect
        x="265.88"
        y="225.66"
        width="82.19"
        height="82.19"
        transform="translate(-98.71 295.2) rotate(-45)"
        fill="#78a9ff"
        stroke="#78a9ff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
    </svg>
  );
}

function ConsoleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 501.65 607.67" fill="none">
      <path
        d="M391.36,309.93l42.33.14v-76.39l-41.88-.09c-3.23-11.96-7.91-23.38-14.02-34.14l29.54-29.2-53.99-54.26-29.58,29.2c-5.43-3.13-11-5.91-16.63-8.27-5.68-2.36-11.59-4.4-17.65-6.05l.12-35.2.02-6.01h-77.19l.02,3.33.21,37.49c-12,3.2-23.49,7.84-34.31,13.93l-28.61-28.7-54.58,53.69,28.63,28.73c-3.14,5.37-5.91,10.9-8.29,16.52-2.36,5.55-4.39,11.4-6.07,17.44l-38.86-.21h-2.61s0,76.31,0,76.31l5.52.03,35.49.22c3.2,12.01,7.91,23.45,14.02,34.21l-30.2,29.72,54.03,54.24,30.18-29.72c5.5,3.17,11.09,5.94,16.7,8.29,5.77,2.4,11.66,4.42,17.61,6.05v43.14l76.73-.05.02-42.68c12.09-3.2,23.61-7.88,34.45-14l30.18,30.02,54.6-53.6-30.27-30.15c3.09-5.3,5.86-10.83,8.25-16.49,2.39-5.64,4.43-11.49,6.09-17.47h0ZM250.82,373.08c-55.83,0-101.08-45.26-101.08-101.08s45.26-101.08,101.08-101.08,101.08,45.26,101.08,101.08-45.26,101.08-101.08,101.08h0Z"
        fill="#78a9ff"
        stroke="#78a9ff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
    </svg>
  );
}

function ZeebeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        stroke="#78a9ff"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="rgba(120,169,255,0.15)"
      />
    </svg>
  );
}

function OperateIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="#78a9ff" strokeWidth="1.5" />
      <path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        stroke="#78a9ff"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function OptimizeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 501.65 607.67" fill="none">
      <polygon
        points="472.37 88.6 309.05 101.77 340.68 147.76 266.25 203.84 255.71 212.4 256.37 222.94 270.39 391.09 179.98 380.99 177.35 380.99 175.37 381.64 40.38 455.4 178.38 396.35 282.06 417.86 296.54 421.16 296.54 404.69 300.22 234.18 370.54 191.16 401.91 236.77 472.37 88.6"
        fill="#78a9ff"
        stroke="#78a9ff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
    </svg>
  );
}

function TasklistIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="#78a9ff"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M7 8l2 2 4-4"
        stroke="#78a9ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 15h10"
        stroke="#78a9ff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 18h6"
        stroke="#78a9ff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ConnectorsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 501.65 607.67" fill="none">
      <path
        d="M439.6,229.32c-18.39,0-34.08,11.71-40.05,27.99h-94.5c-6.44-23.89-28.34-41.46-54.22-41.46s-47.78,17.57-54.22,41.46h-94.39c-5.97-16.39-21.66-27.99-40.05-27.99-23.66,0-42.74,19.09-42.74,42.63s19.09,42.63,42.63,42.63c18.39,0,34.08-11.71,40.05-27.99h94.5c6.44,23.89,28.34,41.46,54.22,41.46s47.78-17.57,54.22-41.46h94.5c5.97,16.39,21.66,27.99,40.05,27.99,23.54,0,42.63-19.09,42.63-42.63s-19.09-42.63-42.63-42.63h0ZM250.83,301.22c-16.16,0-29.16-13.12-29.16-29.16s13.12-29.28,29.16-29.28,29.16,13.12,29.16,29.16c.12,16.16-13,29.28-29.16,29.28h0Z"
        fill="#78a9ff"
        strokeWidth="0"
      />
    </svg>
  );
}

function AdminIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 501.65 607.67" fill="none">
      <path
        d="M244.8,248.04c30.21,0,54.68-24.58,54.68-54.68s-24.58-54.68-54.68-54.68-54.68,24.58-54.68,54.68,24.46,54.68,54.68,54.68h0Z"
        fill="#78a9ff"
        stroke="#78a9ff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
      <polygon
        points="310.64 455.7 178.96 455.7 178.96 297.3 195.53 274.76 294.07 274.76 310.64 297.3 310.64 455.7"
        fill="#78a9ff"
        stroke="#78a9ff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
      <path
        d="M301.28,134.06c7.1-21.87,27.73-37.77,51.97-37.77,30.21,0,54.68,24.58,54.68,54.68s-24.58,54.68-54.68,54.68c-9.7,0-18.71-2.59-26.72-6.99.11-1.8.23-3.49.23-5.3,0-23.34-9.81-44.42-25.48-59.3h0Z"
        fill="#78a9ff"
        stroke="#78a9ff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
      <path
        d="M81.67,150.97c0-30.21,24.58-54.68,54.68-54.68,24.24,0,44.87,15.9,51.97,37.77-15.67,14.99-25.48,35.96-25.48,59.3,0,1.8.11,3.61.23,5.3-7.89,4.4-17.02,6.99-26.72,6.99-30.1,0-54.68-24.58-54.68-54.68Z"
        fill="#78a9ff"
        stroke="#78a9ff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
      <path
        d="M419.09,254.92v158.39h-81.17v-124.91l-29.99-40.92h-1.58c4.06-4.62,7.55-9.7,10.6-15.11h85.68l16.46,22.55h0Z"
        fill="#78a9ff"
        stroke="#78a9ff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
      <path
        d="M151.68,413.31h-81.17v-158.39l16.57-22.55h85.68c2.93,5.41,6.54,10.48,10.6,15.11h-1.69l-29.99,40.92v124.91h0Z"
        fill="#78a9ff"
        stroke="#78a9ff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
    </svg>
  );
}

function ClientsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="3"
        width="20"
        height="14"
        rx="2"
        stroke="#78a9ff"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M8 21h8M12 17v4"
        stroke="#78a9ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SDKsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M16 18l6-6-6-6M8 6l-6 6 6 6"
        stroke="#78a9ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ marginLeft: 6 }}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ marginLeft: 6 }}
    >
      <path
        d="M8 3v10M4 9l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Reusable components ─── */

function VersionBadge({ version = "Camunda 8.9+" }) {
  return <span className={styles.versionBadge}>{version}</span>;
}

function CodeBlock({ children }) {
  return <code className={styles.inlineCode}>{children}</code>;
}

function TerminalWindow({ title, children, copyable = true }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = typeof children === "string" ? children : String(children);
    const stripped = text
      .split("\n")
      .map((line) => line.replace(/^\$\s?/, ""))
      .filter((line) => !line.startsWith("#") && !line.startsWith("✓"))
      .join("\n")
      .trim();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(stripped).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  };

  return (
    <div className={styles.terminalWindow}>
      <div className={styles.terminalHeader}>
        <span
          className={styles.terminalDot}
          style={{ background: "#ff5f57" }}
        />
        <span
          className={styles.terminalDot}
          style={{ background: "#febc2e" }}
        />
        <span
          className={styles.terminalDot}
          style={{ background: "#28c840" }}
        />
        {title && <span className={styles.terminalTitle}>{title}</span>}
      </div>
      <div className={styles.terminalBody}>
        {copyable && (
          <button
            type="button"
            aria-label={copied ? "Copied" : "Copy code to clipboard"}
            title={copied ? "Copied" : "Copy"}
            className={clsx(
              styles.copyButton,
              copied && styles.copyButtonCopied
            )}
            onClick={handleCopy}
          >
            <span className={styles.copyButtonIcons} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                className={styles.copyIcon}
                width="16"
                height="16"
              >
                <path
                  fill="currentColor"
                  d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
                />
              </svg>
              <svg
                viewBox="0 0 24 24"
                className={styles.successIcon}
                width="16"
                height="16"
              >
                <path
                  fill="currentColor"
                  d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                />
              </svg>
            </span>
          </button>
        )}
        <pre className={styles.terminalPre}>{children}</pre>
      </div>
    </div>
  );
}

/* ─── Main page ─── */

function BuildWithCamunda() {
  return (
    <Layout
      title="Build with Camunda"
      description="Process orchestration for users. Go from zero to a running workflow in minutes."
    >
      <div className={styles.page}>
        {/* ─── Hero: Start from your terminal ─── */}
        <div className={styles.heroWrapper}>
          <div className={styles.heroGlow} />

          <section
            className={clsx("container", styles.terminalHeroSection)}
            id="get-started"
            style={{ scrollMarginTop: "5rem" }}
          >
            <div className={styles.terminalHeroIntro}>
              <h1 className={styles.terminalHeroTitle}>
                Start building with Camunda
              </h1>
              <p className={styles.terminalHeroSub}>
                Get started with a running workflow in minutes.
              </p>
            </div>

            {/* ─── Hero: 2-card choice ─── */}
            <div className={styles.heroLayoutTwo}>
              {/* Self-Managed (left, priority) */}
              <Link
                className={clsx(styles.heroCard, styles.heroCardPriority)}
                to="#self-managed"
              >
                <span className={styles.recommendedBadge}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ marginRight: 4 }}
                  >
                    <path
                      d="M12 2.5l1.7 4.8 4.8 1.7-4.8 1.7-1.7 4.8-1.7-4.8-4.8-1.7 4.8-1.7L12 2.5z"
                      fill="currentColor"
                    />
                    <path
                      d="M19 13l.9 2.6L22.5 16.5l-2.6.9L19 20l-.9-2.6-2.6-.9 2.6-.9L19 13z"
                      fill="currentColor"
                    />
                    <path
                      d="M5.5 15l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7z"
                      fill="currentColor"
                    />
                  </svg>
                  Recommended for AI builders
                </span>
                <span className={clsx(styles.cardTag, styles.cardTagLocal)}>
                  Self-Managed
                </span>
                <span className={styles.heroCardIcon}>
                  <TerminalIcon />
                </span>
                <h2 className={styles.heroCardTitle}>Run Camunda locally</h2>
                <p className={styles.heroCardMeta}>
                  Camunda 8.9+ · macOS, Linux, Windows
                </p>
                <p className={styles.heroCardDesc}>
                  Install and start Camunda locally, deploy your first process,
                  and see it running. All from your terminal.
                </p>
                <ul className={styles.heroCardChecks}>
                  <li>
                    <CheckIcon color="#22a06b" /> One command to install Camunda
                  </li>
                  <li>
                    <CheckIcon color="#22a06b" /> AI agent skills built in
                  </li>
                  <li>
                    <CheckIcon color="#22a06b" /> Data stays on your machine
                  </li>
                </ul>
                <span className={styles.heroCardCta}>
                  Start building <ArrowDown />
                </span>
              </Link>

              {/* SaaS (right) */}
              <Link
                className={clsx(styles.heroCard, styles.heroCardSaas)}
                to="https://accounts.cloud.camunda.io/signup?utm_source=camunda_docs&utm_medium=cta&utm_campaign=cli_landing_page"
              >
                <span className={clsx(styles.cardTag, styles.cardTagCloud)}>
                  Cloud
                </span>
                <span className={styles.heroCardIcon}>
                  <CloudIcon />
                </span>
                <h2 className={styles.heroCardTitle}>Free SaaS trial</h2>
                <p className={styles.heroCardMeta}>Fully managed cloud</p>
                <p className={styles.heroCardDesc}>
                  Get your own fully managed Camunda cluster. No install, sign
                  up and start modeling today.
                </p>
                <ul className={styles.heroCardChecks}>
                  <li>
                    <CheckIcon color="#22a06b" /> Zero setup
                  </li>
                  <li>
                    <CheckIcon color="#22a06b" /> Web Modeler included
                  </li>
                  <li>
                    <CheckIcon color="#22a06b" /> AI agent skills built in
                  </li>
                  <li>
                    <CheckIcon color="#22a06b" /> Free LLM tokens to run your
                    first agent!
                  </li>
                </ul>
                <span className={styles.heroCardCtaAlt}>
                  Create free account <ArrowRight />
                </span>
              </Link>
            </div>
          </section>
        </div>

        {/* ─── Self-Managed: tabbed install ─── */}
        <section
          className={clsx(
            "container",
            styles.section,
            styles.cliInstallSection
          )}
          id="self-managed"
          style={{ scrollMarginTop: "5rem" }}
        >
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Run Camunda locally <VersionBadge />
            </h2>
            <p className={styles.sectionSub}>
              Install the Camunda CLI via npm and start a local Camunda
              environment.
            </p>
          </div>

          {/* ─── Primary: CLI install ─── */}
          <div className={styles.cliInstallBlock}>
            <p className={styles.quickStartLabel}>
              <span className={styles.stepNumber}>1</span> Install the Camunda
              CLI
              <span
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              ></span>
            </p>
            <TerminalWindow copyable>
              {`$ npm install -g @camunda8/cli`}
            </TerminalWindow>

            <p className={styles.quickStartLabel}>
              <span className={styles.stepNumber}>2</span> Start Camunda 8 Run
              <span
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              ></span>
            </p>
            <TerminalWindow copyable>
              {`$ c8ctl cluster start 8.10.0-alpha3`}
            </TerminalWindow>

            <p className={clsx(styles.cliInfoNote, styles.cliInfoNoteCentered)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M8 7v4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="8" cy="4.75" r="0.85" fill="currentColor" />
              </svg>
              <span>
                <Link
                  to="https://www.npmjs.com/package/@camunda8/cli"
                  style={{ fontWeight: 400, fontSize: "0.85rem" }}
                >
                  Install via npm
                </Link>{" "}
                requires Node.js 18+.
              </span>
            </p>
          </div>

          {/* ─── Fallback: Download bundle ─── */}
          <details className={styles.bundleFallback}>
            <summary className={styles.bundleFallbackSummary}>
              <span>
                No Node.js or npm? Download and run the getting started bundle
                instead
              </span>
            </summary>
            <div className={styles.bundleFallbackContent}>
              <ol className={styles.bundleFallbackDesc}>
                <li>
                  Download, extract, and run the getting started bundle for a
                  Camunda 8 Run environment.
                </li>
                <li>
                  Follow the instructions in{" "}
                  <Link
                    to={useBaseUrl(
                      "/docs/guides/getting-started-hello-world#step-2-deploy-and-run-your-model"
                    )}
                  >
                    run your first BPMN process
                  </Link>{" "}
                  to deploy and run your model.
                </li>
              </ol>
              <div className={styles.downloadButtons}>
                <a
                  className={styles.downloadButton}
                  href="https://github.com/camunda/camunda/releases/download/8.10.0-alpha2/camunda8-getting-started-bundle-8.10.0-alpha2-darwin-aarch64.zip"
                >
                  <DownloadBtnIcon /> macOS (Apple Silicon)
                </a>
                <a
                  className={styles.downloadButton}
                  href="https://github.com/camunda/camunda/releases/download/8.10.0-alpha2/camunda8-getting-started-bundle-8.10.0-alpha2-darwin-x86_64.zip"
                >
                  <DownloadBtnIcon /> macOS (Intel)
                </a>
                <a
                  className={styles.downloadButton}
                  href="https://github.com/camunda/camunda/releases/download/8.10.0-alpha2/camunda8-getting-started-bundle-8.10.0-alpha2-windows-x86_64.zip"
                >
                  <DownloadBtnIcon /> Windows
                </a>
                <a
                  className={styles.downloadButton}
                  href="https://github.com/camunda/camunda/releases/download/8.10.0-alpha2/camunda8-getting-started-bundle-8.10.0-alpha2-linux-x86_64.tar.gz"
                >
                  <DownloadBtnIcon /> Linux
                </a>
              </div>
              <TerminalWindow copyable>
                {`# macOS / Linux
$ unzip camunda8-getting-started-bundle-*.zip
$ cd camunda8-getting-started-bundle-*
$ ./camunda-start.sh

# Windows
# Extract the .zip and run camunda-start.bat`}
              </TerminalWindow>
              <p
                className={styles.cliInfoNote}
                style={{
                  textAlign: "left",
                  justifyContent: "flex-start",
                  marginTop: "1.5rem",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M8 7v4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="8" cy="4.75" r="0.85" fill="currentColor" />
                </svg>
                <span>
                  Camunda 8 Run requires OpenJDK 21–25. Node.js/npm not required
                  for getting started bundle.
                </span>
              </p>
            </div>
          </details>

          {/* ─── Deploy your first process ─── */}
          <div className={styles.pillSeparator}>
            <span className={styles.sectionPill}>
              Deploy your first process
            </span>
          </div>

          <div className={styles.cliInstallBlock}>
            <p className={styles.quickStartLabel}>
              <span className={styles.stepNumber}>3</span> Deploy and run the
              example process
            </p>
            <TerminalWindow copyable>
              {`$ git clone https://github.com/camunda/camunda-8-get-started.git
$ cd camunda-8-get-started/1-rocket-launch/
$ c8ctl deploy .
$ c8ctl run rocket-launch.bpmn --variables='{"fuelLevel":90}'`}
            </TerminalWindow>

            <p className={styles.quickStartLabel}>
              <span className={styles.stepNumber}>4</span> See the process
              running in Operate
            </p>
            <TerminalWindow copyable={false}>
              {`# Open Operate at http://localhost:8080/operate
# Log in with demo / demo
# Find the Rocket Launch process and click your running instance`}
            </TerminalWindow>

            <p className={clsx(styles.cliInfoNote, styles.cliInfoNoteCentered)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M8 7v4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="8" cy="4.75" r="0.85" fill="currentColor" />
              </svg>
              <span>
                Your process instance appears once data has synced to Operate.
                See{" "}
                <Link
                  to={useBaseUrl(
                    "/docs/guides/getting-started-hello-world#step-3-explore-your-process-in-operate"
                  )}
                >
                  explore your process in Operate
                </Link>
                .
              </span>
            </p>
          </div>

          <div className={styles.pillSeparator}>
            <span className={styles.sectionPill}>How to use the CLI</span>
          </div>

          {/* Everything from your terminal (moved into CLI section) */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Manage Camunda from your terminal
            </h2>
            <p className={styles.sectionSub}>
              Use the CLI for the full Camunda lifecycle. No browser required.
            </p>
          </div>
          <div className={styles.commandGrid}>
            <div className={styles.commandCard}>
              <h4>Manage your clusters</h4>
              <TerminalWindow title="Terminal">
                {`$ c8ctl cluster start 8.9
$ c8ctl cluster stop`}
              </TerminalWindow>
            </div>
            <div className={styles.commandCard}>
              <h4>Deploy and start processes</h4>
              <TerminalWindow title="Terminal">
                {`$ c8ctl deploy ./rocket-launch.bpmn plot-destination.dmn
$ c8ctl create pi --id=rocket-launch --variables='{"fuelLevel":90}'
$ c8ctl list pi`}
              </TerminalWindow>
            </div>
            <div className={styles.commandCard}>
              <h4>Interact with processes</h4>
              <TerminalWindow title="Terminal">
                {`$ c8ctl list jobs --type=launch-approval
$ c8ctl activate jobs launch-approval
$ c8ctl complete job 2251799813685252`}
              </TerminalWindow>
            </div>
            <div className={styles.commandCard}>
              <h4>Monitor and debug</h4>
              <TerminalWindow title="Terminal">
                {`$ c8ctl list inc --state=ACTIVE
$ c8ctl get inc 2251799813685251
$ c8ctl resolve inc 2251799813685251`}
              </TerminalWindow>
            </div>
          </div>

          <p
            className={clsx(styles.cliInfoNote, styles.cliInfoNoteCentered)}
            style={{ marginTop: "2.5rem" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M8 7v4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="8" cy="4.75" r="0.85" fill="currentColor" />
            </svg>
            <span>
              Learn more about using the{" "}
              <Link to={useBaseUrl("docs/apis-tools/c8ctl/getting-started/")}>
                Camunda CLI
              </Link>{" "}
              to manage Camunda directly from the terminal.
            </span>
          </p>

          <div className={styles.pillSeparator}>
            <span className={styles.sectionPill}>AI agent integration</span>
          </div>

          {/* Teach AI agent (moved into CLI section) */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Train your AI agents on Camunda
            </h2>
            <p className={styles.sectionSub}>
              Deploy processes, manage clusters, and query instances directly
              from your AI workflow.
            </p>
          </div>
          <div className={styles.aiGrid}>
            <div className={styles.aiCard}>
              <h4 style={{ display: "flex", alignItems: "center" }}>
                Add Camunda Skills as Claude plugin
              </h4>
              <TerminalWindow title="Terminal">
                {`$ claude plugin marketplace add camunda/skills
$ claude plugin install camunda-skills@camunda-skills

Available skills:
  /camunda-c8ctl                    — install and configure c8ctl
  /camunda-ai-agent                 — build AI agents in BPMN
  /camunda-bpmn                     — create and edit BPMN 2.0 processes
  /camunda-connectors               — configure pre-built connectors
  /camunda-connectors-development   — build custom connectors
  /camunda-development              — choose the integration type
  /camunda-docs                     — search the Camunda 8 docs
  /camunda-feel                     — write and debug FEEL expressions
  /camunda-forms                    — create Camunda Form schemas
  /camunda-job-workers              — implement job workers (Java, Spring, TypeScript)
  /camunda-process-mgmt             — deploy, operate, and debug processes`}
              </TerminalWindow>
            </div>
            <div className={styles.aiCard}>
              <h4 style={{ display: "flex", alignItems: "center" }}>
                Connect to Camunda via MCP
              </h4>
              <TerminalWindow title="Terminal">
                {`// mcp.json
{
  "servers": {
    // Locally running C8Run instance
    "camunda": {
      "type": "http",
      "url": "http://localhost:8080/mcp/cluster"
    },
    // Knowledge from the Camunda docs website
    "camunda docs": {
      "type": "http",
      "url": "https://camunda-docs.mcp.kapa.ai"
    }
  }
}`}
              </TerminalWindow>
            </div>
          </div>
          <p
            className={clsx(styles.cliInfoNote, styles.cliInfoNoteCentered)}
            style={{ marginTop: "2.5rem" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M8 7v4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="8" cy="4.75" r="0.85" fill="currentColor" />
            </svg>
            <span>
              Learn more about{" "}
              <Link
                to="https://github.com/camunda/skills"
                style={{ fontWeight: 400, fontSize: "0.85rem" }}
              >
                Camunda Skills
              </Link>
              {", and the "}
              <Link
                to={useBaseUrl(
                  "docs/apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview/"
                )}
                style={{ fontWeight: 400, fontSize: "0.85rem" }}
              >
                Orchestration Cluster MCP
              </Link>{" "}
              and{" "}
              <Link
                to={useBaseUrl("docs/reference/mcp-docs/")}
                style={{ fontWeight: 400, fontSize: "0.85rem" }}
              >
                Docs MCP
              </Link>{" "}
              servers.
            </span>
          </p>
          <div className={styles.aiExamples}>
            <h4>...then ask your agent</h4>
            <p className={styles.aiExamplesSub}>
              Try one of these prompts to see Camunda Skills in action.
            </p>
            <div className={styles.aiExampleGrid}>
              <div className={styles.aiExampleItem}>
                <span className={styles.aiPromptIcon}>💬</span>
                "Create an invoice approval process with a user task for review
                and an HTTP connector to notify accounting"
              </div>
              <div className={styles.aiExampleItem}>
                <span className={styles.aiPromptIcon}>💬</span>
                "Build an AI agent to triage and route customer support tickets
                to the correct team"
              </div>
              <div className={styles.aiExampleItem}>
                <span className={styles.aiPromptIcon}>💬</span>
                "Deploy order-process.bpmn and start an instance with
                orderId=42"
              </div>
              <div className={styles.aiExampleItem}>
                <span className={styles.aiPromptIcon}>💬</span>
                "Investigate incidents on the payment-flow process and resolve
                any that are caused by missing payment details"
              </div>
            </div>

            <div className={styles.aiExamplesCta}>
              <Link className={styles.heroCardCta} to="#self-managed">
                Start building
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ marginLeft: 6 }}
                >
                  <path
                    d="M8 13V3M4 7l4-4 4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── More ways to run (duplicate) ─── */}
        <section className={clsx(styles.moreSection, styles.darkSection)}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                More ways to run Camunda locally
              </h2>
              <p className={styles.sectionSub}>
                Choose the setup that fits your workflow and infrastructure.
              </p>
            </div>
            <div className={styles.waysGrid}>
              <Link
                to={useBaseUrl(
                  "docs/self-managed/quickstart/developer-quickstart/docker-compose/"
                )}
                className={styles.wayCard}
              >
                <DockerIcon />
                <h3>Docker Compose</h3>
                <p>
                  Run the full Camunda stack locally with a single{" "}
                  <CodeBlock>docker compose up</CodeBlock>.
                </p>
              </Link>
              <Link
                to={useBaseUrl(
                  "docs/self-managed/deployment/helm/install/quick-install/"
                )}
                className={styles.wayCard}
              >
                <KubernetesIcon />
                <h3>Kubernetes</h3>
                <p>
                  Deploy to any Kubernetes cluster with the official Camunda
                  Helm chart.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Production deployments ─── */}
        <section className={styles.exploreSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Production deployment options
              </h2>
              <p className={styles.sectionSub}>
                Run Camunda at scale on the infrastructure you already trust.
              </p>
            </div>
            <div className={styles.deployGrid}>
              <Link
                to={useBaseUrl(
                  "docs/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/"
                )}
                className={styles.deployCard}
              >
                <AWSIcon />
                <h4>Amazon EKS</h4>
                <p>Deploy on AWS with managed Kubernetes.</p>
              </Link>
              <Link
                to={useBaseUrl(
                  "docs/self-managed/deployment/helm/cloud-providers/gcp/google-gke/"
                )}
                className={styles.deployCard}
              >
                <GCPIcon />
                <h4>Google GKE</h4>
                <p>Run on Google Cloud with native GKE support.</p>
              </Link>
              <Link
                to={useBaseUrl(
                  "docs/self-managed/deployment/helm/install/quick-install/"
                )}
                className={styles.deployCard}
              >
                <HelmIcon />
                <h4>Kubernetes + Helm</h4>
                <p>Flexible deployment with the official Helm chart.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Camunda downloads ─── */}
        <section
          id="downloads"
          className={clsx(
            styles.moreSection,
            styles.darkSection,
            styles.noTopBorder,
            styles.exploreSectionLast
          )}
          style={{
            scrollMarginTop: "5rem",
            paddingTop: "3rem",
            paddingBottom: "8rem",
          }}
        >
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Camunda downloads</h2>
              <p className={styles.sectionSub}>
                Download everything you need for local Camunda 8 development.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link
                to={useBaseUrl("/downloads")}
                className={styles.heroCardCtaAlt}
              >
                Go to downloads <ArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default BuildWithCamunda;
