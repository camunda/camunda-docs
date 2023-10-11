---
id: m2m-tokens
title: "Machine-to-machine (M2M) tokens"
sidebar_label: "Machine-to-machine (M2M) tokens"
---

A **machine-to-machine (M2M)** token is a token requested by one service so it can
communicate with another service acting as itself.

In [Identity](/self-managed/identity/what-is-identity.md), we provide the ability to assign permissions to
an application. This functionality allows an application to perform the `client_credentials` flow to
retrieve a JWT token with permissions.

The token generated can then be used to communicate with other applications in Camunda without
the need for user intervention.

:::tip Want to learn how to generate an M2M token?
Head to our guide, [generating M2M tokens](/self-managed/identity/user-guide/authorizations/generating-m2m-tokens.md)
to find out more!
:::
