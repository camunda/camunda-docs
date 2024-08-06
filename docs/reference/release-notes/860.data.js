import React from "react";

export const articles = [
  {
    feature: "Encrypted inter-component communication for Web Modeler",
    component: "Web Modeler",
    url: "#encrypted-inter-component-communication-for-web-modeler",
  },
  {
    feature: "API orchestration getting started journey",
    component: "Connectors",
    url: "#api-orchestration-getting-started-journey-1",
  },
];

export const columns = [
  {
    header: "Feature",
    accessorKey: "feature",
    className: "data-table left",
    cell: ({ cell, row: { original } }) => (
      <a href={`${original.url}`} target="blank" rel="noreferrer noopener">
        {cell.getValue()}
      </a>
    ),
  },
  {
    header: "Component(s)",
    accessorKey: "component",
    className: "data-table nowrap",
  },
];
