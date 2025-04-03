---
id: btp-plugin
title: SAP BTP plugin
description: "Learn about the Camunda SAP Business Technology Platform (BTP) plugin, an artifact run on BTP."
---

The Camunda SAP Business Technology Platform (BTP) plugin is an artifact run on BTP. This connects to Camunda 8 SaaS to provide:

- A generic Fiori app for starting BPMN processes and displaying [Camunda Forms](/components/modeler/forms/camunda-forms-reference.md) in the Fiori design language.
- The select exposure of SAP BTP services to [BPMN tasks](/components/modeler/bpmn/bpmn.md) and vice versa.
- A generic endpoint to start BPMN processes with.

:::note Important!
The SAP BTP plugin is an alpha feature available upon request. Visit [our contact page](/reference/contact.md) to contact us.
:::

## Plugin functionality

- Auto-start a process via URL parameter using `run=<processID>`. For example, `https://<btp plugin url>/index.html?channelId=<id>&run=application-process`.
- For debugging purposes, add `debug=true` as the URL parameter. For example, `https://<btp plugin url>/index.html?channelId=<id>&run=application-process&debug=true`.

## Camunda Forms in SAP Fiori

<!--- Layout: single row layout only, ![image-20250219112232376](/Users/volker.buzek/git/camunda/camunda-docs/docs/components/early-access/alpha/sap/img/froms-no-columns.png)

No custom properties. ![image-20250219112156011](/Users/volker.buzek/git/camunda/camunda-docs/docs/components/early-access/alpha/sap/img/forms-no-custom-properties.png)

Explain "one-user multi-page flow"

--->

### Supported form features and properties

|                  | Camunda Forms feature/property | Supported in Camunda BTP plugin? | Comments                                                                                                                                                                                                                 |
| ---------------- | ------------------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Input**        |                                |                                  |                                                                                                                                                                                                                          |
|                  | Text field                     | :white_check_mark:               |                                                                                                                                                                                                                          |
|                  | Text area                      | :white_check_mark:               |                                                                                                                                                                                                                          |
|                  | Number                         | :white_check_mark:               |                                                                                                                                                                                                                          |
|                  | Date time                      | :white_check_mark:               | Only UTC values will be stored<br />- Date format "yyyy-MM-dd", for example "2025-02-29"12<br />- Hours format will be stored as the string "10:12:34 pm"<br />- 24 hours format will be stored as the string "22:12:34" |
|                  | Expression                     | :x:                              |                                                                                                                                                                                                                          |
|                  | File picker                    | :x:                              |                                                                                                                                                                                                                          |
| **Selection**    |                                |                                  |                                                                                                                                                                                                                          |
|                  | Checkbox                       | :white_check_mark:               |                                                                                                                                                                                                                          |
|                  | Checkbox group                 | :x:                              |                                                                                                                                                                                                                          |
|                  | Radio group                    | :white_check_mark:               | Only `static` options source is supported.                                                                                                                                                                               |
|                  | Select                         | :white_check_mark:               | Only `static` options source is supported.                                                                                                                                                                               |
|                  | Tag list                       | :x:                              |                                                                                                                                                                                                                          |
| **Presentation** |                                |                                  |                                                                                                                                                                                                                          |
|                  | Text view                      | :white_check_mark:               |                                                                                                                                                                                                                          |
|                  | Image view                     | :white_check_mark:               |                                                                                                                                                                                                                          |
|                  | Table                          | :x:                              |                                                                                                                                                                                                                          |
|                  | HTML view                      | :white_check_mark:               |                                                                                                                                                                                                                          |
|                  | Document preview               | :x:                              |                                                                                                                                                                                                                          |
|                  | Spacer                         | :x:                              |                                                                                                                                                                                                                          |
|                  | Separator                      | :x:                              |                                                                                                                                                                                                                          |
| **Containers**   |                                |                                  |                                                                                                                                                                                                                          |
|                  | Group                          | :x:                              |                                                                                                                                                                                                                          |
|                  | Dynamic list                   | :x:                              |                                                                                                                                                                                                                          |
|                  | iFrame                         | :x:                              |                                                                                                                                                                                                                          |
| **Action**       |                                |                                  |                                                                                                                                                                                                                          |
|                  | Button                         | :x:                              |                                                                                                                                                                                                                          |
