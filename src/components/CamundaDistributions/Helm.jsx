import React from "react";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";
import CodeBlock from "@theme/CodeBlock";

const getVersion = () => {
  const docsVersion = useActiveVersion();
  const camundaVersion = docsVersion.label.match(/\d\.\d/)[0];
  const camundaMinorVersion = camundaVersion.split(".")[1];

  // Starting from the Camunda 8.4 release, we decoupled the Helm chart version and started from version 9.
  // For more details check the Helm chart version matrix:
  // https://.camunda.io/docs/reference/supported-environments/#helm-charts-version-matrix
  if (camundaVersion >= "8.4") {
    let chartVersion = `${Number(camundaMinorVersion) + 5}`;
    // Helm --version does not support regex or glob patterns.
    // So for non-stable versions, we need to set full version name like "13.0.0-alpha".
    if (["current", "next"].includes(docsVersion.name)) {
      chartVersion = chartVersion.concat(".0.0-alpha");
    }
    return `^${chartVersion}`;
  }

  return camundaVersion;
};

const getVersionEnvVar = () => {
  return `export HELM_CHART_VERSION="${getVersion()}";\n`;
};

const getVersionArg = () => {
  const docsVersion = useActiveVersion();
  var versionArg = "--version $HELM_CHART_VERSION";
  // For unreleased Camunda versions, add Helm --devel flag to include development versions such as alpha.
  if (["current", "next"].includes(docsVersion.name)) {
    versionArg = versionArg.concat(" --devel");
  }
  return versionArg;
};

// In Docusaurus, it's a bit hard to interpolate variables in the MDX code block.
// So we format the code block here. For more details check:
// https://github.com/facebook/docusaurus/issues/5700
const HelmChartInstall = () => {
  const versionEnvVar = getVersionEnvVar();
  const versionArg = getVersionArg();
  return (
    <>
      <CodeBlock language="shell">
        {versionEnvVar}
        helm install camunda camunda/camunda-platform {versionArg}
      </CodeBlock>
      In the rest of the docmentaion we will use{" "}
      <code>--version $HELM_CHART_VERSION</code> to reference the Helm chart
      version. For more details about Helm chart version, check{" "}
      <a href="#versioning">the versioning section</a>.
      <br />
      <br />
    </>
  );
};

export default HelmChartInstall;
