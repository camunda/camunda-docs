### What are Cluster Variables?

Cluster Variables provide a centralized way to manage configuration values across your Camunda cluster. These variables
can be defined at two levels: globally for the entire cluster, or at the tenant level when multi-tenancy is enabled.
This allows you to maintain environment-specific configurations, API endpoints, feature flags, and other shared values
without hardcoding them into individual process definitions.

### Key Benefits

- **Centralized Configuration Management**: Define configuration once and use it across all processes
- **Environment Flexibility**: Maintain different values for development, staging, and production without modifying BPMN
  files
- **Multi-Tenant Support**: Provide tenant-specific overrides while maintaining global defaults
- **Simplified Deployment**: Promote processes across environments without changes to the process definition
- **Dynamic Updates**: Modify configuration values without redeploying processes

### When to Use Cluster Variables

Cluster Variables are ideal for:

- API endpoints and service URLs that vary by environment
- Feature flags to control functionality availability
- Configuration values shared across multiple processes
- Tenant-specific customization in multi-tenant deployments
- Environment-specific thresholds, timeouts, and limits
- Integration credentials and connection strings

### When Not to Use Cluster Variables

Consider alternatives for:

- Process instance-specific data (use process variables instead)
- Frequently changing values during process execution (use process variables)
- Sensitive credentials requiring encryption at rest (use secrets management)
- Large data payloads (consider external storage with references)
