import React from "react";

export const articles = [
  {
    feature: "Encrypted inter-component communication for Web Modeler",
    description:
      "You can now enable TLS-encrypted communication between Web Modeler, the REST API, and websockets.",
    component: "Web Modeler",
    url: "/docs/next/self-managed/modeler/web-modeler/configuration/ssl/",
  },
  {
    feature: "API orchestration getting started journey",
    description:
      "New platform users interested in orchestrating API endpoints now have a high-level in-product explanation of Camunda's Connector functionality.",
    component: "Connectors",
    url: "#",
  },
  {
    feature: "Remove 'Cloud' as a user-facing term",
    description:
      "'Cloud' has been removed from the URLs in SaaS versions of Modeler and Console for conciseness.",
    component: "Console, Web Modeler",
    url: "#",
  },
  {
    feature: "Incident Copilot Alpha",
    description:
      "Let AI teach you how to prevent and fix the incidents you run into while playing your process.",
    component: "",
    url: "#",
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
    header: "Description",
    accessorKey: "description",
    className: "data-table left",
  },
  {
    header: "Component(s)",
    accessorKey: "component",
    className: "data-table nowrap",
  },
];
