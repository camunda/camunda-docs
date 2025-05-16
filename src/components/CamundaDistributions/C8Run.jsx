import React from "react";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";

const C8RunBaseURL = "https://downloads.camunda.cloud/release/camunda/c8run";

const getVersion = () => {
  const docsVersion = useActiveVersion();
  if (docsVersion.name == "current") {
    const camundaVersion = docsVersion.label.match(/\d\.\d/);
    return camundaVersion;
  }
  return docsVersion.name;
};

const C8Run = () => {
  const version = getVersion();
  return (
    <a
      title={`${C8RunBaseURL}/${version}/`}
      href={`${C8RunBaseURL}/${version}/`}
    >
      Camunda 8 Run
    </a>
  );
};

export default C8Run;
