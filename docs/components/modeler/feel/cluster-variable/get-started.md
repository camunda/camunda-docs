### Quick Start Guide

This guide will walk you through creating your first cluster variable and using it in a BPMN process.

#### Step 1: Create a Global Cluster Variable

Use the Camunda Orchestration Cluster API to create a global variable:

```bash
POST /v2/cluster-variables/global
Content-Type: application/json

{
  "key": "API_ENDPOINT",
  "value": "https://api.example.com"
}
```

#### Step 2: Access the Variable in Your BPMN Process

In the Camunda Modeler, you can now access this variable using a FEEL expression:

```
camunda.vars.env.API_ENDPOINT
```

Use this in any expression field, such as:

- Service task input mappings
- Gateway condition expressions
- Script task variables
- Output parameter expressions

#### Step 3: Test Your Process

Deploy your process and create an instance. The cluster variable will be automatically resolved during execution.

### Creating Your First Tenant Variable

If you're using multi-tenancy, you can create tenant-specific overrides:

```bash
POST /v2/cluster-variables/tenant/{tenantId}
Content-Type: application/json

{
  "key": "API_ENDPOINT",
  "value": "https://api.tenant-specific.example.com"
}
```

Processes running in this tenant will automatically use the tenant-specific value.

### Common Patterns

#### Pattern 1: Environment Configuration

```json
{
  "key": "ENV_CONFIG",
  "value": {
    "api_url": "https://api.prod.example.com",
    "timeout_ms": 5000,
    "retry_count": 3
  }
}
```

Access nested values:

```
camunda.vars.env.ENV_CONFIG.api_url
camunda.vars.env.ENV_CONFIG.timeout_ms
```

#### Pattern 2: Feature Flags

```json
{
  "key": "FEATURE_ENABLE_NEW_WORKFLOW",
  "value": true
}
```

Use in conditional flows:

```
camunda.vars.env.FEATURE_ENABLE_NEW_WORKFLOW = true
```

#### Pattern 3: Thresholds and Limits

```json
{
  "key": "APPROVAL_THRESHOLD",
  "value": 10000
}
```

Use in gateway conditions:

```
orderAmount > camunda.vars.env.APPROVAL_THRESHOLD
```
