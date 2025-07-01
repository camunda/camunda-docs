import React from "react";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";
import { getCamundaVersion } from "./utils";

const C8RunBaseURL = "https://downloads.camunda.cloud/release/camunda/c8run";

const C8Run = () => {
  const version = getCamundaVersion();
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
