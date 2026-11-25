import React from "react";
import { useActiveDocContext } from "@docusaurus/plugin-content-docs/client";
import DocNavbarItem from "@theme/NavbarItem/DocNavbarItem";

/**
 * Doc navbar item that picks the first `docIds` entry that exists in the
 * currently active docs version. The stock `doc` item silently falls back to
 * the latest version when its `docId` is missing, which sends 8.8/8.9 readers
 * to 8.10 for pages that were renamed or added in later versions.
 */
export default function VersionAwareDocNavbarItem({ docIds, ...props }) {
  const { activeVersion } = useActiveDocContext(props.docsPluginId);
  const available = new Set((activeVersion?.docs ?? []).map((doc) => doc.id));
  const docId = docIds.find((id) => available.has(id)) ?? docIds[0];

  return <DocNavbarItem {...props} docId={docId} />;
}
