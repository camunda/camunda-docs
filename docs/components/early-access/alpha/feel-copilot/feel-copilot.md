---
id: feel-copilot
title: FEEL Copilot
sidebar_label: FEEL Copilot
description: "Chat with the AI FEEL Copilot for help generating FEEL (Friendly Enough Expression Language) expressions in Web Modeler."
---

Chat with the AI FEEL Copilot for help generating FEEL (Friendly Enough Expression Language) expressions in [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md).

:::note Terms of use
By using this tool, you agree to Camunda's use of the anonymized input and output data and anonymized feedback to improve it.

Camunda does not save your prompts and the resulting FEEL expressions to your account.
:::

## Get started

:::warning
Clicking "Use Expression" on a FEEL Copilot response will overwrite existing work.
:::

To use the FEEL Copilot in Web Modeler, take the following steps:

1. If you have not already done so, [opt in](/components/console/manage-organization/enable-alpha-features.md#enable-ai-powered-features) to use this feature.
2. Log in to [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md).
3. Click **New project > Create new > BPMN diagram**
4. Open a FEEL Popup. In a new diagram, you can click the Start Event (the circle in the diagram), then the + sign next to "Outputs" in the right sidebar. Click "Variable assignment value", then the two overlapping squares on the right side of the field.
5. Click the arrow next to FEEL Copilot to open it
6. In the chat box, enter your prompt. A prompt should be a simple, clear, and concise request. For example, "Find the difference between two dates" or "Get the name from {“name”: “Alice”, "id", 123}". Note that more complex requests may take longer to process.
7. Wait for the FEEL Copilot to respond. This typically takes between 15-30 seconds, depending on the prompt.

:::note
Timeouts can occur during this step if your query is too complex.
:::

## Example Prompts

### Generate FEEL expressions

Check if a number is greater than 10
What would this Java be in FEEL {input.trim().toUpperCase().replace(” “, “_”);

### Translate Code to FEEL

Translate from JUEL
Translate from Python
Translate from JavaScript

### Debugging & Refactoring FEEL

Fix this expression
Why am I getting a null response?
Make it more compact

### Explain FEEL

How does this work?
What does {FEEL function} do?
Document how this FEEL expression works

### Examples

What can the FEEL Copilot do? (list of use cases)
Give me sample input data
Give me an example FEEL expression

### Limitations

- The FEEL Copilot only supports prompts up to approximately 4 MB in size.
