---
id: m2m-tokens
title: "Machine-to-machine (M2M) tokens"
sidebar_label: "Machine-to-machine (M2M) tokens"
---

A machine-to-machine, or as they are also known M2M, token is a token which is requested by one service, so it can
communicate with another service acting as itself.

In [Identity](/self-managed/identity/what-is-identity.md) we provide the ability to assign permissions to
an application. This functionality allows an application to perform the `client_credentials` flow to
retrieve a JWT token with permissions.

The token generated can then be used to communicate with other applications in the Camunda Platform without
the need for user intervention.

:::tip Want to learn how to generate a machine-to-machine token?
Head to our guide, [generating machine-to-machine tokens](/self-managed/identity/user-guide/generating-m2m-tokens.md)
to find out more!
:::
