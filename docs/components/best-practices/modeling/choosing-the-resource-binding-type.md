---
title: Choosing the resource binding type
tags:
  - BPMN
description: "Choose the resource binding type and understand the differences between 'latest' and 'deployment' binding for linked resources."
---

Camunda 8 offers version binding for linked processes, decisions, or forms. This allows you to deploy new versions without disrupting live processes, and prevents production outages.

You can choose the binding type for the linked target resource for the following BPMN process elements:

- [Call activities](/docs/components/modeler/bpmn/call-activities/call-activities.md#defining-the-called-process)
- [Business rule tasks](/docs/components/modeler/bpmn/business-rule-tasks/business-rule-tasks.md#defining-a-called-decision) (if the DMN decision implementation is used)
- [User tasks](/docs/components/modeler/bpmn/user-tasks/user-tasks.md#user-task-forms) (if a Camunda Form is linked)

The binding type determines the version of the target resource used at runtime.

For example, for a call activity this would be the version of the called process to be instantiated.

## Supported binding types

Camunda 8 supports the following binding types:

- `latest` resolves to the **latest deployed version** of the target resource at the moment the process element is activated.

  - This can lead to unexpected behavior if you deploy a new version of the target resource without ensuring backwards compatibility with every deployed process that depends on it.
  - Therefore, using `latest` might not be suited for production environments that require stability and a predictable behavior.

- `deployment` resolves to the specific version of the target resource that was **deployed together** with the currently running version of the process in the **same deployment**.
  - This option ensures predictable behavior by tying the two versions together, and allows you to deploy future versions of the target resource without disrupting ongoing process instances.
  - This option is ideal for self-contained projects without external or shared dependencies.
  - To use the `deployment` binding option, create and deploy a [process application in Web Modeler](/docs/components/modeler/web-modeler/process-applications.md#deploy-and-run-a-process-application), or deploy multiple resources together via the [Zeebe API](/docs/apis-tools/zeebe-api/gateway-service.md#deployresource-rpc).

:::note
If the binding type is not explicitly specified in your BPMN diagram, `latest` is used as the default.
:::
