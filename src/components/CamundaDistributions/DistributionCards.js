import React from "react";
import ArtifactCard from "./ArtifactCard.js";
import { DockerComposeURL } from "./DockerCompose.js";

//
export const C8Run = () => {
  const osCommand = {
    Mac: "./start.sh",
    Linux: "./start.sh",
    Windowns: ".c8run.exe start",
  };

  const versions = ["latest", "1.0.0", "1.1.0", "1.2.0"];
  const releaseNotesUrl = "https://example.com/release-notes";
  const downloadURL = "https://github.com/camunda/camunda/xyz";
  const architectures = [
    "MacOS (amd64)",
    "MacOS (arm64)",
    "Linux (amd64)",
    "Linux (arm64)",
    "Windows (amd64)",
    "Windows (arm64)",
  ];

  const osName = "Mac";
  const command = osCommand[osName];

  return (
    <ArtifactCard
      osName={osName}
      architectures={architectures}
      versions={versions}
      downloadURL={downloadURL}
      releaseNotesUrl={releaseNotesUrl}
      runCommand={command}
    />
  );
};

//
export const DockerCompose = () => {
  const versions = ["latest"];
  const releaseNotesUrl = "https://example.com/release-notes";
  const downloadURL = DockerComposeURL();
  const command = "docker compose up -d";

  return (
    <ArtifactCard
      versions={versions}
      downloadURL={downloadURL}
      releaseNotesUrl={releaseNotesUrl}
      runCommand={command}
    />
  );
};

//
export const HelmLocal = () => {
  const versions = ["1.0.0", "1.1.0", "1.2.0"];
  const releaseNotesUrl = "https://example.com/release-notes";
  const command = [
    "helm repo add camunda https://helm.camunda.io",
    "helm repo update",
    'helm install camunda camunda/camunda-platform --version "${version}" \\',
    "  --value https://helm.camunda.io/local.yaml",
  ].join("\n");

  return (
    <ArtifactCard
      versions={versions}
      releaseNotesUrl={releaseNotesUrl}
      runCommand={command}
    />
  );
};

export const Helm = () => {
  const versions = ["1.0.0", "1.1.0", "1.2.0"];
  const releaseNotesUrl = "https://example.com/release-notes";
  const command = [
    "helm repo add camunda https://helm.camunda.io",
    "helm repo update",
    'helm install camunda camunda/camunda-platform --version "${version}"',
  ].join("\n");

  return (
    <ArtifactCard
      versions={versions}
      releaseNotesUrl={releaseNotesUrl}
      runCommand={command}
    />
  );
};
