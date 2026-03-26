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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
        fill="#78a9ff"
        opacity="0.2"
      />
      <path
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        stroke="#78a9ff"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function ConsoleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="#78a9ff" strokeWidth="1.5" />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke="#78a9ff"
        strokeWidth="1.5"
        fill="none"
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 20l4-6 4 3 5-7 5 5"
        stroke="#78a9ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M17 8h4v4"
        stroke="#78a9ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 7h3a5 5 0 010 10h-3M9 17H6a5 5 0 010-10h3"
        stroke="#78a9ff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 12h8"
        stroke="#78a9ff"
        strokeWidth="1.5"
        strokeLinecap="round"
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
              <h1 className={styles.heroTitle}>Build with Camunda</h1>
              <p className={styles.heroSub}>
                Process orchestration for developers. Go from zero to a running
                workflow in under two minutes, then let your AI coding agent
                take over.
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
                    <CheckIcon color="#78a9ff" /> Zero setup — runs in Camunda's
                    cloud
                  </li>
                  <li>
                    <CheckIcon color="#78a9ff" /> Web Modeler included
                  </li>
                  <li>
                    <CheckIcon color="#78a9ff" /> 30 days free, fully featured
                  </li>
                  <li>
                    <CheckIcon color="#78a9ff" /> Connect via{" "}
                    <CodeBlock>c8 login</CodeBlock>
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
                  Camunda CLI tool. One command to install, one to start. Full
                  Camunda on your machine, includes engine, Operate, Tasklist,
                  and connectors.
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
                    See the install <ArrowRight />
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
              Just three lines to install{" "}
              <Link
                to={useBaseUrl("docs/next/apis-tools/c8ctl/getting-started/")}
              >
                <CodeBlock>c8ctl</CodeBlock>
              </Link>{" "}
              from npm and spin up a full Self-Managed Camunda cluster on your
              machine.
            </p>
          </div>
          <TerminalWindow title="Terminal">
            {`$ npm install @camunda8/cli -g
$ c8ctl load plugin --from https://github.com/MaxTru/c8ctl-plugin-c8run            
$ c8ctl c8run start

✔ Zeebe broker started on port 26500
✔ Operate available at http://localhost:8081
✔ Tasklist available at http://localhost:8082
✔ Connectors runtime started

Camunda is running. Deploy your first process:
$ c8ctl deploy ./my-process.bpmn`}
          </TerminalWindow>

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
              <summary>Download Desktop Modeler</summary>
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
                      "docs/components/modeler/desktop-modeler/install-the-modeler/"
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
              <TerminalWindow>
                {`$ c8ctl c8run start 8.9.0-alpha5
$ c8ctl c8run stop

`}
              </TerminalWindow>
            </div>
            <div className={styles.commandCard}>
              <h4>Deploy and start processes</h4>
              <TerminalWindow>
                {`$ c8ctl deploy ./payment.bpmn
$ c8ctl create pi --id=payment
$ c8ctl list pi`}
              </TerminalWindow>
            </div>
            <div className={styles.commandCard}>
              <h4>Interact with processes</h4>
              <TerminalWindow>
                {`$ c8 list jobs --type=email-service
$ c8ctl activate jobs email-service
$ c8ctl complete job 2251799813685252'`}
              </TerminalWindow>
            </div>
            <div className={styles.commandCard}>
              <h4>Monitor and debug</h4>
              <TerminalWindow>
                {`$ c8ctl list inc --state=ACTIVE
$ c8ctl get inc 2251799813685251
$ c8 resolve inc 2251799813685251`}
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
                    background: "rgba(252, 93, 13, 0.15)",
                    border: "1px solid rgba(252, 93, 13, 0.45)",
                    color: "#fc5d0d",
                    verticalAlign: "middle",
                    lineHeight: 1.2,
                  }}
                >
                  Coming soon!
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
              <TerminalWindow title="Claude Config">
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
              <h2 className={styles.sectionTitle}>More ways to run Camunda</h2>
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

        {/* ─── Architecture ─── */}
        <section className={styles.exploreSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Architecture at a glance</h2>
              <p className={styles.sectionSub}>
                Camunda's components work together to power process
                orchestration. Click any component to learn more.
              </p>
            </div>
            <div className={styles.archDiagram}>
              <div className={styles.archRow}>
                <Link
                  to={useBaseUrl("docs/components/modeler/about-modeler/")}
                  className={styles.archBox}
                >
                  <ModelerIcon />
                  <strong>Modeler</strong>
                  <span>Design BPMN, DMN, and Forms</span>
                </Link>
                <Link
                  to={useBaseUrl(
                    "docs/components/console/introduction-to-console/"
                  )}
                  className={styles.archBox}
                >
                  <ConsoleIcon />
                  <strong>Console</strong>
                  <span>Manage clusters and settings</span>
                </Link>
              </div>
              <div className={styles.archConnector}>▼</div>
              <div className={styles.archRow}>
                <Link
                  to={useBaseUrl("docs/components/zeebe/zeebe-overview/")}
                  className={clsx(styles.archBox, styles.archBoxPrimary)}
                >
                  <ZeebeIcon />
                  <strong>Zeebe</strong>
                  <span>Workflow engine at the core</span>
                </Link>
              </div>
              <div className={styles.archConnector}>▼</div>
              <div className={styles.archRow}>
                <Link
                  to={useBaseUrl(
                    "docs/components/operate/operate-introduction/"
                  )}
                  className={styles.archBox}
                >
                  <OperateIcon />
                  <strong>Operate</strong>
                  <span>Monitor and troubleshoot</span>
                </Link>
                <Link
                  to={useBaseUrl(
                    "docs/components/tasklist/introduction-to-tasklist/"
                  )}
                  className={styles.archBox}
                >
                  <TasklistIcon />
                  <strong>Tasklist</strong>
                  <span>Human task management</span>
                </Link>
                <Link
                  to={useBaseUrl(
                    "docs/components/connectors/introduction-to-connectors/"
                  )}
                  className={styles.archBox}
                >
                  <ConnectorsIcon />
                  <strong>Connectors</strong>
                  <span>Integrate external systems</span>
                </Link>
                <Link
                  to={useBaseUrl("docs/components/optimize/what-is-optimize/")}
                  className={styles.archBox}
                >
                  <OptimizeIcon />
                  <strong>Optimize</strong>
                  <span>Analyze and improve</span>
                </Link>
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
                "docs/guides/getting-started-agentic-orchestration/"
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
                "docs/components/agentic-orchestration/agentic-orchestration-overview/"
              )}
              className={styles.agenticCard}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="#78a9ff"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M12 8v4l3 3"
                  stroke="#78a9ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h4>Agentic orchestration</h4>
              <p>
                Learn how Camunda orchestrates AI agents alongside human tasks
                and system integrations.
              </p>
            </Link>
            <Link
              to={useBaseUrl(
                "docs/components/agentic-orchestration/ai-agents/"
              )}
              className={styles.agenticCard}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="6"
                  width="18"
                  height="12"
                  rx="2"
                  stroke="#78a9ff"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="9" cy="12" r="1.5" fill="#78a9ff" />
                <circle cx="15" cy="12" r="1.5" fill="#78a9ff" />
                <path
                  d="M8 3v3M16 3v3"
                  stroke="#78a9ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
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
                to={useBaseUrl("docs/guides/")}
                className={styles.exploreCard}
              >
                <h3>Get started</h3>
                <p>
                  New to Camunda? Create an account and model your first
                  process.
                </p>
              </Link>
              <Link
                to={useBaseUrl("docs/components/")}
                className={styles.exploreCard}
              >
                <h3>Using Camunda</h3>
                <p>Learn about Modeler, Zeebe, Operate, Tasklist, and more.</p>
              </Link>
              <Link
                to={useBaseUrl("docs/self-managed/about-self-managed/")}
                className={styles.exploreCard}
              >
                <h3>Self-Managed</h3>
                <p>Host and operate Camunda on your own infrastructure.</p>
              </Link>
              <Link
                to={useBaseUrl("docs/apis-tools/working-with-apis-tools/")}
                className={styles.exploreCard}
              >
                <h3>APIs and tools</h3>
                <p>Client libraries, REST APIs, SDKs, and integrations.</p>
              </Link>
              <Link
                to={useBaseUrl(
                  "docs/components/best-practices/best-practices-overview/"
                )}
                className={styles.exploreCard}
              >
                <h3>Best Practices</h3>
                <p>
                  Level up your BPMN, DMN, and process orchestration skills.
                </p>
              </Link>
              <Link
                to={useBaseUrl("docs/reference/")}
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
