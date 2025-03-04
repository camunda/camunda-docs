---
id: authentication
title: "Authentication"
sidebar_label: "Authentication"
description: "Authenticating the Java client."
keywords: ["authentication", "username", "password", "basic", "oauth", "x509"]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

There are different ways to authenticate to your cluster. The following sections describe how to authenticate using the Java client.

<Tabs groupId="authenticationMethods" defaultValue="basic" queryString values={[{label: 'Basic', value: 'basic' },{label: 'OIDC', value: 'oidc' },{label: 'X.509', value: 'x509' }]}>

<TabItem value="basic">

In Java code, create a `BasicAuthCredentialsProvider` and provide it with your username and password.

```java
final var credentialsProvider =
  new BasicAuthCredentialsProviderBuilder()
    .applyEnvironmentOverrides(false)
    .username(username)
    .password(password)
    .build();
```

Next you need to provide the credentials provider to the client builder.

```java
final var client = CamundaClient.newClientBuilder()
   // other configuration
  .credentialsProvider(credentialsProvider)
  .build();
```

The client will now add a `Authorization` header to each request with the value `Basic username:password`. `username:password`
is base64 encoded.

### Environment Variables

You can also use environment variables to provide the username and password. The following environment variables are supported:

- `CAMUNDA_BASIC_AUTH_USERNAME`
- `CAMUNDA_BASIC_AUTH_PASSWORD`

When using environment variables you don't have to provide the username and password to the `CredentialsProvider`. You have
to make sure that environment overrides are applied. You can do this by explicitly setting the flag to `true`, or by omitting
it from the builder. By default, environment overrides are applied.

</TabItem>

<TabItem value="oidc">

placeholder

</TabItem>

<TabItem value="x509">

placeholder

</TabItem>
</Tabs>
