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

<table>
  <thead>
    <tr>
      <th align="left">Type</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest</code></td>
      <td>
        <p>Resolves to the <strong>latest deployed version</strong> of the target resource at the moment the process element is activated.</p>
        <ul>
          <li>
            <p>
              You can use this option to easily change the target resource at runtime by deploying a new version of the resource.
              This allows for fast, iterative development, and easy hot fixes in production:
            </p>
            <ul>
              <li><p>Process instances that have not yet reached the process element will directly use the newly deployed version of the target resource once the element gets activated.</p></li>
              <li><p>If the process element has already been reached, <a href="../../../concepts/process-instance-modification">process instance modification</a> can be used to re-activate it and thereby re-link it to the newly deployed version of the target resource.</p></li>
            </ul>
          </li>
          <li><p>Be aware that using <code>latest</code> can lead to unexpected behavior if you deploy a new version of the target resource without ensuring backwards compatibility with every deployed process that depends on it.</p></li>
          <li><p>Therefore, it might not be suited for production environments that require stability and a predictable behavior.</p></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>deployment</code></td>
      <td>
        <p>Resolves to the specific version of the target resource that was <strong>deployed together</strong> with the currently running version of the process in the <strong>same deployment</strong>.</p>
        <ul>
          <li><p>This option ensures predictable behavior by tying the two versions together, and allows you to deploy future versions of the target resource without disrupting ongoing process instances.</p></li>
          <li><p>It is ideal for self-contained projects without external or shared dependencies.</p></li>
          <li>
            <p>To use the <code>deployment</code> binding option, create and deploy a <a href="../../../modeler/web-modeler/process-applications/#deploy-and-run-a-process-application">process application in Web Modeler</a>,
              or deploy multiple resources together via the <a href="../../../../apis-tools/zeebe-api/gateway-service/#deployresource-rpc"> Zeebe API</a>.
            </p>
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

:::note
If the binding type is not explicitly specified in your BPMN diagram, `latest` is used as the default.
:::
