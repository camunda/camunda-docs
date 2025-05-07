---
id: feel-playground
title: FEEL Playground
description: "Learn more about using the Camunda FEEL Playground to check and validate your FEEL expressions"
---

import PlaygroundExampleImg from './assets/feel-playground-example.png';
import PlaygroundOpenImg from './assets/feel-playground-open.png';
import PlaygroundIconApprovedImg from './assets/feel-playground-validation-approved.png';
import PlaygroundIconWarningImg from './assets/feel-playground-validation-warning.png';
import PlaygroundIconErrorImg from './assets/feel-playground-validation-error.png';
import PlaygroundExampleInvalidImg from './assets/feel-playground-example-invalid-expression.png';
import PlaygroundExampleJsonWarningImg from './assets/feel-playground-example-warning-json.png';

Use the FEEL Playground to validate and troubleshoot your FEEL expressions when modeling process diagrams in Web Modeler.

## About FEEL Playground

When using the [FEEL expression language](/components/modeler/feel/what-is-feel.md), you must specify a valid expression. The FEEL Playground provides you with a space to test and validate your FEEL expressions with contextual sample data.

The FEEL Playground is integrated into the popup FEEL editor:

<img src={PlaygroundExampleImg} alt="Example image showing the FEEL Playground Sample Data and Result of a FEEL expression validation" class="img-800"/>

- **FEEL expression**: Enter and edit the FEEL expression you want to validate.

- **Context**: A pre-filled set of [sample data and variables](/components/modeler/data-handling.md) to use as a context for validating your expression against. You can edit this sample data if required. The data must be correctly formatted as valid JSON.

- **Result**: Shows the results of the validation when run against the sample data. For example, if the expression is valid for the sample data, an [Approved validation result](#results) is returned. If there is a validation issue, a warning and description of the issue is shown to help you troubleshoot the expression.

- **FEEL Copilot**: Open the [FEEL Copilot (alpha feature)](/components/early-access/alpha/alpha-features.md) to chat with the AI FEEL Copilot and get help with generating expressions.

:::note
The latest FEEL engine version is always used to validate FEEL expressions.
:::

## Validate your FEEL expression {#validate}

To use the FEEL Playground for validation:

1. Open the properties panel of a diagram element containing the FEEL expression you want to validate.
1. To open the popup FEEL editor, click **fx** on the FEEL expression field, and click the **Open popup editor** icon in the field.

<img src={PlaygroundOpenImg} alt="click fx on the FEEL expression field, and click the Open popup editor icon in the field" class="img-500"/>

1. In the popup FEEL editor, enter and validate your expression using the contextual data. Edit the expression as required until it is valid (returns an Approved status) and no errors are shown. See [validation results](#results).

## Validation results {#results}

FEEL Playground validation results are shown as follows for each panel:

| Icon                                                                               | Status  | Description                                                                                                                                                                                                                                                                                                                                            |
| :--------------------------------------------------------------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src={PlaygroundIconApprovedImg} alt="Valid icon" className="inline-image" />  | Valid   | The FEEL expression successfully passed validation.                                                                                                                                                                                                                                                                                                    |
| <img src={PlaygroundIconWarningImg} alt="Warning icon" className="inline-image" /> | Warning | <p>The FEEL expression is invalid. Edit your expression or sample data to pass validation.</p><p>For example, there might be an invalid type in the contextual data, meaning that values could not be compared as the type does not match as expected (for example, the sample data has a numeric value instead of a boolean value in a key-pair).</p> |
| <img src={PlaygroundIconErrorImg} alt="Error icon" className="inline-image" />     | Error   | <p>The validation did not complete due to an error.</p><p>For example, you might need to check your sample contextual data JSON is formed correctly.</p>                                                                                                                                                                                               |

:::tip
Hover over an icon to see more details about the status, such as why the FEEL expression is invalid for example.
:::

## Validation examples

The following examples illustrate a few of the validation results you might obtain:

### Example valid FEEL expression

<img src={PlaygroundExampleImg} alt="Example image showing the FEEL Playground Sample Data and Result of a FEEL expression validation" class="img-600"/>

- In this example, both the FEEL expression syntax and the contextual data are valid, and the correct result is shown.

### Example invalid FEEL expression

<img src={PlaygroundExampleInvalidImg} alt="Example image showing the FEEL Playground Sample Data and Result of a FEEL expression validation" class="img-600"/>

- In this example, the FEEL expression shows an error status to indicate it did not pass validation.
- The error is caused by an extra "else" at the end of the expression. Removing this would then result in a valid expression.
- Hovering over the icon provides more detail on what is causing the error, for example "Expression evaluation failed: Unrecognized token in Expression".
