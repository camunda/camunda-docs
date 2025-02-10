---
id: file-download
title: File download
description: Learn how to download files from Web Modeler and export diagrams in different image formats.
---

import SingleFileDownloadImg from './img/download/single-file-download.png'
import MultiFileDownloadImg from './img/download/multi-file-download.png'
import DownloadBpmnImg from './img/download/download-bpmn.png'
import DownloadDmnImg from './img/download/download-dmn.png'
import DownloadFormImg from './img/download/download-form.png'
import DownloadConnectorTemplateImg from './img/download/download-connector-template.png'

<span class="badge badge--cloud">Camunda 8 only</span>

You can download all the files stored in Web Modeler to your local computer for offline editing or integration into version control.
You may also export BPMN diagrams in different image formats.

### Download from the project or folder page

To download a single file or folder, use the **Download** option in the list item's action menu:

<p><img src={SingleFileDownloadImg} style={{width: 720}} alt="Download a single file or folder" /></p>

A file will be downloaded in form of its XML or JSON definition (depending on the file type).
A folder will be downloaded as a zip archive containing all the folder's files and subfolders.

To download multiple files or folders together as a zip archive, use the **Download** option in the multi-select action bar:

<p><img src={MultiFileDownloadImg} style={{width: 720}} alt="Download multiple files or folders" /></p>

:::note Download limit
You can download up to 100 files and 20 folders at the same time.
:::

### Download from the file page

#### BPMN and DMN diagrams

You can download the diagram's BPMN 2.0/DMN 1.3-compliant XML definition from the action menu.
For BPMN, you also find the options to export the diagram as a PNG or SVG image there:

<p>
<img src={DownloadBpmnImg} style={{width: 300}} alt="Download a BPMN diagram's XML definition or export it as an image" />
<img src={DownloadDmnImg} style={{width: 280, marginLeft: 20, verticalAlign: "top"}} alt="Download a DMN diagram's XML definition" />
</p>

#### Forms

You can download the form's JSON definition (or copy it to the clipboard) from the action menu:

<img src={DownloadFormImg} style={{width: 280}} alt="Download or copy a form's JSON definition" />

#### Connector templates

You can download the template's JSON definition by clicking the download button in the toolbar:

<img src={DownloadConnectorTemplateImg} style={{width: 220}} alt="Download a Connector template's JSON definition" />
