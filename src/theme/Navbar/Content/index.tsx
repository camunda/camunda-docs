/**
 * Swizzled Navbar/Content – two-level layout.
 * Based on @docusaurus/theme-classic 3.8.0
 *
 * Top row:  Logo  |  Search · Ask AI · Try Free · 🌗
 * Bottom row:  Nav links (left)  |  Version dropdown (right)
 */

import React from "react";
import { useThemeConfig, ErrorCauseBoundary } from "@docusaurus/theme-common";
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import Link from "@docusaurus/Link";
import NavbarItem from "@theme/NavbarItem";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import SearchBar from "@theme/SearchBar";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarLogo from "@theme/Navbar/Logo";
import styles from "./styles.module.css";

function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

function WhatsNewBadge() {
  return (
    <Link to="/build-with-camunda" className={styles.whatsNewBadge}>
      <svg
        className={styles.rocketIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="14"
        height="14"
        aria-hidden="true"
      >
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
      Build with Camunda 8.9
    </Link>
  );
}

export default function NavbarContent(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  // Separate version dropdown from the rest of left items
  const versionItems = leftItems.filter(
    (i) => (i as any).type === "docsVersionDropdown"
  );
  const navLinkItems = leftItems.filter(
    (i) => (i as any).type !== "docsVersionDropdown"
  );

  // Separate Help dropdown and Try Free button for custom ordering
  const helpItems = rightItems.filter((i) => (i as any).type === "dropdown");
  const tryFreeItems = rightItems.filter(
    (i) =>
      (i as any).type !== "dropdown" &&
      (i as any).className?.includes("try-free")
  );
  const otherRightItems = rightItems.filter(
    (i) =>
      (i as any).type !== "dropdown" &&
      !(i as any).className?.includes("try-free")
  );

  return (
    <>
      {/* ---- Top row ---- */}
      <div className={styles.topRow}>
        <div className={styles.topRowLeft}>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          {versionItems.map((item, i) => (
            <ErrorCauseBoundary
              key={i}
              onError={(error) =>
                new Error(
                  `A theme navbar item failed to render.\n${JSON.stringify(item)}`
                )
              }
            >
              <NavbarItem {...item} />
            </ErrorCauseBoundary>
          ))}
          <span className={styles.hideOnMobile}>
            <WhatsNewBadge />
          </span>
        </div>

        <div className={styles.topRowRight}>
          <SearchBar />
          {otherRightItems.map((item, i) => (
            <ErrorCauseBoundary
              key={i}
              onError={(error) =>
                new Error(
                  `A theme navbar item failed to render. This may be a bug in the theme, or a broken custom configuration.\n${JSON.stringify(item)}`
                )
              }
            >
              <NavbarItem {...item} />
            </ErrorCauseBoundary>
          ))}
          {tryFreeItems.map((item, i) => (
            <ErrorCauseBoundary
              key={i}
              onError={(error) =>
                new Error(
                  `A theme navbar item failed to render.\n${JSON.stringify(item)}`
                )
              }
            >
              <span className={styles.hideOnMobile}>
                <NavbarItem {...item} />
              </span>
            </ErrorCauseBoundary>
          ))}
          <span className={styles.hideOnMobile}>
            {helpItems.map((item, i) => (
              <ErrorCauseBoundary
                key={i}
                onError={(error) =>
                  new Error(
                    `A theme navbar item failed to render.\n${JSON.stringify(item)}`
                  )
                }
              >
                <NavbarItem {...item} />
              </ErrorCauseBoundary>
            ))}
          </span>
          <NavbarColorModeToggle className={styles.colorModeToggle} />
        </div>
      </div>

      {/* ---- Bottom row ---- */}
      <div className={styles.bottomRow}>
        <div className={styles.bottomRowLeft}>
          {navLinkItems.map((item, i) => (
            <ErrorCauseBoundary
              key={i}
              onError={(error) =>
                new Error(
                  `A theme navbar item failed to render.\n${JSON.stringify(item)}`
                )
              }
            >
              <NavbarItem {...item} />
            </ErrorCauseBoundary>
          ))}
        </div>
      </div>


    </>
  );
}
