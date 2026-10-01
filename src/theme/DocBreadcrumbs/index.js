// Why is this swizzled?
//   - Renders breadcrumbs in a wrapper div that controls font size and spacing.
// Wraps the original @theme-original/DocBreadcrumbs.

import React from "react";
import Breadcrumbs from "@theme-original/DocBreadcrumbs";
import "./index.css";

export default function DocBreadcrumbsWrapper(props) {
  return (
    <div className="doc-breadcrumbs-row">
      <Breadcrumbs {...props} />
    </div>
  );
}
