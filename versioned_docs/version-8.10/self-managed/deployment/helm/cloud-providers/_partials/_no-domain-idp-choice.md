:::warning No-domain deployments and IdP choice
If you deploy Camunda **without a domain** (using `kubectl port-forward`), you reach Camunda through `localhost`, so your IdP must accept `localhost` redirect URIs. Keycloak, when deployed locally in the cluster, can be configured to accept localhost-based redirect URIs. If you use an external OIDC provider, check its redirect URI rules first.
:::
