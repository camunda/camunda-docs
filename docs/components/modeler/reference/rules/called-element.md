---
id: called-element
title: Called element
description: Reference for the `called-element` rule.
---

Take a closer look at the [`called-element`](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/called-element.js).

Call activities must specify the process ID of the called process. To fix this problem, open the **Called element** group in the properties panel and specify the process ID of the called process.

## No process ID specified

![No process ID specified](./img/called-element/wrong.png)

## Process ID specified

![Process ID specified](./img/called-element/right.png)

Learn more about [call activities](/docs/components/modeler/bpmn/call-activities/#defining-the-called-process).
