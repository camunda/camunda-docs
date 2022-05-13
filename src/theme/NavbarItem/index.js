import React from "react";
import OriginalNavbarItem from "@theme-original/NavbarItem";

import { useLocation } from "@docusaurus/router";

export default function NavbarItem(props) {
  const { type } = props;
  const { pathname } = useLocation();

  if (type === "docsVersionDropdown") {
    let pluginIdForDocsDropdown;

    if (/^\/optimize/.test(pathname)) {
      pluginIdForDocsDropdown = "optimize";
    }

    return (
      <>
        <OriginalNavbarItem {...props} docsPluginId={pluginIdForDocsDropdown} />
      </>
    );
  }

  return (
    <>
      <OriginalNavbarItem {...props} />
    </>
  );
}