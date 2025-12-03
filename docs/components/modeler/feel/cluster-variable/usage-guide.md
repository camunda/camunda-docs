### Accessing Cluster Variables in FEEL Expressions

Cluster variables are accessed in the Camunda Modeler using FEEL (Friendly Enough Expression Language) expressions. Any
field that supports FEEL expressions can reference cluster variables.

### Simple Key Access

For simple key-value pairs, use dot notation directly after the namespace:

```
camunda.vars.env.API_URL
camunda.vars.env.MAX_RETRIES
camunda.vars.env.FEATURE_ENABLED
camunda.vars.env.TIMEOUT_SECONDS
```

### Nested Object Access

For cluster variables with nested object structures, continue using dot notation to traverse the hierarchy:

```
camunda.vars.env.DATABASE_CONFIG.host
camunda.vars.env.DATABASE_CONFIG.port
camunda.vars.env.DATABASE_CONFIG.credentials.username

camunda.vars.env.API_SETTINGS.retry.max_attempts
camunda.vars.env.API_SETTINGS.retry.backoff_ms
camunda.vars.env.API_SETTINGS.timeout.connection
```

### Common Usage Locations in BPMN

#### Service Task Input Mappings

Map cluster variables to service task inputs:

**Source Expression:**

```
= camunda.vars.env.API_ENDPOINT
```

**Target Variable:**

```
apiUrl
```

#### Gateway Conditions

Use cluster variables in conditional sequence flows:

```
orderAmount > camunda.vars.env.APPROVAL_THRESHOLD
```

```
camunda.vars.env.FEATURE_EXPRESS_SHIPPING = true
```

#### Script Tasks

Reference cluster variables in script expressions:

```
var endpoint = camunda.vars.env.API_CONFIG.base_url;
var timeout = camunda.vars.env.API_CONFIG.timeout_ms;
```

#### Output Mappings

Use cluster variables in output parameter expressions:

```
= {
  "endpoint": camunda.vars.env.SERVICE_URL,
  "timestamp": now(),
  "threshold": camunda.vars.env.PROCESSING_THRESHOLD
}
```

#### Call Activities

Pass cluster variables as input to called processes:

**Input Variable Mapping:**

```
= {
  "config": camunda.vars.env.SUBPROCESS_CONFIG,
  "flags": camunda.vars.env.FEATURE_FLAGS
}
```

### Advanced Access Patterns

#### Conditional Access

Provide fallback values when cluster variables might not exist:

```
if camunda.vars.env.CUSTOM_TIMEOUT != null
  then camunda.vars.env.CUSTOM_TIMEOUT
  else 5000
```

#### Dynamic Key Access

While direct dynamic key access is limited in FEEL, you can structure your variables to support configuration-driven
behavior:

```
camunda.vars.env.COUNTRY_CONFIGS[countryCode].tax_rate
```

#### Combining Multiple Variables

Create expressions using multiple cluster variables:

```
camunda.vars.env.API_BASE_URL + "/api/v" + camunda.vars.env.API_VERSION + "/resource"
```

### Best Practices for Usage

**Use Meaningful Names**: Choose clear, descriptive variable names that indicate purpose and scope.

```
✓ camunda.vars.env.PAYMENT_API_ENDPOINT
✗ camunda.vars.env.URL1
```

**Group Related Configuration**: Use nested objects to organize related values.

```
✓ camunda.vars.env.PAYMENT_CONFIG.endpoint
✓ camunda.vars.env.PAYMENT_CONFIG.timeout
✓ camunda.vars.env.PAYMENT_CONFIG.retry_count
```

**Consistent Naming Conventions**: Establish and follow naming patterns across your organization.

```
UPPER_SNAKE_CASE for top-level keys
camelCase or snake_case for nested properties
```

**Document Variable Contracts**: Maintain documentation of expected cluster variables and their structures for each
process.
