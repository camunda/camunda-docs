// Why is this swizzled?
//   To override the `href` of `link rel=canonical`, so that we are properly
//   canonicalizing our content for search engines.
// Swizzled from version 2.4.1.

import React from "react";
import Head from "@docusaurus/Head";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import { useDoc, useDocsVersion } from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Metadata from "@theme-original/DocItem/Metadata";
import determineCanonical from "./determineCanonical";

export default function MetadataWrapper(props) {
  // Gather some context...
  const currentDoc = useDoc();
  const currentVersion = useDocsVersion();
  const allDocsData = useAllDocsData();
  const currentPlugin = allDocsData[currentVersion.pluginId];
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  console.log("sjh", {
    currentDoc,
    currentPlugin,
  });

  // From the context, identify the proper canonical
  const canonicalPath = determineCanonical(currentDoc, currentPlugin);

  // Canonical URLs should always:
  //   1. be fully qualified (Google's recommendation)
  //   2. end with a trailing slash (to avoid default-document redirects, e.g. /welcome -> /welcome/)
  const fullCanonicalUrl = `${customFields.canonicalUrlRoot}${canonicalPath}/`;
  console.log("canonical", fullCanonicalUrl);
  return (
    <>
      <Metadata {...props} />
      <Head>
        <link rel="canonical" href={fullCanonicalUrl} />
      </Head>
    </>
  );
}
