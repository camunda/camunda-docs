// Why is this swizzled?
//   To emit a custom banner for the Zeebe REST API Explorer, which has not been released yet.
// Swizzled from version 2.4.1.

// TODO: Delete this swizzled component as part of 8.5 release!

import React from "react";
import clsx from "clsx";
import DocVersionBanner from "@theme-original/DocVersionBanner";
import { useDocsVersion } from "@docusaurus/theme-common/internal";
import { ThemeClassNames } from "@docusaurus/theme-common";

export default function DocVersionBannerWrapper(props) {
  const { pluginId } = useDocsVersion();
  if (pluginId === "api-zeebe-docs") {
    return <ZeebeRestApiBanner {...props} />;
  }

  return (
    <>
      <DocVersionBanner {...props} />
    </>
  );
}

function ZeebeRestApiBanner({ className }) {
  return (
    <div
      className={clsx(
        className,
        ThemeClassNames.docs.docVersionBanner,
        "alert alert--warning margin-bottom--md"
      )}
      role="alert"
    >
      <div>This is unreleased documentation for the Zeebe REST API.</div>
    </div>
  );
}
