---
id: cluster-variable-access
title: Access cluster variables
sidebar_label: "Access cluster variables"
description: "Learn how to use and access cluster variables, from simple to advanced patterns."
---

Learn how to use and access cluster variables, from simple to advanced patterns.

## Access using FEEL expressions

You can reference cluster variables anywhere Camunda Modeler supports FEEL expressions.

### Simple key access

Use dot notation after the namespace for simple key-value pairs:

```
camunda.vars.env.API_URL
camunda.vars.env.MAX_RETRIES
camunda.vars.env.FEATURE_ENABLED
camunda.vars.env.TIMEOUT_SECONDS
```

### Nested object access

For cluster variables with nested object structures, use dot notation to access deeper levels:

```
camunda.vars.env.DATABASE_CONFIG.host
camunda.vars.env.DATABASE_CONFIG.port
camunda.vars.env.DATABASE_CONFIG.credentials.username

camunda.vars.env.API_SETTINGS.retry.max_attempts
camunda.vars.env.API_SETTINGS.retry.backoff_ms
camunda.vars.env.API_SETTINGS.timeout.connection
```

### Advanced access patterns

#### Conditional access

Provide fallback values when cluster variables might not exist:

```
if camunda.vars.env.CUSTOM_TIMEOUT != null
  then camunda.vars.env.CUSTOM_TIMEOUT
  else 5000
```

#### Dynamic key access

While dynamic key access is limited in FEEL, you can structure your variables to support configuration-driven behavior. For example:

```
camunda.vars.env.COUNTRY_CONFIGS[countryCode].tax_rate
```

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

## Usage best practices

### Use meaningful names

Choose clear, descriptive variable names that indicate purpose and scope.
For example:

```
✓ camunda.vars.env.PAYMENT_API_ENDPOINT
✗ camunda.vars.env.URL1
```

### Group related configuration

Use nested objects to organize related values.
For example:

```
✓ camunda.vars.env.PAYMENT_CONFIG.endpoint
✓ camunda.vars.env.PAYMENT_CONFIG.timeout
✓ camunda.vars.env.PAYMENT_CONFIG.retry_count
```

### Follow naming conventions

Establish and follow naming patterns across your organization.
For example:

- `UPPER_SNAKE_CASE` for top-level keys.
- `camelCase` or `snake_case` for nested properties.

### Document variable contracts

Maintain documentation of expected cluster variables, their structures, and allowed overrides per process.
