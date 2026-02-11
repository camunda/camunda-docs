:::note Identity Provider (IdP) prerequisite
An OIDC-compatible identity provider (IdP) is required. This reference architecture does **not** include an IdP. You must configure your own before proceeding. Options include:
- **Keycloak via the Keycloak Operator**: See the [vendor-supported infrastructure guide](/self-managed/deployment/helm/configure/vendor-supported-infrastructure.md#keycloak-deployment) for installation steps and the corresponding Helm values overlay.
- **External OIDC provider**: See [Connect to an OIDC provider](/self-managed/components/management-identity/configuration/connect-to-an-oidc-provider.md) for configuration details.

After deploying your IdP, merge the corresponding auth overlay into your `values.yml` using `yq` **before** running `envsubst`:

<details>
<summary><strong>Keycloak Operator overlays</strong></summary>

```bash
# Merge the Keycloak Operator Helm values (use "domain" or "no-domain" variant)
yq ". *+ load(\"camunda-keycloak-domain-values.yml\")" values.yml > values-merged.yml && mv values-merged.yml values.yml

# Merge the identity secrets overlay
yq ". *+ load(\"camunda-values-identity-secrets.yml\")" values.yml > values-merged.yml && mv values-merged.yml values.yml
```

The overlay files are available in the [Keycloak operator-based directory](https://github.com/camunda/camunda-deployment-references/tree/main/generic/kubernetes/operator-based/keycloak). The identity secrets are created automatically by the Keycloak Operator.
</details>

<details>
<summary><strong>External OIDC provider</strong></summary>

To connect Camunda to an external OIDC provider, follow the dedicated guide: [Connect to an OIDC provider](/self-managed/components/management-identity/configuration/connect-to-an-oidc-provider.md). It covers client registration, Helm values configuration, and secret creation.
</details>
:::
