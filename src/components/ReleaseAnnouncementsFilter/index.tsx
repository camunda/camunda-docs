import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.css';

type TypeFilter = 'all' | 'breaking-change' | 'feature' | 'update' | 'deprecated' | 'change';
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
  { value: 'breaking-change', label: 'Breaking change' },
  { value: 'deprecated', label: 'Deprecated' },
  { value: 'change', label: 'Change' },
  { value: 'feature', label: 'Feature' }, // moved before Update
  { value: 'update', label: 'Update' },
];

const EMPTY_MESSAGE_ATTR = 'data-empty-filter-message';
const AREA_INLINE_BADGE_ATTR = 'data-area-inline-badge';
const DEPLOYMENT_INLINE_BADGES_ATTR = 'data-deployment-inline-badges';
const TYPE_INLINE_BADGE_ATTR = 'data-type-inline-badge';
const INLINE_META_BADGES_ATTR = 'data-inline-meta-badges';
const ROW_FILTER_HIDDEN_ATTR = 'data-row-filter-hidden';

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

  // Inject "Type" + "Area" + "Deployment" badges under each entry heading
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    // Remove any previously injected badge wrappers
    container.querySelectorAll(`[${INLINE_META_BADGES_ATTR}="true"]`).forEach((n) => n.remove());
    container.querySelectorAll(`[${TYPE_INLINE_BADGE_ATTR}="true"]`).forEach((n) => n.remove());
    container.querySelectorAll(`[${AREA_INLINE_BADGE_ATTR}="true"]`).forEach((n) => n.remove());
    container.querySelectorAll(`[${DEPLOYMENT_INLINE_BADGES_ATTR}="true"]`).forEach((n) => n.remove());

    const rows = Array.from(container.querySelectorAll<HTMLElement>('.release-announcement-row'));
    rows.forEach((row) => {
      // Old two-column "badge" div is no longer used
      row.querySelector<HTMLElement>('.release-announcement-badge')?.remove();

      const contentEl = row.querySelector<HTMLElement>('.release-announcement-content');
      if (!contentEl) return;

      const heading =
        contentEl.querySelector<HTMLElement>('h4') ??
        contentEl.querySelector<HTMLElement>('h3') ??
        contentEl.querySelector<HTMLElement>('h2') ??
        contentEl.querySelector<HTMLElement>('h5');

      if (!heading) return;

      const typeValue = (row.getAttribute('data-type') ?? '').trim();
      const typeLabel = typeValue ? getTypeLabel(typeValue) : null;

      const areas = getAreas(row.getAttribute('data-area') ?? '');
      const deployments = getDeployments(row.getAttribute('data-deployment') ?? '');

      if (!typeLabel && areas.length === 0 && deployments.length === 0) return;

      const wrapper = document.createElement('div');
      wrapper.className = styles.inlineMetaBadges;
      wrapper.setAttribute(INLINE_META_BADGES_ATTR, 'true');

      // Type badge (styled like area + deployment)
      if (typeLabel) {
        const typeWrap = document.createElement('span');
        typeWrap.setAttribute(TYPE_INLINE_BADGE_ATTR, 'true');

        const b = document.createElement('span');
        b.className = ['badge', 'badge--secondary', styles.typeInlineBadge].join(' ');
        b.textContent = typeLabel;

        typeWrap.appendChild(b);
        wrapper.appendChild(typeWrap);
      }

      // Area badges (supports "A+B" => 2 badges)
      if (areas.length > 0) {
        const areaWrap = document.createElement('span');
        areaWrap.setAttribute(AREA_INLINE_BADGE_ATTR, 'true');

        areas.forEach((areaText) => {
          const b = document.createElement('span');
          b.className = ['badge', 'badge--secondary', styles.areaInlineBadge].join(' ');
          b.textContent = areaText;
          areaWrap.appendChild(b);
        });

        wrapper.appendChild(areaWrap);
      }

      // Deployment badges (supports "sm+saas" => 2 badges)
      if (deployments.length > 0) {
        const depWrap = document.createElement('span');
        depWrap.setAttribute(DEPLOYMENT_INLINE_BADGES_ATTR, 'true');

        deployments.forEach((d) => {
          const b = document.createElement('span');
          b.className = ['badge', 'badge--secondary', styles.deploymentInlineBadge].join(' ');
          b.textContent = d === 'saas' ? 'SaaS' : 'Self-Managed';
          depWrap.appendChild(b);
        });

        wrapper.appendChild(depWrap);
      }

      heading.insertAdjacentElement('afterend', wrapper);
    });
  }, [children]);

  // Unified filtering (Type OR Deployment OR Area; plus All) + hide empty sections
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    // Reset previously hidden sections
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

    // Hide headings/sections with no visible rows
    const elements = Array.from(container.querySelectorAll<HTMLElement>(':scope > *'));

    for (let i = 0; i < elements.length; i++) {
      const headingEl = elements[i];
      const level = getHeadingLevel(headingEl);
      if (!level) continue;
      if (headingEl.hidden) continue;

      let end = elements.length;
      for (let j = i + 1; j < elements.length; j++) {
        const nextLevel = getHeadingLevel(elements[j]);
        if (nextLevel !== null && nextLevel <= level) {
          end = j;
          break;
        }
      }

      const section = elements.slice(i, end);
      const hasVisible = sectionHasVisibleRows(section);

      if (!hasVisible) {
        section.forEach((node) => {
          node.hidden = true;
          node.setAttribute('data-filter-hidden', 'true');
        });
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
        <div className={styles.badgeGroup} role="group" aria-labelledby="announcementFilterLabel"><span className={styles.label}>Filter:</span>
          {masterOptions.map((o) => {
            const isActive = o.key === selectedKey;

            return (
              <button
                key={o.key}
                type="button"
                className={[
                  styles.filterBadgeButton,
                  isActive ? styles.filterBadgeButtonActive : styles.filterBadgeButtonInactive,
                ].join(' ')}
                aria-pressed={isActive}
                onClick={() => {
                  if (o.kind === 'all') setMasterFilter({ kind: 'all' });
                  else if (o.kind === 'type') setMasterFilter({ kind: 'type', value: o.value });
                  else if (o.kind === 'deployment') setMasterFilter({ kind: 'deployment', value: o.value });
                  else setMasterFilter({ kind: 'area', value: o.value });
                }}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>
      <p><hr className={styles.hr}/></p>

      <div ref={listRef} className={styles.list}>
        {children}
      </div>
    </section>
  );
}