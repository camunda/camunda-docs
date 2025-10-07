import React from "react";
import { useLocation } from "@docusaurus/router";

export default function Property({
  defaultValue,
  groupId,
  property,
  env,
  helm,
}) {
  const formats = {
    property,
    env,
    helm,
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const value = searchParams.get(groupId) || defaultValue;
  const formattedValue = formats[value]; // non-breaking hyphen
  return <code style={{ "white-space": "nowrap" }}>{formattedValue}</code>;
}
