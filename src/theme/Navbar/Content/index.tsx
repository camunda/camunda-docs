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
import NavbarItem from "@theme/NavbarItem";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import SearchBar from "@theme/SearchBar";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarLogo from "@theme/Navbar/Logo";
import styles from "./styles.module.css";

function useNavbarItems() {
  return useThemeConfig().navbar.items;
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
              <NavbarItem {...item} />
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
