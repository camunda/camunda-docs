import React, { useState } from "react";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";

const ArtifactCard = ({
  osName = "",
  architectures = [],
  versions = [],
  downloadURL = "",
  releaseNotesUrl = "",
  runCommand = "",
}) => {
  const [architecture, setArchitecture] = useState(architectures[0]);
  const [version, setVersion] = useState(versions[0]);

  const handleDownload = () => {
    window.open(downloadUrl, "_blank");
  };

  return (
    <div className={styles.card}>
      <div className={styles.dropdownContainer}>
        {osName != "" && (
          <>
            <label>System</label>
            <select
              value={architecture}
              onChange={(e) => setArchitecture(e.target.value)}
            >
              {architectures.map((arch) => (
                <option key={arch} value={arch}>
                  {arch}
                </option>
              ))}
            </select>
          </>
        )}
        {version != null && (
          <>
            <label>Version</label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            >
              {versions.map((ver) => (
                <option key={ver} value={ver}>
                  {ver}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <div className={styles.linkContainer}>
        <Link to={releaseNotesUrl}>View Release Notes</Link>
      </div>
      <div>
        {downloadURL != "" && (
          <button className={styles.downloadButton} onClick={handleDownload}>
            Download
          </button>
        )}
        <br />
        {runCommand != "" && (
          <CodeBlock language="shell">
            {runCommand.replaceAll("${version}", version)}
          </CodeBlock>
        )}
      </div>
    </div>
  );
};

export default ArtifactCard;
