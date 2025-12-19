import React from "react";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";

export const camundaReleaseVersion = () => {
  const docsVersion = useActiveVersion();
  if (docsVersion.label == "Next") return "alpha";
  if (docsVersion.label == "8.9 (unreleased)") return "8.9";
  return docsVersion.label;
};

export const activeVersionURLPath = () => {
  const docsVersion = useActiveVersion();
  return docsVersion.path;
};
