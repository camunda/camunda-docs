import React, { useId } from "react";
import Link from "@docusaurus/Link";

export default function GlossaryTerm({ href, summary, title, children }) {
  const tooltipId = useId();

  return (
    <span className="glossary-term">
      <Link
        className="glossary-term__link"
        to={href}
        aria-describedby={summary ? tooltipId : undefined}
      >
        {children}
      </Link>
      {summary ? (
        <span id={tooltipId} className="glossary-term__tooltip" role="tooltip">
          <span className="glossary-term__tooltip-title">{title}</span>
          <span>{summary}</span>
        </span>
      ) : null}
    </span>
  );
}
