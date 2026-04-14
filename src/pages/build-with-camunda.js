import React from "react";
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

function TerminalWindow({ title, children }) {
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
      description="Process orchestration for developers. Go from zero to a running workflow in under two minutes."
    >
      <div className={styles.page}>
        {/* ─── Hero + Start cards wrapper ─── */}
        <div className={styles.heroWrapper}>
          <div className={styles.heroGlow} />

          {/* ─── Hero ─── */}
          <header className={styles.hero}>
            <div className={clsx("container", styles.heroInner)}>
              <h1 className={styles.heroTitle}>Build with Camunda 8.9</h1>
              <p className={styles.heroSub}>
                Go from zero to a running workflow in under two minutes.
              </p>
              <p className={styles.heroSub}>
                Choose how you want to get started:
              </p>
            </div>
          </header>

          {/* ─── Two-card start options ─── */}
          <section className={clsx("container", styles.section)}>
            <div className={styles.startGrid}>
              {/* SaaS card */}
              <div className={clsx(styles.startCard, styles.startCardSaas)}>
                <span className={styles.startCardIcon}>
                  <CloudIcon />
                </span>
                <span
                  className={styles.startCardLabel}
                  style={{ color: "#78a9ff" }}
                >
                  FASTEST START
                </span>
                <h2 className={styles.startCardTitle}>Free trial on SaaS</h2>
                <p className={styles.startCardDesc}>
                  Get your own fully managed Camunda cluster. Nothing to
                  install, just sign up and start modeling today.
                </p>
                <ul className={styles.checkList}>
                  <li>
                    <CheckIcon color="#78a9ff" /> Zero setup - runs in Camunda's
                    cloud
                  </li>
                  <li>
                    <CheckIcon color="#78a9ff" /> Web Modeler included
                  </li>
                  <li>
                    <CheckIcon color="#78a9ff" /> AI agent skills built in
                  </li>
                  <li>
                    <CheckIcon color="#78a9ff" /> 30 days free, fully featured
                  </li>
                </ul>
                <div className={styles.startCardFooter}>
                  <Link
                    className={styles.ctaButton}
                    to="https://accounts.cloud.camunda.io/signup?utm_source=camunda_docs&utm_medium=cta&utm_campaign=cli_landing_page"
                  >
                    Create free account <ArrowRight />
                  </Link>
                  <span className={styles.ctaNote}>
                    ~60 seconds to your first cluster
                  </span>
                </div>
              </div>

              {/* OR badge */}
              <div className={styles.orBadge}>OR</div>

              {/* CLI card */}
              <div className={clsx(styles.startCard, styles.startCardCli)}>
                <span className={styles.startCardIcon}>
                  <TerminalIcon />
                </span>
                <span
                  className={styles.startCardLabel}
                  style={{ color: "#fc5d0d" }}
                >
                  FULL CONTROL
                </span>
                <h2 className={styles.startCardTitle}>
                  Run locally with the CLI <VersionBadge />
                </h2>
                <p className={styles.startCardDesc}>
                  Use the{" "}
                  <Link
                    to={useBaseUrl(
                      "docs/next/apis-tools/c8ctl/getting-started/"
                    )}
                  >
                    <CodeBlock>c8ctl</CodeBlock>
                  </Link>
                  Camunda CLI tool. Run locally and scale seamlessly to
                  enterprise clusters with the same runtime and stack, deploying
                  anywhere with one command.
                </p>
                <ul className={styles.checkList}>
                  <li>
                    <CheckIcon color="#fc5d0d" /> Works on macOS, Linux, Windows
                  </li>
                  <li>
                    <CheckIcon color="#fc5d0d" /> Desktop Modeler for modeling
                  </li>
                  <li>
                    <CheckIcon color="#fc5d0d" /> AI agent skills built in
                  </li>
                  <li>
                    <CheckIcon color="#fc5d0d" /> Your data stays on your
                    machine
                  </li>
                </ul>
                <div className={styles.startCardFooter}>
                  <Link
                    className={clsx(styles.ctaButton, styles.ctaButtonCli)}
                    to="#get-started"
                  >
                    Install now <ArrowDown />
                  </Link>
                  <span className={styles.ctaNote}>
                    ~2 minutes to a running engine
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ─── Quick install ─── */}
        <section
          id="get-started"
          className={clsx("container", styles.section)}
          style={{ scrollMarginTop: "5rem" }}
        >
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Get started with c8ctl <VersionBadge />
            </h2>
            <p className={styles.sectionSub}>
              Install{" "}
              <Link
                to={useBaseUrl("docs/next/apis-tools/c8ctl/getting-started/")}
              >
                <CodeBlock>c8ctl</CodeBlock>
              </Link>{" "}
              from npm and spin up a Self-Managed Camunda cluster on your
              machine.
            </p>
          </div>
          <TerminalWindow title="Terminal">
            {`$ npm install @camunda8/cli@alpha -g
$ c8ctl cluster start

# Camunda is now running! Deploy your first process:
$ git clone https://github.com/camunda/camunda-8-get-started.git
$ cd camunda-8-get-started/1-rocket-launch/
$ c8ctl deploy .
$ c8ctl run rocket-launch.bpmn --variables='{"fuelLevel":90}'

# Open Operate at http://localhost:8080/operate to see your process instance running. Log in with the credentials \`demo/demo\`. `}
          </TerminalWindow>

          {/* c8run direct download */}
          <div className={styles.modelerNote}>
            <p>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ marginRight: "0.4rem", verticalAlign: "middle" }}
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
              No npm? Download c8run directly and start a local Camunda cluster
              without the CLI.
            </p>
            <details className={styles.collapsible}>
              <summary>Download c8run</summary>
              <div className={styles.collapsibleContent}>
                <p style={{ marginBottom: "0.75rem" }}>
                  Requires{" "}
                  <a
                    href="https://adoptium.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OpenJDK 21–25
                  </a>
                  . Extract the archive and run:
                </p>
                <TerminalWindow title="Terminal">
                  {`# macOS / Linux
./start.sh

# Windows
.\\c8run.exe start`}
                </TerminalWindow>
                <div
                  className={styles.downloadButtons}
                  style={{ marginTop: "1rem" }}
                >
                  <a
                    href="https://downloads.camunda.cloud/release/camunda/c8run/8.9/camunda8-run-8.9-darwin-aarch64.zip"
                    className={styles.downloadButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    macOS (Apple Silicon)
                  </a>
                  <a
                    href="https://downloads.camunda.cloud/release/camunda/c8run/8.9/camunda8-run-8.9-darwin-x86_64.zip"
                    className={styles.downloadButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    macOS (Intel)
                  </a>
                  <a
                    href="https://downloads.camunda.cloud/release/camunda/c8run/8.9/camunda8-run-8.9-linux-x86_64.tar.gz"
                    className={styles.downloadButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linux
                  </a>
                  <a
                    href="https://downloads.camunda.cloud/release/camunda/c8run/8.9/camunda8-run-8.9-windows-x86_64.zip"
                    className={styles.downloadButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Windows
                  </a>
                </div>
                <p className={styles.downloadMeta}>
                  <Link
                    to={useBaseUrl(
                      "docs/next/self-managed/quickstart/developer-quickstart/c8run/install-start/"
                    )}
                  >
                    Installation guide
                  </Link>
                </p>
              </div>
            </details>
          </div>

          {/* Desktop Modeler download */}
          <div className={styles.modelerNote}>
            <p>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ marginRight: "0.4rem", verticalAlign: "middle" }}
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
              Download Desktop Modeler to design and edit BPMN diagrams, DMN
              decisions, and forms.
            </p>
            <details className={styles.collapsible}>
              <summary>Download Desktop Modeler </summary>
              <div className={styles.collapsibleContent}>
                {/* Homebrew install option (macOS) */}
                <p style={{ marginBottom: "0.75rem" }}>
                  On macOS, you can install the Desktop Modeler via{" "}
                  <a
                    href="https://brew.sh/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Homebrew
                  </a>
                  :
                </p>
                <TerminalWindow title="Terminal">
                  {`$ brew install --cask camunda-modeler`}
                </TerminalWindow>

                {/* Manual download buttons */}
                <p style={{ marginTop: "1rem", marginBottom: "0.75rem" }}>
                  Or download and install manually:
                </p>
                <div className={styles.downloadButtons}>
                  <a
                    href="https://downloads.camunda.cloud/release/camunda-modeler/5.45.0/camunda-modeler-5.45.0-mac-arm64.dmg"
                    className={styles.downloadButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    macOS (Apple Silicon)
                  </a>
                  <a
                    href="https://downloads.camunda.cloud/release/camunda-modeler/5.45.0/camunda-modeler-5.45.0-mac-x64.dmg"
                    className={styles.downloadButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    macOS (Intel)
                  </a>
                  <a
                    href="https://downloads.camunda.cloud/release/camunda-modeler/5.45.0/camunda-modeler-5.45.0-win-x64.zip"
                    className={styles.downloadButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Windows
                  </a>
                  <a
                    href="https://downloads.camunda.cloud/release/camunda-modeler/5.45.0/camunda-modeler-5.45.0-linux-x64.tar.gz"
                    className={styles.downloadButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linux
                  </a>
                </div>
                <p className={styles.downloadMeta}>
                  Version 5.45 ·{" "}
                  <Link
                    to={useBaseUrl(
                      "docs/next/components/modeler/desktop-modeler/install-the-modeler/"
                    )}
                  >
                    Installation guide
                  </Link>
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* ─── Everything from your terminal ─── */}
        <section className={clsx("container", styles.section)}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Everything from your terminal <VersionBadge />
            </h2>
            <p className={styles.sectionSub}>
              <Link
                to={useBaseUrl("docs/next/apis-tools/c8ctl/getting-started/")}
              >
                <CodeBlock>c8ctl</CodeBlock>
              </Link>{" "}
              gives you a single CLI for the full Camunda lifecycle with no
              browser required.
            </p>
          </div>
          <div className={styles.commandGrid}>
            <div className={styles.commandCard}>
              <h4>Manage your clusters</h4>
              <TerminalWindow title="Terminal">
                {`$ c8ctl c8run start 8.9.0-alpha5
$ c8ctl c8run stop

`}
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
        </section>

        {/* ─── Teach your AI Agent ─── */}
        <section
          className={clsx("container", styles.section, styles.sectionLast)}
        >
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Teach your AI agent Camunda <VersionBadge />
            </h2>
            <p className={styles.sectionSub}>
              Give your coding assistant Camunda superpowers. Deploy processes,
              manage clusters, and query instances right from your AI workflow.
            </p>
          </div>
          <div className={styles.aiGrid}>
            <div className={styles.aiCard}>
              <h4 style={{ color: "inherit" }}>
                Add Camunda skills as Claude plugin{" "}
                <span
                  style={{
                    marginLeft: "0.5rem",
                    display: "inline-block",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    backgroundColor: "#fc5d0d",
                    border: "1px solid #fc5d0d",
                    color: "#ffffff",
                    verticalAlign: "middle",
                    lineHeight: 1.2,
                  }}
                >
                  Coming soon
                </span>
              </h4>
              <TerminalWindow title="Terminal">
                {`$ claude plugin add camunda/camunda-ai-dev-kit

Available skills:
  /new-project  — scaffold a new Camunda project
  /new-process  — generate a BPMN process
  /new-agent    — generate an agentic AI process (ad-hoc sub-process + AI Agent connector)
  /new-dmn      — generate a DMN decision table
  /new-form     — generate a Camunda Form
  /new-worker   — generate a job worker
  /deploy       — deploy resources to Camunda
  /start        — start a process instance
  /status       — check instance/incident status
  /view-process       — visualize BPMN, DMN, or Form files
  /setup-environment  — install and start Camunda 8 Run locally`}
              </TerminalWindow>
            </div>
            <div className={styles.aiCard}>
              <h4 style={{ display: "flex", alignItems: "center" }}>
                Connect to Camunda via MCP
                <span
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={useBaseUrl(
                      "docs/next/apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview/"
                    )}
                    style={{ fontWeight: 400, fontSize: "0.85rem" }}
                  >
                    Orchestration Cluster MCP
                  </Link>
                  <span
                    style={{
                      color: "var(--muted-color)",
                      margin: "0 0.4rem",
                      fontWeight: 300,
                    }}
                  >
                    |
                  </span>
                  <Link
                    to={useBaseUrl("docs/next/reference/mcp-docs/")}
                    style={{ fontWeight: 400, fontSize: "0.85rem" }}
                  >
                    Docs MCP
                  </Link>
                </span>
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
          <div className={styles.aiExamples}>
            <h4>Then ask your agent:</h4>
            <div className={styles.aiExampleGrid}>
              <div className={styles.aiExampleItem}>
                <span className={styles.aiPromptIcon}>💬</span>
                "Deploy the order-process.bpmn and start an instance with
                orderId=42"
              </div>
              <div className={styles.aiExampleItem}>
                <span className={styles.aiPromptIcon}>💬</span>
                "Show me all incidents on the payment-flow process"
              </div>
              <div className={styles.aiExampleItem}>
                <span className={styles.aiPromptIcon}>💬</span>
                "Investigate incidents on the payment-flow process and resolve
                any that are due to missing payment details"
              </div>
            </div>
          </div>
        </section>

        {/* ─── More ways to run ─── */}
        <section className={styles.moreSection}>
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
                  "docs/next/self-managed/quickstart/developer-quickstart/docker-compose/"
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
                  "docs/next/self-managed/deployment/helm/install/quick-install/"
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
                  "docs/next/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/"
                )}
                className={styles.deployCard}
              >
                <AWSIcon />
                <h4>Amazon EKS</h4>
                <p>Deploy on AWS with managed Kubernetes.</p>
              </Link>
              <Link
                to={useBaseUrl(
                  "docs/next/self-managed/deployment/helm/cloud-providers/gcp/google-gke/"
                )}
                className={styles.deployCard}
              >
                <GCPIcon />
                <h4>Google GKE</h4>
                <p>Run on Google Cloud with native GKE support.</p>
              </Link>
              <Link
                to={useBaseUrl(
                  "docs/next/self-managed/deployment/helm/install/quick-install/"
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

        {/* ─── Architecture ─── */}
        <section className={styles.exploreSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Architecture at a glance</h2>
              <p className={styles.sectionSub}>
                Learn more about how Camunda's components and features work
                together to power your process orchestration.
              </p>
            </div>
            <div className={styles.archDiagram}>
              <div className={styles.archGroup}>
                <h3 className={styles.archGroupTitle}>Design and manage</h3>
                <div className={styles.archRow}>
                  <Link
                    to={useBaseUrl(
                      "docs/next/components/modeler/about-modeler/"
                    )}
                    className={styles.archBox}
                  >
                    <ModelerIcon />
                    <strong>Modeler</strong>
                    <span>Design and model BPMN, DMN, and Forms</span>
                  </Link>
                  <Link
                    to={useBaseUrl(
                      "docs/next/components/console/introduction-to-console/"
                    )}
                    className={styles.archBox}
                  >
                    <ConsoleIcon />
                    <strong>Console</strong>
                    <span>Manage clusters and settings</span>
                  </Link>
                  <Link
                    to={useBaseUrl(
                      "docs/next/components/optimize/what-is-optimize/"
                    )}
                    className={styles.archBox}
                  >
                    <OptimizeIcon />
                    <strong>Optimize</strong>
                    <span>Analyze and improve</span>
                  </Link>
                </div>
              </div>

              <div className={styles.archConnector}>
                <svg width="32" height="48" viewBox="0 0 32 48" fill="none">
                  <path
                    d="M16 0l8 10H8l8-10z"
                    fill="var(--arch-connector-color)"
                  />
                  <line
                    x1="16"
                    y1="10"
                    x2="16"
                    y2="38"
                    stroke="var(--arch-connector-color)"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M16 48l8-10H8l8 10z"
                    fill="var(--arch-connector-color)"
                  />
                </svg>
              </div>

              <div
                className={clsx(styles.archGroup, styles.archGroupHighlight)}
              >
                <h3 className={styles.archGroupTitle}>Orchestration Cluster</h3>
                <div className={styles.archRow}>
                  <Link
                    to={useBaseUrl(
                      "docs/next/components/zeebe/zeebe-overview/"
                    )}
                    className={clsx(styles.archBox, styles.archBoxPrimary)}
                  >
                    <ZeebeIcon />
                    <strong>Zeebe</strong>
                    <span>Core workflow engine</span>
                  </Link>
                  <Link
                    to={useBaseUrl(
                      "docs/next/components/tasklist/introduction-to-tasklist/"
                    )}
                    className={styles.archBox}
                  >
                    <TasklistIcon />
                    <strong>Tasklist</strong>
                    <span>Human task management</span>
                  </Link>
                  <Link
                    to={useBaseUrl(
                      "docs/next/components/operate/operate-introduction/"
                    )}
                    className={styles.archBox}
                  >
                    <OperateIcon />
                    <strong>Operate</strong>
                    <span>Monitor and troubleshoot</span>
                  </Link>
                  <Link
                    to={useBaseUrl(
                      "docs/next/components/concepts/access-control/access-control-overview/"
                    )}
                    className={styles.archBox}
                  >
                    <AdminIcon />
                    <strong>Admin</strong>
                    <span>Authentication and authorization</span>
                  </Link>
                </div>
              </div>

              <div className={styles.archConnector}>
                <svg width="32" height="48" viewBox="0 0 32 48" fill="none">
                  <path
                    d="M16 0l8 10H8l8-10z"
                    fill="var(--arch-connector-color)"
                  />
                  <line
                    x1="16"
                    y1="10"
                    x2="16"
                    y2="38"
                    stroke="var(--arch-connector-color)"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M16 48l8-10H8l8 10z"
                    fill="var(--arch-connector-color)"
                  />
                </svg>
              </div>

              <div className={styles.archGroup}>
                <h3 className={styles.archGroupTitle}>Connectors and tools</h3>
                <div className={styles.archRow}>
                  <Link
                    to={useBaseUrl(
                      "docs/next/components/connectors/introduction-to-connectors/"
                    )}
                    className={styles.archBox}
                  >
                    <ConnectorsIcon />
                    <strong>Connectors</strong>
                    <span>Integrate external systems</span>
                  </Link>
                  <Link
                    to={useBaseUrl(
                      "docs/next/apis-tools/working-with-apis-tools/"
                    )}
                    className={styles.archBox}
                  >
                    <ClientsIcon />
                    <strong>APIs</strong>
                    <span>APIs for integration and automation</span>
                  </Link>
                  <Link
                    to={useBaseUrl(
                      "docs/next/apis-tools/working-with-apis-tools/#api-clients"
                    )}
                    className={styles.archBox}
                  >
                    <SDKsIcon />
                    <strong>Clients & SDKs</strong>
                    <span>Official and community clients and SDKs</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Agentic orchestration ─── */}
        <section className={styles.exploreSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Agentic orchestration</h2>
            <p className={styles.sectionSub}>
              Orchestrate AI agents in BPMN-based workflows. Design, deploy, and
              monitor intelligent agents combining human tasks with LLM
              reasoning.
            </p>
          </div>
          <div className={styles.agenticGrid}>
            <Link
              to={useBaseUrl(
                "docs/next/guides/getting-started-agentic-orchestration/"
              )}
              className={styles.agenticCard}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  stroke="#78a9ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <h4>Build your first AI agent</h4>
              <p>Get started by building and running your first AI agent.</p>
            </Link>
            <Link
              to={useBaseUrl(
                "docs/next/components/agentic-orchestration/agentic-orchestration-overview/"
              )}
              className={styles.agenticCard}
            >
              <img
                src={IconAgenticImg}
                alt="Agentic orchestration"
                width="40"
                height="40"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(62%) sepia(52%) saturate(1041%) hue-rotate(189deg) brightness(101%) contrast(101%)",
                }}
              />
              <h4>Agentic orchestration</h4>
              <p>
                Orchestrate AI agents alongside human tasks and system
                integrations.
              </p>
            </Link>
            <Link
              to={useBaseUrl(
                "docs/next/components/agentic-orchestration/ai-agents/"
              )}
              className={styles.agenticCard}
            >
              <img
                src={IconAgenticImg}
                alt="Agentic orchestration"
                width="40"
                height="40"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(62%) sepia(52%) saturate(1041%) hue-rotate(189deg) brightness(101%) contrast(101%)",
                }}
              />
              <h4>About AI agents</h4>
              <p>
                Build agents that reason, plan, and act using LLMs within your
                processes.
              </p>
            </Link>
          </div>
        </section>

        {/* ─── Explore docs ─── */}
        <section className={styles.exploreSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Explore the docs</h2>
              <p className={styles.sectionSub}>
                Browse Camunda 8 guides, resources, SDK, and API documentation.
              </p>
            </div>
            <div className={styles.exploreGrid}>
              <Link
                to={useBaseUrl("docs/next/guides/")}
                className={styles.exploreCard}
              >
                <h3>Get started</h3>
                <p>
                  New to Camunda? Create an account and model your first
                  process.
                </p>
              </Link>
              <Link
                to={useBaseUrl("docs/next/components/")}
                className={styles.exploreCard}
              >
                <h3>Using Camunda</h3>
                <p>Learn about Modeler, Zeebe, Operate, Tasklist, and more.</p>
              </Link>
              <Link
                to={useBaseUrl("docs/next/self-managed/about-self-managed/")}
                className={styles.exploreCard}
              >
                <h3>Self-Managed</h3>
                <p>Host and operate Camunda on your own infrastructure.</p>
              </Link>
              <Link
                to={useBaseUrl("docs/next/apis-tools/working-with-apis-tools/")}
                className={styles.exploreCard}
              >
                <h3>APIs and tools</h3>
                <p>Client libraries, REST APIs, SDKs, and integrations.</p>
              </Link>
              <Link
                to={useBaseUrl(
                  "docs/next/components/best-practices/best-practices-overview/"
                )}
                className={styles.exploreCard}
              >
                <h3>Best Practices</h3>
                <p>
                  Level up your BPMN, DMN, and process orchestration skills.
                </p>
              </Link>
              <Link
                to={useBaseUrl("docs/next/reference/")}
                className={styles.exploreCard}
              >
                <h3>Reference</h3>
                <p>Release notes, supported environments, and licenses.</p>
              </Link>
            </div>
          </div>
          <br />
          <br />
        </section>
      </div>
    </Layout>
  );
}

export default BuildWithCamunda;
