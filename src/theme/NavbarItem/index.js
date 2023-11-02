// Why is this swizzled?
//   To render the correct versions in the version dropdown.
//   If they're viewing optimize docs, we pass the optimize docs plugin ID to the version dropdown.
// Swizzled from version 2.0.1.

import React from "react";
import { useLocation } from "@docusaurus/router";
import NavbarItem from "@theme-original/NavbarItem";

export default function NavbarItemWrapper(props) {
  const { type } = props;
  const { pathname } = useLocation();

  const childProps = { ...props };
  if (type === "docsVersionDropdown" || type === "docsVersion") {
    if (/^\/([0-9.]*\/)?optimize/.test(pathname)) {
      childProps.docsPluginId = "optimize";
    }
    if (/api\/operate\//.test(pathname)) {
      childProps.docsPluginId = "openapi-operate";
      childProps.dropdownItemsAfter = [];
    }
  }

  return (
    <>
      <NavbarItem {...childProps} />
    </>
  );
}
