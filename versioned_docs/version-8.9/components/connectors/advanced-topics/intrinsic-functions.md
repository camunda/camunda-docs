---
id: intrinsic-functions
title: Intrinsic functions
description: Learn how to use intrinsic functions to preprocess connector input data before invoking a connector.
---

<span className="badge badge--active--outbound">Outbound</span>

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

The `getJson` function accepts a document and an optional FEEL expression parameter. It extracts the text content from the JSON document and returns it as an object.

- The optional FEEL expression parameter specifies the part that will be extracted from the JSON document content.
- If not provided, the whole document is returned as a JSON object.

```json
{
  "camunda.function.type": "getJson",
  "params": [ myDocument, "field1.field2" ]
}
```

### `createGithubAppInstallationToken`

The `createGithubAppInstallationToken` function generates a GitHub App installation access token. This is useful when you need to authenticate as a GitHub App installation to access GitHub APIs.

The function accepts three required parameters:

- `privateKey`: The RSA private key of your GitHub App (PEM format). Store this value as a secret.
- `appId`: The app ID of your GitHub App.
- `installationId`: The installation ID of your GitHub App. See [GitHub's documentation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation#generating-an-installation-access-token) for instructions on how to find your installation ID.

```json
{
  "camunda.function.type": "createGithubAppInstallationToken",
  "params": ["{{secrets.GITHUB_APP_PRIVATE_KEY}}", "12345", "67890"]
}
```

The function returns the installation access token as a string. You can use this token to authenticate GitHub API requests.

## Declare intrinsic function calls in the process model {#declare-calls}

The connector runtime runs an intrinsic function only if the deployed BPMN process declares that exact call in the connector element's own input mappings. Starting with Connectors 8.9.13, the runtime refuses intrinsic function calls that arrive through process variables or job variables.

The runtime reads the declared calls from the deployed BPMN model and applies the following rules:

- The function name and the field path must both match. For example, a `createLink` call declared on the `body` field doesn't allow a `createLink` call on `body.attachment`, and doesn't allow a `getText` call on `body`.
- The call must be written as a literal in the input mapping's FEEL expression, with `camunda.function.type` set to a string literal such as `"getText"`. The runtime recognizes calls inside context literals, list literals, `if`/`then`/`else` expressions, and `for`/`in`/`return` expressions.
- A call the runtime can't read from the model isn't declared. Examples include a function name assembled with `prefix + "getText"`, a call returned by a FEEL function, and a call stored in a process variable.
- A later input mapping that writes to the same field, or to a field above it, replaces the earlier call. The earlier declaration no longer counts.
- Custom functions registered through an `IntrinsicFunctionProvider` follow the same rules.

For example, the following input mapping with the target `body` declares a `getText` call at the field path `body.user`:

```feel
= {
  "user": {
    "camunda.function.type": "getText",
    "params": [ document ]
  }
}
```

The runtime reads the deployed model only when a job's variables contain an intrinsic function call, so jobs without calls aren't affected. After you change an input mapping, redeploy the process so the runtime reads the updated declarations. Out-of-the-box element templates that use intrinsic functions already declare their calls this way.

Values that come from outside the process model never run intrinsic functions. This includes connector results, FEEL evaluation results, and inbound connector payloads.

To configure the policy or the lookup cache of the connector runtime, see [intrinsic function allow-list](/self-managed/components/connectors/connectors-configuration.md#intrinsic-function-allow-list).

### Troubleshoot intrinsic function errors

#### Intrinsic function is not allowed by the runtime policy

The job fails with the following error:

```text
Intrinsic function '<name>' at '<path>' is not allowed by the runtime intrinsic-function policy.
```

This happens when the deployed BPMN model doesn't declare the function `<name>` at the field path `<path>`. Common causes:

- The call arrives in a process variable instead of being written in the input mapping.
- The call is declared at a different field path than the one the runtime reports.
- A later input mapping overwrites the field that declares the call.
- The deployed process is older than the input mapping you edited.
- The [allow-list mode](/self-managed/components/connectors/connectors-configuration.md#intrinsic-function-allow-list) is set to `DISABLED`, which refuses every call.

To fix it, write the call directly in the input mapping of the field named in the error, then redeploy the process. If the element uses an element template, update the element to the latest template version.

If the runtime can't read the deployed model, the job also fails and Zeebe retries it. The intrinsic function allow-list always fails closed, so no call runs until the runtime can read the model.

#### Connector result contains a forbidden literal

The job fails with the following error:

```text
The connector result contains a forbidden literal 'camunda.function.type'.
```

This happens when the value mapped to a result variable or result expression contains an object with the `camunda.function.type` key, for example because an external system returned it in a response body. The runtime refuses the value so that a response can't introduce an intrinsic function call into your process.

To fix it, use a result expression that maps only the fields you need, so the `camunda.function.type` key isn't copied into the process variables.

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
