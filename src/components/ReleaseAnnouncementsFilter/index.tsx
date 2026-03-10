/// <reference path="../../types/css-modules.d.ts" />
import React, { useEffect, useMemo, useRef, useState } from 'react';
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

type MasterFilter =
  | { kind: 'all' }
  | { kind: 'type'; value: Exclude<TypeFilter, 'all'> }
  | { kind: 'deployment'; value: Deployment }
  | { kind: 'area'; value: string };

type MasterOption =
  | { key: 'all'; label: 'All'; kind: 'all' }
  | { key: `type:${Exclude<TypeFilter, 'all'>}`; label: string; kind: 'type'; value: Exclude<TypeFilter, 'all'> }
  | { key: `deployment:${Deployment}`; label: string; kind: 'deployment'; value: Deployment }
  | { key: `area:${string}`; label: string; kind: 'area'; value: string };

const TYPE_OPTIONS: Array<{ value: Exclude<TypeFilter, 'all'>; label: string }> = [
  { value: 'breaking-change', label: 'Breaking changes' },
  { value: 'deprecated', label: 'Deprecated' },
  { value: 'removed', label: 'Removed' },
  { value: 'change', label: 'Change' },
  { value: 'feature', label: 'New feature' },
  { value: 'update', label: 'Update' },
  // Dropdown label (plural)
  { value: 'announcement', label: 'Announcements' },
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

function rowMatchesMasterFilter(row: HTMLElement, masterFilter: MasterFilter): boolean {
  if (masterFilter.kind === 'all') return true;

  if (masterFilter.kind === 'type') {
    const rowType = (row.getAttribute('data-type') ?? '').trim();
    return rowType === masterFilter.value;
  }

  if (masterFilter.kind === 'deployment') {
    const rowDeployments = getDeployments(row.getAttribute('data-deployment') ?? '');
    return rowDeployments.includes(masterFilter.value);
  }

  // area: match any area in a "+"-separated list
  const rowAreas = getAreas(row.getAttribute('data-area') ?? '');
  return rowAreas.includes(masterFilter.value);
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
  const initialMasterFilter: MasterFilter =
    defaultFilter === 'all' ? { kind: 'all' } : { kind: 'type', value: defaultFilter };

  const [masterFilter, setMasterFilter] = useState<MasterFilter>(initialMasterFilter);

  const [availableTypes, setAvailableTypes] = useState<Set<Exclude<TypeFilter, 'all'>>>(() => new Set());
  const [availableAreas, setAvailableAreas] = useState<string[]>([]);
  const [availableDeployments, setAvailableDeployments] = useState<Set<Deployment>>(() => new Set());

  const listRef = useRef<HTMLDivElement | null>(null);

  // Detect which types/areas/deployments exist on the page; build the unified filter list from these.
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

    // Keep current selection valid if content changes
    setMasterFilter((prev) => {
      if (prev.kind === 'all') return prev;

      if (prev.kind === 'type') return types.has(prev.value) ? prev : { kind: 'all' };
      if (prev.kind === 'deployment') return deployments.has(prev.value) ? prev : { kind: 'all' };

      // area: strict validation
      return areas.has(prev.value) ? prev : { kind: 'all' };
    });
  }, [children]);

  const masterOptions: MasterOption[] = useMemo(() => {
    const opts: MasterOption[] = [{ key: 'all', label: 'All', kind: 'all' }];

    // Types (only those present)
    TYPE_OPTIONS.forEach((o) => {
      if (availableTypes.has(o.value)) {
        opts.push({ key: `type:${o.value}`, kind: 'type', value: o.value, label: o.label });
      }
    });

    // Deployments (only those present)
    ([
      { value: 'saas' as const, label: 'SaaS' },
      { value: 'sm' as const, label: 'Self-Managed' },
    ] as const).forEach((d) => {
      if (availableDeployments.has(d.value)) {
        opts.push({ key: `deployment:${d.value}`, kind: 'deployment', value: d.value, label: d.label });
      }
    });

    // Areas
    availableAreas.forEach((a) => {
      opts.push({ key: `area:${a}`, kind: 'area', value: a, label: a });
    });

    return opts;
  }, [availableAreas, availableDeployments, availableTypes]);

  const selectedKey = useMemo(() => {
    if (masterFilter.kind === 'all') return 'all';
    if (masterFilter.kind === 'type') return `type:${masterFilter.value}` as const;
    if (masterFilter.kind === 'deployment') return `deployment:${masterFilter.value}` as const;
    return `area:${masterFilter.value}`;
  }, [masterFilter]);

  const setFilterFromKey = (key: string) => {
    if (key === 'all') {
      setMasterFilter({ kind: 'all' });
      return;
    }

    if (key.startsWith('type:')) {
      setMasterFilter({ kind: 'type', value: key.slice('type:'.length) as Exclude<TypeFilter, 'all'> });
      return;
    }

    if (key.startsWith('deployment:')) {
      setMasterFilter({ kind: 'deployment', value: key.slice('deployment:'.length) as Deployment });
      return;
    }

    if (key.startsWith('area:')) {
      setMasterFilter({ kind: 'area', value: key.slice('area:'.length) });
      return;
    }

    setMasterFilter({ kind: 'all' });
  };

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

    const applyFilterAndScrollTop = (next: MasterFilter) => {
      setMasterFilter(next);
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
      const isMatch = rowMatchesMasterFilter(row, masterFilter);
      if (!isMatch) {
        row.hidden = true;
        row.setAttribute(ROW_FILTER_HIDDEN_ATTR, 'true');
      }
    });

    // "All" selected: group rows by area under injected H2 headings
    if (masterFilter.kind === 'all') {
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

    // Non-all filter: hide all H2 headings
    Array.from(container.querySelectorAll<HTMLElement>(':scope > h2')).forEach((el) => {
      el.hidden = true;
      el.setAttribute('data-filter-hidden', 'true');
    });

    // For area/deployment filters, sort visible rows by type
    if (masterFilter.kind === 'area' || masterFilter.kind === 'deployment') {
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
  }, [masterFilter, children]);

  return (
    <section
      className={styles.wrapper}
      // keep this attribute for backwards compat / existing CSS; only meaningful for type filters now
      data-announcement-filter={masterFilter.kind === 'type' ? masterFilter.value : 'all'}
    >
      <div className={styles.controls}>
        <label className={styles.label} htmlFor="releaseAnnouncementsFilterSelect">
          Filter by:
        </label>

        <select
          id="releaseAnnouncementsFilterSelect"
          className={styles.filterSelect}
          value={selectedKey}
          onChange={(e) => setFilterFromKey(e.target.value)}
        >
          {masterOptions.map((o) => (
            <option key={o.key} value={o.key}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <p>
        <hr className={styles.hr} />
      </p>

      <div ref={listRef} className={styles.list}>
        {children}
      </div>
    </section>
  );
}