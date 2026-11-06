---
id: feel-playground
title: FEEL Playground
description: "Learn more about using the Camunda FEEL Playground to check and validate your FEEL expressions"
---

import PlaygroundExampleImg from './assets/feel-playground-example.png';
import PlaygroundOpenImg from './assets/feel-playground-open.png';
import PlaygroundPromptingExampleImg from './assets/feel-playground-prompting-example.png';
import PlaygroundModelSpecificPromptingExampleImg from './assets/feel-playground-provider-specific-prompting-example.png';

Use the FEEL Playground to validate and troubleshoot your FEEL expressions when modeling process diagrams in Camunda Hub.

## About FEEL Playground

When using the [FEEL expression language](/components/modeler/feel/what-is-feel.md) in Camunda, your FEEL expressions must be valid. The FEEL Playground allows you to test and validate your FEEL expressions using sample contextual data.

The FEEL Playground is integrated into the popup FEEL editor:

<img src={PlaygroundExampleImg} alt="Example image showing the FEEL Playground Sample Data and Result of a FEEL expression validation" class="img-800"/>

- **FEEL expression**: Enter and edit the FEEL expression you want to validate.

- **Context**: A JSON object containing [sample data and variables](/components/modeler/data-handling.md) for evaluating your expression. Camunda saves the context for the field and restores it when you reopen the FEEL Playground.

- **Result**: Shows the result of evaluating the expression against the context, including warnings or errors.

- **FEEL Copilot**: (For SaaS only) Open the [FEEL Copilot (alpha feature)](/components/early-access/alpha/alpha-features.md) to chat with the AI FEEL Copilot and get help with generating expressions.

:::note
The FEEL Playground evaluates expressions in the connected environment when it runs Camunda 8.9 or newer. If runtime evaluation isn't available, it uses the built-in FEEL engine and displays the reason in a warning badge.
:::

## Validate your FEEL expression {#validate}

To use the FEEL Playground for validation:

1. Open the properties panel of a diagram element containing the FEEL expression you want to validate.
1. To open the popup FEEL editor, click **fx** on the FEEL expression field, and click the **Open popup editor** icon in the field.

   <img src={PlaygroundOpenImg} alt="click fx on the FEEL expression field, and click the Open popup editor icon in the field" class="img-500"/>

1. In the popup FEEL editor, enter your expression and context. Review the result, warnings, or errors, and edit the expression as required.

## Prompting in FEEL Playground {#prompting}

Use prompting in FEEL Playground to help you write FEEL expressions.

To prompt in FEEL Playground:

1. Open the properties panel of a diagram element that contains the FEEL expression you want to validate.
1. In the FEEL expression field, click **fx**, then click **Open popup editor**.

   <img src={PlaygroundOpenImg} alt="click fx on the FEEL expression field, and click the Open popup editor icon in the field" class="img-500"/>

1. In the popup editor, enter your prompt details.
1. Click **Use expression** to use your prompt in your FEEL expression.

   <img src={PlaygroundPromptingExampleImg} alt="Example image showing the FEEL Playground Sample Data and Result of a FEEL expression validation" class="img-600"/>

### LLM provider-specific prompting

Prompting supports prompt creation for specific LLM providers.

For example, a prompt like **"Please create a prompt for a classification agent that needs to classify text received by a customer to a list of "sentiment". My model is OpenAI o3."** is treated as an OpenAI-specific prompt.

<img src={PlaygroundModelSpecificPromptingExampleImg} alt="Example image showing the FEEL Playground Sample Data and Result of a FEEL expression validation" class="img-600"/>
