import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./build-with-camunda.module.css";

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
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L3 7v10l9 5 9-5V7l-9-5z"
        stroke="#78a9ff"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="12" r="3" stroke="#78a9ff" strokeWidth="1.5" />
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect
        x="1"
        y="10"
        width="22"
        height="10"
        rx="2"
        stroke="#78a9ff"
        strokeWidth="1.5"
        fill="none"
      />
      <rect
        x="4"
        y="6"
        width="4"
        height="4"
        stroke="#78a9ff"
        strokeWidth="1.2"
        fill="none"
      />
      <rect
        x="10"
        y="6"
        width="4"
        height="4"
        stroke="#78a9ff"
        strokeWidth="1.2"
        fill="none"
      />
      <rect
        x="10"
        y="2"
        width="4"
        height="4"
        stroke="#78a9ff"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

function AWSIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 15c2-2 5-3 9-3s7 1 9 3"
        stroke="#fc5d0d"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 18l-2 2M17 18l2 2"
        stroke="#fc5d0d"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 8l2 5h4l2-5"
        stroke="#fc5d0d"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GCPIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <polygon
        points="12,2 22,18 2,18"
        stroke="#78a9ff"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="13" r="3" stroke="#78a9ff" strokeWidth="1.5" />
    </svg>
  );
}

function HelmIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="#78a9ff"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M12 3v18M3 12h18" stroke="#78a9ff" strokeWidth="1.2" />
      <path
        d="M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"
        stroke="#78a9ff"
        strokeWidth="0.8"
      />
    </svg>
  );
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

function VersionBadge({ version = "8.9+" }) {
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
        {/* ─── Hero ─── */}
        <header className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={clsx("container", styles.heroInner)}>
            <h1 className={styles.heroTitle}>Build with Camunda</h1>
            <p className={styles.heroSub}>
              Process orchestration for developers. Go from zero to a running
              workflow in under two minutes — then let your AI coding agent take
              over.
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
                Get a fully managed Camunda cluster in seconds. Nothing to
                install — sign up and start modeling.
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
                  <CheckIcon color="#78a9ff" /> 30 days free, full featured
                </li>
                <li>
                  <CheckIcon color="#78a9ff" /> Connect via{" "}
                  <CodeBlock>c8 login</CodeBlock>
                </li>
              </ul>
              <div className={styles.startCardFooter}>
                <Link
                  className={styles.ctaButton}
                  to="https://signup.camunda.com/accounts?utm_source=docs.camunda.io&utm_medium=referral"
                >
                  Create free account <ArrowRight />
                </Link>
                <span className={styles.ctaNote}>
                  ~60 seconds to first cluster
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
                Use{" "}
                <Link
                  to={useBaseUrl("docs/next/apis-tools/c8ctl/getting-started/")}
                >
                  <CodeBlock>c8ctl</CodeBlock>
                </Link>
                , the Camunda CLI tool. One command to install, one to start.
                Full Camunda on your machine — engine, Operate, Tasklist,
                connectors.
              </p>
              <ul className={styles.checkList}>
                <li>
                  <CheckIcon color="#fc5d0d" /> Works on macOS, Linux, Windows
                </li>
                <li>
                  <CheckIcon color="#fc5d0d" /> Desktop Modeler included
                </li>
                <li>
                  <CheckIcon color="#fc5d0d" /> AI agent skills built in
                </li>
                <li>
                  <CheckIcon color="#fc5d0d" /> Your data stays on your machine
                </li>
              </ul>
              <div className={styles.startCardFooter}>
                <Link
                  className={clsx(styles.ctaButton, styles.ctaButtonCli)}
                  to={useBaseUrl(
                    "docs/self-managed/quickstart/developer-quickstart/c8run/"
                  )}
                >
                  See the install <ArrowRight />
                </Link>
                <span className={styles.ctaNote}>
                  ~2 minutes to running engine
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Quick install ─── */}
        <section className={clsx("container", styles.section)}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Get started in one line with c8ctl <VersionBadge />
            </h2>
            <p className={styles.sectionSub}>
              Install{" "}
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
            {`$ npm install -g c8ctl
$ c8ctl cluster start

✔ Zeebe broker started on port 26500
✔ Operate available at http://localhost:8081
✔ Tasklist available at http://localhost:8082
✔ Connectors runtime started

Camunda is running. Deploy your first process:
  $ c8ctl process deploy my-process.bpmn`}
          </TerminalWindow>
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
              gives you a single CLI for the full Camunda lifecycle — no browser
              required.
            </p>
          </div>
          <div className={styles.commandGrid}>
            <div className={styles.commandCard}>
              <h4>Cluster management</h4>
              <TerminalWindow>
                {`$ c8ctl cluster start
$ c8ctl cluster status
$ c8ctl cluster stop`}
              </TerminalWindow>
            </div>
            <div className={styles.commandCard}>
              <h4>Deploy processes</h4>
              <TerminalWindow>
                {`$ c8ctl process deploy ./payment.bpmn
$ c8ctl process list
$ c8ctl process start payment-flow`}
              </TerminalWindow>
            </div>
            <div className={styles.commandCard}>
              <h4>Manage connectors</h4>
              <TerminalWindow>
                {`$ c8ctl connector list
$ c8ctl connector install rest-connector
$ c8ctl connector logs rest-connector`}
              </TerminalWindow>
            </div>
            <div className={styles.commandCard}>
              <h4>Monitor and debug</h4>
              <TerminalWindow>
                {`$ c8ctl instance list --active
$ c8ctl instance inspect <id>
$ c8ctl incident list`}
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
              <h4>
                <Link
                  to={useBaseUrl("docs/next/apis-tools/c8ctl/getting-started/")}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Add Camunda skills with c8ctl
                </Link>
              </h4>
              <TerminalWindow title="Terminal">
                {`$ c8ctl ai install-skills
✔ Installed Camunda skills for AI agents

Available skills:
  camunda.deploy    Deploy a BPMN process
  camunda.start     Start a process instance
  camunda.query     Query running instances
  camunda.tasklist  Complete user tasks
  camunda.operate   Inspect and resolve incidents`}
              </TerminalWindow>
            </div>
            <div className={styles.aiCard}>
              <h4>Add to Claude with MCP</h4>
              <TerminalWindow title="Claude Config">
                {`// claude_desktop_config.json
{
  "mcpServers": {
    "camunda": {
      "command": "npx",
      "args": ["-y", "c8ctl", "mcp-serve"],
      "env": {
        "CAMUNDA_CLUSTER_URL":
          "http://localhost:26500"
      }
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
                "Scale the Zeebe brokers to 3 partitions"
              </div>
            </div>
          </div>
        </section>

        {/* ─── More ways to run ─── */}
        <section className={clsx("container", styles.section)}>
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
                Deploy to any Kubernetes cluster with the official Camunda Helm
                chart.
              </p>
            </Link>
          </div>
        </section>

        {/* ─── Production deployments ─── */}
        <section className={clsx("container", styles.section)}>
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
        </section>

        {/* ─── Architecture ─── */}
        <section className={clsx("container", styles.section)}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Architecture at a glance</h2>
            <p className={styles.sectionSub}>
              Camunda's components work together to power process orchestration.
              Click any component to explore its documentation.
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
                to={useBaseUrl("docs/components/operate/operate-introduction/")}
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
            </div>
          </div>
        </section>

        {/* ─── Explore docs ─── */}
        <section className={styles.exploreSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Explore the docs</h2>
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
                <h3>Components</h3>
                <p>Learn about Modeler, Zeebe, Operate, Tasklist, and more.</p>
              </Link>
              <Link
                to={useBaseUrl("docs/apis-tools/working-with-apis-tools/")}
                className={styles.exploreCard}
              >
                <h3>APIs and tools</h3>
                <p>Client libraries, REST APIs, SDKs, and integrations.</p>
              </Link>
              <Link
                to={useBaseUrl("docs/self-managed/about-self-managed/")}
                className={styles.exploreCard}
              >
                <h3>Self-Managed</h3>
                <p>Host and operate Camunda on your own infrastructure.</p>
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
        </section>
      </div>
    </Layout>
  );
}

export default BuildWithCamunda;
