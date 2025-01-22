import { useActiveVersion } from "@docusaurus/plugin-content-docs/client";

const DocsVersion = () => {
  const version = useActiveVersion();

  if (!version) {
    return "No active version found";
  }

  return `${version.label}`;
};

export default DocsVersion;
