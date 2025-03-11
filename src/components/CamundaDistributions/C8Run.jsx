import React from "react";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";

const C8RunBaseURL =
  "https://github.com/camunda/camunda/releases/tag";

const getVersion = () => {
  const docsVersion = useActiveVersion();
  if (docsVersion.label == "8.7 (unreleased)") {
    return "8.7";
  }
  if (docsVersion.label == "8.8 (unreleased)") {
    return "8.8"
  }
  return docsVersion.label;
};

const C8Run = () => {
  const version = getVersion();
  return (
    <a
      title={`${C8RunBaseURL}/c8run-${version}/`}
      href={`${C8RunBaseURL}/c8run-${version}/`}
    >
      Camunda 8 Run
    </a>
  );
};

export default C8Run;
