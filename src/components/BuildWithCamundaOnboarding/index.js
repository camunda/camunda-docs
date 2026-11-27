import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import CodeBlock from "@theme/CodeBlock";
import IconExternalLink from "@theme/Icon/ExternalLink";
import { HeroCardRow } from "../LandingHero";
import TerminalWindow from "./TerminalWindow";
import pageStyles from "../../pages/build-with-camunda.module.css";
import desktopModeler from "./assets/desktop-modeler.png";
import operateInstance from "./assets/operate-instance.png";
import downloads from "../../data/downloads.json";
import styles from "./styles.module.css";
import { detectOS } from "../../utils/detectOS";

export const INSTALL_COMMAND = "$ npm install -g @camunda8/cli";
export const SETUP_COMMAND = "$ c8ctl setup";
const CAMUNDA_MINOR = downloads.camundaRun.version
  .split(".")
  .slice(0, 2)
  .join(".");
const MANUAL_SETUP_ID = "manual-setup";
const SETUP_HERO_CARDS = [
  {
    kind: "image",
    title: "Operate",
    meta: "Process instance",
    src: operateInstance,
    alt: "Operate showing the Rocket Launch process instance with its diagram, instance history and variables",
  },
  {
    kind: "image",
    title: "Desktop Modeler",
    meta: "BPMN",
    src: desktopModeler,
    alt: "Desktop Modeler showing the Rocket Launch process with its properties panel",
  },
  {
    kind: "code",
    title: "Camunda CLI",
    meta: "c8ctl",
    float: true,
    code: "# Inspect your process instance\n$ c8ctl get process-instance \\\n    2251800272160253 --profile local",
  },
];
const OPERATE_URL = "http://localhost:8080/operate";

export function ExternalLink({ children, ...props }) {
  return (
    <Link {...props} target="_blank" rel="noopener noreferrer">
      {children}
      <IconExternalLink width={12} height={12} />
    </Link>
  );
}

function DownloadButtonIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
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

function openManualSetup() {
  const manualSetup = document.getElementById(MANUAL_SETUP_ID);
  if (manualSetup) manualSetup.open = true;
}

function Requirements() {
  return (
    <div className={styles.requirements}>
      <p className={styles.requirementLine}>
        <ExternalLink to="https://nodejs.org/en/download">
          Requires Node.js 22.18+
        </ExternalLink>
        <span className={styles.requirementSeparator} aria-hidden="true">
          ·
        </span>
        <Link to={`#${MANUAL_SETUP_ID}`} onClick={openManualSetup}>
          No Node.js? Set up manually
        </Link>
      </p>
    </div>
  );
}

function ExploreProcess() {
  return (
    <p>
      Open Operate at{" "}
      <ExternalLink to={OPERATE_URL}>{OPERATE_URL}</ExternalLink> and sign in
      with <code>demo</code> / <code>demo</code> to inspect your process
      instance.
    </p>
  );
}

function Guided() {
  return (
    <ol className={styles.steps} role="list">
      <li>
        <span className={pageStyles.stepNumber} aria-hidden="true">
          1
        </span>
        <section aria-labelledby="install-cli">
          <h3 id="install-cli">Install the Camunda CLI</h3>
          <TerminalWindow title="Terminal">{INSTALL_COMMAND}</TerminalWindow>
          <Requirements />
        </section>
      </li>
      <li>
        <span className={pageStyles.stepNumber} aria-hidden="true">
          2
        </span>
        <section aria-labelledby="run-setup">
          <h3 id="run-setup">Run guided setup</h3>
          <TerminalWindow title="Terminal">{SETUP_COMMAND}</TerminalWindow>
          <p className={styles.stepNote}>
            <strong>Essentials:</strong> Keep the <strong>Local cluster</strong>
            , <strong>Desktop Modeler</strong>, and{" "}
            <strong>Example project</strong> options selected.
          </p>
          <p className={styles.stepNote}>
            <strong>AI-assisted development:</strong> Configure how AI coding
            assistants use Camunda and connect to the local cluster via MCP on
            your machine.
          </p>
          <p className={styles.stepResult}>
            The first run downloads about 1 GB. Setup then starts your cluster,
            creates the example in a <code>rocket-launch</code> folder in your
            current directory, deploys it, and starts a process instance. If
            install or setup fails, see the{" "}
            <Link to="/docs/guides/getting-started-hello-world/">
              Hello World guide
            </Link>{" "}
            or{" "}
            <Link to="/docs/self-managed/quickstart/developer-quickstart/c8run-troubleshooting/">
              Troubleshoot Camunda 8 Run
            </Link>
            .
          </p>
        </section>
      </li>
      <li>
        <span className={pageStyles.stepNumber} aria-hidden="true">
          3
        </span>
        <section aria-labelledby="explore-process">
          <h3 id="explore-process">Explore your process</h3>
          <p>
            Once setup finishes, your process instance starts running on the
            local cluster, and you are shown a <strong>What's next</strong>{" "}
            summary with some example next steps:
          </p>
          <TerminalWindow title="Terminal" copyable={false}>
            {`What's next
  Process instance is running on the local cluster.
  Watch it:   http://localhost:8080/operate/processes/2251799813685249
              (login using demo / demo as username / password)
  Inspect it: c8ctl get process-instance 2251799813685249 --profile local
  Run again:  c8ctl run "/Users/you/rocket-launch/rocket-launch.bpmn" --profile local --variables '{"missionName":"Apollo","fuelLevel":80}'
  Project: /Users/you/rocket-launch
  Guide: https://docs.camunda.io/docs/guides/getting-started-hello-world/
  Operate: http://localhost:8080/operate (demo/demo)
✓ Setup finished.`}
          </TerminalWindow>
          <p className={styles.afterTerminal}>
            <strong>Watch it:</strong> Open your process instance in{" "}
            <Link to="/docs/components/operate/operate-introduction/">
              Operate
            </Link>{" "}
            and sign in with <code>demo</code> / <code>demo</code>.
          </p>
          <p>
            <strong>Desktop Modeler:</strong> Open{" "}
            <code>rocket-launch.bpmn</code> from the <code>rocket-launch</code>{" "}
            folder to see how it works and try your own changes.
          </p>
          <p>
            <strong>Use the CLI:</strong> Start using CLI commands to explore
            your process, such as inspecting your process instance, rerunning
            the process, and more. See{" "}
            <Link to="#cli-reference">Essential Camunda CLI commands</Link>.
          </p>
        </section>
      </li>
    </ol>
  );
}

function DownloadLinks({ product, detectedOS }) {
  return (
    <div className={styles.downloadLinks}>
      {Object.entries(product.links).flatMap(([os, releases]) =>
        releases.stable.map((link) => (
          <a
            key={link.url}
            href={link.url}
            className={clsx(
              pageStyles.downloadButton,
              os === detectedOS && styles.detectedDownload
            )}
          >
            <DownloadButtonIcon />
            {(os === "mac" ? `macOS ${link.label}` : link.label).replace(
              /\s+\(\.dmg\)$/,
              ""
            )}
            {os === detectedOS && (
              <span className={styles.detectedLabel}>Your OS</span>
            )}
          </a>
        ))
      )}
    </div>
  );
}

export function ManualSetup() {
  const { hash } = useLocation();
  const [detectedOS, setDetectedOS] = useState(null);

  useEffect(() => {
    setDetectedOS(detectOS());
  }, []);

  // Links such as "Set up manually" on the Downloads page target this section
  useEffect(() => {
    if (hash === `#${MANUAL_SETUP_ID}`) openManualSetup();
  }, [hash]);

  return (
    <details id={MANUAL_SETUP_ID} className={pageStyles.optionalSection}>
      <summary className={pageStyles.optionalSummary}>
        <h2>No Node.js? Set up manually</h2>
      </summary>
      <div className={clsx(pageStyles.optionalContent, styles.manualContent)}>
        <p>
          Download Camunda 8 Run, Desktop Modeler, and the example separately.
          Choose the downloads for your operating system.
        </p>
        <ol className={styles.manualSteps}>
          <li>
            <h3>
              Camunda 8 Run{" "}
              <span className={styles.version}>
                {downloads.camundaRun.version}
              </span>
            </h3>
            <p>
              Extract the archive, then{" "}
              <Link to="/docs/self-managed/quickstart/developer-quickstart/c8run/install-start/">
                start your local environment
              </Link>
              .
            </p>
            <DownloadLinks
              product={downloads.camundaRun}
              detectedOS={detectedOS}
            />
          </li>
          <li>
            <h3>
              Desktop Modeler{" "}
              <span className={styles.version}>
                {downloads.desktopModeler.version}
              </span>
            </h3>
            <p>
              <Link to="/docs/components/modeler/desktop-modeler/install-the-modeler/">
                Install the desktop app
              </Link>{" "}
              to edit and deploy your process models.
            </p>
            <DownloadLinks
              product={downloads.desktopModeler}
              detectedOS={detectedOS}
            />
          </li>
          <li>
            <h3>Rocket Launch example</h3>
            <p>
              <ExternalLink to="https://github.com/camunda/camunda-8-get-started/archive/refs/heads/main.zip">
                Download the example projects (.zip)
              </ExternalLink>{" "}
              and extract the archive. Open{" "}
              <code>1-rocket-launch/rocket-launch.bpmn</code> in Desktop
              Modeler.
            </p>
            <p>
              <Link to="/docs/components/modeler/desktop-modeler/connect-to-camunda-8/">
                Connect to your local cluster
              </Link>
              , then choose <strong>Deploy Camunda Project</strong> to include
              the decision table.{" "}
              <Link to="/docs/components/modeler/desktop-modeler/start-instance/">
                Start an instance
              </Link>{" "}
              with these variables:
            </p>
            <div className={styles.manualVariables}>
              <CodeBlock language="json">
                {'{\n  "missionName": "Odyssey",\n  "fuelLevel": 95\n}'}
              </CodeBlock>
            </div>
            <ExploreProcess />
          </li>
        </ol>
      </div>
    </details>
  );
}

export function SetupHero() {
  return (
    <div className={styles.hero}>
      <HeroCardRow cards={SETUP_HERO_CARDS} />
    </div>
  );
}

export default function LocalOnboarding() {
  return (
    <section
      id="self-managed"
      className={clsx(
        "container",
        pageStyles.section,
        pageStyles.cliInstallSection,
        styles.onboarding
      )}
    >
      <div className={pageStyles.sectionHeader}>
        <h2 className={pageStyles.sectionTitle}>
          Run Camunda locally{" "}
          <span className={pageStyles.versionBadge}>
            Camunda {CAMUNDA_MINOR}+
          </span>
        </h2>
        <p className={pageStyles.sectionSub}>
          Install the Camunda CLI (c8ctl) via npm and set up your local Camunda
          environment.
        </p>
        <p className={styles.legal}>
          By downloading our self-managed packages, you agree to our{" "}
          <ExternalLink to="https://legal.camunda.com/privacy-and-data-protection#product-privacy-policy">
            Privacy Policy
          </ExternalLink>{" "}
          and{" "}
          <ExternalLink to="https://legal.camunda.com/licensing-and-other-legal-terms#self-managed-non-production-terms">
            Terms of Use
          </ExternalLink>
          .
        </p>
      </div>
      <div className={styles.content}>
        <Guided />
      </div>
    </section>
  );
}
