// Why is this swizzled?
//   1. To override the label for "next" versions, which is not configurable in docusaurus.config.js.
// Swizzled from version 3.7.0.

import React, { type ReactNode } from "react";
import NavbarNavLink from "@theme-original/NavbarItem/NavbarNavLink";
import type NavbarNavLinkType from "@theme/NavbarItem/NavbarNavLink";
import type { WrapperProps } from "@docusaurus/types";

type Props = WrapperProps<typeof NavbarNavLinkType> & { label: string };

import { useLabelOverrides } from "./useLabelOverrides";

export default function NavbarNavLinkWrapper(props: Props): ReactNode {
  const label = useLabelOverrides(props.label);

  return (
    <>
      <NavbarNavLink {...props} label={label} />
    </>
  );
}
