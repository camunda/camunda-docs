import React from "react";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";

export const camundaReleaseVersion = () => {
  const docsVersion = useActiveVersion();
  if (docsVersion.label == "Next") return "alpha";
  return docsVersion.label.replace(" (unreleased)", "");
};

export const activeVersionURLPath = () => {
  const docsVersion = useActiveVersion();
  return docsVersion.path;
};

// True if the active docs version is >= major.minor, treating the unreleased
// "current" (next) version as the latest. Uses integer major/minor comparison
// so that, e.g., 8.10 is correctly greater than 8.9 (parseFloat would give 8.1).
export const isActiveVersionAtLeast = (docsVersion, major, minor) => {
  if (!docsVersion) return false;
  if (docsVersion.name === "current") return true;
  const m = String(docsVersion.name).match(/^(\d+)\.(\d+)/);
  if (!m) return false;
  const maj = Number(m[1]);
  const min = Number(m[2]);
  return maj > major || (maj === major && min >= minor);
};
