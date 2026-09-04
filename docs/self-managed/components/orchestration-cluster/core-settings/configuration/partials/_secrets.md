import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Secrets

Configures the secret stores and cache used to resolve `camunda.secrets.<name>` references in process variables.

This configuration is part of an [alpha feature](/components/early-access/alpha/alpha-features.md) and may be subject to change in future releases.

<!-- TODO(camunda/camunda#60326): link the secret resolution concept page here once its title, placement, and the feature's terminology are finalized. -->

`camunda.secrets.*` sets the defaults inherited by every physical tenant. Override them per physical tenant under `camunda.physical-tenants.<tenant-key>.secrets.*`. See [Validation and constraints](/self-managed/concepts/physical-tenants/configuration-reference.md#validation-and-constraints) in the Physical Tenants configuration reference.

`<id>` is the store's identifier. Exactly one secret store is supported per physical tenant, and its `<id>` must be `default`. This check runs against the merged, per-tenant configuration: a tenant that already inherits a store cannot add a second one under a different id to override it, since that is two stores and fails startup the same way any other unsupported id does. A tenant overrides an inherited store only by reusing the id `default`.

A secret name must match `[\p{Alnum}_-]+` and be at most 240 characters to be listed and resolved through `/v2/secrets` (the reference `camunda.secrets.<name>` is capped at 256 characters, and the `camunda.secrets.` prefix takes 16 of those). A dot is the common case that falls outside the charset, for example a file extension. A name that fails either check is stored, but it is silently omitted from list results and cannot be resolved by reference.

<!-- AWS and GCP secret stores (camunda.secrets.stores.aws.<id>.* and camunda.secrets.stores.gcp.<id>.*) are tracked in camunda/camunda#60966 and documented separately. -->

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.secrets.stores.file`

The `path` default below only takes effect once a `stores.file.<id>` entry exists somewhere in the merged configuration. With no file store declared, the physical tenant gets a no-op store instead: nothing is resolvable, and no directory is read.

| Property                                | Description                                                                                                                                                                                             | Default value          |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------- |
| `camunda.secrets.stores.file.<id>.path` | Path to the directory backing this file-based secret store, once the store is declared. Each file in the directory is one secret: the file name is the secret name and the file contents are the value. | `/etc/camunda/secrets` |

### `camunda.secrets.cache`

One cache is created per configured store.

| Property                         | Description                                                                                                                                                                                                                                                                                                                                             | Default value |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------ |
| `camunda.secrets.cache.ttl`      | How long a resolved secret is served from the cache before it is fetched from the store again, so a secret rotated in the store is picked up without a restart. Must be at least `1m` and a whole number of minutes; a shorter or fractional value is rejected at startup.                                                                              | `20m`         |
| `camunda.secrets.cache.max-size` | Maximum number of secrets held in each store's cache. Once reached, caching another secret evicts one already held; which one is the cache implementation's choice. This is a per-cache limit, not a budget shared across stores, so the worst-case memory footprint is the number of configured stores multiplied by this value. Must be at least `1`. | `1000`        |

  </TabItem>
  <TabItem value="env" label="Environment variables">

### `CAMUNDA_SECRETS_STORES_FILE`

| Property                                | Description                                                                                                                                                                                             | Default value          |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------- |
| `CAMUNDA_SECRETS_STORES_FILE_<id>_PATH` | Path to the directory backing this file-based secret store, once the store is declared. Each file in the directory is one secret: the file name is the secret name and the file contents are the value. | `/etc/camunda/secrets` |

### `CAMUNDA_SECRETS_CACHE`

| Property                        | Description                                                                                                                                                                                                                                                                                                                                             | Default value |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------ |
| `CAMUNDA_SECRETS_CACHE_TTL`     | How long a resolved secret is served from the cache before it is fetched from the store again, so a secret rotated in the store is picked up without a restart. Must be at least `1m` and a whole number of minutes; a shorter or fractional value is rejected at startup.                                                                              | `20m`         |
| `CAMUNDA_SECRETS_CACHE_MAXSIZE` | Maximum number of secrets held in each store's cache. Once reached, caching another secret evicts one already held; which one is the cache implementation's choice. This is a per-cache limit, not a budget shared across stores, so the worst-case memory footprint is the number of configured stores multiplied by this value. Must be at least `1`. | `1000`        |

  </TabItem>
</Tabs>
