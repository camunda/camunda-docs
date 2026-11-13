/**
 * Interactive components of the guided deployment. Every component reads the
 * same model (`model.js`) through the rules engine (`engine.js`), and the same
 * choices through the store (`store.ts`).
 *
 * - `GuidedProgress`: the steps, what is chosen, a share link, and reset.
 * - `ChoicePanel`: the questions of a step, or one question.
 * - `ChoiceSummary`: the choices of a step that other pages ask.
 * - `GuidedWhen`: content that applies only to some choices.
 * - `FollowsFromChoices`: what a step without a decision needs.
 * - `GuidedNext`: the previous and next page of the flow.
 * - `YourArchitecture`: the diagram and the bill of materials of the choices.
 * - `AllOptions`: the diagram of every option and rule.
 *
 * Every component renders the default view on the server, so the static HTML
 * holds all content and search indexes it.
 */
import React, { useEffect, useId, useMemo, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useHistory, useLocation } from "@docusaurus/router";
import Mermaid from "@theme/Mermaid";
import model from "./model";
import engine from "./engine";
import diagrams from "./mermaid";
import {
  applySearch,
  choose,
  dismissCleared,
  getSnapshot,
  reset,
  useGuided,
} from "./store";
import styles from "./styles.module.css";

const GUIDED_SEGMENT = "/reference-architecture/guided/";
const FALLBACK_BASE = "/docs/next/self-managed/reference-architecture/guided/";

/** The URL of the guide's folder, and the id of the current page. */
function useGuidedLocation() {
  const { pathname } = useLocation();
  return useMemo(() => {
    const index = pathname.indexOf(GUIDED_SEGMENT);
    const base =
      index < 0
        ? FALLBACK_BASE
        : pathname.slice(0, index + GUIDED_SEGMENT.length);
    const rest =
      index < 0
        ? ""
        : pathname.slice(index + GUIDED_SEGMENT.length).replace(/\/$/, "");
    const page = model.pages.find((p) => p.path === rest);
    return { base, pageId: page?.id };
  }, [pathname]);
}

function pageUrl(base: string, pageId: string) {
  const page = model.pagesById[pageId];
  return `${base}${page.path}/`;
}

/**
 * Keeps the query string in step with the choices, so the address bar is
 * always a link to the same architecture, and applies the choices of a link
 * that the reader followed inside the site.
 */
function useUrlSync() {
  const location = useLocation();
  const history = useHistory();
  const { choices, loaded } = useGuided();

  useEffect(() => {
    applySearch(location.search);
  }, [location.search]);

  useEffect(() => {
    if (!loaded) return;
    const current = getSnapshot().choices;
    const search = engine.searchWithChoices(location.search, current);
    if (search !== location.search) {
      history.replace({ ...location, search });
    }
    // Only a change of the choices writes the URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choices, loaded]);
}

function ShareButton({ base }: { base: string }) {
  const { choices } = useGuided();
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    const url = `${window.location.origin}${pageUrl(
      base,
      "your-architecture"
    )}${engine.searchWithChoices("", choices)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy the link to your architecture:", url);
    }
  };
  return (
    <>
      <button
        type="button"
        className="button button--sm button--secondary"
        onClick={onClick}
      >
        Copy link to your architecture
      </button>
      <span role="status" className={styles.status}>
        {copied ? "Link copied" : ""}
      </span>
    </>
  );
}

function ResetButton() {
  const { choices } = useGuided();
  const empty = Object.keys(choices).length === 0;
  return (
    <button
      type="button"
      className="button button--sm button--outline button--secondary"
      onClick={() => {
        if (window.confirm("Clear every choice of the guided deployment?")) {
          reset();
        }
      }}
      disabled={empty}
    >
      Reset choices
    </button>
  );
}

const STATUS_TEXT = {
  done: "Done",
  open: "To decide",
  info: "Follows from your choices",
};

/**
 * The steps of the guide, with what the reader chose. Place it once on every
 * guided page, near the top.
 */
export function GuidedProgress() {
  useUrlSync();
  const { base, pageId } = useGuidedLocation();
  const { resolution } = useGuided();
  const steps = engine.progress(resolution);
  const currentStep = pageId ? model.pagesById[pageId]?.step : undefined;
  const decisions = steps.filter((s) => s.status !== "info");
  const done = decisions.filter((s) => s.status === "done").length;

  return (
    <nav className={styles.progress} aria-label="Guided deployment progress">
      <div className={styles.progressHeader}>
        <strong>Your guided deployment</strong>
        <span>
          {done} of {decisions.length} steps decided
        </span>
      </div>
      <ol className={styles.progressSteps}>
        {steps.map(({ step, status, selections }) => (
          <li
            key={step.id}
            className={clsx(
              styles.progressStep,
              styles[`status-${status}`],
              currentStep === step.id && styles.current
            )}
          >
            <Link
              to={pageUrl(base, step.page)}
              aria-current={currentStep === step.id ? "step" : undefined}
            >
              <span className={styles.stepMarker} aria-hidden="true">
                {status === "done" ? "✓" : status === "info" ? "i" : "•"}
              </span>
              <span className={styles.stepTitle}>{step.title}</span>
              <span className={styles.srOnly}> ({STATUS_TEXT[status]})</span>
            </Link>
            {selections.length > 0 && (
              <span className={styles.stepSelections}>
                {selections
                  .map((s) =>
                    s.source === "default" ? `${s.label} (default)` : s.label
                  )
                  .join(" · ")}
              </span>
            )}
          </li>
        ))}
        <li
          className={clsx(
            styles.progressStep,
            pageId === "your-architecture" && styles.current
          )}
        >
          <Link
            to={pageUrl(base, "your-architecture")}
            aria-current={pageId === "your-architecture" ? "step" : undefined}
          >
            <span className={styles.stepMarker} aria-hidden="true">
              ★
            </span>
            <span className={styles.stepTitle}>Your architecture</span>
          </Link>
        </li>
      </ol>
      <div className={styles.actions}>
        <ShareButton base={base} />
        <ResetButton />
      </div>
    </nav>
  );
}

function ClearedNotice({ questionIds }: { questionIds: string[] }) {
  const { cleared, changed } = useGuided();
  const visible =
    cleared.length > 0 &&
    changed !== undefined &&
    questionIds.includes(changed);
  return (
    <div role="status" aria-live="polite">
      {visible && (
        <div className={clsx("alert alert--warning", styles.notice)}>
          <p>Your change cleared later choices that no longer apply:</p>
          <ul>
            {cleared.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <button
            type="button"
            className="button button--sm button--secondary"
            onClick={dismissCleared}
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

function Question({ questionId }: { questionId: string }) {
  const id = useId();
  const { resolution } = useGuided();
  const state = resolution.questions[questionId];
  const { question } = state;

  if (!state.applicable) {
    return (
      <fieldset
        className={clsx(styles.question, styles.notApplicable)}
        disabled
      >
        <legend>{question.label}</legend>
        <p className={styles.reason}>
          Doesn't apply to your choices. {question.notApplicableReason}.
        </p>
      </fieldset>
    );
  }

  return (
    <fieldset className={styles.question}>
      <legend>{question.label}</legend>
      <div className={styles.options}>
        {state.options.map(({ option, enabled, reasons }) => {
          const inputId = `${id}-${option.id}`;
          const reasonId = `${inputId}-reason`;
          const checked = state.value === option.id;
          return (
            <label
              key={option.id}
              htmlFor={inputId}
              className={clsx(
                styles.option,
                checked && styles.checked,
                !enabled && styles.disabled
              )}
            >
              <input
                type="radio"
                id={inputId}
                name={`${id}-${questionId}`}
                value={option.id}
                checked={checked}
                disabled={!enabled}
                aria-describedby={reasons.length ? reasonId : undefined}
                onChange={() => choose(questionId, option.id)}
                // A default is already checked, so selecting it fires no
                // change: a click confirms it as the reader's choice.
                onClick={() => {
                  if (checked && state.source !== "chosen") {
                    choose(questionId, option.id);
                  }
                }}
              />
              <span className={styles.optionText}>
                <span className={styles.optionLabel}>
                  {option.label}
                  {checked && state.source === "default" && (
                    <span className={styles.badge}>Default</span>
                  )}
                  {checked && state.source === "only" && (
                    <span className={styles.badge}>Only option</span>
                  )}
                </span>
                {option.description && (
                  <span className={styles.optionDescription}>
                    {option.description}
                  </span>
                )}
                {reasons.length > 0 && (
                  <span id={reasonId} className={styles.reason}>
                    {reasons.join(". ")}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {state.source === "chosen" && (
        <button
          type="button"
          className={clsx("button button--sm button--link", styles.clear)}
          onClick={() => choose(questionId, undefined)}
        >
          Clear this choice
        </button>
      )}
    </fieldset>
  );
}

/**
 * The choice panel of a step (`step="network"`) or of one question
 * (`question="auth"`).
 */
export function ChoicePanel({
  step,
  question,
}: {
  step?: string;
  question?: string;
}) {
  const questionIds = question
    ? [question]
    : step
      ? model.stepsById[step].questions
      : [];
  return (
    <section
      className={styles.panel}
      aria-label={`Your choice: ${
        step
          ? model.stepsById[step].title
          : model.questionsById[question!].label
      }`}
    >
      {questionIds.map((id) => (
        <Question key={id} questionId={id} />
      ))}
      <ClearedNotice questionIds={questionIds} />
    </section>
  );
}

/**
 * Content that applies only to some choices. Pass question ids as props, with
 * an option id or a list of them: `<GuidedWhen compute="ecs">` or
 * `<GuidedWhen compute={["eks", "ec2"]}>`. Unanswered questions show the
 * content, with a note that says which choices it applies to, so the static
 * HTML holds everything.
 *
 * With `chosenOnly`, the content shows only once the reader has made the
 * choices, for sentences such as "You chose no management plane".
 */
export function GuidedWhen({
  children,
  chosenOnly = false,
  ...conditions
}: {
  children: React.ReactNode;
  chosenOnly?: boolean;
  [questionId: string]: React.ReactNode | boolean | string | string[];
}) {
  const { chosen } = useGuided().resolution;
  const condition = Object.fromEntries(
    Object.entries(conditions).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.map(String) : [String(value)],
    ])
  );
  const open = Object.keys(condition).filter(
    (key) => chosen[key] === undefined
  );
  if (chosenOnly && open.length > 0) return null;
  if (!engine.contentApplies(condition, chosen)) return null;
  return (
    <div className={clsx(open.length > 0 && styles.when)}>
      {open.length > 0 && (
        <p className={styles.whenNote}>
          Applies to{" "}
          {open
            .map((key) =>
              condition[key]
                .map((id) => engine.findOption(key, id)?.label ?? id)
                .join(" or ")
            )
            .join(", with ")}
        </p>
      )}
      {children}
    </div>
  );
}

/**
 * A read-only summary of the questions of a step that other pages ask, such
 * as the overview of the Orchestration Cluster. Each question is asked on one
 * page only; the summary links to it.
 */
export function ChoiceSummary({ step }: { step: string }) {
  const { base } = useGuidedLocation();
  const { resolution } = useGuided();
  const title = model.stepsById[step].title;
  return (
    <section
      className={clsx(styles.panel, styles.question)}
      aria-label={`Your choices: ${title}`}
    >
      <p className={styles.optionLabel}>Your choices for this step</p>
      <ul>
        {model.stepsById[step].questions.map((id) => {
          const state = resolution.questions[id];
          const page = model.pagesById[state.question.page];
          const option =
            state.value === undefined
              ? undefined
              : engine.findOption(id, state.value);
          return (
            <li key={id}>
              {state.question.label}{" "}
              <strong>
                {!state.applicable
                  ? "Doesn't apply"
                  : option
                    ? option.label
                    : "Not decided"}
              </strong>
              {state.source === "default" && " (default)"}. Decide it on{" "}
              <Link to={pageUrl(base, page.id)}>{page.title}</Link>.
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/**
 * What follows from the choices for a step without a decision of its own,
 * such as the buckets of object storage.
 */
export function FollowsFromChoices({ step }: { step: string }) {
  const { resolution } = useGuided();
  const entry = engine
    .billOfMaterials(resolution)
    .find((s) => s.step.id === step);
  if (!entry || entry.notes.length === 0) return null;
  return (
    <section
      className={clsx(styles.panel, styles.question)}
      aria-label={`What ${entry.step.title.toLowerCase()} needs for your choices`}
    >
      <p className={styles.optionLabel}>
        What {entry.step.title.toLowerCase()} needs for your choices
      </p>
      <ul>
        {entry.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  );
}

/** The previous and next page of the flow. Place it at the end of a page. */
export function GuidedNext() {
  const { base, pageId } = useGuidedLocation();
  const { resolution, choices } = useGuided();
  if (!pageId) return null;
  const next = engine.nextPage(pageId, resolution.chosen);
  const previous = engine.previousPage(pageId, resolution.chosen);
  const stepId = model.pagesById[pageId].step;
  const open = stepId
    ? engine.progress(resolution).find((s) => s.step.id === stepId)?.status ===
      "open"
    : false;
  const search = engine.searchWithChoices("", choices);
  return (
    <nav className={styles.next} aria-label="Guided deployment steps">
      {previous ? (
        <Link
          className="pagination-nav__link pagination-nav__link--prev"
          to={`${pageUrl(base, previous.id)}${search}`}
        >
          <div className="pagination-nav__sublabel">Previous step</div>
          <div className="pagination-nav__label">{previous.title}</div>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          className="pagination-nav__link pagination-nav__link--next"
          to={`${pageUrl(base, next.id)}${search}`}
        >
          <div className="pagination-nav__sublabel">
            {open ? "Next step (this one isn't decided yet)" : "Next step"}
          </div>
          <div className="pagination-nav__label">{next.title}</div>
        </Link>
      )}
    </nav>
  );
}

/**
 * The architecture of the reader's choices: a diagram, the bill of
 * materials, and the Mermaid source.
 */
export function YourArchitecture() {
  const { base } = useGuidedLocation();
  const { choices, resolution } = useGuided();
  const diagram = useMemo(
    () => diagrams.architectureDiagram(choices),
    [choices]
  );
  const bom = engine.billOfMaterials(resolution);
  const open = engine
    .progress(resolution)
    .filter((s) => s.status === "open")
    .map((s) => s.step);

  return (
    <div className={styles.architecture}>
      {open.length > 0 && (
        <div className={clsx("alert alert--info", styles.notice)}>
          Still to decide:{" "}
          {open.map((step, index) => (
            <React.Fragment key={step.id}>
              {index > 0 && ", "}
              <Link to={pageUrl(base, step.page)}>{step.title}</Link>
            </React.Fragment>
          ))}
          . The diagram uses the defaults until you choose.
        </div>
      )}
      <figure className={styles.figure}>
        <Mermaid value={diagram} />
        <figcaption>
          The architecture of your choices. The table below lists the same
          choices as text.
        </figcaption>
      </figure>
      <table className={styles.bom}>
        <caption>Bill of materials</caption>
        <thead>
          <tr>
            <th scope="col">Step</th>
            <th scope="col">Decision</th>
            <th scope="col">Your choice</th>
          </tr>
        </thead>
        <tbody>
          {bom.flatMap(({ step, rows, notes }) => {
            const stepLink = (
              <Link to={pageUrl(base, step.page)}>{step.title}</Link>
            );
            const lines = [
              ...rows.map((row, index) => (
                <tr key={`${step.id}-${row.question.id}`}>
                  <td>{index === 0 ? stepLink : null}</td>
                  <td>
                    <Link to={pageUrl(base, row.question.page)}>
                      {row.question.label}
                    </Link>
                  </td>
                  <td>
                    {row.option ? row.option.label : <em>Not decided</em>}
                    {row.source === "default" && " (default)"}
                    {row.source === "only" && " (the only option)"}
                  </td>
                </tr>
              )),
              ...notes.map((note, index) => (
                <tr key={`${step.id}-note-${index}`}>
                  <td>{rows.length === 0 && index === 0 ? stepLink : null}</td>
                  <td>Follows from your choices</td>
                  <td>{note}</td>
                </tr>
              )),
            ];
            return lines;
          })}
        </tbody>
      </table>
      <details className={styles.details}>
        <summary>Mermaid source of the diagram</summary>
        <pre>
          <code>{diagram}</code>
        </pre>
      </details>
    </div>
  );
}

/** Every option of the guide and the rules between them, as a diagram. */
export function AllOptions() {
  const diagram = useMemo(() => diagrams.allOptionsDiagram(), []);
  return (
    <details className={styles.details}>
      <summary>All options and how they depend on each other</summary>
      <p>
        Each box is an option of a step. A dotted arrow labeled{" "}
        <strong>requires</strong> points at the earlier choice that the option
        needs, a line labeled <strong>excludes</strong> ends at an option that
        the choice rules out, and an arrow labeled <strong>asks</strong> points
        at a question that only some choices raise. Dashed boxes aren't part of
        the guided deployment.
      </p>
      <Mermaid value={diagram} />
    </details>
  );
}
