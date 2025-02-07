// Why is this swizzled?
//   To override the `href` of `link rel=canonical`, so that we are properly
//   canonicalizing our content for search engines.
// Swizzled from version 3.7.0.

import React, { type ReactNode } from "react";
import Metadata from "@theme-original/DocItem/Metadata";
import type MetadataType from "@theme-original/DocItem/Metadata";
import type { WrapperProps } from "@docusaurus/types";

import Head from "@docusaurus/Head";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import { useDoc, useDocsVersion } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import determineCanonical from "./determineCanonical";

type Props = WrapperProps<typeof MetadataType>;

export default function MetadataWrapper(props: Props): ReactNode {
  // Gather some context...
  const currentDoc = useDoc();
  const currentVersion = useDocsVersion();
  const allDocsData = useAllDocsData();
  const currentPlugin = allDocsData[currentVersion.pluginId];
  const {
    siteConfig: { customFields = {} },
  } = useDocusaurusContext();

  // From the context, identify the proper canonical
  const canonicalPath = determineCanonical(currentDoc, currentPlugin);

  let fullCanonicalUrl;
  if (/^https?:\/\/.*/i.test(canonicalPath)) {
    // The canonicalPath set in frontmatter is absolutely qualified. Trust it and use it as-is.
    fullCanonicalUrl = canonicalPath;
  } else {
    // Canonical URLs should always:
    //   1. be fully qualified (Google's recommendation)
    //   2. end with a trailing slash (to avoid default-document redirects, e.g. /welcome -> /welcome/)
    //      The required trailing slash is handled by `determineCanonical`.
    fullCanonicalUrl = `${customFields.canonicalUrlRoot}${canonicalPath}`;
  }

  return (
    <>
      <Metadata {...props} />
      <Head>
        <link rel="canonical" href={fullCanonicalUrl} />
      </Head>
    </>
  );
}
