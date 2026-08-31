import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Secrets

Configures the secret stores and cache used to resolve `camunda.secrets.<name>` references in process variables.

<!-- TODO(camunda/camunda#60326): link the secret resolution concept page here once its title, placement, and the feature's terminology are finalized. -->

`camunda.secrets.*` sets the root-level defaults, applied to the `default` physical tenant. Override those defaults per physical tenant under `camunda.physical-tenants.<tenant-key>.secrets.*`. See the [Physical Tenants configuration reference](/self-managed/concepts/physical-tenants/configuration-reference.md).

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.secrets.stores.file`

`<id>` is the store's identifier. Exactly one secret store is supported per physical tenant, and its `<id>` must be `default`. A store configured under any other id is rejected at startup.

| Property                                | Description                                                                                                                                                                 | Default value          |
| :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- |
| `camunda.secrets.stores.file.<id>.path` | Path to the directory backing this file-based secret store. Each file in the directory is one secret: the file name is the secret name and the file contents are the value. | `/etc/camunda/secrets` |

A secret name must match `[\p{Alnum}_-]+` to be listed and resolved through `/v2/secrets`. A dot is the common case that falls outside this charset, for example a file extension. Such a name is stored, but it is silently omitted from list results and cannot be resolved by reference.

<!-- AWS and GCP secret stores (camunda.secrets.stores.aws.<id>.* and camunda.secrets.stores.gcp.<id>.*) are tracked in camunda/camunda#60966 and documented separately. -->

### `camunda.secrets.cache`

One cache is created per configured store.

| Property                         | Description                                                                                                                                                                                                                                                                                                                                             | Default value |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------ |
| `camunda.secrets.cache.ttl`      | How long a resolved secret is served from the cache before it is fetched from the store again, so a secret rotated in the store is picked up without a restart. Must be at least `1m` and a whole number of minutes; a shorter or fractional value is rejected at startup.                                                                              | `20m`         |
| `camunda.secrets.cache.max-size` | Maximum number of secrets held in each store's cache. Once reached, caching another secret evicts one already held; which one is the cache implementation's choice. This is a per-cache limit, not a budget shared across stores, so the worst-case memory footprint is the number of configured stores multiplied by this value. Must be at least `1`. | `1000`        |

  </TabItem>
  <TabItem value="env" label="Environment variables">

### `CAMUNDA_SECRETS_STORES_FILE`

| Property                                | Description                                                                                                                                                                 | Default value          |
| :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- |
| `CAMUNDA_SECRETS_STORES_FILE_<id>_PATH` | Path to the directory backing this file-based secret store. Each file in the directory is one secret: the file name is the secret name and the file contents are the value. | `/etc/camunda/secrets` |

### `CAMUNDA_SECRETS_CACHE`

| Property                        | Description                                                                                                                                                                                                                                                                                                                                             | Default value |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------ |
| `CAMUNDA_SECRETS_CACHE_TTL`     | How long a resolved secret is served from the cache before it is fetched from the store again, so a secret rotated in the store is picked up without a restart. Must be at least `1m` and a whole number of minutes; a shorter or fractional value is rejected at startup.                                                                              | `20m`         |
| `CAMUNDA_SECRETS_CACHE_MAXSIZE` | Maximum number of secrets held in each store's cache. Once reached, caching another secret evicts one already held; which one is the cache implementation's choice. This is a per-cache limit, not a budget shared across stores, so the worst-case memory footprint is the number of configured stores multiplied by this value. Must be at least `1`. | `1000`        |

  </TabItem>
</Tabs>
