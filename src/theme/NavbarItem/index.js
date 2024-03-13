// Why is this swizzled?
//   To render the correct versions in the version dropdown.
//   If they're viewing optimize docs, we pass the optimize docs plugin ID to the version dropdown.
// Swizzled from version 2.0.1.

import React from "react";
import { useLocation } from "@docusaurus/router";
import NavbarItem from "@theme-original/NavbarItem";

const apiExplorers = [
  { id: "api-operate-docs", urlRegex: /api\/operate\// },
  { id: "api-tasklist-docs", urlRegex: /api\/tasklist\// },
  { id: "api-zeebe-docs", urlRegex: /api\/zeebe\// },
];

export default function NavbarItemWrapper(props) {
  const { type } = props;
  const { pathname } = useLocation();

  const childProps = { ...props };
  if (type === "docsVersionDropdown" || type === "docsVersion") {
    if (/^\/([0-9.]*\/)?optimize/.test(pathname)) {
      childProps.docsPluginId = "optimize";
    }
    apiExplorers.forEach(({ id, urlRegex }) => {
      if (urlRegex.test(pathname)) {
        childProps.docsPluginId = id;
        childProps.dropdownItemsAfter = [];
      }
    });
  }

  return (
    <>
      <NavbarItem {...childProps} />
    </>
  );
}
