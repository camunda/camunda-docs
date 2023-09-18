---
id: play-your-process
title: Play mode for rapid validation
description: "Play mode gives developers a playground environment to quickly iterate and manually test their processes."
---

<span class="badge badge--cloud">Camunda 8 only</span>

In the **Play** mode, developers have access to a Zeebe-powered playground environment within Web Modeler.

### Views

There are four different main views in Play:

1. The **Play** home button contains getting started information.
2. The **Deployment** view shows all processes and decisions available on the Play environment. You can manually deploy files here.
3. The **Monitoring** view shows all process instances, incidents, and messages on the environment. Select a process instance to view and continue its progress.
4. The **Connectors** tab shows the connector secrets and available connectors.

### Playing a process

Click on the action icons next to a BPMN element to play through the process. Depending on the BPMN element, there may be a different action:

- **User tasks** display the defined form on click, if possible. Form results are saved for the rest of the session and auto-filled. You can click `Reset` to reset the form to its defaults.
- **Service tasks** are simulated on click. You can mock a service by manually entering variables when completing a service task
- **Send tasks** are simulated on click.
- **Receive tasks** and **message events** are correlated as defined. You can create a message under the **Message Subscriptions** tab.
- **Manual tasks** and **undefined tasks** are automatically completed.
- **Business rule tasks** are automatically executed as defined and their results can be inspected if the DMN file has been deployed to Play.
- **Outbound connectors** are executed as defined on click. When you deploy a process with a Connector secret, there is a notification reminding you to add those secrets. When you click that notification, Play extracts secret names from your BPMN diagram and adds it to the list.
- **Call activities** can be navigated into and performed, if the call activity's process has been deployed to Play.
- **Timer events** are executed as defined, with an option to click on them to adjust the system time to the necessary time to trigger them.
- **Gateways** are executed as defined. For example, exclusive gateways check the process's variables before deciding on the next path.

Many action icons have alternatives. For example, user tasks can be completed with or without a form, and service tasks can be completed with or without adding variables to the process.

![play mode](img/play-mode.png)

### Replaying a process

Play has some features to make replaying a process more efficient.

Play saves your inputs when completing user task forms or completing tasks with variables. Play shows you the most recent input the next time you click the action icon next to the element.

After completing part of your process, you can **rewind** to a previous task to test a different scenario of your flow. Play will cancel the current instance, start a new instance, and replay your actions up to the selected previous task.

#### Incidents

Incidents are raised as they would be in Zeebe. Here are some common incidents and how to prevent or resolve them in Play:

- `IO_MAPPING_ERROR`: Failed to evaluate expression '{[someExpression]}' no variable found for name '[someVariable]'.
  - _Solution:_ Check the **Variables** tab to see if the variable is set as expected. Then, check your process to see where the variable should have been set and debug. If needed, you can manually set the variable in Play.
- `CALLED_DECISION_ERROR`: Expected to evaluate decision '{[someDecision]}', but no decision found for id '[someDecision]'.
  - _Solution:_ Your DMN file has not been deployed. Go to the **Deployment** tab and upload a DMN file from your local machine.
- `CALLED_ELEMENT_ERROR`: Expected process with BPMN process id '{[someProcessID]}' to be deployed, but not found.
  - _Solution:_ Your process has not been deployed. Open Play on the called process to load it to the Play environment. Alternatively, you can also upload a BPMN file from your local machine.
- `JOB_NO_RETRIES`: Secret with name '{[someSecret]}' is not available.
  - _Solution:_ Go to the **Connectors** tab and enter the secret. Alternatively, you can also hard-code the secret into your BPMN diagram (not suggested).
- `JOB_NO_RETRIES`: `javax.validation.ValidationException`: Found constraints violated while validating input: - [data.text]: must not be blank
  - _Solution:_ Your FEEL expression may not have evaluated correctly. Ensure all your variables are set as expected and you aren't combining strings with number variables.

### Limitations and availability

Play uses the most recent alpha version of Zeebe available. Any BPMN elements not available in the most recent alpha release will not be available in Play.
In addition, **inbound Connectors** are not supported.

For SaaS, Play is available to all Web Modeler users with editor or admin permissions within a project. It is not available to users with an Enterprise plan, which includes some consultants.

For Self-Managed, Play is controlled by the **PLAY_ENABLED** flag. It is `true` by default for the Docker distribution for development use, and `false` by default on the Kubernetes distribution for production use.

### Alpha feature

Play is an alpha feature for a few reasons:

- Play runs on community-built projects, as described in the [Zeebe-Play repository](https://github.com/camunda-community-hub/zeebe-play).
- Play is run on completely isolated Camunda-hosted infrastructure from the core SaaS or Self-Managed Camunda deployment. It can only receive information from Web Modeler, and can only communicate externally using Connectors and the user-defined secrets in the secret store or BPMN diagram.

  :::note
  Play is not authenticated, so anyone with the URL can access it. You should not submit personal or confidential information to Play.
  :::

- To mitigate this risk, there is a 34-character randomly generated UUID in the URL. Each session lasts approximately 20 minutes and the Play environment and its data are automatically deleted at the end of each session. You can reset the session timer by re-opening Play.

For more information about terms, see our [licensing and terms page](https://legal.camunda.com/licensing-and-other-legal-terms#c8-saas-trial-edition-and-free-tier-edition-terms).
