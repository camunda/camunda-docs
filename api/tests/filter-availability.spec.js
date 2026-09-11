const {
  isAvailableInEnvironment,
  filterPathDataForEnvironment,
  filterPaths,
  extractHeaderComments,
  escapeRoute,
  pruneRefs,
} = require("../filter-availability");

test("Test SaaS-only method is available in SaaS", () => {
  expect(
    isAvailableInEnvironment(
      {
        operationId: "searchWorkspaces",
        summary: "Search workspaces",
        "x-availability": "saas",
      },
      "saas"
    )
  ).toBe(true);
});

test("Test SM-only method is available in SM", () => {
  expect(
    isAvailableInEnvironment(
      {
        operationId: "searchWorkspaces",
        summary: "Search workspaces",
        "x-availability": "sm",
      },
      "sm"
    )
  ).toBe(true);
});

test("Test SM-only method not available in SaaS", () => {
  expect(
    isAvailableInEnvironment(
      {
        operationId: "getWorkspaces",
        summary: "Get workspaces (SM-only)",
        "x-availability": "sm",
      },
      "saas"
    )
  ).toBe(false);
});

test("Test SaaS-only method not available in SM", () => {
  expect(
    isAvailableInEnvironment(
      {
        operationId: "searchWorkspaces",
        summary: "Search workspaces",
        "x-availability": "saas",
      },
      "sm"
    )
  ).toBe(false);
});

test("Test method without x-availability is available in SaaS", () => {
  expect(
    isAvailableInEnvironment(
      {
        operationId: "searchWorkspaces",
        summary: "Search workspaces",
      },
      "saas"
    )
  ).toBe(true);
});

test("Test unexpected x-availability is not available in SaaS", () => {
  expect(
    isAvailableInEnvironment(
      {
        operationId: "searchWorkspaces",
        summary: "Search workspaces",
        "x-availability": "local",
      },
      "saas"
    )
  ).toBe(false);
});

test("Test SaaS-only method with different casing is available in SaaS", () => {
  // Uppercase in spec
  expect(
    isAvailableInEnvironment(
      {
        operationId: "searchWorkspaces",
        summary: "Search workspaces",
        "x-availability": "SAAS",
      },
      "saas"
    )
  ).toBe(true);

  // Uppercase in docs repo
  expect(
    isAvailableInEnvironment(
      {
        operationId: "searchWorkspaces",
        summary: "Search workspaces",
        "x-availability": "saas",
      },
      "SAAS"
    )
  ).toBe(true);
});

test("Ignore x-availability at the path level", () => {
  expect(
    filterPathDataForEnvironment(
      {
        "x-availability": "sm",
        post: {
          operationId: "createWorkspace",
          summary: "Create a workspace (SaaS-only)",
          "x-availability": "saas",
        },
        get: {
          operationId: "getWorkspaces",
          summary: "Get workspaces (SM-only)",
          "x-availability": "sm",
        },
        delete: {
          operationId: "deleteWorkspace",
          summary: "Delete workspace (All environments)",
        },
      },
      "saas"
    )
  ).toEqual([
    {
      post: {
        operationId: "createWorkspace",
        summary: "Create a workspace (SaaS-only)",
        "x-availability": "saas",
      },
      delete: {
        operationId: "deleteWorkspace",
        summary: "Delete workspace (All environments)",
      },
      "x-availability": "sm", // ignored
    },
    true,
  ]);
});

test("Drop unused metadata when no available methods", () => {
  expect(
    filterPathDataForEnvironment(
      {
        summary: "Should be dropped",
        post: {
          operationId: "createWorkspace",
          summary: "Create a workspace (SaaS-only)",
          "x-availability": "sm",
        },
      },
      "saas"
    )
  ).toEqual([{}, true]);
});

test("Ignore refs at the path level", () => {
  expect(
    filterPathDataForEnvironment(
      {
        $ref: "clusters.yaml#/paths/~1clusters",
      },
      "saas"
    )
  ).toEqual([
    { $ref: "clusters.yaml#/paths/~1clusters" }, // ignored
    false,
  ]);
});

test("Refs should not be dropped by filterPaths", () => {
  expect(
    filterPaths(
      {
        "/clusters": { $ref: "clusters.yaml#/paths/~1clusters" },
        "/files": { $ref: "files.yaml#/paths/~1files" },
      },
      "saas"
    )
  ).toEqual([
    {
      "/clusters": { $ref: "clusters.yaml#/paths/~1clusters" },
      "/files": { $ref: "files.yaml#/paths/~1files" },
    },
    false,
    [],
  ]);
});

test("Filter out SM-only paths for SaaS", () => {
  expect(
    filterPaths(
      {
        "/workspaces": {
          post: {
            operationId: "createWorkspace",
            summary: "Create a workspace (SaaS-only)",
            "x-availability": "saas",
          },
          get: {
            operationId: "getWorkspaces",
            summary: "Get workspaces (SM-only)",
            "x-availability": "sm",
          },
          delete: {
            operationId: "deleteWorkspace",
            summary: "Delete workspace (All environments)",
          },
        },
        "/clusters": { $ref: "clusters.yaml#/paths/~1clusters" },
        "/files": {
          post: {
            operationId: "createFile",
            summary: "Create a file (SM-only)",
            "x-availability": "sm",
          },
          delete: {
            operationId: "deleteFile",
            summary: "Delete files",
            "x-availability": "sm",
          },
          summary:
            "This path should be dropped because there are no available methods",
        },
      },
      "saas"
    )
  ).toEqual([
    {
      "/workspaces": {
        post: {
          operationId: "createWorkspace",
          summary: "Create a workspace (SaaS-only)",
          "x-availability": "saas",
        },
        delete: {
          operationId: "deleteWorkspace",
          summary: "Delete workspace (All environments)",
        },
      },
      "/clusters": { $ref: "clusters.yaml#/paths/~1clusters" },
    },
    true,
    ["~1files"],
  ]);
});

test("Capture leading comment block", () => {
  expect(
    extractHeaderComments(`# Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH under
# one or more contributor license agreements. See the NOTICE file distributed
# with this work for additional information regarding copyright ownership.
# Licensed under the Camunda License 1.0. You may not use this file
# except in compliance with the Camunda License 1.0.


openapi: 3.0.3

# Should not be captured
`)
  )
    .toEqual(`# Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH under
# one or more contributor license agreements. See the NOTICE file distributed
# with this work for additional information regarding copyright ownership.
# Licensed under the Camunda License 1.0. You may not use this file
# except in compliance with the Camunda License 1.0.


`);
});

test("Escape route", () => {
  expect(escapeRoute("/clusters/{id}/sub~resource")).toBe(
    "~1clusters~1{id}~1sub~0resource"
  );
});

test("Prune some refs", () => {
  expect(
    pruneRefs(
      {
        paths: {
          "/workspaces": { $ref: "workspaces.yaml#/paths/~1workspaces" },
          "/clusters": { $ref: "clusters.yaml#/paths/~clusters" },
        },
      },
      new Set(["workspaces.yaml#/paths/~1workspaces"])
    )
  ).toEqual({
    "/clusters": { $ref: "clusters.yaml#/paths/~clusters" },
  });
});

test("Prune all refs", () => {
  expect(
    pruneRefs(
      {
        paths: {
          "/workspaces": { $ref: "workspaces.yaml#/paths/~1workspaces" },
          "/clusters": { $ref: "clusters.yaml#/paths/~clusters" },
        },
      },
      new Set([
        "workspaces.yaml#/paths/~1workspaces",
        "clusters.yaml#/paths/~clusters",
      ])
    )
  ).toEqual({});
});

test("Prune no refs", () => {
  expect(
    pruneRefs(
      {
        paths: {
          "/workspaces": { $ref: "workspaces.yaml#/paths/~1workspaces" },
          "/clusters": { $ref: "clusters.yaml#/paths/~clusters" },
        },
      },
      new Set()
    )
  ).toEqual({
    "/workspaces": { $ref: "workspaces.yaml#/paths/~1workspaces" },
    "/clusters": { $ref: "clusters.yaml#/paths/~clusters" },
  });
});
