import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.css';

type Filter = 'all' | 'breaking-change' | 'new' | 'deprecated';

const OPTIONS: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'breaking-change', label: 'Breaking changes' },
  { value: 'new', label: 'New' },
  { value: 'deprecated', label: 'Deprecated' },
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
  const listRef = useRef<HTMLDivElement | null>(null);

  const options = useMemo(() => OPTIONS, []);

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

    // Only consider direct children so section boundaries (h2/h3) are predictable in MDX.
    const elements = Array.from(container.querySelectorAll<HTMLElement>(':scope > *'));

    for (let i = 0; i < elements.length; i++) {
      const headingEl = elements[i];
      const level = getHeadingLevel(headingEl);
      if (!level) continue;

      // If already hidden by a parent section, skip
      if (headingEl.hidden) continue;

      // Find end of this section: next heading at the same or higher level.
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
          Filter by type:
        </span>

        <div className={styles.badgeGroup} role="group" aria-labelledby="announcementFilterLabel">
          {options.map((o) => {
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