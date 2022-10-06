import React, { useMemo } from "react";
import {
  useActiveDocContext,
  useVersions,
} from "@docusaurus/plugin-content-docs/client";
import {
  useDocsVersionCandidates,
  useLayoutDoc,
} from "@docusaurus/theme-common/internal";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";

// Note that the original method is memoized, and we will likely want to do the same.
//   (I can see logs from this function a dozen times per page load, due to it running for every nav link.)
// Based on https://github.com/facebook/docusaurus/blob/abe545052693bfab98b347c14f3e00709bb2ac06/packages/docusaurus-theme-common/src/utils/docsUtils.tsx#L203-L216
function useDocsVersionCandidatesAlt(docsPluginId, optimizeActiveDocContext) {
  // 1. Let docusaurus determine the version candidates -- it orders them based on what it thinks the user wants.
  //   Note that it's non-deterministic -- because it's based on what you've browsed recently.
  const versions = useDocsVersionCandidates(docsPluginId);

  // 2. But we also know which optimize versions align with which docs versions,
  //   so let's find the docs version that aligns with this current optimize doc...
  const activeOptimizeVersion = optimizeActiveDocContext.activeVersion.name;
  const activeVersionMapping = versionMappings.find(
    (x) => x.optimizeVersion === activeOptimizeVersion
  );
  // "current" is what docusaurus calls the "next" version. Naming, amiright?
  const activeDocsVersion = activeVersionMapping?.docsVersion || "current";

  // 3. Docusaurus might not have included the mapped version in its candidates!
  const index = versions.findIndex((x) => x.name === activeDocsVersion);
  console.log("versions", versions, index);
  if (index !== -1) {
    // if it _did_ include it, we can bump the mapped version to the top of the candidates:
    // thanks, stackoverflow! https://stackoverflow.com/a/48456512
    versions.unshift(versions.splice(index, 1)[0]);
  } else {
    // if it didn't include it, we can load the version ourselves, and prepend it to the top of the candidates:
    const allVersions = useVersions(docsPluginId);
    const nextVersion = allVersions.find((x) => x.name === "current");
    versions.unshift(nextVersion);
  }

  return versions;
}

// Based on https://github.com/facebook/docusaurus/blob/c811d6249e0afc23a41b7e54f88f8ce43a3ec358/packages/docusaurus-theme-common/src/utils/docsUtils.tsx#L290-L316
function useLayoutDocAlt(docId, docsPluginId) {
  // 1. Figure out if we're looking at docs or optimize
  //   There might be a more direct function to do this.
  //   `useActiveDocContext` returns an empty-ish object when it doesn't find
  //   the active doc in this instance.
  const optimizeActiveDocContext = useActiveDocContext("optimize");
  if (!optimizeActiveDocContext.activeDoc) {
    // it's a docs doc! we can use the original function call.
    return useLayoutDoc(docId, docsPluginId);
  }

  // it's an optimize doc! we have to twist the original functionality a bit.

  // 2. Determine version candidates, but we have to override this functionality too.
  const versions = useDocsVersionCandidatesAlt(
    docsPluginId,
    optimizeActiveDocContext
  );

  // 3. And then fall back to the original logic, but with _our_ version candidates.
  //   (everything in this `useMemo` is unchanged from original implementation)
  return useMemo(() => {
    const allDocs = versions.flatMap((version) => version.docs);
    const doc = allDocs.find((versionDoc) => versionDoc.id === docId);
    if (!doc) {
      const isDraft = versions
        .flatMap((version) => version.draftIds)
        .includes(docId);
      // Drafts should be silently filtered instead of throwing
      if (isDraft) {
        return null;
      }
      throw new Error(`DocNavbarItem: couldn't find any doc with id "${docId}" in version${
        versions.length > 1 ? "s" : ""
      } ${versions.map((version) => version.name).join(", ")}".
Available doc ids are:
- ${uniq(allDocs.map((versionDoc) => versionDoc.id)).join("\n- ")}`);
    }
    return doc;
  }, [docId, versions]);
}

// TODO: get this from the original instead of duplicating here
const versionMappings = [
  {
    docsVersion: "8.0",
    optimizeVersion: "3.8.0",
  },
  { docsVersion: "1.3", optimizeVersion: "3.7.0" },
];

// Swizzled from https://github.com/facebook/docusaurus/blob/abe545052693bfab98b347c14f3e00709bb2ac06/packages/docusaurus-theme-classic/src/theme/NavbarItem/DocNavbarItem.tsx
export default function DocNavbarItem({
  docId,
  label: staticLabel,
  docsPluginId,
  ...props
}) {
  const { activeDoc } = useActiveDocContext(docsPluginId);

  // 👋 this call is the only thing that changes from the original DocNavbarItem
  // const doc = useLayoutDoc(docId, docsPluginId);
  const doc = useLayoutDocAlt(docId, docsPluginId);

  // Draft items are not displayed in the navbar.
  if (doc === null) {
    return null;
  }
  return (
    <DefaultNavbarItem
      exact
      {...props}
      isActive={() =>
        activeDoc?.path === doc.path ||
        (!!activeDoc?.sidebar && activeDoc.sidebar === doc.sidebar)
      }
      label={staticLabel ?? doc.id}
      to={doc.path}
    />
  );
}
