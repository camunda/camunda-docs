import React from "react";
import { useLocation } from "@docusaurus/router";

export default function Property({ defaultValue, groupId, property, env }) {
  const formats = {
    property,
    env
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const value = searchParams.get(groupId) || defaultValue;
  const formattedValue = formats[value];
  return <code>{formattedValue}</code>;
}
