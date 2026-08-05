---
id: feel-copilot
title: FEEL Copilot
sidebar_label: FEEL Copilot
description: "Chat with the AI FEEL Copilot for help generating FEEL (Friendly Enough Expression Language) expressions in Camunda Hub."
---

import OpenFeelCopilot from './img/open-feel-copilot.png';
import FeelCopilotPanel from './img/feel-copilot-panel.png'

Chat with the AI FEEL Copilot for help generating [FEEL (Friendly Enough Expression Language)](/components/modeler/feel/what-is-feel.md) expressions in [Camunda Hub](/components/hub/workspace/modeler/launch-modeler.md).

:::note Terms of use
By using this tool, you agree to Camunda's use of the anonymized input and output data and anonymized feedback to improve it.

Camunda does not save your prompts and the resulting FEEL expressions to your account.
:::

## Get started

:::warning

- Clicking **Use Expression** on a FEEL Copilot response will overwrite your existing work.
- As the FEEL Copilot can produce errors, you **must** check its output before saving the results to your diagram.

:::

To use the FEEL Copilot in Camunda Hub, take the following steps:

1. Log in to Camunda Hub.
1. If you have not already done so, [opt in](/components/hub/organization/manage-organization-settings/enable-alpha-features.md#enable-ai-powered-features) to use this feature.
1. Open a [workspace](/components/hub/organization/manage-workspaces/index.md), or create a new one.
1. In your workspace, create a new project.
1. In your project, click **Create new > BPMN diagram**.
1. Open any FEEL Popup.

   :::note

   To open a FEEL popup from an empty diagram:
   1. In a new diagram, click the Start Event (the circle in the diagram).
   1. In the sidebar, click the plus (**+**) next to **Outputs**, and click **Variable assignment value**.
   1. Click the **Open popup editor** icon in the field to open the FEEL popup.

   :::

1. Open the FEEL Copilot panel.
   <img src={FeelCopilotPanel} alt="FEEL Copilot panel within the FEEL popup" width="500px" />

1. In the chat box, enter your prompt and click **Send**. A prompt should be a simple, clear, and concise request. See [Example Prompts](#example-prompts) for ideas. Note that more complex requests may take longer to process.
1. Wait for the FEEL Copilot to respond. This typically takes between 15-30 seconds, depending on the complexity of the prompt.
1. Click **Use expression** to save the expression in the FEEL popup.
1. Close the FEEL popup to save the expression to your diagram.

:::note
If your query is too complex, timeouts can occur when waiting for the FEEL Copilot to process a request.
:::

## Example prompts

### Generate FEEL expressions

- "Find the difference between two dates"
- "Get the name from \{"name": "Alice", "id", 123\}"
- "Check if a number is greater than 10"
- "What would this Java be in FEEL: input.trim().toUpperCase().replace(" ", "\_");"

### Translate code to FEEL

- "Translate from JUEL"
- "Translate from Python"
- "Translate from JavaScript"

### Debug & refactor FEEL

- "Fix this expression"
- "Why am I getting a null response?"
- "Make it more compact"

### Explain FEEL

- "How does this work?"
- "What does [FEEL function] do?"
- "Document how this FEEL expression works"

### Examples

- "What can the FEEL Copilot do? (list of use cases)"
- "Give me sample input data"
- "Give me an example FEEL expression"

### Limitations

- The FEEL Copilot only supports prompts up to approximately 4 MB in size.
