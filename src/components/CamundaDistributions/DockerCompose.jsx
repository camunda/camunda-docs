import React from "react";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";
import { getCamundaVersion } from "./utils";

const DockerComposeBaseURL =
  "https://github.com/camunda/camunda-distributions/releases/download";


const DockerCompose = () => {
  const version = getCamundaVersion();
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
