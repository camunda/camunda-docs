/**
 * Swizzled ColorModeToggle – shows current mode icon with current-mode label as hover text.
 * Based on @docusaurus/theme-classic 3.8.0
 */

import React, { type ReactNode } from "react";
import clsx from "clsx";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { translate } from "@docusaurus/Translate";
import type { Props } from "@theme/ColorModeToggle";
import type { ColorMode } from "@docusaurus/theme-common";

import styles from "./styles.module.css";

function getNextColorMode(
  colorMode: ColorMode | null,
  respectPrefersColorScheme: boolean
) {
  if (!respectPrefersColorScheme) {
    return colorMode === "dark" ? "light" : "dark";
  }
  switch (colorMode) {
    case null:
      return "light";
    case "light":
      return "dark";
    case "dark":
      return null;
    default:
      throw new Error(`unexpected color mode ${colorMode}`);
  }
}

function getColorModeLabel(colorMode: ColorMode | null): string {
  switch (colorMode) {
    case null:
      return translate({
        message: "System mode",
        id: "theme.colorToggle.ariaLabel.mode.system",
      });
    case "light":
      return translate({
        message: "Light mode",
        id: "theme.colorToggle.ariaLabel.mode.light",
      });
    case "dark":
      return translate({
        message: "Dark mode",
        id: "theme.colorToggle.ariaLabel.mode.dark",
      });
    default:
      throw new Error(`unexpected color mode ${colorMode}`);
  }
}

function ColorModeToggle({
  className,
  respectPrefersColorScheme,
  value,
  onChange,
}: Props): ReactNode {
  const isBrowser = useIsBrowser();
  const isDark = value === "dark";
  const label = getColorModeLabel(value);

  return (
    <button
      type="button"
      className={clsx(styles.toggle, className)}
      onClick={() =>
        onChange(getNextColorMode(value, respectPrefersColorScheme))
      }
      disabled={!isBrowser}
      title={label}
      aria-label={label}
    >
      {/* Sun icon – shown in light mode */}
      <svg
        className={clsx(styles.icon, !isDark && styles.iconVisible)}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Moon icon – shown in dark mode */}
      <svg
        className={clsx(styles.icon, isDark && styles.iconVisible)}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    </button>
  );
}

export default React.memo(ColorModeToggle);
