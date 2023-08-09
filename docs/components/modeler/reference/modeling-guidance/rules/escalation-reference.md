---
id: escalation-reference
title: Escalation reference
description: Reference for the `escalation-reference` rule.
---

An [escalation event](../../../../bpmn/escalation-events/) must reference an escalation defined in the process. The referenced escalation must have a defined escalation code. To fix this problem, open the **Escalation** group in the properties panel, select or create an escalation, and specify its escalation code.

Camunda 8.2 and later support catch-all events and do not require an escalation reference.

## No escalation selected

![No escalation selected](./img/escalation-reference/wrong-no-escalation-reference.png)

## No escalation code specified

![No escalation code specified](./img/escalation-reference/wrong-no-escalation-code.png)

## Escalation selected and escalation code specified

![Escalation selected and escalation code specified](./img/escalation-reference/right.png)

## Reference

- [Escalation events](../../../../bpmn/escalation-events/)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/escalation-reference.js)
