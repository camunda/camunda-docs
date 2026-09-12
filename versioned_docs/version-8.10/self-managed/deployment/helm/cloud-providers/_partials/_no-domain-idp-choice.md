:::warning No-domain deployments and IdP choice
If you deploy Camunda **without a domain** (using `kubectl port-forward`), you'll generally need to use Keycloak as your IdP. Most external OIDC providers (for example, Microsoft Entra ID and Okta) don't allow `localhost` as a valid redirect URI for security reasons. Keycloak, when deployed locally in the cluster, can be configured to accept localhost-based redirect URIs.
:::
