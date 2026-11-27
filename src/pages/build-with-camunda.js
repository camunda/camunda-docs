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
import IconRunLocally from "../../docs/components/assets/icon-run-locally.svg";
import IconSaasTrial from "../../docs/components/assets/icon-saas-trial.svg";
import downloads from "../data/downloads.json";
import LocalOnboarding, {
  ExternalLink,
  ManualSetup,
} from "../components/BuildWithCamundaOnboarding";
import TerminalWindow from "../components/BuildWithCamundaOnboarding/TerminalWindow";

const CAMUNDA_RUN = downloads.camundaRun;
const CAMUNDA_RUN_STABLE_MINOR = CAMUNDA_RUN.version
  .split(".")
  .slice(0, 2)
  .join(".");

/* ─── Icon components ─── */

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
      aria-hidden="true"
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
      aria-hidden="true"
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

function CodeBlock({ children }) {
  return <code className={styles.inlineCode}>{children}</code>;
}

/* ─── Main page ─── */

function BuildWithCamunda() {
  const cliGuideUrl = useBaseUrl("docs/apis-tools/c8ctl/getting-started/");
  const clusterMcpGuideUrl = useBaseUrl(
    "docs/apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview/"
  );
  const docsMcpGuideUrl = useBaseUrl("docs/reference/mcp-docs/");

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
              <div className={clsx(styles.heroCard, styles.heroCardPriority)}>
                <span className={styles.recommendedBadge}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
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
                  <IconRunLocally
                    role="img"
                    aria-hidden="true"
                    width="64"
                    height="64"
                  />
                </span>
                <h2 className={styles.heroCardTitle}>Run Camunda locally</h2>
                <p className={styles.heroCardMeta}>
                  Camunda {CAMUNDA_RUN_STABLE_MINOR}+ · macOS, Linux, Windows
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
                    <CheckIcon color="#22a06b" /> Skills for your AI coding
                    assistant
                  </li>
                  <li>
                    <CheckIcon color="#22a06b" /> Data stays on your machine
                  </li>
                </ul>
                <Link
                  className={clsx(styles.heroCardCta, styles.heroCardLink)}
                  to="#self-managed"
                >
                  Start building <ArrowDown />
                </Link>
              </div>

              {/* SaaS (right) */}
              <div className={clsx(styles.heroCard, styles.heroCardSaas)}>
                <span className={clsx(styles.cardTag, styles.cardTagCloud)}>
                  Cloud
                </span>
                <span className={styles.heroCardIcon}>
                  <IconSaasTrial
                    role="img"
                    aria-hidden="true"
                    width="64"
                    height="64"
                  />
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
                    <CheckIcon color="#22a06b" /> Modeler included
                  </li>
                  <li>
                    <CheckIcon color="#22a06b" /> Skills for your AI coding
                    assistant
                  </li>
                  <li>
                    <CheckIcon color="#22a06b" /> Free LLM tokens to run your
                    first AI agent
                  </li>
                </ul>
                <ExternalLink
                  className={clsx(styles.heroCardCtaAlt, styles.heroCardLink)}
                  to="https://accounts.cloud.camunda.io/signup?utm_source=camunda_docs&utm_medium=cta&utm_campaign=cli_landing_page"
                >
                  Create free account
                </ExternalLink>
              </div>
            </div>
          </section>
        </div>

        <LocalOnboarding />

        <div className={clsx("container", styles.optionalSections)}>
          <section className={styles.cliBasics} id="cli-reference">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Essential Camunda CLI commands
              </h2>
            </div>
            <p className={styles.optionalNote}>
              If you selected the local cluster and example project, setup has
              already started a process for you. Use the following essential
              commands for further development, not as additional setup steps.
              Run the deployment commands from the <code>rocket-launch</code>{" "}
              folder that setup created.
            </p>
            <div className={styles.commandGrid}>
              <div className={styles.commandCard}>
                <h4>Manage your clusters</h4>
                <TerminalWindow title="Terminal">
                  {`$ c8ctl cluster start ${CAMUNDA_RUN_STABLE_MINOR}
$ c8ctl cluster stop`}
                </TerminalWindow>
              </div>
              <div className={styles.commandCard}>
                <h4>Deploy and start processes</h4>
                <TerminalWindow title="Terminal">
                  {`$ c8ctl deploy ./rocket-launch.bpmn plot-destination.dmn
# Save {"missionName": "Odyssey", "fuelLevel": 95} as variables.json
$ c8ctl create pi --id=rocket-launch --variables=@variables.json`}
                </TerminalWindow>
              </div>
              <div className={styles.commandCard}>
                <h4>Inspect process instances</h4>
                <TerminalWindow title="Terminal">
                  {`$ c8ctl search pi --id=rocket-launch
$ c8ctl get pi <process-instance-key> --variables
$ c8ctl search vars --name=missionResult`}
                </TerminalWindow>
              </div>
              <div className={styles.commandCard}>
                <h4>Monitor and debug</h4>
                <TerminalWindow title="Terminal">
                  {`$ c8ctl list inc --state=ACTIVE
$ c8ctl get inc <incident-key>
$ c8ctl resolve inc <incident-key>`}
                </TerminalWindow>
              </div>
            </div>

            <p
              className={styles.cliLearnMore}
              style={{ marginTop: "2.5rem", textAlign: "center" }}
            >
              See the <Link to={cliGuideUrl}>Camunda CLI documentation</Link> to
              learn more about managing Camunda directly from the terminal.
            </p>
          </section>

          <div
            className={styles.cliPrimaryDivider}
            style={{ marginTop: "6rem", marginBottom: "4.5rem" }}
            aria-hidden="true"
          />

          <details className={styles.optionalSection} id="ai-tools">
            <summary className={styles.optionalSummary}>
              <h2>Connect your AI coding assistant (optional)</h2>
            </summary>
            <div className={styles.optionalContent}>
              <p
                className={styles.cliInfoNote}
                style={{ marginBottom: "1.5rem" }}
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
                  This optional section builds on setup. You do not need to
                  repeat steps that <code>c8ctl setup</code> completed, such as
                  starting a cluster for example.
                </span>
              </p>
              <p className={styles.optionalNote}>
                If you selected <strong>AI assistant skills</strong> and{" "}
                <strong>Cluster MCP server</strong>, setup installed the skills
                and connected the supported AI coding assistants on your
                machine. You don't need to repeat that configuration. Otherwise,
                use c8ctl to install the skills and connect your AI coding
                assistant.
              </p>
              <div className={styles.aiGrid}>
                <div className={styles.aiCard}>
                  <h4 style={{ display: "flex", alignItems: "center" }}>
                    Install Camunda Skills
                  </h4>
                  <p>
                    c8ctl installs or updates the skills for the supported AI
                    coding assistants on your machine. It requires GitHub CLI
                    2.95 or later.
                  </p>
                  <TerminalWindow title="Terminal">
                    {`$ c8ctl skills install
$ c8ctl skills list`}
                  </TerminalWindow>
                  <p className={styles.aiAlternative}>
                    If c8ctl is not available, install the same skills as a
                    Claude Code plugin:
                  </p>
                  <TerminalWindow title="Claude Code">
                    {`$ claude plugin marketplace add camunda/skills
$ claude plugin install camunda-skills@camunda-skills`}
                  </TerminalWindow>
                  <TerminalWindow title="Available skills" copyable={false}>
                    {`  /camunda-c8ctl                    — install and configure c8ctl
  /camunda-ai-agents                — build AI agents in BPMN
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
                    Connect your AI coding assistant via MCP
                  </h4>
                  <p>
                    Install the Orchestration Cluster and Docs MCP servers for
                    supported AI coding assistants. The Docs server asks you to
                    sign in on first use.
                  </p>
                  <TerminalWindow title="Terminal">
                    {`$ c8ctl mcp install --docs --orchestration
$ c8ctl mcp list`}
                  </TerminalWindow>
                  <p className={styles.aiAlternative}>
                    If c8ctl is not available, add the servers manually in VS
                    Code:
                  </p>
                  <TerminalWindow title="mcp.json">
                    {`{
  "servers": {
    // Locally running Camunda 8 Run instance
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
                  <ExternalLink
                    to="https://github.com/camunda/skills"
                    style={{ fontWeight: 400, fontSize: "0.85rem" }}
                  >
                    Camunda Skills
                  </ExternalLink>
                  {", and the "}
                  <Link
                    to={clusterMcpGuideUrl}
                    style={{ fontWeight: 400, fontSize: "0.85rem" }}
                  >
                    Orchestration Cluster MCP
                  </Link>{" "}
                  and{" "}
                  <Link
                    to={docsMcpGuideUrl}
                    style={{ fontWeight: 400, fontSize: "0.85rem" }}
                  >
                    Docs MCP
                  </Link>{" "}
                  servers.
                </span>
              </p>
              <div className={styles.aiExamples}>
                <h4>...then ask your AI coding assistant</h4>
                <p className={styles.aiExamplesSub}>
                  Try one of these prompts to see Camunda Skills in action.
                </p>
                <div className={styles.aiExampleGrid}>
                  <div className={styles.aiExampleItem}>
                    <span className={styles.aiPromptIcon} aria-hidden="true">
                      💬
                    </span>
                    "Create an invoice approval process with a user task for
                    review and an HTTP connector to notify accounting"
                  </div>
                  <div className={styles.aiExampleItem}>
                    <span className={styles.aiPromptIcon} aria-hidden="true">
                      💬
                    </span>
                    "Build an AI agent to triage and route customer support
                    tickets to the correct team"
                  </div>
                  <div className={styles.aiExampleItem}>
                    <span className={styles.aiPromptIcon} aria-hidden="true">
                      💬
                    </span>
                    "Deploy order-process.bpmn and start an instance with
                    orderId=42"
                  </div>
                  <div className={styles.aiExampleItem}>
                    <span className={styles.aiPromptIcon} aria-hidden="true">
                      💬
                    </span>
                    "Investigate incidents on the payment-flow process and
                    resolve any that are caused by missing payment details"
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
                      aria-hidden="true"
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
            </div>
          </details>

          <ManualSetup />
        </div>

        {/* ─── More ways to run ─── */}
        <section
          className={clsx(styles.moreSection, styles.darkSection)}
          id="other-local-deployments"
        >
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                More ways to run Camunda locally
              </h2>
              <p className={styles.sectionSub}>
                Setup uses Camunda 8 Run, so you don't need Docker or Kubernetes
                for the quickstart. Setup doesn't configure these alternative
                deployments.
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
                  Run Camunda 8 locally for development and evaluation with{" "}
                  <CodeBlock>docker compose up -d</CodeBlock>.
                </p>
              </Link>
              <Link
                to={useBaseUrl(
                  "docs/self-managed/deployment/helm/cloud-providers/kind/"
                )}
                className={styles.wayCard}
              >
                <KubernetesIcon />
                <h3>Kubernetes</h3>
                <p>
                  Deploy to a local kind cluster with the official Camunda Helm
                  chart.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Production deployments ─── */}
        <section className={styles.exploreSection} id="production-deployments">
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Production deployment options
              </h2>
              <p className={styles.sectionSub}>
                Use these guides for production. <code>c8ctl setup</code>{" "}
                creates a local development environment; it doesn't provision
                production infrastructure.
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
                Setup downloads Camunda 8 Run and Desktop Modeler when selected.
                Use the catalog for other components or versions.
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
