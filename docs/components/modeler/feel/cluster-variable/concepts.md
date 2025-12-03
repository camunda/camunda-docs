### Scope Levels

Cluster variables exist at two distinct scope levels:

#### GLOBAL Scope

Variables defined at the GLOBAL scope are available across the entire cluster and accessible by all processes,
regardless of tenant context. These typically represent cluster-wide defaults and shared configuration.

**Characteristics:**

- Available to all tenants and processes
- Lowest priority in variable resolution
- Ideal for default values and cluster-wide settings
- Managed via the global cluster variables API

#### TENANT Scope

Variables defined at the TENANT scope are specific to a particular tenant and only accessible within that tenant's
context. These allow for tenant-specific customization and overrides.

**Characteristics:**

- Available only within the specific tenant
- Higher priority than GLOBAL scope
- Ideal for tenant-specific customization
- Managed via the tenant-specific cluster variables API
- Only available when multi-tenancy is enabled

### Access Namespaces

Cluster variables are accessed through three distinct namespaces in FEEL expressions:

#### camunda.vars.cluster

Provides direct access to GLOBAL scope variables only. Variables defined at the TENANT scope are not accessible through
this namespace.

**Use when:**

- You explicitly want to access only global variables
- You need to bypass tenant overrides
- You're debugging scope resolution

**Example:**

```
camunda.vars.cluster.GLOBAL_DEFAULT_TIMEOUT
```

#### camunda.vars.tenant

Provides direct access to TENANT scope variables only. Variables defined at the GLOBAL scope are not accessible through
this namespace.

**Use when:**

- You explicitly want to access only tenant variables
- You need to verify tenant-specific values
- You're debugging scope resolution

**Example:**

```
camunda.vars.tenant.TENANT_SPECIFIC_CONFIG
```

#### camunda.vars.env (Recommended)

Provides a merged view of both GLOBAL and TENANT scope variables, with automatic priority resolution. This is the
recommended namespace for most use cases.

**Use when:**

- You want automatic scope resolution
- You need the most specific value available
- You're writing portable process definitions

**Example:**

```
camunda.vars.env.API_ENDPOINT
camunda.vars.env.CONFIG.timeout
```

### Variable Types

Cluster variables support multiple data types to accommodate different configuration needs:

#### Simple Values

- **String**: Text values for URLs, names, identifiers
- **Number**: Numeric values for thresholds, timeouts, counts
- **Boolean**: True/false values for feature flags, toggles

#### Complex Values

- **Objects**: Nested structures for grouped configuration
- **Arrays**: Lists of values (Note: Access patterns may vary)

### Variable Resolution Priority

Understanding the complete priority order is crucial for predictable behavior:

1. **Process-level variables** (highest priority)
2. **TENANT scope cluster variables**
3. **GLOBAL scope cluster variables** (lowest priority)

When the same key exists at multiple levels, the highest priority value is used. This enables a cascading configuration
pattern where specific contexts override broader ones.
