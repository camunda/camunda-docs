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

# Plugin functionality

- auto-start a process via URL parameter `run=<processID>`, fex `https://<btp plugin url>/index.html?channelId=<id>&run=application-process`
- for debugging purposes: add `debug=true` as URL parameter, fex `https://<btp plugin url>/index.html?channelId=<id>&run=application-process&debug=true`

# Camunda Forms in SAP Fiori

Layout: single row layout only, ![image-20250219112232376](/Users/volker.buzek/git/camunda/camunda-docs/docs/components/early-access/alpha/sap/img/froms-no-columns.png)

No custom properties. ![image-20250219112156011](/Users/volker.buzek/git/camunda/camunda-docs/docs/components/early-access/alpha/sap/img/forms-no-custom-properties.png)

Explain "one-user multi-page flow"

## Matrix: supported Form features and properties

|                  | Camunda Forms feature/property | supported in Camunda BTP Plugin? | remarks                                                                                                                                                                                                                       |
| ---------------- | ------------------------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Input**        |                                |                                  |                                                                                                                                                                                                                               |
|                  | Text field                     | :white_check_mark:               |                                                                                                                                                                                                                               |
|                  | Text area                      | :white_check_mark:               |                                                                                                                                                                                                                               |
|                  | Number                         | :white_check_mark:               |                                                                                                                                                                                                                               |
|                  | Date time                      | :white_check_mark:               | only UTC values will be stored<br />- will be stored in format "yyyy-MM-dd", fex "2025-02-29"12<br />- hours format will be stored as the string "10:12:34 pm"<br />- 24 hours fromat will be stored as the string "22:12:34" |
|                  | Expression                     | :x:                              |                                                                                                                                                                                                                               |
|                  | File Picker                    | :x:                              |                                                                                                                                                                                                                               |
| **Selection**    |                                |                                  |                                                                                                                                                                                                                               |
|                  | Checkbox                       | :white_check_mark:               |                                                                                                                                                                                                                               |
|                  | Checkbox group                 | :x:                              |                                                                                                                                                                                                                               |
|                  | Radio group                    | :white_check_mark:               | only `static` Options source is supported                                                                                                                                                                                     |
|                  | Select                         | :white_check_mark:               | only `static` Options source is supported                                                                                                                                                                                     |
|                  | Tag list                       | :x:                              |                                                                                                                                                                                                                               |
| **Presentation** |                                |                                  |                                                                                                                                                                                                                               |
|                  | Text view                      | :white_check_mark:               |                                                                                                                                                                                                                               |
|                  | Image view                     | :white_check_mark:               |                                                                                                                                                                                                                               |
|                  | Table                          | :x:                              |                                                                                                                                                                                                                               |
|                  | HTML view                      | :white_check_mark:               |                                                                                                                                                                                                                               |
|                  | Document preview               | :x:                              |                                                                                                                                                                                                                               |
|                  | Spacer                         | :x:                              |                                                                                                                                                                                                                               |
|                  | Separator                      | :x:                              |                                                                                                                                                                                                                               |
| **Containers**   |                                |                                  |                                                                                                                                                                                                                               |
|                  | Group                          | :x:                              |                                                                                                                                                                                                                               |
|                  | Dynamic list                   | :x:                              |                                                                                                                                                                                                                               |
|                  | iFrame                         | :x:                              |                                                                                                                                                                                                                               |
| **Action**       |                                |                                  |                                                                                                                                                                                                                               |
|                  | Button                         | :x:                              |                                                                                                                                                                                                                               |
