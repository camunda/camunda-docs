// Why is this swizzled?
//   1. To render the correct versions in the version dropdown.
//     If they're viewing optimize docs, we pass the optimize docs plugin ID to the version dropdown.
// Swizzled from version 3.7.0.

import React, { type ReactNode } from "react";
import NavbarItem from "@theme-original/NavbarItem";
import type NavbarItemType from "@theme/NavbarItem";
import type { WrapperProps } from "@docusaurus/types";

import { useLocation } from "@docusaurus/router";

type Props = WrapperProps<typeof NavbarItemType> & {
  docsPluginId: string;
};

export default function NavbarItemWrapper(props: Props): ReactNode {
  const childProps = { ...props };

  // override docsPluginId for Optimize instance
  const { type } = props;
  const { pathname } = useLocation();

  if (type === "docsVersionDropdown" || type === "docsVersion") {
    if (/^\/([0-9.]*\/)?optimize/.test(pathname)) {
      childProps.docsPluginId = "optimize";
    }
  }

  return (
    <>
      <NavbarItem {...childProps} />
    </>
  );
}
