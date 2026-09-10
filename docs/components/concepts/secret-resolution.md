---
id: secret-resolution
title: "Secret resolution"
description: "Understand camunda.secrets.<name> references, the two paths that resolve them, and where resolution is scoped and cached."
---

Secret resolution replaces a `camunda.secrets.<name>` reference, known as a Secret reference (Orchestration Cluster), with the value a configured secret store holds for it, without that value being written into a process model, a job variable literal, or a configuration file.

This is a separate mechanism from the connector runtime's `{{secrets.<name>}}` syntax, now called Secret reference (legacy). The two forms are resolved independently and are never mixed: a reference written in one form is never satisfied by a store or provider configured for the other.

The legacy form was the subject of [security notice 61](/reference/notices.md#notice-61), where an unscoped reference could resolve outside the field it was written in. The secret filter that notice introduces applies only to the legacy form. `camunda.secrets.<name>` resolution isn't affected: the broker records each reference's position in the job variables and replaces only that position, so a reference can't resolve at a field where it wasn't written.

This page describes an alpha feature and may change in future releases. See [alpha features](/components/early-access/alpha/alpha-features.md).

## Reference syntax

A reference has the form `camunda.secrets.<name>`, where `<name>` is a single, non-empty token of ASCII letters, digits, `_`, and `-`.

`camunda.secrets.<name>` is authored as a FEEL expression (`=camunda.secrets.<name>`), so a dashed name has to be backtick-escaped. A bare dash is FEEL's minus operator:

```feel
=camunda.secrets.`db-password`
```

An unescaped dashed name is not a reference. FEEL reads `=camunda.secrets.db-password` as the reference `db` minus the variable `password`.

### Charset differs by surface

The engine detects a reference by parsing the FEEL abstract syntax tree, not by matching characters against a fixed set. A name written in a model can therefore be anything a FEEL identifier allows, including unicode letters, `$`, and any name that is backtick-escaped, such as `` =camunda.secrets.`tls.crt` ``.

The gateway API is stricter. `POST /v2/secrets/resolve` and `POST /v2/secrets/list` both reject any name outside `[\p{Alnum}_-]+`.

| Name                                       | Resolves in a model | Usable with `/v2/secrets/resolve` or `/v2/secrets/list` |
| :----------------------------------------- | :-----------------: | :-----------------------------------------------------: |
| `API_TOKEN`                                |         Yes         |                           Yes                           |
| `` `db-password` `` (backtick-escaped)     |         Yes         |                 Yes (as `db-password`)                  |
| `` `tls.crt` `` (backtick-escaped)         |         Yes         |                   No: contains a `.`                    |
| `` `résumé` `` (backtick-escaped, unicode) |         Yes         |              No: outside `[\p{Alnum}_-]+`               |

A name a model can reference is not guaranteed to be creatable or manageable through the API. Use the API's charset for any name you intend to create, list, or grant permissions on through `/v2/secrets/*`.

## Two resolution paths

|          | Broker path                             | Gateway API path                                                                           |
| :------- | :-------------------------------------- | :----------------------------------------------------------------------------------------- |
| Used by  | Job workers, outbound connectors        | Inbound connectors (`POST /v2/secrets/resolve`), the Web Modeler (`POST /v2/secrets/list`) |
| When     | Asynchronously, ahead of job activation | On demand, per request                                                                     |
| Delivery | Long polling and job push               | The HTTP response                                                                          |

The broker path resolves references in a job's variables in the background and injects the resolved values only when the job is activated. See [Secret resolution and job activation](secret-resolution-and-job-activation.md) for the scheduler, caching, and delivery mechanics, including why no resolved value reaches a record, runtime state, or log on this path.

The gateway API path serves callers that have no job to wait on. An inbound connector resolves the references an expression evaluation used, in batches, through `POST /v2/secrets/resolve`. The modeller calls `POST /v2/secrets/list` to offer known reference names while you author a model. Both endpoints share a request and response contract described in [Secrets](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-secrets.md); for the full request and response schema of each, see [Resolve secrets](/apis-tools/orchestration-cluster-api-rest/specifications/resolve-secrets.api.mdx) and [List secrets](/apis-tools/orchestration-cluster-api-rest/specifications/list-secrets.api.mdx).

## Physical-tenant scope

A reference names no store, so it always addresses the physical tenant's `default` secret store: `camunda.secrets.X` means `camunda.secrets.default.X`. Each physical tenant supports exactly one secret store, counted across every store type combined, and that store's ID must be `default`. Configuring a second store under a different ID is rejected at startup.

Resolving and listing both read the secret stores of the caller's physical tenant only, never another tenant's stores. See [Validation and constraints](/self-managed/concepts/physical-tenants/configuration-reference.md#validation-and-constraints) for how the one-store-per-tenant rule is validated, and [Secrets](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets) for store configuration.

## Cache behavior

Resolving is cache-first on both paths: the broker's background scheduler and the gateway's resolve endpoint each serve a reference from the store's cache when the cache already holds it, and only read the backing store for a reference the cache doesn't hold yet.

Listing is different by design. What a store's cache holds is the values it has resolved so far, not the tenant's full set of secrets. `/v2/secrets/list` always reads the configured stores directly rather than serving from the cache.

## Not currently supported

- More than one secret store per physical tenant. A reference always addresses the `default` store.
- Pinning an AWS Secrets Manager secret to a version stage other than `AWSCURRENT`, or a GCP Secret Manager secret to a version other than `latest`.
- Filtering or paginating a `POST /v2/secrets/list` responsem, see [Secrets](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-secrets.md#list-secrets).
- The general limitations that apply to every alpha feature, see [alpha features](/components/early-access/alpha/alpha-features.md).

## Related resources

- [Secret resolution and job activation](secret-resolution-and-job-activation.md) covers the broker path in detail: the scheduler, retries, and both delivery paths.
- [Troubleshoot secret resolution failures](secret-resolution-incidents.md) covers the incidents raised when a reference or its injection fails.
- [Authorizations](access-control/authorizations.md) covers the `SECRET` resource's `READ` and `REVEAL` permissions.
- [Secrets](/apis-tools/java-client/secrets.md) covers the Java client's resolve and list commands, including how a per-reference failure is reported.
