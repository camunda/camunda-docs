import React from "react";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";

const DockerComposeBaseURL =
  "https://github.com/camunda/camunda-self-managed/releases/download";

const getVersion = () => {
  const docsVersion = useActiveVersion();
  if (docsVersion.label == "Next") return "alpha";
  // NOTE: This is a workaround for the irregular release cut of the 8.7 version.
  // TODO: Remove this condition once the 8.7 is released.
  if (docsVersion.label == "8.7") return "alpha";
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
