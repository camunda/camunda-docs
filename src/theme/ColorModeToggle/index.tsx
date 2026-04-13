/**
 * Swizzled ColorModeToggle – Vue.js-style slider switch.
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
        message: "system mode",
        id: "theme.colorToggle.ariaLabel.mode.system",
      });
    case "light":
      return translate({
        message: "light mode",
        id: "theme.colorToggle.ariaLabel.mode.light",
      });
    case "dark":
      return translate({
        message: "dark mode",
        id: "theme.colorToggle.ariaLabel.mode.dark",
      });
    default:
      throw new Error(`unexpected color mode ${colorMode}`);
  }
}

function getColorModeAriaLabel(colorMode: ColorMode | null) {
  return translate(
    {
      message: "Switch between dark and light mode (currently {mode})",
      id: "theme.colorToggle.ariaLabel",
    },
    { mode: getColorModeLabel(colorMode) }
  );
}

function ColorModeToggle({
  className,
  respectPrefersColorScheme,
  value,
  onChange,
}: Props): ReactNode {
  const isBrowser = useIsBrowser();
  const isDark = value === "dark";

  return (
    <button
      type="button"
      className={clsx(styles.slider, isDark && styles.sliderDark, className)}
      onClick={() =>
        onChange(getNextColorMode(value, respectPrefersColorScheme))
      }
      disabled={!isBrowser}
      title={getColorModeLabel(value)}
      aria-label={getColorModeAriaLabel(value)}
    >
      {/* Sun icon */}
      <span className={clsx(styles.icon, styles.sunIcon)} aria-hidden>
        <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      </span>

      {/* Thumb / knob */}
      <span className={styles.thumb} />

      {/* Moon icon */}
      <span className={clsx(styles.icon, styles.moonIcon)} aria-hidden>
        <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </span>
    </button>
  );
}

export default React.memo(ColorModeToggle);
