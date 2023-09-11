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
  // Gather some context....

  // 1. Doc
  //    Context about the current document,
  //    including metadata/frontMatter/any specified canonical properties on a page
  const doc = useDoc();

  // 2. DocsVersion
  //    Context about the currently browsed version,
  //    including the pluginId which is useful for finding all versions
  //    in this plugin instance
  const docsVersion = useDocsVersion();

  // 3. AllDocs
  //    Context about all defined docs versions,
  //    across both plugin instances,
  //    including every doc in the system, and its ID, and its path.
  const allDocsData = useAllDocsData();

  // 4. DocsVersionCandidates
  //    this gives me the currently browsed version + the latest version
  //    but I think I probably get more of what I need from allDocs
  const docsVersionCandidates = useDocsVersionCandidates();

  console.log("sjh", {
    doc,
    allDocsForPlugin: allDocsData[docsVersion.pluginId],
    docsVersion,
    docsVersionCandidates,
  });

  // From the context, identify the proper canonical
  const canonicalPath = determineCanonical(doc, docsVersion, allDocsData);
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
