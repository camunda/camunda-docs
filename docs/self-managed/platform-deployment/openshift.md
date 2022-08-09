---
id: openshift
title: "Overview"
---

A properly configured Camunda 8 platform can be deployed on OpenShift, depending primarily on the security context constraints (aka SCC) you wish to apply to it.

:::note
The recommended way to deploy Camunda 8 on OpenShift is to use the official Helm charts. These are regularly tested to ensure compatibility with a select set of OpenShift versions. You can find more [in the dedicated guide for it](./openshift-helm.md).
:::

## Configuration

Generally, if you aren't using the Helm charts, you can deploy Camunda 8 to OpenShift by following the general [Kubernetes](./kubernetes.md) guide. Then, depending on the SCC you've selected, you will have to adapt the certain resources.

### What is an SCC?

Much like how roles control the permissions of users, SCCs are a way to control the permissions of the applications deployed, both at the pod and container level. It's generally recommended to deploy your application with the most restricted SCC possible. If you're not familiar with security context constraints, refer to the [OpenShift documentation](https://docs.openshift.com/container-platform/latest/authentication/managing-security-context-constraints.html).

#### Permissive SCC

Out of the box, if you will deploy Camunda 8 (and related infrastructure) with a permissive SCC, then there is nothing special for you to configure. Here, a permissive SCC refers to one where the strategy for `RunAsUser` is defined as `RunAsAny` (including root).

#### Non-root SCC

If you wish to deploy Camunda 8 but restrict the applications from running as root (e.g. the `nonroot` built-in SCC), then you will need to configure each pod and container to run as a non-root user. For example, when deploying Zeebe using a stateful set, you would add the following, replacing `1000` with the user ID you wish to use:

```yaml
spec:
  template:
    spec:
      securityContext:
        runAsUser: 1000
      containers:
        securityContext:
          runAsUser: 1000
```

:::note
As the container user in OpenShift is always part of the root group, it's not necessary to define an `fsGroup` for any Camunda 8 applications' pod security context.
:::

This is necessary for all Camunda 8 applications, as well as related ones (e.g. Keycloak, Postgresql, etc.). This is notably crucial for stateful applications which will write to persistent volumes, but it's also generally a good idea to set.

#### Restrictive SCC

The following is the most restrictive SCC you can use to deploy Camunda 8. Note that this is, in OpenShift 4.10, equivalent to the built-in `restricted` SCC (which is the default SCC).

```yaml
Allow Privileged: false
Default Add Capabilities: <none>
Required Drop Capabilities: KILL,MKNOD,SYS_CHROOT,SETUID,SETGID
Allowed Capabilities: <none>
Allowed Seccomp Profiles: <none>
Allowed Volume Types: configMap,downwardAPI,emptyDir,persistentVolumeClaim,projected,secret
Allow Host Network: false
Allow Host Ports: false
Allow Host PID: false
Allow Host IPC: false
Read Only Root Filesystem: false
Run As User Strategy: MustRunAsRange
SELinux Context Strategy: MustRunAs
FSGroup Strategy: MustRunAs
Supplemental Groups Strategy: RunAsAny
```

When using this, you must take care not to specify _any_ `runAsUser` or `fsGroup` in either the pod or container security context. Instead, let OpenShift assign arbitrary IDs.

:::note
Of course, if you are providing the ID ranges yourself, you can configure the `runAsUser` and `fsGroup` values yourself as well.
:::
