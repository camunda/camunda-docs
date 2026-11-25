import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";
import styles from "./styles.module.css";

/**
 * Landing page hero: copy (children) beside a live UI card on a pixel grid.
 * The card is described by data, see docs/reference/react-components/_hero-data.js.
 * Pass href (a path inside the docs, such as /reference/...) to make the card a
 * link, with ariaLabel as its accessible name and hover tooltip. The path is prefixed with the
 * current docs version, so on Next it resolves under /next/. Without href the
 * card is decorative.
 * Card kinds: "notes", "table", "flow", "request", "code", "modeler".
 */

function Cell({ value }) {
  if (typeof value === "string") return value;
  if (value.role) {
    return (
      <span className={clsx(styles.role, styles[value.role])}>
        <i />
        {value.label}
      </span>
    );
  }
  if (value.status) {
    return (
      <span className={clsx(styles.pill, styles[value.status])}>
        {value.label}
      </span>
    );
  }
  if (value.num) return <span className={styles.num}>{value.num}</span>;
  return null;
}

function CardHead({ title, meta, children }) {
  return (
    <div className={styles.cardHead}>
      {children || <span className={styles.cardTitle}>{title}</span>}
      <span className={styles.cardMeta}>{meta}</span>
    </div>
  );
}

function Notes({ card }) {
  return (
    <>
      <CardHead title={card.title} meta={card.meta} />
      <ul className={styles.notes}>
        {card.rows.map(([title, tag]) => (
          <li key={title}>
            <span className={styles.noteTitle}>{title}</span>
            <span className={styles.tag}>
              <Cell value={tag} />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function Table({ card }) {
  return (
    <>
      <CardHead title={card.title} meta={card.meta} />
      <table className={styles.table}>
        {card.columns && (
          <thead>
            <tr>
              {card.columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {card.rows.map((row) => (
            <tr key={String(row[0])}>
              {row.map((cell, i) => (
                <td key={i}>
                  <Cell value={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Flow({ card }) {
  return (
    <>
      <CardHead title={card.title} meta={card.meta} />
      <div className={styles.flow}>
        <span className={styles.event} aria-hidden="true" />
        {card.steps.map((s) => (
          <React.Fragment key={s.label}>
            <span
              className={clsx(styles.seq, s.state === "next" && styles.future)}
              aria-hidden="true"
            />
            <div className={clsx(styles.task, styles[s.role], styles[s.state])}>
              <i className={styles.marker} aria-hidden="true" />
              <span>{s.label}</span>
              <span className={styles.sr}>{s.note}</span>
              {s.state === "done" && (
                <span className={styles.doneBadge} aria-hidden="true">
                  <svg viewBox="0 0 10 10">
                    <path
                      d="M2.4 5.3 4.2 7.1 7.7 3.1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
              {s.adhoc && (
                <b className={styles.adhoc} aria-hidden="true">
                  ~
                </b>
              )}
            </div>
          </React.Fragment>
        ))}
        <span className={clsx(styles.seq, styles.future)} aria-hidden="true" />
        <span className={clsx(styles.event, styles.end)} aria-hidden="true" />
      </div>
    </>
  );
}

// Light JSON highlighting: keys in the heading color, string values in blue.
function Json({ text }) {
  return text.split(/("[^"]*"\s*:?)/g).map((part, i) => {
    if (!part.startsWith('"')) return part;
    const isKey = part.trimEnd().endsWith(":");
    return (
      <span key={i} className={isKey ? styles.jsonKey : styles.jsonString}>
        {part}
      </span>
    );
  });
}

function Request({ card }) {
  return (
    <>
      <CardHead meta="REST API">
        <div className={styles.reqLine}>
          <span className={styles.method}>{card.method}</span>
          <code>{card.path}</code>
        </div>
      </CardHead>
      <pre className={styles.pre}>
        <Json text={card.body} />
      </pre>
      <div className={styles.resp}>
        <Cell value={card.status} />
        <code>{card.result}</code>
      </div>
    </>
  );
}

function Code({ card }) {
  return (
    <>
      <CardHead title={card.title} meta={card.meta} />
      <pre className={styles.pre}>{card.code}</pre>
      <div className={styles.resp}>
        <Cell value={card.status} />
        <code>{card.result}</code>
      </div>
    </>
  );
}

// Palette symbols, as in the Modeler: start, intermediate, end, gateway, task.
function PaletteSymbol({ type }) {
  const common = { fill: "none", stroke: "currentColor" };
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      {type === "start" && (
        <circle cx="8" cy="8" r="6" {...common} strokeWidth="1.3" />
      )}
      {type === "end" && (
        <circle cx="8" cy="8" r="6" {...common} strokeWidth="2.8" />
      )}
      {type === "gateway" && (
        <path d="M8 1.5 14.5 8 8 14.5 1.5 8Z" {...common} strokeWidth="1.3" />
      )}
      {type === "task" && (
        <rect
          x="1.5"
          y="3.5"
          width="13"
          height="9"
          rx="2"
          {...common}
          strokeWidth="1.3"
        />
      )}
    </svg>
  );
}

// A mini Modeler: symbol palette beside a small BPMN diagram.
function Modeler({ card }) {
  return (
    <>
      <CardHead title={card.title} meta={card.meta} />
      <div className={styles.modeler}>
        <div className={styles.palette}>
          {["start", "task", "gateway", "end"].map((t) => (
            <PaletteSymbol key={t} type={t} />
          ))}
        </div>
        <svg
          className={styles.canvas}
          viewBox="0 0 260 84"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="lh-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 10 5 0 10Z" fill="currentColor" />
            </marker>
          </defs>
          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="16" cy="42" r="9" />
            <path d="M25 42H52" markerEnd="url(#lh-arrow)" />
            <rect x="53" y="26" width="64" height="32" rx="6" />
            <path d="M118 42H146" markerEnd="url(#lh-arrow)" />
            <path d="M162 28 176 42 162 56 148 42Z" />
            <path
              d="M156.5 36.5 167.5 47.5M167.5 36.5 156.5 47.5"
              strokeWidth="2"
            />
            <path d="M162 28V16H212" markerEnd="url(#lh-arrow)" />
            <path d="M162 56V68H212" markerEnd="url(#lh-arrow)" />
            <circle cx="222" cy="16" r="9" strokeWidth="3.2" />
            <circle cx="222" cy="68" r="9" strokeWidth="3.2" />
          </g>
          <rect
            className={styles.selection}
            x="49"
            y="22"
            width="72"
            height="40"
            rx="8"
          />
          <text
            x="85"
            y="46"
            textAnchor="middle"
            fontSize="11"
            fontWeight="500"
            fill="currentColor"
          >
            {card.task}
          </text>
        </svg>
      </div>
    </>
  );
}

const KINDS = {
  notes: Notes,
  table: Table,
  flow: Flow,
  request: Request,
  code: Code,
  modeler: Modeler,
};

export default function LandingHero({ card, href, ariaLabel, children }) {
  const Body = KINDS[card.kind];
  const version = useActiveVersion();
  const basePath = version?.path?.replace(/\/$/, "") ?? "";
  const to = href && `${basePath}${href}`;
  const cardClass = clsx(styles.card, href && styles.cardLink);
  return (
    <div className={styles.hero}>
      <div className={styles.copy}>{children}</div>
      <div className={styles.art}>
        <div className={styles.field} aria-hidden="true" />
        {href ? (
          <Link
            to={to}
            className={cardClass}
            aria-label={ariaLabel}
            title={ariaLabel}
          >
            <Body card={card} />
          </Link>
        ) : (
          <div className={cardClass} aria-hidden="true">
            <Body card={card} />
          </div>
        )}
      </div>
    </div>
  );
}
