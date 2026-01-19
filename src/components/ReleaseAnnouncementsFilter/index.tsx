import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.css';

type Filter = 'all' | 'breaking-change' | 'new' | 'deprecated' | 'change';

const OPTIONS: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'breaking-change', label: 'Breaking changes' },
  { value: 'deprecated', label: 'Deprecation' },
  { value: 'change', label: 'Change' },
  { value: 'new', label: 'New' },
];

const EMPTY_MESSAGE_ATTR = 'data-empty-filter-message';

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

    // If the default/active filter doesn't exist on this page, fall back to All.
    if (filter !== 'all' && !available.has(filter)) {
      setFilter('all');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hide empty sections when filtering (keeps your previous behavior)
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    // Unhide anything previously hidden
    const previouslyHidden = container.querySelectorAll<HTMLElement>('[data-filter-hidden="true"]');
    previouslyHidden.forEach((el) => {
      el.hidden = false;
      el.removeAttribute('data-filter-hidden');
    });

    // Remove any previously injected empty-state messages (from older versions)
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
        <div className={styles.columnHeaderCell}>Area</div>
        <div className={styles.columnHeaderCell}>Change</div>
      </div>

      <div ref={listRef} className={styles.list}>
        {children}
      </div>
    </section>
  );
}