## Declaring a sub-process as agentic

This rule only applies inside an ad-hoc sub-process recognized as a tool container. Camunda's provided AI Agent element templates are already compatible, at any template version. A sub-process is recognized in one of two ways:

- Its `zeebe:modelerTemplate` attribute equals `io.camunda.connectors.agenticai.aiagent.jobworker.v1`, the AI Agent job-worker template, matched at any template version.
- It carries a `zeebe:property` named `io.camunda.agenticai.toolContainer` with value `true`, whether its tools are driven by an AI Agent task in the same process or a separate one. Starting with Camunda `8.10.0-alpha4`, out-of-the-box AI Agent element templates write this property for you; it's the supported long-term path.

If you're not using an out-of-the-box template, or your template version predates that change, add the property yourself. Select the ad-hoc sub-process, open the **Extension properties** section in the properties panel, and add a property with name `io.camunda.agenticai.toolContainer` and value `true`. It appears there as a plain extension property, not a dedicated control:

![Extension properties section showing the toolContainer property on an ad-hoc sub-process with no element template applied](./img/agentic-subprocess/extension-properties.png)

In the XML:

```xml
<bpmn:adHocSubProcess id="Tools">
  <bpmn:extensionElements>
    <zeebe:properties>
      <zeebe:property name="io.camunda.agenticai.toolContainer" value="true" />
    </zeebe:properties>
  </bpmn:extensionElements>
</bpmn:adHocSubProcess>
```
