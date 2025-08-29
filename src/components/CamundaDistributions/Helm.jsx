import React from "react";
import CodeBlock from "@theme/CodeBlock";
import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";
import { camundaReleaseVersion } from "../Versions";

const getChartVersion = () => {
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
    // In Docusaurus config, we refer to unreleased version under the URL path "/next/" as "current".
    if (docsVersion.name === "current") {
      chartVersion = chartVersion.concat(".0.0-alpha");
    }
    return `^${chartVersion}`;
  }

  return camundaVersion;
};

const getChartVersionEnvVar = () => {
  return `export HELM_CHART_VERSION="${getChartVersion()}";\n`;
};

const getChartVersionArg = () => {
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
  const versionEnvVar = getChartVersionEnvVar();
  const versionArg = getChartVersionArg();
  return (
    <>
      <CodeBlock language="shell">
        {versionEnvVar}
        helm install camunda camunda/camunda-platform {versionArg}
      </CodeBlock>
      In the rest of the documentation we will use{" "}
      <code>--version $HELM_CHART_VERSION</code> to reference the Helm chart
      version. For more details about Helm chart version, see{" "}
      <a href="#versioning">versioning</a>.
      <br />
      <br />
    </>
  );
};

export const HelmChartValuesFileLocalLink = () => {
  const version = camundaReleaseVersion();
  return (
    <a
      title={`https://helm.camunda.io/camunda-platform/values/camunda-${version}/values-local.yaml`}
      href={`https://helm.camunda.io/camunda-platform/values/camunda-${version}/values-local.yaml`}
    >
      Helm chart local values file
    </a>
  );
};

export const HelmChartValuesFileBitnamiLegacyLink = () => {
  const version = camundaReleaseVersion();
  return (
    <a
      title={`https://helm.camunda.io/camunda-platform/values/camunda-${version}/values-bitnami-legacy.yaml`}
      href={`https://helm.camunda.io/camunda-platform/values/camunda-${version}/values-bitnami-legacy.yaml`}
    >
      Helm chart Bitnami legacy values file
    </a>
  );
};

export default HelmChartInstall;
