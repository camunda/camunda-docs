---
id: process-landscape-visualization
title: Process Landscape Visualization
description: "A comprehensive, hierarchical view of all processes within the project."
---

import ProcessLandscapeVisualization from './img/process-landscape-visualization.png';

<span class="badge badge--cloud">Camunda 8 only</span>

The process landscape view provides a visual map of all BPMN files within a project and the interfile [call activities](/components/modeler/bpmn/call-activities/call-activities.md) connections between them.
It helps quickly understand process dependencies, flow relationships, and overall project structure — all in one interactive canvas.

<p><img src={ProcessLandscapeVisualization} alt="Process landscape visualization" /></p>

The landscape view is automatically generated from all BPMN diagrams within a project, offering insights without the need for manual maintenance or updates.

Landscape view is available by clicking **Landscape view** button from:

- Project view
- Folder view
- [Process application](/docs/components/modeler/web-modeler/process-applications.md) view

  ![process landscape visualization button](img/process-landscape-view-button.png)

## Landscape interaction

1. **Selecting a BPMN File:** Click on any node to see the BPMN file’s information including the latest version of the process on the sidebar.
   :::note
   For process applications, version tags represents a unified "versioned" snapshot of all process application files rather than separate versions for each file as is done with simple BPMN files.
   :::
   ![selected node information](img/process-landscape-node-information.png)
2. **Searching**: Press `Ctrl+F` or `⌘+F` combination to initialize search. Type the name or identifier of a BPMN file to quickly find, highlight and jump to the corresponding node.
   ![landscape search](img/process-landscape-search.png)
3. **Highlighting Paths:** Clicking on a node or connection will highlight the entire chain of related connections.
   ![landscape selected node connections](img/process-landscape-connection.png)
