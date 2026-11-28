import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "../../pages/build-with-camunda.module.css";

const PROMPT = /^\$\s?/;

function CopyButton({ label, copied, inline, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={copied ? "Copied" : "Copy"}
      className={clsx(
        styles.copyButton,
        inline && styles.copyButtonInline,
        copied && styles.copyButtonCopied
      )}
      onClick={onClick}
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
  );
}

export default function TerminalWindow({ title, children, copyable = true }) {
  const text = typeof children === "string" ? children : String(children);
  const lines = text.split("\n");
  // Several commands get one copy button each, so a paste runs one command
  const perCommand =
    copyable && lines.filter((line) => PROMPT.test(line)).length > 1;
  const [copied, setCopied] = useState(null);
  const [status, setStatus] = useState({ message: "", failed: false });
  const resetTimer = useRef();

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copy = (id, value) => {
    const report = (copiedId, message) => {
      setCopied(copiedId);
      setStatus({ message, failed: copiedId === null });
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(
        () => {
          setCopied(null);
          setStatus({ message: "", failed: false });
        },
        copiedId === null ? 6000 : 1500
      );
    };
    // Runs inside then() so a missing Clipboard API also reports a failure
    Promise.resolve()
      .then(() => navigator.clipboard.writeText(value))
      .then(
        () => report(id, "Copied to clipboard"),
        () => report(null, "Copy failed. Select the text and copy it manually.")
      );
  };

  const copyAll = () =>
    copy(
      "all",
      lines
        .map((line) => line.replace(PROMPT, ""))
        .filter((line) => !line.startsWith("#") && !line.startsWith("\u2713"))
        .join("\n")
        .trim()
    );

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
        {copyable && !perCommand && (
          <CopyButton
            label="Copy code to clipboard"
            copied={copied === "all"}
            onClick={copyAll}
          />
        )}
        <pre className={styles.terminalPre}>
          {perCommand
            ? lines.map((line, index) => {
                if (!PROMPT.test(line)) {
                  return (
                    <span key={index} className={styles.terminalLine}>
                      {line}
                    </span>
                  );
                }
                const command = line.replace(PROMPT, "");
                return (
                  <span key={index} className={styles.terminalCommand}>
                    <span>{line}</span>
                    <CopyButton
                      label={`Copy ${command}`}
                      copied={copied === index}
                      inline
                      onClick={() => copy(index, command)}
                    />
                  </span>
                );
              })
            : children}
        </pre>
        {copyable && (
          <span
            role="status"
            className={clsx(
              styles.copyStatus,
              !status.failed && styles.visuallyHidden
            )}
          >
            {status.message}
          </span>
        )}
      </div>
    </div>
  );
}
