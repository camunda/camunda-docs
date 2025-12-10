---
id: cluster-variable-use
title: How to use cluster variables
sidebar_label: "How to use"
description: "Learn how to use and access cluster variables, from simple to advanced patterns."
---

Learn how to use and access cluster variables, from simple to advanced patterns.

## Use in BPMN

### Service task input mapping

Map cluster variables to service task inputs.
For example:

```
= camunda.vars.env.API_ENDPOINT
```

For the target variable:

```
apiUrl
```

### Gateway conditions

Use cluster variables in conditional sequence flows.
For example:

```
orderAmount > camunda.vars.env.APPROVAL_THRESHOLD
camunda.vars.env.FEATURE_EXPRESS_SHIPPING = true
```

### Script tasks

Reference cluster variables in script expressions.
For example:

```
var endpoint = camunda.vars.env.API_CONFIG.base_url;
var timeout = camunda.vars.env.API_CONFIG.timeout_ms;
```

### Output mappings

Use cluster variables in output parameter expressions.
For example:

```
= {
  "endpoint": camunda.vars.env.SERVICE_URL,
  "timestamp": now(),
  "threshold": camunda.vars.env.PROCESSING_THRESHOLD
}
```

### Call activities

Pass cluster variables as input to called processes.
For example:

```
= {
  "config": camunda.vars.env.SUBPROCESS_CONFIG,
  "flags": camunda.vars.env.FEATURE_FLAGS
}
```

### Combining multiple variables

Create expressions using multiple cluster variables.
For example:

```
camunda.vars.env.API_BASE_URL + "/api/v" + camunda.vars.env.API_VERSION + "/resource"
```

## Access using FEEL expressions

You can reference cluster variables anywhere Camunda Modeler supports FEEL expressions.
They are exposed through the following namespaces:

- `camunda.vars.cluster`
- `camunda.vars.tenant`
- `camunda.vars.env`

These namespaces correspond to the available scope levels. See [scope resolution](./scope-and-priority.md) for more details.

:::tip
Camunda recommends using the `camunda.vars.env` namespace for most use cases.
:::

#### `camunda.vars.cluster`

Provides direct access **only** to global-scope variables. Tenant-scope variables are not accessible through this namespace.

**Use when:**

- You want to access only global variables.
- You need to bypass tenant-level overrides.
- You're debugging scope resolution.

For example:

```
camunda.vars.cluster.GLOBAL_DEFAULT_TIMEOUT
```

#### `camunda.vars.tenant`

Provides direct access **only** to tenant-scope variables. Global-scope variables are not accessible through this namespace.

**Use when:**

- You want to access only tenant variables.
- You need to check tenant-specific values.
- You're debugging scope resolution.

For example:

```
camunda.vars.tenant.TENANT_SPECIFIC_CONFIG
```

#### `camunda.vars.env`

Provides a merged view of both global- and tenant-scope variables, applying automatic priority resolution. This is the recommended namespace for most cases.

**Use when:**

- You want automatic scope resolution.
- You need the most specific value available.
- You're writing portable process definitions.

For example:

```
camunda.vars.env.API_ENDPOINT
camunda.vars.env.CONFIG.timeout
```

### Simple key access

Use dot notation after the namespace for simple key-value pairs. For example:

```
camunda.vars.env.API_URL
camunda.vars.env.MAX_RETRIES
camunda.vars.env.FEATURE_ENABLED
camunda.vars.env.TIMEOUT_SECONDS
```

### Nested object access

For cluster variables with nested object structures, use dot notation to access deeper levels.
For example:

```
camunda.vars.env.DATABASE_CONFIG.host
camunda.vars.env.DATABASE_CONFIG.port
camunda.vars.env.DATABASE_CONFIG.credentials.username

camunda.vars.env.API_SETTINGS.retry.max_attempts
camunda.vars.env.API_SETTINGS.retry.backoff_ms
camunda.vars.env.API_SETTINGS.timeout.connection
```

### Conditional access

Provide fallback values when cluster variables might not exist.
For example:

```
if camunda.vars.env.CUSTOM_TIMEOUT != null
  then camunda.vars.env.CUSTOM_TIMEOUT
  else 5000
```

### Dynamic key access

While dynamic key access is limited in FEEL, you can structure your variables to support configuration-driven behavior. For example:

```
camunda.vars.env.COUNTRY_CONFIGS[countryCode].tax_rate
```

## Usage best practices

#### Use meaningful names

Choose clear, descriptive variable names that indicate purpose and scope.
For example:

```
✓ camunda.vars.env.PAYMENT_API_ENDPOINT
✗ camunda.vars.env.URL1
```

#### Group related configuration

Use nested objects to organize related values.
For example:

```
✓ camunda.vars.env.PAYMENT_CONFIG.endpoint
✓ camunda.vars.env.PAYMENT_CONFIG.timeout
✓ camunda.vars.env.PAYMENT_CONFIG.retry_count
```

#### Follow naming conventions

Establish and follow naming patterns across your organization.
For example:

- `UPPER_SNAKE_CASE` for top-level keys.
- `camelCase` or `snake_case` for nested properties.

#### Document variable contracts

Maintain documentation of expected cluster variables, their structures, and allowed overrides per process.
