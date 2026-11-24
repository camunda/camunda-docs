import React, { useState } from "react";
import clsx from "clsx";
import styles from "../../pages/build-with-camunda.module.css";

export default function TerminalWindow({ title, children, copyable = true }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = typeof children === "string" ? children : String(children);
    const stripped = text
      .split("\n")
      .map((line) => line.replace(/^\$\s?/, ""))
      .filter((line) => !line.startsWith("#") && !line.startsWith("\u2713"))
      .join("\n")
      .trim();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(stripped).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  };

  return (
    <div className={styles.terminalWindow}>
      <div className={styles.terminalHeader}>
        <span
          className={styles.terminalDot}
          style={{ background: "#ff5f57" }}
        />
        <span
          className={styles.terminalDot}
          style={{ background: "#febc2e" }}
        />
        <span
          className={styles.terminalDot}
          style={{ background: "#28c840" }}
        />
        {title && <span className={styles.terminalTitle}>{title}</span>}
      </div>
      <div className={styles.terminalBody}>
        {copyable && (
          <button
            type="button"
            aria-label={copied ? "Copied" : "Copy code to clipboard"}
            title={copied ? "Copied" : "Copy"}
            className={clsx(
              styles.copyButton,
              copied && styles.copyButtonCopied
            )}
            onClick={handleCopy}
          >
            <span className={styles.copyButtonIcons} aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                className={styles.copyIcon}
                width="16"
                height="16"
              >
                <path
                  fill="currentColor"
                  d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
                />
              </svg>
              <svg
                viewBox="0 0 24 24"
                className={styles.successIcon}
                width="16"
                height="16"
              >
                <path
                  fill="currentColor"
                  d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                />
              </svg>
            </span>
          </button>
        )}
        <pre className={styles.terminalPre}>{children}</pre>
      </div>
    </div>
  );
}
