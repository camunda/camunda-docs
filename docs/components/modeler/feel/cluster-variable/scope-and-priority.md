### Understanding Scope Resolution

Cluster variables use a hierarchical scope system to determine which value is used when the same key exists at multiple
levels. This section explains how scope resolution works and how to predict variable values in your processes.

### The Three-Level Hierarchy

#### Level 1: Process Variables (Highest Priority)

Variables defined directly within a process instance always take precedence over cluster variables. This includes:

- Variables set during process instantiation
- Variables created or modified during process execution
- Variables passed from parent to child processes

**Important Note**: If you create a process variable with a key that matches a cluster variable path (e.g., setting a
process variable named `camunda.vars.env.API_URL`), the process variable will shadow the cluster variable completely.

#### Level 2: TENANT Scope Cluster Variables

When multi-tenancy is enabled, tenant-scoped cluster variables provide the second level of priority. These variables:

- Override any GLOBAL scope variables with the same key
- Are only visible to processes running within that specific tenant
- Allow for tenant-specific customization without affecting other tenants

#### Level 3: GLOBAL Scope Cluster Variables (Lowest Priority)

Global cluster variables provide cluster-wide defaults and baseline configuration. These variables:

- Are accessible by all processes across all tenants
- Serve as fallback values when no tenant-specific override exists
- Provide consistent defaults for new tenants

### Resolution Examples

#### Example 1: Basic Scope Override

```
GLOBAL:  { API_TIMEOUT: 5000 }
TENANT:  { API_TIMEOUT: 10000 }
PROCESS: (none)

Result when accessing camunda.vars.env.API_TIMEOUT:
→ 10000 (TENANT value)
```

#### Example 2: Partial Override

```
GLOBAL:  { API_CONFIG: { timeout: 5000, retry: 3, url: "https://api.global.com" } }
TENANT:  { API_CONFIG: { timeout: 10000 } }
PROCESS: (none)

Result when accessing camunda.vars.env.API_CONFIG.timeout:
→ 10000 (TENANT value)

Result when accessing camunda.vars.env.API_CONFIG.retry:
→ null (TENANT defined API_CONFIG as a different object)
```

**Critical Note**: When you override a key at TENANT scope, the entire value at that key is replaced, not merged.
Partial object merging does not occur.

#### Example 3: Process Variable Override

```
GLOBAL:  { MAX_AMOUNT: 1000 }
TENANT:  { MAX_AMOUNT: 5000 }
PROCESS: { camunda.vars.env.MAX_AMOUNT: 10000 }

Result when accessing camunda.vars.env.MAX_AMOUNT:
→ 10000 (PROCESS variable)
```

### Scope-Specific Access

When you need to explicitly access a specific scope, bypassing the resolution hierarchy:

#### Access Only Global Values

```
camunda.vars.cluster.GLOBAL_DEFAULT
```

This will return the GLOBAL scope value even if a TENANT override exists.

#### Access Only Tenant Values

```
camunda.vars.tenant.TENANT_OVERRIDE
```

This will return only the TENANT scope value, or null if not defined at TENANT scope.

### Multi-Tenant Considerations

#### Tenant Isolation

Each tenant's cluster variables are completely isolated. A process running in Tenant A cannot access cluster variables
defined for Tenant B, even through explicit namespace access.

#### Global Defaults Pattern

A common pattern is to define sensible defaults at GLOBAL scope and override only specific values at TENANT scope:

```
GLOBAL: {
  RATE_LIMITS: {
    requests_per_minute: 100,
    burst_limit: 150,
    concurrent_connections: 10
  }
}

TENANT (premium): {
  RATE_LIMITS: {
    requests_per_minute: 1000,
    burst_limit: 1500,
    concurrent_connections: 100
  }
}
```

### Debugging Scope Resolution

When troubleshooting unexpected variable values:

1. **Check all three levels**: Verify values at GLOBAL, TENANT, and PROCESS levels
2. **Use scope-specific namespaces**: Test with `camunda.vars.cluster` and `camunda.vars.tenant` to isolate scope
3. **Verify tenant context**: Ensure the process is running in the expected tenant
4. **Check for process variable shadowing**: Look for process variables that might shadow cluster variables
5. **Review variable structure**: Ensure objects are consistently structured across scopes
