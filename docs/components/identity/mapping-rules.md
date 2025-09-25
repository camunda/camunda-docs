---
id: mapping-rules
title: "Mapping rules"
sidebar_label: "Mapping rules"
description: "Learn how to create mapping rules for flexible resource access in the Orchestration Cluster for OIDC setups."
---

import MapImg from './img/mapping-rule-add-mapping-modal.png';
import EditMapImg from './img/mapping-rule-edit-icon.png';
import DeleteMapImg from './img/mapping-rule-delete-modal.png';

<span class="badge badge--platform">Self-Managed only</span>

Mapping rules provide flexible access to Orchestration Cluster resources based on claims in a user's or client's OIDC access token.

:::info
To learn more, see [mapping rules](../concepts/access-control/mapping-rules.md).
:::

## Create mapping rule

To create a mapping rule:

1. Log in to Identity in your cluster, and select the **Mapping Rules** tab.
2. Click **Create a mapping rule**, and enter the following details:
   - **Mapping Rule ID**: A unique identifier for the mapping rule.
   - **Mapping Rule name**: A user-friendly name.
   - **Claim name**: The name of a claim in the OIDC access token or a [JSONPath expression](https://www.rfc-editor.org/rfc/rfc9535) that points to a claim in the access token.
   - **Claim value**: The expected value of the claim so that the mapping rule matches an access token.
3. Click **Create mapping rule** to create the role.

You can now assign the role to groups, roles, or tenants, or create and apply authorizations for it.

<img src={MapImg} alt="Create a mapping rule" class="img-600"/>

## Update mapping rule

To update a mapping rule:

1. Log in to Identity in your cluster, and select the **Mapping rules** tab.
2. Click the **pencil icon** next to the mapping rule you want to update.
3. Update the mapping rule details as required.
4. Click **Save** to update the mapping rule.

<img src={EditMapImg} alt="Update a mapping rule" class="img-800"/>

## Delete mapping rule

To delete a mapping rule:

1. Log in to Identity in your cluster, and select the **Mapping Rules** tab.
2. Click **Delete** next to the mapping rule you want to delete.
3. Confirm the deletion by clicking on the **Delete** button in the confirmation dialog. The mapping rule is deleted.

<img src={DeleteMapImg} alt="Delete a mapping rule" class="img-800"/>

## Assign authorizations to a role

See [authorizations](./authorization.md) to learn how to create authorizations for mapping rules.
