import React from "react";

const SCOPES = {
  "cluster-wide": {
    label: "Cluster-wide",
    title:
      "This endpoint operates on the whole cluster. It isn't scoped to a physical tenant.",
  },
  "physical-tenant": {
    label: "Physical tenant",
    title:
      "This endpoint operates within a single physical tenant. Address it with the tenant-specific base path.",
  },
};

export const MarkerScope = ({ scope }) => {
  const entry = SCOPES[scope];
  if (!entry) {
    return null;
  }
  return (
    <span className={"badge badge--scope"} title={entry.title}>
      {entry.label}
    </span>
  );
};

export default MarkerScope;
