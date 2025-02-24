---
id: idp-integrate
title: Integrate IDP into your processes
description: "Integrate IDP into your end-to-end processes in Modeler."
---

import IdpElementImg from './img/idp-diagram-element.png';

You can integrate your published IDP projects into your end-to-end processes in Modeler.

## About IDP integration

## Create an IDP task

You can apply a published IDP project to a task or event via the append menu. For example:

<img src={IdpElementImg} alt="An overview of intelligent document processing" style={{border: 'none', padding: '0', marginTop: '0', backgroundColor: 'transparent'}} />

- **From the canvas:** Select an element and click the **Change element** icon to change an existing element, or use the append feature to add a new element to the diagram.
- **From the properties panel:** Navigate to the **Template** section and click **Select**.
- **From the side palette:** Click the **Create element** icon.

## IDP extraction connector configuration

You can configure the [IDP extraction connector](idp-reference.md#technical-architecture) in the properties panel.

### Input message data

| Field              | Description                                                                                                                                                                                                                                                                                                                    |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Document           | The `document` object variable used for handling documents in your Amazon AWS S3 bucket, provided as a [FEEL expression](/components/modeler/feel/what-is-feel.md) with the document reference.                                                                                                                                |
| AWS S3 Bucket name | <p><ul><li><p>Specify the name of the Amazon AWS S3 bucket where documents can be temporarily stored during Amazon Textract analysis.</p></li><li><p>For example, a typical IDP configuration requires an Amazon AWS S3 bucket named `idp-extraction-connector` for document storage during test extraction.</p></li></ul></p> |

### Output mapping

Specify the process variables that you want to map and export the IDP extraction connector response into.

| Field             | Description |
| :---------------- | :---------- |
| Result variable   | fdfd        |
| Result expression | dfdfd       |

:::info
To learn more about output mapping, see [variable/response mapping](/components/connectors/use-connectors/index.md#variableresponse-mapping).
:::

### Error handling

### Retries

### Execution listeners
