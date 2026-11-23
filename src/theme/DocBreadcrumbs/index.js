// Why is this swizzled?
//   - Renders breadcrumbs in a wrapper div that controls font size and spacing.
//   - Adds the "Copy page" menu at the right end of the breadcrumb row. The
//     original component returns null when there are no breadcrumbs, but this
//     row (and the menu) still renders.
// Wraps the original @theme-original/DocBreadcrumbs.

import React from "react";
import Breadcrumbs from "@theme-original/DocBreadcrumbs";
import CopyPageMenu from "@site/src/components/CopyPageMenu";
import "./index.css";

export default function DocBreadcrumbsWrapper(props) {
  return (
    <div className="doc-breadcrumbs-row">
      <Breadcrumbs {...props} />
      <CopyPageMenu />
    </div>
  );
}
