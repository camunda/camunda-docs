---
id: making-iam-production-ready
title: "Making IAM production ready"
sidebar_label: "Making IAM production ready"
---

The IAM component offers a quick start method to enable you to get up and running as soon as possible. This means that
there are a couple of tasks that we take care of to remove some production level complexity, to make sure that your IAM
instance is ready to be used in a production setting we suggest you perform the following tasks.

### Set the database encryption key variable
The IAM component stores certain information that requires encryption, by default during each start of the IAM service 
if no value is set for the `DATABASE_ENCRYPTION_KEY` environmental variable a value is generated. 

To maintain a consistent value, set the `DATABASE_ENCRYPTION_KEY` environmental variable to an alpha-numeric string.

:::tip
We would suggest that the length of the string is 32 characters.
:::

### Set the token signing key variable
The IAM component generates authentication tokens, to be able to do this a signing key needs to be used, by default 
during each start of the IAM service if no signing key is provided one will be automatically generated. 

To be able to use authentication tokens generated before a service restart, set the `TOKEN_SIGNING_KEY` environmental value
to a JSON formatted output from a signing key generator.

:::tip
Unsure how to generate a JSON Web Key? We'd recommend looking at the 
[Nimbus JOSE + JWT documentation](https://connect2id.com/products/nimbus-jose-jwt/generator) for examples.
:::

### Enable access control
The IAM component is capable of enforcing access control although by default this functionality is disabled.
When access control is disabled, all users, regardless of role and permission assignment, will be able to manage users, roles, and permissions.

To enable access control, set the `ENFORCE_ACCESS_CONTROL` environmental value to `true`

### Configure IAM host URLs
The IAM component by default exposes the service on `http://localhost:8080`.

To change the location that the IAM component is served from, set `FRONTEND_URL`, `BACKEND_URL`, and `TOKEN_ISSUER` to your chosen URL.

:::note
The `BACKEND_URL` must be followed by `/api` for example, `http://localhost:8080/api`.
:::