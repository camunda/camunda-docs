---
id: intrinsic-functions
title: Intrinsic functions
description: Learn how to use intrinsic functions to preprocess connector input data before invoking a connector.
---

Intrinsic functions are transformations you can use to preprocess connector input data before invoking a connector.

- Intrinsic functions are JSON structures you can define in element template input fields.
- Intrinsic functions are executed in the connector runtime.

:::note
You can only use intrinsic functions with [outbound connectors](/components/connectors/connector-types.md#outbound-connectors) as they transform data obtained from process variables.
:::

## Use cases

A common use case is to transform a [Camunda document](/components/document-handling/getting-started.md) to a specific format when using a REST connector.

For example:

- You have a Camunda document containing some data in JSON format.
- You want to send this data in the HTTP request body to a REST API using a connector.

The [REST connector](/components/connectors/protocol/rest.md) is capable of handling documents, but the data format in which the document is sent by default may not match the format expected by the REST API.

In this example, the document in the Camunda document store is structured as follows, with the document reference stored in the `document` process variable:

```json
{
  "name": "John Doe",
  "age": 30
}
```

The REST API expects the data in the following format:

```json
{
  "user": {
    "name": "John Doe",
    "age": 30
  }
}
```

In this example, you can use the `getText` intrinsic function to extract the text content from the document and insert it into the request body. The resulting JSON structure of your connector's input would be as follows:

```json
{
  "user": {
    "camunda.function.type": "getText",
    "params": [ document ]
  }
}
```

- `document` is the process variable that contains the document reference.
- The [`getText`](#gettext) function extracts the text content from the document and inserts it into the request body as a string.

:::note

- You can use intrinsic functions with any outbound connector to execute an operation with a connector input.
- Intrinsic functions are executed in the connector runtime.

:::

## Available functions

The following prebuilt functions are available:

### `base64`

The `base64` function accepts a document or a string. It encodes the document content or string to Base64 format.

```json
{
  "camunda.function.type": "base64",
  "params": [ myDocument ]
}
```

### `createLink`

The `createLink` function accepts a document and an optional TTL (time-to-live) value. It creates a temporary pre-signed link to the document in the Camunda document storage. The link is returned as a string.

- Pre-signed links can only be created for documents that are stored in cloud storage (for example, AWS S3 or Google Cloud Storage), but not local or in-memory storage.
- The optional TTL parameter must be a valid [ISO 8601 duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) string.
- If not provided, the default TTL is 1 hour.

```json
{
  "camunda.function.type": "createLink",
  "params": [ myDocument, "PT1H" ]
}
```

### `getText`

The `getText` function accepts a document and an optional encoding parameter. It extracts the text content from the document and returns it as a string.

- The optional encoding parameter specifies the character encoding to be used when extracting the text.
- If not provided, the default encoding is UTF-8.

```json
{
  "camunda.function.type": "getText",
  "params": [ myDocument, "UTF-8" ]
}
```

### `getJson`

The `getJson` function accepts a document and an optional FEEL expression parameter. It extracts the text content from the JSON document and returns it as an object so that you can manipulate it using FEEL.

- The optional FEEL expression parameter specifies the part that will be extracted from the JSON document content.
- If not provided, the whole document is returned as a JSON object.

```json
{
  "camunda.function.type": "getJson",
  "params": [ myDocument, "field1.field2" ]
}
```

## Create a custom function

In **Self-Managed** deployments, you can create custom intrinsic functions by implementing the `IntrinsicFunctionProvider` interface
included with the [Connector SDK](/components/connectors/custom-built-connectors/connector-sdk.md), and registering it in the connector runtime.

- The custom function is implemented as a Java method inside the `IntrinsicFunctionProvider` implementation class.
- The method must be annotated with the `@IntrinsicFunction` annotation. The method arguments are transformed into a list of intrinsic function parameters.

```java
import io.camunda.document.Document;
import io.camunda.intrinsic.IntrinsicFunction;
import io.camunda.intrinsic.IntrinsicFunctionProvider;
import java.util.Base64;

public class MyFunctionProvider implements IntrinsicFunctionProvider {

  @IntrinsicFunction(name = "concat")
  public String execute(String s1, String s2) {
    return s1 + s2;
  }
}
```
