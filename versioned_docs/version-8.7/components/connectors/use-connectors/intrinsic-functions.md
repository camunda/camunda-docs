---
id: intrinsic-functions
title: Intrinsic functions
description: Learn how to use intrinsic functions with connectors
---

Intrinsic functions are special transformations that can be used to preprocess connector input data before invoking the connector.
Intrinsic functions are JSON structures that can be defined in the element template input fields. They are executed in the connector runtime.

Intrinsic functions are used to transform data obtained from process variables, so they are only applicable to outbound connectors.

## When to use intrinsic functions

One of the common intrinsic function applications is to transform a [Camunda document](/components/concepts/document-handling.md) to a specific format when using a REST connector.

Consider the following example:

- You have a Camunda document containing some data in JSON format
- You want to send this data in the HTTP request body to a REST API using a connector

The [REST connector](/components/connectors/protocol/rest.md) is capable of handling documents, but the data format in which the document is sent by default may not match the format expected by the REST API.

Assuming the document in the Camunda document store is structured like this, while the document reference is stored in the process variable `document`:

```json
{
  "name": "John Doe",
  "age": 30
}
```

And the REST API expects the data in the following format:

```json
{
  "user": {
    "name": "John Doe",
    "age": 30
  }
}
```

You can use the `getText` intrinsic function to extract the text content from the document and insert it into the request body. The resulting JSON structure of your connector's input would look like this:

```json
{
  "user": {
    "camunda.function.type": "getText",
    "params": [ document ]
  }
}
```

`document` is the process variable that contains the document reference. The [`getText`](#gettext) function will extract the text content from the document and insert it into the request body as a string.

You can use intrinsic functions with any outbound connector if you want to execute an operation with a connector input.
Intrinsic functions are executed in the connector runtime.

## Available functions

The following functions are available for use out of the box:

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
Pre-signed links can only be created for documents that are stored in a cloud storage (e.g. AWS S3 or Google Cloud Storage, but not local or in-memory storage).

The optional TTL parameter must be a valid [ISO 8601 duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) string. If not provided, the default TTL is 1 hour.

```json
{
  "camunda.function.type": "createLink",
  "params": [ myDocument, "PT1H" ]
}
```

### `getText`

The `getText` function accepts a document and an optional encoding parameter. It extracts the text content from the document and returns it as a string.
The optional encoding parameter specifies the character encoding to be used when extracting the text. If not provided, the default encoding is UTF-8.

```json
{
  "camunda.function.type": "getText",
  "params": [ myDocument, "UTF-8" ]
}
```

## Creating custom functions

On **Self-Managed** deployments, you can create custom intrinsic functions by implementing the `IntrinsicFunctionProvider` interface
shipped with the [Connector SDK](/components/connectors/custom-built-connectors/connector-sdk.md) and registering it in the connector runtime.

The custom function is implemented as a Java method inside the `IntrinsicFunctionProvider` implementation class.
The method must be annotated with the `@IntrinsicFunction` annotation. The method arguments will be transformed into a list of intrinsic function parameters.

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
