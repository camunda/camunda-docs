// Why is this swizzled?
//   To override the `href` of `link rel=canonical`, so that we are properly
//   canonicalizing our content for search engines.
// Swizzled from version 2.4.1.

import React from "react";
import Metadata from "@theme-original/DocItem/Metadata";
import {
  useDoc,
  useDocsVersion,
  useDocsVersionCandidates,
} from "@docusaurus/theme-common/internal";
import Head from "@docusaurus/Head";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import determineCanonical from "./determineCanonical";

export default function MetadataWrapper(props) {
  // Gather some context...
  const currentDoc = useDoc();
  const currentVersion = useDocsVersion();
  const allDocsData = useAllDocsData();
  const currentPlugin = allDocsData[currentVersion.pluginId];

  console.log("sjh", {
    currentDoc,
    currentVersion,
    currentPlugin,
  });

  // From the context, identify the proper canonical
  const canonicalPath = determineCanonical(
    currentDoc,
    currentVersion,
    currentPlugin
  );
  const domain = "https://get-this-from-somewhere-dynamically";

  // Slap the proper canonical into the Head
  return (
    <>
      <Metadata {...props} />
      <Head>
        <link rel="canonical" href={domain + canonicalPath} />
      </Head>
    </>
  );
}
