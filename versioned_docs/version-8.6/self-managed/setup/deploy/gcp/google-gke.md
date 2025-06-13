---
id: google-gke
title: "Google GKE"
description: "Deploy Camunda 8 Self-Managed on Google GKE, a managed container service to run and scale Kubernetes applications in the cloud or on-premises."
---

Google Kubernetes Engine ([GKE](https://cloud.google.com/kubernetes-engine))
is a managed container service to run and scale Kubernetes applications in the cloud or on-premises.

Camunda 8 Self-Managed can be deployed on any Kubernetes cluster using [Helm charts](/self-managed/setup/install.md), like GKE. However, there are a few pitfalls to avoid as described below.

## GKE cluster specification

Generally speaking, the GKE cluster specification depends on your needs and workloads.
Here is a recommended start to run Camunda 8:

- Instance type: `n1-standard-4` (4 vCPUs, 15 GB Memory)
- Number of nodes: `4`
- Volume type: `Performance (SSD) persistent disks`

## Pitfalls to avoid

For general deployment pitfalls, visit the [deployment troubleshooting guide](/self-managed/operational-guides/troubleshooting/troubleshooting.md).

### Volume performance

To have a proper performance in Camunda 8, the persistent volumes attached to Zeebe should have around 1,000-3,000 IOPS. The `Performance (SSD) persistent disks` volumes deliver a consistent baseline IOPS performance but it [varies based on volume size](https://cloud.google.com/compute/docs/disks/performance#performance_factors).

It's recommended to use `Performance (SSD) persistent disks` volume type with at least `100 GB` per volume to have 3,000 IOPS.

### Zeebe Ingress

Zeebe requires an Ingress controller that supports `gRPC`, so if you are using [GKE Ingress](https://cloud.google.com/kubernetes-engine/docs/concepts/ingress) (ingress-gce), not [ingress-nginx](https://github.com/kubernetes/ingress-nginx), you might need to do extra steps. Namely, using `cloud.google.com/app-protocols` annotation in Zeebe Service. For more details, visit the GKE guide [using HTTP/2 for load balancing with Ingress](https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-http2).

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
