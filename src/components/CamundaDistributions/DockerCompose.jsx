import React from "react";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";

const DockerComposeBaseURL =
  "https://github.com/camunda/camunda-distributions/releases/download";

const getVersion = () => {
  const docsVersion = useActiveVersion();
  if (docsVersion.label == "Next") return "alpha";
  if (docsVersion.label == "8.8 (unreleased)") return "8.8";
  return docsVersion.label;
};

const DockerCompose = () => {
  const version = getVersion();
  return (
    <a
      title={`${DockerComposeBaseURL}/docker-compose-${version}/docker-compose-${version}.zip`}
      href={`${DockerComposeBaseURL}/docker-compose-${version}/docker-compose-${version}.zip`}
    >
      Docker Compose
    </a>
  );
};

export default DockerCompose;
