import React from "react";
import { camundaReleaseVersion } from "../Versions";

const DockerComposeBaseURL =
  "https://github.com/camunda/camunda-distributions/releases/download";

const DockerCompose = () => {
  const version = camundaReleaseVersion();
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
