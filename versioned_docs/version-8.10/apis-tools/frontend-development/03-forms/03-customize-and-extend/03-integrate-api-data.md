---
id: integrate-api-data
title: "Integrate API data"
description: "Integrate external business data into your forms via APIs."
---

Read this page to learn how to integrate external business data into your forms via APIs.

## Load data on form initation

Before you initiate your form with data, make sure to fetch external business data and merge it with the process variables first. Data that is not bound to a form field using a key will not be submitted, keeping process instance data clean.

As an example, use a `valuesExpression` in your form to populate the options of a select field.

```js
//...

const schema = {
  components: [
    {
      label: "Opportunities",
      type: "select",
      key: "opportunity",
      valuesExpression: "=external.salesforce.opportunities",
    },
  ],
  type: "default",
  id: "TestForm",
  schemaVersion: 12,
};

const response = await fetch(url, fetchOptions);
const opportunities = await response.json(); //...

// form context/input data
const data = {
  ...processVariables,
  external: {
    salesforce: {
      opportunities,
    },
    // ...
  },
};

await form.importSchema(schema, data);
```

## Load data on runtime with form events

:::info
<span class="badge badge--platform">Workaround</span>

Currently, there is no built-in way to update a form's context data on runtime. However, a workaround exists.
:::

To load and update data on runtime (e.g. when searching in a searchable select box, or entering a query in a text field), follow these steps:

1. Listen to the `changed`, `formField.blur`, or `formField.search` event.
2. Gather the current form state from the `changed` event, or call the `submit` function to retrieve the data.
3. Find the query term in the changed state that is relevant for your API calls.
4. Run your API call, e.g. fetch records based on the query term.
5. Re-import the form schema but with the updated data (the current form state you obtained earlier, merged with the API results).

Don't forget to block the UI, e.g. using a loading spinner.

## Load data on runtime with a custom component

A convenient way to provide realtime data fetching capabilities to your form designers is to design a custom component. For example, you can create a searcheable select that allows users to search and select a record from a CRM system. With custom components, you can create any logic for data retrieval without limitations. You could consider writing your own backend (micro-)services coupled to your components, and let the components communicate with these services to fetch domain-specifc or internal data in a secure fashion.

Learn how to develop a custom component in the [custom component guide](./02-custom-components.md).

:::note
Custom components currently can not be imported into Camunda Web or Desktop Modeler. If you use custom components, you need to host the form editor yourself.
:::

<!-- TODO
Learn more in the build your own form editor guide.
-->
