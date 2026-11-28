An OIDC-compatible identity provider (IdP) is required. This reference architecture does **not** include an IdP. You must configure your own before proceeding. Options include:

- **Keycloak via the Keycloak Operator**: See the [operator-based infrastructure guide](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#keycloak-deployment) for installation steps and the corresponding Helm values overlay.
- **External OIDC provider**: See [Connect to an OIDC provider](/self-managed/components/management-identity/configuration/connect-to-an-oidc-provider.md) for configuration details.

After deploying your IdP, merge the corresponding auth overlay into your `values.yml` using `yq` **before** running `envsubst`:

**Keycloak Operator overlays:**

```bash
# Merge the Keycloak Operator Helm values
# Without a domain, use camunda-keycloak-no-domain-values.yml instead of camunda-keycloak-domain-values.yml
yq ". *+ load(\"camunda-keycloak-domain-values.yml\")" values.yml > values-merged.yml && mv values-merged.yml values.yml

# Merge the identity secrets overlay
yq ". *+ load(\"camunda-values-identity-secrets.yml\")" values.yml > values-merged.yml && mv values-merged.yml values.yml
```

The overlay files are available in the [Keycloak operator-based directory](https://github.com/camunda/camunda-deployment-references/tree/main/generic/kubernetes/operator-based/keycloak). The identity secrets are created automatically by the Keycloak Operator.

If the operator-managed Keycloak runs version 26.8.2 or later, also grant the `kc-admin-api` client scope to Management Identity after you install Camunda. Without this step, Identity fails at startup with `HTTP status code: 401`. See [Grant the `kc-admin-api` scope to Management Identity](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#grant-kc-admin-api-scope).
