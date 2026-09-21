---
id: discovery
title: Discover the as-is process
sidebar_label: Discovery
description: "The discovery phase runs parallel specialists across internal and public sources to build a faithful as-is process description and BPMN, then closes gaps with SMEs."
keywords: ["ProcessOS Harness", "discovery", "discovery specialists", "as-is"]
---

Discovery builds a faithful picture of how a process runs today. ProcessOS Harness can researches your organizational knowledge with parallel specialists, generates as-is process descriptions and BPMN diagrams, and closes the remaining gaps with SMEs.

## Choose the right data sources

"Discovery results depend on the input" - This right, but frequently judging the input is a challange in it self. Do not waste too much time curating data sources for the first iteration. Start with what you have on hand and add more sources where required.

- Prefer primary artifacts, such as exported legacy process definitions, production configuration, and real forms, over summary slide decks.
- Include the systems the process touches, not just the process description, so integration points surface early.
- Provide recent material. Documentation describing a version of the process no longer in use produces a confident but wrong as-is model.
- Name the known gaps in `process-scope.md`. Telling ProcessOS Harness what's missing is more useful than letting it infer the gap later.

Check what you're allowed to share before you point a specialist at a source, described in [handle project data safely](../best-practices/data-handling.md).

## Discovery specialists

Discovery specialists extract insights from specific source types. The specialists setting determines which sources ProcessOS Harness reads.

ProcessOS Harness comes with for specalists. Future versions will have a plugin meachinsm to easly add specalists. For now, the Camunda Team can support you with client-specific specialists.

### Web

The web specialist searches public websites, API documentation, and product documentation. Removing the `web` specialist keeps a run entirely on internal material.

### Filesystem

The filesystem specialist searches local Markdown, PDF, BPMN, CSV, and spreadsheet files.

The `source-mode` setting controls how the filesystem specialist treats the files you list: `hint` reads them first and then searches more broadly, while `allowlist` reads only those files.

### GitHub

The GitHub specialist searches issues, pull requests, and commit history. This specialist requires the `gh` CLI.

## WIP - Discovery actions

- Define process scope
- Define high level phases
- Define detailed processes
- Sytem diagramms??? - map the external systems and manual artifacts the process integrates `/process-os-system-context`

## Next step

Continue with [transform the process to a to-be design](2-transformation.md).
