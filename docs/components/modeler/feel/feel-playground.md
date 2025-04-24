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

Use the FEEL Playground to validate and troubleshoot your FEEL expressions when modeling process diagrams in Web Modeler.

## About FEEL Playground

When using the [FEEL expression language](/components/modeler/feel/what-is-feel.md), you must specify a valid expression. The FEEL Playground provides you with a space to test and validate your FEEL expressions, using context and sample data in real-time.

The FEEL Playground is integrated into the popup FEEL editor:

<img src={PlaygroundExampleImg} alt="Example image showing the FEEL Playground Sample Data and Result of a FEEL expression validation" class="img-900"/>

- **Sample data**: A pre-filled set of [sample data and variables](/components/modeler/data-handling.md) to use as a context for validating your expression. You can edit this sample data if required.

- **Result**: Shows the results of the validation when run against the sample data. For example, if the expression is valid for the sample data, an [Approved validation result](#results) is returned. If there is a validation issue, a warning and description of the issue is shown to help you troubleshoot the expression.

## Validate your FEEL expression {#validate}

To use the FEEL Playground for validation:

1. Open the properties panel of a diagram element containing the FEEL expression you want to validate.
1. To open the popup FEEL editor, click **fx** on the FEEL expression field, and click the **Open popup editor** icon in the field.

<img src={PlaygroundOpenImg} alt="click fx on the FEEL expression field, and click the Open popup editor icon in the field" class="img-500"/>

1. In the popup FEEL editor, validate your expression using the sample data, and edit the expression as required until it is valid (returns an Approved status) and no warning or errors are shown. See [validation results](#results).

## Validation results {#results}

FEEL Playground results are returned as follows:

| Icon                                                                                 | Status   | Description                                                                                                                                                                                                                                                                                                                                           |
| :----------------------------------------------------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src={PlaygroundIconApprovedImg} alt="Approved icon" className="inline-image" /> | Approved | The FEEL expression successfully passed validation.                                                                                                                                                                                                                                                                                                   |
| <img src={PlaygroundIconWarningImg} alt="Warning icon" className="inline-image" />   | Warning  | <p>The FEEL expression is invalid. Edit your expression or sample data to pass validation.</p><p>For example:</p><p><ul><li><p>Invalid type: Values could not be compared as the type does not match as expected. For example, the sample data has a numeric value instead of a boolean value in a key-pair.</p></li><li><p>Example</p></li></ul></p> |
| <img src={PlaygroundIconErrorImg} alt="Error icon" className="inline-image" />       | Error    | <p>The validation did not complete due to an error.</p><p>For example, you might need to check your sample data JSON is formed correctly as it is not valid JSON.</p>                                                                                                                                                                                 |
