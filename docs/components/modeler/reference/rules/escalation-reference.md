---
id: escalation-reference
title: Escalation Reference
description: Reference for the `escalation-reference` rule.
---

# Escalation Reference ([`escalation-reference`](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/escalation-reference.js))

An escalation event must reference an escalation defined in the process. The referenced escalation must have a defined escalation code. To fix this problem, open the _Escalation_ group in the properties panel, select or create an escalation and specify its escalation code. When deploying to Camunda 8.2 or newer no escalation reference is required.

### ❌ No escalation selected

![Wrong](./img/escalation-reference/wrong-no-escalation-reference.png)

### ❌ No escalation code specified

![Wrong](./img/escalation-reference/wrong-no-escalation-code.png)

### ✔️ Escalation selected and escalation code specified

![Right](./img/escalation-reference/right.png)

Learn more about [escalation events](/docs/components/modeler/bpmn/escalation-events/).
