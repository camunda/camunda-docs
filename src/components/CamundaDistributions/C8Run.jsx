import React from "react";
import { camundaReleaseVersion } from "../Versions";

const C8RunBaseURL = "https://downloads.camunda.cloud/release/camunda/c8run";

const C8Run = () => {
  const version = camundaReleaseVersion();
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
