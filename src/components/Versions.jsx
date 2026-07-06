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
