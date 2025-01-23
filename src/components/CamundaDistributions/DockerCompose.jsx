import React from "react";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";

const DockerComposeBaseURL =
  "https://github.com/camunda/camunda-self-managed/releases/download";

const DockerCompose = () => {
  const docsVersion = useActiveVersion();
  const version = docsVersion == "Next" ? "alpha" : docsVersion;
  return (
    <a
      style={{ color: "var(--ifm-link-color)" }}
      class="theme-doc-version-badge badge badge--secondary"
      title={`${DockerComposeBaseURL}/docker-compose-${version}/docker-compose-${version}.zip`}
      href={`${DockerComposeBaseURL}/docker-compose-${version}/docker-compose-${version}.zip`}
    >
      Docker Compose
    </a>
  );
};

export default DockerCompose;
