import React from "react";
import Admonition from "@theme/Admonition";
import Link from "@docusaurus/Link";

const RssIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="currentColor"
    aria-hidden="true"
  >
    <circle cx="6.18" cy="17.82" r="2.18" />
    <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
  </svg>
);

export default function RssTip({
  feedUrl = "pathname:///rss/releases/versions.xml",
  title = "Subscribe to release notifications",
  description = "release updates and get automatic notifications when new releases are published",
}) {
  return (
    <Admonition type="tip" icon={<RssIcon />} title={title}>
      <p>
        Subscribe to the{" "}
        <Link to={feedUrl}>RSS feed</Link> for {description}.
      </p>
    </Admonition>
  );
}
