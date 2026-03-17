/// <reference path="../../types/css-modules.d.ts" />
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

type TypeFilter =
  | 'all'
  | 'breaking-change'
  | 'feature'
  | 'update'
  | 'deprecated'
  | 'removed'
  | 'change'
  | 'announcement';
type Deployment = 'sm' | 'saas';
type DeploymentFilter = 'all' | Deployment;
type AreaFilter = 'all' | string;

const TYPE_OPTIONS: Array<{ value: Exclude<TypeFilter, 'all'>; label: string }> = [
  { value: 'breaking-change', label: 'Breaking changes' },
  { value: 'deprecated', label: 'Deprecated' },
  { value: 'removed', label: 'Removed' },
  { value: 'change', label: 'Change' },
  { value: 'feature', label: 'New feature' },
  { value: 'update', label: 'Update' },
  { value: 'announcement', label: 'Announcements' },
];

const DEPLOYMENT_OPTIONS: Array<{ value: Deployment; label: string }> = [
  { value: 'saas', label: 'SaaS' },
  { value: 'sm', label: 'Self-Managed' },
];

const EMPTY_MESSAGE_ATTR = 'data-empty-filter-message';
const AREA_INLINE_BADGE_ATTR = 'data-area-inline-badge';
const DEPLOYMENT_INLINE_BADGES_ATTR = 'data-deployment-inline-badges';
const TYPE_INLINE_BADGE_ATTR = 'data-type-inline-badge';
const INLINE_META_BADGES_ATTR = 'data-inline-meta-badges';
const ROW_FILTER_HIDDEN_ATTR = 'data-row-filter-hidden';
const INJECTED_AREA_HEADING_ATTR = 'data-injected-area-heading';
const ORIGINAL_ORDER_ATTR = 'data-original-order';

function getHeadingLevel(el: Element): number | null {
  const tag = el.tagName.toLowerCase();
  if (tag === 'h2') return 2;
  if (tag === 'h3') return 3;
  return null;
}

function sectionHasVisibleRows(sectionElements: HTMLElement[]): boolean {
  const selector = `.release-announcement-row:not([hidden])`;

  for (const el of sectionElements) {
    if (el.matches?.(selector)) return true;
    if (el.querySelector?.(selector)) return true;
  }

  return false;
}

function getDeployments(value: string): Deployment[] {
  const v = value.trim().toLowerCase();
  if (v === 'sm') return ['sm'];
  if (v === 'saas') return ['saas'];
  if (v === 'sm+saas' || v === 'saas+sm') return ['sm', 'saas'];
  return [];
}

// REMOVE normalization/aliasing for area matching.
// The area filter must be an exact match to data-area, e.g.
// selecting "Supported environments" only shows rows with data-area="Supported environments".

// function normalizeAreaValue(value: string): string {
//   const v = value.trim().toLowerCase();
//
//   // Known aliases (keeps filter + badge matching even if wording differs)
//   if (v === 'supported environments' || v === 'support environment' || v === 'supported environment') {
//     return 'supported-environments';
//   }
//
//   return v;
// }
//
// function getAreaDisplayLabel(canonical: string, fallbackRaw: string): string {
//   if (canonical === 'supported-environments') return 'Supported environments';
//   return fallbackRaw.trim();
// }

function getAreas(value: string): string[] {
  // Supports: "Agentic orchestration" OR "Agentic orchestration+Connectors"
  // Trims whitespace around each token.
  const parts = value
    .split('+')
    .map((s) => s.trim())
    .filter(Boolean);

  // de-dupe while preserving order
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of parts) {
    if (!seen.has(p)) {
      seen.add(p);
      out.push(p);
    }
  }
  return out;
}

function rowMatchesFilters(
  row: HTMLElement,
  typeFilter: TypeFilter,
  deploymentFilter: DeploymentFilter,
  areaFilter: AreaFilter,
): boolean {
  if (typeFilter !== 'all') {
    const rowType = (row.getAttribute('data-type') ?? '').trim();
    if (rowType !== typeFilter) return false;
  }
  if (deploymentFilter !== 'all') {
    const rowDeployments = getDeployments(row.getAttribute('data-deployment') ?? '');
    if (!rowDeployments.includes(deploymentFilter)) return false;
  }
  if (areaFilter !== 'all') {
    const rowAreas = getAreas(row.getAttribute('data-area') ?? '');
    if (!rowAreas.includes(areaFilter)) return false;
  }
  return true;
}

function getTypeLabel(value: string): string | null {
  const v = value.trim() as Exclude<TypeFilter, 'all'>;

  // Badge labels (singular) for content
  if (v === 'announcement') return 'Announcement';
  if (v === 'breaking-change') return 'Breaking change';

  // Dropdown labels come from TYPE_OPTIONS (e.g. "Breaking changes")
  const opt = TYPE_OPTIONS.find((o) => o.value === v);
  return opt?.label ?? null;
}

export default function ReleaseAnnouncementsFilter({
  children,
  defaultFilter = 'all',
}: {
  children: React.ReactNode;
  defaultFilter?: TypeFilter;
}) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>(defaultFilter);
  const [deploymentFilter, setDeploymentFilter] = useState<DeploymentFilter>('all');
  const [areaFilter, setAreaFilter] = useState<AreaFilter>('all');

  const [availableTypes, setAvailableTypes] = useState<Set<Exclude<TypeFilter, 'all'>>>(() => new Set());
  const [availableAreas, setAvailableAreas] = useState<string[]>([]);
  const [availableDeployments, setAvailableDeployments] = useState<Set<Deployment>>(() => new Set());
  const [noResults, setNoResults] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);

  // Detect which types/areas/deployments exist on the page; build filter options from these.
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const rows = Array.from(container.querySelectorAll<HTMLElement>('.release-announcement-row'));

    const types = new Set<Exclude<TypeFilter, 'all'>>();
    const areas = new Set<string>();
    const deployments = new Set<Deployment>();

    rows.forEach((row) => {
      const t = (row.getAttribute('data-type') ?? '').trim() as Exclude<TypeFilter, 'all'>;
      if (t) types.add(t);

      getAreas(row.getAttribute('data-area') ?? '').forEach((a) => areas.add(a));

      getDeployments(row.getAttribute('data-deployment') ?? '').forEach((d) => deployments.add(d));
    });

    setAvailableTypes(types);
    setAvailableAreas(Array.from(areas).sort((a, b) => a.localeCompare(b)));
    setAvailableDeployments(deployments);

    // Keep current selections valid if content changes
    setTypeFilter((prev) => (prev === 'all' || types.has(prev as Exclude<TypeFilter, 'all'>) ? prev : 'all'));
    setDeploymentFilter((prev) => (prev === 'all' || deployments.has(prev as Deployment) ? prev : 'all'));
    setAreaFilter((prev) => (prev === 'all' || areas.has(prev) ? prev : 'all'));
  }, [children]);

  // Inject badges:
  // - Type badge goes into a left column (one badge) on desktop
  // - On small screens, Type badge is shown inline next to area/deployment badges
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    // Remove any previously injected badge wrappers
    container.querySelectorAll(`[${INLINE_META_BADGES_ATTR}="true"]`).forEach((n) => n.remove());
    container.querySelectorAll(`[${TYPE_INLINE_BADGE_ATTR}="true"]`).forEach((n) => n.remove());
    container.querySelectorAll(`[${AREA_INLINE_BADGE_ATTR}="true"]`).forEach((n) => n.remove());
    container.querySelectorAll(`[${DEPLOYMENT_INLINE_BADGES_ATTR}="true"]`).forEach((n) => n.remove());

    const rows = Array.from(container.querySelectorAll<HTMLElement>('.release-announcement-row'));

    const addInteractiveProps = (el: HTMLElement, onActivate: () => void, ariaLabel: string) => {
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', ariaLabel);
      el.setAttribute('title', 'Filter by');
      el.style.cursor = 'pointer';

      el.onclick = () => onActivate();
      el.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate();
        }
      };
    };

    const applyFilterAndScrollTop = (
      next:
        | { kind: 'type'; value: Exclude<TypeFilter, 'all'> }
        | { kind: 'deployment'; value: Deployment }
        | { kind: 'area'; value: string }
        | { kind: 'all' }
    ) => {
      if (next.kind === 'type') {
        setTypeFilter(next.value);
        setDeploymentFilter('all');
        setAreaFilter('all');
      } else if (next.kind === 'deployment') {
        setTypeFilter('all');
        setDeploymentFilter(next.value);
        setAreaFilter('all');
      } else if (next.kind === 'area') {
        setTypeFilter('all');
        setDeploymentFilter('all');
        setAreaFilter(next.value);
      } else {
        setTypeFilter('all');
        setDeploymentFilter('all');
        setAreaFilter('all');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const createTypeBadge = (typeValue: Exclude<TypeFilter, 'all'>, typeLabel: string) => {
      const wrap = document.createElement('span');
      wrap.setAttribute(TYPE_INLINE_BADGE_ATTR, 'true');

      const b = document.createElement('span');
      b.className = ['badge', 'badge--secondary', styles.typeInlineBadge].join(' ');
      b.textContent = typeLabel;

      addInteractiveProps(
        b,
        () => applyFilterAndScrollTop({ kind: 'type', value: typeValue }),
        `Filter by type: ${typeLabel}`
      );

      wrap.appendChild(b);
      return wrap;
    };

    const createAreaBadge = (areaText: string) => {
      const b = document.createElement('span');
      b.className = ['badge', 'badge--secondary', styles.areaInlineBadge].join(' ');
      b.textContent = areaText;

      addInteractiveProps(
        b,
        () => applyFilterAndScrollTop({ kind: 'area', value: areaText }),
        `Filter by area: ${areaText}`
      );

      return b;
    };

    const createDeploymentBadge = (deployment: Deployment) => {
      const label = deployment === 'saas' ? 'SaaS' : 'Self-Managed';

      const b = document.createElement('span');
      b.className = ['badge', 'badge--secondary', styles.deploymentInlineBadge].join(' ');
      b.textContent = label;

      addInteractiveProps(
        b,
        () => applyFilterAndScrollTop({ kind: 'deployment', value: deployment }),
        `Filter by deployment: ${label}`
      );

      return b;
    };

    rows.forEach((row) => {
      const contentEl = row.querySelector<HTMLElement>('.release-announcement-content');
      if (!contentEl) return;

      const typeValue = (row.getAttribute('data-type') ?? '').trim() as Exclude<TypeFilter, 'all'>;
      const typeLabel = typeValue ? getTypeLabel(typeValue) : null;

      // Ensure a dedicated left column exists for the type badge (desktop)
      let typeCol = row.querySelector<HTMLElement>('.release-announcement-type');

      // If legacy badge column exists, reuse it as the type column
      const legacyBadgeCol = row.querySelector<HTMLElement>('.release-announcement-badge');
      if (!typeCol && legacyBadgeCol) {
        typeCol = legacyBadgeCol;
        typeCol.classList.add('release-announcement-type');
        typeCol.classList.remove('release-announcement-badge');
      }

      if (!typeCol) {
        typeCol = document.createElement('div');
        typeCol.className = 'release-announcement-type';
        row.insertBefore(typeCol, contentEl);
      }

      // Populate the type column with the Type badge (and nothing else)
      typeCol.innerHTML = '';
      if (typeLabel && typeValue) {
        typeCol.appendChild(createTypeBadge(typeValue, typeLabel));
      }

      // Build inline badges under the entry heading (right column): Type (mobile) + Area(s) + Deployment(s)
      const heading =
        contentEl.querySelector<HTMLElement>('h4') ??
        contentEl.querySelector<HTMLElement>('h3') ??
        contentEl.querySelector<HTMLElement>('h2') ??
        contentEl.querySelector<HTMLElement>('h5');

      const areas = getAreas(row.getAttribute('data-area') ?? '');
      const deployments = getDeployments(row.getAttribute('data-deployment') ?? '');

      // Create wrapper if we have anything to show inline (Type OR areas OR deployments)
      if (!typeLabel && areas.length === 0 && deployments.length === 0) return;

      const wrapper = document.createElement('div');
      wrapper.className = styles.inlineMetaBadges;
      wrapper.setAttribute(INLINE_META_BADGES_ATTR, 'true');

      // Type badge inline too (for mobile; CSS will hide it on desktop)
      if (typeLabel && typeValue) {
        wrapper.appendChild(createTypeBadge(typeValue, typeLabel));
      }

      if (areas.length > 0) {
        const areaWrap = document.createElement('span');
        areaWrap.setAttribute(AREA_INLINE_BADGE_ATTR, 'true');

        areas.forEach((areaText) => {
          areaWrap.appendChild(createAreaBadge(areaText));
        });

        wrapper.appendChild(areaWrap);
      }

      if (deployments.length > 0) {
        const depWrap = document.createElement('span');
        depWrap.setAttribute(DEPLOYMENT_INLINE_BADGES_ATTR, 'true');

        deployments.forEach((d) => {
          depWrap.appendChild(createDeploymentBadge(d));
        });

        wrapper.appendChild(depWrap);
      }

      if (heading) {
        heading.insertAdjacentElement('afterend', wrapper);
      } else {
        // Fallback: if no heading found, still show badges at top of content
        contentEl.insertAdjacentElement('afterbegin', wrapper);
      }
    });
  }, [children]);

  // Unified filtering (Type OR Deployment OR Area; plus All) + heading visibility rules
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    // Remove any previously injected area group headings
    container.querySelectorAll(`[${INJECTED_AREA_HEADING_ATTR}="true"]`).forEach((el) => el.remove());

    // Restore original DOM row order if rows were grouped by area
    const rowsWithOrigOrder = Array.from(
      container.querySelectorAll<HTMLElement>(`.release-announcement-row[${ORIGINAL_ORDER_ATTR}]`)
    );
    if (rowsWithOrigOrder.length > 0) {
      rowsWithOrigOrder
        .sort((a, b) => parseInt(a.getAttribute(ORIGINAL_ORDER_ATTR)!, 10) - parseInt(b.getAttribute(ORIGINAL_ORDER_ATTR)!, 10))
        .forEach((row) => {
          row.removeAttribute(ORIGINAL_ORDER_ATTR);
          container.appendChild(row);
        });
    }

    // Reset previously hidden sections/headings
    const previouslyHidden = container.querySelectorAll<HTMLElement>('[data-filter-hidden="true"]');
    previouslyHidden.forEach((el) => {
      el.hidden = false;
      el.removeAttribute('data-filter-hidden');
    });

    // Reset previously hidden rows
    const previouslyHiddenRows = container.querySelectorAll<HTMLElement>(`[${ROW_FILTER_HIDDEN_ATTR}="true"]`);
    previouslyHiddenRows.forEach((row) => {
      row.hidden = false;
      row.removeAttribute(ROW_FILTER_HIDDEN_ATTR);
    });

    // Reset any previously reordered rows
    const reorderedRows = container.querySelectorAll<HTMLElement>('[data-reordered="true"]');
    reorderedRows.forEach((row) => {
      row.removeAttribute('data-reordered');
    });

    // Remove empty messages (keeps previous behavior)
    const existingMessages = container.querySelectorAll<HTMLElement>(`[${EMPTY_MESSAGE_ATTR}="true"]`);
    existingMessages.forEach((el) => el.remove());

    // Hide non-matching rows
    const rows = Array.from(container.querySelectorAll<HTMLElement>('.release-announcement-row'));
    rows.forEach((row) => {
      const isMatch = rowMatchesFilters(row, typeFilter, deploymentFilter, areaFilter);
      if (!isMatch) {
        row.hidden = true;
        row.setAttribute(ROW_FILTER_HIDDEN_ATTR, 'true');
      }
    });

    const isAllFilters = typeFilter === 'all' && deploymentFilter === 'all' && areaFilter === 'all';
    const visibleCount = rows.filter((row) => !row.hidden).length;
    setNoResults(!isAllFilters && visibleCount === 0);

    // All filters unset: group rows by area under injected H2 headings
    if (isAllFilters) {
      // Record original index on every row so we can restore order when switching away
      rows.forEach((row, i) => row.setAttribute(ORIGINAL_ORDER_ATTR, String(i)));

      // Build area → rows map (primary group key = first area from data-area)
      const areaMap = new Map<string, HTMLElement[]>();
      const noAreaRows: HTMLElement[] = [];
      rows.forEach((row) => {
        const areas = getAreas(row.getAttribute('data-area') ?? '');
        if (areas.length > 0) {
          const primaryArea = areas[0];
          if (!areaMap.has(primaryArea)) areaMap.set(primaryArea, []);
          areaMap.get(primaryArea)!.push(row);
        } else {
          noAreaRows.push(row);
        }
      });

      // Inject H2 headings + rows, sorted A→Z by area name
      const TYPE_ORDER: Record<string, number> = {
        announcement: 0,
        feature: 1,
        'breaking-change': 2,
        deprecated: 3,
        change: 4,
        update: 5,
      };

      Array.from(areaMap.keys())
        .sort((a, b) => a.localeCompare(b))
        .forEach((area) => {
          const h2 = document.createElement('h2');
          h2.textContent = area;
          h2.setAttribute(INJECTED_AREA_HEADING_ATTR, 'true');
          h2.className = styles.areaGroupHeading;
          container.appendChild(h2);
          areaMap.get(area)!
            .sort((a, b) => {
              const aType = (a.getAttribute('data-type') ?? '').trim();
              const bType = (b.getAttribute('data-type') ?? '').trim();
              const aOrder = TYPE_ORDER[aType] ?? 99;
              const bOrder = TYPE_ORDER[bType] ?? 99;
              return aOrder - bOrder;
            })
            .forEach((row) => container.appendChild(row));
        });

      // Rows with no area appended at the end without a heading
      noAreaRows.forEach((row) => container.appendChild(row));

      // Hide any original MDX H2 headings now superseded by the injected ones
      Array.from(container.querySelectorAll<HTMLElement>(':scope > h2')).forEach((el) => {
        if (!el.hasAttribute(INJECTED_AREA_HEADING_ATTR)) {
          el.hidden = true;
          el.setAttribute('data-filter-hidden', 'true');
        }
      });

      return;
    }

    // Any filter active: hide all H2 headings
    Array.from(container.querySelectorAll<HTMLElement>(':scope > h2')).forEach((el) => {
      el.hidden = true;
      el.setAttribute('data-filter-hidden', 'true');
    });

    // Sort visible rows by type when the type filter is not the only active filter
    if (typeFilter === 'all') {
      const TYPE_ORDER: Record<string, number> = {
        announcement: 0,
        feature: 1,
        'breaking-change': 2,
        deprecated: 3,
        change: 4,
        update: 5,
      };

      const visibleRows = rows.filter((row) => !row.hidden);
      const sorted = [...visibleRows].sort((a, b) => {
        const aType = (a.getAttribute('data-type') ?? '').trim();
        const bType = (b.getAttribute('data-type') ?? '').trim();
        return (TYPE_ORDER[aType] ?? 99) - (TYPE_ORDER[bType] ?? 99);
      });

      const orderChanged = sorted.some((row, idx) => row !== visibleRows[idx]);
      if (orderChanged) {
        const parent = sorted[0]?.parentElement;
        if (parent) {
          const firstVisibleRow = visibleRows[0];
          sorted.forEach((row) => {
            row.setAttribute('data-reordered', 'true');
            parent.insertBefore(row, firstVisibleRow);
          });
        }
      }
    }
  }, [typeFilter, deploymentFilter, areaFilter, children]);

  return (
    <section
      className={styles.wrapper}
      data-announcement-filter="all"
    >
      <div className={styles.controls}>
        <div className={styles.controlsRow}>
        <div className={styles.filterGroup}>
          <label htmlFor="typeFilterSelect" className={styles.filterGroupLabel}>Type</label>
          <select
            id="typeFilterSelect"
            className={styles.filterSelect}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
          >
            <option value="all">All types</option>
            {TYPE_OPTIONS.filter((o) => availableTypes.has(o.value)).map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="deploymentFilterSelect" className={styles.filterGroupLabel}>Deployment</label>
          <select
            id="deploymentFilterSelect"
            className={styles.filterSelect}
            value={deploymentFilter}
            onChange={(e) => setDeploymentFilter(e.target.value as DeploymentFilter)}
          >
            <option value="all">All deployments</option>
            {DEPLOYMENT_OPTIONS.filter((o) => availableDeployments.has(o.value)).map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="areaFilterSelect" className={styles.filterGroupLabel}>Area/Component</label>
          <select
            id="areaFilterSelect"
            className={styles.filterSelect}
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
          >
            <option value="all">All areas</option>
            {availableAreas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {(typeFilter !== 'all' || deploymentFilter !== 'all' || areaFilter !== 'all') && (
          <button
            className={styles.clearButton}
            onClick={() => {
              setTypeFilter('all');
              setDeploymentFilter('all');
              setAreaFilter('all');
            }}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Clear filters
          </button>
        )}
        </div>
      </div>

      <p>
        <hr className={styles.hr} />
      </p>


      {noResults && (
        <p className={styles.noResults}>No results found for the selected filters.</p>
      )}

      <div ref={listRef} className={styles.list}>
        {children}
      </div>
    </section>
  );
}