import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import KubefwdTip from './_kubefwd-tip.md';
import PortForwardServices from './_port-forward-services.md';

## Verify connectivity to Camunda 8

First, we need an OAuth client to be able to connect to the Camunda 8 cluster.

### Generate an M2M token using Identity

Generate an M2M token by following the steps outlined in the [Identity getting started guide](/self-managed/components/management-identity/overview.md), along with the [incorporating applications documentation](/self-managed/components/management-identity/application-user-group-role-management/applications.md).

Below is a summary of the necessary instructions:

<Tabs groupId="domain">
  <TabItem value="with" label="With domain" default>

1. Open Identity in your browser at `https://${CAMUNDA_DOMAIN}/managementidentity`. You will be redirected to your IdP and prompted to log in.
2. Log in with the initial user `admin` (defined in `identity.firstUser` of the values file). Retrieve the generated password (created earlier when running the secret creation script) from the Kubernetes secret and use it to authenticate:

```shell
kubectl get secret identity-secret-for-components \
  --namespace "$CAMUNDA_NAMESPACE" \
  -o jsonpath='{.data.identity-first-user-password}' | base64 -d; echo
```

3. Select **Add application** and select **M2M** as the type. Assign a name like "test."
4. Select the newly created application. Then, select **Access to APIs > Assign permissions**, and select the **Orchestration API** with "read" and "write" permission.
5. Retrieve the `client-id` and `client-secret` values from the application details

```shell
export ZEEBE_CLIENT_ID='client-id' # retrieve the value from the identity page of your created m2m application
export ZEEBE_CLIENT_SECRET='client-secret' # retrieve the value from the identity page of your created m2m application
```

6. Open the Orchestration Cluster Admin in your browser at `https://${CAMUNDA_DOMAIN}/admin` and log in with the user `admin` (defined in `identity.firstUser` of the values file).
7. In the Admin navigation menu, select **Roles**.
8. Either select an existing role (for example, **Admin**) or [create a new role](/components/admin/role.md) with the appropriate permissions for your use case.
9. In the selected role view, open the **Clients** tab and click **Assign client**.
10. Enter the client ID of your application created in Management Identity (for example, `test`) and click **Assign client** to save.

This operation links the OIDC client to the role's permissions in the Orchestration Cluster, granting the application access to the cluster resources. For more information about managing roles and clients, see [Roles](/components/admin/role.md#manage-clients).

</TabItem>

<TabItem value="without" label="Without domain">

Identity and the Orchestration cluster must be port-forwarded to be able to connect to the cluster. If using Keycloak via the Keycloak Operator, you also need to port-forward the Keycloak service.

```shell
kubectl port-forward "services/$CAMUNDA_RELEASE_NAME-identity" 8085:80 --namespace "$CAMUNDA_NAMESPACE"
kubectl port-forward "services/$CAMUNDA_RELEASE_NAME-zeebe-gateway" 8080:8080 --namespace "$CAMUNDA_NAMESPACE"
# If using Keycloak Operator:
kubectl port-forward "services/keycloak-service" 18080:18080 --namespace "$CAMUNDA_NAMESPACE"
```

<KubefwdTip />

1. Open Identity in your browser at `http://localhost:8085/managementidentity`. You will be redirected to your IdP and prompted to log in.
2. Log in with the initial user `admin` (defined in `identity.firstUser` of the values file). Retrieve the generated password (created earlier when running the secret creation script) from the Kubernetes secret and use it to authenticate:

```shell
kubectl get secret identity-secret-for-components \
  --namespace "$CAMUNDA_NAMESPACE" \
  -o jsonpath='{.data.identity-first-user-password}' | base64 -d; echo
```

3. Select **Add application** and select **M2M** as the type. Assign a name like "test".
4. Select the newly created application. Then, select **Access to APIs > Assign permissions**, and select the **Orchestration API** with "read" and "write" permission.
5. Retrieve the `client-id` and `client-secret` values from the application details

```shell
export ZEEBE_CLIENT_ID='client-id' # retrieve the value from the identity page of your created m2m application
export ZEEBE_CLIENT_SECRET='client-secret' # retrieve the value from the identity page of your created m2m application
```

6. Open the Orchestration Cluster Admin in your browser at `http://localhost:8080/admin` and log in with the user `admin` (defined in `identity.firstUser` of the values file).
7. In the Admin navigation menu, select **Roles**.
8. Either select an existing role (for example, **Admin**) or [create a new role](/components/admin/role.md) with the appropriate permissions for your use case.
9. In the selected role view, open the **Clients** tab and click **Assign client**.
10. Enter the client ID of your application created in Management Identity (for example, `test`) and click **Assign client** to save.

This operation links the OIDC client to the role's permissions in the Orchestration Cluster, granting the application access to the cluster resources. For more information about managing roles and clients, see [Roles](/components/admin/role.md#manage-clients).

<PortForwardServices />

</TabItem>
</Tabs>

### Use the token

<Tabs groupId="c8-connectivity">
  <TabItem value="rest-api" label="REST API" default>

For a detailed guide on generating and using a token, consult the relevant documentation on [authenticating with the Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).

<Tabs groupId="domain">
  <TabItem value="with" label="With domain" default>

Export the following environment variables:

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/export-verify-zeebe-domain.sh
```

  </TabItem>
  <TabItem value="without" label="Without domain">

This requires to port-forward the Zeebe Gateway to be able to connect to the cluster.

```shell
kubectl port-forward "services/$CAMUNDA_RELEASE_NAME-zeebe-gateway" 8080:8080 --namespace "$CAMUNDA_NAMESPACE"
```

Export the following environment variables:

```shell reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/export-verify-zeebe-local.sh
```

  </TabItem>

</Tabs>

Generate a temporary token to access the Orchestration Cluster REST API, then capture the value of the `access_token` property and store it as your token. Use the stored token (referred to as `TOKEN` in this case) to interact with the Orchestration Cluster REST API and display the cluster topology:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/check-zeebe-cluster-topology.sh
```

...and results in the following output:

<details>
  <summary>Example output</summary>

```json reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/single-region/procedure/check-zeebe-cluster-topology-output.json
```

</details>

  </TabItem>
  <TabItem value="modeler" label="Desktop Modeler">

Follow our existing [Modeler guide on deploying a diagram](/self-managed/components/modeler/desktop-modeler/deploy-to-self-managed.md). Below are the helper values required to be filled in Modeler:

<Tabs groupId="domain" defaultValue="with" queryString values={
[
{label: 'With domain', value: 'with' },
{label: 'Without domain', value: 'without' },
]}>

<TabItem value="with">

The following values are required for the OAuth authentication:

- **Cluster endpoint:** `https://zeebe-$CAMUNDA_DOMAIN`, replacing `$CAMUNDA_DOMAIN` with your domain
- **Client ID:** Retrieve the client ID value from the identity page of your created M2M application
- **Client Secret:** Retrieve the client secret value from the Identity page of your created M2M application
- **OAuth Token URL:** Your IdP's token endpoint (for example, `https://$CAMUNDA_DOMAIN/auth/realms/camunda-platform/protocol/openid-connect/token` for Keycloak), replacing `$CAMUNDA_DOMAIN` with your domain
- **Audience:** `orchestration-api`, the default for Camunda 8 Self-Managed

</TabItem>

<TabItem value="without">

This requires port-forwarding the Zeebe Gateway to be able to connect to the cluster:

```shell
kubectl port-forward "services/$CAMUNDA_RELEASE_NAME-zeebe-gateway" 26500:26500 --namespace "$CAMUNDA_NAMESPACE"
```

The following values are required for OAuth authentication:

- **Cluster endpoint:** `http://localhost:26500`
- **Client ID:** Retrieve the client ID value from the identity page of your created M2M application
- **Client Secret:** Retrieve the client secret value from the Identity page of your created M2M application
- **OAuth Token URL:** Your IdP's token endpoint (for example, `http://keycloak-service:18080/auth/realms/camunda-platform/protocol/openid-connect/token` for Keycloak Operator)
- **Audience:** `orchestration-api`, the default for Camunda 8 Self-Managed

</TabItem>
</Tabs>

</TabItem>
</Tabs>

