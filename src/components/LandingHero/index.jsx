import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";
import styles from "./styles.module.css";

/**
 * Landing page hero: copy (children) beside a live UI card on a pixel grid.
 * The card is described by data, see docs/reference/react-components/_hero-data.js.
 * Pass href (a path inside the docs, such as /reference/...) to make the card a
 * link, with ariaLabel describing the destination (it is added after the card's visible
 * title to form the accessible name, and is also the hover tooltip). The path is prefixed with the
 * current docs version, so on Next it resolves under /next/. Without href the
 * card is decorative.
 * Set unversioned for a site page outside the docs (such as /build-with-camunda/),
 * so the version prefix is not added.
 * Pass overlay (card data) to float a second card over the bottom-right
 * corner of the main card. It is part of the same link as the main card.
 * Notes cards can set icon: "agent" (purple AI agent badge) and any card
 * iconSrc (an imported image) to show that image by the title.
 * Card kinds: "notes", "table", "flow", "request", "code", "modeler", "adhoc", "hub".
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

// Purple AI agent badge (circle with a sparkle), as on the Modeler diagram.
function AgentBadge() {
  return (
    <svg className={styles.agentBadge} viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="var(--hero-agent)" />
      <path
        d="M8 3.2 9.4 6.6 12.8 8 9.4 9.4 8 12.8 6.6 9.4 3.2 8 6.6 6.6Z"
        fill="#fff"
      />
    </svg>
  );
}

function CardHead({ title, meta, icon, iconSrc, children }) {
  return (
    <div className={styles.cardHead}>
      {children || (
        <span className={styles.cardTitle}>
          {icon === "agent" && <AgentBadge />}
          {iconSrc && <img className={styles.titleIcon} src={iconSrc} alt="" />}
          {title}
        </span>
      )}
      <span className={styles.cardMeta}>{meta}</span>
    </div>
  );
}

function Notes({ card }) {
  return (
    <>
      <CardHead
        title={card.title}
        meta={card.meta}
        icon={card.icon}
        iconSrc={card.iconSrc}
      />
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
      {card.body && (
        <pre className={styles.pre}>
          <Json text={card.body} />
        </pre>
      )}
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
      <CardHead title={card.title} meta={card.meta} iconSrc={card.iconSrc} />
      <pre className={styles.pre}>{card.code}</pre>
      {card.status && (
        <div className={styles.resp}>
          <Cell value={card.status} />
          <code>{card.result}</code>
        </div>
      )}
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
      {type === "intermediate" && (
        <>
          <circle cx="8" cy="8" r="6" {...common} strokeWidth="1.2" />
          <circle cx="8" cy="8" r="3.8" {...common} strokeWidth="1.2" />
        </>
      )}
      {type === "subprocess" && (
        <>
          <rect
            x="1.5"
            y="3.5"
            width="13"
            height="9"
            rx="2"
            {...common}
            strokeWidth="1.3"
          />
          <path d="M6.5 9.5h3M8 8v3" {...common} strokeWidth="1" />
        </>
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
          {[
            "start",
            "intermediate",
            "end",
            "gateway",
            "task",
            "subprocess",
          ].map((t) => (
            <PaletteSymbol key={t} type={t} />
          ))}
        </div>
        <svg
          className={clsx(styles.canvas, styles.canvasDots)}
          viewBox="0 0 240 84"
          preserveAspectRatio="xMinYMid meet"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="lh-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0 10 5 0 10Z" fill="currentColor" />
            </marker>
          </defs>
          <g fill="none" stroke="currentColor" strokeWidth="1.3">
            <circle cx="12" cy="36" r="7" />
            <path d="M19 36H29" markerEnd="url(#lh-arrow)" />
            <rect x="30" y="24" width="48" height="24" rx="4" />
            <path d="M78 36H95" markerEnd="url(#lh-arrow)" />
            <rect x="96" y="24" width="48" height="24" rx="4" />
            <path d="M144 36H158" markerEnd="url(#lh-arrow)" />
            <path d="M168 26 178 36 168 46 158 36Z" strokeWidth="1.5" />
            <path
              d="M164.5 32.5 171.5 39.5M171.5 32.5 164.5 39.5"
              strokeWidth="1.8"
            />
            <path d="M178 36H189" markerEnd="url(#lh-arrow)" />
            <rect x="190" y="24" width="46" height="24" rx="4" />
            <path d="M168 46V70H54V49" markerEnd="url(#lh-arrow)" />
          </g>
          <circle cx="37" cy="30" r="4" fill="currentColor" />
          <circle cx="103" cy="30" r="4.2" fill="var(--hero-agent)" />
          <path
            d="M103 27.2 103.8 29.2 105.8 30 103.8 30.8 103 32.8 102.2 30.8 100.2 30 102.2 29.2Z"
            fill="#fff"
          />
          <g textAnchor="middle" fontSize="7" fill="currentColor">
            <text
              x="37"
              y="32"
              fontSize="4.5"
              fontWeight="700"
              fill="var(--hero-card-bg)"
            >
              R
            </text>
            <text x="54" y="39.5">
              Fetch data
            </text>
            <text x="120" y="39.5">
              Evaluate
            </text>
            <text x="213" y="39.5">
              Review
            </text>
            <text x="168" y="20" fontSize="6">
              Valid?
            </text>
          </g>
        </svg>
      </div>
    </>
  );
}

// Ad-hoc sub-process agent pattern: the AI agent picks among the tools inside,
// and an event sub-process handles incoming messages.
function AdHoc({ card }) {
  return (
    <>
      <CardHead title={card.title} meta={card.meta} />
      <div className={styles.modeler}>
        <svg
          className={clsx(styles.canvas, styles.canvasTall)}
          viewBox="0 0 285 132"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="lh-arrow-adhoc"
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
            <circle cx="8" cy="66" r="7" />
            <path d="M16 66H43" markerEnd="url(#lh-arrow-adhoc)" />
            <rect x="44" y="4" width="197" height="124" rx="8" />
            <path d="M241 66H268" markerEnd="url(#lh-arrow-adhoc)" />
            <circle cx="276" cy="66" r="6.5" strokeWidth="3" />
            <rect x="54" y="34" width="56" height="28" rx="5" />
            <path d="M110 48H128" markerEnd="url(#lh-arrow-adhoc)" />
            <circle cx="137" cy="48" r="8" strokeWidth="2.4" />
            <path d="M133 45.5h8v5h-8zM133 45.5l4 2.8 4-2.8" strokeWidth="1" />
            <rect x="170" y="34" width="56" height="28" rx="5" />
            <rect
              x="54"
              y="76"
              width="172"
              height="36"
              rx="5"
              strokeWidth="1.3"
              strokeDasharray="1.5 3"
            />
            <circle cx="92" cy="94" r="6" strokeDasharray="3 2" />
            <path d="M98 94H116" markerEnd="url(#lh-arrow-adhoc)" />
            <rect x="117" y="80" width="76" height="28" rx="5" />
            <path
              d="M134.5 119c1.5-3 3-3 4.5 0s3 3 4.500 0"
              strokeWidth="1.4"
            />
          </g>
          <circle cx="58" cy="14" r="6.5" fill="var(--hero-agent)" />
          <path
            d="M58 9.2 59.4 12.6 62.8 14 59.4 15.4 58 18.8 56.6 15.4 53.2 14 56.6 12.6Z"
            fill="#fff"
          />
          <g textAnchor="middle" fontSize="8" fill="currentColor">
            <text x="142.5" y="17" fontSize="9">
              {card.agent}
            </text>
            <text x="82" y="51">
              {card.tool}
            </text>
            <text x="198" y="51">
              {card.userTask}
            </text>
            <text x="155" y="97">
              {card.handler}
            </text>
          </g>
        </svg>
      </div>
    </>
  );
}

// Simplified Camunda Hub "Workspaces" screen: heading with a create button,
// then workspace tiles with a role pill, counts, and an Open button.
function Hub({ card }) {
  return (
    <>
      <div className={styles.hubHead}>
        <span className={styles.cardTitle}>{card.title}</span>
        <span className={styles.hubCreate}>{card.action}</span>
      </div>
      <ul className={styles.hubList}>
        {card.workspaces.map((w) => (
          <li key={w.name} className={styles.hubTile}>
            <div className={styles.hubTileHead}>
              <span className={styles.noteTitle}>{w.name}</span>
              <span className={clsx(styles.pill, styles[w.status])}>
                {w.role}
              </span>
            </div>
            <span className={styles.hubCounts}>{w.counts}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

const KINDS = {
  hub: Hub,
  notes: Notes,
  table: Table,
  flow: Flow,
  request: Request,
  code: Code,
  modeler: Modeler,
  adhoc: AdHoc,
};

export default function LandingHero({
  card,
  href,
  ariaLabel,
  unversioned,
  overlay,
  children,
}) {
  const Body = KINDS[card.kind];
  const OverlayBody = overlay && KINDS[overlay.kind];
  const version = useActiveVersion();
  const basePath = version?.path?.replace(/\/$/, "") ?? "";
  const to = href && (unversioned ? href : `${basePath}${href}`);
  // The accessible name starts with the card's visible title, so speech-input
  // users can activate the link by what they see, and adds where it goes.
  const visibleTitle = card.title || card.path;
  const accessibleName = ariaLabel
    ? `${visibleTitle}: ${ariaLabel}`
    : visibleTitle;
  // The main card and the overlay are one item: a single link wraps both.
  const stack = (
    <>
      <div className={styles.card}>
        <Body card={card} />
      </div>
      {OverlayBody && (
        <div className={clsx(styles.card, styles.overlay)} aria-hidden="true">
          <OverlayBody card={overlay} />
        </div>
      )}
    </>
  );
  return (
    <div className={styles.hero}>
      <div className={styles.copy}>{children}</div>
      <div className={styles.art}>
        <div className={styles.field} aria-hidden="true" />
        {href ? (
          <Link
            to={to}
            className={clsx(styles.group, styles.cardLink)}
            aria-label={accessibleName}
            title={ariaLabel}
          >
            {stack}
          </Link>
        ) : (
          <div className={styles.group} aria-hidden="true">
            {stack}
          </div>
        )}
      </div>
    </div>
  );
}
