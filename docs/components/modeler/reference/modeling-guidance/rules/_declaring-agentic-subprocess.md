## Declaring a sub-process as agentic

This rule only applies inside an ad hoc sub-process recognized as a tool container. A sub-process is recognized one of two ways:

- It carries a `zeebe:property` named `io.camunda.agenticai.toolContainer` with value `true`, whether its tools are driven by an AI Agent task in the same process or a separate one.
- It has the AI Agent job-worker element template applied, at any template version, even a version older than the property above. This keeps existing diagrams working: you don't need to update the template just to get lint coverage.

If you're using an out-of-the-box AI Agent element template, update it to the current version anyway: since [connectors#7882](https://github.com/camunda/connectors/issues/7882), the template writes the `toolContainer` property for you, and newer templates are the supported long-term path.

If you're not using an out-of-the-box template, or your template version predates that change, add the property yourself. Select the ad hoc sub-process, open the **Extension properties** section in the properties panel, and add a property with name `io.camunda.agenticai.toolContainer` and value `true`. It appears there as a plain extension property, not a dedicated control:

![Extension properties section showing the toolContainer property on an ad hoc sub-process with no element template applied](./img/agentic-subprocess/extension-properties.png)

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
