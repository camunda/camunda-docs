---
id: custom-components
title: "Custom components"
description: "Extend form-js with custom components for your domain-specific use cases."
---

import GHIcon from "@site/src/mdx/GitHubInlineIcon";

Form-js comes with an extension point to hook in custom components. You can define the renderer, the configuration options of the component in the properties panel, and the palette entry.

Custom components are built and distributed separately from the form viewer and renderer, and can be plugged in on demand by registering them as `additionalModules`.

```js
import { Form } from "@bpmn-io/form-js-viewer";
import MyCustomComponent from "...";

new Form({
  container,
  schema,
  data,
  additionalModules: [MyCustomComponent],
});
```

Read the [step-by-step guide](https://github.com/bpmn-io/form-js-examples/tree/master/custom-components) <GHIcon /> and inspect the example component to learn how to write your own custom components.

:::note
Custom components currently can not be imported into Camunda Web or Desktop Modeler. If you use custom components, you need to host the form editor yourself.
:::

<!-- TODO
Learn more in the build your own form editor guide.
-->

## Use cases for custom components

- **Integration with external APIs:** create components that integrate with external APIs to fetch real-time data or perform specific actions. For example, a location input component could connect to a mapping API to suggest locations as users type.
- **Tailored services architecture:** write your own backend (micro-)services coupled to your components, and let the components communicate with these services to fetch domain-specifc or internal data in a secure fashion.
- **File upload:** develop a component that allows users to upload a file, which is stored in a document storage system and returns the reference ID or URL of the document as the component/form output.
- **Data visualization:** build components that visualize data directly within the form. This could include charts, graphs, or other visual representations of information relevant to the form's purpose.
- **Geolocation services:** create components that leverage geolocation services to capture or display location-based information. This can be helpful for forms that require location-specific data.
- **Payment processing:** develop secure components that integrate with payment gateways to handle financial transactions within a form.
