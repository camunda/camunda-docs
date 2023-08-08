---
id: element-type
title: Element type
description: Reference for the `element-type` rule.
---

Take a closer look at [`element-type`](https://github.com/camunda/bpmnlint-plugin-camunda-compat/tree/main/rules/camunda-cloud/element-type).

While you can model using any BPMN element supported by Modeler, there are some elements that are not supported by older versions of Zeebe. Depending on the version you've selected, Modeler will mark elements that are not supported by that version. However, they may be supported by a newer version of Zeebe.

## Element type not supported by selected version

![Element type not supported by selected version](./img/element-type/wrong.png)

## Element type supported by selected version

![Element type supported by selected version](./img/element-type/right.png)

Learn more about [BPMN coverage](/docs/next/components/modeler/bpmn/bpmn-coverage/).
