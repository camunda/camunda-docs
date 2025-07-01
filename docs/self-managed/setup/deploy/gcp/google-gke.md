---
id: google-gke
title: "Google GKE"
description: "Deploy Camunda 8 Self-Managed on Google GKE, a managed container service to run and scale Kubernetes applications in the cloud or on-premises."
---

Google Kubernetes Engine ([GKE](https://cloud.google.com/kubernetes-engine))
is a managed container service to run and scale Kubernetes applications in the cloud or on-premises.

Camunda 8 Self-Managed can be deployed on any Kubernetes cluster using [Helm charts](/self-managed/setup/install.md). Deployment requirements, including cloud provider-specific information, is available on our [Kubernetes deployment reference](/self-managed/reference-architecture/kubernetes.md).

### Google Cloud load balancer

Camunda Identity management endpoints, such as the health check endpoint, do not run on port 80. As a result, when using a Google Cloud Load Balancer, you may need a [custom health check configuration](https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-configuration#direct_health).

Here’s an example of a `BackendConfig` you can apply:

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

When using [container-native load balancing](https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing), the load balancer sends traffic to an endpoint in a network endpoint group; hence, the `targetPort` should match the `containerPort` as the load balancer sends probes to the Pod's IP address directly.

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
    port: 8082
```

Finally, in your Helm values, assign the `BackendConfig` to the Identity service.

```yaml
identity:
  service:
    annotations:
      cloud.google.com/backend-config: '{"default": "camunda-identity"}'
```
