---
id: pod-networking
sidebar_label: Pod networking
title: Configure pod networking
description: Configure DNS policy, custom DNS resolution, and host network access for Camunda component pods in Self-Managed Helm deployments.
---

The Camunda Helm chart exposes values that control how component pods connect to the network. Use these settings when your infrastructure requires custom DNS resolution behavior, or when orchestration cluster pods need to share the host node's network namespace.

## DNS policy

Every Camunda component supports a `dnsPolicy` value that controls how DNS resolution works for its pods. It maps directly to the Kubernetes [`dnsPolicy` pod spec field](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy).

The following components support `dnsPolicy`:

| Component              | Value key                         |
| ---------------------- | --------------------------------- |
| Orchestration cluster  | `orchestration.dnsPolicy`         |
| Identity               | `identity.dnsPolicy`              |
| Connectors             | `connectors.dnsPolicy`            |
| Optimize               | `optimize.dnsPolicy`              |
| Console                | `console.dnsPolicy`               |
| Web Modeler REST API   | `webModeler.restapi.dnsPolicy`    |
| Web Modeler WebSockets | `webModeler.websockets.dnsPolicy` |

Example — setting a custom DNS policy for the orchestration cluster:

```yaml
orchestration:
  dnsPolicy: ClusterFirst
```

If you don't set `dnsPolicy` for a component, Kubernetes applies its default (`ClusterFirst`).

Common values:

| Value                     | Behavior                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `ClusterFirst`            | In-cluster DNS takes priority; unresolved names fall back to the upstream nameserver. Default for most pods. |
| `ClusterFirstWithHostNet` | Same as `ClusterFirst`, but required when `hostNetwork: true` to preserve in-cluster DNS resolution.         |
| `Default`                 | Pods inherit the DNS configuration of the node they run on.                                                  |
| `None`                    | DNS is configured entirely via `dnsConfig`.                                                                  |

## Custom DNS configuration

Every Camunda component also supports a `dnsConfig` value that lets you supply custom DNS nameservers, search domains, and resolver options. It maps directly to the Kubernetes [`dnsConfig` pod spec field](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config).

The following components support `dnsConfig`:

| Component              | Value key                         |
| ---------------------- | --------------------------------- |
| Orchestration cluster  | `orchestration.dnsConfig`         |
| Identity               | `identity.dnsConfig`              |
| Connectors             | `connectors.dnsConfig`            |
| Optimize               | `optimize.dnsConfig`              |
| Console                | `console.dnsConfig`               |
| Web Modeler REST API   | `webModeler.restapi.dnsConfig`    |
| Web Modeler WebSockets | `webModeler.websockets.dnsConfig` |

Use `dnsConfig` when you need to override or extend the default DNS resolver — for example, to add a private nameserver or a custom search domain:

```yaml
connectors:
  dnsPolicy: None
  dnsConfig:
    nameservers:
      - 192.168.1.100
    searches:
      - my-namespace.svc.cluster.local
      - svc.cluster.local
    options:
      - name: ndots
        value: "5"
```

## Host network (orchestration cluster only)

Setting `orchestration.hostNetwork` to `true` makes orchestration cluster pods use the host node's network namespace instead of the default pod network. In this mode, pods share the node's IP address and port space rather than receiving their own cluster IP.

This option is available only for the orchestration cluster (a StatefulSet). It's useful in environments where:

- Pods must be reachable directly via the node IP (for example, bare-metal deployments without a CNI overlay network).
- A network plugin or firewall requires pods to appear as node-level processes.
- You're integrating with infrastructure that doesn't support pod-level IP routing.

```yaml
orchestration:
  hostNetwork: true
```

When `hostNetwork` is enabled and you haven't set `orchestration.dnsPolicy`, the chart automatically sets `dnsPolicy` to `ClusterFirstWithHostNet`. This ensures pods on the host network can still resolve in-cluster DNS names (for example, Kubernetes `Service` names). If you set `orchestration.dnsPolicy` explicitly, that value always takes precedence.

:::note
Using `hostNetwork: true` means all ports opened by the orchestration cluster pods are bound directly on the node. Make sure the required ports are not already in use on the node, and review your network policies accordingly.
:::

### Combining host network with custom DNS

To fully control DNS on a host-network pod:

```yaml
orchestration:
  hostNetwork: true
  dnsPolicy: None
  dnsConfig:
    nameservers:
      - 10.96.0.10
    searches:
      - cluster.local
```
