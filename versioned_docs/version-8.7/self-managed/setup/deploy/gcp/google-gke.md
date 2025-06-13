---
id: google-gke
title: "Google GKE"
description: "Deploy Camunda 8 Self-Managed on Google GKE, a managed container service to run and scale Kubernetes applications in the cloud or on-premises."
---

Google Kubernetes Engine ([GKE](https://cloud.google.com/kubernetes-engine))
is a managed container service to run and scale Kubernetes applications in the cloud or on-premises.

Camunda 8 Self-Managed can be deployed on any Kubernetes cluster using [Helm charts](/self-managed/setup/install.md). Deployment requirements, including cloud provider-specific information, is available on our [Kubernetes deployment reference](/self-managed/reference-architecture/kubernetes.md).

### Google Cloud load balancer

As Camunda Identity management endpoints like health endpoint don't use port 80, you could need a [custom health check configuration](https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-configuration#direct_health) when using Google Cloud load balancer.

```yaml
apiVersion: cloud.google.com/v1
kind: BackendConfig
metadata:
  name: camunda-identity
spec:
  healthCheck:
    timeoutSec: 3
    type: HTTP
    requestPath: /actuator/health/readiness
    # This is the "containerPort" in the Pod, not the "targetPort" in the Service,
    # as the load balancer sends probes to the Pod's IP address directly.
    port: 8082
```

Finally, in the Helm values, you should assign the `BackendConfig` to the Identity service.

```yaml
identity:
  service:
    annotations:
      cloud.google.com/backend-config: '{"default": "camunda-identity"}'
```
