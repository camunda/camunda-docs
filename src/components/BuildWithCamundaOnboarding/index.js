import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import IconExternalLink from "@theme/Icon/ExternalLink";
import TerminalWindow from "./TerminalWindow";
import pageStyles from "../../pages/build-with-camunda.module.css";
import downloads from "../../data/downloads.json";
import styles from "./styles.module.css";
import { detectOS } from "../../utils/detectOS";

const INSTALL_COMMAND = "$ npm install -g @camunda8/cli";
const SETUP_COMMAND = "$ c8ctl setup";
const CAMUNDA_MINOR = downloads.camundaRun.version
  .split(".")
  .slice(0, 2)
  .join(".");

function ExternalLink({ children, ...props }) {
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

function Requirements() {
  return (
    <div className={styles.requirements}>
      <p>
        Requires{" "}
        <ExternalLink to="https://nodejs.org/en/download">
          Node.js 22.18+
        </ExternalLink>
      </p>
    </div>
  );
}

function ExploreProcess() {
  return (
    <p>
      Follow the Operate link printed by setup to inspect your process. Sign in
      with <code>demo</code> / <code>demo</code>.
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
          <p>
            Keep <strong>Local cluster</strong>,{" "}
            <strong>Desktop Modeler</strong>, and{" "}
            <strong>Example project</strong> selected.
          </p>
          <TerminalWindow title="Terminal">{SETUP_COMMAND}</TerminalWindow>
          <p className={styles.stepResult}>
            The setup downloads the components, starts your cluster, deploys the
            example, and starts a process instance. It optionally sets up
            integrations with your AI agent.
          </p>
        </section>
      </li>
      <li>
        <span className={pageStyles.stepNumber} aria-hidden="true">
          3
        </span>
        <section aria-labelledby="explore-process">
          <h3 id="explore-process">Explore your process</h3>
          <ExploreProcess />
          <p>
            Open the example in Desktop Modeler to see how it works and try your
            own changes.
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
            target="_blank"
            rel="noopener noreferrer"
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
          </a>
        ))
      )}
    </div>
  );
}

function ManualSetup({ detectedOS }) {
  return (
    <details className={pageStyles.bundleFallback}>
      <summary
        className={clsx(pageStyles.bundleFallbackSummary, styles.manualSummary)}
      >
        <span>
          Download and set up manually <small>No Node? No Problem</small>
        </span>
      </summary>
      <div
        className={clsx(pageStyles.bundleFallbackContent, styles.manualContent)}
      >
        <p>
          Download the runtime, modeler, and example separately. Choose the
          downloads for your operating system.
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
          </li>
        </ol>
      </div>
    </details>
  );
}

export default function LocalOnboarding() {
  const [detectedOS, setDetectedOS] = useState(null);

  useEffect(() => {
    setDetectedOS(detectOS());
  }, []);

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
          Install the Camunda CLI via npm and start a set up your local Camunda
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
        <ManualSetup detectedOS={detectedOS} />
        <p className={styles.reference}>
          <Link to="/docs/apis-tools/c8ctl/getting-started/">
            Explore all CLI commands
          </Link>
        </p>
      </div>
    </section>
  );
}
