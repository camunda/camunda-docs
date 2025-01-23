import React from "react";
import DropdownNavbarItem from "@theme-original/NavbarItem/DropdownNavbarItem";

export default function DropdownNavbarItemWrapper({ label, items, ...props }) {
  if (label === "Next") {
    label = "8.7 (unreleased)";
  }

  items = items.map((item) => {
    let { label } = item;
    if (label === "Next") {
      label = "8.7 (unreleased)";
    }
    return {
      ...item,
      label,
    };
  });

  return (
    <>
      <DropdownNavbarItem {...props} items={items} label={label} />
    </>
  );
}
