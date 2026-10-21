## Declare a sub-process as agentic

This rule applies only within an ad-hoc sub-process recognized as a tool container. An ad-hoc sub-process is recognized as a tool container in any of the following ways:

- Its `zeebe:modelerTemplate` attribute is set to `io.camunda.connectors.agenticai.aiagent.jobworker.v1`, which identifies the AI Agent Sub-Process template. Any version of this template is supported.
- It has a `zeebe:property` named `io.camunda.agenticai.toolContainer` with the value `true`, regardless of whether its tools are invoked by an AI Agent Task in the same process or in a separate process. This property is the supported long-term approach.
- Its `zeebe:taskDefinition` type starts with `io.camunda.agenticai:aiagent-job-worker:`, which is the type assigned by the AI Agent Sub-Process template. This covers custom element templates that use a different `zeebe:modelerTemplate` ID but assign the same type, such as an agent template published within your organization.

Every Camunda-provided AI Agent element template sets the `io.camunda.agenticai.toolContainer` property.
The property is available across all template versions. Templates declare it as a hidden property, so it never appears as a control in the properties panel.

An element template writes its properties into the diagram only when you apply it, so an ad-hoc sub-process you modeled before the property was added keeps its original XML. Existing processes need to be updated.

### Update an existing process

While an element template is applied, the properties panel shows only the sections the template defines, and the **Extension properties** section isn't available.

If a newer version of the template is available, [update](../../../../modeler/web-modeler/element-templates/using-templates.md#updating-templates) the ad-hoc sub-process to that version. Updating writes `io.camunda.agenticai.toolContainer` into the diagram.

If no newer version is available, unlink and reapply the template instead:

1. Select the ad-hoc sub-process and [unlink](../../../../modeler/web-modeler/element-templates/using-templates.md#removing-templates) the element template. Unlinking keeps the properties you already configured.
1. Apply the same element template again. Reapplying writes `io.camunda.agenticai.toolContainer` into the diagram.

If the ad-hoc sub-process has no element template applied, add the property manually. Select the sub-process, open the **Extension properties** section in the properties panel, and add a property named `io.camunda.agenticai.toolContainer` with the value `true`:

![Extension properties section showing the toolContainer property on an ad-hoc sub-process with no element template applied](./img/agentic-subprocess/extension-properties.png)

In the XML, the property appears as follows:

```xml
<bpmn:adHocSubProcess id="Tools">
  <bpmn:extensionElements>
    <zeebe:properties>
      <zeebe:property name="io.camunda.agenticai.toolContainer" value="true" />
    </zeebe:properties>
  </bpmn:extensionElements>
</bpmn:adHocSubProcess>
```
