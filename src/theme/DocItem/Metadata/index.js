import React from "react";
import Metadata from "@theme-original/DocItem/Metadata";
import { useDoc, useDocsVersion } from "@docusaurus/theme-common/internal";

export default function MetadataWrapper(props) {
  const doc = useDoc();
  const {
    metadata: { unversionedId },
  } = doc;

  const docs = useDocsVersion();
  console.log("sjhsjhsjh", unversionedId, docs.docs[unversionedId]);

  return (
    <>
      <Metadata {...props} />
    </>
  );
}
