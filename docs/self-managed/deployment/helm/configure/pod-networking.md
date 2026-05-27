---
id: pod-networking
sidebar_label: Pod networking
title: Configure pod networking
description: Configure host network access, DNS policy, and DNS resolution for orchestration cluster pods in Camunda Self-Managed Helm deployments.
---

The Camunda Helm chart exposes several values that control how orchestration cluster pods connect to the network. Use these settings when your infrastructure requires pods to share the host network namespace, or when you need to customize DNS resolution behavior.

## Host network

Setting `orchestration.hostNetwork` to `true` makes orchestration cluster pods use the host node's network namespace instead of the default pod network. In this mode, pods share the node's IP address and port space rather than receiving their own cluster IP.

This is useful in environments where:

- Pods must be reachable directly via the node IP (for example, bare-metal deployments without a CNI overlay network).
- A network plugin or firewall requires pods to appear as node-level processes.
- You're integrating with infrastructure that doesn't support pod-level IP routing.

```yaml
orchestration:
  hostNetwork: true
```

When `hostNetwork` is enabled and you haven't set `orchestration.dnsPolicy`, the chart automatically sets `dnsPolicy` to `ClusterFirstWithHostNet`. This ensures that pods on the host network can still resolve in-cluster DNS names (for example, Kubernetes `Service` names). If you set `orchestration.dnsPolicy` explicitly, that value always takes precedence.

:::note
Using `hostNetwork: true` means all ports opened by the orchestration cluster pods are bound directly on the node. Make sure the required ports are not already in use on the node, and review your network policies accordingly.
:::

## DNS policy

`orchestration.dnsPolicy` controls how DNS resolution works for orchestration cluster pods. It maps directly to the Kubernetes [`dnsPolicy` pod spec field](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy).

```yaml
orchestration:
  dnsPolicy: ClusterFirst
```

If you enable `hostNetwork` without setting `dnsPolicy`, the chart uses `ClusterFirstWithHostNet` automatically. If you don't enable `hostNetwork` and don't set `dnsPolicy`, Kubernetes applies its default (`ClusterFirst`).

Common values:

| Value | Behavior |
|---|---|
| `ClusterFirst` | In-cluster DNS takes priority; unresolved names fall back to the upstream nameserver. Default for most pods. |
| `ClusterFirstWithHostNet` | Same as `ClusterFirst`, but required when `hostNetwork: true` to preserve in-cluster DNS resolution. |
| `Default` | Pods inherit the DNS configuration of the node they run on. |
| `None` | DNS is configured entirely via `dnsConfig`. |

## Custom DNS configuration

`orchestration.dnsConfig` lets you supply custom DNS nameservers, search domains, and resolver options. It maps directly to the Kubernetes [`dnsConfig` pod spec field](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config).

Use this when you need to override or extend the default DNS resolver — for example, to add a private nameserver or a custom search domain.

```yaml
orchestration:
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

## Combining settings

The three values are designed to work together. A typical pattern for host network deployments:

```yaml
orchestration:
  hostNetwork: true
  # dnsPolicy defaults to ClusterFirstWithHostNet automatically — no need to set it explicitly
  # unless you want a different value
```

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
