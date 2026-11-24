import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import IconExternalLink from "@theme/Icon/ExternalLink";
import TerminalWindow from "./TerminalWindow";
import pageStyles from "../../pages/build-with-camunda.module.css";
import downloads from "../../data/downloads.json";
import styles from "./styles.module.css";

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

function Requirements() {
  return (
    <div className={styles.requirements}>
      <p>
        Requires{" "}
        <ExternalLink to="https://nodejs.org/en/download">
          Node.js 22.18+
        </ExternalLink>
      </p>
      <p>macOS (Apple Silicon or Intel), Windows (x64), or Linux (x64)</p>
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

function ExploreLink() {
  return (
    <Link
      className={styles.exploreLink}
      to="/docs/guides/getting-started-hello-world/#step-3-explore-your-process-in-operate"
    >
      Explore the example
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 12h14m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
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
          <p>Open a terminal in your projects folder.</p>
          <Requirements />
          <TerminalWindow title="Terminal">{INSTALL_COMMAND}</TerminalWindow>
          <p className={styles.stepResult}>
            You can now use <code>c8ctl</code> from your terminal.
          </p>
        </section>
      </li>
      <li>
        <span className={pageStyles.stepNumber} aria-hidden="true">
          2
        </span>
        <section aria-labelledby="run-setup">
          <h3 id="run-setup">Run guided setup</h3>
          <p>
            Choose <strong>Rocket Launch</strong> in the wizard. Keep{" "}
            <strong>Local cluster</strong>, <strong>Desktop Modeler</strong>,
            and <strong>Example project</strong> selected.
          </p>
          <TerminalWindow title="Terminal">{SETUP_COMMAND}</TerminalWindow>
          <p className={styles.stepResult}>
            The wizard downloads the components, deploys the example, and starts
            a process instance. AI integrations are optional.
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
          <ExploreLink />
        </section>
      </li>
    </ol>
  );
}

function DownloadLinks({ product }) {
  return (
    <div className={styles.downloadLinks}>
      {Object.entries(product.links).flatMap(([os, releases]) =>
        releases.stable.map((link) => (
          <ExternalLink
            key={link.url}
            to={link.url}
            className={pageStyles.downloadButton}
          >
            {os === "mac" ? `macOS ${link.label}` : link.label}
          </ExternalLink>
        ))
      )}
    </div>
  );
}

function ManualSetup() {
  return (
    <details className={pageStyles.bundleFallback}>
      <summary
        className={clsx(pageStyles.bundleFallbackSummary, styles.manualSummary)}
      >
        <span>
          Download and set up manually
          <small>No CLI required</small>
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
            <DownloadLinks product={downloads.camundaRun} />
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
            <DownloadLinks product={downloads.desktopModeler} />
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
            <CodeBlock language="json">
              {'{\n  "missionName": "Odyssey",\n  "fuelLevel": 95\n}'}
            </CodeBlock>
          </li>
        </ol>
      </div>
    </details>
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
          Install, set up, and explore your first process.
        </p>
      </div>
      <div className={styles.content}>
        <Guided />
        <ManualSetup />
        <p className={styles.reference}>
          <Link to="/docs/apis-tools/c8ctl/getting-started/">
            Explore all CLI commands
          </Link>
        </p>
        <p className={styles.legal}>
          For local development and evaluation. Downloads are subject to our{" "}
          <ExternalLink to="https://legal.camunda.com/licensing-and-other-legal-terms#self-managed-non-production-terms">
            Terms of Use
          </ExternalLink>{" "}
          and{" "}
          <ExternalLink to="https://legal.camunda.com/privacy-and-data-protection#product-privacy-policy">
            Privacy Policy
          </ExternalLink>
          .
        </p>
      </div>
    </section>
  );
}
