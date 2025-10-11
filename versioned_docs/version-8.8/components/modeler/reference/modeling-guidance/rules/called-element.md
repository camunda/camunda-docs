---
id: called-element
title: Called element
description: Reference for the `called-element` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";

Call activities must specify the [process ID of the called process](../../../../bpmn/call-activities/#defining-the-called-process). To fix this problem, open the **Called element** group in the properties panel on the right side of the screen and specify the process ID of the called process.

## <MarkerGuideline.Invalid /> No process ID specified

![No process ID specified](./img/called-element/wrong.png)

## <MarkerGuideline.Valid /> Process ID specified

![Process ID specified](./img/called-element/right.png)

## References

- [Call Activities](../../../../bpmn/call-activities/)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/called-element.js)
