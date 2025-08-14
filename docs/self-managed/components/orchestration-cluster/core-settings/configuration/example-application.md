---
id: example-application
title: "Example of application.yml"
---

The following snippets represent example default configurations shipped with the distribution for different components in a **Camunda 8 Self-Managed Orchestration Cluster**.  
They can be found inside the `config` folder for each component (for example, `config/application.yml`) and can be adjusted to suit your environment.

## Example configuration with user authentication and Elasticsearch

```yaml
# Component configuration file

camunda.<component>:
  # Set component username, display name, and password.
  # If a user with <username> or <userId> does not exist, it will be created.
  # Default values vary by component.
  userId: anUserId
  displayName: nameShownInWebpage
  password: aPassword
  roles:
    - OWNER
    - USER

  # Elasticsearch (ELS) instance to store component data
  elasticsearch:
    # Cluster name
    clusterName: elasticsearch
    # URL
    url: http://localhost:9200

  # Orchestration Cluster gateway connection
  orchestrationCluster:
    # Gateway address
    gatewayAddress: localhost:26500

  # Elasticsearch instance receiving exported orchestration data
  orchestrationElasticsearch:
    # Cluster name
    clusterName: elasticsearch
    # URL
    url: http://localhost:9200
    # Index prefix, configured in the Elasticsearch exporter
    prefix: orchestration-record
```

## Notes

- Replace `<component>` with the identifier for the service you are configuring (for example, `operate`, `tasklist`, or another cluster component).
- Adjust URLs and cluster names according to your deployment environment.
- Default values may vary per distribution and may be overridden by environment variables.
- The configuration structure is the same across most components, with differences only in the specific properties required.
