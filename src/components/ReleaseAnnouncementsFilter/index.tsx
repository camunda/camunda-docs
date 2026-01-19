import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.css';

type Filter = 'all' | 'breaking-change' | 'new' | 'deprecated' | 'change';

const OPTIONS: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'breaking-change', label: 'Breaking changes' },
  { value: 'deprecated', label: 'Deprecated' },
  { value: 'change', label: 'Change' },
  { value: 'new', label: 'New' },
];

const EMPTY_MESSAGE_ATTR = 'data-empty-filter-message';
const AREA_INLINE_BADGE_ATTR = 'data-area-inline-badge';
const DEPLOYMENT_INLINE_BADGES_ATTR = 'data-deployment-inline-badges';

function getHeadingLevel(el: Element): number | null {
  const tag = el.tagName.toLowerCase();
  if (tag === 'h2') return 2;
  if (tag === 'h3') return 3;
  return null;
}

function sectionHasMatchingRows(sectionElements: HTMLElement[], filter: Filter): boolean {
  if (filter === 'all') return true;

  const selector = `.release-announcement-row[data-type="${filter}"]`;

  for (const el of sectionElements) {
    if (el.matches?.(selector)) return true;
    if (el.querySelector?.(selector)) return true;
  }

  return false;
}

function getDeployments(value: string): Array<'sm' | 'saas'> {
  const v = value.trim().toLowerCase();
  if (v === 'sm') return ['sm'];
  if (v === 'saas') return ['saas'];
  if (v === 'sm+saas' || v === 'saas+sm') return ['sm', 'saas'];
  return [];
}

export default function ReleaseAnnouncementsFilter({
  children,
  defaultFilter = 'all',
}: {
  children: React.ReactNode;
  defaultFilter?: Filter;
}) {
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [availableTypes, setAvailableTypes] = useState<Set<Filter>>(() => new Set<Filter>(['all']));
  const listRef = useRef<HTMLDivElement | null>(null);

  const options = useMemo(() => OPTIONS, []);

  // Detect which types exist on the page; hide filter badges that have no entries.
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const available = new Set<Filter>(['all']);
    (['breaking-change', 'new', 'deprecated', 'change'] as const).forEach((t) => {
      if (container.querySelector(`.release-announcement-row[data-type="${t}"]`)) {
        available.add(t);
      }
    });

    setAvailableTypes(available);

    if (filter !== 'all' && !available.has(filter)) {
      setFilter('all');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inject "Area" + "Deployment" badges under each entry heading
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    container.querySelectorAll(`[${AREA_INLINE_BADGE_ATTR}="true"]`).forEach((n) => n.remove());
    container.querySelectorAll(`[${DEPLOYMENT_INLINE_BADGES_ATTR}="true"]`).forEach((n) => n.remove());

    const rows = Array.from(container.querySelectorAll<HTMLElement>('.release-announcement-row'));
    rows.forEach((row) => {
      const contentEl = row.querySelector<HTMLElement>('.release-announcement-content');
      if (!contentEl) return;

      const areaText = (row.getAttribute('data-area') ?? '').trim();
      const deploymentValue = (row.getAttribute('data-deployment') ?? '').trim();
      const deployments = getDeployments(deploymentValue);

      if (!areaText && deployments.length === 0) return;

      const heading =
        contentEl.querySelector<HTMLElement>('h4') ??
        contentEl.querySelector<HTMLElement>('h3') ??
        contentEl.querySelector<HTMLElement>('h5') ??
        contentEl.querySelector<HTMLElement>('h2');

      if (!heading) return;

      const wrapper = document.createElement('div');
      wrapper.className = styles.inlineMetaBadges;

      if (areaText) {
        const areaBadgeWrap = document.createElement('span');
        areaBadgeWrap.setAttribute(AREA_INLINE_BADGE_ATTR, 'true');

        const areaBadge = document.createElement('span');
        areaBadge.className = ['badge', 'badge--secondary', styles.areaInlineBadge].join(' ');
        areaBadge.textContent = areaText;

        areaBadgeWrap.appendChild(areaBadge);
        wrapper.appendChild(areaBadgeWrap);
      }

      if (deployments.length > 0) {
        const depWrap = document.createElement('span');
        depWrap.setAttribute(DEPLOYMENT_INLINE_BADGES_ATTR, 'true');

        deployments.forEach((d) => {
          const b = document.createElement('span');
          b.className = [
            'badge',
            // Use the same style for both so SaaS isn't formatted differently
            'badge--secondary',
            styles.deploymentInlineBadge,
          ].join(' ');
          b.textContent = d === 'saas' ? 'SaaS' : 'Self-Managed';
          depWrap.appendChild(b);
        });

        wrapper.appendChild(depWrap);
      }

      heading.insertAdjacentElement('afterend', wrapper);
    });
  }, [children]);

  // Hide empty sections when filtering (keeps your previous behavior)
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const previouslyHidden = container.querySelectorAll<HTMLElement>('[data-filter-hidden="true"]');
    previouslyHidden.forEach((el) => {
      el.hidden = false;
      el.removeAttribute('data-filter-hidden');
    });

    const existingMessages = container.querySelectorAll<HTMLElement>(`[${EMPTY_MESSAGE_ATTR}="true"]`);
    existingMessages.forEach((el) => el.remove());

    if (filter === 'all') return;

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
      const hasMatch = sectionHasMatchingRows(section, filter);

      if (!hasMatch) {
        section.forEach((node) => {
          node.hidden = true;
          node.setAttribute('data-filter-hidden', 'true');
        });
      }
    }
  }, [filter]);

  return (
    <section className={styles.wrapper} data-announcement-filter={filter}>
      <div className={styles.controls}>
        <span className={styles.label} id="announcementFilterLabel">
          Filter:
        </span>

        <div className={styles.badgeGroup} role="group" aria-labelledby="announcementFilterLabel">
          {options
            .filter((o) => o.value === 'all' || availableTypes.has(o.value))
            .map((o) => {
              const isActive = o.value === filter;

              return (
                <button
                  key={o.value}
                  type="button"
                  className={[
                    styles.filterBadgeButton,
                    isActive ? styles.filterBadgeButtonActive : styles.filterBadgeButtonInactive,
                  ].join(' ')}
                  aria-pressed={isActive}
                  onClick={() => setFilter(o.value)}
                >
                  {o.label}
                </button>
              );
            })}
        </div>
      </div>

      <div className={styles.columnHeader} aria-hidden="true">
        <div className={styles.columnHeaderCell}>Type</div>
        <div className={styles.columnHeaderCell}>Change</div>
      </div>

      <div ref={listRef} className={styles.list}>
        {children}
      </div>
    </section>
  );
}