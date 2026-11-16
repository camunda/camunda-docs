import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Secrets

Configure the secret stores and cache used to resolve `camunda.secrets.<name>` references in process variables.

See [Secret resolution](/components/concepts/secret-resolution.md) for the reference syntax and how references are resolved.

:::note
This secret store configuration applies only to Self-Managed. In SaaS, the secret store is provisioned and managed for you, so you don't configure a store type, path, or credentials. Manage secret values on the cluster's **Cluster secrets** tab and reference them as `camunda.secrets.<key>`. See [Manage connector secrets](/components/saas/clusters/manage-secrets.md#reference-connector-secrets-as-camundasecretsname).
:::

`camunda.secrets.*` sets the defaults inherited by every physical tenant. Override them per physical tenant under `camunda.physical-tenants.<tenant-key>.secrets.*`. See [Validation and constraints](/self-managed/concepts/physical-tenants/configuration-reference.md#validation-and-constraints) in the Physical Tenants configuration reference.

`<id>` is the store identifier and must be `default`. Each physical tenant supports exactly one secret store across all store types. For example, configuring both a file store and an AWS store counts as two stores.

Camunda validates this constraint against the merged configuration for each tenant. If a tenant inherits a store, you cannot add another store under a different ID to override it. To override an inherited store, reuse the `default` ID.

A secret name must match `[\p{Alnum}_-]+` and be at most 240 characters to be listed and resolved through `/v2/secrets` (the reference `camunda.secrets.<name>` is capped at 256 characters, and the `camunda.secrets.` prefix takes 16 of those). A period (`.`), such as the one used in a file extension, falls outside the allowed character set. Camunda stores a secret whose name fails either check, but omits it from list results and cannot resolve it by reference.

### File store

The default path below only takes effect once a file store is declared somewhere in the merged configuration. If you don't declare a file store, the physical tenant uses a no-op store: it cannot resolve secrets and does not read a directory.

<Tabs>
  <TabItem value="secrets-file-yaml" label="Application properties">

| Property                                | Description                                                                                                                                                                                             | Default value          | Overridable per Physical Tenant |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------- | :------------------------------ |
| `camunda.secrets.stores.file.<id>.path` | Path to the directory backing this file-based secret store, once the store is declared. Each file in the directory is one secret: the file name is the secret name and the file contents are the value. | `/etc/camunda/secrets` | Yes                             |

  </TabItem>
  <TabItem value="secrets-file-env" label="Environment variables">

| Property                                | Description                                                                                                                                                                                             | Default value          | Overridable per Physical Tenant |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------- | :------------------------------ |
| `CAMUNDA_SECRETS_STORES_FILE_<id>_PATH` | Path to the directory backing this file-based secret store, once the store is declared. Each file in the directory is one secret: the file name is the secret name and the file contents are the value. | `/etc/camunda/secrets` | Yes                             |

  </TabItem>
</Tabs>

### Environment variable store

The environment variable store resolves `camunda.secrets.<name>` references from environment variables that carry a mandatory prefix. Use it for local, CI, and lightweight setups, and for Helm installations that pass Kubernetes Secrets in as environment variables, so you get centralized secret resolution without running an external vault. It's Self-Managed only: Camunda refuses to start if the store is configured on a SaaS cluster.

The store reads the node's environment once at startup and keeps only the prefixed variables, with the prefix stripped from each name. Changing a value requires a restart, because a running JVM cannot see later changes to its environment, and Kubernetes doesn't update a running container's environment either.

Because the store already holds every value in memory, Camunda doesn't put a [secret cache](#secret-cache) in front of it. `camunda.secrets.cache.ttl` and `camunda.secrets.cache.max-size` have no effect on this store, but Camunda still validates them at startup, so an invalid value refuses startup.

<Tabs>
  <TabItem value="secrets-env-yaml" label="Application properties">

| Property                                 | Description                                                                                                                                                                                                                                                                                                             | Default value | Overridable per Physical Tenant |
| :--------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `camunda.secrets.stores.env.<id>.prefix` | Prefix every secret variable carries: the secret `name` is read from the variable `<prefix><name>`. Mandatory. It must start with a letter, contain only letters, digits, and underscores, and end with an underscore (for example, `APP_SECRET_`). Camunda refuses to start when it's missing, malformed, or reserved. | `-`           | Yes                             |

  </TabItem>
  <TabItem value="secrets-env-env" label="Environment variables">

| Property                                 | Description                                                                                                                                                                                                                                                                                                             | Default value | Overridable per Physical Tenant |
| :--------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `CAMUNDA_SECRETS_STORES_ENV_<id>_PREFIX` | Prefix every secret variable carries: the secret `name` is read from the variable `<prefix><name>`. Mandatory. It must start with a letter, contain only letters, digits, and underscores, and end with an underscore (for example, `APP_SECRET_`). Camunda refuses to start when it's missing, malformed, or reserved. | `-`           | Yes                             |

  </TabItem>
</Tabs>

Dedicate a prefix to secrets rather than reuse one the platform already reads. Because the store keeps only the prefixed variables and strips the prefix from each name, it never holds a platform variable such as `CAMUNDA_*` or `AWS_*`, and a name outside the prefix cannot resolve.

The trailing underscore bounds the prefix to whole name segments, so `SECRET_` does not also match `SECRETARY_*`, and a prefix cut short of a reserved one, such as `CAMUNDA` or `C`, is rejected as malformed.

Camunda refuses to start, with a message naming the setting, when the prefix starts, ignoring case, with a prefix reserved for the platform's own settings and credentials. The reserved prefixes are `CAMUNDA_`, `ZEEBE_`, `OPERATE_`, `TASKLIST_`, `OPTIMIZE_`, `IDENTITY_`, `ELASTICSEARCH_`, `OPENSEARCH_`, `KEYCLOAK_`, `SPRING_`, `SERVER_`, `MANAGEMENT_`, `LOGGING_`, `JAVA_`, `JDK_`, `AWS_`, `AZURE_`, `GOOGLE_`, and `KUBERNETES_`.

The store resolves and lists secrets with the following behavior:

| Behavior                   | Description                                                                                                                                                                                                                                                                                                                     |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Exact name matching        | A reference resolves only to a variable whose name matches exactly, case included, on every operating system. For example, with the prefix `APP_SECRET_`, `camunda.secrets.API_KEY` resolves `APP_SECRET_API_KEY`, but `APP_SECRET_api_key` doesn't resolve `API_KEY`.                                                          |
| Empty values aren't found  | A prefixed variable set to an empty string is treated as not found, not as an empty secret.                                                                                                                                                                                                                                     |
| Reference charset          | A secret name must match `[\p{Alnum}_-]+`. A name containing a period (`.`), such as `tls.crt`, is an invalid reference and returns no value, even through a backtick-escaped reference in a job. The file store, by contrast, can serve such a name.                                                                           |
| Dashed names               | A dashed name resolves when it's backtick-escaped in the FEEL reference. With the prefix `APP_SECRET_`, `` camunda.secrets.`db-password` `` resolves `APP_SECRET_db-password`.                                                                                                                                                  |
| Listing                    | The store lists the prefixed variables that have a non-empty value, sorted, with the store prefix stripped and without values. `/v2/secrets/list` returns each one as a reference, so `APP_SECRET_API_KEY` is listed as `camunda.secrets.API_KEY`, and omits names outside the reference charset or longer than 240 characters. |
| Values pass through as set | Multi-line values, such as a PEM certificate, and JSON values resolve exactly as set, including any trailing newline. The file store, by contrast, strips a single trailing newline from each file.                                                                                                                             |

With several physical tenants, give each tenant its own prefix under `camunda.physical-tenants.<tenant-key>.secrets.stores.env.default.prefix`. When two tenants configure different prefixes and both set `<prefixA>API_KEY` and `<prefixB>API_KEY`, each tenant resolves `API_KEY` to only the value of its own prefixed variable.

Camunda refuses to start if two physical tenants configure overlapping prefixes, that is, if one tenant's prefix starts with another's. With `SECRET_` for one tenant and `SECRET_PT1_` for another, the first tenant would otherwise resolve the second tenant's `SECRET_PT1_API_KEY` as its own secret `PT1_API_KEY`. A tenant that inherits the root store shares the `default` tenant's prefix, so override the prefix for every additional tenant.

The environment is the source of truth: the store resolves and lists but never writes or deletes secrets. Manage values through your environment, such as Kubernetes Secrets, systemd, or Docker, and restart to pick up a change.

Like every store, the environment variable store keeps resolved values out of what Camunda stores: records, runtime state, exported records, and broker logs hold only the `camunda.secrets.<name>` placeholder, which is also what Operate shows. See [secret resolution and job activation](/components/concepts/secret-resolution-and-job-activation.md) for how the broker path keeps resolved values out of these locations.

A job worker receives resolved values in plaintext. If the worker logs its input variables, the values appear in the worker's logs. If the worker writes a value back into process variables, for example through job completion variables or a connector result, the value appears in runtime state, exported records, and Operate. Learn more about [what a job worker receives](/components/concepts/secret-resolution-and-job-activation.md#understand-what-a-job-worker-receives).

#### Configure the environment variable store

The broker resolves secret references, so set the prefix and the prefixed secret variables on the Orchestration Cluster process. In a multi-node cluster, set the same variables on every node. Each example below resolves `camunda.secrets.API_KEY` to the value of `APP_SECRET_API_KEY`.

<Tabs groupId="secrets-env-deployment">
  <TabItem value="secrets-env-jar" label="Manual (JAR)" default>

Declare the store in your `application.yaml`:

```yaml
camunda:
  secrets:
    stores:
      env:
        default:
          prefix: APP_SECRET_
```

Export the secret variables in the shell, service unit, or process manager that starts Camunda, then start it:

```bash
export APP_SECRET_API_KEY="<api-key>"
./bin/camunda
```

To configure the store without editing `application.yaml`, also export `CAMUNDA_SECRETS_STORES_ENV_DEFAULT_PREFIX=APP_SECRET_`.

  </TabItem>
  <TabItem value="secrets-env-docker" label="Docker">

```bash
docker run \
  -e CAMUNDA_SECRETS_STORES_ENV_DEFAULT_PREFIX=APP_SECRET_ \
  -e APP_SECRET_API_KEY="<api-key>" \
  camunda/camunda:<tag>
```

To keep values out of your shell history, pass them with `--env-file` instead.

  </TabItem>
  <TabItem value="secrets-env-compose" label="Docker Compose">

Add the variables to the Orchestration Cluster service:

```yaml
services:
  orchestration:
    image: camunda/camunda:<tag>
    environment:
      CAMUNDA_SECRETS_STORES_ENV_DEFAULT_PREFIX: APP_SECRET_
      APP_SECRET_API_KEY: ${APP_SECRET_API_KEY}
```

Docker Compose substitutes `${APP_SECRET_API_KEY}` from your shell or from a `.env` file next to the Compose file, so the value stays out of the Compose file itself.

  </TabItem>
  <TabItem value="secrets-env-helm" label="Helm">

Pass each value from a Kubernetes Secret as a prefixed environment variable through the `orchestration.env` list:

```yaml
orchestration:
  env:
    - name: CAMUNDA_SECRETS_STORES_ENV_DEFAULT_PREFIX
      value: "APP_SECRET_"
    - name: APP_SECRET_API_KEY
      valueFrom:
        secretKeyRef:
          name: my-app-secrets
          key: api-key
```

This resolves `camunda.secrets.API_KEY` to the `api-key` entry of the `my-app-secrets` Kubernetes Secret.

The chart's `orchestration.secretStore` key configures only the file, AWS, and GCP stores. Don't also configure a store there, because each physical tenant supports exactly one store.

  </TabItem>
</Tabs>

With physical tenants, set each tenant's prefix with its environment variable form, `CAMUNDA_PHYSICALTENANTS_<TENANT_KEY>_SECRETS_STORES_ENV_DEFAULT_PREFIX`, where `<TENANT_KEY>` is the tenant key in uppercase:

```bash
CAMUNDA_SECRETS_STORES_ENV_DEFAULT_PREFIX=APP_SECRET_DEFAULT_
CAMUNDA_PHYSICALTENANTS_RISKPROD_SECRETS_STORES_ENV_DEFAULT_PREFIX=APP_SECRET_RISKPROD_
APP_SECRET_DEFAULT_API_KEY=<default-tenant-api-key>
APP_SECRET_RISKPROD_API_KEY=<riskprod-api-key>
```

To check which secrets the store loaded, call [`POST /v2/secrets/list`](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-secrets.md#list-secrets). It returns references such as `camunda.secrets.API_KEY`, without the store prefix (`APP_SECRET_`), and never returns values.

### AWS Secrets Manager store

Configuration for a secret store backed by AWS Secrets Manager. Authentication is always identity-based, via the AWS SDK's default credentials provider chain. No static credentials are accepted at all. Secrets are always read at the `AWSCURRENT` version stage; pinning to a different stage is not supported.

<Tabs>
  <TabItem value="secrets-aws-yaml" label="Application properties">

| Property                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Default value | Overridable per Physical Tenant |
| :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `camunda.secrets.stores.aws.<id>.region`              | AWS region for this store. Optional: when omitted, the SDK resolves it from the environment (`AWS_REGION`) or instance metadata.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `-`           | Yes                             |
| `camunda.secrets.stores.aws.<id>.path-prefix`         | Prefix prepended, with no separator inserted, to every reference name to form the AWS secret ID (for example, prefix `camunda/` plus reference `db-password` resolves to secret ID `camunda/db-password`; include the trailing separator here if one is wanted). When omitted, references map to bare secret names. Also applies to `container-secret-id`, since that is itself resolved as an AWS secret ID. Without `container-secret-id`, this prefix also filters what `/v2/secrets` lists: only secrets whose ID starts with it are returned, with the prefix stripped from the listed name. With `container-secret-id` set, listing returns the container secret's own JSON keys instead, unaffected by this prefix. | `-`           | Yes                             |
| `camunda.secrets.stores.aws.<id>.batch-enabled`       | Resolve secrets via AWS's `BatchGetSecretValue` (fewer round-trips) instead of one `GetSecretValue` call per reference. Requires the `secretsmanager:BatchGetSecretValue` IAM action in addition to `GetSecretValue`. Mutually exclusive with `container-secret-id`: configuring both is rejected at startup.                                                                                                                                                                                                                                                                                                                                                                                                              | `false`       | Yes                             |
| `camunda.secrets.stores.aws.<id>.batch-size`          | Maximum number of secret IDs per `BatchGetSecretValue` call; only has an effect when `batch-enabled` is set. Must be between `1` and `20`, which is the AWS limit. Camunda validates this range at startup even when batching is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `20`          | Yes                             |
| `camunda.secrets.stores.aws.<id>.container-secret-id` | Instead of one AWS secret per reference, treat every reference as a JSON key inside this one named secret. Mutually exclusive with `batch-enabled`: batching fetches several distinct secrets in one call, while a container secret ID means only one secret is ever fetched.                                                                                                                                                                                                                                                                                                                                                                                                                                              | `-`           | Yes                             |

  </TabItem>
  <TabItem value="secrets-aws-env" label="Environment variables">

| Property                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Default value | Overridable per Physical Tenant |
| :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `CAMUNDA_SECRETS_STORES_AWS_<id>_REGION`            | AWS region for this store. Optional: when omitted, the SDK resolves it from the environment (`AWS_REGION`) or instance metadata.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `-`           | Yes                             |
| `CAMUNDA_SECRETS_STORES_AWS_<id>_PATHPREFIX`        | Prefix prepended, with no separator inserted, to every reference name to form the AWS secret ID (for example, prefix `camunda/` plus reference `db-password` resolves to secret ID `camunda/db-password`; include the trailing separator here if one is wanted). When omitted, references map to bare secret names. Also applies to `container-secret-id`, since that is itself resolved as an AWS secret ID. Without `container-secret-id`, this prefix also filters what `/v2/secrets` lists: only secrets whose ID starts with it are returned, with the prefix stripped from the listed name. With `container-secret-id` set, listing returns the container secret's own JSON keys instead, unaffected by this prefix. | `-`           | Yes                             |
| `CAMUNDA_SECRETS_STORES_AWS_<id>_BATCHENABLED`      | Resolve secrets via AWS's `BatchGetSecretValue` (fewer round-trips) instead of one `GetSecretValue` call per reference. Requires the `secretsmanager:BatchGetSecretValue` IAM action in addition to `GetSecretValue`. Mutually exclusive with `container-secret-id`: configuring both is rejected at startup.                                                                                                                                                                                                                                                                                                                                                                                                              | `false`       | Yes                             |
| `CAMUNDA_SECRETS_STORES_AWS_<id>_BATCHSIZE`         | Maximum number of secret IDs per `BatchGetSecretValue` call; only has an effect when `batch-enabled` is set. Must be between `1` and `20`, which is the AWS limit. Camunda validates this range at startup even when batching is disabled.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `20`          | Yes                             |
| `CAMUNDA_SECRETS_STORES_AWS_<id>_CONTAINERSECRETID` | Instead of one AWS secret per reference, treat every reference as a JSON key inside this one named secret. Mutually exclusive with `batch-enabled`: batching fetches several distinct secrets in one call, while a container secret ID means only one secret is ever fetched.                                                                                                                                                                                                                                                                                                                                                                                                                                              | `-`           | Yes                             |

  </TabItem>
</Tabs>

Without `container-secret-id`, listing and the startup connectivity check use `secretsmanager:ListSecrets`, and resolving uses `GetSecretValue` (plus `BatchGetSecretValue` when `batch-enabled`). With `container-secret-id`, both listing and resolving read only the one container secret via `GetSecretValue`; `ListSecrets` is not needed.

An invalid `batch-size`, configuring both `batch-enabled` and `container-secret-id`, or a client build failure causes startup to fail.

An invalid region, unreachable endpoint, or invalid credentials instead produces a warning at startup. Camunda still creates the store, and the configuration error surfaces on the first resolve or list request. A secret whose value lives only in `secretBinary` (no string value) cannot be resolved and fails with an invalid-reference error.

In container-secret mode, the named secret's value must be a flat JSON object mapping each reference name to a JSON string value, for example `{"db-password": "s3cr3t"}`. Nested objects and arrays are not supported. If the value is invalid JSON or is not a JSON object, every reference fails to resolve and the list request fails.

If a key is missing or has a JSON `null` value, only that reference fails as not found. If a key exists but its value is not a string, only that reference fails as invalid.

### GCP Secret Manager store

Configuration for a secret store backed by GCP Secret Manager. Authentication uses the GCP Application Default Credentials chain. Secrets are always read at the `latest` version; pinning to a specific version is not supported.

<Tabs>
  <TabItem value="secrets-gcp-yaml" label="Application properties">

| Property                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Default value | Overridable per Physical Tenant |
| :---------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `camunda.secrets.stores.gcp.<id>.project-id`          | ID of the GCP project that owns the secrets. Optional when a default project can be resolved from the environment (`GOOGLE_CLOUD_PROJECT`), gcloud's default project, or the compute metadata server, via the Application Default Credentials chain. If none of these sources provides a project ID, startup fails. A missing project ID is a configuration error, not a transient connectivity problem.                                                                                                                                                                                                                                                                                                                                                                                                                          | `-`           | Yes                             |
| `camunda.secrets.stores.gcp.<id>.path-prefix`         | Prefix prepended to every reference name to form the GCP secret ID. Camunda does not insert a separator. For example, the prefix `camunda-` and reference `db-password` resolve to the secret ID `camunda-db-password`. Include a trailing separator in the prefix if needed. When omitted, references map to bare secret IDs. Also applies to `container-secret-id`, since that is itself resolved as a GCP secret ID. Must contain only `[a-zA-Z0-9_-]`; a prefix with any other character is rejected at startup. Without `container-secret-id`, this prefix also filters what `/v2/secrets` lists: only secrets whose ID starts with it are returned, with the prefix stripped from the listed name. With `container-secret-id` set, listing returns the container secret's own JSON keys instead, unaffected by this prefix. | `-`           | Yes                             |
| `camunda.secrets.stores.gcp.<id>.endpoint`            | Secret Manager endpoint override, for example a regional endpoint such as `secretmanager.europe-west1.rep.googleapis.com:443`, or a Private Service Connect endpoint. There is no equivalent property for the AWS store: the AWS SDK picks up an endpoint override from its own environment variables, so none is exposed here, while the GCP client libraries do not, which is why this property exists. When omitted, the default global endpoint is used.                                                                                                                                                                                                                                                                                                                                                                      | `-`           | Yes                             |
| `camunda.secrets.stores.gcp.<id>.container-secret-id` | Instead of one GCP secret per reference, treat every reference as a JSON key inside this one named secret. Must contain only `[a-zA-Z0-9_-]`, the same as `path-prefix`. When set, the combined length of `path-prefix` plus `container-secret-id` must not exceed 255 characters; exceeding it is rejected at startup.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `-`           | Yes                             |

  </TabItem>
  <TabItem value="secrets-gcp-env" label="Environment variables">

| Property                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Default value | Overridable per Physical Tenant |
| :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `CAMUNDA_SECRETS_STORES_GCP_<id>_PROJECTID`         | ID of the GCP project that owns the secrets. Optional when a default project can be resolved from the environment (`GOOGLE_CLOUD_PROJECT`), gcloud's default project, or the compute metadata server, via the Application Default Credentials chain. If none of those resolve one either, startup fails outright: a missing project ID is a configuration error, not a transient connectivity problem.                                                                                                                                                                                                                                                                                                                                                                                                               | `-`           | Yes                             |
| `CAMUNDA_SECRETS_STORES_GCP_<id>_PATHPREFIX`        | Prefix prepended, with no separator inserted, to every reference name to form the GCP secret ID (for example, prefix `camunda-` plus reference `db-password` resolves to secret ID `camunda-db-password`; include the trailing separator here if one is wanted). When omitted, references map to bare secret IDs. Also applies to `container-secret-id`, since that is itself resolved as a GCP secret ID. Must contain only `[a-zA-Z0-9_-]`; a prefix with any other character is rejected at startup. Without `container-secret-id`, this prefix also filters what `/v2/secrets` lists: only secrets whose ID starts with it are returned, with the prefix stripped from the listed name. With `container-secret-id` set, listing returns the container secret's own JSON keys instead, unaffected by this prefix. | `-`           | Yes                             |
| `CAMUNDA_SECRETS_STORES_GCP_<id>_ENDPOINT`          | Secret Manager endpoint override, for example a regional endpoint such as `secretmanager.europe-west1.rep.googleapis.com:443`, or a Private Service Connect endpoint. There is no equivalent property for the AWS store: the AWS SDK picks up an endpoint override from its own environment variables, so none is exposed here, while the GCP client libraries do not, which is why this property exists. When omitted, the default global endpoint is used.                                                                                                                                                                                                                                                                                                                                                         | `-`           | Yes                             |
| `CAMUNDA_SECRETS_STORES_GCP_<id>_CONTAINERSECRETID` | Instead of one GCP secret per reference, treat every reference as a JSON key inside this one named secret. Must contain only `[a-zA-Z0-9_-]`, the same as `path-prefix`. When set, the combined length of `path-prefix` plus `container-secret-id` must not exceed 255 characters; exceeding it is rejected at startup.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `-`           | Yes                             |

  </TabItem>
</Tabs>

A missing project ID (above) and a client that fails to build both fail startup outright. An invalid project, unreachable endpoint, or invalid credentials instead causes the connectivity check to log a warning at startup. Camunda still creates the store, and the configuration error surfaces on the first resolve or list request.

GCP secret IDs allow only `[a-zA-Z0-9_-]` and are capped at 255 characters. Both `path-prefix` and `container-secret-id` contribute to secret IDs. An AWS-style `camunda/` prefix contains a slash and therefore produces invalid IDs. For GCP, use a prefix such as `camunda-` instead.

Camunda performs the combined-length check only when `container-secret-id` is set. It does not validate the length of per-reference IDs in flat mode at startup, so an overlong prefix is detected only during resolution.

In container-secret mode, the named secret's value must be a flat JSON object mapping each reference name to a JSON string value, for example `{"db-password": "s3cr3t"}`. Nested objects and arrays are not supported: if the value is not valid JSON, or is JSON but not an object, every reference fails to resolve and listing fails outright rather than returning an empty list. If a key is absent, or present with a JSON `null` value, only that one reference fails, as not found; if a key's value is present but not a string, only that one reference fails, as invalid.

### Secret cache

One cache is created per configured store. The [environment variable store](#environment-variable-store) is the exception: it holds its values in memory, so these settings don't apply to it.

<Tabs>
  <TabItem value="secrets-cache-yaml" label="Application properties">

| Property                         | Description                                                                                                                                                                                                                                                                                                                                                          | Default value | Overridable per Physical Tenant |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `camunda.secrets.cache.ttl`      | How long a resolved secret is served from the cache before it is fetched from the store again, so a secret rotated in the store is picked up without a restart. Must be at least `1m` and a whole number of minutes; a shorter or fractional value is rejected at startup.                                                                                           | `20m`         | Yes                             |
| `camunda.secrets.cache.max-size` | Maximum number of secrets held in each store's cache. Once reached, caching another secret evicts one already held; which one is the cache implementation's choice. This limit applies to each cache independently. The maximum number of cached secret entries across all stores is the number of configured stores multiplied by this value. Must be at least `1`. | `1000`        | Yes                             |

  </TabItem>
  <TabItem value="secrets-cache-env" label="Environment variables">

| Property                        | Description                                                                                                                                                                                                                                                                                                                                                                             | Default value | Overridable per Physical Tenant |
| :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------ |
| `CAMUNDA_SECRETS_CACHE_TTL`     | How long a resolved secret is served from the cache before it is fetched from the store again, so a secret rotated in the store is picked up without a restart. Must be at least `1m` and a whole number of minutes; a shorter or fractional value is rejected at startup.                                                                                                              | `20m`         | Yes                             |
| `CAMUNDA_SECRETS_CACHE_MAXSIZE` | Maximum number of secrets held in each store's cache. When the cache reaches this limit, caching another secret evicts an existing entry. The cache implementation determines which entry to evict. This is a per-cache limit, not a budget shared across stores, so the worst-case memory footprint is the number of configured stores multiplied by this value. Must be at least `1`. | `1000`        | Yes                             |

  </TabItem>
</Tabs>

### Concurrency

Applies only to a store whose cost scales with the number of names requested (for example, AWS Secrets Manager without `batch-enabled`, which issues one `GetSecretValue` call per name). A store that resolves a whole request in a single call, such as the file store, the environment variable store, or a store using `container-secret-id`, is unaffected.

<Tabs>
  <TabItem value="secrets-concurrency-yaml" label="Application properties">

| Property                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Default value                      | Overridable per Physical Tenant |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------- | :------------------------------ |
| `camunda.secrets.max-concurrency` | Maximum number of concurrent backend calls in flight for such a store, shared by every such store this physical tenant configures. Lower it to help stay within a provider's rate limit (for example, an AWS Secrets Manager or GCP Secret Manager API quota); the bound approximates rather than guarantees this, since a request that resolves in a single call takes no permit and isn't counted. Raising the value above what a single request can use has no further effect. Must be at least `1`. | `max(8, 2 × available processors)` | Yes                             |

  </TabItem>
  <TabItem value="secrets-concurrency-env" label="Environment variables">

| Property                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Default value                      | Overridable per Physical Tenant |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------- | :------------------------------ |
| `CAMUNDA_SECRETS_MAXCONCURRENCY` | Maximum number of concurrent backend calls in flight for such a store, shared by every such store this physical tenant configures. Lower it to help stay within a provider's rate limit (for example, an AWS Secrets Manager or GCP Secret Manager API quota); the bound approximates rather than guarantees this, since a request that resolves in a single call takes no permit and isn't counted. Raising the value above what a single request can use has no further effect. Must be at least `1`. | `max(8, 2 × available processors)` | Yes                             |

  </TabItem>
</Tabs>
