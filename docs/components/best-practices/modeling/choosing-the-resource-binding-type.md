---
title: Choosing the resource binding type
tags:
  - BPMN
description: "Understand the differences between 'latest' and 'deployment' binding for linked resources."
---

Camunda 8 offers version binding for linked processes, decisions, or forms so you can deploy new versions without disrupting live processes and prevent production outages.

For the following elements in a BPMN process, you can choose the binding type for the linked target resource:

- [call activities](/docs/components/modeler/bpmn/call-activities/call-activities.md#defining-the-called-process)
- [business rule tasks](/docs/components/modeler/bpmn/business-rule-tasks/business-rule-tasks.md#defining-a-called-decision) (if the DMN decision implementation is used)
- [user tasks](/docs/components/modeler/bpmn/user-tasks/user-tasks.md#user-task-forms) (if a Camunda Form is linked)

The binding type determines the version of the target resource that will be used at runtime.
For example, in case of a call activity, it would be the version of the called process to be instantiated.

The following binding types are currently supported in Camunda 8:

- **`latest`** will resolve to the **latest deployed version** of the target resource at the moment the process element is activated.
  Be aware that this can lead to unexpected behavior if you deploy a new version of the target resource without ensuring backwards compatibility with every deployed process that depends on it.
  Therefore, using `latest` might not be suited for production environments that require stability and a predictable behavior.

- **`deployment`** will resolve to the particular version of the target resource that was **deployed together** with the currently running version of the process in the **same deployment**.
  This option ensures a predictable behavior by tying the two versions together and allows you to deploy future versions of the target resource without disrupting ongoing process instances.
  It is ideal for self-contained projects without external or shared dependencies.  
  To benefit from the `deployment` binding option, create and deploy a [process application in Web Modeler](/docs/components/modeler/web-modeler/process-applications.md#deploy-and-run-a-process-application)
  or deploy multiple resources together via the [Zeebe API](/docs/apis-tools/zeebe-api/gateway-service.md#deployresource-rpc).

:::note
If the binding type is not explicitly specified in your BPMN diagram, `latest` will be used as the default.
:::
