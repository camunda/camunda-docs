---
id: feel-copilot
title: FEEL Copilot
description: "Learn more about using the FEEL Copilot in Camunda to evaluate your FEEL expressions"
---

import CopilotExampleImg from './assets/feel-copilot-example.png';
import CopilotOpenImg from './assets/feel-copilot-open.png';
import CopilotIconApprovedImg from './assets/feel-copilot-validation-approved.png';
import CopilotIconWarningImg from './assets/feel-copilot-validation-warning.png';
import CopilotIconErrorImg from './assets/feel-copilot-validation-error.png';

Use the FEEL Copilot to validate and troubleshoot your FEEL expressions when modeling process diagrams in Web Modeler.

## About FEEL Copilot

When using the [FEEL expression language](/components/modeler/feel/what-is-feel.md), you must specify a valid expression. The FEEL Copilot helps you with this by validating your FEEL expression with context and sample data in real-time, and providing instant feedback on any issues.

The FEEL Copilot is integrated into the popup FEEL editor:

<img src={CopilotExampleImg} alt="Example image showing the Copilot Sample Data and Result of a FEEL expression validation" class="img-900"/>

- **Sample data**: A pre-filled set of [sample data and variables](/components/modeler/data-handling.md) to use as a context for validating your expression. You can edit this sample data if required.

- **Result**: Shows the results of the validation when run against the sample data. For example, if the expression is valid for the sample data, an [Approved validation result](#results) is returned. If there is a validation issue, a warning and description of the issue is shown to help you troubleshoot the expression.

:::note
You can open the FEEL Copilot for any field in the properties panel of a diagram element that allows FEEL expressions.
:::

## Validate your FEEL expression with FEEL Copilot {#validate}

To use the FEEL Copilot:

1. Open the properties panel of a diagram element containing the FEEL expression you want to validate.
1. To open the popup FEEL editor, click **fx** on the FEEL expression field, and click the **Open popup editor** icon in the field.

<img src={CopilotOpenImg} alt="click fx on the FEEL expression field, and click the Open popup editor icon in the field" class="img-500"/>

1. In the popup FEEL editor, validate your expression using the sample data, and edit the expression as required until it is valid (returns an Approved status) and no warning or errors are shown. See [validation results](#results).

## Validation results {#results}

FEEL Copilot results are returned as follows:

| Icon                                                                              | Status   | Description                                                                                                                                                                                                                                                                                                                                           |
| :-------------------------------------------------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src={CopilotIconApprovedImg} alt="Approved icon" className="inline-image" /> | Approved | The FEEL expression successfully passed validation.                                                                                                                                                                                                                                                                                                   |
| <img src={CopilotIconWarningImg} alt="Warning icon" className="inline-image" />   | Warning  | <p>The FEEL expression is invalid. Edit your expression or sample data to pass validation.</p><p>For example:</p><p><ul><li><p>Invalid type: Values could not be compared as the type does not match as expected. For example, the sample data has a numeric value instead of a boolean value in a key-pair.</p></li><li><p>Example</p></li></ul></p> |
| <img src={CopilotIconErrorImg} alt="Error icon" className="inline-image" />       | Error    | <p>The validation did not complete due to an error.</p><p>For example, you might need to check your sample data JSON is formed correctly as it is not valid JSON.</p>                                                                                                                                                                                 |
