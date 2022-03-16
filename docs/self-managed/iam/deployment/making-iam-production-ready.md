---
id: making-iam-production-ready
title: "Making IAM production-ready"
sidebar_label: "Making IAM production-ready"
---

:::caution
IAM has been replaced with Identity for version 1.4+. Please refer to the
[Identity documentation](../../identity/what-is-identity.md) for ongoing support.
:::

The IAM component offers a quick start method to swiftly get up and running. This means we handle a few tasks to remove production level complexity. To ensure your IAM instance is ready for use in a production setting, we suggest performing the following tasks.

### Set the database encryption key variable

The IAM component stores certain information requiring encryption. By default, if no value is set for the `DATABASE_ENCRYPTION_KEY` environmental variable during each start of the IAM service, a value is generated.

To maintain a consistent value, set the `DATABASE_ENCRYPTION_KEY` environmental variable to an alpha-numeric string.

:::tip
We suggest a string length of 32 characters.
:::

### Set the token signing key variable

The IAM component generates authentication tokens. To do this, a signing key must be used. By default, if no signing key is provided during each start of the IAM service, one is automatically generated.

To use authentication tokens generated before a service restart, set the `TOKEN_SIGNING_KEY` environmental value
to a JSON formatted output from a signing key generator.

:::tip
Unsure how to generate a JSON Web Key? Visit the [Nimbus JOSE + JWT documentation](https://connect2id.com/products/nimbus-jose-jwt/generator) for examples.
:::

### Enable access control

The IAM component is capable of enforcing access control. However, this functionality is disabled by default.
When access control is disabled, all users, regardless of role and permission assignment, are able to manage users, roles, and permissions.

To enable access control, set the `ENFORCE_ACCESS_CONTROL` environmental value to `true`.

### Configure IAM host URLs

By default, The IAM component exposes the service on `http://localhost:8080`.

To change the location the IAM component is served from, set `FRONTEND_URL`, `BACKEND_URL`, and `TOKEN_ISSUER` to your chosen URL.

:::note
The `BACKEND_URL` must be followed by `/api`. For example, `http://localhost:8080/api`.
:::
