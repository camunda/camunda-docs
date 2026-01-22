---
id: import-diagram
title: Upload files
description: "You can upload a BPMN diagram, DMN diagram, or other supported file at any time with Web Modeler."
---

<span class="badge badge--cloud">Camunda 8 only</span>

You can upload a BPMN diagram, DMN diagram, or other supported file into Web Modeler using several methods:

- In a project, click **New > Upload files** and select the files from your computer.

  ![import diagram](../img/import-diagram/web-modeler-upload-file-menu-item.png)

  ![import diagram](../img/import-diagram/web-modeler-upload-file-choose.png)

  ![import diagram](../img/import-diagram/web-modeler-upload-file-completed.png)

- In a project, drag one file from your computer and drop it.

  ![import diagram](../img/import-diagram/web-modeler-project-drag-and-drop.png)

:::note
For the two options below, the content of the Web Modeler resource is replaced with the content of the file.
:::

- In a Web Modeler resource editor, open the breadcrumb menu and choose **Replace via upload**. Then, select a file from your computer.

  ![import diagram](../img/import-diagram/web-modeler-replace-via-upload-menu-item.png)

  ![import diagram](../img/import-diagram/web-modeler-replace-via-upload-choose.png)

- In a Web Modeler resource editor, drag one file from your computer and drop it onto the canvas.

  ![import diagram](../img/import-diagram/web-modeler-diagram-replace-via-drag-and-drop.png)

### Undo/redo management limitations

You cannot undo or redo any actions taken before an upload as the undo/redo history is cleared when a diagram is uploaded. This prevents inconsistencies between the uploaded diagram and any actions taken before the upload.
